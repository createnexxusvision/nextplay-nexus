'use client';
// NextPlay Nexus — Demo Request Page

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PROGRAM_TYPES = [
  { id: 'high-school', label: 'High School Program', desc: '9th–12th grade athletic departments' },
  { id: 'college', label: 'College / JUCO', desc: 'Two-year and four-year institutions' },
  { id: 'university', label: 'University', desc: 'NCAA Division I, II, III programs' },
  { id: 'club', label: 'Club / AAU', desc: 'Independent travel and club programs' },
];

const SPORTS_LIST = [
  { id: 'football', label: 'Football', color: '#FDB927' },
  { id: 'flag', label: "Women's Flag FB", color: '#E8C87A' },
  { id: 'mens-bball', label: "Men's Basketball", color: '#4A90D9' },
  { id: 'womens-bball', label: "Women's Basketball", color: '#7B68EE' },
  { id: 'soccer', label: "Women's Soccer", color: '#1A7F5F' },
  { id: 'esports', label: 'ESports', color: '#00E5FF' },
];

const ATHLETE_RANGES = ['1–50', '51–150', '151–300', '300+'];

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  padding: '10px 14px',
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  color: 'var(--text-primary)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

export default function DemoPage() {
  const [programType, setProgramType] = useState('');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [athleteRange, setAthleteRange] = useState('');
  const [form, setForm] = useState({ name: '', title: '', email: '', phone: '', school: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = programType && selectedSports.length > 0 && athleteRange && form.name && form.email && form.school;

  function toggleSport(id: string) {
    setSelectedSports(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', maxWidth: '520px' }}
          >
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(26,127,95,0.15)', border: '2px solid #34D399', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M7 16l6 6 12-12" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.05 }}>
              Request <span style={{ color: 'var(--color-gold)' }}>Received!</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '32px' }}>
              Thanks for your interest in NextPlay Nexus. Our team will reach out within 24 hours to schedule your personalized demo.
            </p>
            <Link href="/" style={{ display: 'inline-block', padding: '14px 36px', background: 'var(--color-gold)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '7px', textDecoration: 'none' }}>
              Back to Home
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg-app)', paddingTop: '72px' }}>

        {/* Background accent */}
        <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11,29,58,0.8) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Header */}
        <section style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem 3rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>Request a Demo</span>
              <div style={{ width: '32px', height: '2px', background: 'var(--color-gold)', borderRadius: '2px' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.05 }}>
              See NextPlay Nexus<br /><span style={{ color: 'var(--color-gold)' }}>In Action</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto' }}>
              Get a personalized walkthrough tailored to your program type and sport roster. No commitments required.
            </p>
          </motion.div>
        </section>

        {/* Form */}
        <section style={{ position: 'relative', zIndex: 1, padding: '0 1.5rem 6rem' }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Step 1 */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-gold)', marginBottom: '20px' }}>
                01 — Program Type
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '12px' }}>
                {PROGRAM_TYPES.map(pt => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setProgramType(pt.id)}
                    style={{
                      padding: '16px 14px',
                      borderRadius: '8px',
                      border: programType === pt.id ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.1)',
                      background: programType === pt.id ? 'rgba(253,185,39,0.08)' : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-sub)', fontSize: '0.78rem', fontWeight: 700, color: programType === pt.id ? 'var(--color-gold)' : 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>{pt.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{pt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-gold)', marginBottom: '6px' }}>
                02 — Sports Offered
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '18px' }}>Select all that apply</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {SPORTS_LIST.map(sport => {
                  const active = selectedSports.includes(sport.id);
                  return (
                    <button
                      key={sport.id}
                      type="button"
                      onClick={() => toggleSport(sport.id)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '999px',
                        border: active ? `2px solid ${sport.color}` : `1px solid ${sport.color}55`,
                        background: active ? `${sport.color}18` : 'transparent',
                        color: active ? sport.color : 'var(--text-secondary)',
                        fontFamily: 'var(--font-sub)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {sport.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-gold)', marginBottom: '20px' }}>
                03 — Athlete Roster Size
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {ATHLETE_RANGES.map(range => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setAthleteRange(range)}
                    style={{
                      padding: '10px 28px',
                      borderRadius: '7px',
                      border: athleteRange === range ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.1)',
                      background: athleteRange === range ? 'rgba(253,185,39,0.08)' : 'rgba(255,255,255,0.03)',
                      color: athleteRange === range ? 'var(--color-gold)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-data)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {range} Athletes
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4 */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-gold)', marginBottom: '20px' }}>
                04 — Contact Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {([
                  { key: 'name', label: 'Full Name', placeholder: 'Coach / AD Name', type: 'text', required: true },
                  { key: 'title', label: 'Title / Role', placeholder: 'Athletic Director, Head Coach…', type: 'text', required: false },
                  { key: 'email', label: 'Work Email', placeholder: 'you@school.edu', type: 'email', required: true },
                  { key: 'phone', label: 'Phone (optional)', placeholder: '(555) 000-0000', type: 'tel', required: false },
                  { key: 'school', label: 'School / Program Name', placeholder: 'Organization name', type: 'text', required: true },
                ] as const).map(field => (
                  <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    <label style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {field.label}{field.required && <span style={{ color: 'var(--color-gold)', marginLeft: '3px' }}>*</span>}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(253,185,39,0.55)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <label style={{ fontFamily: 'var(--font-sub)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Additional Notes (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your program goals or any questions you have…"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(253,185,39,0.55)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <button
                type="submit"
                disabled={loading || !canSubmit}
                style={{
                  padding: '16px 56px',
                  background: canSubmit ? 'var(--color-gold)' : 'rgba(253,185,39,0.3)',
                  color: canSubmit ? 'var(--color-primary)' : 'rgba(11,29,58,0.5)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: loading || !canSubmit ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {loading ? 'Submitting…' : 'Request My Demo'}
              </button>
              {!canSubmit && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Complete all required fields to submit
                </p>
              )}
            </div>

          </motion.form>
        </section>

      </main>
      <Footer />
    </>
  );
}
