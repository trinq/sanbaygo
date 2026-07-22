# 04 — Stand up `core/index.ts` top-level barrel

**What to build:** A top-level `core/index.ts` barrel that re-exports everything from `core/types`, `core/utils/time`, `core/data`, and `core/calculation-engine`. After this ticket, consumers can write `from '@core'` (after the path alias lands in tickets 05/06) to reach any shared type, data value, or pure function via one import.

**Blocked by:** 01a, 01b, 01c, 01d — all four sub-modules must exist before the barrel can re-export them; 02 — corrections in core/data must land before the barrel exposes them; 03 — Terminal.flightTypes and price test must land before the barrel exposes them

**Status:** ready-for-agent

- [ ] Create `core/index.ts` with the top-level barrel: `export * from './types'; export * from './utils/time'; export * from './data'; export * from './calculation-engine';`
- [ ] Update `core/tsconfig.json` `include` to include `"./index.ts"` (the existing line `./types`, `./utils`, `./data`, `./calculation-engine` covers the four sub-modules, but the barrel at `./index.ts` is the entry point consumers hit via `@core`)
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] Confirm `core/tests/data.test.ts` and the moved calc-engine tests still pass (the barrel re-exports don't change anything they import)
- [ ] Root `npm test` (full suite) still passes — barrel only adds a new entry point; no consumer imports from `@core` yet
- [ ] Commit with message `feat(core): add top-level barrel at core/index.ts`