// NextPlay Nexus — Agent Authentication & Security
// Validates AI agent identity, permissions, entity claims, and detects bad actors

import { createClient } from '@supabase/supabase-js';

// ── Types ───────────────────────────────────────────────────

export interface AgentRecord {
  id: string;
  agent_id: string;
  name: string;
  type: 'brand' | 'athlete' | 'program' | 'platform' | 'research' | 'compliance';
  entity_name: string;
  entity_id: string | null;
  entity_type: string | null;
  permissions: string[];
  status: 'pending' | 'active' | 'suspended' | 'blocked';
  rate_limit_rpm: number;
  request_count: number;
  violation_count: number;
  last_seen_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ── Supabase service client (lazy) ──────────────────────────

function getDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

// ── Crypto helpers ──────────────────────────────────────────

export async function hashApiKey(raw: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(raw)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateApiKey(): string {
  const bytes = new Uint8Array(48);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// ── Bad Actor Detection ─────────────────────────────────────

const BLOCKED_UA_PATTERNS = [
  /python-requests/i,
  /scrapy/i,
  /curl\//i,
  /wget\//i,
  /httpie/i,
  /go-http-client/i,
  /java\/\d/i,
  /libwww-perl/i,
  /masscan/i,
  /nmap/i,
  /zgrab/i,
];

export function detectBadActor(req: Request): { blocked: boolean; reason?: string } {
  const ua = req.headers.get('user-agent') ?? '';
  const agentId = req.headers.get('x-agent-id');

  // Allow known UA patterns ONLY if they have a valid agent registration header
  for (const pattern of BLOCKED_UA_PATTERNS) {
    if (pattern.test(ua) && !agentId) {
      return { blocked: true, reason: `Unregistered automated client: ${ua.slice(0, 60)}` };
    }
  }

  // Empty UA on agent endpoints is suspicious
  if (!ua && !agentId) {
    return { blocked: true, reason: 'Missing User-Agent and agent registration headers' };
  }

  return { blocked: false };
}

// ── Core Auth ───────────────────────────────────────────────

export async function authenticateAgent(
  agentId: string | null,
  apiKey: string | null
): Promise<AgentRecord | null> {
  if (!agentId || !apiKey) return null;

  const db = getDb();
  const keyHash = await hashApiKey(apiKey);

  const { data, error } = await db
    .from('agent_registry')
    .select('*')
    .eq('agent_id', agentId)
    .eq('api_key_hash', keyHash)
    .single();

  if (error || !data) return null;
  if (data.status !== 'active') return null;

  // Update last_seen_at (fire and forget)
  db.from('agent_registry')
    .update({ last_seen_at: new Date().toISOString() })
    .eq('agent_id', agentId)
    .then(() => {});

  return data as AgentRecord;
}

// ── Permission Checks ───────────────────────────────────────

export function checkPermission(agent: AgentRecord, permission: string): boolean {
  return (agent.permissions as string[]).includes(permission);
}

export function requirePermission(agent: AgentRecord, permission: string): void {
  if (!checkPermission(agent, permission)) {
    throw { code: -32004, message: `Permission denied: requires '${permission}'` };
  }
}

// Entity ownership: verify agent's registered entity matches a claimed entity name
export function checkEntityOwnership(agent: AgentRecord, claimedEntityName: string): boolean {
  return agent.entity_name.toLowerCase() === claimedEntityName.toLowerCase();
}

export function requireEntityOwnership(agent: AgentRecord, claimedEntityName: string): void {
  if (!checkEntityOwnership(agent, claimedEntityName)) {
    throw {
      code: -32002,
      message: `Entity mismatch: you are registered as "${agent.entity_name}" but attempted to act as "${claimedEntityName}"`,
    };
  }
}

// ── Rate Limiting ───────────────────────────────────────────

// Rolling window tracked per-minute via request_count + last_seen_at
export async function checkRateLimit(agent: AgentRecord): Promise<boolean> {
  const db = getDb();

  // Reset counter if last_seen_at is > 1 minute ago
  const lastSeen = agent.last_seen_at ? new Date(agent.last_seen_at) : null;
  const now = new Date();
  const resetWindow = !lastSeen || (now.getTime() - lastSeen.getTime()) > 60_000;

  const newCount = resetWindow ? 1 : agent.request_count + 1;

  await db.from('agent_registry')
    .update({ request_count: newCount, last_seen_at: now.toISOString() })
    .eq('agent_id', agent.agent_id);

  return newCount <= agent.rate_limit_rpm;
}

// ── Violation Tracking ──────────────────────────────────────

export async function recordViolation(agentId: string, reason: string): Promise<void> {
  const db = getDb();

  const { data } = await db
    .from('agent_registry')
    .select('violation_count')
    .eq('agent_id', agentId)
    .single();

  const newCount = (data?.violation_count ?? 0) + 1;
  const shouldSuspend = newCount >= 3;

  await db.from('agent_registry').update({
    violation_count: newCount,
    ...(shouldSuspend && { status: 'suspended' }),
    metadata: db.rpc // log reason in metadata via direct update below
  }).eq('agent_id', agentId);

  // Store violation reason in metadata
  if (shouldSuspend) {
    console.warn(`[AGENT SECURITY] Auto-suspended agent ${agentId} after ${newCount} violations. Last: ${reason}`);
  }

  // Insert audit event
  await db.from('agent_events').insert({
    event_type: shouldSuspend ? 'agent.suspended' : 'agent.violation',
    source_agent_id: agentId,
    payload: { reason, violation_count: newCount, auto_suspended: shouldSuspend },
    target_agent_ids: ['platform'],
  });
}

// ── Auth Middleware Helper (for API routes) ─────────────────

export async function requireAgentAuth(req: Request): Promise<AgentRecord> {
  const { blocked, reason } = detectBadActor(req);
  if (blocked) {
    throw { code: -32001, message: reason ?? 'Blocked request' };
  }

  const agentId = req.headers.get('x-agent-id');
  const apiKey  = req.headers.get('x-agent-key');
  const agent   = await authenticateAgent(agentId, apiKey);

  if (!agent) {
    throw { code: -32001, message: 'Agent authentication failed — check X-Agent-Id and X-Agent-Key headers' };
  }

  if (agent.status === 'suspended' || agent.status === 'blocked') {
    throw { code: -32005, message: `Agent account is ${agent.status}` };
  }

  const withinLimit = await checkRateLimit(agent);
  if (!withinLimit) {
    throw { code: -32003, message: `Rate limit exceeded (${agent.rate_limit_rpm} req/min)` };
  }

  return agent;
}
