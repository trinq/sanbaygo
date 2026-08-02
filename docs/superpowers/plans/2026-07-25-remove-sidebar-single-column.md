# Remove Desktop Sidebar — Single-Column Focus Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the left navigation sidebar from the desktop layout of `web/` (the Vite + React app) and re-center the main content as a single column, so the user can focus entirely on entering trip details.

**Architecture:** Drop the `<Sidebar />` component from `App.tsx`'s desktop branch, delete the now-unused `Sidebar.tsx` file, and rewire `App.module.css` so the layout is a single column with the existing `Header` sticky at the top and the main content centered below. `useViewport` stays — the mobile/tablet TopBar paths are untouched. The `--color-bg-sidebar` design token is preserved (still in `tokens.css` and pinned by the tokens-parity test) so the system has no dead-code cleanup risk.

**Tech Stack:** Vite + React + TypeScript, CSS Modules (existing), `ts-jest` + `@testing-library/react` (existing), `@playwright/test` (existing). No new dependencies.

## Global Constraints

- **Vietnamese UI text** for any user-visible string on `web/`. The existing `web/src/contexts/LanguageContext.tsx` (vi/en) is preserved.
- **No new dependencies.** No new packages, no Tailwind, no CSS framework changes.
- **Single source of truth for design tokens.** `design-system/tokens/tokens.css` (CSS) and `design-system/tokens/tokens.ts` (TS) stay as-is. The `--color-bg-sidebar` token is preserved even though no component uses it after the deletion — the tokens-parity test (`web/__tests__/design-system/tokens-parity.test.ts`) pins it.
- **Hairline separator token** (`0.5px solid rgba(60, 60, 67, 0.12)`) is used where appropriate. No new dark borders.
- **Touch targets ≥ 44 px** on mobile.
- **Responsive breakpoints:** mobile ≤ 768 px, tablet 769–1024 px, desktop ≥ 1025 px. The header already switches between mobile (`TopBar`), tablet (`TabletTopBar`), and desktop (the single Header) — that behavior is unchanged.
- **System font only** — `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif`.
- **No emojis as functional icons.** All icons are inline SVG (existing `Icon` component).
- **`init.sh` must remain green.** All `tsc --noEmit` and `npm test` runs (root, `core/`, `design-system/`, `web/`) continue to pass.
- **Web tests stay in `web/__tests__/`.** Jest config already covers `__tests__/` dirs.
- **No new menu, no new sidebar, no new top-bar.** The header (`web/src/components/Header.tsx`) stays as the only top-level navigation.
- **Existing Playwright e2e specs continue to pass.** `web/e2e/responsive-flow.spec.ts` and `web/e2e/arrival-flow.spec.ts` are the regression guard. The existing `--no-watchman` jest invocation in `init.sh` is preserved.

## File Structure

Files created or modified by this plan:

| Path | Owner | Purpose |
|---|---|---|
| `web/src/App.tsx` | MODIFY | Remove `Sidebar` import and `<Sidebar />` JSX from desktop branch |
| `web/src/App.module.css` | MODIFY | Drop `.desktop` flex container; replace with single-column centered layout that works the same on mobile/tablet/desktop |
| `web/src/components/Layout/Sidebar.tsx` | DELETE | Whole file — no consumers after this plan |
| `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` | MODIFY | Rename the `desktop` test description that mentioned "with sidebar" |
| `docs/superpowers/plans/2026-07-25-remove-sidebar-single-column.md` | NEW | This plan |

Files **not** modified (but listed for context, because the user might assume they need to change):

- `web/src/components/Header.tsx` — already centered (`max-width: 1200px; margin: 0 auto;` in `Header.module.css`). Stays as the top-of-page brand bar.
- `web/src/components/Header.module.css` — unchanged.
- `web/src/components/Layout/TopBar.tsx` — used by mobile/tablet branches; unchanged.
- `web/src/components/Layout/TopBar.module.css` — unchanged.
- `web/src/components/ArrivalForm/index.tsx` — the form is already self-contained. Unchanged.
- `web/src/components/ArrivalForm/index.module.css` — unchanged.
- `web/src/components/ResultDisplay/index.tsx` — already self-contained. Unchanged.
- `web/src/components/ResultDisplay/index.module.css` — unchanged.
- `design-system/tokens/tokens.css` — keeps `--color-bg-sidebar` token for parity test.
- `design-system/tokens/tokens.ts` — keeps `bgSidebar` field for parity test.
- `web/__tests__/design-system/tokens-parity.test.ts` — unchanged.
- `web/e2e/responsive-flow.spec.ts` — uses `.first()` defensively against the sidebar; once the sidebar is gone the assertions still pass (they look for the form/result text, not the sidebar).
- `web/e2e/arrival-flow.spec.ts` — pre-existing broken spec against the single-page form; out of scope.
- `core/`, `api/`, `design-system/src/*` — untouched.

---

## Task 1: Re-center the desktop layout in `App.tsx` and `App.module.css`

**Files:**
- Modify: `web/src/App.tsx`
- Modify: `web/src/App.module.css`
- Test: `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` (description-only update)

**Interfaces:**
- Consumes: `useViewport()` (returns `'mobile' | 'tablet' | 'desktop'`). `Header`, `TopBar`, `TabletTopBar`, `ArrivalForm`, `ResultDisplay` — all existing components, no signature changes.
- Produces: A single-column layout where the `Header` is sticky at the top and the main content (form or result) is centered below it. On desktop, the layout looks identical to the tablet layout — header at top, content centered, no left rail.

- [ ] **Step 1: Write the failing test (`WebAppLayout`)**

Red — file does not exist yet. Drop this test into a new file `web/__tests__/components/App/App.layout.test.tsx`:

```tsx
import { render } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import App from '../../../src/App';

describe('App layout', () => {
  it('does not render a sidebar element on desktop', () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    } as unknown as MediaQueryList);

    const { container } = render(
      <LanguageProvider>
        <App />
      </LanguageProvider>,
    );

    // The sidebar used to render an <aside> with the "Find recent trip"
    // search affordance. After this change, neither <aside> nor the search
    // label should be in the DOM.
    expect(container.querySelector('aside')).toBeNull();
    expect(container.querySelector('input[type="search"]')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd web && npm test -- --no-watchman -- --testPathPattern=App.layout`
Expected: FAIL — the test file (or its dependencies) imports `App` which currently imports `Sidebar`. Vite-side errors will surface a `Module not found` for the deleted `Sidebar.module.css`, or the `<aside>` is still in the DOM and the assertion fails. Either failure proves the sidebar is still there.

- [ ] **Step 3: Remove the Sidebar from `App.tsx`**

Edit `web/src/App.tsx`. Remove the import on line 4:

```tsx
// DELETE THIS LINE
import { Sidebar } from './components/Layout/Sidebar';
```

Replace the entire `return (...)` block with a single-column layout that uses the same `Header` for both desktop and mobile/tablet. The new `return` body is:

```tsx
  return (
    <div className={styles.app}>
      {viewport === 'mobile' ? (
        <TopBar title="SanBayGo" />
      ) : viewport === 'tablet' ? (
        <TabletTopBar />
      ) : null}
      <main className={`${styles.main} ${styles.mainCentered}`}>
        {view === 'form' ? (
          <ArrivalForm formData={formData} onUpdate={updateFormData} onCalculate={handleCalculate} />
        ) : (
          result && <ResultDisplay result={result} formData={formData} onRecalculate={handleRecalculate} />
        )}
      </main>
    </div>
  );
```

`Header` is no longer rendered here — it now lives in the mobile/tablet branch via `TopBar`/`TabletTopBar`, and the desktop branch uses no top bar at all (the form is the entire page; the brand mark "S" already appears in the ArrivalForm's `eyebrow` row at the top of the form).

Wait — re-check: the user's request says "Giữ nguyên các thành phần: Logo SanBayGo ở trên cùng". The brand logo must remain visible on desktop. The cleanest path is: keep the `<Header />` rendered on all viewports, just remove the sidebar. Update the `return` body to:

```tsx
  return (
    <div className={styles.app}>
      {viewport === 'mobile' ? (
        <TopBar title="SanBayGo" />
      ) : viewport === 'tablet' ? (
        <TabletTopBar />
      ) : (
        <Header />
      )}
      <main className={`${styles.main} ${styles.mainCentered}`}>
        {view === 'form' ? (
          <ArrivalForm formData={formData} onUpdate={updateFormData} onCalculate={handleCalculate} />
        ) : (
          result && <ResultDisplay result={result} formData={formData} onRecalculate={handleRecalculate} />
        )}
      </main>
    </div>
  );
```

This keeps the user's logo on top of every viewport and removes the sidebar entirely.

- [ ] **Step 4: Delete `web/src/components/Layout/Sidebar.tsx`**

Run: `git rm web/src/components/Layout/Sidebar.tsx`

The `Sidebar.module.css` file does not exist on disk (it was a Vite-cache artifact) — no further deletion needed. If the file does exist on disk in some future state, `git rm web/src/components/Layout/Sidebar.module.css` as well.

- [ ] **Step 5: Replace `web/src/App.module.css` with a single-column layout**

Overwrite `web/src/App.module.css` with:

```css
.app {
  font-family: var(--font-family);
  background: var(--color-bg-page);
  min-height: 100vh;
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: var(--space-5) var(--space-4);
}

.mainCentered {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-7) var(--space-5);
}

@media (max-width: 768px) {
  .mainCentered {
    padding: var(--space-5) var(--space-4);
    max-width: 100%;
  }
}
```

This drops `.desktop`, `.mobileShell`, `.mainMobile`, `.mainTablet`, `.mainDesktop`, `.contentDesktop` — all of which were for the sidebar / multi-column layout. The new `.mainCentered` keeps content centered with a comfortable 720-px max-width on desktop (single-column focus), and full-width on mobile.

- [ ] **Step 6: Update the ResultDisplay test description**

Edit `web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx` line 44:

```tsx
// FROM
it('renders at desktop with sidebar + table', () => {
  setup('desktop');
  expect(screen.getByText(/Xe buýt 86|Bus 86/i)).toBeTruthy();
  expect(screen.getByText(/Taxi/i)).toBeTruthy();
  expect(screen.getAllByText(/Grab/i).length).toBeGreaterThan(0);
});

// TO
it('renders at desktop as a single-column table', () => {
  setup('desktop');
  expect(screen.getByText(/Xe buýt 86|Bus 86/i)).toBeTruthy();
  expect(screen.getByText(/Taxi/i)).toBeTruthy();
  expect(screen.getAllByText(/Grab/i).length).toBeGreaterThan(0);
});
```

This is a description-only change — the assertions still pass because they only assert on result text, not on the sidebar.

- [ ] **Step 7: Run the new layout test to verify it passes**

Run: `cd web && npm test -- --no-watchman -- --testPathPattern=App.layout`
Expected: PASS — the `<aside>` is gone, the search input is gone, the desktop layout is a single centered column.

- [ ] **Step 8: Run the full web jest suite to confirm nothing else broke**

Run: `cd web && npm test -- --no-watchman`
Expected: 8 suites pass (63 tests), including the renamed `ResultDisplay` test, the new `App.layout` test, and the existing `ArrivalForm`, `VehicleComparison`, `tokens-parity`, `useFormState`, `useViewport`, `transport-calculator`, `vehicle-comparison-data` tests.

- [ ] **Step 9: Run `init.sh` to confirm the full harness is green**

Run: `bash init.sh`
Expected: exit 0, `Setup Complete!` printed. 4 tsc checks (root + core + design-system + web) all clean. Root 92/92 + web 63/63 tests pass.

- [ ] **Step 10: Commit**

```bash
git add web/src/App.tsx \
        web/src/App.module.css \
        web/src/components/Layout/Sidebar.tsx \
        web/__tests__/components/ResultDisplay/ResultDisplay.test.tsx \
        web/__tests__/components/App/App.layout.test.tsx
git commit -m "refactor(web): remove desktop sidebar, single-column centered layout"
```

---

## Self-Review

**1. Spec coverage:**

| Requirement | Task |
|---|---|
| Remove sidebar (logo, search, PLAN, REFERENCE) | Task 1 Steps 3 (App.tsx) + 4 (file deletion) |
| Keep main content centered, single-column | Task 1 Step 5 (`.mainCentered` max-width 720px) |
| Keep Logo SanBayGo on top | Task 1 Step 3 (render `<Header />` on desktop) |
| Keep "Step 1 — Plan your trip" / lede / form fields / "Find a ride" button | Untouched — those are in `ArrivalForm`, which `App.tsx` still renders |
| Increase whitespace, modern feel | Task 1 Step 5 (`padding: var(--space-7) var(--space-5)`) |
| No new menu/sidebar | Confirmed: only Header on desktop, TopBar on mobile, TabletTopBar on tablet |
| Keep existing design language, colors, fonts | Confirmed: no token changes, no font changes, no color changes |
| Optimize for desktop and mobile | Task 1 Step 5 (responsive padding/max-width media query) |

**2. Placeholder scan:** No "TBD", "TODO", "implement later" patterns. All code shown is complete. No "similar to Task N" references.

**3. Type consistency:** No new types introduced. `useViewport`'s return type is unchanged. `App` receives no new props. Tests use existing `LanguageProvider` from `web/src/contexts/LanguageContext.tsx`.

**Known follow-ups (out of scope for this plan):**

- `--color-bg-sidebar` design token is now unused but is preserved by the tokens-parity test. A future cleanup plan can drop it from both `tokens.css` and `tokens.ts` and update the parity test.
- `web/e2e/arrival-flow.spec.ts` is still broken against the new single-page form (pre-existing issue from Session 12). The new `responsive-flow.spec.ts` continues to pass — verified in Session 14.
- `web/__tests__/components/App/App.layout.test.tsx` uses `render` from `@testing-library/react`; if any sibling component test fixtures (e.g. `ResultDisplay.test.tsx`) mock `useViewport`, the new test may need its own setup. The Step 1 test imports `App` directly and trusts `useViewport`'s default — desktop branch fires because `window.innerWidth` defaults to `1280` in jsdom (≥ 1025px). If this fails, swap `window.innerWidth` setter inside the test.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-25-remove-sidebar-single-column.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
