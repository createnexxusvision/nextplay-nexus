'use client';
// NextPlay Nexus — Athlete NIL Questionnaire v3.0
// Immersive sport-atmosphere UI — all form logic intact

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';

// ── Types ──────────────────────────────────────────────────────────────────

type Grade = '9' | '10' | '11' | '12';
type Sport =
  | 'Football' | 'Womens Flag Football' | 'Mens Basketball' | 'Womens Basketball'
  | 'Soccer' | 'Baseball' | 'Track & Field' | 'Volleyball' | 'Golf'
  | 'Tennis' | 'Softball' | 'Swimming' | 'ESports' | 'Other';

interface FormData {
  name: string; grade: Grade | ''; sport: Sport | ''; state: string; school: string; email: string;
  nilStands: string; heardOfNilRules: string; hasSponsorships: string; nilConfidence: number; nilActivities: string[];
  hasBankAccount: string; knowsW9: string; brandPaymentResponse: string; finConfidence: number; finTopics: string[];
  intelligences: string[];
  teamRole: string; challengeResponse: string; twoYearGoal: string; learnTopics: string[];
}

const SPORTS: Sport[] = [
  'Football', 'Womens Flag Football', 'Mens Basketball', 'Womens Basketball',
  'Soccer', 'Baseball', 'Track & Field', 'Volleyball', 'Golf',
  'Tennis', 'Softball', 'Swimming', 'ESports', 'Other',
];

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
];

const NIL_ACTIVITIES = [
  'Social media monetization', 'Paid camp appearances', 'Signing with an agent',
  'Autograph sales', 'School logo on personal apparel',
];

const FIN_TOPICS = ['Taxes & 1099s', 'Investing basics', 'Budgeting', 'Business banking', 'Crypto/Web3', 'Contracts'];

const INTELLIGENCES = [
  { id: 'Linguistic', label: 'Linguistic', desc: 'Love words, writing, speaking' },
  { id: 'Logical-Mathematical', label: 'Logical-Mathematical', desc: 'Love numbers, patterns, problem-solving' },
  { id: 'Spatial', label: 'Spatial', desc: 'Love visuals, design, maps' },
  { id: 'Musical', label: 'Musical', desc: 'Love rhythm, sound, music' },
  { id: 'Bodily-Kinesthetic', label: 'Bodily-Kinesthetic', desc: 'Learn by doing, hands-on' },
  { id: 'Interpersonal', label: 'Interpersonal', desc: 'Strong with people, teamwork' },
  { id: 'Intrapersonal', label: 'Intrapersonal', desc: 'Self-aware, reflective' },
  { id: 'Naturalist', label: 'Naturalist', desc: 'Love outdoors, categories, systems' },
];

const LEARN_TOPICS = [
  'NIL basics', 'Financial literacy', 'Brand building', 'Contract understanding',
  'NCAA recruiting rules', 'Mental performance', 'Leadership development', 'Business fundamentals',
];

const STEP_LABELS = ['Basic Profile', 'NIL Literacy', 'Financial Literacy', 'Multiple Intelligences', 'Leadership & Goals'];
const STEP_ICONS = ['👤', '📋', '💰', '🧠', '🏆'];

// ── Badge logic ─────────────────────────────────────────────────────────────

function computeNILBadge(data: FormData): { badge: 'Rookie' | 'Rising' | 'Ready'; track: string } {
  let score = 0;
  if (data.nilStands === 'A') score += 2;
  if (data.heardOfNilRules === 'Yes') score += 1;
  if (data.hasSponsorships === 'Yes') score += 2;
  score += data.nilConfidence;
  score += Math.min(data.nilActivities.length, 3);
  score += data.finConfidence;
  if (data.hasBankAccount === 'Yes') score += 1;
  if (data.knowsW9 === 'Yes') score += 1;
  if (data.brandPaymentResponse === 'C' || data.brandPaymentResponse === 'D') score += 2;
  if (score <= 8) return { badge: 'Rookie', track: 'NIL Foundations — start with the basics of Name, Image & Likeness law, athlete rights, and financial awareness.' };
  if (score <= 16) return { badge: 'Rising', track: 'NIL Builder — you have a foundation. Level up with brand deals, financial planning, and contract literacy.' };
  return { badge: 'Ready', track: "NIL Pro Path — you're ahead of the curve. Dive into NILPOC smart contracts, stablecoin payments, and brand strategy." };
}

// ── Stable particle data (deterministic — no Math.random in render) ──────────

const PARTICLES = [
  { x: 8,  y: 15, s: 3, d: 6.2, delay: 0    },
  { x: 17, y: 72, s: 2, d: 8.1, delay: 1.2  },
  { x: 25, y: 38, s: 4, d: 5.8, delay: 2.4  },
  { x: 34, y: 88, s: 2, d: 9.3, delay: 0.7  },
  { x: 43, y: 22, s: 3, d: 7.0, delay: 3.1  },
  { x: 52, y: 60, s: 5, d: 6.5, delay: 1.9  },
  { x: 61, y: 45, s: 2, d: 8.8, delay: 0.3  },
  { x: 70, y: 80, s: 3, d: 7.4, delay: 2.8  },
  { x: 79, y: 12, s: 4, d: 5.5, delay: 1.5  },
  { x: 88, y: 55, s: 2, d: 9.1, delay: 3.6  },
  { x: 5,  y: 50, s: 3, d: 7.7, delay: 2.1  },
  { x: 14, y: 90, s: 5, d: 6.3, delay: 0.9  },
  { x: 22, y: 30, s: 2, d: 8.4, delay: 4.0  },
  { x: 31, y: 68, s: 3, d: 7.2, delay: 1.7  },
  { x: 40, y: 5,  s: 4, d: 5.9, delay: 3.3  },
  { x: 49, y: 42, s: 2, d: 8.6, delay: 0.5  },
  { x: 58, y: 95, s: 3, d: 6.8, delay: 2.6  },
  { x: 67, y: 28, s: 5, d: 7.9, delay: 1.1  },
  { x: 76, y: 65, s: 2, d: 9.5, delay: 3.8  },
  { x: 85, y: 18, s: 3, d: 6.1, delay: 0.2  },
  { x: 92, y: 75, s: 4, d: 8.2, delay: 2.3  },
  { x: 3,  y: 35, s: 2, d: 7.6, delay: 1.4  },
  { x: 95, y: 48, s: 3, d: 6.4, delay: 3.5  },
  { x: 48, y: 82, s: 2, d: 8.9, delay: 0.8  },
  { x: 72, y: 10, s: 4, d: 5.7, delay: 2.9  },
];

const SPEED_LINES = [
  { y: 18, w: 180, delay: 0   },
  { y: 35, w: 120, delay: 1.8 },
  { y: 52, w: 240, delay: 3.6 },
  { y: 68, w: 160, delay: 0.9 },
  { y: 84, w: 200, delay: 2.7 },
];

// ── Animated Background ───────────────────────────────────────────────────────

function AthleteBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes npn-float {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
        }
        @keyframes npn-speed {
          0%   { transform: translateX(-300px); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.7; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
        @keyframes npn-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes npn-orbit-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes npn-pulse-bg {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0.8; transform: scale(1.08); }
        }
        @keyframes npn-glow-border {
          0%, 100% { box-shadow: 0 0 0 1px rgba(253,185,39,0.15), 0 24px 60px rgba(0,0,0,0.4); }
          50%      { box-shadow: 0 0 0 1px rgba(253,185,39,0.35), 0 0 60px rgba(253,185,39,0.08), 0 24px 60px rgba(0,0,0,0.4); }
        }
        @keyframes npn-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes npn-tick {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        @keyframes npn-confetti {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(120px) rotate(720deg); opacity: 0; }
        }
        .npn-card-glow { animation: npn-glow-border 3s ease-in-out infinite; }
        .npn-progress-shimmer {
          background: linear-gradient(90deg, #FDB927 0%, #FFD166 40%, #fffbe6 50%, #FFD166 60%, #FDB927 100%);
          background-size: 200% 100%;
          animation: npn-shimmer 2.2s linear infinite;
        }
      `}</style>

      {/* Deep ambient gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(11,29,58,0.9) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 80%, rgba(26,127,95,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(253,185,39,0.04) 0%, transparent 60%)' }} />

      {/* Sport field SVG — universal lines: track oval + center circle + hash marks */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}
        viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
      >
        {/* Track oval */}
        <ellipse cx="700" cy="450" rx="580" ry="320" stroke="#FDB927" strokeWidth="2" fill="none" />
        <ellipse cx="700" cy="450" rx="480" ry="240" stroke="#FDB927" strokeWidth="1" fill="none" />
        {/* Center circle */}
        <circle cx="700" cy="450" r="90" stroke="#FDB927" strokeWidth="1.5" fill="none" />
        <circle cx="700" cy="450" r="8" fill="#FDB927" opacity="0.5" />
        {/* Hash marks — field lines */}
        {[120,240,360,480,600,720,840,960,1080,1200,1320].map((x, i) => (
          <line key={i} x1={x} y1={130} x2={x} y2={770} stroke="#4A90D9" strokeWidth="0.6" strokeDasharray="4 20" />
        ))}
        {/* Diagonal motion lines */}
        <line x1="0" y1="0" x2="400" y2="900" stroke="#FDB927" strokeWidth="0.5" />
        <line x1="200" y1="0" x2="600" y2="900" stroke="#FDB927" strokeWidth="0.3" />
        <line x1="1000" y1="0" x2="1400" y2="900" stroke="#4A90D9" strokeWidth="0.5" />
        {/* End zones */}
        <rect x="20" y="130" width="120" height="640" stroke="#1A7F5F" strokeWidth="1" fill="none" />
        <rect x="1260" y="130" width="120" height="640" stroke="#1A7F5F" strokeWidth="1" fill="none" />
        {/* Basketball 3-point arcs */}
        <path d="M700,450 m-200,0 a200,200 0 0,1 400,0" stroke="#7B68EE" strokeWidth="1" fill="none" />
        {/* Tennis/volleyball net line */}
        <line x1="120" y1="450" x2="1280" y2="450" stroke="#FDB927" strokeWidth="0.8" strokeDasharray="6 12" />
      </svg>

      {/* Slowly orbiting ring — like a medal or championship ring */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, animation: 'npn-orbit 60s linear infinite' }}>
        <svg width="700" height="700" viewBox="0 0 700 700" fill="none" opacity="0.03" aria-hidden="true">
          <circle cx="350" cy="350" r="340" stroke="#FDB927" strokeWidth="1.5" strokeDasharray="12 8" />
          <circle cx="350" cy="350" r="280" stroke="#4A90D9" strokeWidth="1" strokeDasharray="6 16" />
        </svg>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, animation: 'npn-orbit-rev 45s linear infinite' }}>
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none" opacity="0.03" aria-hidden="true">
          <circle cx="250" cy="250" r="240" stroke="#1A7F5F" strokeWidth="1" strokeDasharray="4 20" />
        </svg>
      </div>

      {/* Floating particles — stadium sparks */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#FDB927' : i % 3 === 1 ? '#4A90D9' : '#1A7F5F',
            animation: `npn-float ${p.d}s ease-in-out ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}

      {/* Speed lines — motion blur effect */}
      {SPEED_LINES.map((l, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${l.y}%`,
            left: 0,
            width: l.w,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(253,185,39,0.4), transparent)',
            animation: `npn-speed 4s ease-in-out ${l.delay}s infinite`,
            transformOrigin: 'left center',
          }}
        />
      ))}

      {/* Pulsing spotlight behind form area */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(253,185,39,0.05) 0%, transparent 70%)', animation: 'npn-pulse-bg 4s ease-in-out infinite', borderRadius: '50%' }} />
    </div>
  );
}

// ── Celebration particles for results ────────────────────────────────────────

const CONFETTI = [
  { x: 20, color: '#FDB927', d: 1.2, r: 15  },
  { x: 35, color: '#4A90D9', d: 0.8, r: -20 },
  { x: 50, color: '#1A7F5F', d: 1.5, r: 10  },
  { x: 65, color: '#FDB927', d: 0.9, r: -15 },
  { x: 80, color: '#7B68EE', d: 1.1, r: 25  },
  { x: 15, color: '#4A90D9', d: 1.4, r: -10 },
  { x: 45, color: '#FDB927', d: 0.7, r: 30  },
  { x: 70, color: '#1A7F5F', d: 1.3, r: -25 },
  { x: 85, color: '#FDB927', d: 1.0, r: 20  },
  { x: 55, color: '#4A90D9', d: 0.6, r: -5  },
];

function CelebrationBurst() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, overflow: 'hidden', pointerEvents: 'none' }}>
      {CONFETTI.map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${c.x}%`,
          top: -10,
          width: 8, height: 8,
          borderRadius: i % 2 === 0 ? '50%' : '2px',
          background: c.color,
          animation: `npn-confetti ${1.2 + c.d}s ease-out ${i * 0.08}s both`,
          transform: `rotate(${c.r}deg)`,
        }} />
      ))}
    </div>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px', color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
  fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase',
  letterSpacing: '0.08em', marginBottom: '8px',
};

const questionStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
  color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.5,
};

// ── Sub-components ────────────────────────────────────────────────────────────

function RadioOption({ value, label, selected, onSelect }: {
  value: string; label: string; selected: boolean; onSelect: (v: string) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(value)}
      whileTap={{ scale: 0.98 }}
      animate={selected ? { x: [0, 4, 0] } : {}}
      transition={{ type: 'spring', stiffness: 600, damping: 25 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        width: '100%', padding: '12px 16px',
        background: selected ? 'rgba(253,185,39,0.12)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? 'rgba(253,185,39,0.5)' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
        transition: 'all 0.2s ease', marginBottom: '8px',
        boxShadow: selected ? '0 0 20px rgba(253,185,39,0.15), inset 0 1px 0 rgba(253,185,39,0.15)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { if (!selected) { const el = e.currentTarget; el.style.borderColor = 'rgba(253,185,39,0.3)'; el.style.background = 'rgba(255,255,255,0.05)'; }}}
      onMouseLeave={e => { if (!selected) { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.09)'; el.style.background = 'rgba(255,255,255,0.03)'; }}}
    >
      {/* Shimmer on select */}
      {selected && (
        <motion.div
          initial={{ x: '-100%', opacity: 0.6 }}
          animate={{ x: '200%', opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(253,185,39,0.25), transparent)', pointerEvents: 'none' }}
        />
      )}
      <motion.span
        animate={selected ? { scale: [1, 1.3, 1], boxShadow: ['0 0 0 0 rgba(253,185,39,0)', '0 0 0 6px rgba(253,185,39,0.2)', '0 0 0 0 rgba(253,185,39,0)'] } : {}}
        transition={{ duration: 0.3 }}
        style={{
          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
          border: `2px solid ${selected ? 'var(--color-gold)' : 'rgba(255,255,255,0.3)'}`,
          background: selected ? 'var(--color-gold)' : 'transparent',
          transition: 'all 0.2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {selected && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-primary)' }} />}
      </motion.span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: selected ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: selected ? 600 : 400, transition: 'all 0.2s ease' }}>
        {label}
      </span>
    </motion.button>
  );
}

function CheckOption({ value, label, desc, checked, onToggle, maxReached }: {
  value: string; label: string; desc?: string; checked: boolean;
  onToggle: (v: string) => void; maxReached?: boolean;
}) {
  const disabled = !checked && !!maxReached;
  return (
    <motion.button
      type="button"
      onClick={() => !disabled && onToggle(value)}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '10px',
        width: '100%', padding: '12px 16px',
        background: checked ? 'rgba(253,185,39,0.1)' : disabled ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${checked ? 'rgba(253,185,39,0.45)' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: '10px', cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'left', transition: 'all 0.2s ease',
        marginBottom: '8px', opacity: disabled ? 0.4 : 1,
        boxShadow: checked ? '0 0 18px rgba(253,185,39,0.12)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { if (!checked && !disabled) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.3)'; }}
      onMouseLeave={e => { if (!checked && !disabled) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; }}
    >
      {checked && (
        <motion.div
          initial={{ x: '-100%', opacity: 0.5 }}
          animate={{ x: '200%', opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(253,185,39,0.2), transparent)', pointerEvents: 'none' }}
        />
      )}
      <motion.span
        animate={checked ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.25 }}
        style={{
          width: 20, height: 20, borderRadius: '5px', marginTop: '1px', flexShrink: 0,
          border: `2px solid ${checked ? 'var(--color-gold)' : 'rgba(255,255,255,0.3)'}`,
          background: checked ? 'var(--color-gold)' : 'transparent',
          transition: 'all 0.2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {checked && (
          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="#0B1D3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        )}
      </motion.span>
      <span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: checked ? 'var(--text-primary)' : 'var(--text-secondary)', display: 'block', fontWeight: checked ? 600 : 400, transition: 'all 0.2s ease' }}>{label}</span>
        {desc && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{desc}</span>}
      </span>
    </motion.button>
  );
}

function StarRating({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const labels = ['', 'No idea', 'Barely aware', 'Some knowledge', 'Pretty confident', 'Very confident'];
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;
  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <motion.button
            key={n} type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            style={{
              width: 44, height: 44, borderRadius: '10px',
              border: `1px solid ${display >= n ? 'rgba(253,185,39,0.7)' : 'rgba(255,255,255,0.1)'}`,
              background: display >= n ? 'rgba(253,185,39,0.2)' : 'rgba(255,255,255,0.03)',
              color: display >= n ? 'var(--color-gold)' : 'var(--text-muted)',
              fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
              cursor: 'pointer', transition: 'border-color 0.15s ease, background 0.15s ease',
              boxShadow: value === n ? '0 0 20px rgba(253,185,39,0.35)' : 'none',
            }}
          >{n}</motion.button>
        ))}
        {display > 0 && (
          <motion.span
            key={display}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ fontFamily: 'var(--font-sub)', fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 600, marginLeft: '6px' }}
          >
            {labels[display]}
          </motion.span>
        )}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>{label}</p>
    </div>
  );
}

const BADGE_COLORS = {
  Rookie: { bg: 'rgba(74,144,217,0.15)', border: 'rgba(74,144,217,0.4)', text: '#4A90D9', glow: 'rgba(74,144,217,0.3)' },
  Rising: { bg: 'rgba(253,185,39,0.15)', border: 'rgba(253,185,39,0.4)', text: 'var(--color-gold)', glow: 'rgba(253,185,39,0.3)' },
  Ready:  { bg: 'rgba(52,199,89,0.15)',  border: 'rgba(52,199,89,0.4)',  text: '#34C759', glow: 'rgba(52,199,89,0.3)' },
};
const BADGE_EMOJI = { Rookie: '🏃', Rising: '⚡', Ready: '🏆' };

const EMPTY_FORM: FormData = {
  name: '', grade: '', sport: '', state: '', school: '', email: '',
  nilStands: '', heardOfNilRules: '', hasSponsorships: '', nilConfidence: 0, nilActivities: [],
  hasBankAccount: '', knowsW9: '', brandPaymentResponse: '', finConfidence: 0, finTopics: [],
  intelligences: [],
  teamRole: '', challengeResponse: '', twoYearGoal: '', learnTopics: [],
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function AthleteQuestionnaire() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<{ badge: 'Rookie' | 'Rising' | 'Ready'; track: string } | null>(null);
  const [direction, setDirection] = useState(1);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleArr = (key: 'nilActivities' | 'finTopics' | 'intelligences' | 'learnTopics', val: string, max?: number) => {
    setForm(prev => {
      const arr = prev[key] as string[];
      if (arr.includes(val)) return { ...prev, [key]: arr.filter(v => v !== val) };
      if (max && arr.length >= max) return prev;
      return { ...prev, [key]: [...arr, val] };
    });
  };

  const goNext = () => { setDirection(1); setStep(s => Math.min(s + 1, 5)); };
  const goPrev = () => { setDirection(-1); setStep(s => Math.max(s - 1, 1)); };

  const canAdvance = (): boolean => {
    if (step === 1) return !!(form.name && form.grade && form.sport && form.state && form.school && form.email);
    if (step === 2) return !!(form.nilStands && form.heardOfNilRules && form.hasSponsorships && form.nilConfidence > 0);
    if (step === 3) return !!(form.hasBankAccount && form.knowsW9 && form.brandPaymentResponse && form.finConfidence > 0);
    if (step === 4) return form.intelligences.length >= 2;
    if (step === 5) return !!(form.teamRole && form.challengeResponse && form.twoYearGoal.trim());
    return true;
  };

  const handleSubmit = async () => {
    if (!canAdvance()) return;
    setSubmitting(true);
    const computed = computeNILBadge(form);
    try {
      const supabase = createClient();
      await supabase.from('athlete_profiles').insert({
        name: form.name, grade: form.grade, sport: form.sport, state: form.state,
        school: form.school, email: form.email, nil_literacy_score: computed.badge,
        nil_stands: form.nilStands, heard_of_nil_rules: form.heardOfNilRules,
        has_sponsorships: form.hasSponsorships, nil_confidence: form.nilConfidence,
        nil_activities: form.nilActivities, has_bank_account: form.hasBankAccount,
        knows_w9: form.knowsW9, brand_payment_response: form.brandPaymentResponse,
        fin_confidence: form.finConfidence, fin_topics: form.finTopics,
        intelligences: form.intelligences, team_role: form.teamRole,
        challenge_response: form.challengeResponse, two_year_goal: form.twoYearGoal,
        learn_topics: form.learnTopics, recommended_track: computed.track,
      });
      await supabase.from('email_captures').insert({ email: form.email, name: form.name, user_type: 'athlete', source: 'nil_questionnaire' });
    } catch (err) {
      try { localStorage.setItem('npn_athlete_profile', JSON.stringify({ form, result: computed })); } catch { /* ignore */ }
    }
    setResult(computed);
    setDone(true);
    setSubmitting(false);
  };

  // Scoreboard ticker value
  const scoreDisplay = useMemo(() => Math.round((step / 5) * 100), [step]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 70 : -70, opacity: 0, filter: 'blur(6px)' }),
    center: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (dir: number) => ({ x: dir > 0 ? -70 : 70, opacity: 0, filter: 'blur(6px)' }),
  };

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: '8px',
    border: 'none', cursor: 'pointer', transition: 'all 0.2s ease',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-primary)', position: 'relative' }}>
      {/* Immersive sport background */}
      <AthleteBackground />

      <Navbar />

      <main style={{ paddingTop: '96px', paddingBottom: '80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: 36, height: 2, background: 'var(--color-gold)', borderRadius: 2 }} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>
                Athlete Assessment
              </span>
              <div style={{ width: 36, height: 2, background: 'var(--color-gold)', borderRadius: 2 }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', margin: '0 0 12px' }}>
              Build Your <span style={{ color: 'var(--color-gold)' }}>NIL Profile</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
              Answer honestly — there are no wrong answers. We use your responses to personalize your learning path and unlock your first module free.
            </p>
          </motion.div>

          {!done ? (
            <>
              {/* ── Scoreboard-style progress ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ marginBottom: '32px' }}
              >
                {/* Score ticker */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
                      Step {step} of 5
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {STEP_LABELS[step - 1]}
                    </div>
                  </div>
                  {/* Scoreboard counter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(11,29,58,0.7)', border: '1px solid rgba(253,185,39,0.2)', borderRadius: '8px', padding: '6px 14px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A7F5F', boxShadow: '0 0 6px #1A7F5F', animation: 'npn-tick 1s ease-in-out infinite' }} />
                    <motion.span
                      key={scoreDisplay}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ fontFamily: 'var(--font-data)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-gold)' }}
                    >
                      {scoreDisplay}%
                    </motion.span>
                  </div>
                </div>

                {/* Progress bar with shimmer */}
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                  <motion.div
                    animate={{ width: `${scoreDisplay}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="npn-progress-shimmer"
                    style={{ height: '100%', borderRadius: 6, position: 'relative' }}
                  />
                </div>

                {/* Step dots */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'center' }}>
                  {STEP_LABELS.map((lbl, i) => {
                    const isCompleted = i + 1 < step;
                    const isActive = i + 1 === step;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        animate={isActive ? { boxShadow: ['0 0 0 0 rgba(253,185,39,0)', '0 0 0 6px rgba(253,185,39,0.2)', '0 0 0 0 rgba(253,185,39,0)'] } : {}}
                        transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
                        title={lbl}
                        style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: isCompleted ? 'var(--color-gold)' : isActive ? 'rgba(253,185,39,0.2)' : 'rgba(255,255,255,0.04)',
                          border: `2px solid ${i + 1 <= step ? 'var(--color-gold)' : 'rgba(255,255,255,0.12)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700,
                          color: isCompleted ? 'var(--color-primary)' : isActive ? 'var(--color-gold)' : 'var(--text-muted)',
                          transition: 'all 0.3s ease', cursor: 'default',
                        }}
                      >
                        {isCompleted ? (
                          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M1 5l3.5 3.5L11 1" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </motion.svg>
                        ) : isActive ? STEP_ICONS[i] : i + 1}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Form card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="npn-card-glow"
                style={{
                  background: 'rgba(11,29,58,0.55)',
                  backdropFilter: 'blur(28px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent line */}
                <div style={{ position: 'relative', marginBottom: '28px' }}>
                  <div style={{ height: 2, background: 'linear-gradient(90deg, var(--color-gold), transparent)', borderRadius: 2, width: '60%' }} />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  >

                    {/* ── STEP 1: Basic Profile ── */}
                    {step === 1 && (
                      <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                          Your Athletic Profile
                        </h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
                          Every great journey starts by knowing who&apos;s on the field.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>Full Name *</label>
                            <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)}
                              placeholder="Your full name"
                              onFocus={e => { e.target.style.borderColor = 'rgba(253,185,39,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(253,185,39,0.08)'; }}
                              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }} />
                          </div>
                          <div>
                            <label style={labelStyle}>Grade *</label>
                            <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.grade} onChange={e => set('grade', e.target.value as Grade)}
                              onFocus={e => { e.target.style.borderColor = 'rgba(253,185,39,0.55)'; }}
                              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}>
                              <option value="" style={{ background: '#0B1D3A' }}>Select grade</option>
                              {['9','10','11','12'].map(g => <option key={g} value={g} style={{ background: '#0B1D3A' }}>Grade {g}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={labelStyle}>State *</label>
                            <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.state} onChange={e => set('state', e.target.value)}
                              onFocus={e => { e.target.style.borderColor = 'rgba(253,185,39,0.55)'; }}
                              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}>
                              <option value="" style={{ background: '#0B1D3A' }}>Select state</option>
                              {US_STATES.map(s => <option key={s} value={s} style={{ background: '#0B1D3A' }}>{s}</option>)}
                            </select>
                          </div>
                          <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>Primary Sport *</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '8px' }}>
                              {SPORTS.map(s => (
                                <motion.button key={s} type="button" onClick={() => set('sport', s)}
                                  whileTap={{ scale: 0.95 }}
                                  style={{
                                    padding: '9px 12px',
                                    background: form.sport === s ? 'rgba(253,185,39,0.15)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${form.sport === s ? 'rgba(253,185,39,0.55)' : 'rgba(255,255,255,0.09)'}`,
                                    borderRadius: '8px',
                                    color: form.sport === s ? 'var(--color-gold)' : 'var(--text-secondary)',
                                    fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: form.sport === s ? 600 : 400,
                                    cursor: 'pointer', transition: 'all 0.18s ease', textAlign: 'left',
                                    boxShadow: form.sport === s ? '0 0 16px rgba(253,185,39,0.15)' : 'none',
                                  }}
                                  onMouseEnter={e => { if (form.sport !== s) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.3)'; }}
                                  onMouseLeave={e => { if (form.sport !== s) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; }}
                                >{s}</motion.button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label style={labelStyle}>School Name *</label>
                            <input style={inputStyle} value={form.school} onChange={e => set('school', e.target.value)}
                              placeholder="Your high school"
                              onFocus={e => { e.target.style.borderColor = 'rgba(253,185,39,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(253,185,39,0.08)'; }}
                              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }} />
                          </div>
                          <div>
                            <label style={labelStyle}>Email Address *</label>
                            <input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)}
                              placeholder="your@email.com"
                              onFocus={e => { e.target.style.borderColor = 'rgba(253,185,39,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(253,185,39,0.08)'; }}
                              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2: NIL Literacy ── */}
                    {step === 2 && (
                      <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>NIL Literacy Check</h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '28px' }}>Be honest — this is how we personalize your experience. No wrong answers here.</p>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>1. What does NIL stand for?</p>
                          {[{ value:'A', label:'A. Name, Image, Likeness' },{ value:'B', label:'B. National Institute Licensing' },{ value:'C', label:'C. New Identity Law' },{ value:'D', label:'D. Not sure' }].map(opt => (
                            <RadioOption key={opt.value} value={opt.value} label={opt.label} selected={form.nilStands === opt.value} onSelect={v => set('nilStands', v)} />
                          ))}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>2. Have you heard of NIL rules at your school or state?</p>
                          {['Yes', 'No', 'Heard of it but unsure'].map(opt => (
                            <RadioOption key={opt} value={opt} label={opt} selected={form.heardOfNilRules === opt} onSelect={v => set('heardOfNilRules', v)} />
                          ))}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>3. Do you have any current sponsorship or endorsement agreements?</p>
                          {['Yes', 'No', 'Not sure what that means'].map(opt => (
                            <RadioOption key={opt} value={opt} label={opt} selected={form.hasSponsorships === opt} onSelect={v => set('hasSponsorships', v)} />
                          ))}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>4. Rate your NIL understanding right now</p>
                          <StarRating value={form.nilConfidence} onChange={v => set('nilConfidence', v)} label="1 = No idea at all · 5 = Very confident" />
                        </div>
                        <div>
                          <p style={questionStyle}>5. Which can a HS athlete do under NIL? <span style={{ fontFamily:'var(--font-sub)', fontSize:'0.72rem', color:'var(--text-muted)', fontWeight:400 }}>(select all you believe apply)</span></p>
                          {NIL_ACTIVITIES.map(act => (
                            <CheckOption key={act} value={act} label={act} checked={form.nilActivities.includes(act)} onToggle={v => toggleArr('nilActivities', v)} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── STEP 3: Financial Literacy ── */}
                    {step === 3 && (
                      <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>Financial Literacy</h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '28px' }}>Help us understand your financial knowledge so we can build your curriculum around it.</p>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>1. Have you ever opened a bank account?</p>
                          {['Yes', 'No'].map(opt => (
                            <RadioOption key={opt} value={opt} label={opt} selected={form.hasBankAccount === opt} onSelect={v => set('hasBankAccount', v)} />
                          ))}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>2. Do you know what a W-9 form is?</p>
                          {['Yes', 'No', 'Heard of it'].map(opt => (
                            <RadioOption key={opt} value={opt} label={opt} selected={form.knowsW9 === opt} onSelect={v => set('knowsW9', v)} />
                          ))}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>3. If a brand paid you $5,000 for a post, what would you do first?</p>
                          {[{ value:'A', label:'A. Spend it on what I want' },{ value:'B', label:'B. Save all of it immediately' },{ value:'C', label:'C. Consult a financial advisor' },{ value:'D', label:'D. Set aside taxes first' }].map(opt => (
                            <RadioOption key={opt.value} value={opt.value} label={opt.label} selected={form.brandPaymentResponse === opt.value} onSelect={v => set('brandPaymentResponse', v)} />
                          ))}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>4. Rate your financial confidence</p>
                          <StarRating value={form.finConfidence} onChange={v => set('finConfidence', v)} label="1 = Never thought about it · 5 = Very financially aware" />
                        </div>
                        <div>
                          <p style={questionStyle}>5. Which financial topics interest you most? <span style={{ fontFamily:'var(--font-sub)', fontSize:'0.72rem', color:'var(--text-muted)', fontWeight:400 }}>(select all)</span></p>
                          {FIN_TOPICS.map(t => (
                            <CheckOption key={t} value={t} label={t} checked={form.finTopics.includes(t)} onToggle={v => toggleArr('finTopics', v)} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── STEP 4: Multiple Intelligences ── */}
                    {step === 4 && (
                      <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>How You Think Best</h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Based on Howard Gardner&apos;s Multiple Intelligences framework — used by coaches and educators worldwide.</p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'rgba(253,185,39,0.1)', border: '1px solid rgba(253,185,39,0.25)', borderRadius: '6px', marginBottom: '24px' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="var(--color-gold)" strokeWidth="1.5"/><path d="M7 6v4M7 4.5v.5" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                            Pick your top 2–3 — {form.intelligences.length}/3 selected
                          </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '8px' }}>
                          {INTELLIGENCES.map(intel => (
                            <CheckOption key={intel.id} value={intel.id} label={intel.label} desc={intel.desc}
                              checked={form.intelligences.includes(intel.id)}
                              onToggle={v => toggleArr('intelligences', v, 3)}
                              maxReached={form.intelligences.length >= 3} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── STEP 5: Leadership & Goals ── */}
                    {step === 5 && (
                      <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>Leadership & Goals</h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '28px' }}>The most important intel — what drives you and where you&apos;re headed.</p>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>1. On a team I am most often the:</p>
                          {['Leader', 'Supporter', 'Motivator', 'Quiet Contributor', 'Depends on the situation'].map(opt => (
                            <RadioOption key={opt} value={opt} label={opt} selected={form.teamRole === opt} onSelect={v => set('teamRole', v)} />
                          ))}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <p style={questionStyle}>2. When I face a challenge I typically:</p>
                          {[{ value:'A', label:'A. Ask for help immediately' },{ value:'B', label:'B. Figure it out on my own' },{ value:'C', label:'C. Research first, then ask if needed' },{ value:'D', label:'D. Avoid it until necessary' }].map(opt => (
                            <RadioOption key={opt.value} value={opt.value} label={opt.label} selected={form.challengeResponse === opt.value} onSelect={v => set('challengeResponse', v)} />
                          ))}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <label style={{ ...labelStyle, display: 'block', marginBottom: '10px' }}>
                            3. My biggest goal in the next 2 years{' '}
                            <span style={{ color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0 }}>(3 sentences max)</span>
                          </label>
                          <textarea value={form.twoYearGoal} onChange={e => set('twoYearGoal', e.target.value)}
                            placeholder="Describe your biggest goal..."
                            rows={4}
                            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px', lineHeight: 1.6 }}
                            onFocus={e => { e.target.style.borderColor = 'rgba(253,185,39,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(253,185,39,0.08)'; }}
                            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
                          />
                        </div>
                        <div>
                          <p style={questionStyle}>4. What do you want to learn most at NextPlay Nexus? <span style={{ fontFamily:'var(--font-sub)', fontSize:'0.72rem', color:'var(--text-muted)', fontWeight:400 }}>(select all)</span></p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px' }}>
                            {LEARN_TOPICS.map(t => (
                              <CheckOption key={t} value={t} label={t} checked={form.learnTopics.includes(t)} onToggle={v => toggleArr('learnTopics', v)} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {/* Bottom accent line */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, var(--color-gold), transparent)', margin: '28px 0 0', opacity: 0.25 }} />

                {/* Nav buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                  <motion.button
                    type="button" onClick={goPrev} disabled={step === 1}
                    whileHover={step > 1 ? { x: -3 } : {}}
                    whileTap={step > 1 ? { scale: 0.95 } : {}}
                    style={{ ...btnBase, padding: '12px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: step === 1 ? 'var(--text-muted)' : 'var(--text-secondary)', opacity: step === 1 ? 0.35 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
                    onMouseEnter={e => { if (step > 1) { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.28)'; el.style.color = 'var(--text-primary)'; }}}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.color = 'var(--text-secondary)'; }}
                  >← Back</motion.button>

                  {step < 5 ? (
                    <motion.button
                      type="button" onClick={goNext} disabled={!canAdvance()}
                      whileHover={canAdvance() ? { x: 3 } : {}}
                      whileTap={canAdvance() ? { scale: 0.96 } : {}}
                      style={{ ...btnBase, padding: '12px 36px', background: canAdvance() ? 'var(--color-gold)' : 'rgba(253,185,39,0.18)', color: canAdvance() ? 'var(--color-primary)' : 'rgba(253,185,39,0.45)', cursor: canAdvance() ? 'pointer' : 'not-allowed' }}
                      onMouseEnter={e => { if (canAdvance()) (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(253,185,39,0.55)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                    >Next Step →</motion.button>
                  ) : (
                    <motion.button
                      type="button" onClick={handleSubmit} disabled={!canAdvance() || submitting}
                      whileTap={canAdvance() && !submitting ? { scale: 0.96 } : {}}
                      style={{ ...btnBase, padding: '12px 36px', minWidth: '200px', background: canAdvance() && !submitting ? 'var(--color-gold)' : 'rgba(253,185,39,0.18)', color: canAdvance() && !submitting ? 'var(--color-primary)' : 'rgba(253,185,39,0.45)', cursor: canAdvance() && !submitting ? 'pointer' : 'not-allowed' }}
                      onMouseEnter={e => { if (canAdvance() && !submitting) (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(253,185,39,0.6)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                    >
                      {submitting ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid var(--color-primary)', borderTopColor: 'transparent', borderRadius: '50%' }} />
                          Building Profile…
                        </span>
                      ) : '🏆 Get My NIL Profile'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </>
          ) : (
            /* ── Results Card ── */
            result && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{
                  background: 'rgba(11,29,58,0.65)', backdropFilter: 'blur(28px)',
                  border: `1px solid ${BADGE_COLORS[result.badge].border}`,
                  borderRadius: '24px', padding: 'clamp(2rem, 5vw, 3.5rem)',
                  textAlign: 'center', position: 'relative', overflow: 'hidden',
                  boxShadow: `0 0 80px ${BADGE_COLORS[result.badge].glow}, 0 24px 80px rgba(0,0,0,0.5)`,
                }}>
                  <CelebrationBurst />
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${BADGE_COLORS[result.badge].bg} 0%, transparent 65%)`, pointerEvents: 'none' }} />

                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 18 }}
                    style={{
                      width: 88, height: 88, borderRadius: '50%', margin: '0 auto 24px',
                      background: BADGE_COLORS[result.badge].bg,
                      border: `3px solid ${BADGE_COLORS[result.badge].border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2.4rem',
                      boxShadow: `0 0 40px ${BADGE_COLORS[result.badge].glow}`,
                    }}
                  >
                    {BADGE_EMOJI[result.badge]}
                  </motion.div>

                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                    Your NIL Profile
                  </motion.p>
                  <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', margin: '0 0 16px' }}>
                    {form.name.split(' ')[0]}, You&apos;re a
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55, type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      display: 'inline-block', padding: '10px 32px',
                      background: BADGE_COLORS[result.badge].bg,
                      border: `1px solid ${BADGE_COLORS[result.badge].border}`,
                      borderRadius: '100px',
                      fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      color: BADGE_COLORS[result.badge].text, marginBottom: '36px',
                      boxShadow: `0 0 24px ${BADGE_COLORS[result.badge].glow}`,
                    }}
                  >
                    {result.badge}
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px 24px', marginBottom: '24px', textAlign: 'left' }}>
                    <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '8px' }}>
                      Recommended Learning Track
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                      {result.track}
                    </p>
                  </motion.div>

                  {form.intelligences.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} style={{ marginBottom: '32px' }}>
                      <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '10px' }}>Your Intelligence Profile</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                        {form.intelligences.map((intel, i) => (
                          <motion.span key={intel} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.06 }}
                            style={{ padding: '6px 16px', background: 'rgba(253,185,39,0.1)', border: '1px solid rgba(253,185,39,0.25)', borderRadius: '6px', fontFamily: 'var(--font-sub)', fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                            {intel}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="/demo"
                      style={{ display: 'inline-block', padding: '15px 40px', background: 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: '8px', textDecoration: 'none', transition: 'box-shadow 0.2s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(253,185,39,0.65)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                    >Request a Demo</a>
                    <a href="/dashboard"
                      style={{ display: 'inline-block', padding: '15px 40px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(253,185,39,0.3)', transition: 'all 0.2s ease' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(253,185,39,0.65)'; el.style.background = 'rgba(253,185,39,0.07)'; el.style.boxShadow = '0 0 20px rgba(253,185,39,0.15)'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(253,185,39,0.3)'; el.style.background = 'transparent'; el.style.boxShadow = 'none'; }}
                    >Start Free Module</a>
                  </motion.div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
