'use client';
// NextPlay Nexus — NIL IQ Ticker
//
// Previously showed hardcoded fake deal activity ($2,500 "Brand Partnership"
// etc.) as if it were real platform data on a public page -- replaced
// with real NIL education snippets instead. This is honest (no fabricated
// activity) and on-mission (surfaces free high-value NIL knowledge on the
// very first scroll, matching the curriculum's own purpose). Framed as
// general awareness, not legal advice -- consistent with the
// Legal & Compliance Checker's "flag, don't advise" stance elsewhere in
// this project. Swap in real anonymized activity via the `items` prop
// once there's real activity to show.

const DEFAULT_ITEMS = [
  { tag: 'KNOW YOUR RIGHTS', fact: 'Most NCAA and state rules require NIL deals to be disclosed to your school before signing.' },
  { tag: 'CORE GPA RULE', fact: 'Many states set a minimum GPA to stay NIL-eligible -- check your state and school policy.' },
  { tag: 'CLEARINGHOUSE ID', fact: 'College-bound athletes typically need to register with the NCAA Eligibility Center before their first deal.' },
  { tag: 'EXCLUSIVITY CLAUSES', fact: 'An exclusivity clause can block you from other brand deals in that category -- always read before you sign.' },
  { tag: 'FINANCIAL LITERACY', fact: 'NIL income is taxable. Understanding gross vs. net before you spend it is the first lesson, not an afterthought.' },
  { tag: 'BRAND STORYTELLING', fact: 'Your story is the asset -- brands pay for authentic connection with an audience, not just a highlight reel.' },
];

export default function NILTicker({ items = DEFAULT_ITEMS }: { items?: typeof DEFAULT_ITEMS }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="nil-ticker"
      style={{ background: 'rgba(11,29,58,0.7)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '8px 0' }}
    >
      <div className="nil-ticker-inner" style={{ display: 'flex', gap: '32px', paddingLeft: '32px' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-gold)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.65rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{item.tag}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{item.fact}</span>
            <span style={{ color: 'var(--border-subtle)', marginInline: '8px' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
