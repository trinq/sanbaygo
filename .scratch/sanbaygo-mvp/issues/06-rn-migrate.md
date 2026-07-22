# 06 — Wire `@core` path alias at the RN root and migrate RN consumers

**What to build:** RN imports everything shared from `@core` instead of `'../data'`, `'../types'`, `'../utils/time'`, or `'../calculation-engine'`. After this ticket, the root `npm test` runs `core/tests/**` alongside the existing RN tests, root `tsc --noEmit` exits 0, and the root-level duplicate directories (`data/`, `types/`, `utils/`, `calculation-engine/`) plus the moved test files in `tests/` are deleted.

**Blocked by:** 05 — web must complete first per the agreed web-first migration order

**Status:** ready-for-agent

- [ ] Update root `tsconfig.json` to add `"@core": ["./core/index.ts"]` and `"@core/*": ["./core/*"]` under `paths`
- [ ] Update root `package.json` jest config: add `testMatch` entry `'**/core/tests/**/*.test.ts'`, add `moduleNameMapper` entries for `^@core$` and `^@core/(.*)$`; keep `preset: ts-jest` and `passWithNoTests: true`
- [ ] Run `rg -l` to enumerate every RN file (under `app/`, `components/`, `hooks/`) importing from the four legacy paths; record the list before editing
- [ ] For each file in that list, replace the legacy relative imports with `from '@core'`
- [ ] Delete `data/busSchedule.ts`, `data/airport.ts`, `data/destinations.ts`, `data/exitTimeEstimates.ts`, `data/grabEstimates.ts`, `types/index.ts`, `utils/time.ts`, `calculation-engine/{isPeakHour,calculateExitTime,findNextCatchableTrip,calculateArrivalEstimate,index}.ts`
- [ ] Delete the moved test files `tests/time.test.ts` and `tests/calculation-engine/*.test.ts`; remove the now-empty `tests/calculation-engine/` directory (leave `tests/hooks/` intact)
- [ ] Remove the empty parent directories `data/`, `types/`, `utils/`, `calculation-engine/` (`rmdir` refuses if non-empty — investigate any leftovers)
- [ ] Root `npx tsc --noEmit` exits 0
- [ ] Root `npm test` passes — `core/tests/**` plus the remaining RN tests including `tests/hooks/useArrivalWizard.test.ts`
- [ ] Commit with message `feat(rn): migrate to @core path alias and delete duplicate data/types/calc code`
