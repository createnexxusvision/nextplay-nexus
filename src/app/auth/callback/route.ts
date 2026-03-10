// NextPlay Nexus — Auth Callback Handler
// Handles OAuth redirects, magic links, and email confirmations
// After session is established, routes athletes to onboarding if they have no athlete record

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`);
  }

  // Check if athlete needs onboarding
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`);
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'athlete') {
    const { data: athleteRow } = await supabase
      .from('athletes')
      .select('id')
      .eq('profile_id', user.id)
      .maybeSingle();

    if (!athleteRow) {
      return NextResponse.redirect(`${origin}/onboarding/athlete`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
