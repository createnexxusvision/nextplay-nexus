# NextPlay Nexus

> **When you hear NIL, think NextPlay Nexus.**

An AI Agent-first NIL (Name, Image, Likeness) Player Development Ecosystem — built at the intersection of **FinTech**, **EdTech**, and **SportsTech**.

**Started from zero. June 2025. Building in public.**

---

## What This Is

NextPlay Nexus is not a sports betting app, a prediction tool, or a fan league. It is:

- **An NIL marketplace** connecting student-athletes with brands and sponsors for legitimate, compliant deals
- **An AI Agent ecosystem** — specialized agents give athletes, coaches, ADs, and brands back their time and multiply income
- **An educational platform** where athletes earn tokens by completing financial literacy, contracts, IP, and negotiation curriculum
- **A blockchain + smart contract layer** bringing transparency and enforceability to NIL agreements
- **A regulatory technology play** — using AI to bring order to an unregulated early market

The NIL Pipeline we serve: `Student-Athletes → Coaches → Athletic Directors → Universities → Parents → Brands → Businesses → Fans`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 App Router, TypeScript, Tailwind CSS |
| Backend | Supabase (PostgreSQL + Auth + RLS), Edge Functions |
| AI / Agents | Claude API (Anthropic), MCP protocol, custom agent orchestration |
| Blockchain | Solidity smart contracts, Wagmi, Viem |
| Auth | Supabase Auth + Web3 wallet auth (SIWE) |
| Deployment | Vercel |

---

## AI Agent Architecture

The platform is **agent-first** — every user type has a dedicated AI agent before any interface is built.

```
Claude/Agents/
├── Engineering/        # AI Engineer, Backend Architect, Frontend Dev, DevOps
├── Product/            # Trend Research, Feedback Synthesizer, Sprint Prioritizer
├── Marketing/          # TikTok, Instagram, Twitter, Content, Growth
├── Design/             # UI Designer, UX Researcher, Brand Guardian
├── Project-Management/ # Experiment Tracker, Project Shipper, Studio Producer
├── Studio-Operations/  # Support, Analytics, Compliance, Finance, Infrastructure
└── Testing/            # API Tester, Performance Benchmarker, Workflow Optimizer
```

Each `.md` file in `/Claude/Agents/` is a battle-tested system prompt powering a real agent in the production stack.

---

## Project Structure

```
src/
├── app/
│   ├── api/            # Agent messaging, auth (Web3 + Supabase), events, email capture
│   ├── auth/           # Authentication flows
│   ├── dashboard/      # Athlete, brand, and coach dashboards
│   ├── demo/           # Live product demos
│   ├── intelligence/   # AI agent interaction layer
│   ├── onboarding/     # Multi-step onboarding for all user types
│   └── solutions/      # NIL solutions by segment
├── components/         # Reusable UI components
├── lib/
│   ├── mcp/            # Model Context Protocol server + agent registry
│   ├── supabase/       # Database client + server helpers
│   └── hooks/          # Custom React hooks
└── styles/             # Design tokens
```

---

## How I'm Building This

This entire platform is being built **using AI agents as co-developers** — not just for code generation, but as an orchestrated system:

- **Claude Code** as the primary coding agent
- **OpenClaw** (custom AI orchestrator) managing tasks and second-brain context
- **Specialized agent prompts** (in `/Claude/Agents/`) as persistent, domain-expert collaborators
- **MCP (Model Context Protocol)** for agent-to-agent communication inside the platform itself

This is a live example of how a solo founder + AI agent stack can build a product at startup velocity.

---

## Core Principles (Non-Negotiable)

- NIL = Name, Image, and Likeness — athletes own it, we help them monetize it **safely**
- Tokens are **earned through learning** — not gambling, not luck
- We **empower athletes** — we never exploit them
- Blockchain and smart contracts = **transparency and protection**, not speculation
- Every product decision asks: *"Does this give the athlete more power, protection, and income?"*

---

## Status

| Feature | Status |
|---|---|
| Marketplace landing page | In Progress |
| Athlete onboarding flow | In Progress |
| AI agent demo | Live |
| NIL deal dashboard | In Progress |
| Smart contract layer (ONCuLt) | [See ONCuLt repo](https://github.com/createnexxusvision/ONCuLT) |
| Token economy | Planned |
| Mobile app | Planned |

---

## Running Locally

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Fill in your Supabase URL, anon key, and other vars

# Start dev server
npm run dev
```

> All secrets stay in `.env.local` — never committed. See `.gitignore`.

---

## Related Repos

| Repo | Description |
|---|---|
| [ONCuLT](https://github.com/createnexxusvision/ONCuLT) | NIL smart contracts (Solidity, Foundry) |
| [NILPOC](https://github.com/createnexxusvision/NILPOC) | Proof-of-concept NIL marketplace |
| [openclaw](https://github.com/createnexxusvision/openclaw) | Custom AI orchestration engine |

---

## About the Builder

Building NextPlay Nexus from scratch — zero to product — starting June 2025. Learning AI, blockchain, FinTech, and full-stack development by building real things that matter. Using AI agents to move at a pace that previously required an entire team.

If you're a sports organization, university, brand, investor, or collaborator interested in the NIL space — reach out.

---

*Built with Claude Code + AI agents. Learning in public since June 2025.*
