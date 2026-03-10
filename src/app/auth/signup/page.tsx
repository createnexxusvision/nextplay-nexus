'use client';
// NextPlay Nexus — Sign Up Page

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import OAuthButtons from '@/components/auth/OAuthButtons';
import Web3AuthButton from '@/components/auth/Web3AuthButton';

type Role = 'athlete' | 'program_admin' | 'brand';

const ROLE_OPTIONS: { id: Role; label: string; desc: string; icon: string }[] = [
  { id: 'athlete', label: 'Athlete', desc: 'Track NIL deals & build your profile', icon: '🏆' },
  { id: 'program_admin', label: 'Program Admin', desc: 'Manage your school\'s athlete roster', icon: '🏫' },
  { id: 'brand', label: 'Brand / Sponsor', desc: 'Discover and connect with athletes', icon: '🤝' },
];

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

export default function SignupPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>('athlete');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card"
          style={{ padding: '48px 40px', maxWidth: '420px', textAlign: 'center', borderRadius: '20px' }}
        >
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(26,127,95,0.2)', border: '2px solid var(--color-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem' }}>✓</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', margin: '0 0 12px' }}>Check Your Email</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 28px' }}>
            We sent a confirmation link to <strong style={{ color: 'var(--color-gold)' }}>{email}</strong>. Click it to activate your account.
          </p>
          <Link href="/auth/login" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', textDecoration: 'none' }}>
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>

      <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[200,400,600,800,1000].map((x) => (
          <line key={x} x1={x} y1={0} x2={x} y2={800} stroke="#FDB927" strokeWidth="0.8" />
        ))}
        <circle cx={600} cy={400} r={280} stroke="#1A7F5F" strokeWidth="0.8" fill="none" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '480px' }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', textDecoration: 'none', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 40, background: 'var(--color-gold)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>N²</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>NextPlay <span style={{ color: 'var(--color-gold)' }}>Nexus</span></span>
        </Link>

        <div className="glass-card" style={{ padding: '40px', borderRadius: '20px' }}>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.62rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600 }}>Join the Platform</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Create Account</h1>
          </div>

          {/* Role selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '10px' }}>I am a</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {ROLE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRole(opt.id)}
                  style={{
                    flex: 1,
                    padding: '10px 8px',
                    background: role === opt.id ? 'rgba(253,185,39,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${role === opt.id ? 'rgba(253,185,39,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '8px',
                    color: role === opt.id ? 'var(--color-gold)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-sub)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{opt.icon}</div>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <OAuthButtons mode="signup" role={role} />
          <Web3AuthButton />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or email</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(253,185,39,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

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
                placeholder="Min. 8 characters"
                required
                minLength={8}
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
              {loading ? 'Creating account...' : 'Create Account'}
            </motion.button>

          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600 }}>
                Sign in
              </Link>
            </span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
