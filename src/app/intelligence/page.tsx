'use client';
// NextPlay Nexus — Venture Reality Checker
// Competitive intelligence dashboard: 3-venture portfolio + NIL Blueprint

import { useState, useEffect, useRef, useCallback } from 'react';

// ── Research Data (sourced from live market research Feb 2026) ──────────────

type CompetitorType = 'Direct' | 'Emerging' | 'Academic' | 'Partial' | 'Infra' | 'Adjacent' | 'Direct Concept' | 'Infra Layer' | '—';

interface Competitor {
  name: string;
  type: CompetitorType;
  stars: string;
  desc: string;
  url: string;
  threat: number;
}

interface UCData {
  name: string;
  competitors: Competitor[];
}

interface Venture {
  name: string;
  tagline: string;
  icon: string;
  color: string;
  gradient: string;
  useCases: string[];
  market: string;
  techStack: string;
}

const COMPETITORS: Record<string, UCData> = {
  UC1: {
    name: 'NIL Deal Negotiation & Compliance Agent',
    competitors: [
      { name: 'MOGL', type: 'Direct', stars: '30K+ deals', desc: 'AI agent for NIL campaign planning, contract gen. 20K athlete network. Dentsu, Toyota partners.', url: 'mogl.online', threat: 92 },
      { name: 'Opendorse', type: 'Direct', stars: 'Enterprise', desc: 'Major NIL marketplace, strong Power Five presence. Acquired by TeamWorks ecosystem.', url: 'opendorse.com', threat: 88 },
      { name: 'NIL Club', type: 'Direct', stars: '650K athletes', desc: 'Largest athlete network. Cash App, Amazon, Subway deals. Team-based earning model.', url: 'nilclub.com', threat: 85 },
      { name: 'INFLCR', type: 'Direct', stars: 'Enterprise', desc: 'NIL compliance & disclosure platform used by SEC schools. Acquired by Teamworks.', url: 'inflcr.com', threat: 80 },
      { name: 'Datavault AI + SI', type: 'Emerging', stars: 'NASDAQ:DVLT', desc: 'Sports Illustrated partnership for NIL digital asset exchange. H2 2026 target launch.', url: 'dvlt.ai', threat: 65 },
      { name: 'VALORE (Research)', type: 'Academic', stars: 'Paper', desc: 'Multi-agent system for NIL valuation using 7 specialized AI agents. Behavioral science integration.', url: 'medium.com', threat: 35 },
    ],
  },
  UC5: {
    name: 'Transfer Portal Intelligence Agent',
    competitors: [
      { name: 'Teamworks Recruiting', type: 'Direct', stars: 'Enterprise', desc: 'Best-in-class compliance-integrated recruiting. NCAA forms, roster mgmt, coach CRM.', url: 'teamworks.com', threat: 90 },
      { name: 'Front Rush', type: 'Direct', stars: '#1 Coaches', desc: 'Most-used recruiting software by coaches. NAIA, D2, D3 dominant. Compliance workflow automation.', url: 'frontrush.com', threat: 82 },
      { name: 'Student Athlete Score', type: 'Partial', stars: 'Growing', desc: 'AI scouting for portal athletes. NIL brand value + social presence analytics for programs.', url: 'studentathletescore.com', threat: 70 },
      { name: 'ARI Athletics', type: 'Direct', stars: 'Multi-sport', desc: 'Advanced Recruiting Intelligence. Profile management, scouting tools, admissions integration.', url: 'ariathletics.com', threat: 68 },
      { name: 'Scorability', type: 'Partial', stars: 'AI Match', desc: 'AI-verified measurables + mentality data. Coach matching and success prediction.', url: 'scorability.com', threat: 55 },
      { name: 'AthleteRecruitPortal', type: 'Partial', stars: 'Free tier', desc: 'AI matching across 2,200 schools/16K programs. Free athlete profiles.', url: 'athleterecruitportal.com', threat: 45 },
    ],
  },
  UC6: {
    name: 'Brand-Athlete Matchmaking Marketplace',
    competitors: [
      { name: 'MOGL', type: 'Direct', stars: 'AI Match', desc: 'AI-powered brand-athlete matching. 101M impressions single campaign. 15% engagement rates.', url: 'mogl.online', threat: 90 },
      { name: 'Opendorse/Teamworks', type: 'Direct', stars: 'Ecosystem', desc: 'Full marketplace + compliance stack. Power Five dominant. Enterprise integrations.', url: 'opendorse.com', threat: 88 },
      { name: 'NIL Club', type: 'Direct', stars: '650K users', desc: 'Massive two-sided marketplace. Cost-per-action, affiliate, fan subscriptions. Fortune 500 brands.', url: 'nilclub.com', threat: 87 },
      { name: 'PlayBooked', type: 'Direct', stars: 'Marketplace', desc: 'NIL opportunities marketplace. Growing platform for brand-athlete connections.', url: 'playbooked.com', threat: 55 },
      { name: 'Launchpoint', type: 'Direct', stars: 'Growing', desc: 'User-friendly NIL profile builder and deal discovery. Fewer verified brand partnerships.', url: 'launchpoint.com', threat: 45 },
    ],
  },
  UC10: {
    name: 'Athlete Data Vault & Monetization',
    competitors: [
      { name: 'Datavault AI', type: 'Direct Concept', stars: 'NASDAQ:DVLT', desc: 'Patented Data Vault + DataScore + DataValue AI agents. SI partnership. RWA tokenization focus.', url: 'dvlt.ai', threat: 72 },
      { name: 'Vault-0 (x402)', type: 'Infra', stars: 'Open Source', desc: 'Encrypted secret vault + agent monitor + x402 wallet. Policy-gated auto-settlement.', url: 'github.com', threat: 40 },
      { name: 'Numbers Protocol', type: 'Adjacent', stars: 'x402 Native', desc: 'x402 search→pay→license flows for verified digital assets. On-chain rights via Receipt NFTs.', url: 'numbersprotocol.io', threat: 35 },
      { name: 'No Direct Competitor', type: '—', stars: '—', desc: 'No production platform combines athlete-owned data vaults + x402 micropayment paywalls + tiered pricing.', url: '—', threat: 0 },
    ],
  },
  UC14: {
    name: 'Agent-to-Agent NIL Marketplace (Bazaar)',
    competitors: [
      { name: 'x402 Ecosystem', type: 'Infra Layer', stars: '$832M mcap', desc: '44 tokens, 10.5M+ txns. Coinbase/Cloudflare backed. Google, Visa, AWS integrating.', url: 'x402.org', threat: 30 },
      { name: 'Fluora MCP', type: 'Adjacent', stars: 'Early', desc: 'MonetizedMCP marketplace for AI agents to find and purchase services via x402.', url: 'fluora.ai', threat: 40 },
      { name: 'Scout MCP', type: 'Adjacent', stars: 'x402 Native', desc: '10-tool MCP server with x402 Bazaar search. $0.001-$0.25 USDC on Base.', url: 'github.com', threat: 35 },
      { name: 'No NIL-Specific Bazaar', type: '—', stars: '—', desc: 'No production agent-to-agent marketplace exists specifically for NIL/college athletics vertical.', url: '—', threat: 0 },
    ],
  },
};

const VENTURES: Record<string, Venture> = {
  nextplay: {
    name: 'NextPlay Nexus',
    tagline: 'NIL Agentic Platform',
    icon: '🏟️',
    color: '#FDB927',
    gradient: 'linear-gradient(135deg, #FDB927 0%, #B8860B 100%)',
    useCases: ['UC1', 'UC5', 'UC6', 'UC10', 'UC14'],
    market: '$2.55B NIL market (2026 projected)',
    techStack: 'Next.js 16 • Supabase • Claude API • x402 • Blockchain Smart Contracts',
  },
  stillspoke: {
    name: 'StillSpoke Wellness',
    tagline: 'Yoga & Sound Healing',
    icon: '🧘',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
    useCases: [],
    market: '$21.6B US yoga market (2025)',
    techStack: 'Booking • Content • Community Platform',
  },
  funKollective: {
    name: 'Thee FUN Kollective',
    tagline: 'Adult Events & Entertainment',
    icon: '🎉',
    color: '#FF2D87',
    gradient: 'linear-gradient(135deg, #FF2D87 0%, #F59E0B 100%)',
    useCases: [],
    market: '$3.2B US nightlife & events (2025)',
    techStack: 'Events • Ticketing • Social Platform',
  },
};

// ── Scoring Engine ──────────────────────────────────────────────────────────

interface SignalResult {
  signal: number;
  likelihood: string;
  count: number;
  directCount: number;
  maxThreat: number;
  avgThreat: number;
}

function calculateRealitySignal(ucId: string): SignalResult {
  const data = COMPETITORS[ucId];
  if (!data) return { signal: 0, likelihood: 'none', count: 0, directCount: 0, maxThreat: 0, avgThreat: 0 };
  const threats = data.competitors.filter(c => c.threat > 0);
  const count = threats.length;
  const avgThreat = threats.reduce((a, c) => a + c.threat, 0) / Math.max(count, 1);
  const maxThreat = Math.max(...threats.map(c => c.threat), 0);
  const directCount = threats.filter(c => c.type === 'Direct').length;
  const enterpriseCount = threats.filter(c => c.stars === 'Enterprise' || c.threat > 80).length;
  const densityScore = Math.min((count / 8) * 100, 100);
  const signal = Math.round(densityScore * 0.30 + avgThreat * 0.25 + maxThreat * 0.20 + Math.min((directCount / 4) * 100, 100) * 0.15 + Math.min((enterpriseCount / 3) * 100, 100) * 0.10);
  let likelihood = 'none';
  if (signal >= 80) likelihood = 'very_high';
  else if (signal >= 60) likelihood = 'high';
  else if (signal >= 40) likelihood = 'moderate';
  else if (signal >= 20) likelihood = 'low';
  return { signal: Math.min(signal, 100), likelihood, count, directCount, maxThreat, avgThreat: Math.round(avgThreat) };
}

function generatePivotHints(ucId: string, signal: number): string[] {
  const hints: Record<string, string[]> = {
    UC1: signal >= 70 ? [
      'MOGL and Opendorse dominate brand-athlete matching. Your 12-factor FMV compliance engine is your moat — no competitor does deterministic House settlement scoring.',
      'Avoid head-to-head marketplace competition. Position as the compliance-first AI layer that existing platforms integrate with via API.',
      'The multi-agent swarm architecture (Triage→Sourcer→Negotiator→Compliance→Payment) is architecturally unique. No competitor chains agents this way.',
    ] : ['Market is competitive but your agentic architecture is differentiated.', 'FMV compliance automation is an underserved niche.'],
    UC5: signal >= 70 ? [
      'Teamworks/Front Rush own traditional recruiting CRM. Your CTV (Composite Transfer Value) scoring is genuinely novel — nobody combines Athletic + NIL + Academic + Program Fit into a single 0–100 metric.',
      'The x402-paywalled intelligence data creates a defensible revenue model competitors cannot easily replicate without blockchain infrastructure.',
      'Push mode (proactive alerts when matching athletes enter portal) is a killer feature. Most platforms are pull-only search tools.',
    ] : ['Portal intelligence market is growing rapidly with opportunity for AI-first entrants.'],
    UC6: signal >= 70 ? [
      'Marketplace competition is intense — MOGL, Opendorse, and NIL Club have massive network effects. Don\'t build another marketplace.',
      'Instead: your 4-phase matching pipeline (Embedding→Filter→Score→Agent Ranking) with semantic search is technically superior to keyword matching.',
      'Stripe ACP integration for autonomous agent commerce is bleeding-edge. No NIL competitor has agent-to-agent payment rails.',
    ] : [],
    UC10: signal >= 40 ? [
      '🔥 FIRST-MOVER OPPORTUNITY. Datavault AI is the closest competitor but is pre-launch (H2 2026 target) and focused on tokenization, not micropayment paywalls.',
      'The x402 per-query pricing model ($0.05–$1.00) for athlete data is completely novel in the NIL space. This is your strongest competitive advantage.',
      'Athlete-controlled pricing dashboard + passive revenue from data queries has no existing parallel. This should be prioritized in your build sequence.',
    ] : ['Wide open market. Prioritize this use case for maximum competitive advantage.'],
    UC14: signal >= 20 ? [
      '🔥🔥 BLUE OCEAN. No agent-to-agent marketplace exists for NIL/college athletics. The broader x402 ecosystem validates the infrastructure but nobody has verticalized it.',
      'Agent manifest + capability registry + trust scoring is architecturally ahead of anything in the NIL space by 12–18 months.',
      'Revenue model (x402 fees on every agent-to-agent transaction) creates compounding network effects as more agents register.',
      'Risk: this is the most technically complex UC. Consider launching after UC10 proves the x402 payment rails work.',
    ] : [],
  };
  return hints[ucId] || [];
}

// ── Hooks ───────────────────────────────────────────────────────────────────

function useAnimatedCounter(target: number, duration = 1200, delay = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    const startTime = performance.now() + delay;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) { requestAnimationFrame(animate); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, delay, started]);
  return [count, start] as const;
}

// ── Components ──────────────────────────────────────────────────────────────

function SignalRing({ value, size = 140, label, delay = 0 }: { value: number; size?: number; label?: string; delay?: number }) {
  const [animatedValue, startAnimation] = useAnimatedCounter(value, 1400, delay);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); startAnimation(); } }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startAnimation]);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * animatedValue / 100);
  const signalColor = value >= 70 ? '#EF4444' : value >= 45 ? '#F59E0B' : '#22C55E';
  const bgColor = value >= 70 ? 'rgba(239,68,68,0.08)' : value >= 45 ? 'rgba(245,158,11,0.08)' : 'rgba(34,197,94,0.08)';
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill={bgColor} stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={signalColor} strokeWidth={6}
            strokeDasharray={circumference} strokeDashoffset={visible ? dashOffset : circumference}
            strokeLinecap="round" style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: size * 0.32, color: signalColor, letterSpacing: '0.02em', lineHeight: 1 }}>{animatedValue}</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 2 }}>/ 100</span>
        </div>
      </div>
      {label && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', maxWidth: size + 20 }}>{label}</span>}
    </div>
  );
}

function ThreatBar({ value }: { value: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const barColor = value >= 80 ? '#EF4444' : value >= 60 ? '#F59E0B' : value >= 40 ? '#3B82F6' : '#22C55E';
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: visible ? `${value}%` : '0%', height: '100%', background: barColor, borderRadius: 3, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>
      <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 14, color: barColor, minWidth: 28, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function LikelihoodBadge({ likelihood }: { likelihood: string }) {
  const config: Record<string, { label: string; color: string; bg: string }> = {
    very_high: { label: 'VERY HIGH', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
    high: { label: 'HIGH', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
    moderate: { label: 'MODERATE', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    low: { label: 'LOW', color: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
    none: { label: 'NONE', color: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
  };
  const c = config[likelihood] || config.moderate;
  return (
    <span style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 4, background: c.bg, border: `1px solid ${c.color}33`, fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 12, color: c.color, letterSpacing: '0.12em' }}>
      {c.label} DUPLICATE RISK
    </span>
  );
}

function CompetitorCard({ comp, index }: { comp: Competitor; index: number }) {
  const [hovered, setHovered] = useState(false);
  const typeColor = comp.type === 'Direct' ? '#EF4444' : comp.type === 'Emerging' ? '#F59E0B' : '#3B82F6';
  const typeBg = comp.type === 'Direct' ? 'rgba(239,68,68,0.15)' : comp.type === 'Emerging' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)';
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '14px 16px', transition: 'all 0.25s ease', transform: hovered ? 'translateY(-2px)' : 'none', opacity: 0, animation: `fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms forwards` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#E8E8F0' }}>{comp.name}</span>
            <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: typeBg, color: typeColor, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{comp.type}</span>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{comp.stars} • {comp.url}</div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: '8px 0' }}>{comp.desc}</p>
      <ThreatBar value={comp.threat} />
    </div>
  );
}

function UseCasePanel({ ucId, onClose }: { ucId: string; onClose: () => void }) {
  const data = COMPETITORS[ucId];
  const result = calculateRealitySignal(ucId);
  const hints = generatePivotHints(ucId, result.signal);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.3s ease' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: 'min(680px, 92vw)', maxHeight: '88vh', overflow: 'auto', background: 'linear-gradient(180deg, #111118 0%, #0A0A0F 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '32px 28px', animation: 'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>{ucId}</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#E8E8F0', margin: 0, lineHeight: 1.2 }}>{data.name}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#E8E8F0', fontSize: 18, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
          <SignalRing value={result.signal} size={120} label="Reality Signal" />
          <div style={{ flex: 1, minWidth: 200 }}>
            <LikelihoodBadge likelihood={result.likelihood} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', marginTop: 16 }}>
              {([['Competitors Found', result.count], ['Direct Threats', result.directCount], ['Max Threat Level', result.maxThreat], ['Avg Threat Level', result.avgThreat]] as [string, number][]).map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                  <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 24, color: '#E8E8F0', marginTop: 2 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {hints.length > 0 && (
          <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '16px 18px', marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>⚡ CEO Strategic Pivot Hints</div>
            {hints.map((hint, i) => (
              <p key={i} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: i < hints.length - 1 ? '0 0 10px 0' : 0 }}>{hint}</p>
            ))}
          </div>
        )}
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Competitive Evidence ({data.competitors.length})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.competitors.map((comp, i) => <CompetitorCard key={comp.name} comp={comp} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function VentureCard({ ventureKey, onSelectUC }: { ventureKey: string; onSelectUC: (uc: string) => void }) {
  const v = VENTURES[ventureKey];
  const [hovered, setHovered] = useState(false);
  const ucScores = v.useCases.map(uc => ({ uc, ...calculateRealitySignal(uc), name: COMPETITORS[uc]?.name || uc }));
  const avgSignal = ucScores.length > 0 ? Math.round(ucScores.reduce((a, s) => a + s.signal, 0) / ucScores.length) : null;
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${hovered ? v.color + '44' : 'rgba(255,255,255,0.06)'}`, borderRadius: 14, padding: '24px 22px', transition: 'all 0.3s ease', transform: hovered ? 'translateY(-3px)' : 'none', boxShadow: hovered ? `0 12px 40px ${v.color}15` : 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{v.icon}</span>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#E8E8F0', margin: 0 }}>{v.name}</h3>
            <div style={{ fontSize: 11, color: v.color, fontWeight: 600, letterSpacing: '0.05em' }}>{v.tagline}</div>
          </div>
        </div>
        {avgSignal !== null && <SignalRing value={avgSignal} size={80} label="AVG" delay={200} />}
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 10.5, padding: '4px 10px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>📊 {v.market}</span>
      </div>
      <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>{v.techStack}</div>
      {ucScores.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ucScores.map(({ uc, signal, likelihood, name }) => {
            const signalColor = signal >= 70 ? '#EF4444' : signal >= 45 ? '#F59E0B' : '#22C55E';
            return (
              <button key={uc} onClick={() => onSelectUC(uc)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', width: '100%', transition: 'all 0.2s ease', color: 'inherit' }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = v.color + '33'; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 11, color: v.color, letterSpacing: '0.08em', minWidth: 36 }}>{uc}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', textAlign: 'left' }}>{name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LikelihoodBadge likelihood={likelihood} />
                  <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 20, color: signalColor }}>{signal}</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>🔒 Separate venture — no NIL blueprint overlap</div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Business firewall maintained per CEO policy</div>
        </div>
      )}
    </div>
  );
}

function SummaryMatrix({ onSelectUC }: { onSelectUC: (uc: string) => void }) {
  const allUCs = Object.entries(COMPETITORS).map(([id, data]) => ({ id, name: data.name, ...calculateRealitySignal(id) })).sort((a, b) => a.signal - b.signal);
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '24px 22px', marginBottom: 32 }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#E8E8F0', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 20px 0' }}>Blueprint Opportunity Matrix — Build Priority</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {allUCs.map((uc, i) => {
          const barColor = uc.signal >= 70 ? '#EF4444' : uc.signal >= 45 ? '#F59E0B' : '#22C55E';
          const priorityLabel = uc.signal < 35 ? '🔥 BUILD FIRST' : uc.signal < 55 ? '⚡ STRONG POSITION' : uc.signal < 75 ? '⚠️ DIFFERENTIATE' : '🛡️ MOAT REQUIRED';
          const priorityColor = uc.signal < 35 ? '#22C55E' : uc.signal < 55 ? '#3B82F6' : uc.signal < 75 ? '#F59E0B' : '#EF4444';
          return (
            <button key={uc.id} onClick={() => onSelectUC(uc.id)} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: 0, animation: `fadeInUp 0.5s ease ${i * 120}ms forwards`, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, width: '100%', textAlign: 'left' }}>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)', minWidth: 36, letterSpacing: '0.08em' }}>{uc.id}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{uc.name}</span>
                  <span style={{ fontSize: 10, color: priorityColor, fontWeight: 700, letterSpacing: '0.05em' }}>{priorityLabel}</span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${uc.signal}%`, height: '100%', background: `linear-gradient(90deg, ${barColor}88, ${barColor})`, borderRadius: 4, transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)' }} />
                </div>
              </div>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 22, color: barColor, minWidth: 36, textAlign: 'right' }}>{uc.signal}</span>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', letterSpacing: '0.08em', marginBottom: 8 }}>📋 RECOMMENDED BUILD ORDER (lowest competition → highest)</div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
          {allUCs.map((uc, i) => (
            <span key={uc.id}>
              <strong style={{ color: '#E8E8F0' }}>{i + 1}.</strong>{' '}
              <span style={{ color: i === 0 ? '#22C55E' : 'rgba(255,255,255,0.6)' }}>{uc.id}: {uc.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}> ({uc.signal}/100)</span>
              {i < allUCs.length - 1 && <span style={{ color: 'rgba(255,255,255,0.15)' }}> → </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────

export default function IntelligencePage() {
  const [selectedUC, setSelectedUC] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', color: '#E8E8F0', fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        * { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
        *::-webkit-scrollbar { width: 6px; } *::-webkit-scrollbar-track { background: transparent; } *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        button { font-family: inherit; }
      `}</style>

      {/* Header */}
      <header style={{ padding: '24px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-10px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ display: 'flex', height: 3, borderRadius: 2, overflow: 'hidden', marginBottom: 18, gap: 2 }}>
          {['#FDB927', '#FF2D87', '#4A90D9', '#8B5CF6', '#10B981', '#00E5FF'].map(c => <div key={c} style={{ flex: 1, background: c }} />)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>NextPlay Nexus • Venture Intelligence</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#E8E8F0', margin: 0, lineHeight: 1.1 }}>Reality Checker</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '6px 0 0 0', maxWidth: 500 }}>
              Competitive landscape for the 3-venture portfolio. Each use case scored 0–100 against live market data — February 2026.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Checked</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Feb 28, 2026</div>
            </div>
            <a href="/" style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #FDB927, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0B1D3A', letterSpacing: '0.05em', textDecoration: 'none' }}>N²</a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '28px', maxWidth: 1140, margin: '0 auto' }}>
        {/* Legend */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          {[{ range: '0–35', label: 'Blue Ocean', color: '#22C55E' }, { range: '36–55', label: 'Differentiated', color: '#3B82F6' }, { range: '56–74', label: 'Competitive', color: '#F59E0B' }, { range: '75–100', label: 'Saturated', color: '#EF4444' }].map(l => (
            <div key={l.range} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)' }}>{l.range}: {l.label}</span>
            </div>
          ))}
        </div>

        <SummaryMatrix onSelectUC={setSelectedUC} />

        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          Venture Breakdown — Tap any use case for full competitive intelligence
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16, marginBottom: 40 }}>
          {Object.keys(VENTURES).map(key => <VentureCard key={key} ventureKey={key} onSelectUC={setSelectedUC} />)}
        </div>

        {/* Methodology */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '18px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Scoring Methodology</div>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            <strong style={{ color: 'rgba(255,255,255,0.55)' }}>Reality Signal (0–100)</strong> = Competitor Density (30%) + Avg Threat (25%) + Max Threat (20%) + Direct Competitor Count (15%) + Enterprise Presence (10%). Threat levels assessed on: market traction, funding/revenue, feature overlap with the Nexus blueprint, and ability to replicate the specific use case. Data sourced from live research on MOGL, Opendorse, NIL Club, Teamworks, Datavault AI, x402 ecosystem, Student Athlete Score, Front Rush, and 15+ additional platforms — February 2026. StillSpoke and FUN Kollective are scored independently per business separation firewall policy.
          </div>
        </div>
      </main>

      {selectedUC && <UseCasePanel ucId={selectedUC} onClose={() => setSelectedUC(null)} />}
    </div>
  );
}
