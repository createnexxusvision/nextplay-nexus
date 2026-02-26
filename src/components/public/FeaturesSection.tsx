'use client';
// NextPlay Nexus — Platform Features Section

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

const AUDIENCES = [
  {
    tag: 'Athletes',
    color: 'var(--color-gold)',
    gradient: 'linear-gradient(135deg, #FDB927 0%, #B8860B 100%)',
    headline: 'Your Brand, Your Future',
    body: 'Build NIL literacy from day one. Track your readiness score, complete certified modules, and get matched with real brand opportunities — all in one place.',
    features: ['NIL Readiness Score', 'Brand Match Alerts', 'Deal Tracking', 'Compliance Certification'],
  },
  {
    tag: 'Programs',
    color: '#4A90D9',
    gradient: 'linear-gradient(135deg, #0B1D3A 0%, #4A90D9 100%)',
    headline: 'Coach Every Athlete',
    body: 'Real-time compliance dashboards, bulk athlete management, and sport-specific reporting — built for athletic directors, compliance officers, and coaching staff.',
    features: ['Compliance Dashboard', 'Bulk Enrollment', 'Sport Filtering', 'Parent Communication'],
  },
  {
    tag: 'Brands',
    color: 'var(--color-emerald)',
    gradient: 'linear-gradient(135deg, #1A7F5F 0%, #34D399 100%)',
    headline: 'Reach Real Athletes',
    body: 'Connect with NIL-verified, compliance-cleared athletes across 6 sports. Transparent deal structures, performance tracking, and authentic local partnerships.',
    features: ['Verified Athlete Pool', 'Sport-Specific Search', 'Deal Transparency', 'Performance Reports'],
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" ref={ref} style={{ padding: '6rem 1.5rem', background: 'rgba(11, 29, 58, 0.4)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>Platform Features</span>
            <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.02em', margin: 0 }}>
            Built For <span style={{ color: 'var(--color-gold)' }}>Everyone</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {AUDIENCES.map((audience, i) => (
            <motion.div
              key={audience.tag}
              className="glass-card"
              initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${audience.color}22, var(--shadow-card)` }}
              style={{ padding: '36px 28px', borderTop: `4px solid ${audience.color}` }}
            >
              {/* Tag */}
              <span style={{
                display: 'block',
                padding: '4px 14px',
                borderRadius: '999px',
                background: audience.gradient,
                color: audience.tag === 'Brands' ? '#fff' : (audience.tag === 'Programs' ? '#fff' : '#0B1D3A'),
                fontFamily: 'var(--font-sub)',
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '20px',
                width: 'fit-content',
              } as React.CSSProperties}>
                For {audience.tag}
              </span>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: audience.color, marginBottom: '12px' }}>
                {audience.headline}
              </h3>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                {audience.body}
              </p>

              {/* Feature list */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {audience.features.map(feat => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '5px', background: `${audience.color}20`, border: `1px solid ${audience.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke={audience.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
