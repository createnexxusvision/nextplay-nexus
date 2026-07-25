import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";

// ── Validation schema ──────────────────────────────────────────────────────

const EmailCaptureSchema = z.object({
  email: z.string().email().max(320).toLowerCase(),
  user_type: z.string().max(60).optional().default("general"),
  source: z.string().max(120).optional().default("landing_page"),
});

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

  try {
    await query(
      `insert into email_captures (email, user_type, source)
       values ($1, $2, $3)
       on conflict (email, source) do nothing`,
      [email, user_type, source]
    );
  } catch (err) {
    // Log but don't fail the request -- matches the prior Supabase behavior
    console.error("[email-capture] DB insert failed:", err instanceof Error ? err.message : err);
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
