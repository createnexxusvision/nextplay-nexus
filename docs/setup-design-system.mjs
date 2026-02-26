#!/usr/bin/env node
/**
 * NextPlay Nexus — Frontend Design System v2.0 Setup Script
 * Run from NextPlay Nexus project root:
 *   node scripts/setup-design-system.mjs
 * 
 * Creates all UI/UX files for the NIL Sports platform.
 * Design inspired by Behance projects 233396275, 236902291,
 * 238592659, 200749995, 219589137
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();

function write(relPath, content) {
  const full = join(ROOT, relPath);
  const dir = full.substring(0, full.lastIndexOf('/'));
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(full, content, 'utf-8');
  console.log(`✓ ${relPath}`);
}

// ============================================================
// 1. DESIGN TOKENS CSS
// ============================================================
write('src/styles/tokens.css', `/* ================================================
   NEXTPLAY NEXUS — DESIGN TOKENS v2.0
   NIL Sports Platform | Sports Coverage:
   Football · Women's Flag Football · Men's Basketball
   Women's Basketball · Women's Soccer · ESports
   ================================================ */

:root {
  /* === BRAND COLORS === */
  --color-primary: #0B1D3A;
  --color-gold: #FDB927;
  --color-slate: #506680;
  --color-emerald: #1A7F5F;
  --color-champagne: #F7F5EE;
  --color-graphite: #3E3E3E;

  /* === SPORT TAG COLORS === */
  --sport-football: #FDB927;
  --sport-flag-football: #E8C87A;
  --sport-mens-basketball: #4A90D9;
  --sport-womens-basketball: #7B68EE;
  --sport-womens-soccer: #1A7F5F;
  --sport-esports: #00E5FF;

  /* === SPORT GRADIENTS === */
  --grad-football: linear-gradient(135deg, #FDB927 0%, #B8860B 100%);
  --grad-flag-football: linear-gradient(135deg, #E8C87A 0%, #FDB927 100%);
  --grad-mens-basketball: linear-gradient(135deg, #0B1D3A 0%, #4A90D9 100%);
  --grad-womens-basketball: linear-gradient(135deg, #7B68EE 0%, #C084FC 100%);
  --grad-womens-soccer: linear-gradient(135deg, #1A7F5F 0%, #34D399 100%);
  --grad-esports: linear-gradient(135deg, #001824 0%, #00E5FF 100%);

  /* === DARK DASHBOARD THEME === */
  --bg-app: #080F1E;
  --bg-card: rgba(11, 29, 58, 0.8);
  --bg-glass: rgba(255, 255, 255, 0.05);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(253, 185, 39, 0.3);
  --text-primary: #F7F5EE;
  --text-secondary: #8FA3B8;
  --text-muted: rgba(247, 245, 238, 0.4);

  /* === MOTION TOKENS === */
  --motion-instant: 80ms;
  --motion-fast: 150ms;
  --motion-base: 280ms;
  --motion-slow: 450ms;
  --motion-cinematic: 800ms;

  --ease-sport: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-impact: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-esports: cubic-bezier(0.77, 0, 0.175, 1);

  /* === TYPOGRAPHY === */
  --font-display: 'Oswald', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --font-sub: 'Poppins', sans-serif;
  --font-callout: 'Raleway', sans-serif;
  --font-data: 'Roboto Mono', monospace;

  /* === SPACING === */
  --space-xs: 4px; --space-sm: 8px; --space-md: 16px;
  --space-lg: 24px; --space-xl: 40px; --space-2xl: 64px;

  /* === SHADOWS === */
  --shadow-card: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
}

/* ===== KEYFRAME ANIMATIONS ===== */

@keyframes stadiumEntrance {
  from { opacity: 0; transform: translateY(40px); filter: blur(8px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes slideReveal {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0% 0 0); }
}
@keyframes ringDraw {
  from { stroke-dashoffset: var(--ring-circumference, 283); }
  to { stroke-dashoffset: var(--ring-offset, 0); }
}
@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 8px var(--sport-esports), 0 0 24px var(--sport-esports); opacity: 1; }
  50% { box-shadow: 0 0 16px var(--sport-esports), 0 0 64px rgba(0,229,255,0.5); opacity: 0.85; }
}
@keyframes fieldLinesDraw {
  from { stroke-dashoffset: 1000; opacity: 0; }
  to { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes hudBracketIn {
  from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); opacity: 0; }
  to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
}
@keyframes digitalFlicker {
  0%, 90%, 100% { opacity: 1; }
  92% { opacity: 0.4; }
  96% { opacity: 0.8; }
}
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes dataBarRise {
  from { transform: scaleY(0); transform-origin: bottom; }
  to { transform: scaleY(1); transform-origin: bottom; }
}

/* ===== UTILITY CLASSES ===== */

.animate-stadium-entrance { animation: stadiumEntrance var(--motion-slow) var(--ease-out-expo) both; }
.animate-slide-reveal { animation: slideReveal var(--motion-cinematic) var(--ease-out-expo) both; }
.animate-neon-pulse { animation: neonPulse 2s ease-in-out infinite; }
.animate-digital-flicker { animation: digitalFlicker 4s ease infinite; }

.stagger-1 { animation-delay: 0ms; }
.stagger-2 { animation-delay: 80ms; }
.stagger-3 { animation-delay: 160ms; }
.stagger-4 { animation-delay: 240ms; }
.stagger-5 { animation-delay: 320ms; }
.stagger-6 { animation-delay: 400ms; }

.glass-card {
  background: var(--bg-glass);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  box-shadow: var(--shadow-card);
}

/* Sport card top borders */
.sport-card[data-sport="football"]          { border-top: 4px solid var(--sport-football); }
.sport-card[data-sport="flag-football"]     { border-top: 4px solid var(--sport-flag-football); }
.sport-card[data-sport="mens-basketball"]   { border-top: 4px solid var(--sport-mens-basketball); }
.sport-card[data-sport="womens-basketball"] { border-top: 4px solid var(--sport-womens-basketball); }
.sport-card[data-sport="womens-soccer"]     { border-top: 4px solid var(--sport-womens-soccer); }
.sport-card[data-sport="esports"]           { border-top: 4px solid var(--sport-esports); animation: neonPulse 3s ease-in-out infinite; }

/* NIL Ticker */
.nil-ticker { overflow: hidden; white-space: nowrap; }
.nil-ticker-inner { display: inline-block; animation: marqueeScroll 30s linear infinite; }
.nil-ticker-inner:hover { animation-play-state: paused; }

/* Sport grid */
.sport-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 480px) { .sport-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .sport-grid { grid-template-columns: repeat(3, 1fr); } }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .nil-ticker-inner,
  .animate-neon-pulse,
  .sport-card[data-sport="esports"] { animation: none !important; }
}
`);

// ============================================================
// 2. SPORTS LIB
// ============================================================
write('src/lib/sports.ts', `// NextPlay Nexus — NIL Sports Configuration v2.0

export type SportId =
  | 'football'
  | 'flag-football'
  | 'mens-basketball'
  | 'womens-basketball'
  | 'womens-soccer'
  | 'esports';

export interface Sport {
  id: SportId;
  label: string;
  shortLabel: string;
  color: string;
  gradient: string;
  motionPersonality: 'explosive' | 'fluid' | 'vertical' | 'flowing' | 'digital';
  svgBgPath: string;
  description: string;
}

export const SPORTS: Sport[] = [
  {
    id: 'football',
    label: 'Football',
    shortLabel: 'FB',
    color: '#FDB927',
    gradient: 'linear-gradient(135deg, #FDB927 0%, #B8860B 100%)',
    motionPersonality: 'explosive',
    svgBgPath: 'M0,50 L100,50 M0,30 L100,30 M0,70 L100,70 M10,0 L10,100 M90,0 L90,100',
    description: 'NIL opportunities for football athletes at high school and college level.',
  },
  {
    id: 'flag-football',
    label: "Women's Flag Football",
    shortLabel: 'WFF',
    color: '#E8C87A',
    gradient: 'linear-gradient(135deg, #E8C87A 0%, #FDB927 100%)',
    motionPersonality: 'fluid',
    svgBgPath: 'M0,50 L100,50 M20,20 L80,20 M20,80 L80,80 M50,0 L50,100',
    description: "Emerging NIL opportunities for women's flag football athletes.",
  },
  {
    id: 'mens-basketball',
    label: "Men's Basketball",
    shortLabel: 'MBB',
    color: '#4A90D9',
    gradient: 'linear-gradient(135deg, #0B1D3A 0%, #4A90D9 100%)',
    motionPersonality: 'vertical',
    svgBgPath: 'M50,50 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0-90,0 M5,50 L95,50',
    description: "Men's basketball NIL readiness tracking and opportunity management.",
  },
  {
    id: 'womens-basketball',
    label: "Women's Basketball",
    shortLabel: 'WBB',
    color: '#7B68EE',
    gradient: 'linear-gradient(135deg, #7B68EE 0%, #C084FC 100%)',
    motionPersonality: 'vertical',
    svgBgPath: 'M50,50 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0-90,0 M5,50 L95,50',
    description: "Women's basketball NIL opportunities — one of the fastest growing segments.",
  },
  {
    id: 'womens-soccer',
    label: "Women's Soccer",
    shortLabel: 'WSC',
    color: '#1A7F5F',
    gradient: 'linear-gradient(135deg, #1A7F5F 0%, #34D399 100%)',
    motionPersonality: 'flowing',
    svgBgPath: 'M50,50 m-48,0 a48,48 0 1,0 96,0 a48,48 0 1,0-96,0 M0,50 L100,50 M50,0 L50,100',
    description: "Women's soccer NIL development at high school and collegiate levels.",
  },
  {
    id: 'esports',
    label: 'ESports',
    shortLabel: 'ESP',
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, #001824 0%, #00E5FF 100%)',
    motionPersonality: 'digital',
    svgBgPath: 'M0,0 L100,0 L100,100 L0,100 Z M10,10 L90,10 M10,90 L90,90 M0,50 L100,50 M50,0 L50,100',
    description: 'NIL opportunities in collegiate and high school competitive gaming.',
  },
];

export const getSport = (id: SportId): Sport => {
  const s = SPORTS.find(s => s.id === id);
  if (!s) throw new Error(\`Sport not found: \${id}\`);
  return s;
};

export const getSportColor = (id: SportId): string => getSport(id).color;
export const getSportGradient = (id: SportId): string => getSport(id).gradient;
`);

// ============================================================
// 3. SPORT CARD COMPONENT
// ============================================================
write('src/components/sports/SportCard.tsx', `'use client';
// NextPlay Nexus — SportCard v2.0
// Animated athlete sport card with sport-specific motion personalities

import { motion } from 'framer-motion';
import type { Sport } from '@/lib/sports';

interface SportCardProps {
  sport: Sport;
  athleteCount?: number;
  nilDeals?: number;
  onClick?: () => void;
  isActive?: boolean;
  index?: number;
}

const hoverVariants = {
  explosive: { scale: 1.03, rotate: 0.5, transition: { duration: 0.15, ease: [0.68, -0.55, 0.27, 1.55] } },
  fluid:     { scale: 1.02, y: -4,       transition: { duration: 0.3,  ease: [0.25, 0.46, 0.45, 0.94] } },
  vertical:  { scale: 1.02, y: -8,       transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
  flowing:   { scale: 1.02, rotate: -0.3, transition: { duration: 0.4,  ease: [0.25, 0.46, 0.45, 0.94] } },
  digital:   { scale: 1.01,              transition: { duration: 0.1,  ease: [0.77, 0, 0.175, 1] } },
};

export default function SportCard({ sport, athleteCount = 0, nilDeals = 0, onClick, isActive = false, index = 0 }: SportCardProps) {
  const isEsports = sport.id === 'esports';
  const hover = hoverVariants[sport.motionPersonality];

  return (
    <motion.div
      data-sport={sport.id}
      className="sport-card glass-card"
      style={{
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: isActive
          ? \`linear-gradient(135deg, rgba(11,29,58,0.95) 0%, \${sport.color}20 100%)\`
          : 'var(--bg-glass)',
        boxShadow: isActive
          ? \`0 0 32px \${sport.color}44, var(--shadow-card)\`
          : isEsports ? '0 0 16px #00E5FF22, var(--shadow-card)' : 'var(--shadow-card)',
      }}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover}
      onClick={onClick}
    >
      {/* SVG background field/court lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: isActive ? 0.18 : 0.07 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <path d={sport.svgBgPath} stroke={sport.color} strokeWidth="0.8" fill="none" strokeDasharray="1000" style={{ animation: \`fieldLinesDraw 1.5s ease-out \${index * 0.1}s both\` }} />
      </svg>

      {/* ESports scanlines */}
      {isEsports && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.025) 2px, rgba(0,229,255,0.025) 4px)' }} />
      )}

      {/* ESports HUD corners */}
      {isEsports && ['tl','tr','bl','br'].map((pos, i) => (
        <div key={pos} style={{
          position: 'absolute',
          width: 16, height: 16,
          top: pos.startsWith('t') ? 12 : undefined,
          bottom: pos.startsWith('b') ? 12 : undefined,
          left: pos.endsWith('l') ? 12 : undefined,
          right: pos.endsWith('r') ? 12 : undefined,
          borderTop: pos.startsWith('t') ? '2px solid #00E5FF' : undefined,
          borderBottom: pos.startsWith('b') ? '2px solid #00E5FF' : undefined,
          borderLeft: pos.endsWith('l') ? '2px solid #00E5FF' : undefined,
          borderRight: pos.endsWith('r') ? '2px solid #00E5FF' : undefined,
          animation: \`hudBracketIn 0.4s ease-out \${i * 0.08}s both\`,
        }} />
      ))}

      {/* Card content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '24px' }}>
        {/* Badge */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '999px',
            background: sport.gradient,
            color: ['mens-basketball','esports'].includes(sport.id) ? '#fff' : '#0B1D3A',
            fontFamily: 'var(--font-sub)',
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            boxShadow: isEsports ? '0 0 12px #00E5FF66' : 'none',
          }}>
            {sport.shortLabel}
          </span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          lineHeight: 1.1,
          marginBottom: '10px',
          textShadow: isEsports ? \`0 0 20px \${sport.color}88\` : 'none',
        }}>
          {sport.label}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
          {sport.description}
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {[{ val: athleteCount, label: 'Athletes' }, { val: nilDeals, label: 'NIL Deals' }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '1.2rem', fontWeight: 700, color: sport.color, textShadow: isEsports ? \`0 0 10px \${sport.color}\` : 'none' }}>
                {s.val.toLocaleString()}
              </div>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
`);

// ============================================================
// 4. SPORT GRID
// ============================================================
write('src/components/sports/SportGrid.tsx', `'use client';
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
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: '32px' }}>
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
          <SportCard key={sport.id} sport={sport} athleteCount={stats[sport.id]?.athletes ?? 0} nilDeals={stats[sport.id]?.nilDeals ?? 0} onClick={() => toggle(sport.id)} isActive={active === sport.id} index={i} />
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
            style={{ marginTop: '16px', overflow: 'hidden', borderLeft: \`4px solid \${activeSport.color}\`, borderTop: 'none', borderRadius: '0 0 20px 20px' }}
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
`);

// ============================================================
// 5. NIL TICKER
// ============================================================
write('src/components/ui/NILTicker.tsx', `'use client';
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
    <div className="nil-ticker" style={{ background: 'rgba(11,29,58,0.7)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '8px 0' }}>
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
`);

// ============================================================
// 6. PROGRESS RING
// ============================================================
write('src/components/dashboard/AthleteProgressRing.tsx', `'use client';
// NextPlay Nexus — Athlete Progress Ring

import { motion } from 'framer-motion';
import { SportId, getSportColor } from '@/lib/sports';

interface Props {
  value: number;
  size?: number;
  strokeWidth?: number;
  sport?: SportId;
  label?: string;
  sublabel?: string;
}

export default function AthleteProgressRing({ value, size = 80, strokeWidth = 6, sport, label, sublabel }: Props) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = sport ? getSportColor(sport) : 'var(--color-gold)';
  const glow = sport === 'esports';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border-subtle)" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ filter: glow ? \`drop-shadow(0 0 6px \${color})\` : 'none' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ fontFamily: 'var(--font-data)', fontSize: size > 80 ? '1rem' : '0.8rem', fontWeight: 700, color, textShadow: glow ? \`0 0 10px \${color}\` : 'none' }}>
            {value}%
          </motion.span>
        </div>
      </div>
      {label && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
          {sublabel && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{sublabel}</div>}
        </div>
      )}
    </div>
  );
}
`);

// ============================================================
// 7. SPORTS DASHBOARD
// ============================================================
write('src/components/dashboard/SportsDashboard.tsx', `'use client';
// NextPlay Nexus — Sports Dashboard v2.0

import { useState } from 'react';
import { motion } from 'framer-motion';
import SportGrid from '@/components/sports/SportGrid';
import NILTicker from '@/components/ui/NILTicker';
import AthleteProgressRing from '@/components/dashboard/AthleteProgressRing';
import { SPORTS, SportId } from '@/lib/sports';

const MOCK = {
  'football': { athletes: 84, nilDeals: 12 },
  'flag-football': { athletes: 32, nilDeals: 4 },
  'mens-basketball': { athletes: 48, nilDeals: 9 },
  'womens-basketball': { athletes: 41, nilDeals: 7 },
  'womens-soccer': { athletes: 56, nilDeals: 6 },
  'esports': { athletes: 24, nilDeals: 11 },
};

export default function SportsDashboard() {
  const [activeSport, setActiveSport] = useState<SportId | null>(null);
  const sport = activeSport ? SPORTS.find(s => s.id === activeSport) : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-primary)' }}>
      <NILTicker />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }} style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '4px' }}>
              NextPlay <span style={{ color: 'var(--color-gold)' }}>Nexus</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>NIL + Athlete Development Platform</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[{ l: 'Athletes', v: '285', c: 'var(--color-gold)' }, { l: 'Sports', v: '6', c: 'var(--color-emerald)' }, { l: 'NIL Deals', v: '49', c: 'var(--color-slate)' }].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.4, ease: [0.16,1,0.3,1] }} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '1.5rem', fontWeight: 700, color: s.c }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active sport panel */}
        {sport && (
          <motion.div key={sport.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
            className="glass-card" style={{ marginBottom: '32px', padding: '24px', borderLeft: \`4px solid \${sport.color}\`, background: \`linear-gradient(135deg, var(--bg-card) 0%, \${sport.color}10 100%)\`, boxShadow: sport.id === 'esports' ? \`0 0 32px \${sport.color}33, var(--shadow-card)\` : 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: sport.color, marginBottom: '8px' }}>{sport.label}</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>{sport.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <AthleteProgressRing value={72} size={88} sport={sport.id} label="NIL Ready" sublabel="Avg score" />
                <AthleteProgressRing value={65} size={88} sport={sport.id} label="Modules" sublabel="Completed" />
              </div>
            </div>
          </motion.div>
        )}

        <SportGrid stats={MOCK} onSportSelect={setActiveSport} />
      </div>
    </div>
  );
}
`);

// ============================================================
// 8. HERO SECTION (Public)
// ============================================================
write('src/components/public/HeroSection.tsx', `'use client';
// NextPlay Nexus — Hero Section v2.0

import { motion } from 'framer-motion';
import Link from 'next/link';
import NILTicker from '@/components/ui/NILTicker';

const SPORT_PILLS = [
  { label: 'Football', color: '#FDB927' },
  { label: "Women's Flag FB", color: '#E8C87A' },
  { label: "Men's Basketball", color: '#4A90D9' },
  { label: "Women's Basketball", color: '#7B68EE' },
  { label: "Women's Soccer", color: '#1A7F5F' },
  { label: 'ESports', color: '#00E5FF', glow: true },
];

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-app)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Background SVG sport lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }} viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
        {[100,200,300,400,500,600,700,800,900].map(x => <line key={x} x1={x} y1={0} x2={x} y2={700} stroke="#FDB927" strokeWidth="0.5" style={{ animation: \`fieldLinesDraw 2s ease-out \${x*0.001}s both\` }} />)}
        <path d="M500,700 A250,250 0 0 1 500,200" stroke="#4A90D9" strokeWidth="1" fill="none" style={{ animation: 'fieldLinesDraw 2.5s ease-out 0.5s both' }} />
        <circle cx={800} cy={350} r={150} stroke="#1A7F5F" strokeWidth="0.8" fill="none" style={{ animation: 'fieldLinesDraw 2s ease-out 0.3s both' }} />
        {[0,50,100,150,200].map(y => <line key={y} x1={0} y1={y} x2={300} y2={y} stroke="#00E5FF" strokeWidth="0.25" style={{ animation: 'fieldLinesDraw 1.5s ease-out 0.8s both' }} />)}
      </svg>

      {/* Diagonal right panel */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '45%', height: '100%', background: 'linear-gradient(135deg, transparent 0%, rgba(11,29,58,0.5) 50%, rgba(253,185,39,0.06) 100%)', clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)', pointerEvents: 'none' }} />

      {/* Main content */}
      <div style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', padding: '7rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '580px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>NIL + Athlete Development</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '0.02em', color: 'var(--text-primary)', marginBottom: '24px' }}>
            Your Next<br /><span style={{ color: 'var(--color-gold)' }}>Play</span> Starts<br />Here.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay: 0.25 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '32px', maxWidth: '460px' }}>
            The player-centered platform combining NIL literacy, athlete development, and parent education — for high school and college programs across Football, Basketball, Soccer, Flag Football, and ESports.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1], delay: 0.35 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
            {SPORT_PILLS.map((p, i) => (
              <motion.span key={p.label}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.06, duration: 0.3, ease: [0.68,-0.55,0.27,1.55] }}
                style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '999px', border: \`1px solid \${p.color}66\`, color: p.color, fontFamily: 'var(--font-sub)', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: p.glow ? \`0 0 12px \${p.color}44\` : 'none' }}>
                {p.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1], delay: 0.5 }} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/demo" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '6px', textDecoration: 'none' }}>
              Request Demo
            </Link>
            <Link href="/solutions" style={{ display: 'inline-block', padding: '14px 32px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '6px', textDecoration: 'none', border: '1px solid var(--border-subtle)' }}>
              See Solutions
            </Link>
          </motion.div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}><NILTicker /></div>
    </section>
  );
}
`);

// ============================================================
// 9. globals.css import line
// ============================================================
write('src/styles/tokens-import.txt', `/* Add this line to src/app/globals.css */
@import '../styles/tokens.css';
`);

// ============================================================
// 10. SETUP COMPLETE LOG
// ============================================================
console.log('\n\n╔═══════════════════════════════════════════════════╗');
console.log('║  NextPlay Nexus Frontend Design System v2.0       ║');
console.log('║  Setup Complete ✓                                  ║');
console.log('╠═══════════════════════════════════════════════════╣');
console.log('║                                                    ║');
console.log('║  Files created:                                    ║');
console.log('║  • src/styles/tokens.css                          ║');
console.log('║  • src/lib/sports.ts                              ║');
console.log('║  • src/components/sports/SportCard.tsx            ║');
console.log('║  • src/components/sports/SportGrid.tsx            ║');
console.log('║  • src/components/ui/NILTicker.tsx                ║');
console.log('║  • src/components/dashboard/AthleteProgressRing   ║');
console.log('║  • src/components/dashboard/SportsDashboard.tsx   ║');
console.log('║  • src/components/public/HeroSection.tsx          ║');
console.log('║                                                    ║');
console.log('║  Next steps:                                       ║');
console.log('║  1. npm install framer-motion                     ║');
console.log('║  2. Add @import to globals.css (see tokens-import)║');
console.log('║  3. Add font variables to layout.tsx              ║');
console.log('║  4. Import HeroSection in app/page.tsx            ║');
console.log('║  5. Import SportsDashboard in dashboard/page.tsx  ║');
console.log('║                                                    ║');
console.log('║  Sports covered:                                   ║');
console.log('║  ⚑  Football                                      ║');
console.log('║  🏳  Women\'s Flag Football                        ║');
console.log('║  🏀  Men\'s Basketball                             ║');
console.log('║  🏀  Women\'s Basketball                           ║');
console.log('║  ⚽  Women\'s Soccer                               ║');
console.log('║  🎮  ESports                                       ║');
console.log('║                                                    ║');
console.log('╚═══════════════════════════════════════════════════╝\n');
