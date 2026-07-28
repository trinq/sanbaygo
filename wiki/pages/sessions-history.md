---
last_verified: 2026-07-29
sources:
  - path: feature_list.json
  - path: docs/superpowers/plans
  - path: wiki/log.md
sources_note: Session chronology comes from feature_list.json's `evidence` (commit SHAs back to rn-project-scaffold) and the implementation plans in docs/superpowers/plans/. Per-session detail lives in wiki/log.md (which supersedes the deprecated claude-progress.md).
summary: Chronology of agent sessions — high-level milestones, with raw detail in wiki/log.md.
---

# Sessions History

High-level view. Per-session detail (which files changed, lint status,
commit hash) is in [wiki/log.md](../log.md).

## Phases

### Phase 1 — Expo/React Native scaffold (early 2026)
- **rn-project-scaffold** — Expo + React Native project initialised; `npm
  install` and `npx tsc --noEmit` clean. Commit `a066b5c2`.
- **rn-typescript-types** — All interfaces defined (`Airport`, `Terminal`,
  `BusRoute`, …). Commit `2a62641`.
- **rn-static-data** — `busSchedule.ts` (26 departures), `exitTimeEstimates.ts`,
  `destinations.ts` (6 destinations). Commit `2a62641`.
- **rn-time-utilities** — 8 functions, 32 tests. Commit `2a62641`.
- **rn-calculation-engine** — 4 pure functions, 35 tests. Commit `ea866dc`.
- **rn-form-state-hook** — `useArrivalWizard` hook, 27 new tests (85 total).
  Commit `c64cfd0`.
- **rn-form-components** — 4-step form wizard UI.

### Phase 2 — SGN expansion + UI (mid 2026)
- Bus 152 route research + implementation plan
  (`docs/superpowers/plans/2026-07-27-bus-152-route-map.md`).
- Bus 152 route map implementation
  (`docs/superpowers/plans/2026-07-27-bus-152-route-map-implementation.md`).
- Homepage audit (`.scratch/homepage-audit/`) — screenshot capture for visual
  review.

### Phase 3 — Operational concerns (late July 2026)
- VPS deployment guide (`docs/vps-deployment-guide.md`).
- Deployment script (`scripts/deploy.sh`).
- SEO strategy ADR (`docs/adr/0002-seo-strategy.md`).
- VPS deployment ADR (`docs/adr/0003-vps-deployment.md`).
- SEO/ads plan (`docs/seo-ads-plan.md`, 571 lines — primary research).
- Market research 2026 (`.scratch/market-research-2026.md`).
- GitHub Actions deploy workflow (`.github/workflows/deploy.yml`).

### Phase 4 — Knowledge layer (2026-07-29)
- **Wiki scaffold** — `wiki/` tree, `wiki/scripts/lint.mjs` (C1+C2+C5),
  `wiki/diagram.mmd` + `./wiki-diagram.svg`.
- `claude-progress.md` deprecated; future session entries go to `wiki/log.md`.

## Open work

- `docs/` triage: resolve contradictions (e.g., "no backend" vs
  "Next.js API + Supabase + Vercel"). Deferred per the docs/ triage plan.
- `feature_list.json` items not yet marked `passing` — see
  [project-overview](./project-overview.md#whats-not-in-mvp) for the
  MVP scope boundary.
- Documentation refresh: `AGENTS.md` project-structure diagram is stale
  (says flat layout; actual layout is `core/` + `web/` + Expo + optional
  `api/`).