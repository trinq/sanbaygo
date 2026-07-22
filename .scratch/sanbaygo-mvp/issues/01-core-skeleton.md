# 01 — Stand up `core/` module skeleton (expand phase)

**What to build:** A new `core/` directory at the repo root that owns the shared business module. Both web and RN continue to compile and test as before; nothing imports from `core/` yet — this ticket only creates the empty module with a barrel and a tsconfig so the path alias can be wired in later tickets.

**Blocked by:** None — can start immediately

**Status:** ready-for-agent

- [ ] Create `core/types/index.ts` containing the existing TypeScript types verbatim from `types/index.ts` (no additions, no shape changes)
- [ ] Create `core/utils/time.ts` containing the existing `parseTime`, `formatTime`, `addMinutes`, `timeToMinutes`, `minutesToTime`, `compareTimes`, `isAfterOrEqual`, `isWithinRange`, `formatTimeRange`, `formatPrice` from `utils/time.ts`
- [ ] Create `core/data/index.ts` re-exporting `BUS_86_SCHEDULE`, `BUS_86`, `EXIT_TIME_ESTIMATES`, `GRAB_ESTIMATE`, `DESTINATIONS`, `NOI_BAI_AIRPORT` — for now these are thin re-exports of the existing root-level files (no data changes)
- [ ] Create `core/calculation-engine/index.ts` re-exporting `isPeakHour`, `calculateExitTime`, `findNextCatchableTrip`, `calculateArrivalEstimate` from the existing root-level files
- [ ] Create `core/index.ts` as the top-level barrel: `export * from './types'`, `export * from './utils/time'`, `export * from './data'`, `export * from './calculation-engine'`
- [ ] Create `core/tsconfig.json` with `target: ES2020`, `module: ESNext`, `moduleResolution: bundler`, `strict: true`, `skipLibCheck: true`, `noEmit: true`, `include: ["./types", "./utils", "./data", "./calculation-engine", "./index.ts"]`
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] `cd web && npm test` and root `npm test` both still pass (proves the expand did not break the existing world)
- [ ] `git status` shows only `core/` additions; no other directories touched
- [ ] Commit with message `feat(core): scaffold shared module with barrel and tsconfig`
