'use client';
// NextPlay Nexus — SportGrid v2.0

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SportCard from './SportCard';
import { SPORTS, SportId } from '@/lib/sports';

interface SportStats { [k: string]: { athletes: number; nilDeals: number } }

export default function SportGrid({ stats = {}, onSportSelect }: { stats?: SportStats; onSportSelect?: (id: SportId | null) => void }) {
  const [active, setActive] = useState<SportId | null>(null);

  const toggle = (id: SportId) => {
    const next = active === id ? null : id;
    setActive(next);
    onSportSelect?.(next);
  };

  const activeSport = SPORTS.find(s => s.id === active);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '32px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '40px', height: '3px', background: 'var(--color-gold)', borderRadius: '2px' }} />
          <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>NIL Sports</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
          Your Sport, <span style={{ color: 'var(--color-gold)' }}>Your Platform</span>
        </h2>
      </motion.div>

      <div className="sport-grid">
        {SPORTS.map((sport, i) => (
          <SportCard
            key={sport.id}
            sport={sport}
            athleteCount={stats[sport.id]?.athletes ?? 0}
            nilDeals={stats[sport.id]?.nilDeals ?? 0}
            onClick={() => toggle(sport.id)}
            isActive={active === sport.id}
            index={i}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeSport && (
          <motion.div
            key={activeSport.id}
            className="glass-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '16px', overflow: 'hidden', borderLeft: `4px solid ${activeSport.color}`, borderTop: 'none', borderRadius: '0 0 20px 20px' }}
          >
            <div style={{ padding: '20px 24px' }}>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Showing <span style={{ color: activeSport.color, fontWeight: 600 }}>{activeSport.label}</span> athletes and NIL opportunities. All dashboards, modules, and progress tracking filtered to this sport.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
