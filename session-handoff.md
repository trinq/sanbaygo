# Session Handoff - SanBayGo MVP

## Currently Verified

| Feature | Status | Last Verified |
|---------|--------|---------------|
| (none yet) | - | - |

## Changes This Session

<!-- Fill in what was completed this session -->

## Still Broken or Unverified

<!-- List known issues or unverified features -->

## Next Best Action

1. Read `claude-progress.md` for current state
2. Read `feature_list.json` for priorities
3. Pick highest priority incomplete feature
4. Run tests to verify baseline
5. Implement using TDD approach

## Commands

```bash
# Setup & verify
cd sanbaygo-mvp && npm install
cd sanbaygo-mvp && npm test

# TypeScript check
cd sanbaygo-mvp && npx tsc --noEmit

# Start dev server
cd sanbaygo-mvp && npm start

# Run specific tests
cd sanbaygo-mvp && npm test -- --testPathPattern="calculation-engine"
```

## Context

- **Project:** SanBayGo MVP
- **Tech Stack:** Expo, React Native, TypeScript, Jest
- **Language:** Vietnamese (all UI text)
- **Backend:** None (fully client-side)
- **Spec:** `docs/SPEC.md`
- **Plan:** `docs/superpowers/plans/2026-07-21-sanbaygo-mvp.md`
