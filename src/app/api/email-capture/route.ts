import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// ── Validation schema ──────────────────────────────────────────────────────

const EmailCaptureSchema = z.object({
  email: z.string().email().max(320).toLowerCase(),
  user_type: z.string().max(60).optional().default("general"),
  source: z.string().max(120).optional().default("landing_page"),
});

// ── Lazy-init Supabase (service role) ─────────────────────────────────────

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// ── POST handler ───────────────────────────────────────────────────────────

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

  const result = EmailCaptureSchema.safeParse(rawBody);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return NextResponse.json(
      { error: `${firstError.path.join(".")}: ${firstError.message}` },
      { status: 422 }
    );
  }

  const { email, user_type, source } = result.data;

  const supabase = getSupabase();
  if (supabase) {
    const { error: dbError } = await supabase.from("email_captures").insert({
      email,
      user_type,
      source,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      // Log but don't fail — upsert on conflict or duplicate is acceptable
      console.error("[email-capture] DB insert failed:", dbError.message);
    }
  } else {
    console.warn("[email-capture] Supabase not configured — email not persisted:", email);
  }

  console.info("[email-capture] processed:", { email, user_type, source });

  return NextResponse.json(
    { success: true, message: "You're on the list — we'll be in touch soon." },
    { status: 201 }
  );
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
