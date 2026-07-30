# Plan: QUA-43 — Fix + sync Bus 152 SGN-T2 pickup string across data, tests, CONTEXT, wiki

> Linear: [QUA-43](https://linear.app/trinq/issue/QUA-43/fix-sgn-t2-bus-152-pickup-string-fix-sync-bus-152-sgn-t2-pickup-string)
> Branch name (Linear auto-generated): `triquang13/qua-43-fix-sgn-t2-bus-152-pickup-string-fix-sync-bus-152-sgn-t2`
> Created: 2026-07-31
> Scope: 1 task, 1 commit (per spec Further Notes)

## Global Constraints

These bind every implementation step. They are extracted verbatim from the
spec's "Implementation Decisions" and "Testing Decisions" sections and must
not be weakened without explicit human approval.

1. **Single source of truth:** the corrected pickup string lives in
   `core/data/busSchedules/sgn.ts`. No other file is allowed to be the
   authority for this string.
2. **Corrected string (verbatim):** `Làn B, đối diện cột 12 và cột 13 sảnh đến quốc tế`.
   The previous string (which referenced the wrong pillars at the international
   arrival hall) must not appear anywhere in the codebase after this task.
3. **Bus 86 stays untouched.** Its pickup points (`HAN-T1` cột 12, `HAN-T2`
   cột 14) are correct and outside scope. The implementer must not "fix" Bus
   86 pickup points even though they happen to mention "cột 12" — Bus 86's
   `cột 12` is a different pillar at a different terminal.
4. **Single commit lands all 4 surfaces** (data, 2 test files, `CONTEXT.md`,
   `wiki/pages/data-sources.md`). Splitting would leave the codebase
   temporarily inconsistent (data says X while tests assert Y).
5. **No code change in `web/src/components/Result/ResultPage.tsx` or any UI
   component.** The UI renders whatever string is in
   `selectedRoute.pickupPoints[i].location`; updating data + fixtures is
   sufficient.
6. **No change to the calculation engine or to `findNextCatchableTrip`.** The
   string is purely descriptive.
7. **No new test file.** The existing tests already cover the string;
   updating them is enough.
8. **`wiki/pages/data-sources.md` file-inventory fix:** the row that claims
   `core/data/busSchedule.ts` holds "Bus 86 (26 departures), Route 109, Route
   152" must be replaced with two rows:
   - `core/data/busSchedule.ts` → Bus 86
   - `core/data/busSchedules/sgn.ts` → Route 109, Route 152
9. **`last_verified` bumps:** both `wiki/pages/data-sources.md` and any wiki
   page whose `sources` change must bump `last_verified` to today
   (2026-07-31).
10. **Acceptance evidence (run, do not skip):**
    - `npx tsc --noEmit` exits 0
    - `npm test` exits 0
    - `npm run wiki:lint` exits 0 (no `C1 stale` flag on `data-sources.md`)
    - `rg -n "Làn B, đối diện cột 12 và cột 13 sảnh đến quốc tế"` (corrected
      string) returns at least one match, AND `rg -n` for the superseded
      pillar phrase (e.g. `Cột số 4` next to `sảnh đến quốc tế`) returns zero
      matches.

## Out of Scope (do NOT touch)

- Grab/ride-hail T2 pickup hint (`Bãi xe công nghệ quốc tế`, `Cột 5GF`).
  Different location, currently correct.
- The free inter-terminal shuttle (T1 ↔ T2 ↔ T3) at Làn B. Already noted as
  out of scope in the existing code comment.
- `findNextCatchableTrip`, the calculation engine, or the schedule itself.
- i18n / English translation. MVP is Vietnamese-only.
- New tests beyond updating existing assertions.
- Bus 86 pickup points (different terminals, different pillars — see Global
  Constraint #3).

---

## Task 1: Fix + sync Bus 152 SGN-T2 pickup string across data, tests, CONTEXT, wiki, SEO articles

### What to do

> **SCOPE EXPANDED (2026-07-31):** user-approved D1. Pre-flight scan missed
> that `web/src/routes/articles/Bus152Page.tsx` and
> `web/src/routes/articles/Bus152PageVI.tsx` also encode the wrong pillar
> numbers in SEO prose. These are user-facing (Google + travellers read them)
> and must be updated. The plan file itself
> (`docs/superpowers/plans/2026-07-31-qua-43-bus-152-sgn-t2-pickup.md`) used
> the old string in its Out-of-Scope section as a contrast example and must
> be rephrased.

The implementation surfaces are now:

1. **`core/data/busSchedules/sgn.ts`** — update `BUS_152.pickupPoints` entry
   for `SGN-T2` to the corrected string. Also update the source comment block
   immediately above `pickupPoints` (which currently describes the same wrong
   pillars) so the comment and data stay in sync.

2. **`core/tests/data/busSchedules/sgn.test.ts`** — update the assertion in
   the `BUS_152` describe block that pins the SGN-T2 pickup string to the new
   value. Rewrite the surrounding assertion comment to explain *why* the
   string changed (so future contributors don't silently revert it).

3. **`web/__tests__/components/Result/ResultPage.test.tsx`** — update the
   `sgnRoute` fixture's T2 `location` string to the new value. Verify the
   regression-guard test ("does NOT override bus pickup with Grab pickup
   hint") still passes — it should, because it matches on `Làn B` and
   `Cột 5GF` substrings, both of which remain in the rendered tree.

4. **`CONTEXT.md`** — find the Bus 152 → T2 bullet that mentions the pillar
   numbers and update it. The Grab/ride-hail T2 bullet (which mentions
   `Cột 5GF`) is a different location and stays untouched.

5. **`wiki/pages/data-sources.md`** — two edits in one page:
   - Update the Route 152 → T2 bullet to match the new string.
   - Fix the file-inventory row: split the existing
     `core/data/busSchedule.ts | Bus 86 (26 departures), Route 109, Route 152`
     row into two rows as specified in Global Constraint #8.
   - Bump `last_verified` to `2026-07-31`.

6. **`web/src/routes/articles/Bus152Page.tsx`** (English SEO article) —
   update any prose that mentions the wrong pillar numbers for the SGN-T2
   Bus 152 pickup. The exact wording may differ from the data string — it is
   user-facing prose, not the contract string. Update so the prose is
   internally consistent with the data, but do not invent copy beyond the
   pillar-number correction.

7. **`web/src/routes/articles/Bus152PageVI.tsx`** (Vietnamese SEO article) —
   same as #6 for the Vietnamese article.

8. **`docs/superpowers/plans/2026-07-31-qua-43-bus-152-sgn-t2-pickup.md`** —
   rephrase the Out-of-Scope section (which uses the old string as a
   contrast example) so the plan no longer contains the old string either.

### How to do it

- Use `StrReplace` (or `Edit`) for in-place edits. Preserve indentation.
- The two SEO articles are user-facing copy. Their exact wording is the
  maintainer's call, but the corrected pillar numbers (`cột 12` / `cột 13`)
  must appear wherever the old `Cột số 4` / `Cột số 5` appear.
- Do NOT touch other articles (`Bus86Page`, `Bus109Page`, etc.). The brief
  found no instances of the wrong pillar numbers in those files.
- After all files are updated, run the acceptance commands in this exact
  order:
  ```bash
  npx tsc --noEmit
  npm test
  npm run wiki:lint
  rg -n "Làn B, đối diện cột 12 và cột 13 sảnh đến quốc tế"
  ```
  All four must show no failures / no matches. The `rg` check is now
  repo-wide (no `--type` filter) because the article files are `.tsx` and
  `CONTEXT.md` is plain `.md`.
- Commit in one commit with message:
  ```
  fix(qua-43): sync Bus 152 SGN-T2 pickup string to cột 12/13 across data, tests, CONTEXT, wiki, SEO articles
  ```
  Body must reference the Linear URL.

### What evidence to capture in the report

- The exact `npx tsc --noEmit` exit code.
- The exact `npm test` summary line (e.g. "Tests: X passed, Y total").
- The exact `npm run wiki:lint` exit code and the absence of any `C1 stale`
  line for `data-sources.md`.
- The empty output of the repo-wide `rg` for the old string.
- The single commit SHA + subject.

### Acceptance criteria

All of these must hold:

- [ ] `BUS_152.pickupPoints[].location` for `SGN-T2` equals the verbatim
      corrected string in Global Constraint #2.
- [ ] The old string is not present anywhere in the repo (use repo-wide
      `rg` to verify, must return zero matches).
- [ ] The unit test asserting `BUS_152` T2 pickup uses the new string.
- [ ] The `sgnRoute` fixture in
      `web/__tests__/components/Result/ResultPage.test.tsx` uses the new
      string for its T2 entry.
- [ ] `wiki/pages/data-sources.md` reflects the new string in its Route 152
      T2 bullet AND reflects the corrected file inventory (two rows).
- [ ] `wiki/pages/data-sources.md` `last_verified` is `2026-07-31`.
- [ ] `web/src/routes/articles/Bus152Page.tsx` mentions `cột 12` /
      `cột 13` (not `Cột số 4` / `Cột số 5`) for SGN-T2.
- [ ] `web/src/routes/articles/Bus152PageVI.tsx` mentions `cột 12` /
      `cột 13` (not `Cột số 4` / `Cột số 5`) for SGN-T2.
- [ ] `docs/superpowers/plans/2026-07-31-qua-43-bus-152-sgn-t2-pickup.md`
      no longer contains the old string.
- [ ] `npx tsc --noEmit` exits 0.
- [ ] `npm test` exits 0.
- [ ] `npm run wiki:lint` exits 0.
- [ ] Exactly one commit is created on the branch (no intermediate commits).
- [ ] No file outside the 8 named surfaces is modified (lock files should not
      change here, but flag if they do).