'use client';
// NextPlay Nexus — NIL Activity Ticker

import { SPORTS } from '@/lib/sports';

const DEFAULT_ITEMS = [
  { sport: 'football', value: '$2,500', type: 'Brand Partnership' },
  { sport: 'womens-basketball', value: '$1,800', type: 'Social Media Deal' },
  { sport: 'esports', value: '$950', type: 'Streaming Sponsorship' },
  { sport: 'womens-soccer', value: '$1,200', type: 'Apparel Deal' },
  { sport: 'mens-basketball', value: '$3,100', type: 'Camp Appearance' },
  { sport: 'flag-football', value: '$750', type: 'Local Sponsorship' },
];

export default function NILTicker({ items = DEFAULT_ITEMS }: { items?: typeof DEFAULT_ITEMS }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="nil-ticker"
      style={{ background: 'rgba(11,29,58,0.7)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '8px 0' }}
    >
      <div className="nil-ticker-inner" style={{ display: 'flex', gap: '32px', paddingLeft: '32px' }}>
        {doubled.map((item, i) => {
          const sport = SPORTS.find(s => s.id === item.sport);
          return (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: sport?.color ?? '#FDB927', display: 'inline-block', boxShadow: sport?.id === 'esports' ? '0 0 8px #00E5FF' : 'none' }} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{sport?.shortLabel}</span>
              <span style={{ fontFamily: 'var(--font-data)', fontSize: '0.72rem', color: sport?.color, fontWeight: 700 }}>{item.value}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.type}</span>
              <span style={{ color: 'var(--border-subtle)', marginInline: '8px' }}>·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
