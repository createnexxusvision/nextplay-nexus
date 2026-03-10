// NextPlay Nexus — JSON-RPC 2.0 Foundation
// Wire format for all MCP and A2A communication

// ── Core Types ─────────────────────────────────────────────

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: unknown;
}

export interface JsonRpcNotification {
  jsonrpc: '2.0';
  method: string;
  params?: unknown;
}

export interface JsonRpcSuccessResponse {
  jsonrpc: '2.0';
  id: string | number;
  result: unknown;
}

export interface JsonRpcErrorResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  error: JsonRpcErrorObject;
}

export interface JsonRpcErrorObject {
  code: number;
  message: string;
  data?: unknown;
}

export type JsonRpcResponse = JsonRpcSuccessResponse | JsonRpcErrorResponse;
export type JsonRpcMessage = JsonRpcRequest | JsonRpcNotification | JsonRpcResponse;

// ── Standard Error Codes ────────────────────────────────────

export const RPC = {
  // JSON-RPC 2.0 standard
  PARSE_ERROR:       -32700,
  INVALID_REQUEST:   -32600,
  METHOD_NOT_FOUND:  -32601,
  INVALID_PARAMS:    -32602,
  INTERNAL_ERROR:    -32603,

  // NextPlay Nexus custom (-32001 to -32099)
  AGENT_UNAUTHORIZED: -32001,
  ENTITY_MISMATCH:    -32002,
  RATE_LIMITED:       -32003,
  PERMISSION_DENIED:  -32004,
  AGENT_SUSPENDED:    -32005,
  INVALID_TARGET:     -32006,
  SESSION_EXPIRED:    -32007,
} as const;

export const RPC_MESSAGES: Record<number, string> = {
  [RPC.PARSE_ERROR]:       'Parse error',
  [RPC.INVALID_REQUEST]:   'Invalid request',
  [RPC.METHOD_NOT_FOUND]:  'Method not found',
  [RPC.INVALID_PARAMS]:    'Invalid params',
  [RPC.INTERNAL_ERROR]:    'Internal error',
  [RPC.AGENT_UNAUTHORIZED]:'Agent authentication failed',
  [RPC.ENTITY_MISMATCH]:   'Entity ownership mismatch — you cannot act on behalf of this entity',
  [RPC.RATE_LIMITED]:      'Rate limit exceeded',
  [RPC.PERMISSION_DENIED]: 'Insufficient permissions for this operation',
  [RPC.AGENT_SUSPENDED]:   'Agent account is suspended or blocked',
  [RPC.INVALID_TARGET]:    'Target agent not found or inactive',
  [RPC.SESSION_EXPIRED]:   'MCP session has expired',
};

// ── Builder Functions ───────────────────────────────────────

export function rpcRequest(method: string, params?: unknown, id?: string | number): JsonRpcRequest {
  return {
    jsonrpc: '2.0',
    id: id ?? crypto.randomUUID(),
    method,
    params,
  };
}

export function rpcResult(id: string | number, result: unknown): JsonRpcSuccessResponse {
  return { jsonrpc: '2.0', id, result };
}

export function rpcError(
  id: string | number | null,
  code: number,
  message?: string,
  data?: unknown
): JsonRpcErrorResponse {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message: message ?? RPC_MESSAGES[code] ?? 'Unknown error',
      ...(data !== undefined && { data }),
    },
  };
}

export function rpcNotification(method: string, params?: unknown): JsonRpcNotification {
  return { jsonrpc: '2.0', method, params };
}

// ── Validation Helpers ──────────────────────────────────────

export function isJsonRpcRequest(v: unknown): v is JsonRpcRequest {
  return (
    typeof v === 'object' && v !== null &&
    (v as JsonRpcRequest).jsonrpc === '2.0' &&
    typeof (v as JsonRpcRequest).method === 'string' &&
    'id' in v
  );
}

export function isJsonRpcResponse(v: unknown): v is JsonRpcResponse {
  return (
    typeof v === 'object' && v !== null &&
    (v as JsonRpcResponse).jsonrpc === '2.0' &&
    ('result' in v || 'error' in v)
  );
}

export function parseJsonRpcBody(body: unknown): JsonRpcRequest {
  if (!isJsonRpcRequest(body)) {
    throw { code: RPC.INVALID_REQUEST, message: RPC_MESSAGES[RPC.INVALID_REQUEST] };
  }
  return body;
}
