// NextPlay Nexus — A2A Message Sender
// POST /api/agents/message
// Send a JSON-RPC 2.0 message to another agent.
// Enforces routing rules, entity ownership, and permission scopes.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { requireAgentAuth, requireEntityOwnership, recordViolation } from '@/lib/mcp/agent-auth';
import { getAgent } from '@/lib/mcp/agent-registry';
import { rpcResult, rpcError, RPC, isJsonRpcRequest } from '@/lib/mcp/jsonrpc';
import { A2A_ROUTING, A2A_SCHEMAS, isValidA2AMethod, A2A } from '@/lib/mcp/a2a-methods';

function getDb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

const MessageEnvelopeSchema = z.object({
  jsonrpc: z.literal('2.0'),
  id:      z.union([z.string(), z.number()]),
  method:  z.string(),
  params:  z.record(z.string(), z.unknown()),
});

export async function POST(req: NextRequest) {
  let msgId: string | number | null = null;

  try {
    const agent = await requireAgentAuth(req);

    const contentType = req.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(rpcError(null, RPC.INVALID_REQUEST, 'Content-Type must be application/json'), { status: 415 });
    }

    let body: unknown;
    try { body = await req.json(); }
    catch { return NextResponse.json(rpcError(null, RPC.PARSE_ERROR), { status: 400 }); }

    const parsed = MessageEnvelopeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(rpcError(null, RPC.INVALID_REQUEST, 'Invalid JSON-RPC 2.0 envelope'), { status: 400 });
    }

    const { id, method, params } = parsed.data;
    msgId = id;

    // Validate method
    if (!isValidA2AMethod(method)) {
      return NextResponse.json(rpcError(id, RPC.METHOD_NOT_FOUND, `Unknown A2A method: ${method}`), { status: 404 });
    }

    // Validate params against method schema
    const schema = A2A_SCHEMAS[method];
    if (schema) {
      const paramResult = schema.safeParse(params);
      if (!paramResult.success) {
        return NextResponse.json(
          rpcError(id, RPC.INVALID_PARAMS, paramResult.error.issues[0]?.message ?? 'Invalid params'),
          { status: 422 }
        );
      }
    }

    const to_agent_id = (params as { to_agent_id?: string }).to_agent_id;
    if (!to_agent_id) {
      return NextResponse.json(rpcError(id, RPC.INVALID_PARAMS, 'params.to_agent_id is required'), { status: 400 });
    }

    // Validate target agent
    const targetAgent = await getAgent(to_agent_id);
    if (!targetAgent || targetAgent.status !== 'active') {
      return NextResponse.json(rpcError(id, RPC.INVALID_TARGET, 'Target agent not found or inactive'), { status: 404 });
    }

    // Enforce routing rules
    const routing = A2A_ROUTING[method];
    if (!routing.senderTypes.includes(agent.type)) {
      await recordViolation(agent.agent_id, `Attempted to send ${method} as ${agent.type}`);
      return NextResponse.json(rpcError(id, RPC.PERMISSION_DENIED, `Agent type '${agent.type}' cannot send method '${method}'`), { status: 403 });
    }
    if (!routing.receiverTypes.includes(targetAgent.type)) {
      return NextResponse.json(rpcError(id, RPC.INVALID_TARGET, `Method '${method}' cannot be sent to agent type '${targetAgent.type}'`), { status: 400 });
    }

    // Entity ownership check for NIL deal write methods
    if (method === A2A.NIL_DEAL_PROPOSE) {
      const brand = (params as { brand?: string }).brand;
      if (brand) {
        try { requireEntityOwnership(agent, brand); }
        catch {
          await recordViolation(agent.agent_id, `Entity mismatch on ${method}: claimed ${brand}, registered as ${agent.entity_name}`);
          return NextResponse.json(rpcError(id, RPC.ENTITY_MISMATCH), { status: 403 });
        }
      }
    }

    const db = getDb();
    const messageId = `msg_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;

    // Store message
    await db.from('agent_messages').insert({
      message_id:      messageId,
      from_agent_id:   agent.agent_id,
      to_agent_id,
      method,
      params,
      status:          'pending',
    });

    // Fire SSE event for target agent
    await db.from('agent_events').insert({
      event_type:       'message.received',
      source_agent_id:  agent.agent_id,
      payload:          { message_id: messageId, method, from: agent.name, from_entity: agent.entity_name },
      target_agent_ids: [to_agent_id],
    });

    return NextResponse.json(
      rpcResult(id, { message_id: messageId, status: 'delivered', to: to_agent_id }),
      { status: 200 }
    );

  } catch (err: unknown) {
    const e = err as { code?: number; message?: string };
    const code = e.code ?? RPC.INTERNAL_ERROR;
    return NextResponse.json(rpcError(msgId, code, e.message), {
      status: code === RPC.AGENT_UNAUTHORIZED ? 401 : code === RPC.RATE_LIMITED ? 429 : code === RPC.PERMISSION_DENIED ? 403 : 500,
    });
  }
}
