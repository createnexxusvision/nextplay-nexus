// NextPlay Nexus — MCP Server (NIL Intelligence)
// Exposes athlete data, NIL deals, and market intelligence as MCP tools/resources/prompts

import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { requirePermission, requireEntityOwnership, type AgentRecord } from './agent-auth';

const SPORT_IDS = ['football','flag-football','mens-basketball','womens-basketball','womens-soccer','esports'] as const;
const DEAL_TYPES = ['apparel','social','appearance','endorsement','camp','other'] as const;

function getDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function createNexusServer(agent: AgentRecord): McpServer {
  const server = new McpServer({
    name: 'NextPlay Nexus',
    version: '1.0.0',
  });

  // ── TOOLS ────────────────────────────────────────────────

  server.tool(
    'search_athletes',
    'Search NextPlay Nexus athletes by sport, school, and NIL score.',
    {
      sport:         z.enum(SPORT_IDS).optional(),
      school:        z.string().optional(),
      min_nil_score: z.number().min(0).max(100).optional(),
      limit:         z.number().int().min(1).max(50).optional(),
    },
    async ({ sport, school, min_nil_score, limit }) => {
      requirePermission(agent, 'athletes:search');
      const db = getDb();

      let query = db.from('athletes')
        .select('id, sport, school, position, nil_score, total_earned, nil_deals_count, status, profiles(full_name)')
        .eq('status', 'active');

      if (sport) query = query.eq('sport', sport);
      if (school) query = query.ilike('school', `%${school}%`);
      if (min_nil_score !== undefined) query = query.gte('nil_score', min_nil_score);
      query = query.order('nil_score', { ascending: false }).limit(limit ?? 20);

      const { data, error } = await query;
      if (error) throw new Error(error.message);

      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify({ athletes: data ?? [], count: data?.length ?? 0 }),
        }],
      };
    }
  );

  server.tool(
    'get_athlete_profile',
    'Get full athlete profile including NIL score and deal history.',
    { athlete_id: z.string().uuid() },
    async ({ athlete_id }) => {
      requirePermission(agent, 'athletes:read');
      const db = getDb();

      const { data, error } = await db.from('athletes')
        .select('*, profiles(full_name, role, avatar_url, created_at)')
        .eq('id', athlete_id)
        .single();

      if (error || !data) return {
        content: [{ type: 'text' as const, text: JSON.stringify({ error: 'Athlete not found' }) }],
        isError: true,
      };

      return {
        content: [{ type: 'text' as const, text: JSON.stringify(data) }],
      };
    }
  );

  server.tool(
    'submit_nil_deal_proposal',
    'Submit a NIL deal proposal for an athlete. Requires brand agent with deals:write permission.',
    {
      athlete_id:  z.string().uuid(),
      brand:       z.string().min(1).max(200),
      sport:       z.enum(SPORT_IDS),
      amount:      z.number().positive(),
      deal_type:   z.enum(DEAL_TYPES),
      description: z.string().max(1000).optional(),
    },
    async ({ athlete_id, brand, sport, amount, deal_type, description }) => {
      requirePermission(agent, 'deals:write');
      requireEntityOwnership(agent, brand); // agent's registered entity must match brand

      const db = getDb();

      // Verify athlete exists
      const { data: athleteRow } = await db.from('athletes').select('id').eq('id', athlete_id).single();
      if (!athleteRow) return {
        content: [{ type: 'text' as const, text: JSON.stringify({ error: 'Athlete not found' }) }],
        isError: true,
      };

      const { data, error } = await db.from('nil_deals').insert({
        athlete_id,
        brand,
        sport,
        amount,
        type: deal_type,
        status: 'pending',
      }).select().single();

      if (error || !data) return {
        content: [{ type: 'text' as const, text: JSON.stringify({ error: error?.message ?? 'Insert failed' }) }],
        isError: true,
      };

      // Record agent event
      await db.from('agent_events').insert({
        event_type: 'deal.proposed',
        source_agent_id: agent.agent_id,
        payload: { deal_id: data.id, athlete_id, brand, amount, deal_type },
        target_agent_ids: [agent.agent_id],
      });

      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ deal_id: data.id, status: 'pending', description }) }],
      };
    }
  );

  server.tool(
    'evaluate_deal_fit',
    'Evaluate how well an athlete matches a brand\'s NIL deal criteria.',
    {
      athlete_id:    z.string().uuid(),
      min_nil_score: z.number().min(0).max(100).optional(),
      sport:         z.enum(SPORT_IDS).optional(),
      max_budget:    z.number().positive().optional(),
    },
    async ({ athlete_id, min_nil_score, sport, max_budget }) => {
      requirePermission(agent, 'athletes:search');
      const db = getDb();

      const { data } = await db.from('athletes')
        .select('sport, nil_score, total_earned, nil_deals_count, status')
        .eq('id', athlete_id).single();

      if (!data) return {
        content: [{ type: 'text' as const, text: JSON.stringify({ fit_score: 0, reasons: ['Athlete not found'] }) }],
        isError: true,
      };

      let fitScore = 100;
      const reasons: string[] = [];

      if (min_nil_score && data.nil_score < min_nil_score) {
        fitScore -= 40;
        reasons.push(`NIL score ${data.nil_score} below minimum ${min_nil_score}`);
      }
      if (sport && data.sport !== sport) {
        fitScore -= 30;
        reasons.push(`Sport mismatch: athlete is ${data.sport}, brand targets ${sport}`);
      }
      if (data.status !== 'active') {
        fitScore -= 20;
        reasons.push(`Athlete status: ${data.status}`);
      }

      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ fit_score: Math.max(0, fitScore), reasons, athlete_sport: data.sport, nil_score: data.nil_score }) }],
      };
    }
  );

  server.tool(
    'get_market_intelligence',
    'Get NIL market data and deal statistics for a sport.',
    { sport: z.enum(SPORT_IDS).optional() },
    async ({ sport }) => {
      requirePermission(agent, 'market:read');
      const db = getDb();

      let dealQuery = db.from('nil_deals').select('sport, amount, type, status');
      if (sport) dealQuery = dealQuery.eq('sport', sport);
      const { data: deals } = await dealQuery;

      const stats = (deals ?? []).reduce((acc, d) => {
        const s = d.sport as string;
        if (!acc[s]) acc[s] = { count: 0, total: 0, avg: 0, types: {} as Record<string,number> };
        acc[s].count++;
        acc[s].total += Number(d.amount);
        acc[s].types[d.type] = (acc[s].types[d.type] ?? 0) + 1;
        return acc;
      }, {} as Record<string, { count: number; total: number; avg: number; types: Record<string,number> }>);

      Object.values(stats).forEach(s => { s.avg = s.count > 0 ? s.total / s.count : 0; });

      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ market_data: stats, generated_at: new Date().toISOString() }) }],
      };
    }
  );

  server.tool(
    'get_program_roster',
    'Get athletes registered under a program.',
    {
      program_id: z.string().uuid().optional(),
      school:     z.string().optional(),
    },
    async ({ program_id, school }) => {
      requirePermission(agent, 'programs:read');
      const db = getDb();

      let query = db.from('athletes')
        .select('id, sport, school, position, nil_score, status, profiles(full_name)')
        .eq('status', 'active');

      if (school) query = query.ilike('school', `%${school}%`);
      query = query.order('nil_score', { ascending: false });

      const { data } = await query;
      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ athletes: data ?? [], program_id }) }],
      };
    }
  );

  server.tool(
    'verify_nil_compliance',
    'Check if a proposed NIL deal meets NCAA and state regulations.',
    {
      athlete_id: z.string().uuid(),
      brand:      z.string(),
      amount:     z.number().positive(),
      deal_type:  z.enum(DEAL_TYPES),
      sport:      z.enum(SPORT_IDS),
    },
    async ({ athlete_id, brand, amount, deal_type, sport }) => {
      requirePermission(agent, 'compliance:check');
      const db = getDb();

      const { data: athlete } = await db.from('athletes').select('school, sport, status').eq('id', athlete_id).single();

      const issues: string[] = [];
      const warnings: string[] = [];

      if (!athlete) { issues.push('Athlete not found'); }
      else {
        if (athlete.status === 'pending') warnings.push('Athlete profile not yet verified');
        if (amount > 100000) warnings.push('Large deal amount — may require additional disclosure');
        if (deal_type === 'appearance' && amount > 10000) warnings.push('High-value appearance deal — review NCAA guidelines');
      }

      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify({
            compliant: issues.length === 0,
            issues,
            warnings,
            checked_at: new Date().toISOString(),
            note: 'This is a preliminary check. Consult a licensed NIL attorney for final determinations.',
          }),
        }],
      };
    }
  );

  // ── RESOURCES ─────────────────────────────────────────────

  server.resource(
    'athlete',
    new ResourceTemplate('athlete://{id}', { list: undefined }),
    async (uri, { id }) => {
      requirePermission(agent, 'athletes:read');
      const db = getDb();
      const { data } = await db.from('athletes').select('*, profiles(full_name, avatar_url)').eq('id', id).single();
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(data ?? { error: 'Not found' }),
        }],
      };
    }
  );

  server.resource(
    'deal',
    new ResourceTemplate('deal://{id}', { list: undefined }),
    async (uri, { id }) => {
      requirePermission(agent, 'deals:read');
      const db = getDb();
      const { data } = await db.from('nil_deals').select('*').eq('id', id).single();
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(data ?? { error: 'Not found' }),
        }],
      };
    }
  );

  // ── PROMPTS ───────────────────────────────────────────────

  server.prompt(
    'nil_deal_evaluation',
    'Evaluate whether a NIL deal is fair and beneficial for an athlete.',
    {
      athlete_id: z.string(),
      deal_amount: z.string(),
      brand_name:  z.string(),
      deal_type:   z.string(),
    },
    ({ athlete_id, deal_amount, brand_name, deal_type }) => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: `Evaluate this NIL deal for athlete ID ${athlete_id}:
Brand: ${brand_name}
Amount: $${deal_amount}
Type: ${deal_type}

Assess: (1) Is the compensation fair for this athlete's NIL score and sport? (2) Are there any red flags? (3) What negotiation points should the athlete consider? (4) Does this align with NCAA compliance guidelines?`,
        },
      }],
    })
  );

  server.prompt(
    'brand_athlete_match',
    'Find and evaluate athlete matches for a brand\'s NIL campaign criteria.',
    {
      brand_name:    z.string(),
      sport:         z.string(),
      budget:        z.string(),
      campaign_type: z.string(),
    },
    ({ brand_name, sport, budget, campaign_type }) => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: `Find athletes matching this NIL campaign for ${brand_name}:
Sport: ${sport}
Budget: $${budget}
Campaign type: ${campaign_type}

Using the search_athletes tool, identify top candidates. For each match, evaluate: NIL score fit, audience alignment, deal history, and estimated ROI.`,
        },
      }],
    })
  );

  server.prompt(
    'nil_compliance_check',
    'Run a comprehensive NIL compliance check before finalizing a deal.',
    {
      athlete_school: z.string(),
      deal_amount:    z.string(),
      brand_name:     z.string(),
    },
    ({ athlete_school, deal_amount, brand_name }) => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: `Perform a NIL compliance check for this deal:
School: ${athlete_school}
Brand: ${brand_name}
Amount: $${deal_amount}

Check: (1) NCAA Division-specific rules (2) State NIL law requirements (3) School disclosure requirements (4) Any booster restrictions (5) Disclosure and reporting obligations.`,
        },
      }],
    })
  );

  return server;
}
