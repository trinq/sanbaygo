---
last_verified: 2026-08-02
sources:
  - path: package.json
  - path: AGENTS.md
  - path: init.sh
  - path: docs/adr/0004-cloudflare-pages.md
sources_note: Build/test commands from root package.json + AGENTS.md + init.sh. Deployment details from ADR-0004 (Cloudflare Pages, supersedes ADR-0003).
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

**Cloudflare Pages** (per
[ADR-0004](../../docs/adr/0004-cloudflare-pages.md), accepted 2026-08-02;
supersedes
[ADR-0003](../../docs/adr/0003-vps-deployment.md) — VPS deployment is
decommissioned).

- **Production URL**: `https://www.frylane.com/`
- **Apex**: `https://frylane.com/` → 301 redirect to `www`
- **Preview**: every push to `main` gets a per-commit preview URL
  (`https://<hash>.sanbaygo.pages.dev`) for review before promotion.
- **CI/CD**: GitHub webhook → Cloudflare Pages build worker runs
  `cd web && npm ci && npm run build`, then atomic swap to a new
  deployment. No GitHub Actions needed for deployment.
- **Build config** (set in CF dashboard):
  - Build command: `cd web && npm ci && npm run build`
  - Output directory: `web/dist`
  - Production branch: `main`
  - Node version: 20
- **Local verification** (mirror the CF build before pushing):
  ```bash
  cd web && npx tsc --noEmit && npm run build
  ```
- **DNS** (in Cloudflare dashboard for `frylane.com`):
  - `www` CNAME → `sanbaygo.pages.dev` (Proxied)
  - `@`   CNAME → `sanbaygo.pages.dev` (Proxied, CF flattens to A)
  - Page Rule `frylane.com/*` → 301 redirect to `https://www.frylane.com/$1`

The old `.github/workflows/deploy.yml` (VPS rsync) and
`scripts/deploy.sh` are deleted. Do not reintroduce them.

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