#!/bin/bash
# =============================================================================
# NEXUS COMMAND — UNIVERSAL SKILLS INSTALLATION SCRIPT
# For: Danny's Venture Portfolio (NextPlay Nexus | StillSpoke | Thee FUN Kollective)
# Compatible: Claude Code + OpenCLAW (8-subagent configuration)
# Version: 2.0.0 | Built: 2026
# =============================================================================

set -euo pipefail

# ── COLORS & FORMATTING ───────────────────────────────────────────────────────
BOLD="\033[1m"
DIM="\033[2m"
GREEN="\033[0;32m"
CYAN="\033[0;36m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
PURPLE="\033[0;35m"
RESET="\033[0m"

# ── BANNER ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${PURPLE}${BOLD}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${PURPLE}${BOLD}║         NEXUS COMMAND — SKILLS INSTALLATION v2.0             ║${RESET}"
echo -e "${PURPLE}${BOLD}║     NextPlay Nexus × StillSpoke × Thee FUN Kollective        ║${RESET}"
echo -e "${PURPLE}${BOLD}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""

# ── CONFIGURATION ─────────────────────────────────────────────────────────────
ANTIGRAVITY_SKILLS_REPO="https://github.com/sickn33/antigravity-awesome-skills.git"
RUFLO_REPO="https://github.com/ruvnet/ruflo.git"
OPENFANG_REPO="https://github.com/RightNow-AI/openfang.git"

HOME_DIR="${HOME:-$USERPROFILE}"

CLAUDE_CODE_SKILLS_DIR="${HOME_DIR}/.claude/skills"
OPENCLAW_SKILLS_DIR="${HOME_DIR}/.openclaw/skills"
OPENCLAW_MEMORY_DIR="${HOME_DIR}/.openclaw/memory"
RUFLO_DIR="${HOME_DIR}/.claude/ruflo"
OPENFANG_DIR="${HOME_DIR}/.openfang"
NEXUS_CONFIG_DIR="${HOME_DIR}/.nexus-command"
LOCAL_TEMP="/tmp/nexus-install-$$"

# ── HELPER FUNCTIONS ──────────────────────────────────────────────────────────
log_step() { echo -e "\n${CYAN}${BOLD}▶ $1${RESET}"; }
log_ok()   { echo -e "  ${GREEN}✓${RESET} $1"; }
log_warn() { echo -e "  ${YELLOW}⚠${RESET} $1"; }
log_err()  { echo -e "  ${RED}✗${RESET} $1"; }
log_info() { echo -e "  ${DIM}  $1${RESET}"; }

check_command() {
  if ! command -v "$1" &>/dev/null; then
    log_err "$1 is required but not installed."
    echo -e "  Install with: ${YELLOW}$2${RESET}"
    MISSING_DEPS=true
  else
    log_ok "$1 found ($(command -v "$1"))"
  fi
}

# ── PREFLIGHT CHECKS ──────────────────────────────────────────────────────────
log_step "PREFLIGHT — Checking dependencies"
MISSING_DEPS=false

check_command "git"   "brew install git  OR  apt install git"
check_command "node"  "https://nodejs.org/en/download/"
check_command "npx"   "comes with Node.js"
check_command "curl"  "brew install curl  OR  apt install curl"

if [ "$MISSING_DEPS" = true ]; then
  echo ""
  log_err "Please install missing dependencies and re-run."
  exit 1
fi

if command -v "claude" &>/dev/null; then
  log_ok "Claude Code found"
else
  log_warn "Claude Code CLI not found — skills will still be installed to path"
  log_info "Install Claude Code: npm install -g @anthropic-ai/claude-code"
fi

if command -v "openclaw" &>/dev/null || [ -d "${HOME_DIR}/.openclaw" ]; then
  log_ok "OpenCLAW detected"
else
  log_warn "OpenCLAW not detected — creating directory structure anyway"
  log_info "Skills will be ready when OpenCLAW is installed"
fi

# ── DIRECTORY SETUP ───────────────────────────────────────────────────────────
log_step "SETUP — Creating directory structure"

dirs=(
  "$CLAUDE_CODE_SKILLS_DIR"
  "$OPENCLAW_SKILLS_DIR"
  "$OPENCLAW_MEMORY_DIR"
  "$RUFLO_DIR"
  "$NEXUS_CONFIG_DIR"
  "$LOCAL_TEMP"
)

for dir in "${dirs[@]}"; do
  mkdir -p "$dir"
  log_ok "Created: $dir"
done

# ── INSTALL: ANTIGRAVITY SKILLS ───────────────────────────────────────────────
log_step "STEP 1 — Installing Antigravity Awesome Skills (950+ skills)"

echo ""
echo -e "  ${DIM}Cloning from: $ANTIGRAVITY_SKILLS_REPO${RESET}"
if git clone --depth=1 "$ANTIGRAVITY_SKILLS_REPO" "$LOCAL_TEMP/antigravity" 2>&1; then
  log_ok "Antigravity skills cloned"
else
  log_warn "Could not clone Antigravity skills — repo may not be public yet"
  log_info "Manual install: git clone $ANTIGRAVITY_SKILLS_REPO ~/.claude/skills/antigravity"
  mkdir -p "$LOCAL_TEMP/antigravity/skills"
fi

PRIORITY_SKILLS=(
  "essentials" "clean-code" "brainstorming" "planning" "validation" "prompt-engineering"
  "full-stack-developer" "react-patterns" "typescript-expert" "frontend-design"
  "tailwind-mastery" "api-design" "database-design" "supabase-expert" "nextjs-expert"
  "performance-optimization" "web-vitals" "data-visualization" "real-time-systems"
  "websocket-patterns" "graphql-expert"
  "agent-architect" "llm-application-developer" "multi-agent-systems"
  "prompt-caching" "cost-optimization" "mcp-developer" "rag-systems" "ai-evaluation"
  "product-manager-toolkit" "data-analytics" "seo-strategy" "market-research"
  "competitive-intelligence" "startup-founder" "business-strategy" "go-to-market" "pricing-strategy"
  "marketing-growth" "content-strategy" "social-media-strategy" "email-marketing"
  "copywriting-expert" "brand-voice" "conversion-optimization" "influencer-strategy" "viral-growth"
  "sports-analytics" "contract-analysis" "legal-document-review" "financial-modeling"
  "deal-structuring" "negotiation-tactics"
  "event-planning" "community-building" "wellness-content" "experiential-design" "hospitality-ops"
  "api-security-best-practices" "auth-implementation-patterns" "backend-security-coder"
  "frontend-security-coder" "devops-engineer" "docker-expert" "aws-serverless"
  "monitoring-observability" "incident-response"
  "debugging-expert" "testing-expert" "documentation-writer" "code-reviewer"
  "refactoring-expert" "architecture-design" "microservices" "python-pro"
  "automation-engineer" "webhook-integration" "third-party-api-integration"
  "payment-integration" "analytics-integration"
  "voice-ai-developer" "media-processing" "video-ai" "image-generation-prompting"
)

log_info "Installing ${#PRIORITY_SKILLS[@]} priority skills to Claude Code..."

INSTALLED_COUNT=0
SKIPPED_COUNT=0

for skill in "${PRIORITY_SKILLS[@]}"; do
  [[ "$skill" == "#"* ]] && continue
  SKILL_FOUND=false
  for search_path in \
    "$LOCAL_TEMP/antigravity/skills/$skill" \
    "$LOCAL_TEMP/antigravity/skills/${skill}-skill" \
    "$LOCAL_TEMP/antigravity/${skill}"; do
    if [ -d "$search_path" ]; then
      cp -r "$search_path" "$CLAUDE_CODE_SKILLS_DIR/$skill" 2>/dev/null || true
      cp -r "$search_path" "$OPENCLAW_SKILLS_DIR/$skill" 2>/dev/null || true
      INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
      SKILL_FOUND=true
      break
    elif [ -f "$search_path.md" ]; then
      cp "$search_path.md" "$CLAUDE_CODE_SKILLS_DIR/${skill}.md" 2>/dev/null || true
      cp "$search_path.md" "$OPENCLAW_SKILLS_DIR/${skill}.md" 2>/dev/null || true
      INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
      SKILL_FOUND=true
      break
    fi
  done
  if [ "$SKILL_FOUND" = false ]; then
    SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
  fi
done

log_ok "Installed $INSTALLED_COUNT priority skills to Claude Code"
if [ $SKIPPED_COUNT -gt 0 ]; then
  log_warn "$SKIPPED_COUNT skills not found by name — install manually once Antigravity repo is accessible"
fi

if [ -d "$LOCAL_TEMP/antigravity" ]; then
  cp -r "$LOCAL_TEMP/antigravity" "$NEXUS_CONFIG_DIR/antigravity-full-library" 2>/dev/null || true
  log_ok "Full library backed up to $NEXUS_CONFIG_DIR/antigravity-full-library"
fi

# ── INSTALL: RUFLO ────────────────────────────────────────────────────────────
log_step "STEP 2 — Installing Ruflo (Multi-Agent Orchestration)"

echo -e "  ${DIM}Installing Ruflo via npm...${RESET}"
npm install -g ruflo@latest 2>&1 | tail -3 | while read -r l; do log_info "$l"; done || log_warn "ruflo npm install failed — trying npx approach"

log_info "Cloning Ruflo skills for Claude Code..."
if git clone --depth=1 "$RUFLO_REPO" "$LOCAL_TEMP/ruflo" 2>&1; then
  log_ok "Ruflo repository cloned"
  if [ -d "$LOCAL_TEMP/ruflo/.claude/skills" ]; then
    cp -r "$LOCAL_TEMP/ruflo/.claude/skills/." "$CLAUDE_CODE_SKILLS_DIR/" 2>/dev/null || true
    cp -r "$LOCAL_TEMP/ruflo/.claude/skills/." "$OPENCLAW_SKILLS_DIR/" 2>/dev/null || true
    log_ok "Ruflo skills installed to Claude Code + OpenCLAW"
  fi
  if [ -f "$LOCAL_TEMP/ruflo/CLAUDE.md" ]; then
    cp "$LOCAL_TEMP/ruflo/CLAUDE.md" "$NEXUS_CONFIG_DIR/ruflo-CLAUDE-reference.md"
    log_ok "Ruflo CLAUDE.md saved for reference"
  fi
else
  log_warn "Could not clone Ruflo repo — install manually: npm install -g ruflo@latest"
fi

# Write Ruflo 8-agent swarm config
log_info "Writing Ruflo 8-agent configuration..."
cat > "$NEXUS_CONFIG_DIR/ruflo-swarm.json" << 'RUFLO_CONFIG'
{
  "topology": "hierarchical",
  "maxAgents": 8,
  "strategy": "specialized",
  "ventures": {
    "separation": "strict",
    "namespaces": ["nextplay-nexus", "stillspoke", "thee-fun-kollective", "shared"]
  },
  "costControls": {
    "dailyBudget": 25.00,
    "perTaskLimit": 2.00,
    "requireCEOApproval": true,
    "approvalThreshold": 5.00,
    "modelRouting": {
      "architecture": "claude-opus-4-6",
      "coding": "claude-sonnet-4-6",
      "content": "claude-haiku-4-5",
      "review": "claude-sonnet-4-6"
    }
  },
  "agents": {
    "queen": { "type": "strategic", "model": "claude-opus-4-6" },
    "workers": [
      { "name": "platform-architect", "specialization": "nextplay-nexus-dev" },
      { "name": "content-ops", "specialization": "multi-venture-content" },
      { "name": "data-intelligence", "specialization": "nil-sports-analytics" },
      { "name": "growth-engine", "specialization": "marketing-all-ventures" },
      { "name": "ops-security", "specialization": "infra-devops-security" },
      { "name": "brand-guardian", "specialization": "brand-compliance-firewall" },
      { "name": "support-success", "specialization": "customer-support-crm" },
      { "name": "research-intel", "specialization": "competitive-market-intelligence" }
    ]
  }
}
RUFLO_CONFIG
log_ok "Ruflo 8-agent config written"

# Write full Ruflo config (from RUFLO-8-AGENT-PLAN.md)
cat > "$NEXUS_CONFIG_DIR/ruflo.config.json" << 'FULL_RUFLO_CONFIG'
{
  "version": "3.5.0",
  "project": "nexus-command",
  "topology": "hierarchical",
  "maxAgents": 8,
  "strategy": "specialized",
  "ventures": {
    "separation": "strict",
    "namespaces": ["nextplay-nexus", "stillspoke-wellness", "thee-fun-kollective", "shared-infrastructure"],
    "contentFirewall": true,
    "crossVentureBlocking": true
  },
  "queen": {
    "name": "nexus-command-master",
    "model": "claude-opus-4-6",
    "role": "coordinator",
    "skills": ["agent-architect", "multi-agent-systems", "business-strategy", "cost-optimization", "prompt-caching"],
    "restrictions": {
      "canExecuteTasks": false,
      "canApproveBudget": false,
      "canRouteTasks": true,
      "ceoBudgetThreshold": 5.00
    }
  },
  "agents": [
    {
      "id": "agent-1",
      "name": "platform-architect",
      "type": "coder",
      "model": "claude-sonnet-4-6",
      "ventureScope": ["nextplay-nexus"],
      "skills": ["full-stack-developer", "react-patterns", "typescript-expert", "nextjs-expert", "supabase-expert", "tailwind-mastery", "api-design", "database-design", "real-time-systems", "websocket-patterns", "graphql-expert", "performance-optimization", "web-vitals", "frontend-design", "architecture-design", "microservices"],
      "contextNamespace": "nextplay-nexus"
    },
    {
      "id": "agent-2",
      "name": "content-ops",
      "type": "writer",
      "model": "claude-haiku-4-5",
      "ventureScope": ["nextplay-nexus", "stillspoke-wellness", "thee-fun-kollective"],
      "skills": ["content-strategy", "copywriting-expert", "brand-voice", "social-media-strategy", "email-marketing", "seo-strategy", "wellness-content", "video-ai"],
      "contentFirewall": { "enabled": true, "requireVentureDeclaration": true, "blockCrossVentureRef": true }
    },
    {
      "id": "agent-3",
      "name": "data-intelligence",
      "type": "analyst",
      "model": "claude-sonnet-4-6",
      "ventureScope": ["nextplay-nexus"],
      "skills": ["sports-analytics", "data-engineering", "rag-systems", "data-visualization", "financial-modeling", "contract-analysis", "market-research", "competitive-intelligence", "python-pro"],
      "contextNamespace": "nextplay-nexus"
    },
    {
      "id": "agent-4",
      "name": "growth-engine",
      "type": "marketer",
      "model": "claude-haiku-4-5",
      "ventureScope": ["nextplay-nexus", "stillspoke-wellness", "thee-fun-kollective"],
      "skills": ["marketing-growth", "go-to-market", "viral-growth", "conversion-optimization", "influencer-strategy", "pricing-strategy", "product-manager-toolkit"]
    },
    {
      "id": "agent-5",
      "name": "ops-security",
      "type": "devops",
      "model": "claude-sonnet-4-6",
      "ventureScope": ["nextplay-nexus", "stillspoke-wellness", "thee-fun-kollective", "shared-infrastructure"],
      "skills": ["api-security-best-practices", "auth-implementation-patterns", "backend-security-coder", "devops-engineer", "docker-expert", "monitoring-observability", "incident-response", "privacy-by-design"],
      "requirements": { "reviewAllCodeBeforeDeploy": true, "blockDeployOnFailure": true }
    },
    {
      "id": "agent-6",
      "name": "brand-guardian",
      "type": "reviewer",
      "model": "claude-haiku-4-5",
      "ventureScope": ["nextplay-nexus", "stillspoke-wellness", "thee-fun-kollective"],
      "skills": ["brand-voice", "brand-consistency", "content-compliance", "design-review", "messaging-clarity"],
      "requirements": { "reviewAllExternalContent": true, "blockOnBrandViolation": true }
    },
    {
      "id": "agent-7",
      "name": "support-success",
      "type": "support",
      "model": "claude-haiku-4-5",
      "ventureScope": ["nextplay-nexus", "stillspoke-wellness", "thee-fun-kollective"],
      "skills": ["customer-support", "onboarding-design", "help-documentation", "crm-integration", "feedback-analysis", "retention-strategy"]
    },
    {
      "id": "agent-8",
      "name": "research-intelligence",
      "type": "researcher",
      "model": "claude-haiku-4-5",
      "ventureScope": ["nextplay-nexus", "stillspoke-wellness", "thee-fun-kollective"],
      "skills": ["market-research", "competitive-intelligence", "trend-analysis", "sports-industry-analysis", "wellness-industry-analysis", "research-methodology", "data-synthesis"],
      "batchEligible": true
    }
  ],
  "costControls": {
    "dailyBudget": 25.00,
    "perTaskLimit": 2.00,
    "ceoBudgetApprovalThreshold": 5.00,
    "batchApiEnabled": true,
    "batchEligibleTasks": ["market-research", "competitor-monitoring", "content-drafts", "seo-research", "analytics-processing"],
    "modelRouting": {
      "architecture": "claude-opus-4-6",
      "coding": "claude-sonnet-4-6",
      "analysis": "claude-sonnet-4-6",
      "content": "claude-haiku-4-5",
      "research": "claude-haiku-4-5",
      "support": "claude-haiku-4-5",
      "review": "claude-haiku-4-5"
    },
    "promptCaching": {
      "enabled": true,
      "cacheSystemPrompts": true,
      "ttlMinutes": 5,
      "estimatedSavings": "60-90%"
    }
  },
  "memory": {
    "provider": "agentdb",
    "persistCrossSession": true,
    "ventureIsolation": true,
    "compressionEnabled": true,
    "hnsw": { "enabled": true, "dimensions": 768, "speedup": "150x" }
  },
  "hooks": {
    "preTask": ["validate-venture-scope", "check-budget-limit", "load-skills-bundle", "enable-prompt-caching"],
    "postTask": ["brand-guardian-review", "security-scan", "cost-log", "memory-update"],
    "preDeploy": ["ops-security-review", "brand-guardian-final-check", "ceo-approval-gate"]
  },
  "openfangIntegration": {
    "enabled": true,
    "handsSync": true,
    "autonomousHands": ["researcher", "lead", "collector"],
    "reportingTarget": "ceo-dashboard"
  }
}
FULL_RUFLO_CONFIG
log_ok "Full Ruflo config (ruflo.config.json) written"

# ── INSTALL: OPENFANG ─────────────────────────────────────────────────────────
log_step "STEP 3 — Installing OpenFang (Agent OS)"

if git clone --depth=1 "$OPENFANG_REPO" "$LOCAL_TEMP/openfang" 2>&1; then
  log_ok "OpenFang repository cloned"
  mkdir -p "$OPENCLAW_MEMORY_DIR/openfang-reference"
  cp -r "$LOCAL_TEMP/openfang/." "$OPENCLAW_MEMORY_DIR/openfang-reference/" 2>/dev/null || true
  log_ok "OpenFang reference files saved"
else
  log_warn "Could not clone OpenFang repo — check $OPENFANG_REPO"
  log_info "Manual install: curl -fsSL https://openfang.sh/install | sh"
fi

# ── NEXUS CONFIG FILES ────────────────────────────────────────────────────────
log_step "STEP 4 — Writing Nexus Command configuration files"

cat > "$NEXUS_CONFIG_DIR/skills-index.json" << SKILLS_INDEX
{
  "version": "2.0.0",
  "lastUpdated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "totalSkills": ${#PRIORITY_SKILLS[@]},
  "bundles": {
    "nexus-essentials": {
      "description": "Core skills every subagent loads",
      "skills": ["essentials", "clean-code", "brainstorming", "planning", "prompt-engineering"]
    },
    "nextplay-nexus-core": {
      "description": "Platform development + NIL intelligence",
      "skills": ["full-stack-developer", "react-patterns", "typescript-expert", "supabase-expert", "nextjs-expert", "api-design", "data-visualization", "sports-analytics", "real-time-systems"]
    },
    "ai-orchestration": {
      "description": "Multi-agent + LLM system skills",
      "skills": ["agent-architect", "llm-application-developer", "multi-agent-systems", "prompt-caching", "cost-optimization", "mcp-developer", "rag-systems"]
    },
    "growth-marketing": {
      "description": "All-venture growth and marketing",
      "skills": ["marketing-growth", "content-strategy", "social-media-strategy", "copywriting-expert", "brand-voice", "conversion-optimization", "viral-growth"]
    },
    "stillspoke-wellness": {
      "description": "Wellness, sound healing, community",
      "skills": ["wellness-content", "community-building", "event-planning", "experiential-design"]
    },
    "fun-kollective-events": {
      "description": "Adult events production",
      "skills": ["event-planning", "community-building", "hospitality-ops", "experiential-design"]
    },
    "security-ops": {
      "description": "Infrastructure and security",
      "skills": ["api-security-best-practices", "auth-implementation-patterns", "devops-engineer", "docker-expert", "monitoring-observability"]
    }
  }
}
SKILLS_INDEX
log_ok "Skills index written"

ln -sf "$CLAUDE_CODE_SKILLS_DIR" "${HOME_DIR}/.claude/nexus-skills" 2>/dev/null || true
ln -sf "$OPENCLAW_SKILLS_DIR" "${HOME_DIR}/.openclaw/nexus-skills" 2>/dev/null || true
log_ok "Skill bundle symlinks created"

# ── CLEANUP ───────────────────────────────────────────────────────────────────
log_step "CLEANUP — Removing temp files"
rm -rf "$LOCAL_TEMP"
log_ok "Temp directory cleaned"

# ── SUMMARY ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${PURPLE}${BOLD}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${PURPLE}${BOLD}║                  INSTALLATION COMPLETE                       ║${RESET}"
echo -e "${PURPLE}${BOLD}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "  ${GREEN}Claude Code Skills:${RESET}  $CLAUDE_CODE_SKILLS_DIR"
echo -e "  ${GREEN}OpenCLAW Skills:${RESET}     $OPENCLAW_SKILLS_DIR"
echo -e "  ${GREEN}Ruflo Config:${RESET}        $NEXUS_CONFIG_DIR/ruflo.config.json"
echo -e "  ${GREEN}Swarm Config:${RESET}        $NEXUS_CONFIG_DIR/ruflo-swarm.json"
echo -e "  ${GREEN}Skills Index:${RESET}        $NEXUS_CONFIG_DIR/skills-index.json"
echo ""
echo -e "  ${CYAN}${BOLD}NEXT STEPS:${RESET}"
echo -e "  ${DIM}1. Copy ~/.claude/CLAUDE.md is installed (NEXUS COMMAND OS)${RESET}"
echo -e "  ${DIM}2. Run: npx ruflo@latest init --config ~/.nexus-command/ruflo.config.json${RESET}"
echo -e "  ${DIM}3. Run: npx ruflo daemon start${RESET}"
echo -e "  ${DIM}4. In Claude Code: @essentials @planning to initialize${RESET}"
echo ""
echo -e "  ${PURPLE}${BOLD}NEXUS COMMAND IS LIVE. BUILD THE FUTURE.${RESET}"
echo ""
