'use client';
// NextPlay Nexus — Sports Dashboard v2.2 — Supabase Connected

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SportGrid from '@/components/sports/SportGrid';
import NILTicker from '@/components/ui/NILTicker';
import SportFilterTabs from '@/components/ui/SportFilterTabs';
import AthleteCard from '@/components/athletes/AthleteCard';
import AthleteProgressRing from '@/components/dashboard/AthleteProgressRing';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ModuleProgress from '@/components/dashboard/ModuleProgress';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { SPORTS, SportId } from '@/lib/sports';
import { useAthletes } from '@/lib/hooks/useAthletes';
import { useDashboardStats } from '@/lib/hooks/useDashboardStats';
import Link from 'next/link';

// Skeleton shimmer for loading states
function SkeletonCard() {
  return (
    <div className="glass-card shimmer" style={{ height: '140px', borderRadius: '12px' }} />
  );
}

export default function SportsDashboard() {
  const [sportFilter, setSportFilter] = useState<SportId | 'all'>('all');
  const [gridSport, setGridSport] = useState<SportId | null>(null);
  const sport = gridSport ? SPORTS.find(s => s.id === gridSport) : null;

  const { athletes, loading: athletesLoading } = useAthletes(sportFilter);
  const { stats, loading: statsLoading } = useDashboardStats();

  const headerStats = [
    { label: 'Athletes', value: stats.totalAthletes, color: 'var(--color-gold)' },
    { label: 'Sports', value: stats.totalSports, color: 'var(--color-emerald)' },
    { label: 'NIL Deals', value: stats.totalDeals, color: '#4A90D9' },
    { label: 'Avg Score', value: stats.avgNilScore, suffix: '%', color: '#7B68EE' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-primary)' }}>

      {/* Dashboard Navbar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,15,30,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{ width: 32, height: 32, background: 'var(--color-gold)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)', flexShrink: 0 }}>N²</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>NextPlay <span style={{ color: 'var(--color-gold)' }}>Nexus</span></span>
            </Link>
            <nav style={{ display: 'flex', gap: '20px' }}>
              {['Dashboard', 'Athletes', 'Modules', 'Reports'].map(n => (
                <a key={n} href="#" style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', fontWeight: 500, color: n === 'Dashboard' ? 'var(--color-gold)' : 'var(--text-secondary)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{n}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--grad-football)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: '#0B1D3A', cursor: 'pointer' }}>AD</div>
          </div>
        </div>
      </header>

      <NILTicker />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header stats */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
          style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '4px' }}>
              Program <span style={{ color: 'var(--color-gold)' }}>Dashboard</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              NIL + Athlete Development Overview
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-glass)' }}>
            {statsLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="shimmer" style={{ padding: '14px 24px', width: '90px', height: '58px', borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none' }} />
                ))
              : headerStats.map((s, i) => (
                  <div key={s.label} style={{ padding: '14px 24px', textAlign: 'center', borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <div style={{ fontFamily: 'var(--font-data)', fontSize: '1.4rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>
                      <AnimatedCounter target={s.value} suffix={s.suffix ?? ''} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '3px' }}>{s.label}</div>
                  </div>
                ))
            }
          </div>
        </motion.div>

        {/* Selected sport spotlight */}
        <AnimatePresence>
          {sport && (
            <motion.div key={sport.id}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: '24px' }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
              className="glass-card"
              style={{ overflow: 'hidden', borderLeft: `4px solid ${sport.color}`, background: `linear-gradient(135deg, var(--bg-card) 0%, ${sport.color}0D 100%)`, boxShadow: sport.id === 'esports' ? `0 0 32px ${sport.color}22, var(--shadow-card)` : 'var(--shadow-card)' }}
            >
              <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: sport.color, marginBottom: '6px' }}>{sport.label}</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '380px' }}>{sport.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <AthleteProgressRing value={72} size={88} sport={sport.id} label="NIL Ready" sublabel="Avg score" />
                  <AthleteProgressRing value={65} size={88} sport={sport.id} label="Modules" sublabel="Completed" />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-data)', fontSize: '1.5rem', fontWeight: 700, color: sport.color }}>
                      {athletes.length}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Athletes</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sport Grid */}
        <div style={{ marginBottom: '3rem' }}>
          <SportGrid onSportSelect={setGridSport} />
        </div>

        {/* Athletes section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <div style={{ width: '28px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
                <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>Athletes</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.02em', margin: 0 }}>
                Athlete Roster
              </h2>
            </div>
            <div style={{ minWidth: 0, flex: 1, maxWidth: '600px' }}>
              <SportFilterTabs active={sportFilter} onChange={setSportFilter} />
            </div>
          </div>

          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {athletesLoading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            ) : athletes.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-sub)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                No athletes found — add athletes via your program portal.
              </div>
            ) : (
              <AnimatePresence>
                {athletes.map((athlete, i) => (
                  <motion.div key={athlete.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}>
                    <AthleteCard athlete={athlete} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </section>

        {/* Bottom two-column: Modules | Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          <ModuleProgress />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
