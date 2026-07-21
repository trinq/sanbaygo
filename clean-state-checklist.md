# Clean State Checklist - SanBayGo MVP

Run through this checklist before ending each session.

## Pre-Session Verification

- [ ] Read `claude-progress.md` to understand current state
- [ ] Read `feature_list.json` to see what's in progress
- [ ] Review `session-handoff.md` from previous session

## Pre-Commit Checklist

### Standard Commands Work

- [ ] `cd sanbaygo-mvp && npm test` runs successfully
- [ ] `cd sanbaygo-mvp && npx tsc --noEmit` shows no errors

### Progress Tracking

- [ ] `claude-progress.md` updated with session record
- [ ] `feature_list.json` reflects actual state (no false `passing` entries)
- [ ] `session-handoff.md` filled in for next session

### No Half-Finished Work

- [ ] All open branches merged or documented
- [ ] Incomplete features marked `in_progress` or `blocked`, not `passing`
- [ ] No uncommitted changes that should be committed

### Code Quality

- [ ] No `console.log` statements left in production code
- [ ] No commented-out code blocks
- [ ] No TODO comments without issue references
- [ ] All tests pass

## Repository State

- [ ] Git working tree is clean OR
- [ ] Uncommitted changes are intentional (not forgotten work)
- [ ] Last commit message is meaningful

## Next Session Ready

- [ ] Next session can run `chmod +x init.sh && ./init.sh` successfully
- [ ] Next session knows what to work on from `feature_list.json`
- [ ] Next session can read `session-handoff.md` for context

## Evidence Recording

After running verification commands, record the output:

```
Verification Evidence:
─────────────────────
$ npm test

> sanbaygo-mvp@1.0.0 test
> jest

 PASS  tests/calculation-engine/calculateExitTime.test.ts
 PASS  tests/calculation-engine/isPeakHour.test.ts
...

Test Suites: 5 passed, 5 total
Tests:       25 passed, 25 total

$ npx tsc --noEmit

# No output = no errors
```

## Notes

<!-- Add session-specific notes here -->

---

**Last updated:** 2026-07-21
