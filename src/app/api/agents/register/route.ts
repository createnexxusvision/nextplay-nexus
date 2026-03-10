// NextPlay Nexus — Agent Registration
// POST /api/agents/register
// Open endpoint — no auth required for first registration.
// Admin must set status='active' in Supabase before agent can use other endpoints.
// API key is returned ONCE and never stored in plaintext.

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { detectBadActor } from '@/lib/mcp/agent-auth';
import { registerAgent } from '@/lib/mcp/agent-registry';
import { rpcResult, rpcError, RPC } from '@/lib/mcp/jsonrpc';

const RegisterSchema = z.object({
  name:           z.string().min(2).max(120).transform(s => s.replace(/[<>"']/g, '').trim()),
  type:           z.enum(['brand','athlete','program','platform','research','compliance']),
  entity_name:    z.string().min(1).max(200).transform(s => s.replace(/[<>"']/g, '').trim()),
  entity_type:    z.enum(['profile','program','brand','external']).optional(),
  entity_id:      z.string().uuid().optional(),
  permissions:    z.array(z.string()).max(20).optional(),
  rate_limit_rpm: z.number().int().min(1).max(1000).optional(),
  metadata:       z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const { blocked, reason } = detectBadActor(req);
  if (blocked) {
    return NextResponse.json(
      rpcError(null, RPC.AGENT_UNAUTHORIZED, reason),
      { status: 403 }
    );
  }

  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json(rpcError(null, RPC.INVALID_REQUEST, 'Content-Type must be application/json'), { status: 415 });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json(rpcError(null, RPC.PARSE_ERROR), { status: 400 }); }

  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      rpcError(null, RPC.INVALID_PARAMS, parsed.error.issues[0]?.message ?? 'Invalid input'),
      { status: 422 }
    );
  }

  try {
    const { agent, rawApiKey } = await registerAgent(parsed.data);

    return NextResponse.json(
      rpcResult('register', {
        agent_id:    agent.agent_id,
        api_key:     rawApiKey,          // ⚠ shown ONCE — save immediately
        name:        agent.name,
        type:        agent.type,
        entity_name: agent.entity_name,
        permissions: agent.permissions,
        status:      agent.status,       // 'pending' — admin must activate
        note:        'Save your api_key immediately. It will never be shown again. Your agent starts as "pending" — an admin must set status to "active" before you can use other endpoints.',
      }),
      { status: 201 }
    );
  } catch (err) {
    const e = err as { message?: string };
    return NextResponse.json(rpcError(null, RPC.INTERNAL_ERROR, e.message), { status: 500 });
  }
}
