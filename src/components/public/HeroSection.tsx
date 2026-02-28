'use client';
// NextPlay Nexus — Hero Section v3.0
import { motion } from 'framer-motion';
import Link from 'next/link';
import NILTicker from '@/components/ui/NILTicker';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const SPORT_PILLS = [
  { label: 'Football', color: '#FDB927', glow: false },
  { label: "Women's Flag FB", color: '#E8C87A', glow: false },
  { label: "Men's Basketball", color: '#4A90D9', glow: false },
  { label: "Women's Basketball", color: '#7B68EE', glow: false },
  { label: "Women's Soccer", color: '#1A7F5F', glow: false },
  { label: 'ESports', color: '#00E5FF', glow: true },
];
const HERO_STATS = [
  { value: 285, suffix: '+', label: 'Athletes' },
  { value: 6, suffix: '', label: 'Sports' },
  { value: 49, suffix: '+', label: 'NIL Deals' },
];

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-app)', overflow: 'hidden', display: 'flex', flexDirection: 'column', paddingTop: '72px' }}>

      {/* Background field lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.055, pointerEvents: 'none' }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[120,240,360,480,600,720,840,960,1080].map((x, i) => (
          <line key={x} x1={x} y1={0} x2={x} y2={800} stroke="#FDB927" strokeWidth="0.6" style={{ animation: `fieldLinesDraw 2.2s ease-out ${i*0.1}s both` }} />
        ))}
        <path d="M1100,800 A320,320 0 0 1 780,480" stroke="#4A90D9" strokeWidth="1.2" fill="none" style={{ animation: 'fieldLinesDraw 3s ease-out 0.6s both' }} />
        <circle cx={950} cy={400} r={180} stroke="#1A7F5F" strokeWidth="0.8" fill="none" style={{ animation: 'fieldLinesDraw 2.5s ease-out 0.4s both' }} />
        {[40,80,120,160,200,240].map((y, i) => (
          <line key={y} x1={0} y1={y} x2={280} y2={y} stroke="#00E5FF" strokeWidth="0.25" style={{ animation: `fieldLinesDraw 1.8s ease-out ${0.8+i*0.04}s both` }} />
        ))}
      </svg>

      {/* Right diagonal accent */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', background: 'linear-gradient(135deg, transparent 0%, rgba(11,29,58,0.55) 40%, rgba(253,185,39,0.06) 100%)', clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)', pointerEvents: 'none' }} />

      {/* Abstract athlete silhouette — right side */}
      <svg style={{ position: 'absolute', right: '-4%', top: '8%', height: '85%', width: '48%', opacity: 0.055, pointerEvents: 'none' }} viewBox="0 0 400 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <ellipse cx="200" cy="80" rx="45" ry="45" fill="#FDB927" />
        <path d="M200,125 C180,155 155,180 140,220 C130,250 135,280 150,300 C165,320 185,330 195,360 C200,380 195,410 185,440" stroke="#FDB927" strokeWidth="28" fill="none" strokeLinecap="round" />
        <path d="M200,125 C220,155 245,180 260,220 C270,250 265,280 250,300 C235,320 215,330 205,360 C200,380 205,410 215,440" stroke="#FDB927" strokeWidth="28" fill="none" strokeLinecap="round" />
        <path d="M160,200 C130,195 95,185 65,200 C45,210 30,225 20,245" stroke="#FDB927" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M240,200 C270,195 305,175 330,160 C350,150 365,155 375,165" stroke="#FDB927" strokeWidth="22" fill="none" strokeLinecap="round" />
        <circle cx="378" cy="168" r="22" fill="#FDB927" opacity="0.8" />
        <path d="M185,440 C175,470 165,500 155,530" stroke="#FDB927" strokeWidth="24" fill="none" strokeLinecap="round" />
        <path d="M215,440 C230,470 245,500 255,530" stroke="#FDB927" strokeWidth="24" fill="none" strokeLinecap="round" />
        <ellipse cx="200" cy="570" rx="120" ry="18" fill="#FDB927" opacity="0.2" />
      </svg>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ maxWidth: '620px' }}>

          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '36px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600 }}>NIL + Athlete Development Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7.5vw, 6rem)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '0.01em', color: 'var(--text-primary)', marginBottom: '28px' }}
          >
            Your Next<br />
            <span style={{ color: 'var(--color-gold)' }}>Play Starts</span><br />
            Here.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.22 }} style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.78, marginBottom: '32px', maxWidth: '500px' }}>
            The player-centered platform combining NIL literacy, athlete development, and parent education for high school and college programs across all six major sports.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.32 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '40px' }}>
            {SPORT_PILLS.map((p, i) => (
              <motion.span key={p.label} initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.38 + i * 0.055, duration: 0.32, ease: [0.68, -0.55, 0.27, 1.55] }}
                style={{ display: 'inline-block', padding: '5px 13px', borderRadius: '999px', border: `1px solid ${p.color}55`, color: p.color, fontFamily: 'var(--font-sub)', fontSize: '0.66rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', boxShadow: p.glow ? `0 0 14px ${p.color}40` : 'none' }}>
                {p.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link href="/demo" style={{ display: 'inline-block', padding: '15px 36px', background: 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '7px', textDecoration: 'none', transition: 'box-shadow 0.2s ease, background 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(253,185,39,0.45)'; (e.currentTarget as HTMLElement).style.background = '#FFD166'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.background = 'var(--color-gold)'; }}
              >Request Demo</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link href="/solutions" style={{ display: 'inline-block', padding: '15px 36px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '7px', textDecoration: 'none', border: '1px solid rgba(253,185,39,0.35)', transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.7)'; (e.currentTarget as HTMLElement).style.background = 'rgba(253,185,39,0.06)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(253,185,39,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.35)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >See Solutions</Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.6 }} style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {HERO_STATS.map((stat, i) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: i > 0 ? '32px' : 0, borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1 }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating live deal notification — top right */}
      <motion.div
        initial={{ opacity: 0, x: 48, scale: 0.85 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '18%',
          right: '5%',
          zIndex: 20,
          background: 'rgba(11, 29, 58, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(253,185,39,0.25)',
          borderRadius: '14px',
          padding: '14px 18px',
          maxWidth: '220px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          pointerEvents: 'none',
        }}
        className="hidden-mobile animate-float"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1A7F5F', boxShadow: '0 0 8px #1A7F5F' }} />
          <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.6rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Live Deal</span>
        </div>
        <p style={{ fontFamily: 'var(--font-data)', fontSize: '0.72rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
          WR — State U.<br />
          <span style={{ color: 'var(--color-gold)' }}>$4,200</span> apparel deal signed
        </p>
        <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.58rem', color: 'var(--text-muted)', margin: '4px 0 0', letterSpacing: '0.04em' }}>2 min ago · Football</p>
      </motion.div>

      {/* Floating NIL score badge — lower right */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '22%',
          right: '7%',
          zIndex: 20,
          background: 'rgba(11, 29, 58, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(74,144,217,0.3)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
          pointerEvents: 'none',
        }}
        className="hidden-mobile"
      >
        <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '4px' }}>NIL Readiness</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: '1.4rem', fontWeight: 700, color: '#4A90D9' }}>94</span>
          <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.6rem', color: 'var(--text-secondary)' }}>/100</span>
        </div>
        <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
          {[80,92,88,94,100].map((v, i) => (
            <div key={i} style={{ width: '4px', height: `${v * 0.18}px`, background: '#4A90D9', borderRadius: '2px', opacity: 0.7 + i * 0.07 }} />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '96px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Scroll</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation: 'scrollChevron 1.5s ease-in-out infinite' }}>
          <path d="M4 7l5 5 5-5" stroke="rgba(253,185,39,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Diagonal bottom clip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'rgba(8,15,30,0.7)', clipPath: 'polygon(0 100%, 100% 100%, 100% 0)', zIndex: 5 }} />
      <div style={{ position: 'relative', zIndex: 10 }}><NILTicker /></div>
    </section>
  );
}
