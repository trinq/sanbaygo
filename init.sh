#!/bin/bash

# SanBayGo Development Harness - Initialization Script
# =================================================
# Repo layout: monorepo with Expo RN (root) + Vite web (web/) + Express API (api/) + shared core (core/)

set -e

# Configuration
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

step() { echo -e "${BLUE}==>${NC} $1"; }
ok()   { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}!${NC} $1"; }
fail() { echo -e "${RED}✗${NC} $1"; exit 1; }

echo "========================================"
echo "SanBayGo Development Environment Setup"
echo "========================================"
echo ""
echo "Repository: $ROOT_DIR"
echo ""

cd "$ROOT_DIR"

# ---- Pre-flight: expected directory layout ----
step "Pre-flight: checking repo layout"
for d in core web api; do
  [ -d "$d" ] || fail "missing directory: $d/"
  [ -f "$d/package.json" ] || fail "missing $d/package.json"
done
ok "core/, web/, api/ all present"

# ---- Install root (Expo RN) ----
step "Installing root dependencies (Expo RN)"
npm install
ok "root dependencies installed"

# ---- Install web ----
if [ -d "web/node_modules" ] && [ -f "web/node_modules/.package-lock.json" ]; then
  ok "web/node_modules present, skipping"
else
  step "Installing web/ dependencies"
  (cd web && npm install)
  ok "web/ dependencies installed"
fi

# ---- Install api ----
if [ -d "api/node_modules" ] && [ -f "api/node_modules/.package-lock.json" ]; then
  ok "api/node_modules present, skipping"
else
  step "Installing api/ dependencies"
  (cd api && npm install)
  ok "api/ dependencies installed"
fi

# ---- TypeScript checks (all three) ----
step "TypeScript: root (RN)"
npx tsc --noEmit
ok "root tsc clean"

step "TypeScript: core/ (shared module)"
(cd core && npx tsc --noEmit -p tsconfig.json)
ok "core/ tsc clean"

step "TypeScript: design-system/"
(cd design-system && npx tsc --noEmit)
ok "design-system/ tsc clean"

step "TypeScript: web/"
(cd web && npx tsc --noEmit)
ok "web/ tsc clean"

# ---- Test suites ----
step "Running tests: root (RN + core)"
npm test -- --no-watchman
ok "root tests pass"

step "Running tests: web/"
(cd web && npm test -- --no-watchman)
ok "web/ tests pass"

# ---- Summary ----
echo ""
echo "========================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "========================================"
echo ""
echo "Available commands (from repo root):"
echo "  npm start                  - Start Expo dev server (RN)"
echo "  npm test                   - Run root tests (RN + core)"
echo "  npx tsc --noEmit           - TypeScript check (root)"
echo ""
echo "  cd web && npm run dev      - Start Vite (http://localhost:5173)"
echo "  cd web && npm test         - Run web tests"
echo ""
echo "  cd api && npm run dev      - Start API (http://localhost:3000)"
echo "  cd api && npm test         - Run api tests"
echo ""
echo "  cd core && npx tsc --noEmit -p tsconfig.json   - Check shared core"
echo ""

# Optional: start all three dev servers
if [ "${RUN_START_COMMAND:-0}" = "1" ]; then
  step "Starting all three dev servers"
  (cd api && npm run dev) &
  (cd web && npm run dev) &
  npm start
fi
