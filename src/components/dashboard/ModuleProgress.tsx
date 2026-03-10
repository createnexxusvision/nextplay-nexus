'use client';
// NextPlay Nexus — NIL Module Progress Tracker

import { motion } from 'framer-motion';

interface Module {
  id: string;
  title: string;
  category: string;
  completed: number;
  total: number;
  color: string;
}

const MODULES: Module[] = [
  { id: '1', title: 'NIL Basics & Compliance', category: 'Foundation', completed: 48, total: 48, color: 'var(--color-gold)' },
  { id: '2', title: 'Brand Partnership 101', category: 'Business', completed: 36, total: 48, color: '#4A90D9' },
  { id: '3', title: 'Social Media & Personal Brand', category: 'Marketing', completed: 29, total: 48, color: '#7B68EE' },
  { id: '4', title: 'Contract & Legal Literacy', category: 'Legal', completed: 21, total: 48, color: 'var(--color-emerald)' },
  { id: '5', title: 'Financial Literacy for Athletes', category: 'Finance', completed: 18, total: 48, color: '#E8C87A' },
  { id: '6', title: 'Parent & Family Education', category: 'Family', completed: 31, total: 48, color: '#00E5FF' },
];

export default function ModuleProgress() {
  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-primary)', margin: 0 }}>
          NIL Modules
        </h3>
        <span style={{ fontFamily: 'var(--font-data)', fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700 }}>
          6 Active
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {MODULES.map((mod, i) => {
          const pct = Math.round((mod.completed / mod.total) * 100);
          const done = mod.completed === mod.total;
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {mod.title}
                    </span>
                    {done && (
                      <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.55rem', color: 'var(--color-emerald)', background: 'rgba(26,127,95,0.15)', padding: '1px 7px', borderRadius: '999px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Complete
                      </span>
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {mod.category}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-data)', fontSize: '0.8rem', fontWeight: 700, color: mod.color }}>
                    {pct}%
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    {mod.completed}/{mod.total}
                  </div>
                </div>
              </div>
              <div style={{ height: '5px', background: 'var(--border-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.1, delay: i * 0.07 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: '100%',
                    background: done
                      ? `linear-gradient(90deg, var(--color-emerald), #34D399)`
                      : `linear-gradient(90deg, ${mod.color}99, ${mod.color})`,
                    borderRadius: '999px',
                    boxShadow: mod.color === '#00E5FF' ? `0 0 8px #00E5FF66` : 'none',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
