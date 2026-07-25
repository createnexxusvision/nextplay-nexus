// NextPlay Nexus — shared Postgres client
//
// Was Supabase (client + service-role key); moved off it after the org's
// billing suspension blocked provisioning a project at all (see
// docs/db-schema.sql's header for the full story). Uses plain `pg` against
// DATABASE_URL rather than a vendor SDK -- works against Neon (Vercel's own
// recommended free serverless Postgres), or any standard Postgres, with no
// lock-in. Neon's connection string already includes `sslmode=require`;
// the `ssl` fallback below only matters for providers that don't set it.
//
// Lazy pool, matches the existing "return null / no-op if not configured"
// convention already used by getSupabase()/getResend() in the API routes --
// missing DATABASE_URL degrades to a logged warning, not a crash.

import { Pool, type QueryResultRow } from "pg";

let pool: Pool | null = null;
let attempted = false;

function getPool(): Pool | null {
  if (pool) return pool;
  if (attempted) return null;
  attempted = true;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  pool = new Pool({
    connectionString,
    // No explicit `ssl` override -- `pg` parses `sslmode` directly from the
    // connection string (Neon's own connection strings already include
    // `sslmode=require`). An earlier version of this forced SSL whenever
    // `sslmode=` was absent from the string, which broke every non-SSL
    // Postgres (e.g. local/test databases) with "The server does not
    // support SSL connections" -- caught by actually testing against a
    // real throwaway Postgres container before shipping, not assumed.
    max: 3, // serverless functions: keep this small, each invocation is short-lived
  });
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[] | null> {
  const p = getPool();
  if (!p) {
    console.warn("[db] DATABASE_URL not configured -- query skipped:", text.slice(0, 60));
    return null;
  }
  try {
    const result = await p.query<T>(text, params);
    return result.rows;
  } catch (err) {
    console.error("[db] query failed:", err instanceof Error ? err.message : err);
    throw err;
  }
}

export function dbConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}
