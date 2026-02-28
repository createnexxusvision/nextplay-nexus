import { NextRequest, NextResponse } from "next/server";

interface DemoPayload {
  name: string;
  email: string;
  school: string;
  title?: string;
  phone?: string;
  programType?: string;
  sports?: string[];
  rosterSize?: string;
  notes?: string;
}

function sanitize(str: string): string {
  return str.replace(/[<>"'&]/g, "").trim().slice(0, 512);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 320;
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\-+().]{7,20}$/.test(phone);
}

export async function POST(req: NextRequest) {
  // Block non-JSON content types
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }

  let body: DemoPayload;
  try {
    body = (await req.json()) as DemoPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Required fields
  const name = sanitize(body.name ?? "");
  const email = sanitize(body.email ?? "");
  const school = sanitize(body.school ?? "");

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Name is required (min 2 characters)" }, { status: 422 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 422 });
  }
  if (!school || school.length < 2) {
    return NextResponse.json({ error: "School or organization name is required" }, { status: 422 });
  }

  // Optional fields — validate but don't reject
  const phone = body.phone ? sanitize(body.phone) : "";
  if (phone && !isValidPhone(phone)) {
    return NextResponse.json({ error: "Invalid phone number format" }, { status: 422 });
  }

  const ALLOWED_PROGRAM_TYPES = ["High School", "College / JUCO", "University", "Club / AAU"];
  const programType = body.programType && ALLOWED_PROGRAM_TYPES.includes(body.programType)
    ? body.programType
    : null;

  const ALLOWED_SPORTS = ["Football", "Women's Flag FB", "Men's Basketball", "Women's Basketball", "Women's Soccer", "ESports"];
  const sports = Array.isArray(body.sports)
    ? body.sports.filter((s) => ALLOWED_SPORTS.includes(s))
    : [];

  const ALLOWED_ROSTER_SIZES = ["1-50", "51-150", "151-300", "300+"];
  const rosterSize = body.rosterSize && ALLOWED_ROSTER_SIZES.includes(body.rosterSize)
    ? body.rosterSize
    : null;

  const notes = body.notes ? sanitize(body.notes).slice(0, 1000) : "";
  const title = body.title ? sanitize(body.title).slice(0, 120) : "";

  // Build validated payload (ready to forward to CRM / email service)
  const payload = {
    name,
    email,
    school,
    title,
    phone,
    programType,
    sports,
    rosterSize,
    notes,
    submittedAt: new Date().toISOString(),
    source: "nextplaynexus.com/demo",
  };

  // TODO: forward to email service (SendGrid, Resend) or CRM (HubSpot)
  // await sendDemoNotification(payload);

  console.info("[demo-request] received:", { email, school, programType });

  return NextResponse.json(
    { success: true, message: "Demo request received. We'll be in touch within 24 hours.", ref: `NPN-${Date.now()}` },
    { status: 201 }
  );
}

// Block other methods
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
