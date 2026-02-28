'use client';
// NextPlay Nexus — CTA Banner Section v2.0

import { useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return;
    setSubmitting(true);
    // Lightweight interest capture — no sensitive data
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="programs" ref={ref} style={{ padding: '6rem 1.5rem', background: 'var(--bg-app)', overflow: 'hidden', position: 'relative' }}>
      {/* Background accent — dual radial */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(253,185,39,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 0%, rgba(74,144,217,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Animated gold border card */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          background: 'rgba(11, 29, 58, 0.6)',
          backdropFilter: 'blur(24px)',
          borderRadius: '24px',
          border: '1px solid rgba(253,185,39,0.2)',
          padding: '3.5rem 2.5rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
        }}
        className="animate-border-glow"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '40px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
          <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>Get Started Today</span>
          <div style={{ width: '40px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '0.02em', color: 'var(--text-primary)', marginBottom: '16px' }}>
          Ready to Launch Your<br />
          <span style={{ color: 'var(--color-gold)' }}>NIL Program?</span>
        </h2>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 36px' }}>
          Join programs across Football, Basketball, Soccer, Flag Football, and ESports. Your athletes deserve the best start to their NIL journey.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}
        >
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link
              href="/demo"
              style={{ display: 'inline-block', padding: '16px 40px', background: 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', textDecoration: 'none', transition: 'box-shadow 0.2s ease, background 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(253,185,39,0.45)'; (e.currentTarget as HTMLElement).style.background = '#FFD166'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.background = 'var(--color-gold)'; }}
            >
              Request a Demo
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link
              href="/dashboard"
              style={{ display: 'inline-block', padding: '16px 40px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(253,185,39,0.3)', transition: 'border-color 0.2s ease, background 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.7)'; (e.currentTarget as HTMLElement).style.background = 'rgba(253,185,39,0.06)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              View Dashboard Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Email capture */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
          <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Stay updated — NIL market intelligence in your inbox
          </p>
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-emerald)', fontFamily: 'var(--font-sub)', fontSize: '0.82rem', fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8l2.5 2.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              You&apos;re in — check your inbox
            </motion.div>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email for NIL updates"
                style={{
                  padding: '11px 18px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '7px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  width: '240px',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(253,185,39,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-medium)')}
              />
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '11px 22px',
                  background: submitting ? 'rgba(253,185,39,0.5)' : 'rgba(253,185,39,0.15)',
                  border: '1px solid rgba(253,185,39,0.4)',
                  borderRadius: '7px',
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  cursor: submitting ? 'wait' : 'pointer',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLElement).style.background = 'rgba(253,185,39,0.22)'; }}
                onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLElement).style.background = 'rgba(253,185,39,0.15)'; }}
              >
                {submitting ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
