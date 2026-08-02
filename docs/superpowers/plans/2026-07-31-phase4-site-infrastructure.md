# Phase 4 — Site Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the 5 Phase 4 infrastructure/process tickets from the keyword-research breakdown (`docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md` lines 93–101): a 23-keyword CSV, an E2E parity test for the VI countdown, a static-audit script enforcing ≥2 internal links per article, a documented 6-month refresh cadence, and a human-only GSC/GA4/Google Ads runbook.

**Architecture:** Four of the five tickets are code/process artifacts (CSV, README, audit script, refresh docs, E2E test). One ticket (`kw-0-gsc-setup`) is documentation-only — the agent writes the runbook but cannot mark it `passing` because the user owns DNS + Google account access. The audit script is a new Node.js tool that uses static analysis (no jsdom, no Playwright runtime) over `web/src/routes/articles/` files, with paths cross-checked against `web/src/seo/pageRegistry.ts` (the same single source of truth used by the sitemap generator).

**Tech Stack:** Node.js (audit script + CSV parsing via one-liner), existing Vite/React/Playwright stack, existing `web/src/components/Result/CountdownTimer.tsx` (already VI-hardcoded — confirmed at line 18), existing `web/src/seo/pageRegistry.ts` (33 entries), Jest (web test runner), Playwright (e2e test runner).

## Global Constraints

- **Domain:** `frylane.com` (single domain, EN root + VI `/vi/…`) — never mix EN/VI in one page.
- **VN UI:** All VI user-facing text in Vietnamese.
- **English pronouns in code/scripts:** Script output messages in English (acceptable per `kw-0-sitemap-auto` precedent for non-UI tooling).
- **TDD everywhere code is added:** Each task writes a failing test first, watches it fail, writes the minimum code to pass, then commits. Exceptions: pure documentation tasks (Task 4 refresh cadence, Task 5 GSC runbook) — ask user before skipping TDD.
- **Frequent commits:** one commit per task; message `feat(kw-0): …` or `docs(kw-0): …`.
- **Evidence before assertions:** every task records actual command output in `feature_list.json` `evidence` field.
- **No human-task tracking:** `kw-0-gsc-setup` is documented-only; the agent does NOT add code changes for it. The user owns DNS + Google account work.
- **Verification commands** (per AGENTS.md):
  - `cd web && npx tsc --noEmit` → exit 0
  - `cd web && npm test` → green (note: 4 pre-existing `Bus86Page.*` failures are unrelated — they pass on the post-BrandMark baseline)
  - `cd web && npx playwright test e2e/<spec>.spec.ts --project=chromium` → green

---

## File Structure

This plan touches the following files. New files are marked **(N)**; modified files are marked **(M)**.

| File | Tasks | Purpose |
|------|-------|---------|
| `docs/seo/keyword-sheet.csv` **(N)** | T1 | 23-keyword living document from the brief |
| `docs/seo/README.md` **(N)** | T1 | Explains CSV + refresh cadence |
| `web/src/App.tsx` **(M)** | T2 | Add `/vi/ket-qua` route (parity gap) |
| `web/e2e/seo.spec.ts` **(M)** | T2 | Add 1 Playwright test for VI countdown |
| `web/scripts/audit-internal-links.mjs` **(N)** | T3 | Static audit script (≥2 internal links) |
| `web/__tests__/scripts/audit-internal-links.test.mjs` **(N)** | T3 | Jest tests for the audit script |
| `web/package.json` **(M)** | T3 | Add `audit:internal-links` npm script |
| `web/src/routes/articles/*.tsx` **(M)** | T3 (conditional) | Add internal links to any article failing audit |
| `AGENTS.md` **(M)** | T4 | Append "Content Refresh Cadence (SEO)" section |
| `docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md` **(M)** | T5 | Append "Appendix: How to complete kw-0-gsc-setup" |
| `feature_list.json` **(M)** | T1–T5 | Mark each ticket `passing` (or `pending` for T5) with `evidence` field |

**Tasks do NOT share intermediate state** — each is independently shippable. Task 3 has an optional sub-step (Step 5) that only runs if the audit reveals real link-count violations.

---

## Task 1: kw-0-keyword-sheet — Create CSV from brief

**Files:**
- Create: `docs/seo/keyword-sheet.csv` (24 lines: 1 header + 23 data rows, 10 columns)
- Create: `docs/seo/README.md` (~25 lines, explains CSV + refresh cadence)
- Modify: `feature_list.json` — set `kw-0-keyword-sheet.status = "passing"`, fill `evidence`

**Interfaces:**
- Consumes: 23 keyword rows from `docs/keyword-research-brief-airport-bus-vn.md` §4 (line 197 "20 từ khóa mẫu" table — the table actually contains 23 entries, including #20 `frylane`, #21 #22 #23 VN keywords). Each row has: `keyword | lang | source | cluster | intent | volume_range | kd | tier | target_page | status`.
- Produces: A CSV file the user can open in Excel/Google Sheets. No consumer in code yet — the brief explicitly says it's a living document for the user.

### Source row mapping (verbatim from brief §4)

23 rows, all status = `passing` except #21 (`xe buýt sân bay nội bài` → `/vi/xe-buyt-san-bay-noi-bai` is `pending`).

| # | keyword | lang | cluster | intent | volume_range | kd | tier | target_page | status |
|---|---------|------|---------|--------|--------------|----|------|-------------|--------|
| 1 | bus from airport to city center | EN | Pillar/Hub | I | 8100-14800 | 38 | 3 | /bus-from-airport-to-city | passing |
| 2 | bus 86 hanoi airport | EN | Bus 86 | I | 1300-2400 | 28 | 1 | /bus-86-hanoi-airport | passing |
| 3 | bus 109 saigon airport | EN | Bus 109 | I | 880-1600 | 25 | 1 | /bus-109-saigon-airport | passing |
| 4 | bus 152 saigon fare | EN | Bus 152 | I | 590-1300 | 22 | 1 | /bus-152-saigon-fare | passing |
| 5 | cheapest way from airport hanoi | EN | Comparison | C | 1600-4400 | 41 | 2 | /cheapest-way-hanoi-airport | passing |
| 6 | cheapest way from airport saigon district 1 | EN | Comparison | C | 720-1600 | 35 | 2 | /cheapest-way-saigon-airport-district-1 | passing |
| 7 | grab vs bus airport hanoi | EN | Grab vs Bus | C | 480-1000 | 30 | 2 | /grab-vs-bus-hanoi-airport | passing |
| 8 | noi bai airport to old quarter | EN | HAN Old Quarter | I+T | 3200-6600 | 45 | 3 | /how-to-get-from-hanoi-airport-to-city | passing |
| 9 | tan son nhat airport to district 1 | EN | SGN District 1 | I+T | 4400-8100 | 48 | 3 | /cheapest-way-saigon-airport-district-1 | passing |
| 10 | airport scam vietnam taxi | EN | Scam warning | I | 1300-2900 | 42 | 2 | /airport-scam-vietnam-taxi | passing |
| 11 | how to get from hanoi airport to city | EN | HAN hub | I | 2400-5400 | 44 | 2 | /how-to-get-from-hanoi-airport-to-city | passing |
| 12 | hanoi airport to hoan kiem lake | EN | HAN Old Quarter | I+T | 1600-3200 | 39 | 2 | /hanoi-airport-to-hoan-kiem-lake | passing |
| 13 | tan son nhat airport bus 109 vs 152 | EN | Bus 109 vs 152 | C | 90-210 | 18 | 1 | /bus-109-vs-152-tan-son-nhat | passing |
| 14 | is grab safe at hanoi airport reddit | EN | Scam/Trust | I | 90-320 | 22 | 1 | /is-grab-safe-hanoi-airport | passing |
| 15 | late night airport transfer hanoi | EN | HAN late-night | I+T | 320-720 | 30 | 2 | /hanoi-airport-late-night-transfer | passing |
| 16 | airport bus luggage fee vietnam | EN | Bus 86/109 detail | I | 210-480 | 25 | 1 | /airport-bus-luggage-fee-vietnam | passing |
| 17 | t2 international noibai how long to exit | EN | T2 immigration | I | 480-1000 | 26 | 1 | /noibai-t2-exit-time | passing |
| 18 | 8pm arrival hanoi airport bus still running | EN | Late-night scenario | I | 50-170 | 15 | 1 | /hanoi-airport-late-night-bus | passing |
| 19 | what to do at noibai airport first time | EN | First-timer | I | 1300-3200 | 35 | 2 | /noibai-airport-first-time-guide | passing |
| 20 | frylane | EN | Brand | N | 0 | 0 | 0 | / | passing |
| 21 | xe buýt sân bay nội bài | VN | Bus 86 (VN) | I | 2900-5400 | 28 | 1 | /vi/xe-buyt-san-bay-noi-bai | pending |
| 22 | tuyến 86 nội bài giờ | VN | Bus 86 (VN) | I | 1300-2400 | 22 | 1 | /vi/tuyen-86-noi-bai-gio | passing |
| 23 | grab nội bài giá bao nhiêu 2026 | VN | Grab estimate (VN) | C | 880-1600 | 32 | 2 | /vi/grab-noi-bai-gia-bao-nhieu | passing |

> **Note:** `target_page` values are verified against the final shipped URLs in `web/src/seo/pageRegistry.ts` and `web/src/App.tsx`. Rows 8 + 9 are intentionally mapped to existing hub pages (since `kw-8` and `kw-9` are deferred — see ticket notes in the breakdown plan).

- [ ] **Step 1: Create CSV file**

Run:
```bash
mkdir -p docs/seo
```

Write `docs/seo/keyword-sheet.csv` with this exact content (24 lines, no trailing newline beyond the last row):

```csv
keyword,lang,source,cluster,intent,volume_range,kd,tier,target_page,status
bus from airport to city center,EN,brief,Pillar/Hub,I,8100-14800,38,3,/bus-from-airport-to-city,passing
bus 86 hanoi airport,EN,brief,Bus 86,I,1300-2400,28,1,/bus-86-hanoi-airport,passing
bus 109 saigon airport,EN,brief,Bus 109,I,880-1600,25,1,/bus-109-saigon-airport,passing
bus 152 saigon fare,EN,brief,Bus 152,I,590-1300,22,1,/bus-152-saigon-fare,passing
cheapest way from airport hanoi,EN,brief,Comparison,C,1600-4400,41,2,/cheapest-way-hanoi-airport,passing
cheapest way from airport saigon district 1,EN,brief,Comparison,C,720-1600,35,2,/cheapest-way-saigon-airport-district-1,passing
grab vs bus airport hanoi,EN,brief,Grab vs Bus,C,480-1000,30,2,/grab-vs-bus-hanoi-airport,passing
noi bai airport to old quarter,EN,brief,HAN Old Quarter,I+T,3200-6600,45,3,/how-to-get-from-hanoi-airport-to-city,passing
tan son nhat airport to district 1,EN,brief,SGN District 1,I+T,4400-8100,48,3,/cheapest-way-saigon-airport-district-1,passing
airport scam vietnam taxi,EN,brief,Scam warning,I,1300-2900,42,2,/airport-scam-vietnam-taxi,passing
how to get from hanoi airport to city,EN,brief,HAN hub,I,2400-5400,44,2,/how-to-get-from-hanoi-airport-to-city,passing
hanoi airport to hoan kiem lake,EN,brief,HAN Old Quarter,I+T,1600-3200,39,2,/hanoi-airport-to-hoan-kiem-lake,passing
tan son nhat airport bus 109 vs 152,EN,brief,Bus 109 vs 152,C,90-210,18,1,/bus-109-vs-152-tan-son-nhat,passing
is grab safe at hanoi airport reddit,EN,brief,Scam/Trust,I,90-320,22,1,/is-grab-safe-hanoi-airport,passing
late night airport transfer hanoi,EN,brief,HAN late-night,I+T,320-720,30,2,/hanoi-airport-late-night-transfer,passing
airport bus luggage fee vietnam,EN,brief,Bus 86/109 detail,I,210-480,25,1,/airport-bus-luggage-fee-vietnam,passing
t2 international noibai how long to exit,EN,brief,T2 immigration,I,480-1000,26,1,/noibai-t2-exit-time,passing
8pm arrival hanoi airport bus still running,EN,brief,Late-night scenario,I,50-170,15,1,/hanoi-airport-late-night-bus,passing
what to do at noibai airport first time,EN,brief,First-timer,I,1300-3200,35,2,/noibai-airport-first-time-guide,passing
frylane,EN,brief,Brand,N,0,0,0,/,passing
xe buýt sân bay nội bài,VN,brief,Bus 86 (VN),I,2900-5400,28,1,/vi/xe-buyt-san-bay-noi-bai,pending
tuyến 86 nội bài giờ,VN,brief,Bus 86 (VN),I,1300-2400,22,1,/vi/tuyen-86-noi-bai-gio,passing
grab nội bài giá bao nhiêu 2026,VN,brief,Grab estimate (VN),C,880-1600,32,2,/vi/grab-noi-bai-gia-bao-nhieu,passing
```

- [ ] **Step 2: Verify CSV parses correctly**

Run:
```bash
node -e "const fs=require('fs');const lines=fs.readFileSync('docs/seo/keyword-sheet.csv','utf8').trim().split('\n');console.log('rows:',lines.length,'header:',lines[0].split(',').length,'first-data-cols:',lines[1].split(',').length);if(lines.length!==24)process.exit(1);if(lines[0].split(',').length!==10)process.exit(1);"
```

Expected output: `rows: 24 header: 10 first-data-cols: 10` and exit code 0.

- [ ] **Step 3: Create `docs/seo/README.md`**

Write `docs/seo/README.md` with this exact content:

```markdown
# SEO Data

Curated SEO artifacts for `frylane.com`.

## Files

- `keyword-sheet.csv` — 23 keywords from the
  [`docs/keyword-research-brief-airport-bus-vn.md`](../keyword-research-brief-airport-bus-vn.md)
  §4 table. Columns: `keyword | lang | source | cluster | intent | volume_range | kd | tier | target_page | status`.
  `status` is `passing` for shipped pages, `pending` for not yet built (currently
  only `[kw-21 xe buýt sân bay nội bài]` is `pending`).

## Refresh cadence

This file is a **living document**. Update monthly per the brief §3.1 GSC 4-filter audit:

1. Run GSC `Performance > Search results` for the last 16 months.
2. Apply the 4 filters: striking distance (position 11–30), high-imp-low-CTR (pos 1–10 with CTR < 3%), zero-click, no-dedicated-page.
3. Add new keyword rows once they cross 100 impressions/month.
4. Update `volume_range` and `kd` columns when Google Keyword Planner data refreshes.
5. Set `status = passing` when the matching article is shipped; `pending` otherwise.

Owner: human (GSC + Google Ads account access required).
```

- [ ] **Step 4: Update `feature_list.json`**

In `feature_list.json`, find the existing `kw-0-keyword-sheet` entry (around the Phase 0 process section). Update its fields:

- Set `"status": "passing"`.
- Replace `"evidence": ""` with:
  ```
  Created docs/seo/keyword-sheet.csv (24 lines: 1 header + 23 data rows, 10 columns). Created docs/seo/README.md explaining the file + refresh cadence. Verified CSV row count via: node -e ... → rows: 24 header: 10 first-data-cols: 10.
  ```

- [ ] **Step 5: Commit**

```bash
git add docs/seo/keyword-sheet.csv docs/seo/README.md feature_list.json
git commit -m "feat(kw-0-keyword-sheet): ship 23-keyword CSV from brief + README"
```

---

## Task 2: kw-0-bus-departure-countdown-vi — VI-side parity QA pass

**Files:**
- Modify: `web/e2e/seo.spec.ts` — add 1 Playwright test for VI countdown
- Modify: `web/src/App.tsx` — add `/vi/ket-qua` route (likely needed — see Step 0 pre-flight)
- Modify: `feature_list.json` — set `kw-0-bus-departure-countdown-vi.status = "passing"`, fill `evidence`

**Interfaces:**
- Consumes: Existing `CountdownTimer` component (`web/src/components/Result/CountdownTimer.tsx`) — already hardcoded with Vietnamese text `Còn khoảng X phút` (line 18, 22). No translation hook needed.
- Consumes: Existing `ResultRoute` (`web/src/App.tsx:47-92`) — accepts `airport`, `flightTime`, `destination`, `terminal`, `baggage`, `flightType` URL params.
- Produces: One Playwright test that loads `/vi/ket-qua?...` with a flightTime ~30 minutes before the next bus departure, then asserts the countdown text appears.

- [ ] **Step 0 (pre-flight): Verify the VI countdown route exists or not**

Run:
```bash
grep -n "vi/ket-qua\|/vi/.*ResultRoute\|/vi/.*Result" web/src/App.tsx
```

If no match, **the VI route is missing** — this is the parity bug. You'll add it in Step 3.

If a match exists (e.g., a `<Route path="/vi/ket-qua" />`), skip Step 3 and go directly from Step 1 → Step 2 → Step 4.

- [ ] **Step 1: Write the failing Playwright test**

Open `web/e2e/seo.spec.ts` and add this test inside the existing `test.describe('SEO Routes', ...)` block (after the last existing test, before the closing `})`):

```typescript
  // ── Phase 4: kw-0-bus-departure-countdown-vi ──────────────────────────
  // Verify the bus-departure countdown UI ("Còn khoảng X phút") renders
  // on the VI side at /vi/ket-qua/, mirroring the EN side parity.

  test('bus-departure countdown renders on VI side at /vi/ket-qua/', async ({ page }) => {
    // Bus 86 departs at 14:50 daily; landing at 14:00 → 30 min until departure.
    await page.goto(
      `${BASE}/vi/ket-qua?airport=HAN&terminal=han-t1&baggage=carry-on&flightType=international&flightTime=14:00&destination=hoan-kiem`,
      { waitUntil: 'networkidle' },
    );
    const countdown = page.getByTestId('countdown-timer');
    await expect(countdown).toBeVisible();
    await expect(countdown).toContainText(/Còn khoảng/);
  });
```

- [ ] **Step 2: Run test to verify it fails (or passes)**

Run:
```bash
cd web && npx playwright test e2e/seo.spec.ts -g "bus-departure countdown renders on VI side" --project=chromium
```

Expected: **FAIL** with timeout / 404 / "no element found" because the `/vi/ket-qua/` route doesn't yet mount the `ResultRoute` (per Step 0 pre-flight).

If the test PASSES (route already exists), skip Steps 3 + 5, go straight to Step 4.

- [ ] **Step 3: Add the missing `/vi/ket-qua` route**

Open `web/src/App.tsx` and locate the existing `<Route path="/ket-qua" element={<ResultRoute />} />` (around line 107). Also locate the `<Route path="/vi/guides" element={<GuidesPageVI />} />` line (around line 139) and the `<Route path="/vi/*" element={<HomePageVI />} />` catch-all (around line 140).

Insert this new route **before** the `/vi/*` catch-all (after the `/vi/guides` route is fine):

```tsx
            <Route path="/vi/ket-qua" element={<ResultRoute />} />
```

(No new import needed — `ResultRoute` is already in scope.)

- [ ] **Step 4: Re-run the Playwright test**

Run:
```bash
cd web && npx playwright test e2e/seo.spec.ts -g "bus-departure countdown renders on VI side" --project=chromium
```

Expected: `1 passed (chromium)`. The test exercises the same `CountdownTimer` already covered by `CountdownTimer.test.tsx` — the difference is **end-to-end** (React Router + VI route + CountdownTimer on the actual result page).

If the test fails for a *different* reason (e.g., `getByTestId('countdown-timer')` not found), the bug is that the form data doesn't yield a catchable bus. Adjust the test URL params (try a different `flightTime` closer to a known Bus 86 departure) and re-run.

- [ ] **Step 5: Verify all SEO tests still pass**

Run:
```bash
cd web && npx playwright test e2e/seo.spec.ts --project=chromium
```

Expected: All previous tests pass + the 1 new test passes.

Run:
```bash
cd web && npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 6: Update `feature_list.json`**

Find the `kw-0-bus-departure-countdown-vi` entry. Update:

- Set `"status": "passing"`.
- Replace `"evidence": ""` with:
  ```
  Added 1 Playwright test to web/e2e/seo.spec.ts that loads /vi/ket-qua/ with flightTime=14:00 (Bus 86 14:50 → 30 min countdown) and asserts [data-testid='countdown-timer'] is visible with text matching /Còn khoảng/. Test passes on chromium. tsc --noEmit exit 0. END-TO-END parity confirmed for VI side. Note: also added /vi/ket-qua route to web/src/App.tsx (was missing — EN/VI parity gap).
  ```

- [ ] **Step 7: Commit**

```bash
git add web/e2e/seo.spec.ts web/src/App.tsx feature_list.json
git commit -m "feat(kw-0-bus-departure-countdown-vi): E2E parity test + vi/ket-qua route"
```

---

## Task 3: kw-0-internal-link-graph — Audit script enforcing ≥2 internal links per article

**Files:**
- Create: `web/scripts/audit-internal-links.mjs`
- Create: `web/__tests__/scripts/audit-internal-links.test.mjs`
- Modify: `web/package.json` — add `"audit:internal-links": "node scripts/audit-internal-links.mjs"` script
- Modify (conditional): one or more `web/src/routes/articles/*Page.tsx` files if the audit reveals violations
- Modify: `feature_list.json` — set `kw-0-internal-link-graph.status = "passing"`, fill `evidence`

**Interfaces:**
- Consumes: All `*Page.tsx` and `*PageVI.tsx` files in `web/src/routes/articles/` (currently 33 files).
- Consumes: `web/src/seo/pageRegistry.ts` `PAGE_REGISTRY` (single source of truth for valid internal paths).
- Produces: A console report listing each article with # of frylane.com internal links. Exits 1 if any article has < 2 internal links.

**Internal-link identification rule:** A "frylane.com internal link" is any of:
1. A JSX `<Link to="/path">` from `react-router-dom` where `to` starts with `/` and is **not** `/#` (anchor jump).
2. A raw `<a href="/path">` where `href` starts with `/` AND the path is present in `PAGE_REGISTRY` (excludes `/images/foo.png` etc.).
3. **Excluded:** External links (`https://…`), anchor jumps (`#foo`), mailto/tel.

- [ ] **Step 1: Write the failing test**

Create `web/__tests__/scripts/audit-internal-links.test.mjs` with this exact content:

```javascript
import { describe, it, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT_PATH = resolve(__dirname, '../../scripts/audit-internal-links.mjs');

describe('audit-internal-links.mjs', () => {
  it('is a parseable ESM module that exports a function', async () => {
    const source = readFileSync(SCRIPT_PATH, 'utf8');
    expect(source).toMatch(/export\s+(function|const)\s+(countLinks|audit)/);
  });

  it('detects a <Link to="/foo"> as 1 internal link', async () => {
    const { countLinks } = await import(SCRIPT_PATH);
    const sample = `
      import { Link } from 'react-router-dom';
      export const X = () => (
        <article>
          <Link to="/bus-86-hanoi-airport">Bus 86</Link>
          <Link to="/grab-vs-bus-hanoi-airport">Grab vs Bus</Link>
        </article>
      );
    `;
    expect(countLinks(sample, ['/bus-86-hanoi-airport', '/grab-vs-bus-hanoi-airport'])).toBe(2);
  });

  it('detects raw <a href="/foo"> as 1 internal link when path is in registry', async () => {
    const { countLinks } = await import(SCRIPT_PATH);
    const sample = `
      <a href="/bus-86-hanoi-airport">Bus 86</a>
      <a href="/airport-scam-vietnam-taxi">Scam</a>
    `;
    expect(countLinks(sample, ['/bus-86-hanoi-airport', '/airport-scam-vietnam-taxi'])).toBe(2);
  });

  it('ignores external links, anchors, and paths not in registry', async () => {
    const { countLinks } = await import(SCRIPT_PATH);
    const sample = `
      <a href="https://grab.com">Grab</a>
      <a href="#section">Jump</a>
      <a href="/images/foo.png">Image</a>
      <Link to="/unknown-path">Unknown</Link>
    `;
    expect(countLinks(sample, ['/bus-86-hanoi-airport'])).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
cd web && node --no-warnings --experimental-vm-modules node_modules/.bin/jest --config jest.config.js __tests__/scripts/audit-internal-links.test.mjs
```

Expected: FAIL with `Cannot find module '.../scripts/audit-internal-links.mjs'` (the script doesn't exist yet).

- [ ] **Step 3: Implement the audit script**

Create `web/scripts/audit-internal-links.mjs` with this exact content:

```javascript
#!/usr/bin/env node
/**
 * audit-internal-links.mjs
 *
 * Enforces the rule: every article page in web/src/routes/articles/
 * must include at least 2 frylane.com internal links.
 *
 * A "frylane.com internal link" is any of:
 *   - <Link to="/path">…</Link>  (react-router-dom)
 *   - <a href="/path">…</a>      where /path is in PAGE_REGISTRY
 *
 * Excluded: external https:// links, anchor jumps (#foo), mailto/tel,
 * paths not in the registry (e.g. /images/foo.png).
 *
 * Exits 1 if any article has fewer than 2 internal links.
 *
 * Run: node scripts/audit-internal-links.mjs
 * Test: jest __tests__/scripts/audit-internal-links.test.mjs
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = resolve(__dirname, '../src/routes/articles');
const REGISTRY_PATH = resolve(__dirname, '../src/seo/pageRegistry.ts');
const MIN_LINKS = 2;

/**
 * Count frylane.com internal links in a source string.
 * @param {string} source - raw file content
 * @param {string[]} registryPaths - paths from PAGE_REGISTRY (must be exact-prefix-matched)
 * @returns {number} count of unique internal link paths
 */
export function countLinks(source, registryPaths) {
  const registrySet = new Set(registryPaths);

  // Match <Link to="/path">  OR  <a href="/path">
  const linkRegex = /<(?:Link|a)[^>]*?(?:to|href)\s*=\s*["'](\/[^"']*)["']/g;
  const found = new Set();
  let match;
  while ((match = linkRegex.exec(source)) !== null) {
    const path = match[1];
    if (path.startsWith('/#')) continue;
    const normalized = path.replace(/\/$/, '');
    if (registrySet.has(normalized) || registrySet.has(path)) {
      found.add(path);
    }
  }
  return found.size;
}

/**
 * Extract paths from PAGE_REGISTRY source (regex on `path: '/foo'`).
 * @param {string} registrySource - raw file content of pageRegistry.ts
 * @returns {string[]} paths
 */
export function extractRegistryPaths(registrySource) {
  const pathRegex = /path:\s*['"`](\/[^'"` ]*)['"`]/g;
  const paths = [];
  let m;
  while ((m = pathRegex.exec(registrySource)) !== null) {
    paths.push(m[1]);
  }
  return paths;
}

/**
 * Run the audit. Returns a list of {file, linkCount} records.
 * @param {string} articlesDir
 * @param {string[]} registryPaths
 */
export function audit(articlesDir, registryPaths) {
  const files = readdirSync(articlesDir).filter(
    (f) => f.endsWith('Page.tsx') || f.endsWith('PageVI.tsx'),
  );
  return files.map((f) => {
    const source = readFileSync(join(articlesDir, f), 'utf8');
    return { file: f, linkCount: countLinks(source, registryPaths) };
  });
}

// ── CLI entry point ─────────────────────────────────────────────────────
const isCli = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isCli) {
  const registrySource = readFileSync(REGISTRY_PATH, 'utf8');
  const paths = extractRegistryPaths(registrySource);
  const results = audit(ARTICLES_DIR, paths);
  const violations = results.filter((r) => r.linkCount < MIN_LINKS);

  console.log(`Internal-link audit — ${results.length} articles, ${paths.length} registry paths`);
  console.log(`Minimum required: ${MIN_LINKS} per article`);
  console.log('');
  const sorted = [...results].sort((a, b) => a.linkCount - b.linkCount);
  for (const r of sorted) {
    const marker = r.linkCount < MIN_LINKS ? 'X' : 'OK';
    console.log(`  [${marker}] ${r.file.padEnd(40)} ${r.linkCount} links`);
  }
  console.log('');
  if (violations.length > 0) {
    console.error(`FAIL: ${violations.length} article(s) have fewer than ${MIN_LINKS} internal links:`);
    for (const v of violations) console.error(`  - ${v.file} (${v.linkCount})`);
    process.exit(1);
  }
  console.log(`PASS: all ${results.length} articles have >= ${MIN_LINKS} internal links.`);
}
```

- [ ] **Step 4: Run jest test to verify it passes**

Run:
```bash
cd web && node --no-warnings --experimental-vm-modules node_modules/.bin/jest --config jest.config.js __tests__/scripts/audit-internal-links.test.mjs
```

Expected: 4 tests pass (the 4 `it()` blocks above).

- [ ] **Step 5: Run audit script — pre-flight reality check**

Run:
```bash
cd web && node scripts/audit-internal-links.mjs
```

Expected output: a printed table of all 33 articles with their link counts. Exit 0 if every article has ≥ 2; exit 1 if any article has < 2.

**Reality check:** Based on the kw-22 review notes, several articles likely have <2 internal links (the language-switcher link counts as 1). If the script exits 1, that's a real bug — proceed to Step 6 to fix them.

- [ ] **Step 6 (only if Step 5 exited 1): Add internal links to failing articles**

For each article listed in the "FAIL" output, open the file and add at least one more `<Link to="/existing-article">` or `<a href="/existing-article">` inside the article body. Prefer links to the most-relevant sibling (e.g., a Vietnamese article should link to its EN counterpart or to a related EN article). Use the existing patterns in `web/src/routes/articles/HowToGetHanPage.tsx` and `AirportBusPillarPage.tsx` as a template.

After each fix, re-run the audit script. Repeat until exit 0.

If Step 5 exited 0, skip to Step 7.

- [ ] **Step 7: Add npm script**

In `web/package.json`, inside the `"scripts"` block, add a new line (after `"test:e2e:ui"`):

```json
    "audit:internal-links": "node scripts/audit-internal-links.mjs",
```

- [ ] **Step 8: Verify**

Run:
```bash
cd web && npm run audit:internal-links
```

Expected: `PASS: all N articles have >= 2 internal links.` (N = 33 typically).

Run:
```bash
cd web && npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 9: Update `feature_list.json`**

Find the `kw-0-internal-link-graph` entry. Update:

- Set `"status": "passing"`.
- Replace `"evidence": ""` with:
  ```
  Created web/scripts/audit-internal-links.mjs (counts <Link to='/...'> and <a href='/...'> internal links against PAGE_REGISTRY; exits 1 if any article < 2). Created web/__tests__/scripts/audit-internal-links.test.mjs (4 tests pass). Added npm script 'audit:internal-links'. Audit output: <paste last 5 lines of actual output>. tsc --noEmit exit 0.
  ```

- [ ] **Step 10: Commit**

```bash
git add web/scripts/audit-internal-links.mjs web/__tests__/scripts/audit-internal-links.test.mjs web/package.json web/src/routes/articles/ feature_list.json
git commit -m "feat(kw-0-internal-link-graph): audit script enforces >=2 internal links per article"
```

---

## Task 4: kw-0-content-refresh-cadence — Document refresh process in AGENTS.md

**Files:**
- Modify: `AGENTS.md` — append a "Content Refresh Cadence (SEO)" section
- Modify: `feature_list.json` — set `kw-0-content-refresh-cadence.status = "passing"`, fill `evidence`

**Interfaces:**
- Consumes: Existing `AGENTS.md` structure (top-level section per project rules).
- Produces: A new top-level section "Content Refresh Cadence (SEO)" documenting the 6-month refresh rule.

> **Note:** This is a docs-only task. Per the TDD skill, TDD applies "always" except for generated/config files. Documentation falls into the same exception category — no test is required, but the file change must be verified by `git diff` showing the expected content was added.

- [ ] **Step 1: Append section to `AGENTS.md`**

Open `AGENTS.md` and append the following section at the **end** of the file (after the "No Backend" section). Do not modify any existing content.

```markdown
## Content Refresh Cadence (SEO)

Per the keyword research plan (`docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md` §kw-0-content-refresh-cadence), every 6 months refresh the top 10 SEO articles by GSC impressions.

**Cycle (every 6 months, next = 2027-01-29):**

1. Run `web/` build to get the latest page registry: `npm run build`.
2. Open Google Search Console → Performance → Search results. Filter by Page = top 10 articles by Impressions (last 90 days).
3. For each top-10 article, re-check:
   - **Schedule accuracy** (Bus 86 / 109 / 152 departures vs. `core/data/busSchedule.ts`).
   - **Fare accuracy** (vs. `core/data/grabEstimates.ts` and current operator pricing).
   - **Year reference in title** (e.g., `(2026)` → `(2027)` if calendar year has turned).
   - **Internal links** — add NEW sibling articles if any have been shipped since last refresh.
4. Update the article's `lastmod` field in `web/src/seo/pageRegistry.ts` (use today's date).
5. Run `npm run build` to regenerate `web/public/sitemap.xml` and `web/dist/sitemap.xml`.
6. Commit: `docs(kw-0-refresh): refresh top-10 articles for 2027-Q1`.

**Owner:** human (GSC access required for the actual perf data).

**Calendar entry:** set a recurring event for 2027-01-29, then every 6 months thereafter.
```

- [ ] **Step 2: Verify the append**

Run:
```bash
tail -25 AGENTS.md
```

Expected: the new "Content Refresh Cadence (SEO)" section appears as the last section.

- [ ] **Step 3: Update `feature_list.json`**

Find the `kw-0-content-refresh-cadence` entry. Update:

- Set `"status": "passing"`.
- Replace `"evidence": ""` with:
  ```
  Appended 'Content Refresh Cadence (SEO)' section to AGENTS.md documenting the 6-month refresh cycle: GSC top-10 audit → schedule/fare/year check → pageRegistry lastmod bump → npm run build → commit. References plan location and 2027-01-29 next-cycle date. Owner noted as human (GSC access required).
  ```

- [ ] **Step 4: Commit**

```bash
git add AGENTS.md feature_list.json
git commit -m "docs(kw-0-content-refresh-cadence): document 6-month refresh cycle in AGENTS.md"
```

---

## Task 5: kw-0-gsc-setup — Document the human-only GSC/GA4/Google Ads setup

**Files:**
- Modify: `docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md` — append a "How to complete kw-0-gsc-setup" appendix at the end
- Modify: `feature_list.json` — set `kw-0-gsc-setup.evidence` (status remains `pending` — human-only)

**Interfaces:**
- Consumes: The brief's Day 1 checklist (brief §6, "Ngày 1 — Setup, 60 phút").
- Produces: A copy-pasteable step-by-step runbook for the user.

> **Important:** This task does NOT add code. The status remains `pending` in `feature_list.json` until the user reports the steps are done. The agent's job is to make the steps **mechanically unambiguous** so the user can complete them in 60 minutes.

- [ ] **Step 1: Append the runbook to the breakdown plan**

Open `docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md` and append this section at the very end (after the existing content; do not modify any existing content):

```markdown
---

## Appendix: How to complete `kw-0-gsc-setup` (human-only, 60 min)

This ticket is **not** implementable by an agent. The user must complete it manually. Estimated time: 60 minutes total. Required: Google account (any), DNS access for `frylane.com`, credit card (NOT charged) for Google Ads.

### Step 1 — Verify `frylane.com` on Google Search Console (15 min)

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Click **Add property → URL prefix** → enter `https://frylane.com`.
3. Choose verification method: **HTML tag** (easiest).
4. Copy the meta tag Google gives you, e.g.:
   ```html
   <meta name="google-site-verification" content="abc123XYZ" />
   ```
5. Open `web/index.html` and paste the tag inside `<head>`. Save.
6. Run `npm run build` and deploy `web/dist/` to `frylane.com` (Vercel/Netlify auto-deploy if set up).
7. Back in GSC, click **Verify**. Should pass within 60 seconds.
8. Submit `sitemap.xml` URL: in GSC sidebar → **Sitemaps** → paste `https://frylane.com/sitemap.xml` → Submit.

### Step 2 — Set up Google Analytics 4 (15 min)

1. Go to [analytics.google.com](https://analytics.google.com).
2. Click **Admin → Create Account** → name "Frylane" → click **Create**.
3. Click **Create Property** → name "frylane.com" → timezone "Vietnam" → currency "VND" → Create.
4. Choose platform: **Web** → enter `https://frylane.com` → copy the **Measurement ID** (format `G-XXXXXXXXXX`).
5. Open `web/index.html` and paste inside `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
6. Deploy. Verify in GA4 **Realtime** tab that 1 active user appears (your own visit).

### Step 3 — Create Google Ads account (10 min, no campaigns)

1. Go to [ads.google.com](https://ads.google.com).
2. Click **Start now** → sign in with the same Google account as GSC.
3. Click **Switch to Expert mode** → **Create account without a campaign**.
4. Set country "Vietnam", timezone "Vietnam", currency "VND".
5. Enter billing info (credit card — **NOT charged** because we won't run campaigns).
6. Once in the Google Ads dashboard, navigate to **Tools → Keyword Planner**.
7. Click **Discover new keywords** → enter a seed (`bus from airport to city center`) → view volume range.
8. **Repeat for the top 10 keywords from `docs/seo/keyword-sheet.csv`.** Update the `volume_range` column in the CSV with the verified Google data.

### Step 4 — Mark `kw-0-gsc-setup` complete in `feature_list.json`

Once all 3 steps above are done, edit `feature_list.json`:

- Find the `kw-0-gsc-setup` entry.
- Set `"status": "passing"`.
- Replace `"evidence": ""` with:
  ```
  GSC verified via HTML tag (added to web/index.html, deployed). GA4 measurement ID G-XXXXXXXXXX added to web/index.html. Google Ads account created, Keyword Planner unlocked. Volume ranges for top-10 keywords updated in docs/seo/keyword-sheet.csv.
  ```

Commit:
```bash
git add web/index.html docs/seo/keyword-sheet.csv feature_list.json
git commit -m "docs(kw-0-gsc-setup): GSC + GA4 + Google Ads verified"
```

### Why this isn't automated

Adding `<meta name="google-site-verification">` to `web/index.html` is technically possible, but the **verification token** is a secret value that proves you control the domain. The agent must not hardcode it into the repo. The Google Ads account creation is genuinely a human-only flow (requires a credit card, billing setup, and acceptance of Google Ads terms).
```

- [ ] **Step 2: Verify the append**

Run:
```bash
tail -30 docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md
```

Expected: the new "Appendix: How to complete kw-0-gsc-setup" section appears at the end.

- [ ] **Step 3: Update `feature_list.json`**

Find the `kw-0-gsc-setup` entry. Update:

- **Keep** `"status": "pending"` (this is human-only; cannot be marked `passing` by the agent).
- Replace `"evidence": ""` with:
  ```
  Documented in docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md 'Appendix: How to complete kw-0-gsc-setup' — 4-step runbook (GSC verify, GA4 setup, Google Ads account, CSV volume update). Steps require DNS, Google account, and credit card; explicitly out of agent scope. Status remains pending until user reports steps complete.
  ```

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/plans/2026-07-29-keyword-research-ticket-breakdown.md feature_list.json
git commit -m "docs(kw-0-gsc-setup): human-only runbook for GSC + GA4 + Google Ads"
```

---

## End-of-Phase-4 verification

After all 5 tasks complete, run these final checks:

- [ ] **Step 1: TypeScript clean**

```bash
cd web && npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 2: All jest tests pass**

```bash
cd web && npm test
```

Expected: 200+/204+ pass. The 4 pre-existing `Bus86Page.*` failures (scam-warning + exit-time) are unrelated and pre-date Phase 4.

- [ ] **Step 3: Playwright tests pass**

```bash
cd web && npx playwright test e2e/seo.spec.ts --project=chromium
```

Expected: all tests pass (previous count + 1 new VI countdown test).

- [ ] **Step 4: Internal-link audit passes**

```bash
cd web && npm run audit:internal-links
```

Expected: `PASS: all N articles have >= 2 internal links.`

- [ ] **Step 5: Update `session-handoff.md`**

Append a Phase 4 section:

```markdown
## 2026-07-31 — Phase 4 (this session)
- Shipped kw-0-keyword-sheet (CSV at docs/seo/keyword-sheet.csv, 23 rows, 10 cols)
- Shipped kw-0-bus-departure-countdown-vi (1 Playwright E2E test for /vi/ket-qua countdown + /vi/ket-qua route added to App.tsx)
- Shipped kw-0-internal-link-graph (audit script + 4 jest tests, npm script `audit:internal-links`)
- Shipped kw-0-content-refresh-cadence (AGENTS.md section)
- Documented kw-0-gsc-setup (human-only runbook — status remains `pending`)
- 4/5 Phase 4 tickets now `passing` in feature_list.json
- Commits: <paste the 5 commit SHAs from `git log --oneline | head -5`>
```

---

## Self-Review

**1. Spec coverage:** Every Phase 4 ticket from the breakdown plan (lines 93–101) has a task:
- ✅ `kw-0-keyword-sheet` — Task 1
- ✅ `kw-0-bus-departure-countdown-vi` — Task 2
- ✅ `kw-0-internal-link-graph` — Task 3
- ✅ `kw-0-content-refresh-cadence` — Task 4
- ✅ `kw-0-gsc-setup` — Task 5 (human-only, documented)

**2. Placeholder scan:** Searched the plan for "TBD", "TODO", "implement later", "add validation", "write tests for the above", "similar to Task N". None found. Every code step has exact file paths and complete content. Every command has expected output. TypeScript test names, URLs, regexes all literal.

**3. Type consistency:**
- `countLinks(source: string, registryPaths: string[]): number` — used identically in Steps 1 (test) and 3 (impl).
- `audit(articlesDir: string, registryPaths: string[]): {file, linkCount}[]` — same shape.
- `extractRegistryPaths(registrySource: string): string[]` — same shape.
- `MIN_LINKS = 2` — used in both script output and Step 4 audit report.

**4. Existing code references verified at plan-write time:**
- `web/src/components/Result/CountdownTimer.tsx:18` — Vietnamese text `Còn khoảng X phút` confirmed via Read tool.
- `web/src/seo/pageRegistry.ts` — exists with `path:` fields and `PAGE_REGISTRY` export (line 27).
- `web/src/App.tsx:107` — `<Route path="/ket-qua" />` exists; no `/vi/ket-qua` equivalent (confirmed via grep on draft plan).
- `web/e2e/seo.spec.ts` — exists.
- `web/jest.config.js` — `testMatch` is `<rootDir>/__tests__/**/*.test.ts(x)` — the `.mjs` test extension is NOT in default discovery. The Jest commands in Task 3 explicitly pass the file path as an argument, so tests run regardless. If automatic discovery is desired later, add `'<rootDir>/__tests__/**/*.test.mjs'` to `testMatch` (not part of this plan).
- `feature_list.json` — all 5 `kw-0-*` tickets confirmed `pending` via JSON inspection.

**5. Known follow-ups (NOT part of this plan):**
1. `web/jest.config.js` `testMatch` doesn't include `.test.mjs` — explicit-path invocation works, but auto-discovery would skip it.
2. `BusArticleConfig.scheduleCount` is dormant (flagged in kw-0-comparison-layout notes, unrelated).
3. `volume_range` values in the CSV are from the brief's pre-Google-Ads estimates; the user should verify them via Google Ads Keyword Planner once `kw-0-gsc-setup` is done.

**6. Spec mismatches with prior draft plan** (`docs/superpowers/plans/2026-07-31-phase4-site-infrastructure.md` v1):
- Draft claimed "5 already-done" — incorrect. All 5 are `pending`. Fixed.
- Draft was missing the required header (goal / architecture / tech stack / global constraints). Added.
- Draft was missing the File Structure section. Added.
- Draft used `❌` / `✅` markers in script output that won't render well in monospaced logs. Replaced with `[X]` / `[OK]`.
- Draft referenced "152 tests pass per session log" in self-review; replaced with accurate "200+/204+" count from post-BrandMark baseline.
