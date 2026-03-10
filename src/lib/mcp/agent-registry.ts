// NextPlay Nexus — Agent Registry
// Register new agents and manage their lifecycle

import { createClient } from '@supabase/supabase-js';
import { generateApiKey, hashApiKey, type AgentRecord } from './agent-auth';

function getDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

export interface RegisterAgentInput {
  name: string;
  type: AgentRecord['type'];
  entity_name: string;
  entity_type?: AgentRecord['entity_type'];
  entity_id?: string;
  permissions?: string[];
  rate_limit_rpm?: number;
  metadata?: Record<string, unknown>;
}

// Default permissions by agent type
const DEFAULT_PERMISSIONS: Record<AgentRecord['type'], string[]> = {
  brand:      ['athletes:search', 'deals:read', 'deals:write', 'market:read'],
  athlete:    ['athletes:read', 'deals:read'],
  program:    ['athletes:search', 'athletes:read', 'programs:read', 'deals:read'],
  platform:   ['athletes:search', 'athletes:read', 'deals:read', 'deals:write', 'programs:read', 'market:read', 'compliance:check'],
  research:   ['athletes:search', 'market:read'],
  compliance: ['athletes:read', 'deals:read', 'compliance:check'],
};

export async function registerAgent(input: RegisterAgentInput): Promise<{
  agent: AgentRecord;
  rawApiKey: string;
}> {
  const db = getDb();

  const rawApiKey = generateApiKey();
  const apiKeyHash = await hashApiKey(rawApiKey);
  const agentId = `agent_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;

  const permissions = input.permissions ?? DEFAULT_PERMISSIONS[input.type] ?? [];

  const { data, error } = await db
    .from('agent_registry')
    .insert({
      agent_id:       agentId,
      api_key_hash:   apiKeyHash,
      name:           input.name,
      type:           input.type,
      entity_name:    input.entity_name,
      entity_type:    input.entity_type ?? 'external',
      entity_id:      input.entity_id ?? null,
      permissions,
      status:         'pending',
      rate_limit_rpm: input.rate_limit_rpm ?? 60,
      metadata:       input.metadata ?? {},
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to register agent: ${error?.message}`);
  }

  return { agent: data as AgentRecord, rawApiKey };
}

export async function getAgent(agentId: string): Promise<AgentRecord | null> {
  const db = getDb();
  const { data } = await db
    .from('agent_registry')
    .select('*')
    .eq('agent_id', agentId)
    .single();
  return (data as AgentRecord | null);
}

export async function updateAgentStatus(
  agentId: string,
  status: AgentRecord['status']
): Promise<void> {
  const db = getDb();
  await db.from('agent_registry').update({ status }).eq('agent_id', agentId);
}

export async function listActiveAgents(type?: AgentRecord['type']): Promise<AgentRecord[]> {
  const db = getDb();
  let query = db.from('agent_registry').select('*').eq('status', 'active');
  if (type) query = query.eq('type', type);
  const { data } = await query;
  return (data ?? []) as AgentRecord[];
}
