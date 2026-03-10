'use client';
// NextPlay Nexus — Athlete Profile Card v2

import { motion } from 'framer-motion';
import { getSport, SportId } from '@/lib/sports';
import AthleteProgressRing from '@/components/dashboard/AthleteProgressRing';

export interface Athlete {
  id: string;
  name: string;
  sport: SportId;
  school: string;
  position: string;
  nilScore: number;       // 0-100
  modulesCompleted: number;
  totalModules: number;
  nilDeals: number;
  totalEarned: string;
  initials: string;       // fallback for photo
  status: 'active' | 'pending' | 'verified';
}

interface AthleteCardProps {
  athlete: Athlete;
  index?: number;
}

const STATUS_COLORS: Record<string, string> = {
  active: 'var(--color-emerald)',
  verified: '#4A90D9',
  pending: 'var(--color-gold)',
};

export default function AthleteCard({ athlete, index = 0 }: AthleteCardProps) {
  const sport = getSport(athlete.sport);
  const isEsports = athlete.sport === 'esports';

  return (
    <motion.div
      className="sport-card glass-card"
      data-sport={athlete.sport}
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: `0 16px 48px ${sport.color}22, var(--shadow-card)` }}
      style={{
        padding: '20px',
        cursor: 'pointer',
        background: 'var(--bg-card)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isEsports ? `0 0 16px ${sport.color}18, var(--shadow-card)` : 'var(--shadow-card)',
      }}
    >
      {/* ESports scanlines */}
      {isEsports && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.02) 2px, rgba(0,229,255,0.02) 4px)' }} />
      )}

      {/* Top row: avatar + info */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px', position: 'relative', zIndex: 1 }}>

        {/* Avatar */}
        <div style={{
          width: 52,
          height: 52,
          borderRadius: '12px',
          background: sport.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: ['esports', 'mens-basketball'].includes(athlete.sport) ? '#fff' : '#0B1D3A',
          flexShrink: 0,
          boxShadow: isEsports ? `0 0 16px ${sport.color}44` : 'none',
          textShadow: isEsports ? `0 0 12px ${sport.color}` : 'none',
        }}>
          {athlete.initials}
        </div>

        {/* Name + school + status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {athlete.name}
            </h3>
            <span style={{
              display: 'inline-block',
              width: 7, height: 7, borderRadius: '50%',
              background: STATUS_COLORS[athlete.status],
              flexShrink: 0,
              boxShadow: `0 0 6px ${STATUS_COLORS[athlete.status]}`,
            }} />
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            {athlete.position} &middot; {athlete.school}
          </div>
          <span style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '999px',
            background: sport.gradient,
            color: ['esports', 'mens-basketball'].includes(athlete.sport) ? '#fff' : '#0B1D3A',
            fontFamily: 'var(--font-sub)',
            fontSize: '0.58rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            boxShadow: isEsports ? `0 0 10px ${sport.color}55` : 'none',
          }}>
            {sport.shortLabel}
          </span>
        </div>

        {/* NIL Score Ring */}
        <AthleteProgressRing
          value={athlete.nilScore}
          size={56}
          strokeWidth={4}
          sport={athlete.sport}
        />
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '16px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Modules
          </span>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: '0.65rem', color: sport.color }}>
            {athlete.modulesCompleted}/{athlete.totalModules}
          </span>
        </div>
        <div style={{ height: '4px', background: 'var(--border-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(athlete.modulesCompleted / athlete.totalModules) * 100}%` }}
            transition={{ duration: 1, delay: index * 0.07 + 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%',
              background: sport.gradient,
              borderRadius: '999px',
              boxShadow: isEsports ? `0 0 8px ${sport.color}` : 'none',
            }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '0', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
        {[
          { label: 'NIL Deals', value: String(athlete.nilDeals) },
          { label: 'Earned', value: athlete.totalEarned },
          { label: 'NIL Score', value: `${athlete.nilScore}%` },
        ].map((stat, i) => (
          <div key={stat.label} style={{ flex: 1, textAlign: 'center', borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-data)', fontSize: '0.9rem', fontWeight: 700, color: sport.color, textShadow: isEsports ? `0 0 8px ${sport.color}` : 'none' }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
