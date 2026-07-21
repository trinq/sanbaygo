# SanBayGo Development Agent Instructions

## Before Starting Work

1. Read `claude-progress.md` to understand current state
2. Read `feature_list.json` to see priorities
3. Read `docs/superpowers/plans/` for implementation plans
4. Run `init.sh` to verify project is in clean state

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

1. Update `claude-progress.md` with session record
2. Update `feature_list.json` with current status
3. Verify `clean-state-checklist.md` items pass
4. Leave session handoff in `session-handoff.md`

## Project Structure

```
sanbaygo-mvp/
├── app/                    # Expo Router pages
├── components/            # UI components
├── calculation-engine/    # Business logic
├── data/                  # Static data
├── hooks/                 # React hooks
├── types/                 # TypeScript types
├── utils/                 # Utility functions
├── tests/                 # Jest tests
└── docs/                  # Documentation
    └── superpowers/
        └── plans/         # Implementation plans
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

All static data is in `data/`:
- `airport.ts` - Noi Bai Airport configuration
- `busSchedule.ts` - Bus 86 schedule (26 departures)
- `exitTimeEstimates.ts` - Exit time matrix
- `destinations.ts` - Destination points
- `grabEstimates.ts` - Static Grab estimates

## Calculation Engine

Pure functions in `calculation-engine/`:
- `calculateExitTime()` - Estimate exit time from terminal
- `isPeakHour()` - Detect rush hour (7-9 AM, 5-7 PM)
- `findNextCatchableTrip()` - Find catchable bus
- `calculateArrivalEstimate()` - Calculate arrival range

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
