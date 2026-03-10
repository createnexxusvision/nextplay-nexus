'use client';
// NextPlay Nexus — Recent NIL Activity Feed

import { motion } from 'framer-motion';
import { SPORTS, SportId } from '@/lib/sports';

interface ActivityItem {
  id: string;
  type: 'deal_signed' | 'module_completed' | 'deal_pending' | 'score_updated';
  athleteName: string;
  sport: SportId;
  description: string;
  value?: string;
  time: string;
}

const ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'deal_signed', athleteName: 'Marcus J.', sport: 'football', description: 'Brand partnership signed', value: '$2,500', time: '2h ago' },
  { id: '2', type: 'module_completed', athleteName: 'Aaliyah R.', sport: 'womens-basketball', description: 'NIL Literacy Module 3 completed', time: '4h ago' },
  { id: '3', type: 'deal_pending', athleteName: 'Tyler K.', sport: 'esports', description: 'Streaming sponsorship under review', value: '$950', time: '6h ago' },
  { id: '4', type: 'score_updated', athleteName: 'Sofia M.', sport: 'womens-soccer', description: 'NIL Readiness score improved +8pts', time: '8h ago' },
  { id: '5', type: 'deal_signed', athleteName: 'DeShawn L.', sport: 'mens-basketball', description: 'Camp appearance secured', value: '$3,100', time: '1d ago' },
  { id: '6', type: 'module_completed', athleteName: 'Jordan F.', sport: 'flag-football', description: 'Brand Partnership Basics completed', time: '1d ago' },
];

const TYPE_ICONS: Record<string, string> = {
  deal_signed: '✓',
  module_completed: '★',
  deal_pending: '◎',
  score_updated: '↑',
};

const TYPE_COLORS: Record<string, string> = {
  deal_signed: 'var(--color-emerald)',
  module_completed: 'var(--color-gold)',
  deal_pending: '#8FA3B8',
  score_updated: '#4A90D9',
};

export default function ActivityFeed() {
  return (
    <div className="glass-card" style={{ padding: '24px', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-primary)', margin: 0 }}>
          Recent Activity
        </h3>
        <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {ACTIVITY.map((item, i) => {
          const sport = SPORTS.find(s => s.id === item.sport);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                padding: '12px',
                borderRadius: '10px',
                transition: 'background 0.2s ease',
                cursor: 'default',
              }}
              whileHover={{ background: 'rgba(255,255,255,0.04)' } as never}
            >
              {/* Icon */}
              <div style={{
                width: 28, height: 28, borderRadius: '8px',
                background: `${TYPE_COLORS[item.type]}18`,
                border: `1px solid ${TYPE_COLORS[item.type]}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                fontFamily: 'var(--font-data)',
                fontSize: '0.7rem',
                color: TYPE_COLORS[item.type],
              }}>
                {TYPE_ICONS[item.type]}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.athleteName}
                  </span>
                  <span style={{
                    display: 'inline-block',
                    width: 6, height: 6, borderRadius: '50%',
                    background: sport?.color ?? 'var(--color-gold)',
                    flexShrink: 0,
                    boxShadow: item.sport === 'esports' ? `0 0 6px ${sport?.color}` : 'none',
                  }} />
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.description}
                </div>
              </div>

              {/* Right side */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {item.value && (
                  <div style={{ fontFamily: 'var(--font-data)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '2px' }}>
                    {item.value}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                  {item.time}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
