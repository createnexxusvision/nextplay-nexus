import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";

// ── Validation schema ──────────────────────────────────────────────────────

const DemoSchema = z.object({
  name: z.string().min(2).max(120).transform(s => s.replace(/[<>"'&]/g, "").trim()),
  email: z.string().email().max(320).toLowerCase(),
  school: z.string().min(2).max(200).transform(s => s.replace(/[<>"'&]/g, "").trim()),
  title: z.string().max(120).optional().transform(s => s?.replace(/[<>"'&]/g, "").trim()),
  phone: z.string().regex(/^[\d\s\-+().]{7,20}$/).optional().or(z.literal("")),
  programType: z.enum(["high-school", "college", "university", "club"]).optional(),
  sports: z.array(z.enum(["football", "flag", "mens-bball", "womens-bball", "soccer", "esports"])).optional(),
  athleteRange: z.enum(["1–50", "51–150", "151–300", "300+"]).optional(),
  message: z.string().max(1000).optional().transform(s => s?.replace(/[<>"'&]/g, "").trim()),
});

// ── Lazy-init service clients (avoids crashes when env vars not yet set) ──

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// ── POST handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Block non-JSON content types
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

  const result = DemoSchema.safeParse(rawBody);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return NextResponse.json(
      { error: `${firstError.path.join(".")}: ${firstError.message}` },
      { status: 422 }
    );
  }

  const { name, email, school, title, phone, programType, sports, athleteRange, message } = result.data;
  const refId = `NPN-${Date.now()}`;

  // ── 1. Persist to Supabase ───────────────────────────────────────────────
  const supabase = getSupabase();
  if (supabase) {
    // Save demo request
    const { error: dbError } = await supabase.from("demo_requests").insert({
      name,
      email,
      school,
      title: title ?? null,
      phone: phone ?? null,
      program_type: programType ?? null,
      sports: sports ?? null,
      athlete_range: athleteRange ?? null,
      message: message ?? null,
      ref_id: refId,
      status: "new",
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("[demo-request] DB insert failed:", dbError.message);
      // Continue — don't block the user if DB write fails
    }

    // Also capture email in email_captures table
    const { error: captureError } = await supabase.from("email_captures").insert({
      email,
      user_type: "program_director",
      source: "demo_request",
      created_at: new Date().toISOString(),
    });

    if (captureError) {
      console.error("[demo-request] email_captures insert failed:", captureError.message);
    }
  }

  // ── 2. Send notification email via Resend ────────────────────────────────
  const resend = getResend();
  const notifyEmail = process.env.DEMO_NOTIFICATION_EMAIL;

  if (resend && notifyEmail) {
    await resend.emails.send({
      from: "NextPlay Nexus <noreply@nextplaynexus.com>",
      to: notifyEmail,
      subject: `New Demo Request — ${name} · ${school} [${refId}]`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#080F1E;color:#F7F5EE;padding:32px;border-radius:12px;">
          <div style="border-left:3px solid #FDB927;padding-left:16px;margin-bottom:24px;">
            <p style="margin:0;font-size:11px;color:#FDB927;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">New Demo Request</p>
            <h2 style="margin:6px 0 0;font-size:22px;font-weight:700;">${name}</h2>
            <p style="margin:4px 0 0;font-size:14px;color:#8FA3B8;">${school}${title ? ` · ${title}` : ""}</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#8FA3B8;text-transform:uppercase;letter-spacing:0.08em;width:120px;">Ref ID</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#FDB927;">${refId}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#8FA3B8;text-transform:uppercase;letter-spacing:0.08em;">Email</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;">${email}</td></tr>
            ${phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#8FA3B8;text-transform:uppercase;letter-spacing:0.08em;">Phone</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;">${phone}</td></tr>` : ""}
            ${programType ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#8FA3B8;text-transform:uppercase;letter-spacing:0.08em;">Program</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;">${programType}</td></tr>` : ""}
            ${sports?.length ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#8FA3B8;text-transform:uppercase;letter-spacing:0.08em;">Sports</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;">${sports.join(", ")}</td></tr>` : ""}
            ${athleteRange ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#8FA3B8;text-transform:uppercase;letter-spacing:0.08em;">Roster Size</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;">${athleteRange} athletes</td></tr>` : ""}
          </table>
          ${message ? `<div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.04);border-radius:8px;"><p style="margin:0;font-size:12px;color:#8FA3B8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Message</p><p style="margin:0;font-size:14px;line-height:1.6;">${message}</p></div>` : ""}
          <p style="margin-top:24px;font-size:11px;color:#506680;">NextPlay Nexus · NIL Intelligence Platform · ${new Date().toUTCString()}</p>
        </div>
      `,
    }).catch(err => console.error("[demo-request] Resend failed:", err));
  }

  console.info("[demo-request] processed:", { email, school, refId });

  return NextResponse.json(
    { success: true, message: "Demo request received. We'll be in touch within 24 hours.", ref: refId },
    { status: 201 }
  );
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
