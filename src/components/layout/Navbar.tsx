'use client';
// NextPlay Nexus — Public Navbar

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Sports', href: '#sports' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'For Programs', href: '#programs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: scrolled
          ? 'rgba(8, 15, 30, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36,
            height: 36,
            background: 'var(--color-gold)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--color-primary)',
            flexShrink: 0,
          }}>N²</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            NextPlay <span style={{ color: 'var(--color-gold)' }}>Nexus</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sub)',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <Link
            href="/dashboard"
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
            className="hidden-mobile"
          >
            Sign In
          </Link>
          <Link
            href="/demo"
            style={{
              display: 'inline-block',
              padding: '9px 20px',
              background: 'var(--color-gold)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(253,185,39,0.35)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Get Demo
          </Link>

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-primary)' }}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              background: 'rgba(8, 15, 30, 0.97)',
              borderBottom: '1px solid var(--border-subtle)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                >
                  {link.label}
                </a>
              ))}
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{ fontFamily: 'var(--font-sub)', fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>Sign In</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
