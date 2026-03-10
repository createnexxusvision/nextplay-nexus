'use client';
// NextPlay Nexus — NILPOC Section v1.0
// Landing page section explaining NILPOC smart contract payments

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// ── Data ─────────────────────────────────────────────────────────────────────

const COLUMNS = [
  {
    id: 'traditional',
    eyebrow: 'Traditional NIL Deals',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="13" rx="2"/>
        <path d="M3 10h18M7 15h2M13 15h4"/>
      </svg>
    ),
    accent: 'rgba(248,113,113,0.7)',
    accentBg: 'rgba(248,113,113,0.08)',
    accentBorder: 'rgba(248,113,113,0.2)',
    items: [
      { icon: '✗', text: 'Bank wire or paper check' },
      { icon: '✗', text: '30–90 day payment delays' },
      { icon: '✗', text: '15–25% agent fees' },
      { icon: '✗', text: 'Zero payment transparency' },
      { icon: '✗', text: 'Brand controls all funds' },
    ],
  },
  {
    id: 'nilpoc',
    eyebrow: 'NILPOC Smart Contracts',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    accent: 'var(--color-gold)',
    accentBg: 'rgba(253,185,39,0.08)',
    accentBorder: 'rgba(253,185,39,0.25)',
    featured: true,
    items: [
      { icon: '✓', text: 'On-chain payment execution' },
      { icon: '✓', text: 'Instant stablecoin release' },
      { icon: '✓', text: '0% agent cut — direct to athlete' },
      { icon: '✓', text: 'Full audit trail on blockchain' },
      { icon: '✓', text: 'Athlete controls their wallet' },
    ],
  },
  {
    id: 'stablecoin',
    eyebrow: 'Stablecoin Revenue',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v2m0 8v2M9 9h4.5a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3H15"/>
      </svg>
    ),
    accent: 'rgba(52,199,89,0.8)',
    accentBg: 'rgba(52,199,89,0.08)',
    accentBorder: 'rgba(52,199,89,0.2)',
    items: [
      { icon: '✓', text: 'Earn USDC/USDT for brand deals' },
      { icon: '✓', text: 'No conversion losses' },
      { icon: '✓', text: 'Integrate with DeFi yields' },
      { icon: '✓', text: 'Spend globally with crypto card' },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function NILPOCSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="nilpoc"
      ref={ref}
      style={{
        padding: '7rem 1.5rem',
        background: 'var(--bg-app)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blockchain grid background SVG */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035, pointerEvents: 'none' }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 700"
      >
        {/* Vertical grid lines */}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={700} stroke="#FDB927" strokeWidth="0.6"/>
        ))}
        {/* Horizontal grid lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 100} x2={1200} y2={i * 100} stroke="#FDB927" strokeWidth="0.6"/>
        ))}
        {/* Block nodes at intersections */}
        {[200, 400, 600, 800, 1000].map(x =>
          [100, 200, 400, 500].map(y => (
            <rect key={`node-${x}-${y}`} x={x - 4} y={y - 4} width={8} height={8} rx={2} fill="#FDB927"/>
          ))
        )}
        {/* Connecting accent lines */}
        <line x1={200} y1={200} x2={400} y2={400} stroke="#FDB927" strokeWidth="0.8"/>
        <line x1={400} y1={400} x2={600} y2={200} stroke="#FDB927" strokeWidth="0.8"/>
        <line x1={600} y1={200} x2={800} y2={400} stroke="#FDB927" strokeWidth="0.8"/>
        <line x1={800} y1={400} x2={1000} y2={200} stroke="#FDB927" strokeWidth="0.8"/>
      </svg>

      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(253,185,39,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: 40, height: 1, background: 'var(--color-gold)', opacity: 0.6 }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
              NILPOC Protocol
            </span>
            <div style={{ width: 40, height: 1, background: 'var(--color-gold)', opacity: 0.6 }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            lineHeight: 1.05,
            margin: '0 0 16px',
            color: 'var(--text-primary)',
          }}>
            The Future of <span style={{ color: 'var(--color-gold)' }}>NIL Payments</span>
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {['Transparent.', 'Instant.', 'Athlete-Controlled.'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: i === 1 ? 'var(--color-gold)' : 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >{tag}</motion.span>
            ))}
          </div>
        </motion.div>

        {/* Three columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}>
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: col.featured
                  ? 'rgba(11,29,58,0.7)'
                  : 'rgba(255,255,255,0.02)',
                border: `1px solid ${col.featured ? 'rgba(253,185,39,0.3)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '20px',
                padding: '36px 28px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: col.featured ? 'blur(20px)' : 'none',
                boxShadow: col.featured ? '0 24px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(253,185,39,0.08)' : 'none',
              }}
            >
              {/* Featured top glow */}
              {col.featured && (
                <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 2, background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)', borderRadius: '0 0 4px 4px' }} />
              )}

              {/* Eyebrow + icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '10px',
                  background: col.accentBg,
                  border: `1px solid ${col.accentBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: col.accent,
                  flexShrink: 0,
                }}>
                  {col.icon}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', fontWeight: 700, color: col.accent, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
                    {col.eyebrow}
                  </p>
                </div>
              </div>

              {/* Gold accent line for featured */}
              {col.featured && (
                <div style={{ width: 32, height: 2, background: 'var(--color-gold)', borderRadius: 2, marginBottom: '20px' }} />
              )}

              {/* Feature items */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 + j * 0.06, duration: 0.4 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}
                  >
                    <span style={{
                      flexShrink: 0,
                      width: 20, height: 20, borderRadius: '50%',
                      background: item.icon === '✓' ? col.accentBg : 'rgba(248,113,113,0.1)',
                      border: `1px solid ${item.icon === '✓' ? col.accentBorder : 'rgba(248,113,113,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 700,
                      color: item.icon === '✓' ? col.accent : '#F87171',
                      marginTop: '2px',
                    }}>
                      {item.icon}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {item.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Featured tag */}
              {col.featured && (
                <div style={{ marginTop: '28px', padding: '8px 14px', background: 'rgba(253,185,39,0.08)', border: '1px solid rgba(253,185,39,0.2)', borderRadius: '8px' }}>
                  <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 600, margin: 0, textAlign: 'center', letterSpacing: '0.06em' }}>
                    Powered by NextPlay Nexus Protocol
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginTop: '64px' }}
        >
          {/* Decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
            <div style={{ flex: 1, maxWidth: 80, height: 1, background: 'rgba(253,185,39,0.2)' }} />
            <div style={{ display: 'flex', gap: '6px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i === 1 ? 'var(--color-gold)' : 'rgba(253,185,39,0.3)' }} />
              ))}
            </div>
            <div style={{ flex: 1, maxWidth: 80, height: 1, background: 'rgba(253,185,39,0.2)' }} />
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
            Learn how <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>NILPOC</strong> protects your NIL earnings with on-chain transparency and instant athlete-first payments.
          </p>

          <Link
            href="/demo"
            style={{
              display: 'inline-block',
              padding: '15px 44px',
              background: 'var(--color-gold)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.88rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(253,185,39,0.55)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Learn How NILPOC Protects Your Earnings
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
