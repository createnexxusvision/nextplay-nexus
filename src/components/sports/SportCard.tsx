'use client';
// NextPlay Nexus — SportCard v2.0
// Animated athlete sport card with sport-specific motion personalities

import { motion } from 'framer-motion';
import type { Sport } from '@/lib/sports';

interface SportCardProps {
  sport: Sport;
  athleteCount?: number;
  nilDeals?: number;
  onClick?: () => void;
  isActive?: boolean;
  index?: number;
}

const hoverVariants = {
  explosive: { scale: 1.03, rotate: 0.5, transition: { duration: 0.15, ease: [0.68, -0.55, 0.27, 1.55] as const } },
  fluid:     { scale: 1.02, y: -4,       transition: { duration: 0.3,  ease: [0.25, 0.46, 0.45, 0.94] as const } },
  vertical:  { scale: 1.02, y: -8,       transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const } },
  flowing:   { scale: 1.02, rotate: -0.3, transition: { duration: 0.4,  ease: [0.25, 0.46, 0.45, 0.94] as const } },
  digital:   { scale: 1.01,              transition: { duration: 0.1,  ease: [0.77, 0, 0.175, 1] as const } },
};

export default function SportCard({ sport, athleteCount = 0, nilDeals = 0, onClick, isActive = false, index = 0 }: SportCardProps) {
  const isEsports = sport.id === 'esports';
  const hover = hoverVariants[sport.motionPersonality];

  return (
    <motion.div
      data-sport={sport.id}
      className="sport-card glass-card"
      style={{
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: isActive
          ? `linear-gradient(135deg, rgba(11,29,58,0.95) 0%, ${sport.color}20 100%)`
          : 'var(--bg-glass)',
        boxShadow: isActive
          ? `0 0 32px ${sport.color}44, var(--shadow-card)`
          : isEsports ? '0 0 16px #00E5FF22, var(--shadow-card)' : 'var(--shadow-card)',
      }}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover}
      onClick={onClick}
    >
      {/* SVG background field/court lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: isActive ? 0.18 : 0.07 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d={sport.svgBgPath}
          stroke={sport.color}
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="1000"
          style={{ animation: `fieldLinesDraw 1.5s ease-out ${index * 0.1}s both` }}
        />
      </svg>

      {/* ESports scanlines */}
      {isEsports && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.025) 2px, rgba(0,229,255,0.025) 4px)' }} />
      )}

      {/* ESports HUD corners */}
      {isEsports && (['tl', 'tr', 'bl', 'br'] as const).map((pos, i) => (
        <div key={pos} style={{
          position: 'absolute',
          width: 16, height: 16,
          top: pos.startsWith('t') ? 12 : undefined,
          bottom: pos.startsWith('b') ? 12 : undefined,
          left: pos.endsWith('l') ? 12 : undefined,
          right: pos.endsWith('r') ? 12 : undefined,
          borderTop: pos.startsWith('t') ? '2px solid #00E5FF' : undefined,
          borderBottom: pos.startsWith('b') ? '2px solid #00E5FF' : undefined,
          borderLeft: pos.endsWith('l') ? '2px solid #00E5FF' : undefined,
          borderRight: pos.endsWith('r') ? '2px solid #00E5FF' : undefined,
          animation: `hudBracketIn 0.4s ease-out ${i * 0.08}s both`,
        }} />
      ))}

      {/* Card content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '24px' }}>
        {/* Badge */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '999px',
            background: sport.gradient,
            color: ['mens-basketball', 'esports'].includes(sport.id) ? '#fff' : '#0B1D3A',
            fontFamily: 'var(--font-sub)',
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            boxShadow: isEsports ? '0 0 12px #00E5FF66' : 'none',
          }}>
            {sport.shortLabel}
          </span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          lineHeight: 1.1,
          marginBottom: '10px',
          textShadow: isEsports ? `0 0 20px ${sport.color}88` : 'none',
        }}>
          {sport.label}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
          {sport.description}
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {[{ val: athleteCount, label: 'Athletes' }, { val: nilDeals, label: 'NIL Deals' }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '1.2rem', fontWeight: 700, color: sport.color, textShadow: isEsports ? `0 0 10px ${sport.color}` : 'none' }}>
                {s.val.toLocaleString()}
              </div>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
