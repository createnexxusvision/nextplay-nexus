// NextPlay Nexus — A2A Method Registry
// All supported agent-to-agent JSON-RPC 2.0 methods with payload schemas

import { z } from 'zod';

// ── Method Name Constants ───────────────────────────────────

export const A2A = {
  // NIL deal lifecycle
  NIL_DEAL_PROPOSE:      'nil.deal.propose',
  NIL_DEAL_ACCEPT:       'nil.deal.accept',
  NIL_DEAL_REJECT:       'nil.deal.reject',
  NIL_DEAL_COUNTER:      'nil.deal.counter',

  // Profile access
  NIL_PROFILE_REQUEST:   'nil.profile.request',

  // Compliance
  NIL_COMPLIANCE_CHECK:  'nil.compliance.check',

  // Open Brain memory bridge
  BRAIN_REMEMBER:        'brain.remember',
  BRAIN_RECALL:          'brain.recall',

  // Platform notifications
  PLATFORM_NOTIFY:       'platform.notify',
} as const;

export type A2AMethod = typeof A2A[keyof typeof A2A];

// ── Who can send to whom ────────────────────────────────────
// Key = method, Value = { allowed senders, allowed receivers }

export const A2A_ROUTING: Record<A2AMethod, {
  senderTypes: string[];
  receiverTypes: string[];
}> = {
  [A2A.NIL_DEAL_PROPOSE]:     { senderTypes: ['brand'],     receiverTypes: ['athlete','program'] },
  [A2A.NIL_DEAL_ACCEPT]:      { senderTypes: ['athlete','program'], receiverTypes: ['brand'] },
  [A2A.NIL_DEAL_REJECT]:      { senderTypes: ['athlete','program'], receiverTypes: ['brand'] },
  [A2A.NIL_DEAL_COUNTER]:     { senderTypes: ['athlete','program'], receiverTypes: ['brand'] },
  [A2A.NIL_PROFILE_REQUEST]:  { senderTypes: ['brand','program','research'], receiverTypes: ['athlete'] },
  [A2A.NIL_COMPLIANCE_CHECK]: { senderTypes: ['brand','athlete','program','platform'], receiverTypes: ['compliance'] },
  [A2A.BRAIN_REMEMBER]:       { senderTypes: ['brand','athlete','program','platform','research','compliance'], receiverTypes: ['platform'] },
  [A2A.BRAIN_RECALL]:         { senderTypes: ['brand','athlete','program','platform','research','compliance'], receiverTypes: ['platform'] },
  [A2A.PLATFORM_NOTIFY]:      { senderTypes: ['platform'], receiverTypes: ['brand','athlete','program','research','compliance'] },
};

// ── Payload Schemas (Zod) ───────────────────────────────────

export const SPORT_IDS = ['football','flag-football','mens-basketball','womens-basketball','womens-soccer','esports'] as const;
export const DEAL_TYPES = ['apparel','social','appearance','endorsement','camp','other'] as const;

export const NilDealProposeSchema = z.object({
  to_agent_id:  z.string(),
  athlete_id:   z.string().uuid(),
  brand:        z.string().min(1).max(200),
  sport:        z.enum(SPORT_IDS),
  amount:       z.number().positive().max(10_000_000),
  deal_type:    z.enum(DEAL_TYPES),
  description:  z.string().max(1000).optional(),
  expiry_days:  z.number().int().min(1).max(365).optional(),
});

export const NilDealResponseSchema = z.object({
  to_agent_id:    z.string(),
  proposal_id:    z.string().uuid(),
  reason:         z.string().max(500).optional(),
});

export const NilDealCounterSchema = z.object({
  to_agent_id:    z.string(),
  proposal_id:    z.string().uuid(),
  counter_amount: z.number().positive(),
  counter_notes:  z.string().max(500).optional(),
});

export const NilProfileRequestSchema = z.object({
  to_agent_id:  z.string(),
  athlete_id:   z.string().uuid(),
  fields:       z.array(z.string()).optional(), // which fields to return
});

export const NilComplianceCheckSchema = z.object({
  to_agent_id:  z.string(),
  athlete_id:   z.string().uuid(),
  brand:        z.string(),
  amount:       z.number().positive(),
  deal_type:    z.enum(DEAL_TYPES),
  sport:        z.enum(SPORT_IDS),
  state:        z.string().length(2).optional(), // US state code
});

export const BrainRememberSchema = z.object({
  to_agent_id:   z.string(),
  content:       z.string().min(1).max(10000),
  entity_type:   z.string().optional(),
  entity_id:     z.string().uuid().optional(),
  tags:          z.array(z.string()).optional(),
  source:        z.string().optional(),
});

export const BrainRecallSchema = z.object({
  to_agent_id:  z.string(),
  query:        z.string().min(1).max(500),
  entity_type:  z.string().optional(),
  entity_id:    z.string().uuid().optional(),
  limit:        z.number().int().min(1).max(50).optional(),
});

export const PlatformNotifySchema = z.object({
  to_agent_id:  z.string(),
  message:      z.string().max(1000),
  severity:     z.enum(['info','warning','critical']).optional(),
});

// ── Schema Registry ─────────────────────────────────────────

export const A2A_SCHEMAS: Partial<Record<A2AMethod, z.ZodTypeAny>> = {
  [A2A.NIL_DEAL_PROPOSE]:     NilDealProposeSchema,
  [A2A.NIL_DEAL_ACCEPT]:      NilDealResponseSchema,
  [A2A.NIL_DEAL_REJECT]:      NilDealResponseSchema,
  [A2A.NIL_DEAL_COUNTER]:     NilDealCounterSchema,
  [A2A.NIL_PROFILE_REQUEST]:  NilProfileRequestSchema,
  [A2A.NIL_COMPLIANCE_CHECK]: NilComplianceCheckSchema,
  [A2A.BRAIN_REMEMBER]:       BrainRememberSchema,
  [A2A.BRAIN_RECALL]:         BrainRecallSchema,
  [A2A.PLATFORM_NOTIFY]:      PlatformNotifySchema,
};

export function isValidA2AMethod(method: string): method is A2AMethod {
  return Object.values(A2A).includes(method as A2AMethod);
}
