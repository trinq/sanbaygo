---
last_verified: 2026-08-02
sources:
  - path: docs/adr
sources_note: ADRs are the raw decision log; this page is an index. As of 2026-08-02 the adr/ folder contains 0002-seo-strategy.md, 0003-vps-deployment.md (superseded), and 0004-cloudflare-pages.md (accepted).
summary: Index of ADRs and other project decisions, with raw-record links.
---

# Decisions

The project's decision log lives as ADRs in `docs/adr/`. This page is an
**index** — for the *what* and *why*, read the raw ADR.

## ADRs

| # | Title | Status | File |
|---|-------|--------|------|
| 0002 | SEO Strategy | accepted | [docs/adr/0002-seo-strategy.md](../../docs/adr/0002-seo-strategy.md) |
| 0003 | VPS Deployment | **superseded** by 0004 (2026-08-02) | [docs/adr/0003-vps-deployment.md](../../docs/adr/0003-vps-deployment.md) |
| 0004 | Cloudflare Pages Deployment | accepted (2026-08-02) | [docs/adr/0004-cloudflare-pages.md](../../docs/adr/0004-cloudflare-pages.md) |

## Migration log

- **2026-08-02** — Migrated from VPS (ADR-0003) to Cloudflare Pages (ADR-0004).
  - Rationale: VPS edge latency ~50-80ms from Vietnam vs CF Pages <10ms;
    eliminate ops burden (SSL renewal, security updates, monitoring);
    atomic deploys; zero recurring cost.
  - Domain: `www.frylane.com` (canonical) with apex `frylane.com` 301-redirect.
  - CI: GitHub webhook → Cloudflare Pages build → atomic swap. GH Actions
    VPS rsync workflow deleted.
  - Live: `https://www.frylane.com/`

## Implicit decisions (encoded in AGENTS.md / CONTEXT.md but not in an ADR)

These are decisions *as written* in the working docs. None has been
formalised as an ADR. Treat them as **provisional** until either ratified
or moved into an ADR.

- **Vietnamese-only UI** (AGENTS.md). All user-facing text in Vietnamese.
  No i18n scaffolding.
- **Express-bus-first recommendation** (CONTEXT.md). System prefers
  Bus 86 over Grab when a Catchable Trip exists and the destination has
  full coverage.
- **User enters Actual Arrival** (CONTEXT.md). System does not infer
  arrival from scheduled time or flight tracking.
- **Estimate-only ride-hail** (CONTEXT.md). No deep-link booking into
  Grab/Xanh SM/Be.
- **"No backend" MVP** (AGENTS.md). *Conflicts with* CONTEXT.md's
  "Backend: Next.js API Routes, Database: Supabase, Deployment: Vercel."
  See "Open contradictions" below.
- **lean_intl audience posture** (2026-07-29). `frylane.com` is the sole domain
  for all audiences — EN at root, VI at `/vi/…`. International English-speaking
  travellers are primary (≈ 60%); Vietnamese domestic is secondary (≈ 40%).
  Not yet formalised as an ADR. See
  [seo-content-strategy](./seo-content-strategy.md) for keyword tiers and
  execution notes.

## Open contradictions

These are flagged for triage, **not** resolved here:

1. **Backend posture.** `AGENTS.md` says "MVP is fully client-side …
   static data only." `CONTEXT.md` says "Backend: Next.js API Routes,
   Database: Supabase (PostgreSQL), Deployment: Vercel." The two
   documents cannot both be correct. Either the backend was added
   between sessions and `AGENTS.md` was not updated, or `CONTEXT.md`'s
   tech-stack table is aspirational and was never built. **Note 2026-08-02**:
   ADR-0004 confirms deployment is Cloudflare Pages, NOT Vercel — so
   CONTEXT.md's "Deployment: Vercel" line is stale regardless of backend
   status.
2. **Project structure.** `AGENTS.md`'s tree shows a flat layout
   (`app/`, `components/`, `calculation-engine/`, `data/`). The actual
   layout is a monorepo with `core/`, `web/`, `api/`, plus top-level
   `app/`, `components/`, `hooks/`, etc. `AGENTS.md` is stale.
3. **ADR numbering gap.** `docs/adr/` starts at `0002`. No `0001` is
   visible. The cause of the gap is unknown.

## Follow-ups

- During the deferred `docs/` triage: turn each implicit decision above
  into a numbered ADR.
- Reconcile the backend posture contradiction.
- Refresh `AGENTS.md`'s project-structure diagram to match the actual
  monorepo layout.
- Update `AGENTS.md` "Key Commands" / "Project Structure" to mention
  Cloudflare Pages (replaces VPS deploy section).
