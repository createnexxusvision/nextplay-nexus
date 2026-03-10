'use client';
// NextPlay Nexus — OAuth Social Login Buttons
// Used on both /auth/login and /auth/signup

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Role = 'athlete' | 'program_admin' | 'brand';
type OAuthProvider = 'google' | 'apple' | 'twitter' | 'linkedin_oidc';

interface OAuthButtonsProps {
  mode: 'login' | 'signup';
  role?: Role;
}

const PROVIDERS: { id: OAuthProvider; label: string; icon: React.ReactNode }[] = [
  {
    id: 'google',
    label: 'Google',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: 'apple',
    label: 'Apple',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.39.07 2.35.82 3.16.82.92 0 2.64-.99 4.46-.81 .76.03 2.9.3 4.27 2.35-3.93 2.38-3.3 7.64.11 9.5zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
  },
  {
    id: 'twitter',
    label: 'X',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin_oidc',
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function OAuthButtons({ mode, role }: OAuthButtonsProps) {
  const [loading, setLoading] = useState<OAuthProvider | null>(null);

  async function handleOAuth(provider: OAuthProvider) {
    setLoading(provider);
    const supabase = createClient();

    const redirectTo = `${window.location.origin}/auth/callback`;
    const queryParams: Record<string, string> = {};
    if (mode === 'signup' && role) {
      queryParams.role = role;
    }

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        queryParams: Object.keys(queryParams).length > 0 ? queryParams : undefined,
        scopes: provider === 'linkedin_oidc' ? 'openid profile email' : undefined,
      },
    });

    // Loading stays true — page will navigate away
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0 12px' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
          or continue with
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {PROVIDERS.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleOAuth(p.id)}
            disabled={loading !== null}
            title={`Continue with ${p.label}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              padding: '10px 8px',
              background: loading === p.id ? 'rgba(253,185,39,0.08)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${loading === p.id ? 'rgba(253,185,39,0.3)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              cursor: loading !== null ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: loading !== null && loading !== p.id ? 0.5 : 1,
            }}
            onMouseEnter={e => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
              }
            }}
            onMouseLeave={e => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
              }
            }}
          >
            {loading === p.id ? (
              <div style={{ width: 18, height: 18, border: '2px solid rgba(253,185,39,0.3)', borderTopColor: 'var(--color-gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            ) : (
              p.icon
            )}
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em' }}>
              {p.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
