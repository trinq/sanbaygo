---
last_verified: 2026-07-29
sources:
  - path: CONTEXT.md
  - path: feature_list.json
  - path: README.md
sources_note: Aggregated from the README and the curated domain entries in CONTEXT.md; feature_list.json provides ground truth on what is implemented vs deferred.
summary: SanBayGo helps travellers leaving Vietnamese airports catch the right bus, with the MVP focused on Noi Bai (HAN) and Tan Son Nhat (SGN).
---

# Project Overview

## What it is

SanBayGo ("bay go" — Vietnamese wordplay on "airport go") is a mobile app that
helps a traveller who has just landed at a Vietnamese airport answer one
question: **"What bus can I catch from here, and when does it leave?"**

The MVP targets **Noi Bai (HAN)** and **Tan Son Nhat (SGN)**. Da Nang, Cam
Ranh, and other airports are explicitly out of scope for MVP and would be a
future expansion.

## What problem it solves

A traveller who has just walked out of arrivals faces a small but stressful
sequence of decisions:

1. Which terminal am I in?
2. Where exactly is the bus stop (which column, which lane)?
3. Is there a bus I can still catch, or did I just miss the last one?
4. If no bus, what's the realistic Grab/Xanh SM/Be option?

SanBayGo answers all four, **in Vietnamese** on `sanbaygo.app` (the domestic
UI) and **in English** on `frylane.com` (the international-facing domain).
The lean_intl audience posture makes English the default language; see
[seo-content-strategy](./seo-content-strategy.md) for the full language split.

The airport-express bus is **prioritised** over ride-hail (cheaper, fixed price,
dedicated lane).

## What's in MVP

- Airport: HAN, SGN.
- Bus routes: Bus 86 (HAN), Route 109 (SGN-T3 only), Route 152 (SGN-T1/T2).
- Ride-hail estimates: Grab, Xanh SM, Be — **estimates only**, no deep-link booking.
- Vehicle comparison table across all 5 providers + the express bus.
- "Smart sort order": bus first (recommended), cheapest first, fastest first.

## What's NOT in MVP

- Real-time traffic data (Google Maps Directions API is **deferred**).
- Real-time flight delay tracking — user enters the **Actual Arrival** themselves.
- Booking/transaction flows — no payments, no account, no API integration.
- More airports (Da Nang, Cam Ranh, …).
- Multi-leg itineraries.

## Tech stack (current state)

The repo is a small monorepo. As of 2026-07-29:

- `core/` — pure TypeScript calculation engine + static data (`airport.ts`,
  `busSchedule.ts`, `exitTimeEstimates.ts`, `destinations.ts`, `grabEstimates.ts`).
- `web/` — Vite-based web app (Vite config + Playwright E2E).
- `app/`, `components/`, `hooks/` — Expo Router / React Native UI.
- `api/` — Express API (some sessions had it; currently present but optional
  per `init.sh`).
- Root `package.json` runs the Expo app; `core/` and `web/` are sub-packages.

See [architecture](./architecture.md) for the full layout and data flow.

## Open contradictions (flagged for triage, not resolved here)

The repo carries two contradictory statements about backend posture:

- `AGENTS.md` says "No Backend … MVP is fully client-side … static data only."
- `CONTEXT.md` says "Backend: Next.js API Routes, Database: Supabase (PostgreSQL),
  Deployment: Vercel."

This contradiction is **not** resolved by this wiki page. The resolution is a
follow-up ADR-style decision deferred to a later session (per the
`docs/` triage plan).