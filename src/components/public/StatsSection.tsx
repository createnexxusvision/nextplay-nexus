'use client';
// NextPlay Nexus — Platform Stats Section

import StatCard from '@/components/ui/StatCard';

const STATS = [
  { label: 'Curriculum Modules', value: 18, suffix: '+', description: 'Weeks of structured NIL & player development content per grade level', color: 'var(--color-gold)' },
  { label: 'Sports We Serve', value: 10, suffix: '+', description: 'All athletes eligible for NIL — every sport, every level', color: 'var(--color-emerald)' },
  { label: 'NIL Market Size', value: 1.67, prefix: '$', suffix: 'B', description: 'U.S. college NIL market in 2024 — and growing fast', color: '#4A90D9' },
  { label: 'Athletes Lack NIL Literacy', value: 97, suffix: '%', description: 'Of HS athletes enter college without NIL education — we fix that', color: '#7B68EE' },
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
