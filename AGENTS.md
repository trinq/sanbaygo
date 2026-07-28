# SanBayGo Development Agent Instructions

## Before Starting Work

1. Read `wiki/README.md` and `wiki/index.md` to understand the curated project state
2. Run `npm run wiki:lint` to check the wiki for drift / broken links / schema issues — fix anything reported before starting new work
3. Read `wiki/pages/<topic>.md` for the page most relevant to your task
4. Read `feature_list.json` to see priorities
5. Run `init.sh` to verify the project is in a clean state

## Working Rules

### One Feature at a Time
- Work on only ONE feature at a time
- Mark feature as `in_progress` in `feature_list.json`
- Complete feature fully before moving to next

### Test-Driven Development
- Write failing test FIRST before implementation
- Run test to verify it fails
- Implement minimal code to pass
- Run test to verify it passes
- Refactor if needed
- Commit ONLY when test passes

### Frequent Commits
- Commit after each completed feature
- Commit message format: `feat: description`, `fix: description`, `docs: description`
- Keep commits small and focused

### Evidence Before Assertions
- Always run verification commands
- Record actual output as evidence
- Don't claim work is done without running tests

## Definition of Done

A feature is complete when:
- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] Code follows project conventions
- [ ] Feature marked `passing` in `feature_list.json`
- [ ] Evidence recorded in `feature_list.json`
- [ ] Changes committed

## End of Session

1. Append a one-bullet entry to `wiki/log.md` referencing which source files changed this session. Do not append to `claude-progress.md` (deprecated, kept as raw history).
2. Update `feature_list.json` with current status
3. Verify `clean-state-checklist.md` items pass
4. Leave session handoff in `session-handoff.md`

## Wiki Operations

The `wiki/` directory is the curated, link-checked, drift-checked knowledge layer for the project. See `wiki/README.md` for the full overview.

### Key commands

```bash
# Run the wiki lint pass (C1 staleness + C2 broken links + C5 schema)
npm run wiki:lint

# Render the Mermaid diagram (wiki/diagram.mmd → ./wiki-diagram.svg)
npm run wiki:render
```

### When to update the wiki

- **You changed a source file** (any file under `core/`, `web/`, `app/`, `components/`, `hooks/`, `api/`, `docs/adr/`, `CONTEXT.md`, `AGENTS.md`, `feature_list.json`, etc.): the lint pass will flag the affected wiki page as `C1 stale`. Update the page and bump its `last_verified` date, or accept that the page is out of date and document why.
- **You added a new wiki page**: it must have frontmatter with `last_verified`, `sources`, `summary`, and the body must not have broken links. Lint will enforce this.
- **You added a new ADR or domain concept**: cross-link it from the relevant existing wiki page (e.g. `wiki/pages/decisions.md` for ADRs, `wiki/pages/domain-model.md` for vocabulary).

### Frontmatter schema

```yaml
---
last_verified: YYYY-MM-DD
sources:
  - path: relative/path/from/repo/root
sources_note: short rationale
summary: one-line description (used by wiki/index.md)
---
```

Sources can be any path inside the repo (relative to root). The lint pass checks each source's mtime against `last_verified` to detect drift.

## Project Structure

The repo is a small monorepo. The actual layout (per `init.sh`):

```
sanbaygo/
├── core/                     # Pure TypeScript: calculation engine + static data
│   ├── calculation-engine/   # Pure functions (no IO, no React)
│   ├── data/                 # Static data (airport, schedule, exit times, …)
│   ├── api/                  # Optional Express API wrappers
│   ├── tests/                # Jest tests for core/
│   └── package.json
├── web/                      # Vite-based web app + Playwright E2E
│   ├── src/
│   ├── __tests__/            # Jest tests for web/
│   ├── e2e/                  # Playwright E2E
│   ├── vite.config.mts
│   └── package.json
├── app/                      # Expo Router / React Native UI
├── components/               # React Native UI primitives
├── hooks/                    # React hooks
├── api/                      # Express server (optional in local dev per init.sh)
├── docs/                     # Research, plans, ADRs (raw sources)
│   └── adr/
│   └── superpowers/plans/
├── wiki/                     # This knowledge layer (curated) — see wiki/README.md
├── wiki-diagram.svg          # Generated diagram of wiki ↔ source relationships
├── AGENTS.md                 # Repo-level agent instructions (this file)
├── CONTEXT.md                # Working notes / curated domain entries
├── feature_list.json         # Feature tracker
└── init.sh                   # Repo init / verification script
```

## Key Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# TypeScript check
npx tsc --noEmit

# Start dev server
npm start

# Run specific test
npm test -- --testPathPattern="calculateExitTime"
```

## Static Data Location

All static data is in `core/data/` (per `core/` package layout):
- `airport.ts` - Noi Bai + Tan Son Nhat airport configuration
- `busSchedule.ts` - Bus 86 schedule (26 departures), Route 109, Route 152
- `exitTimeEstimates.ts` - Exit time matrix
- `destinations.ts` - Destination points (HAN + SGN)
- `grabEstimates.ts` - Static Grab estimates

> Note: AGENTS.md previously described these as `data/` (top-level). The
> actual location has been `core/data/` for several sessions; this wiki
> reflects the current state. See `wiki/pages/data-sources.md` for the
> canonical inventory.

## Calculation Engine

Pure functions in `core/calculation-engine/`:
- `calculateExitTime()` - Estimate exit time from terminal
- `isPeakHour()` - Detect rush hour (7-9 AM, 5-7 PM)
- `findNextCatchableTrip()` - Find catchable bus
- `calculateArrivalEstimate()` - Calculate arrival range

Wired into a single entry point via `core/calculate-trip.ts`.

## Vietnamese Language UI

All user-facing text must be in Vietnamese:
- Form labels and hints
- Error messages
- Result displays
- Instructions

## No Backend

MVP is fully client-side:
- No API calls
- No authentication
- No data persistence
- Static data only
