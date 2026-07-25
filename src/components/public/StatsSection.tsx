'use client';
// NextPlay Nexus — Platform Stats Section

import StatCard from '@/components/ui/StatCard';

const STATS = [
  { label: 'Curriculum Modules', value: 6, suffix: '', description: 'Core NIL & player development modules — rights, contracts, brand, financial literacy, and more', color: 'var(--color-gold)' },
  { label: 'Sports Covered', value: 6, suffix: '', description: 'Football, Flag Football, Men’s & Women’s Basketball, Women’s Soccer, ESports', color: 'var(--color-emerald)' },
  { label: 'NIL Market Size', value: 1.67, prefix: '$', suffix: 'B', description: 'Total U.S. NIL market, 2024–25 season (Opendorse)', color: '#4A90D9' },
  { label: 'Athletes Lack Financial Education', value: 65, suffix: '%', description: 'Of college athletes surveyed at orientation had received none in high school', color: '#7B68EE' },
];

export default function StatsSection() {
  return (
    <section id="stats" style={{ padding: '5rem 1.5rem', background: 'rgba(8, 15, 30, 0.7)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>By the Numbers</span>
            <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.02em', margin: 0 }}>
            The NIL Education Gap
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              description={stat.description}
              color={stat.color}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
