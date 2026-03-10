// NextPlay Nexus — A2A Agent Inbox
// GET /api/agents/inbox?limit=20&since=ISO_TIMESTAMP
// Returns pending messages for the authenticated agent and marks them as delivered.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAgentAuth } from '@/lib/mcp/agent-auth';
import { rpcError, RPC } from '@/lib/mcp/jsonrpc';

function getDb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function GET(req: NextRequest) {
  try {
    const agent = await requireAgentAuth(req);

    const { searchParams } = new URL(req.url);
    const limit  = Math.min(parseInt(searchParams.get('limit') ?? '20', 10), 100);
    const since  = searchParams.get('since');

    const db = getDb();

    let query = db
      .from('agent_messages')
      .select('message_id, from_agent_id, method, params, status, created_at')
      .eq('to_agent_id', agent.agent_id)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(limit);

    if (since) {
      query = query.gte('created_at', since);
    }

    const { data: messages, error } = await query;
    if (error) throw error;

    if (messages && messages.length > 0) {
      const ids = messages.map((m: { message_id: string }) => m.message_id);
      await db
        .from('agent_messages')
        .update({ status: 'delivered' })
        .in('message_id', ids);
    }

    return NextResponse.json(
      { messages: messages ?? [], count: messages?.length ?? 0 },
      { status: 200 }
    );

  } catch (err: unknown) {
    const e = err as { code?: number; message?: string };
    const code = e.code ?? RPC.INTERNAL_ERROR;
    return NextResponse.json(rpcError(null, code, e.message), {
      status: code === RPC.AGENT_UNAUTHORIZED ? 401 : code === RPC.RATE_LIMITED ? 429 : 500,
    });
  }
}
