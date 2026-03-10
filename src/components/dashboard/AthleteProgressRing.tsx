'use client';
// NextPlay Nexus — Athlete Progress Ring

import { motion } from 'framer-motion';
import { SportId, getSportColor } from '@/lib/sports';

interface Props {
  value: number;
  size?: number;
  strokeWidth?: number;
  sport?: SportId;
  label?: string;
  sublabel?: string;
}

export default function AthleteProgressRing({ value, size = 80, strokeWidth = 6, sport, label, sublabel }: Props) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = sport ? getSportColor(sport) : 'var(--color-gold)';
  const glow = sport === 'esports';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-subtle)" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ filter: glow ? `drop-shadow(0 0 6px ${color})` : 'none' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ fontFamily: 'var(--font-data)', fontSize: size > 80 ? '1rem' : '0.8rem', fontWeight: 700, color, textShadow: glow ? `0 0 10px ${color}` : 'none' }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      {label && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
          {sublabel && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{sublabel}</div>}
        </div>
      )}
    </div>
  );
}
