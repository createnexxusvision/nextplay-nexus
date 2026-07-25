import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// /intelligence added 2026-07-25: it's a competitive-intelligence dashboard
// (named competitors + threat scores + notes on the other two ventures in
// the portfolio, not just NextPlay) that was previously unauthenticated
// and linked directly from the public nav -- anyone, including the
// competitors it names, could view it. Treat as protected like the rest
// of the internal surfaces.
//
// NOTE: /onboarding is deliberately NOT in this list. /onboarding/athlete
// is the public NIL-IQ questionnaire (no login required, by design -- it's
// a lead-gen tool). The one thing under /onboarding that IS meant to be
// authenticated (api/onboarding/athlete, a separate post-signup flow) does
// its own auth check internally, so it doesn't depend on this middleware.
const PROTECTED_PATHS = ['/dashboard', '/portal', '/admin', '/intelligence'];

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase Auth isn't configured yet (no project provisioned -- see
  // docs/db-schema.sql's header). Previously this threw on every single
  // request (not just protected ones), because createServerClient() was
  // called unconditionally with non-null-asserted env vars -- meaning the
  // entire site, including every public page and API route, 500'd. Treat
  // "not configured" as "no session" instead of crashing: protected paths
  // still redirect to login (fail closed, not open), and everything else
  // is completely unaffected by Supabase's config state, same as the rest
  // of this codebase's "lazy init, don't crash if unconfigured" pattern
  // (see getSupabase()/getResend() in the API routes).
  let user = null;
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });

      // Refresh session — required for Supabase SSR
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch (err) {
      console.error('[proxy] Supabase auth check failed:', err instanceof Error ? err.message : err);
    }
  }

  if (isProtected && !user) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (user && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
