-- NextPlay Nexus — database schema
--
-- Was written for Supabase; moved to plain Postgres (Neon, or any standard
-- Postgres reachable via DATABASE_URL -- see src/lib/db.ts) after the
-- Supabase org's billing suspension blocked provisioning a project at all.
-- No RLS here anymore: RLS policies (as they were written before) only
-- mean something under Supabase's PostgREST anon/authenticated/service_role
-- model. A plain `pg` connection using one application role has no such
-- distinction -- `enable row level security` with no policies would have
-- silently blocked the app's own queries, not protected anything. Access
-- control here is simply: only server-side API routes ever call query()
-- from src/lib/db.ts; nothing reaches this database directly from the
-- browser (that was the bug in the athlete-profile flow before this pass).
--
-- Apply with `psql "$DATABASE_URL" -f docs/db-schema.sql` once a real
-- Postgres (e.g. a free Neon project) is provisioned and DATABASE_URL is
-- set. Matches exactly what src/app/api/email-capture/route.ts,
-- src/app/api/demo/route.ts, and src/app/api/athlete-profile/route.ts
-- insert into -- see those files for the authoritative field list; this
-- schema should not drift from them.

create extension if not exists pgcrypto; -- for gen_random_uuid()

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

-- Backs the public NIL-IQ questionnaire (src/app/onboarding/athlete/page.tsx
-- -> src/app/api/athlete-profile/route.ts). Distinct from any future
-- `athletes` table used by the authenticated post-signup onboarding flow
-- (src/app/api/onboarding/athlete/route.ts) -- this one is the anonymous
-- lead-gen quiz, no login required.
create table if not exists athlete_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade text not null,
  sport text not null,
  state text not null,
  school text not null,
  email text not null,
  nil_literacy_score text not null, -- 'Rookie' | 'Rising' | 'Ready'

  nil_stands text,
  heard_of_nil_rules text,
  has_sponsorships text,
  nil_confidence int,
  nil_activities text[],

  has_bank_account text,
  knows_w9 text,
  brand_payment_response text,
  fin_confidence int,
  fin_topics text[],

  intelligences text[],

  team_role text,
  challenge_response text,
  two_year_goal text,
  learn_topics text[],
  recommended_track text,

  created_at timestamptz not null default now()
);

create index if not exists athlete_profiles_email_idx on athlete_profiles (email);
create index if not exists athlete_profiles_created_at_idx on athlete_profiles (created_at desc);
create index if not exists athlete_profiles_badge_idx on athlete_profiles (nil_literacy_score);
-- The badge index matters for the "real-time feedback on the market"
-- use case Danny flagged -- e.g. `select nil_literacy_score, count(*) from
-- athlete_profiles group by 1` becomes a real, cheap query once this has
-- real rows, not just a nice idea.
