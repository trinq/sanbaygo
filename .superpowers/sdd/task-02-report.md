# Task 2 Report: Populate `routeNumber` in guides registry

## What I implemented

Updated `GUIDES_REGISTRY` to populate `routeNumber` through the existing `getRouteNumber()` helper for every localized entry whose `articleId` identifies a supported bus route:

- 2 entries for `bus-86` now resolve to `86`.
- 2 entries for `bus-109` now resolve to `109`.
- 2 entries for `bus-152` now resolve to `152`.
- All other entries continue to omit `routeNumber`.

No registry entries were reordered, and no existing `articleId`, `href`, `hub`, or `order` values were changed.

## Test results

- Command: `cd web && npx tsc --noEmit`
- Status: **FAILED due to an unrelated pre-existing change**
- Diagnostic: `src/routes/GuidesPage.tsx(12,3): error TS6133: 'resolveGuideDescription' is declared but its value is never read.`
- The edited file `web/src/seo/guidesRegistry.ts` has no linter diagnostics.
- `npm run wiki:lint` completed with 0 errors and 14 pre-existing staleness warnings.

## Files changed

- `web/src/seo/guidesRegistry.ts`
  - Registry entries present: 34 (the task brief states 33).
  - Entries updated: 6 total localized bus-route entries.
  - Route distribution: Bus 86 × 2, Bus 109 × 2, Bus 152 × 2.
- `.superpowers/sdd/task-02-report.md`
  - Added this implementation and verification report.

## Self-review findings

- Confirmed all entries with exact `articleId` values `bus-86`, `bus-109`, and `bus-152` have the expected route number.
- Confirmed `bus-109-vs-152` is not treated as a route entry and has no `routeNumber` field.
- Confirmed all other non-bus entries omit `routeNumber`.
- Confirmed the diff changes only the six intended registry rows; entry order and existing field values are preserved.
- TypeScript acceptance remains blocked by the unrelated unused import in the user's existing `GuidesPage.tsx` worktree change; that file was intentionally not modified as part of this task.
