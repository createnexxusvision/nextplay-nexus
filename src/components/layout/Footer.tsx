'use client';
// NextPlay Nexus — Footer

import Link from 'next/link';

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

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['About Us', 'Careers', 'Press', 'Contact'].map(item => (
                <li key={item}>
                  <Link href="/demo" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >{item}</Link>
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
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'NIL Compliance'].map(item => (
              <Link key={item} href="/demo" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', textDecoration: 'none' }}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
