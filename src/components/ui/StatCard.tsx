'use client';
// NextPlay Nexus — Stat Card

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description?: string;
  color?: string;
  index?: number;
}

export default function StatCard({ label, value, prefix = '', suffix = '', description, color = 'var(--color-gold)', index = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card"
      style={{ padding: '28px 24px', textAlign: 'center' }}
    >
      <div style={{
        fontFamily: 'var(--font-data)',
        fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
        fontWeight: 700,
        color,
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
        {label}
      </div>
      {description && (
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {description}
        </div>
      )}
    </motion.div>
  );
}
