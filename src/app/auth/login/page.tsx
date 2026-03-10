'use client';
// NextPlay Nexus — Login Page

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import OAuthButtons from '@/components/auth/OAuthButtons';
import Web3AuthButton from '@/components/auth/Web3AuthButton';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>

      {/* Background field lines */}
      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[200,400,600,800,1000].map((x, i) => (
          <line key={x} x1={x} y1={0} x2={x} y2={800} stroke="#FDB927" strokeWidth="0.8" />
        ))}
        <circle cx={600} cy={400} r={280} stroke="#4A90D9" strokeWidth="0.8" fill="none" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', textDecoration: 'none', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 40, background: 'var(--color-gold)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)', flexShrink: 0 }}>N²</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>NextPlay <span style={{ color: 'var(--color-gold)' }}>Nexus</span></span>
        </Link>

        {/* Card */}
        <div className="glass-card" style={{ padding: '40px', borderRadius: '20px' }}>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.62rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600 }}>Athlete Portal</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Sign In</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0 0' }}>Welcome back to your NIL platform.</p>
          </div>

          <OAuthButtons mode="login" />
          <Web3AuthButton />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or email</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@school.edu"
                required
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(253,185,39,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(253,185,39,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            {error && (
              <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#F87171' }}>
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ marginTop: '8px', padding: '14px', background: loading ? 'rgba(253,185,39,0.5)' : 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s ease' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>

          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              New to NextPlay?{' '}
              <Link href="/auth/signup" style={{ color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600 }}>
                Create account
              </Link>
            </span>
          </div>

        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'var(--font-sub)', fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          NextPlay Nexus · NIL Intelligence Platform
        </p>

      </motion.div>
    </div>
  );
}
