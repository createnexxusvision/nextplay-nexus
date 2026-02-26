'use client';
// NextPlay Nexus — How It Works (3-step)

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Enroll Your Program',
    body: 'Set up your school or program in minutes. Add athletes across any of our 6 supported sports, assign coaches and compliance coordinators.',
    color: 'var(--color-gold)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Athletes Complete NIL Modules',
    body: 'Athletes, parents, and coaches work through sport-specific NIL literacy curriculum. Track compliance, readiness scores, and certification in real time.',
    color: '#4A90D9',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 16l3.5 3.5L21 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Unlock NIL Opportunities',
    body: 'Verified athletes get matched with brand partnerships, appearance fees, social media deals, and camp opportunities — all tracked transparently through the platform.',
    color: 'var(--color-emerald)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3 9h9l-7.5 5.5 3 9L16 22l-7.5 5.5 3-9L4 13h9l3-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} style={{ padding: '6rem 1.5rem', background: 'var(--bg-app)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>How It Works</span>
            <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.02em', margin: 0 }}>
            From Enrolled to <span style={{ color: 'var(--color-gold)' }}>Earning</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', position: 'relative' }}>
          {/* Connector line (desktop) */}
          <div style={{ position: 'absolute', top: '48px', left: '16.6%', right: '16.6%', height: '1px', background: 'linear-gradient(90deg, var(--color-gold), #4A90D9, var(--color-emerald))', opacity: 0.3, pointerEvents: 'none' }} />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: '36px 28px', position: 'relative', borderTop: `4px solid ${step.color}` }}
            >
              {/* Step number */}
              <div style={{
                fontFamily: 'var(--font-data)',
                fontSize: '3.5rem',
                fontWeight: 700,
                color: `${step.color}18`,
                position: 'absolute',
                top: '16px',
                right: '20px',
                lineHeight: 1,
                userSelect: 'none',
              }}>
                {step.num}
              </div>

              {/* Icon */}
              <div style={{ color: step.color, marginBottom: '20px' }}>
                {step.icon}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--text-primary)', marginBottom: '12px' }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
