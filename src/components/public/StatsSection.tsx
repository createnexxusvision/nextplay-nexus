'use client';
// NextPlay Nexus — Platform Stats Section

import StatCard from '@/components/ui/StatCard';

const STATS = [
  { label: 'Athletes Enrolled', value: 285, suffix: '+', description: 'High school and college athletes', color: 'var(--color-gold)' },
  { label: 'Sports Covered', value: 6, description: 'From Football to ESports', color: 'var(--color-emerald)' },
  { label: 'NIL Deals Facilitated', value: 49, suffix: '+', description: 'Across all sports and programs', color: '#4A90D9' },
  { label: 'Avg Deal Value', value: 28, prefix: '$', suffix: 'K', description: 'Per athlete per semester', color: '#7B68EE' },
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
            Platform Impact
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
