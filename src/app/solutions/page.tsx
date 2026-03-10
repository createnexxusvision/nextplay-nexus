'use client';
// NextPlay Nexus — Solutions Page

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SOLUTIONS = [
  {
    id: 'athletes',
    tag: 'Athletes',
    color: '#FDB927',
    gradient: 'linear-gradient(135deg, #FDB927 0%, #B8860B 100%)',
    tagText: '#0B1D3A',
    headline: 'Own Your Name, Image & Likeness',
    subhead: 'For High School & College Athletes',
    body: 'Build your NIL literacy from the moment you step on campus. Track your readiness score, complete certified compliance modules, and get matched with verified brand opportunities — all in one place.',
    bullets: [
      'Personalized NIL Readiness Score',
      'Sport-specific compliance curriculum',
      'Brand partnership match alerts',
      'Deal tracking & contract transparency',
      'Parent & guardian education portal',
      'Certified NIL completion badge',
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="12" r="6" stroke="#FDB927" strokeWidth="1.8"/>
        <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#FDB927" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M30 18l2 2 5-5" stroke="#FDB927" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'programs',
    tag: 'Programs',
    color: '#4A90D9',
    gradient: 'linear-gradient(135deg, #0B1D3A 0%, #4A90D9 100%)',
    tagText: '#fff',
    headline: 'Compliance at Scale',
    subhead: 'For Athletic Directors & Coaching Staff',
    body: 'Real-time compliance dashboards, bulk athlete enrollment, and sport-specific reporting — built for the full athletic department from ADs and compliance officers to coaching staff and parents.',
    bullets: [
      'Compliance dashboard & audit trail',
      'Bulk athlete enrollment & sport filtering',
      'Parent communication hub',
      'Role-based access (AD, Coach, Compliance)',
      'Automated progress & certification reports',
      'Multi-sport roster management',
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="8" width="28" height="24" rx="4" stroke="#4A90D9" strokeWidth="1.8"/>
        <path d="M6 16h28" stroke="#4A90D9" strokeWidth="1.8"/>
        <path d="M14 24h12M14 28h8" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="12" r="2" fill="#4A90D9"/>
        <circle cx="18" cy="12" r="2" fill="#4A90D9"/>
      </svg>
    ),
  },
  {
    id: 'brands',
    tag: 'Brands',
    color: '#34D399',
    gradient: 'linear-gradient(135deg, #1A7F5F 0%, #34D399 100%)',
    tagText: '#fff',
    headline: 'Reach Verified Athletes',
    subhead: 'For Local & National Brands',
    body: 'Connect with NIL-verified, compliance-cleared athletes across 6 sports. Transparent deal structures, performance tracking, and authentic community partnerships that make a real difference.',
    bullets: [
      'Compliance-verified athlete pool',
      'Sport-specific & location-based search',
      'Transparent deal structure builder',
      'Performance & engagement reports',
      'Automated compliance documentation',
      'Authentic community brand alignment',
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M8 28L20 10l12 18H8z" stroke="#34D399" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="30" cy="12" r="5" stroke="#34D399" strokeWidth="1.8"/>
        <path d="M28 12l1.5 1.5L33 10" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const PLATFORM_FEATURES = [
  { icon: '🏆', title: 'NIL Readiness Score', desc: 'Proprietary scoring engine rates each athlete on compliance knowledge, social media presence, and deal readiness.' },
  { icon: '📋', title: 'Compliance Dashboard', desc: 'Real-time visibility into every athlete\'s certification progress with automated alerts for compliance gaps.' },
  { icon: '🤝', title: 'Brand Matching', desc: 'AI-powered matching connects verified athletes with brands that align with their sport, school, and audience.' },
  { icon: '📊', title: 'Deal Transparency', desc: 'Every NIL agreement is logged, tracked, and reportable — giving programs full audit-ready documentation.' },
  { icon: '🎓', title: 'Modular Curriculum', desc: '6-module NIL literacy path: Basics, Brand Partnership, Social Media, Contract Fundamentals, Financial Literacy, and Parent Education.' },
  { icon: '⚡', title: 'Multi-Sport Support', desc: 'Native support for Football, Flag Football, Basketball (M/W), Soccer, and ESports with sport-specific compliance rules.' },
];

const PRICING_TIERS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    color: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.12)',
    tag: '',
    features: [
      '1 sport',
      'Up to 50 athletes',
      'NIL Readiness Score',
      'Basic compliance modules',
      'Email support',
    ],
    cta: 'Get Started Free',
    ctaHref: '/demo',
    ctaStyle: 'outline',
  },
  {
    name: 'Program',
    price: '$299',
    period: '/mo',
    color: 'rgba(253,185,39,0.06)',
    border: '#FDB927',
    tag: 'Most Popular',
    features: [
      'Up to 3 sports',
      'Up to 300 athletes',
      'Full compliance dashboard',
      'Bulk enrollment & reporting',
      'Parent communication hub',
      'Brand match alerts',
      'Priority support',
    ],
    cta: 'Request Demo',
    ctaHref: '/demo',
    ctaStyle: 'gold',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    color: 'rgba(74,144,217,0.06)',
    border: '#4A90D9',
    tag: '',
    features: [
      'Unlimited sports',
      'Unlimited athletes',
      'Custom integrations',
      'Dedicated compliance officer',
      'White-label options',
      'SLA guarantee',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    ctaHref: '/demo',
    ctaStyle: 'blue',
  },
];

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState('programs');
  const active = SOLUTIONS.find(s => s.id === activeSolution) || SOLUTIONS[1];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg-app)', paddingTop: '72px' }}>

        {/* Hero */}
        <section style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(11,29,58,0.9) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>Platform Solutions</span>
              <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '20px', lineHeight: 1.05 }}>
              One Platform.<br /><span style={{ color: 'var(--color-gold)' }}>Every Stakeholder.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.78, maxWidth: '540px', margin: '0 auto 36px' }}>
              NextPlay Nexus brings athletes, programs, and brands together in one compliance-first NIL ecosystem — purpose-built for the high school and college landscape.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/demo" style={{ display: 'inline-block', padding: '14px 36px', background: 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '7px', textDecoration: 'none' }}>
                Request Demo
              </Link>
              <Link href="/dashboard" style={{ display: 'inline-block', padding: '14px 36px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '7px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Solution tabs */}
        <section style={{ padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: '2.5rem' }}
            >
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Built For <span style={{ color: 'var(--color-gold)' }}>Everyone</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Select your role to see what NextPlay Nexus does for you
              </p>
            </motion.div>

            {/* Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {SOLUTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSolution(s.id)}
                  style={{
                    padding: '10px 28px',
                    borderRadius: '999px',
                    border: activeSolution === s.id ? `2px solid ${s.color}` : `1px solid ${s.color}44`,
                    background: activeSolution === s.id ? `${s.color}16` : 'transparent',
                    color: activeSolution === s.id ? s.color : 'var(--text-secondary)',
                    fontFamily: 'var(--font-sub)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  For {s.tag}
                </button>
              ))}
            </div>

            {/* Active solution detail */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card"
              style={{ padding: '40px', borderTop: `4px solid ${active.color}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}
            >
              <div>
                <div style={{ marginBottom: '20px' }}>{active.icon}</div>
                <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '999px', background: active.gradient, color: active.tagText, fontFamily: 'var(--font-sub)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  For {active.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 700, textTransform: 'uppercase', color: active.color, marginBottom: '8px', lineHeight: 1.1 }}>
                  {active.headline}
                </h3>
                <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
                  {active.subhead}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                  {active.body}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  Key Features
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {active.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '5px', background: `${active.color}18`, border: `1px solid ${active.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke={active.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{b}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: '28px' }}>
                  <Link href="/demo" style={{ display: 'inline-block', padding: '12px 28px', background: active.color, color: active.id === 'athletes' ? '#0B1D3A' : '#fff', fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', borderRadius: '7px', textDecoration: 'none' }}>
                    See It In Action
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platform Features grid */}
        <section style={{ padding: '4rem 1.5rem', background: 'rgba(11,29,58,0.4)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
                <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>Platform Features</span>
                <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>
                Everything You Need
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {PLATFORM_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  className="glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ padding: '28px 24px' }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{feat.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
                <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>Pricing</span>
                <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '12px', margin: 0 }}>
                Simple, Transparent <span style={{ color: 'var(--color-gold)' }}>Pricing</span>
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
              {PRICING_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: tier.color,
                    border: `1px solid ${tier.border}`,
                    borderRadius: '14px',
                    padding: '32px 28px',
                    position: 'relative',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  {tier.tag && (
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-gold)', color: '#0B1D3A', fontFamily: 'var(--font-sub)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 14px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                      {tier.tag}
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    {tier.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'var(--font-data)', fontSize: '2.4rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{tier.price}</span>
                    {tier.period && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{tier.period}</span>}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3.5 3.5L13 4" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--text-secondary)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.ctaHref}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '12px 24px',
                      borderRadius: '7px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      textDecoration: 'none',
                      transition: 'all 0.18s ease',
                      ...(tier.ctaStyle === 'gold'
                        ? { background: 'var(--color-gold)', color: '#0B1D3A' }
                        : tier.ctaStyle === 'blue'
                        ? { background: 'rgba(74,144,217,0.15)', color: '#4A90D9', border: '1px solid #4A90D944' }
                        : { background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.15)' }
                      ),
                    }}
                  >
                    {tier.cta}
                  </Link>
                </motion.div>
              ))}
            </div>

            <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '24px' }}>
              All plans include a 14-day free trial. No credit card required for Starter. Cancel anytime.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '5rem 1.5rem', textAlign: 'center', background: 'rgba(11,29,58,0.4)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(253,185,39,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.05 }}>
              Ready to Launch<br /><span style={{ color: 'var(--color-gold)' }}>Your NIL Program?</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '32px' }}>
              Join programs across Football, Basketball, Soccer, Flag Football, and ESports. Your athletes deserve the best start to their NIL journey.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/demo" style={{ display: 'inline-block', padding: '15px 40px', background: 'var(--color-gold)', color: '#0B1D3A', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', textDecoration: 'none' }}>
                Request a Demo
              </Link>
              <Link href="/dashboard" style={{ display: 'inline-block', padding: '15px 40px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(253,185,39,0.3)' }}>
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
