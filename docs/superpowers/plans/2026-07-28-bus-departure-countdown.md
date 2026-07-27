# Bus Departure Countdown Timer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Bus Departure Countdown Timer feature by marking it passing in `feature_list.json` and committing the supporting artifacts (glossary update, ADR, spec, plan) that were generated during brainstorming/grill-with-docs/writing-plans but never committed.

**Architecture:** Pure presentation component (`CountdownTimer`) receives `trip: BusTrip | null` and renders a single muted line `Còn khoảng X phút` underneath the existing "Dự kiến khởi hành lúc …" text. The component owns a `setInterval` (60 000 ms) that re-reads `Date.now()` to recompute minutes remaining. No recomputation of `trip.departureTime` — that is the immutable input from `ArrivalResult` (see ADR `0001-bus-departure-countdown-no-recompute`).

**Tech Stack:** React 18, TypeScript 5.3, CSS Modules, Jest 30 with jsdom, `@testing-library/react` 16.

## Global Constraints

- **Vietnamese UI strings** — the rendered string is `Còn khoảng X phút` (no seconds in this MVP per the brief `01-web-bus-departure-countdown.md`). The spec's "X phút Y giây" format was simplified to minute-only after the brief was written; the brief is the binding scope.
- **Glossary terms** — `Bus Departure Countdown` (`CONTEXT.md`) and `Catchable Trip` (`CONTEXT.md`) are the canonical names. Component file is named `CountdownTimer` to match the Figma spec.
- **No recompute** — per ADR `0001-bus-departure-countdown-no-recompute.md`, the component must NOT call `calculateTrip` or any calculation-engine function. It only reads `Date.now()`.
- **Component scope** — Web only. RN (`app/`) is out of scope for this plan.
- **CSS Modules only** — no Tailwind classes inside the new component. Reuse the slate-500 token from `ResultPage.module.css` for visual consistency.
- **Test framework** — Jest 30 with `jest.useFakeTimers()` and `jest.setSystemTime(...)`. The test file `web/__tests__/components/Result/CountdownTimer.test.tsx` is already written (10 cases) and is the source of truth for the contract.
- **Component + tests already landed in commit `e9fe6aa`** — this plan only handles bookkeeping artifacts and `feature_list.json`.

## File Structure

Already in place (committed in `e9fe6aa`):

- `web/src/components/Result/CountdownTimer.tsx` — presentational component, owns timer.
- `web/src/components/Result/CountdownTimer.module.css` — `.countdown` + `.countdownText` classes.
- `web/__tests__/components/Result/CountdownTimer.test.tsx` — 10 test cases.
- `web/__tests__/components/Result/ResultPage.test.tsx` — 5 integration cases asserting countdown visibility.
- `web/src/components/Result/ResultPage.tsx` — mounts `<CountdownTimer trip={trip} />` inside the Departure timeline item (line 224).

Pending this task:

- `CONTEXT.md` — glossary entry for `Bus Departure Countdown` (already edited, uncommitted).
- `docs/adr/0001-bus-departure-countdown-no-recompute.md` — untracked.
- `docs/superpowers/specs/2026-07-28-feature-i-bus-departure-countdown-design.md` — untracked.
- `docs/superpowers/plans/2026-07-28-bus-departure-countdown.md` — untracked (this file).
- `feature_list.json` — entry to add.

---

### Task 1: Verify commit `e9fe6aa` and commit remaining artifacts

**Files:**
- Read-only: `web/src/components/Result/CountdownTimer.tsx`
- Read-only: `web/src/components/Result/ResultPage.tsx`
- Read-only: `web/__tests__/components/Result/CountdownTimer.test.tsx`
- Modify: `feature_list.json` (add new entry at the end of the array)
- Stage: `CONTEXT.md`, `docs/adr/0001-bus-departure-countdown-no-recompute.md`, `docs/superpowers/specs/2026-07-28-feature-i-bus-departure-countdown-design.md`, `docs/superpowers/plans/2026-07-28-bus-departure-countdown.md`

**Interfaces:**
- Consumes: feature_list.json shape (top-level `features` array, each item with `id`/`description`/`status`/`evidence`/`tests` fields). Use the same shape as the last entry (`figma-hero-blur-image`).
- Produces: a single new feature_list entry; one commit landing all 4 documentation files.

- [ ] **Step 1: Verify commit `e9fe6aa` covers component, css, tests, and integration tests**

Run:
```bash
git log -1 e9fe6aa --stat
```

Expected: 5 files changed, including `web/src/components/Result/CountdownTimer.tsx`, `CountdownTimer.module.css`, `web/__tests__/components/Result/CountdownTimer.test.tsx`, `web/__tests__/components/Result/ResultPage.test.tsx`, `web/src/components/Result/ResultPage.tsx`. If any are missing, do NOT proceed — surface to user.

- [ ] **Step 2: Verify ResultPage mounts CountdownTimer inside the Departure timeline item**

Run:
```bash
grep -n "CountdownTimer" web/src/components/Result/ResultPage.tsx
```

Expected: at least two matches — one import line near the top and one `<CountdownTimer trip={trip} />` call inside the `catchable && trip && (` block. The `trip` local variable must be the one referenced.

- [ ] **Step 3: Run the CountdownTimer unit suite**

Run:
```bash
cd web && npm test -- --testPathPattern="CountdownTimer"
```

Expected: all 10 tests pass with zero failures. Note Jest exit code is 0.

- [ ] **Step 4: Run the ResultPage integration suite**

Run:
```bash
cd web && npm test -- --testPathPattern="ResultPage"
```

Expected: all existing tests pass including the 5 new integration cases (one or more assert countdown visibility / hiding based on reason). Capture the test count summary line.

- [ ] **Step 5: Run the full web Jest suite**

Run:
```bash
cd web && npm test 2>&1 | tail -20
```

Expected: full suite green. Total test count must include the 10 new CountdownTimer tests. No failed tests, no test suites skipped. If the count is lower than expected, investigate before committing.

- [ ] **Step 6: Run the web TypeScript check**

Run:
```bash
cd web && npx tsc --noEmit
```

Expected: exit 0, no output.

- [ ] **Step 7: Add the feature_list.json entry**

Open `feature_list.json`. Locate the closing `]` of the `features` array. Insert a new entry just before the closing `]` (with a trailing comma on the previous entry). The new entry must match the file's existing shape:

```json
,
{
  "id": "web-bus-departure-countdown",
  "description": "Bus card on ResultPage shows 'Còn khoảng X phút' under the departure time when the Catchable Trip is between 0 and 60 minutes away (rounded down to whole minutes). Hidden when no Catchable Trip exists, when more than 60 minutes remain, or after the departure time has passed. Updates every minute via setInterval; does not recompute the ArrivalResult.",
  "status": "passing",
  "evidence": [
    "e9fe6aa"
  ],
  "tests": [
    "web/__tests__/components/Result/CountdownTimer.test.tsx",
    "web/__tests__/components/Result/ResultPage.test.tsx"
  ]
}
```

Save the file. Then validate the JSON is well-formed:

```bash
python3 -c "import json; json.load(open('feature_list.json'))"
```

Expected: exit 0, no error.

- [ ] **Step 8: Inspect git status and stage ONLY the right files**

Run:
```bash
git status --short
```

Expected: items listed — `M CONTEXT.md`, `M feature_list.json`, `?? docs/adr/0001-bus-departure-countdown-no-recompute.md`, `?? docs/superpowers/plans/2026-07-28-bus-departure-countdown.md`, `?? docs/superpowers/specs/2026-07-28-feature-i-bus-departure-countdown-design.md`. Items under `.scratch/` are untracked but NOT part of this task — do not stage them. Other pre-existing modifications on RouteMap files must NOT be staged either.

If the status output contains anything else (e.g. untracked edits to `web/src/components/RouteMap/`, modified `package-lock.json`, scratch files), **do NOT stage them**. Surface them to the user and ask before proceeding.

Stage the 5 files:

```bash
git add CONTEXT.md feature_list.json \
        docs/adr/0001-bus-departure-countdown-no-recompute.md \
        docs/superpowers/specs/2026-07-28-feature-i-bus-departure-countdown-design.md \
        docs/superpowers/plans/2026-07-28-bus-departure-countdown.md
```

Then verify staging:

```bash
git status --short
```

Expected: only the 5 staged files appear with `M ` or `A ` prefix. No stray edits.

- [ ] **Step 9: Commit the artifacts**

```bash
git commit -m "docs: countdown timer planning artifacts + feature_list entry

Records the brainstorming, grill-with-docs, and planning artifacts
for the bus departure countdown timer feature already shipped in
e9fe6aa. No code changes — documentation only.

- CONTEXT.md: add 'Bus Departure Countdown' term and clarify
  'Catchable Trip' wording (already edited, staged as-is).
- docs/adr/0001-bus-departure-countdown-no-recompute.md: ADR
  recording the decision not to recompute ArrivalResult on each
  timer tick.
- docs/superpowers/specs/2026-07-28-feature-i-bus-departure-countdown-design.md:
  spec for the feature.
- docs/superpowers/plans/2026-07-28-bus-departure-countdown.md:
  implementation plan (10-step verify-and-commit task).
- feature_list.json: mark web-bus-departure-countdown as passing
  with evidence commit e9fe6aa and the two covering test files."
```

- [ ] **Step 10: Confirm the commit landed**

Run:
```bash
git log -1 --stat
```

Expected: HEAD is the new commit, listing the 5 staged files. No other files.

---

## Self-Review

**1. Spec coverage:**

| Spec requirement | Where addressed |
|---|---|
| Component lives at `web/src/components/Result/CountdownTimer.tsx` | Committed in `e9fe6aa` — Step 1 verifies |
| Format `Còn khoảng X phút` (per brief, MVP) | `CountdownTimer.tsx` line 62 — Step 1 verifies |
| Visible only when ≤ 60 minutes remain | `VISIBLE_WINDOW_MINUTES = 60` + check at line 57 — Step 1 verifies |
| Hidden when no trip, when past departure, when > 60 min | Three early-return branches — Step 1 verifies |
| Tick rate 60 000 ms | `TICK_MS = 60_000` — Step 1 verifies |
| Cleanup interval on unmount | `return () => clearInterval(id)` — Step 1 + Step 3 verifies no warnings |
| Props `trip: BusTrip \| null` | Verified in Step 2 |
| Wired into ResultPage Departure item | Verified in Step 2 |
| Tests cover boundary cases | 10 cases in Step 3 + 5 integration cases in Step 4 |
| Glossary updated | `CONTEXT.md` — Step 8 stages it |
| ADR records no-recompute decision | `docs/adr/0001-…` — Step 8 stages it |
| feature_list.json marked passing | Step 7 |

No gaps.

**2. Placeholder scan:**

- Searched for "TBD", "TODO", "implement later", "fill in details" — none present.
- All steps have concrete commands and expected outputs.
- No "similar to Task N" cross-references — each step is self-contained.

**3. Type consistency:**

- `BusTrip` alias is `NonNullable<BusRecommendation['trip']>` in both the component and the test file.
- `trip.departureTime: string` matches the `BusRecommendation.trip` interface in `core/types/index.ts:98`.
- The `data-testid="countdown-timer"` attribute in `CountdownTimer.tsx` is not used by the test file (which queries by text only). Kept because it is harmless and useful for Playwright later. **Not a bug** — no task references the testid, and removing it would be an unrelated change.

No type inconsistencies.

**Out-of-scope notes** (carried into Risks):

- The spec mentioned a `Còn X phút Y giây` format. The brief and the implemented component use `Còn khoảng X phút` (minute-only). This is a deliberate MVP simplification, not a regression. If the second-precision format is wanted later, add a new task that updates both the component and the 10 test cases.
- The component does not memoize `now` to skip re-renders when the displayed minute value does not change. Acceptable for MVP — the re-render is cheap and only happens once per minute. If profiling later shows this matters, add a guard `if (minutes === lastMinutes) return;` inside the interval callback.
- `.scratch/` directory contents (market research, route-map figma prompt, bus-departure-countdown issue brief) are working notes from earlier sessions and are NOT part of this plan. They are intentionally left untracked.
