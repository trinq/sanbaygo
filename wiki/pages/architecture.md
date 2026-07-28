---
last_verified: 2026-07-29
sources:
  - path: AGENTS.md
  - path: CONTEXT.md
  - path: core/index.ts
  - path: core/calculate-trip.ts
  - path: web/vite.config.mts
  - path: init.sh
sources_note: Layout comes from `init.sh` (which explicitly asserts core/ + web/ + optional api/). Calculation engine surface comes from core/calculate-trip.ts and core/calculation-engine/. Vite web surface comes from web/vite.config.mts.
summary: Monorepo with core/ (pure TS), web/ (Vite), app/ (Expo), and api/ (Express optional); calculation engine is the heart.
---

# Architecture

## Monorepo layout

```
sanbaygo/
├── core/                    # Pure TypeScript: calculation engine + static data
│   ├── calculation-engine/  # Pure functions (no IO, no React)
│   ├── data/                # Static data (airport, schedule, exit times, …)
│   ├── api/                 # Optional Express API wrappers
│   ├── tests/               # Jest tests for core/
│   └── package.json
├── web/                     # Vite-based web app + Playwright E2E
│   ├── src/                 # UI components
│   ├── __tests__/           # Jest tests for web/
│   ├── e2e/                 # Playwright E2E tests
│   ├── vite.config.mts
│   └── package.json
├── app/                     # Expo Router / React Native UI
├── components/              # React Native UI primitives
├── hooks/                   # React hooks
├── api/                     # Express server (optional in local dev per init.sh)
├── docs/                    # Research, plans, ADRs (raw sources)
├── wiki/                    # This knowledge layer (curated)
└── AGENTS.md, CONTEXT.md    # Repo-level agent instructions
```

`init.sh` is the source of truth for the expected layout — it fails fast if
`core/` or `web/` are missing.

## Calculation engine

Pure TypeScript functions in `core/calculation-engine/`. The functions
documented in `AGENTS.md`:

- `calculateExitTime(terminalType, baggage)` — minutes from plane-door open to terminal exit.
- `isPeakHour(time)` — true during 07:00–09:00 and 17:00–19:00 local time.
- `findNextCatchableTrip(arrivalTime, terminalId, routeId)` — the next bus the user can catch.
- `calculateArrivalEstimate(departure, destinationId)` — earliest/latest arrival window.

`core/calculate-trip.ts` wires these into a single `calculateTrip()` entry
point for the API layer.

## Data flow

```
User input (form: airport, terminal, arrival time, baggage)
  → useArrivalWizard hook (app/)
  → calculateTrip() (core/)
    → calculateExitTime
    → findNextCatchableTrip
    → calculateArrivalEstimate
  → Result (catchable trip + arrival window + alternatives)
  → Smart Sort: bus first / cheapest / fastest
  → UI: results card + vehicle comparison table
```

## Static data files

| File | Holds |
|------|-------|
| `core/data/airport.ts` | Noi Bai + Tan Son Nhat airport definitions, terminal IDs |
| `core/data/busSchedule.ts` | Bus 86 (26 departures), Route 109, Route 152 |
| `core/data/exitTimeEstimates.ts` | Exit-time matrix (terminal × baggage) |
| `core/data/destinations.ts` | HAN + SGN destination points |
| `core/data/grabEstimates.ts` | Static Grab/Xanh SM/Be estimates |

See [data-sources](./data-sources.md) for the canonical inventory.

## Open questions

- The web app's relation to the Expo app: do they share `core/` (yes) or is
  there a separate UI codebase? (As of 2026-07-29, `core/` is shared; the
  web app appears to be the same UI rendered for desktop.)
- Whether `api/` is wired up in production deployments — see
  [decisions](./decisions.md) for the open contradiction about backend
  posture (Supabase/Next.js API vs "no backend").