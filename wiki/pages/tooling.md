---
last_verified: 2026-07-29
sources:
  - path: package.json
  - path: AGENTS.md
  - path: init.sh
  - path: scripts/deploy.sh
  - path: docs/vps-deployment-guide.md
sources_note: Build/test commands come from root package.json + AGENTS.md + init.sh. Deployment details from scripts/deploy.sh and docs/vps-deployment-guide.md.
summary: Build, test, lint, deploy — every command and what it touches.
---

# Tooling

## Install

```bash
# Repo root (Expo RN + monorepo)
npm install

# Web sub-package (Vite + Playwright)
(cd web && npm install)

# Optional API sub-package
(cd api && npm install)   # only if api/ is present locally
```

`init.sh` does the above and asserts the expected layout (fails fast if
`core/` or `web/` are missing). It also optionally installs `api/` if a
local copy is present.

## Run

```bash
# Expo dev server (RN)
npm start

# Web (Vite) dev server
(cd web && npm run dev)

# API (Express) dev server — only if api/ is present
(cd api && npm run dev)
```

## Test

```bash
# All tests (Jest projects: core + rn)
npm test

# Specific test file
npm test -- --testPathPattern="calculateExitTime"

# Web Playwright E2E
(cd web && npx playwright test)
```

## Type-check

```bash
npx tsc --noEmit           # root (Expo + RN)
(cd web && npx tsc --noEmit)  # web sub-package
```

## Wiki operations

```bash
# Lint the wiki (C1 staleness + C2 broken links + C5 schema)
npm run wiki:lint

# Render the Mermaid diagram to ./wiki-diagram.svg
npm run wiki:render
```

The lint pass uses Node's built-in test runner for its own tests
(`node --test wiki/scripts/__tests__/lint.test.mjs`) — no extra
dependency.

## Deployment

The project ships a `scripts/deploy.sh` script and a `.github/workflows/deploy.yml`
workflow. Full operational details live in
[docs/vps-deployment-guide.md](../../docs/vps-deployment-guide.md), which
the deferred docs/ triage will reconcile against
[docs/adr/0003-vps-deployment.md](../../docs/adr/0003-vps-deployment.md).

The deployment path involves a VPS (per ADR 0003) rather than the Vercel
mention in CONTEXT.md — another [contradiction](./decisions.md#open-contradictions)
flagged for triage.

## Config files

| File | Holds |
|------|-------|
| `package.json` | Root deps, Jest projects, Expo scripts |
| `core/package.json` | Core sub-package deps |
| `web/package.json` | Vite + Playwright deps |
| `web/vite.config.mts` | Vite config (web/) |
| `app.json` | Expo config |
| `tsconfig.json` | Root TS config |
| `core/tsconfig.json` | Core TS config |
| `web/tsconfig.json` | Web TS config |
| `playwright.config.ts` | Root Playwright config |
| `web/playwright.config.ts` | Web Playwright config |