// NextPlay Nexus — MCP Server Endpoint (Nexus NIL Intelligence)
// Web Standard Streamable HTTP transport (POST/GET/DELETE)
// Authenticate with: X-Agent-Id + X-Agent-Key headers

import { NextRequest, NextResponse } from 'next/server';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { requireAgentAuth } from '@/lib/mcp/agent-auth';
import { createNexusServer } from '@/lib/mcp/nexusServer';
import { rpcError, RPC } from '@/lib/mcp/jsonrpc';

// In-memory session store (upgrade to Redis/Supabase for multi-instance prod)
const sessions = new Map<string, WebStandardStreamableHTTPServerTransport>();

async function getTransport(sessionId: string, agent: Awaited<ReturnType<typeof requireAgentAuth>>) {
  if (sessions.has(sessionId)) return sessions.get(sessionId)!;

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => sessionId,
  });

  const server = createNexusServer(agent);
  await server.connect(transport);
  sessions.set(sessionId, transport);

  // Clean up session after 30 minutes of inactivity
  setTimeout(() => sessions.delete(sessionId), 30 * 60 * 1000);

  return transport;
}

export async function POST(req: NextRequest) {
  try {
    const agent = await requireAgentAuth(req);
    const sessionId = req.headers.get('mcp-session-id') ?? `${agent.agent_id}-${Date.now()}`;
    const transport = await getTransport(sessionId, agent);
    return await transport.handleRequest(req);
  } catch (err: unknown) {
    const e = err as { code?: number; message?: string };
    const code = e.code ?? RPC.INTERNAL_ERROR;
    return NextResponse.json(rpcError(null, code, e.message), {
      status: code === RPC.AGENT_UNAUTHORIZED || code === RPC.AGENT_SUSPENDED ? 401 :
              code === RPC.RATE_LIMITED ? 429 :
              code === RPC.PERMISSION_DENIED || code === RPC.ENTITY_MISMATCH ? 403 : 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const agent = await requireAgentAuth(req);
    const sessionId = req.headers.get('mcp-session-id');
    if (!sessionId || !sessions.has(sessionId)) {
      return NextResponse.json(rpcError(null, RPC.SESSION_EXPIRED, 'No active MCP session. Send a POST first.'), { status: 404 });
    }
    const transport = sessions.get(sessionId)!;
    return await transport.handleRequest(req);
  } catch (err: unknown) {
    const e = err as { code?: number; message?: string };
    return NextResponse.json(rpcError(null, e.code ?? RPC.INTERNAL_ERROR, e.message), { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  const sessionId = req.headers.get('mcp-session-id');
  if (sessionId && sessions.has(sessionId)) {
    const transport = sessions.get(sessionId)!;
    await transport.handleRequest(req);
    sessions.delete(sessionId);
  }
  return new Response(null, { status: 204 });
}
