'use client';
// NextPlay Nexus — Footer v2.0

import Link from 'next/link';
import { motion } from 'framer-motion';

const SPORT_LINKS = [
  'Football', "Women's Flag Football", "Men's Basketball",
  "Women's Basketball", "Women's Soccer", 'ESports',
];

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(8, 15, 30, 0.98)', borderTop: '1px solid var(--border-subtle)', padding: '4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: 32, height: 32, background: 'var(--color-gold)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)', flexShrink: 0 }}>N²</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                NextPlay <span style={{ color: 'var(--color-gold)' }}>Nexus</span>
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '240px' }}>
              The player-centered NIL + athlete development platform for high school and college programs.
            </p>
          </div>

          {/* Sports */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>Sports</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SPORT_LINKS.map(s => (
                <li key={s}>
                  <Link href="#sports" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['NIL Literacy', 'Athlete Development', 'Parent Education', 'Program Admin', 'Brand Marketplace'].map(item => (
                <li key={item}>
                  <Link href="#features" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Intelligence */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'About Us', href: '/demo' },
                { label: 'Careers', href: '/demo' },
                { label: 'Intelligence', href: '/intelligence' },
                { label: 'Solutions', href: '/solutions' },
                { label: 'Contact', href: '/demo' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            &copy; 2026 NextPlay Nexus. All rights reserved.
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {[
              { label: 'X / Twitter', href: 'https://x.com/nextplaynexus', icon: 'M4 4l7 7-7 7M17 4l-7 7 7 7' },
              { label: 'LinkedIn', href: 'https://linkedin.com/company/nextplaynexus', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
              { label: 'Instagram', href: 'https://instagram.com/nextplaynexus', icon: 'M12 2a10 10 0 0 0 0 20A10 10 0 0 0 12 2zm0 4a6 6 0 0 1 0 12A6 6 0 0 1 12 6zm5.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z' },
            ].map(social => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(253,185,39,0.08)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(253,185,39,0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.icon} />
                </svg>
              </motion.a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'NIL Compliance'].map(item => (
              <Link key={item} href="/demo" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
