// NextPlay Nexus — Athlete Onboarding API
// POST /api/onboarding/athlete
// Creates the athletes DB row for a newly signed-up athlete

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const VALID_SPORTS = ['football', 'flag-football', 'mens-basketball', 'womens-basketball', 'womens-soccer', 'esports'] as const;

const OnboardingSchema = z.object({
  sport: z.enum(VALID_SPORTS),
  school: z.string().min(2).max(200).transform(s => s.replace(/[<>"'&]/g, '').trim()),
  position: z.string().max(80).optional().nullable().transform(s => s?.replace(/[<>"'&]/g, '').trim() || null),
});

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify user is an athlete
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'athlete') {
      return NextResponse.json({ error: 'Only athletes can complete this onboarding' }, { status: 403 });
    }

    // Parse and validate body
    const body = await request.json();
    const result = OnboardingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message ?? 'Invalid data' }, { status: 400 });
    }

    const { sport, school, position } = result.data;

    // Idempotent: upsert on profile_id conflict
    const { error: insertError } = await supabase
      .from('athletes')
      .upsert(
        { profile_id: user.id, sport, school, position, status: 'active' },
        { onConflict: 'profile_id', ignoreDuplicates: false }
      );

    if (insertError) {
      console.error('Athlete insert error:', insertError);
      return NextResponse.json({ error: 'Failed to create athlete profile' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error('Onboarding error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
