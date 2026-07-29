# Bus86Page Template Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor Bus86Page to match LandingPage template — Nav, Footer, design tokens, SearchCard — and create reusable Layout components for all pages.

**Architecture:** Two new layout components (`PageLayout`, `ArticleLayout`) replace inline wrappers across all pages. Bus86Page refactored to use design tokens instead of hardcoded colors, embed `<SearchCard>`, and follow the single-source template.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, react-router-dom

---

## Global Constraints

- Design tokens from `tailwind.config.ts`: `primary` (#0284C7), `ink` (#1E293B), `ink-soft` (#64748B), `ink-quiet` (#94A3B8), `surface-border` (#E2E8F0), custom `shadow-card`
- NO hardcoded colors: never `text-green-600`, `bg-green-600`, `text-gray-500`, `bg-gray-50`
- VI/EN translations via `useLanguage()` from `LanguageContext`
- All pages wrapped in layout component (Nav + Footer)

---

## Task 1: Create PageLayout component

**Files:**
- Create: `web/src/components/Layout/PageLayout.tsx`

**Interfaces:**
- Consumes: nothing (pure presentational)
- Produces: `PageLayout` component wrapping `Nav` + `{children}` + `Footer`

- [ ] **Step 1: Create PageLayout.tsx**

```tsx
// web/src/components/Layout/PageLayout.tsx
import type { ReactNode } from 'react';
import { Nav } from '../Landing/Nav';
import { Footer } from '../Landing/Footer';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd web && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Layout/PageLayout.tsx && git commit -m "feat: add PageLayout component"
```

---

## Task 2: Create ArticleLayout component

**Files:**
- Create: `web/src/components/Layout/ArticleLayout.tsx`

**Interfaces:**
- Consumes: `PageLayout` pattern — wraps `Nav` + `<main>{children}</main>` + `Footer`
- Produces: `ArticleLayout` component — same as `PageLayout` but with explicit `<main>` wrapper for article pages

- [ ] **Step 1: Create ArticleLayout.tsx**

```tsx
// web/src/components/Layout/ArticleLayout.tsx
import type { ReactNode } from 'react';
import { Nav } from '../Landing/Nav';
import { Footer } from '../Landing/Footer';

export function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd web && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Layout/ArticleLayout.tsx && git commit -m "feat: add ArticleLayout component"
```

---

## Task 3: Refactor Bus86Page

**Files:**
- Modify: `web/src/routes/articles/Bus86Page.tsx` — full refactor

**Interfaces:**
- Consumes: `ArticleLayout`, `SearchCard`, `useLandingForm`, `useNavigate`, `BUS_86` from `@core/data/busSchedule`, `SEOHelmet`
- Produces: Fully templated article page matching LandingPage design

**Changes required:**

1. Add imports:
   - `ArticleLayout` from `../../components/Layout/ArticleLayout`
   - `SearchCard` + `useLandingForm` from `../../hooks/useLandingForm` and `../../components/Landing`
   - `useNavigate` from `react-router-dom`

2. Replace outer wrapper (`<div className="min-h-screen bg-white">`) with `<ArticleLayout>`

3. Replace header (`<header className="bg-green-600 text-white py-16 px-4">`) with article hero section using `bg-primary`:
   ```tsx
   <header className="bg-primary text-white py-16 px-4">
     <div className="max-w-3xl mx-auto">
       <span className="text-sm font-medium uppercase tracking-wider opacity-80">
         Xe buýt sân bay Hà Nội
       </span>
       <h1 className="text-4xl font-bold mt-2 mb-4">
         Bus 86 — Sân bay Nội Bài đến Khu phố cổ Hà Nội
       </h1>
       <p className="text-lg opacity-90">
         VND {fare} · {startTime}–{endTime} · Mỗi 15–20 phút
       </p>
     </div>
   </header>
   ```

4. Add SearchCard CTA section after hero (before schedule table):
   ```tsx
   <section className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
     <SearchCardForm />
   </section>
   ```
   Where `SearchCardForm` is a mini component using `useLandingForm` + `SearchCard` + navigate to `/`.

5. Replace ALL hardcoded colors:
   - `text-green-600` → `text-primary`
   - `hover:bg-green-700` → `hover:bg-primary/90`
   - `bg-green-100` → `bg-primary/10`
   - `text-green-700` → `text-primary`
   - `border-green-200` → `border-emerald-200` (or `border-primary/20`)
   - `text-gray-500` → `text-ink-soft`
   - `text-gray-600` → `text-ink-soft`
   - `text-gray-700` → `text-ink`
   - `bg-gray-50` → `bg-slate-50` (or `bg-white`)
   - `border-gray-100` → `border-surface-border`
   - `border-gray-200` → `border-surface-border`
   - `bg-amber-50` → `bg-orange-50` (for Grab alternative section)
   - `border-amber-200` → `border-orange-200`
   - `text-amber-700` → `text-orange-700`
   - `bg-blue-50` → `bg-blue-50` (acceptable, blue is neutral)
   - `border-blue-200` → `border-blue-200` (acceptable)

6. Replace footer (`<footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">`) — DELETE entirely (ArticleLayout provides Footer)

7. Move `<main className="max-w-3xl mx-auto px-4 py-12">` inside ArticleLayout's `<main>` tag, or remove outer wrapper since ArticleLayout provides `<main>`.

8. The `<FAQ>` component from Landing should be added before closing `ArticleLayout`. However, since FAQ content is specific to Bus86Page (different questions), keep the FAQ as inline content or create a specialized `<ArticleFAQ>` if content differs significantly. For now, add FAQ after Grab section.

9. Keep JSON-LD FAQ schema (SEO) — it's page-specific.

- [ ] **Step 1: Full Bus86Page refactor** — rewrite the entire file following above changes

- [ ] **Step 2: Add SearchCardForm mini-component** — inside Bus86Page or create at top of file:

```tsx
function SearchCardCTA() {
  const navigate = useNavigate();
  const form = useLandingForm();

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;
    const params = new URLSearchParams({
      airport: formData.airportId === 'noi-bai' ? 'HAN' : 'SGN',
      flightTime: formData.arrivalTime,
      terminal: formData.terminal ?? '',
      destination: formData.destination ?? '',
      baggage: formData.baggage ?? 'carry_on',
      flightType: formData.flightType,
    });
    navigate(`/ket-qua?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-white/80 p-6 shadow-card backdrop-blur-md">
      <h2 className="text-lg font-semibold text-ink mb-1">
        Tính thời gian đón xe của bạn
      </h2>
      <p className="text-sm text-ink-soft mb-4">
        Nhập giờ đáp để xem Bus 86 có khả thi không.
      </p>
      <SearchCard
        arrivalTime={form.arrivalTime}
        airport={form.airport}
        terminal={form.terminal}
        destination={form.destination}
        people={form.people}
        carryOn={form.carryOn}
        checked={form.checked}
        flightType={form.flightType}
        showFlightTypeSelector={form.showFlightTypeSelector}
        terminalOptions={form.terminalOptions}
        destinationOptions={form.destinationOptions}
        onArrivalTimeChange={form.setArrivalTime}
        onAirportChange={form.setAirport}
        onTerminalChange={form.setTerminal}
        onDestinationChange={form.setDestination}
        onFlightTypeChange={form.setFlightType}
        onPeopleChange={form.setPeople}
        onCarryOnChange={form.setCarryOn}
        onCheckedChange={form.setChecked}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

Note: SearchCard already handles the `CTAButton` internally (the submit button), so the SearchCard itself is the CTA. No extra button needed.

- [ ] **Step 3: Verify with Playwright**

Run: `cd web && npx playwright test e2e/bus86.spec.ts --project=chromium`
Or if no bus86.spec.ts exists:
```bash
cd web && npx playwright test e2e/seo.spec.ts --project=chromium --grep="bus-86"
```

- [ ] **Step 4: TypeScript check**

Run: `cd web && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add web/src/routes/articles/Bus86Page.tsx && git commit -m "refactor: Bus86Page to match LandingPage template"
```

---

## Task 4: Wrap Privacy + Terms in PageLayout

**Files:**
- Modify: `web/src/pages/Privacy.tsx`
- Modify: `web/src/pages/Terms.tsx`

**Interfaces:**
- Consumes: `PageLayout` from `../components/Layout/PageLayout`
- Produces: Pages with Nav + Footer via PageLayout

**Changes:**

Privacy.tsx:
- Replace outer `<div className="min-h-screen bg-[#e6eff6]">` with `<PageLayout>`
- Replace inner `<main>` padding from `py-16` to `py-12`
- Delete `<Footer />` import and usage (PageLayout provides it)

Terms.tsx:
- Same changes as Privacy.tsx

- [ ] **Step 1: Modify Privacy.tsx**

```tsx
// web/src/pages/Privacy.tsx
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/Layout/PageLayout';

export function Privacy() {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-ink">{t.pages.privacy.title}</h1>
        <p className="mt-6 text-ink-soft leading-relaxed">{t.pages.privacy.content}</p>
        <a href="/" className="mt-8 inline-block text-primary hover:underline">
          {t.pages.privacy.back}
        </a>
      </main>
    </PageLayout>
  );
}
```

- [ ] **Step 2: Modify Terms.tsx** (same pattern)

- [ ] **Step 3: Verify**

Run: `cd web && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/Privacy.tsx web/src/pages/Terms.tsx && git commit -m "refactor: Privacy and Terms pages to use PageLayout"
```

---

## Task 5: Verify all pages consistent

**Files:**
- `web/src/App.tsx` — check routes
- `web/src/routes/HomePage.tsx` — should already be clean
- `web/src/routes/HomePageVI.tsx` — should already be clean
- `web/src/routes/ResultPage` — check layout wrapping

**Checklist:**
- [ ] All pages have Nav (via layout wrapper)
- [ ] All pages have Footer (via layout wrapper)
- [ ] No hardcoded `text-green-*` or `bg-green-*` outside Landing components
- [ ] Design tokens used consistently
- [ ] `cd web && npx tsc --noEmit` passes
- [ ] Dev server at localhost:5173 shows all pages with consistent Nav/Footer

- [ ] **Step 1: Run TypeScript check**

Run: `cd web && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Manual visual check** — navigate:
  - `/` — has Nav + Footer
  - `/bus-86-hanoi-airport` — has Nav + Footer, uses `bg-primary`, no `bg-green-600`
  - `/privacy` — has Nav + Footer
  - `/terms` — has Nav + Footer

- [ ] **Step 3: Run Playwright tests**

Run: `cd web && npx playwright test --project=chromium`
Expected: All pass

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: layout refactor complete — all pages use shared template"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|-----------------|------|
| Single template for all pages | Tasks 1, 2, 3, 4 |
| Nav + Footer on all pages | Tasks 1, 2, 3, 4 |
| Design tokens (no hardcoded colors) | Task 3 |
| SearchCard on Bus86Page | Task 3 |
| SEO schema preserved | Task 3 |
| TypeScript clean | All tasks |

---

## Execution Options

**Plan complete.** Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks sequentially in this session with checkpoints

Which approach?
