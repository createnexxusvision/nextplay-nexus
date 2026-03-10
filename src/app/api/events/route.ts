// NextPlay Nexus — A2A SSE Event Stream
// GET /api/events
// Streams agent_events to the authenticated agent as Server-Sent Events.
// Polls every 2 seconds; sends heartbeat every 30 seconds.
// Headers: Cache-Control: no-cache, X-Accel-Buffering: no

import { NextRequest } from 'next/server';
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

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  let agent: Awaited<ReturnType<typeof requireAgentAuth>>;
  try {
    agent = await requireAgentAuth(req);
  } catch (err: unknown) {
    const e = err as { code?: number; message?: string };
    const code = e.code ?? RPC.INTERNAL_ERROR;
    const status = code === RPC.AGENT_UNAUTHORIZED ? 401 : code === RPC.RATE_LIMITED ? 429 : 500;
    return new Response(JSON.stringify(rpcError(null, code, e.message)), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const db = getDb();
  const agentId = agent.agent_id;

  // Track the highest event id seen so we only stream new events
  let lastEventId = parseInt(req.headers.get('Last-Event-ID') ?? '0', 10) || 0;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let heartbeatTimer: ReturnType<typeof setInterval>;
      let pollTimer: ReturnType<typeof setInterval>;
      let closed = false;

      function send(data: string, id?: number) {
        if (closed) return;
        try {
          const idLine = id !== undefined ? `id: ${id}\n` : '';
          controller.enqueue(encoder.encode(`${idLine}data: ${data}\n\n`));
        } catch {
          closed = true;
        }
      }

      async function poll() {
        if (closed) return;
        try {
          const { data: events } = await db
            .from('agent_events')
            .select('id, event_type, source_agent_id, payload, created_at')
            .contains('target_agent_ids', [agentId])
            .gt('id', lastEventId)
            .order('id', { ascending: true })
            .limit(20);

          if (events && events.length > 0) {
            for (const event of events) {
              send(JSON.stringify({
                event_type:      event.event_type,
                source_agent_id: event.source_agent_id,
                payload:         event.payload,
                timestamp:       event.created_at,
              }), event.id);
              lastEventId = event.id;
            }
          }
        } catch {
          // DB errors should not kill the stream — next poll will retry
        }
      }

      // Send initial connection confirmation
      send(JSON.stringify({ connected: true, agent_id: agentId }));

      // Poll immediately, then every 2 seconds
      await poll();
      pollTimer = setInterval(poll, 2000);

      // Heartbeat every 30 seconds
      heartbeatTimer = setInterval(() => {
        send(JSON.stringify({ ping: true }));
      }, 30_000);

      // Clean up when client disconnects
      req.signal.addEventListener('abort', () => {
        closed = true;
        clearInterval(pollTimer);
        clearInterval(heartbeatTimer);
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type':      'text/event-stream',
      'Cache-Control':     'no-cache',
      'Connection':        'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
