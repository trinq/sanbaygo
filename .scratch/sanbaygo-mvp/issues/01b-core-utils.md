# 01b — Stand up `core/utils/` with time helpers

**What to build:** A new `core/utils/time.ts` containing the existing 8 functions verbatim from `utils/time.ts`, plus a test file mirroring `tests/time.test.ts`. The `core/tsconfig.json` is extended to include the utils directory. Root `utils/time.ts` and `tests/time.test.ts` stay in place during expand.

**Blocked by:** 01a — `core/tsconfig.json` already exists; extend its `include` to cover utils

**Status:** ready-for-agent

- [ ] Create `core/utils/time.ts` containing `parseTime`, `formatTime`, `addMinutes`, `timeToMinutes`, `minutesToTime`, `compareTimes`, `isAfterOrEqual`, `isWithinRange` (the 8 functions that currently exist in `utils/time.ts` — do NOT add `formatTimeRange` or `formatPrice`, those land in ticket 04)
- [ ] Move `tests/time.test.ts` to `core/tests/utils/time.test.ts` with updated import paths only (body unchanged)
- [ ] Update `core/tsconfig.json` `include` to `["./types", "./utils", "./tests"]`
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] Root `npm test -- --testPathPattern="time.test"` passes (the moved test)
- [ ] Root `npm test` (full suite) still passes — old `utils/time.ts` is still in place so legacy consumers are unaffected
- [ ] Commit with message `feat(core): move time utilities with tests`