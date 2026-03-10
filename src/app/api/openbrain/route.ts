// NextPlay Nexus — Open Brain MCP Endpoint
// Web Standard Streamable HTTP transport (POST/GET/DELETE)
// Authenticate with: X-Agent-Id + X-Agent-Key headers

import { NextRequest, NextResponse } from 'next/server';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { requireAgentAuth } from '@/lib/mcp/agent-auth';
import { createOpenBrainServer } from '@/lib/mcp/openBrainServer';
import { rpcError, RPC } from '@/lib/mcp/jsonrpc';

const sessions = new Map<string, WebStandardStreamableHTTPServerTransport>();

async function getTransport(sessionId: string, agent: Awaited<ReturnType<typeof requireAgentAuth>>) {
  if (sessions.has(sessionId)) return sessions.get(sessionId)!;

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => sessionId,
  });

  const server = createOpenBrainServer(agent);
  await server.connect(transport);
  sessions.set(sessionId, transport);
  setTimeout(() => sessions.delete(sessionId), 30 * 60 * 1000);

  return transport;
}

export async function POST(req: NextRequest) {
  try {
    const agent = await requireAgentAuth(req);
    const sessionId = req.headers.get('mcp-session-id') ?? `ob-${agent.agent_id}-${Date.now()}`;
    const transport = await getTransport(sessionId, agent);
    return await transport.handleRequest(req);
  } catch (err: unknown) {
    const e = err as { code?: number; message?: string };
    const code = e.code ?? RPC.INTERNAL_ERROR;
    return NextResponse.json(rpcError(null, code, e.message), {
      status: code === RPC.AGENT_UNAUTHORIZED ? 401 : code === RPC.RATE_LIMITED ? 429 : 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const agent = await requireAgentAuth(req);
    const sessionId = req.headers.get('mcp-session-id');
    if (!sessionId || !sessions.has(sessionId)) {
      return NextResponse.json(rpcError(null, RPC.SESSION_EXPIRED, 'No active Open Brain session.'), { status: 404 });
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
