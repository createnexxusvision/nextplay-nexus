// NextPlay Nexus — Open Brain MCP Server
// Semantic memory system: store and recall context about athletes, deals, brands, programs

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { type AgentRecord } from './agent-auth';

function getDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

const ENTITY_TYPES = ['athlete', 'brand', 'deal', 'program', 'market', 'general'] as const;

export function createOpenBrainServer(agent: AgentRecord): McpServer {
  const server = new McpServer({
    name: 'Open Brain — NextPlay Nexus Memory',
    version: '1.0.0',
  });

  // ── TOOLS ────────────────────────────────────────────────

  server.tool(
    'remember',
    'Store a memory in the Open Brain for future recall. Use this to persist context about athletes, brands, deals, or any NIL intelligence.',
    {
      content:     z.string().min(1).max(10000),
      entity_type: z.enum(ENTITY_TYPES).optional(),
      entity_id:   z.string().uuid().optional(),
      tags:        z.array(z.string().max(50)).max(20).optional(),
      source:      z.string().max(200).optional(),
    },
    async ({ content, entity_type, entity_id, tags, source }) => {
      const db = getDb();

      const { data, error } = await db.from('brain_memories').insert({
        agent_id:    agent.agent_id,
        content,
        entity_type: entity_type ?? 'general',
        entity_id:   entity_id ?? null,
        tags:        tags ?? [],
        source:      source ?? `agent:${agent.agent_id}`,
      }).select('id, created_at').single();

      if (error || !data) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: error?.message ?? 'Failed to store memory' }) }],
          isError: true,
        };
      }

      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ memory_id: data.id, stored: true, created_at: data.created_at }) }],
      };
    }
  );

  server.tool(
    'recall',
    'Search the Open Brain for relevant memories using full-text search.',
    {
      query:       z.string().min(1).max(500),
      entity_type: z.enum(ENTITY_TYPES).optional(),
      entity_id:   z.string().uuid().optional(),
      tags:        z.array(z.string()).optional(),
      limit:       z.number().int().min(1).max(50).optional(),
    },
    async ({ query, entity_type, entity_id, tags, limit }) => {
      const db = getDb();

      // Full-text search using generated tsvector column
      const tsQuery = query.trim().split(/\s+/).join(' & ');

      let dbQuery = db.from('brain_memories')
        .select('id, content, entity_type, entity_id, tags, source, created_at')
        .textSearch('content_tsv', tsQuery, { type: 'websearch' });

      if (entity_type) dbQuery = dbQuery.eq('entity_type', entity_type);
      if (entity_id)   dbQuery = dbQuery.eq('entity_id', entity_id);
      if (tags?.length) dbQuery = dbQuery.overlaps('tags', tags);
      dbQuery = dbQuery.order('created_at', { ascending: false }).limit(limit ?? 10);

      const { data, error } = await dbQuery;

      if (error) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: error.message }) }],
          isError: true,
        };
      }

      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify({ memories: data ?? [], count: data?.length ?? 0, query }),
        }],
      };
    }
  );

  server.tool(
    'tag_memory',
    'Add tags to an existing memory for better future recall.',
    {
      memory_id: z.string().uuid(),
      tags:      z.array(z.string().max(50)).min(1).max(20),
    },
    async ({ memory_id, tags }) => {
      const db = getDb();

      // Get existing tags
      const { data: existing } = await db.from('brain_memories')
        .select('id, tags, agent_id')
        .eq('id', memory_id).single();

      if (!existing) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: 'Memory not found' }) }],
          isError: true,
        };
      }

      const mergedTags = [...new Set([...(existing.tags ?? []), ...tags])];

      await db.from('brain_memories').update({ tags: mergedTags }).eq('id', memory_id);

      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ memory_id, tags: mergedTags, updated: true }) }],
      };
    }
  );

  server.tool(
    'get_entity_context',
    'Retrieve all memories related to a specific entity (athlete, brand, deal, or program).',
    {
      entity_type: z.enum(ENTITY_TYPES),
      entity_id:   z.string().uuid(),
      limit:       z.number().int().min(1).max(100).optional(),
    },
    async ({ entity_type, entity_id, limit }) => {
      const db = getDb();

      const { data } = await db.from('brain_memories')
        .select('id, content, tags, source, created_at')
        .eq('entity_type', entity_type)
        .eq('entity_id', entity_id)
        .order('created_at', { ascending: false })
        .limit(limit ?? 25);

      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify({
            entity_type,
            entity_id,
            memories: data ?? [],
            count: data?.length ?? 0,
          }),
        }],
      };
    }
  );

  server.tool(
    'connect_to_nexus',
    'Pull fresh data from the NextPlay Nexus MCP (athlete profile or deal) and automatically store it as a memory.',
    {
      entity_type: z.enum(['athlete', 'deal']),
      entity_id:   z.string().uuid(),
      note:        z.string().max(500).optional(),
    },
    async ({ entity_type, entity_id, note }) => {
      const db = getDb();

      let data: Record<string, unknown> | null = null;

      if (entity_type === 'athlete') {
        const { data: row } = await db.from('athletes')
          .select('*, profiles(full_name)')
          .eq('id', entity_id).single();
        data = row;
      } else {
        const { data: row } = await db.from('nil_deals').select('*').eq('id', entity_id).single();
        data = row;
      }

      if (!data) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: `${entity_type} not found` }) }],
          isError: true,
        };
      }

      const content = [
        `${entity_type.toUpperCase()} SNAPSHOT (${new Date().toISOString()})`,
        JSON.stringify(data, null, 2),
        ...(note ? [`Note: ${note}`] : []),
      ].join('\n');

      const { data: memory } = await db.from('brain_memories').insert({
        agent_id:    agent.agent_id,
        content,
        entity_type,
        entity_id,
        tags:        [entity_type, 'nexus-sync'],
        source:      'nexus-mcp-sync',
      }).select('id').single();

      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify({
            synced: true,
            memory_id: memory?.id,
            entity_type,
            entity_id,
            snapshot_at: new Date().toISOString(),
          }),
        }],
      };
    }
  );

  // ── RESOURCES ─────────────────────────────────────────────

  server.resource(
    'memory',
    'memory://{id}',
    async (uri) => {
      const id = uri.pathname.replace(/^\//, '');
      const db = getDb();
      const { data } = await db.from('brain_memories').select('*').eq('id', id).single();
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(data ?? { error: 'Memory not found' }),
        }],
      };
    }
  );

  server.resource(
    'entity-context',
    'context://{entity_type}/{entity_id}',
    async (uri) => {
      const parts = uri.pathname.replace(/^\//, '').split('/');
      const [entity_type, entity_id] = parts;
      const db = getDb();
      const { data } = await db.from('brain_memories')
        .select('*')
        .eq('entity_type', entity_type)
        .eq('entity_id', entity_id)
        .order('created_at', { ascending: false })
        .limit(50);
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify({ entity_type, entity_id, memories: data ?? [] }),
        }],
      };
    }
  );

  return server;
}
