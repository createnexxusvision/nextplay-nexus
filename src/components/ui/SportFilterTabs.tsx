'use client';
// NextPlay Nexus — Sport Filter Tabs (horizontal scrollable)

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SPORTS, SportId } from '@/lib/sports';

interface SportFilterTabsProps {
  active: SportId | 'all';
  onChange: (id: SportId | 'all') => void;
}

export default function SportFilterTabs({ active, onChange }: SportFilterTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'all' as const, label: 'All Sports', color: 'var(--color-gold)', short: 'All' },
    ...SPORTS.map(s => ({ id: s.id, label: s.label, color: s.color, short: s.shortLabel })),
  ];

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '4px 0 12px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className="hide-scrollbar"
    >
      {tabs.map((tab, i) => {
        const isActive = active === tab.id;
        const isEsports = tab.id === 'esports';
        return (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onChange(tab.id)}
            style={{
              flexShrink: 0,
              padding: '8px 18px',
              borderRadius: '999px',
              border: `1px solid ${isActive ? tab.color : 'var(--border-subtle)'}`,
              background: isActive ? tab.color : 'transparent',
              color: isActive
                ? (tab.id === 'esports' || tab.id === 'mens-basketball' ? '#fff' : '#0B1D3A')
                : 'var(--text-secondary)',
              fontFamily: 'var(--font-sub)',
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isActive && isEsports ? `0 0 16px ${tab.color}55` : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.short}
          </motion.button>
        );
      })}
    </div>
  );
}
