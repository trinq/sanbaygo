# 05 — Wire `@core` path alias in web and migrate web consumers

**What to build:** Web imports everything shared from `@core` instead of relative paths into `src/lib/` or `src/types/`. After this ticket, web's Jest suite runs `core/tests/**` via the shared alias, web's `tsc --noEmit` exits 0, and three web-only thin files (`web/src/lib/data.ts`, `web/src/lib/calculation-engine.ts`, `web/src/lib/time.ts`) plus `web/src/types/index.ts` are deleted. The price assertions `35000 → 50000` in `web/__tests__/lib/transport-calculator.test.ts` are updated.

**Blocked by:** 04 — `core/` must own the canonical implementation before consumers flip

**Status:** ready-for-agent

- [ ] Update `web/tsconfig.json` to add `"@core": ["../core/index.ts"]` and `"@core/*": ["../core/*"]` under `paths`; add `"../core"` to `include`
- [ ] Update `web/jest.config.js` to add `roots: ['<rootDir>', '../core']`, `testMatch` entry `'../core/tests/**/*.test.ts'`, and `moduleNameMapper` entries for `^@core$` and `^@core/(.*)$`
- [ ] Run `rg -l` to enumerate every web file importing from `'../types'`, `'../../types'`, `'../lib/data'`, `'../lib/calculation-engine'`, `'../lib/time'`, or their `'../../'` variants; record the list before editing
- [ ] For each file in that list, replace the legacy relative imports with `from '@core'`
- [ ] Update `web/__tests__/lib/transport-calculator.test.ts`: import `TransportComparison` from `@core`; replace `'35,000 VND'` / `35000` with `'50,000 VND'` / `50000` in the two relevant lines
- [ ] Confirm `web/__tests__/lib/vehicle-comparison-data.test.ts` needs no edits (no numeric price assertion exists; import `from '../../src/lib/transport-calculator'` still works)
- [ ] Delete `web/src/lib/data.ts`, `web/src/lib/calculation-engine.ts`, `web/src/lib/time.ts`, `web/src/types/index.ts`
- [ ] `cd web && npx tsc --noEmit` exits 0
- [ ] `cd web && npm test` passes — every existing suite plus the new `core/tests/**` suites
- [ ] Commit with message `feat(web): migrate to @core path alias and update Bus 86 price to 50000`
