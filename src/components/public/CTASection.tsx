'use client';
// NextPlay Nexus — CTA Banner Section

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="programs" ref={ref} style={{ padding: '6rem 1.5rem', background: 'var(--bg-app)', overflow: 'hidden', position: 'relative' }}>
      {/* Background accent */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(253,185,39,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>Get Started Today</span>
            <div style={{ width: '40px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '0.02em', color: 'var(--text-primary)', marginBottom: '20px' }}>
            Ready to Launch Your<br />
            <span style={{ color: 'var(--color-gold)' }}>NIL Program?</span>
          </h2>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px' }}>
            Join programs across Football, Basketball, Soccer, Flag Football, and ESports. Your athletes deserve the best start to their NIL journey.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              href="/demo"
              style={{ display: 'inline-block', padding: '16px 40px', background: 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', textDecoration: 'none', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(253,185,39,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Request a Demo
            </Link>
            <Link
              href="/dashboard"
              style={{ display: 'inline-block', padding: '16px 40px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(253,185,39,0.3)', transition: 'border-color 0.2s ease, background 0.2s ease' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.7)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(253,185,39,0.06)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.3)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              View Dashboard Demo
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
