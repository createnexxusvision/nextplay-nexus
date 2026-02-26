# NextPlay Nexus — Frontend Design System v2.0
## UI/UX + Motion + Animation Addendum

**Version:** 2.0
**Date:** February 26, 2026
**Status:** Design Direction Locked
**Addendum to:** NextPlay Nexus Complete Foundation v1.0
**Brand ID:** nextplay

---

## 1. DESIGN DIRECTION ADDENDUM

### Design Influences (Behance Reference Projects)

The following Behance projects establish the visual language, motion philosophy, and animation standards for the NextPlay Nexus platform:

| Project | Influence Area |
| --- | --- |
| behance.net/gallery/233396275 | Sports UI motion system — dynamic data visualization, stats in motion |
| behance.net/gallery/236902291 | Athlete-first card design — portrait framing, bold typography hierarchy |
| behance.net/gallery/238592659 | Dashboard energy — dark glass-morphism panels, neon accent interactions |
| behance.net/gallery/200749995 | Brand identity system — editorial grid, photo treatment, color grading |
| behance.net/gallery/219589137 | Micro-interaction library — hover states, scroll reveal, loading states |

### Design Mandate (Updated)

The platform must feel like ESPN meets Silicon Valley SaaS. Athletes should feel seen. Admins should feel in control. Parents should feel informed. Every sport has its own visual pulse — we honor that while maintaining brand cohesion.

---

## 2. NIL SPORTS COVERAGE — VISUAL IDENTITY SYSTEM

### Sports Represented

| Sport | Icon System | Visual Accent | Motion Personality |
| --- | --- | --- | --- |
| Football | Helmet silhouette / field yard lines | Electric Gold (#FDB927) | Explosive — fast cuts, impact frames |
| Women's Flag Football | Flag icon / dynamic diagonal | Champagne + Gold gradient | Fluid power — grace with explosiveness |
| Men's Basketball | Court top-down / arc lines | Midnight Navy + Gold | Vertical energy — rise, hang, fall |
| Women's Basketball | Same base, distinct color tag | Slate Blue + Emerald | Same arc physics, distinct palette |
| Women's Soccer | Circle + field arc lines | Emerald Accent (#1A7F5F) | Flowing — smooth arcs, continuous motion |
| ESports | Controller / HUD overlay motifs | Neon Electric (#00E5FF) | Digital pulse — scanlines, grid flash |

### Sport Color Tagging System

Each sport gets a unique color tag layered on top of the base brand palette. This tag appears on:
- Athlete profile cards
- Dashboard sport filters
- Module category badges
- Progress rings (outer ring matches sport tag)

```css
:root {
  /* Base brand */
  --color-primary: #0B1D3A;
  --color-gold: #FDB927;
  --color-slate: #506680;
  --color-emerald: #1A7F5F;
  --color-champagne: #F7F5EE;
  --color-graphite: #3E3E3E;

  /* Sport tags */
  --sport-football: #FDB927;            /* Electric Gold */
  --sport-flag-football: #E8C87A;       /* Champagne Gold */
  --sport-mens-basketball: #4A90D9;     /* Court Blue */
  --sport-womens-basketball: #7B68EE;   /* Court Violet */
  --sport-womens-soccer: #1A7F5F;       /* Emerald */
  --sport-esports: #00E5FF;             /* Neon Cyan */

  /* Sport gradients */
  --grad-football: linear-gradient(135deg, #FDB927 0%, #B8860B 100%);
  --grad-flag-football: linear-gradient(135deg, #E8C87A 0%, #FDB927 100%);
  --grad-mens-basketball: linear-gradient(135deg, #0B1D3A 0%, #4A90D9 100%);
  --grad-womens-basketball: linear-gradient(135deg, #7B68EE 0%, #C084FC 100%);
  --grad-womens-soccer: linear-gradient(135deg, #1A7F5F 0%, #34D399 100%);
  --grad-esports: linear-gradient(135deg, #001824 0%, #00E5FF 100%);
}
```

---

## 3. MOTION & ANIMATION SYSTEM

### Motion Philosophy

Inspired by broadcast sports television — every transition tells a story. Motion is purposeful, never gratuitous. Think: pre-game hype video pacing meets dashboard precision.

### Motion Tokens

```css
:root {
  /* Duration */
  --motion-instant: 80ms;
  --motion-fast: 150ms;
  --motion-base: 280ms;
  --motion-slow: 450ms;
  --motion-cinematic: 800ms;

  /* Easing */
  --ease-sport: cubic-bezier(0.25, 0.46, 0.45, 0.94);   /* Stadium entrance */
  --ease-impact: cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Impact bounce */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);           /* Fluid motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);        /* Data reveal */
  --ease-esports: cubic-bezier(0.77, 0, 0.175, 1);       /* Digital snap */
}
```

### Animation Categories

#### A. Page Load — "Pre-Game Entrance"

The page loads like a team entering the stadium:
1. Logo lockup drops in from top (cinematic, 800ms)
2. Navigation items stagger in left-to-right (150ms delay each)
3. Hero content sweeps up with blur-to-sharp (450ms, out-expo)
4. Sport category pills animate in with bounce (impact easing, 150ms stagger)
5. Stats counters animate up from zero (1200ms, out-expo)

```css
@keyframes stadiumEntrance {
  from {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes dataReveal {
  from {
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes scoreCount {
  from { --num: 0; }
  to { --num: var(--target-num); }
}

@keyframes neonPulse {
  0%, 100% { 
    box-shadow: 0 0 8px var(--sport-esports), 0 0 24px var(--sport-esports);
    opacity: 1;
  }
  50% { 
    box-shadow: 0 0 16px var(--sport-esports), 0 0 48px var(--sport-esports);
    opacity: 0.8;
  }
}

@keyframes slideReveal {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0% 0 0);
  }
}

@keyframes fieldLinesDraw {
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
}
```

#### B. Scroll-Triggered Reveals

Using Intersection Observer pattern for scroll animations:

```javascript
// Scroll animation classes
// .reveal-up     — translates from Y+60 to Y0
// .reveal-left   — translates from X-60 to X0
// .reveal-scale  — scales from 0.85 to 1.0
// .reveal-sport  — sport-specific color wipe
// All use stadiumEntrance timing with stagger based on data-delay attribute
```

#### C. Sport Card Hover States

Each sport card has a unique hover personality:

- **Football**: Diagonal slash wipe, field yard line overlay appears
- **Flag Football**: Smooth flag-wave ripple on the card edge
- **Men's Basketball**: Arc trajectories animate on hover, bounce physics
- **Women's Basketball**: Similar arc, different color graduation
- **Women's Soccer**: Circular rotation pulse from center
- **ESports**: Scanline sweep + HUD corner brackets materialize

#### D. Dashboard Micro-Interactions

- Progress rings: draw animation (SVG stroke-dashoffset from full to value)
- Stats numbers: count-up animation using CSS counter or JS
- Status badges: pulse glow in sport tag color when active
- Coach notes: typewriter reveal on expand
- Module completion: checkmark draws with 3-point arc animation
- Alert/notification: slide-in from right with color-coded left border

#### E. Data Visualization Motion

```javascript
// Chart animation sequences:
// 1. Bar charts — bars rise from baseline, staggered 80ms
// 2. Line charts — path draws from left to right, 600ms
// 3. Donut/ring charts — arc draws clockwise, 800ms
// 4. Stat cards — numbers count up, 1200ms ease-out
// 5. Heat maps — cells fade in by value intensity, 40ms stagger
```

#### F. ESports-Specific Animations

The ESports section gets a distinct digital treatment:

```css
@keyframes scanlineWipe {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}

@keyframes hudBracket {
  from { 
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    opacity: 0;
  }
  to { 
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
}

@keyframes digitalFlicker {
  0%, 90%, 100% { opacity: 1; }
  92% { opacity: 0.4; }
  96% { opacity: 0.8; }
}
```

---

## 4. COMPONENT SYSTEM UPDATES

### Sport Selector / Filter Tabs

Horizontal scrollable pill tabs with sport icons. Active state shows:
- Sport color fill with white text
- Underline indicator in sport color
- Transition: 280ms smooth ease

### Athlete Profile Card v2

```
┌─────────────────────────────────────┐
│ [Sport Tag Color Bar — top 4px]     │
│                                      │
│  [Athlete Photo]  [Name — Oswald]   │
│                   [Sport Badge]      │
│                   [School/Team]      │
│                   [NIL Score Ring]  │
│                                      │
│  [Progress Bar — sport color]        │
│  [Quick Stats — Roboto Mono]         │
└─────────────────────────────────────┘
```

Hover: Photo scales to 1.04, sport color overlay fades to 20% opacity, stats slide up.

### Sport Dashboard Panel

Each sport gets a full panel when filtered:
- Background: dark glass panel (primary color at 90% opacity + blur backdrop)
- Sport imagery: abstract field/court lines in SVG at 8% opacity
- Accent line: sport tag color, 2px, left border
- Stats displayed in Roboto Mono, sport tag color

### Module Category Badges

```
Football      → Gold pill, helmet icon
Flag Football → Gold-cream pill, flag icon
M. Basketball → Blue pill, basketball icon
W. Basketball → Violet pill, basketball icon
W. Soccer     → Emerald pill, ball icon
ESports       → Cyan pill with glow, controller icon
```

---

## 5. LAYOUT SYSTEM UPDATES

### Sport Overview Grid

```
Landing / Dashboard Sport Overview:
┌──────────┬──────────┬──────────┐
│ Football │ Flag FB  │ M. BBALL │
├──────────┼──────────┼──────────┤
│ W. BBALL │ W.Soccer │ ESports  │
└──────────┴──────────┴──────────┘
```

Mobile: 2-col grid, sports scroll horizontally as pill chips.

### Hero Section Pattern

```
Full-bleed hero with:
- Background: layered sport imagery (dark treated, 60% opacity)
- Sport silhouette SVG: right-aligned, 40% viewport width
- Text: left-aligned, max 50% width
- Diagonal clip on bottom edge at 6deg
- CTA buttons: primary Gold, secondary outlined in sport color
```

### NIL Stats Ticker (Public Pages)

Scrolling horizontal marquee showing anonymized NIL activity:
```
"Athlete secured deal · Football · $X,XXX value" → loops
```
Animation: CSS scroll marquee, pauses on hover.

---

## 6. TYPOGRAPHY UPDATES

No change to base font system. Updates to sport-specific usage:

| Context | Font | Treatment |
| --- | --- | --- |
| Sport hero headlines | Oswald | Bold, uppercase, tracked +0.02em |
| Player stats | Roboto Mono | Bold, sport tag color |
| ESports callouts | Oswald | Bold, neon glow text-shadow |
| NIL deal amounts | Roboto Mono | Bold, Emerald or Gold |
| Sport category labels | Poppins | Medium, uppercase, 0.08em tracked |

---

## 7. DARK MODE (SPORT DASHBOARD)

The authenticated dashboard defaults to a sport-mode dark theme:

```css
.dashboard-dark {
  --bg-primary: #080F1E;          /* Deeper than midnight navy */
  --bg-card: rgba(11, 29, 58, 0.8);
  --bg-glass: rgba(255, 255, 255, 0.05);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --text-primary: #F7F5EE;
  --text-secondary: #8FA3B8;
}
```

Glass card pattern:
```css
.glass-card {
  background: var(--bg-glass);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

---

## 8. RESPONSIVE BREAKPOINTS

```css
/* Mobile-first breakpoints */
--bp-sm: 480px;    /* Large phones */
--bp-md: 768px;    /* Tablets */
--bp-lg: 1024px;   /* Desktop */
--bp-xl: 1280px;   /* Wide desktop */
--bp-2xl: 1536px;  /* Ultra-wide */
```

Sport grid adapts:
- Mobile: 1 column, full sport card
- Tablet: 2 column
- Desktop: 3 column (2x3 grid)
- Wide: Optional featured sport hero at top, 2x3 below

---

## 9. ACCESSIBILITY UPDATES

Motion sensitivity:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

ESports neon: ensure 4.5:1 contrast — Cyan (#00E5FF) must be used on dark backgrounds only, never on white.

Sport icon + label pairs: always include both (not icon-only) for accessibility. Tooltip fallback for icon-only instances.

---

## 10. DOCUMENT CHANGE LOG

| Section | Change | Rationale |
| --- | --- | --- |
| Section 3: Frontend Design | Added sport coverage matrix (6 sports) | Platform expanded to cover all represented NIL sports |
| Section 3: Colors | Added sport tag color system | Visual differentiation per sport |
| NEW Section: Motion System | Full animation token + keyframe library | Behance design influence implementation |
| NEW Section: Sport Component System | Sport card, panel, badge specs | Sport-specific UI patterns |
| Section 3: Dashboard | Updated to dark glass-morphism | Matches Behance reference aesthetic |
| Section 3: Typography | Sport-specific typography treatments | Context-appropriate type usage |
