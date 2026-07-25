-- NextPlay Nexus — Supabase schema for email capture + demo requests
-- Apply once the Supabase project's billing block is resolved.
-- Matches exactly what src/app/api/email-capture/route.ts and
-- src/app/api/demo/route.ts already insert into -- see those files for
-- the authoritative field list; this schema should not drift from them.

create table if not exists email_captures (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  user_type text not null default 'general',
  source text not null default 'landing_page',
  created_at timestamptz not null default now()
);

create unique index if not exists email_captures_email_source_key
  on email_captures (email, source);
-- Unique per (email, source) rather than per email alone: the same person
-- can reasonably show up from "landing_page" AND "demo_request" and both
-- are worth keeping as distinct signups for segmentation later.

create index if not exists email_captures_created_at_idx
  on email_captures (created_at desc);

create table if not exists demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  school text not null,
  title text,
  phone text,
  program_type text,
  sports text[],
  athlete_range text,
  message text,
  ref_id text not null unique,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists demo_requests_status_idx on demo_requests (status);
create index if not exists demo_requests_created_at_idx on demo_requests (created_at desc);

-- RLS: these tables are only ever written to via the service-role key from
-- API routes (see getSupabase() in both route.ts files), never from the
-- browser. Enable RLS with no policies so the anon/authenticated roles
-- have zero access by default -- only service_role (which bypasses RLS)
-- can touch these tables.
alter table email_captures enable row level security;
alter table demo_requests enable row level security;
