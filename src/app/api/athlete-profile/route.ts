import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";

// ── Validation schema ──────────────────────────────────────────────────────
// Backs the public NIL-IQ questionnaire at /onboarding/athlete (the
// unauthenticated marketing-page quiz -- distinct from
// /api/onboarding/athlete, which is a separate, authenticated
// post-signup flow writing to a different table). Mirrors the FormData
// shape in src/app/onboarding/athlete/page.tsx and computeNILBadge()'s
// output. Replaces a prior implementation that wrote directly from the
// browser to Supabase with the anon key -- no server-side validation, and
// a table (athlete_profiles) that never had a real schema anywhere.

const sanitize = (s: string) => s.replace(/[<>"'&]/g, "").trim();

const AthleteProfileSchema = z.object({
  name: z.string().min(1).max(120).transform(sanitize),
  grade: z.enum(["9", "10", "11", "12"]),
  sport: z.string().min(1).max(60).transform(sanitize),
  state: z.string().length(2),
  school: z.string().min(1).max(200).transform(sanitize),
  email: z.string().email().max(320).toLowerCase(),

  nilStands: z.string().max(10),
  heardOfNilRules: z.string().max(10),
  hasSponsorships: z.string().max(10),
  nilConfidence: z.number().int().min(0).max(10),
  nilActivities: z.array(z.string().max(120)).max(20),

  hasBankAccount: z.string().max(10),
  knowsW9: z.string().max(10),
  brandPaymentResponse: z.string().max(10),
  finConfidence: z.number().int().min(0).max(10),
  finTopics: z.array(z.string().max(120)).max(20),

  intelligences: z.array(z.string().max(60)).max(20),

  teamRole: z.string().max(120).transform(sanitize),
  challengeResponse: z.string().max(120).transform(sanitize),
  twoYearGoal: z.string().max(1000).transform(sanitize),
  learnTopics: z.array(z.string().max(120)).max(20),

  nilLiteracyScore: z.enum(["Rookie", "Rising", "Ready"]),
  recommendedTrack: z.string().max(1000),
});

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = AthleteProfileSchema.safeParse(rawBody);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return NextResponse.json(
      { error: `${firstError.path.join(".")}: ${firstError.message}` },
      { status: 422 }
    );
  }

  const d = result.data;
  let saved = false;

  try {
    await query(
      `insert into athlete_profiles
         (name, grade, sport, state, school, email, nil_literacy_score,
          nil_stands, heard_of_nil_rules, has_sponsorships, nil_confidence, nil_activities,
          has_bank_account, knows_w9, brand_payment_response, fin_confidence, fin_topics,
          intelligences, team_role, challenge_response, two_year_goal, learn_topics, recommended_track)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)`,
      [
        d.name, d.grade, d.sport, d.state, d.school, d.email, d.nilLiteracyScore,
        d.nilStands, d.heardOfNilRules, d.hasSponsorships, d.nilConfidence, d.nilActivities,
        d.hasBankAccount, d.knowsW9, d.brandPaymentResponse, d.finConfidence, d.finTopics,
        d.intelligences, d.teamRole, d.challengeResponse, d.twoYearGoal, d.learnTopics, d.recommendedTrack,
      ]
    );
    saved = true;
  } catch (err) {
    console.error("[athlete-profile] athlete_profiles insert failed:", err instanceof Error ? err.message : err);
  }

  try {
    await query(
      `insert into email_captures (email, user_type, source)
       values ($1, 'athlete', 'nil_questionnaire')
       on conflict (email, source) do nothing`,
      [d.email]
    );
  } catch (err) {
    console.error("[athlete-profile] email_captures insert failed:", err instanceof Error ? err.message : err);
  }

  // saved=false means the profile itself didn't persist (email_captures can
  // still have gone through independently) -- the frontend shows the
  // computed result either way (it's real, computed client-side), but only
  // claims the profile was saved for real when it actually was.
  return NextResponse.json({ success: true, saved }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
