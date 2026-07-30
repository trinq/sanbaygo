# Spec — /guides Listing Page + Homepage CTA

## Problem Statement

The Frylane homepage's `BusGuides` section surfaces only 3 route cards (Bus 86, 109, 152). The site now has 15 published SEO articles (Phase 1 + Phase 2 + Tier 3 pillar) covering Hanoi, Saigon, and English-language comparison content, but visitors have no way to discover them from the homepage. The user has to land directly on a long-tail article URL or scroll through the sitemap to see the full library. This kills internal-link value (no hub → child pattern) and leaks traffic to competitors when visitors bounce after reading one article.

## Solution

Add a `/guides` listing page that displays all 15 published articles grouped by hub (Hà Nội / TP.HCM / English), with a card-per-article layout. Drive traffic to it from the homepage by adding a single CTA button at the bottom of the existing `BusGuides` section linking to `/guides`. The page renders in the user's preferred language (Vietnamese or English), styled to match the existing landing page (warm-paper token system, editorial typography, glass/blur accent matching `Hero.tsx`).

## User Stories

1. As a first-time visitor landing on frylane.com, I want to see a "view all guides" link after the 3 bus cards, so that I know the site has more than 3 articles.
2. As a visitor who clicked "Xem tất cả hướng dẫn →" on the homepage, I want to land on a page listing every guide, so that I can browse the full library.
3. As a Vietnamese-speaking visitor, I want the listing page to render in Vietnamese, so that I can read article titles in my language.
4. As an English-speaking visitor, I want the same listing page to render in English, so that I can read article titles in my language.
5. As a visitor browsing the listing, I want articles grouped by hub (Hà Nội / TP.HCM / English), so that I can scan the section that matches my airport.
6. As a visitor browsing the listing, I want each article card to show its title, a short excerpt, and a city/route badge, so that I can decide which article to open without clicking through.
7. As a visitor browsing the listing, I want each card to be a clickable link to the article, so that I can navigate directly.
8. As a visitor on mobile, I want the listing to stack vertically, so that I can read each card without horizontal scrolling.
9. As a visitor on desktop, I want the listing to use a 2-column grid within each hub group, so that I can scan efficiently.
10. As a SEO crawler, I want `/guides` to have a unique `<title>` and `<meta description>`, so that it can be indexed separately from the homepage.
11. As a SEO crawler, I want `/guides` to be in `sitemap.xml`, so that it can be discovered via the sitemap.
12. As a SEO crawler, I want `/guides` to expose `hreflang` alternates (EN ↔ VI), so that language-specific SERPs surface the right URL.
13. As a visitor who opens `/guides` directly, I want the page to load without a full page reload (React Router), so that navigation feels instant.
14. As a visitor browsing the listing, I want the existing 3 homepage cards (Bus 86/109/152) to remain unchanged, so that I don't lose the focused quick-scan UX.
15. As a content editor, I want the listing to be data-driven from a single array, so that adding a new article only requires updating the array (not editing the component).
16. As a visitor on the listing, I want to see each article's target airport/route as a colored badge, so that I can visually distinguish Hà Nội (blue) from TP.HCM (orange) cards.
17. As a visitor on the listing, I want the article excerpt to come from the article's `MetaConfig.description`, so that the listing copy stays in sync with the actual article.
18. As a visitor who has the homepage auto-redirect to VI (via `/vi/*` catch-all), I want the homepage CTA to link to `/vi/guides`, so that I don't lose my language preference.
19. As a returning visitor, I want the CTA to be visually quieter than the 3 cards above it, so that the section hierarchy is preserved (cards > CTA).
20. As a SEO crawler, I want `/guides` to have a canonical URL, so that I don't index duplicate content.

## Implementation Decisions

### Routes & Metadata

- Add two new routes: `/guides` (EN) and `/vi/guides` (VI). Both render the same component, which reads `useLanguage()` to pick labels.
- Add `MetaConfig` entries for both paths in `web/src/seo/metaConfig.ts`:
  - EN: title "Vietnam Airport Bus Guides — All Routes Compared (2026)", description listing the 3 hubs.
  - VI: title "Hướng dẫn xe buýt sân bay Việt Nam — So sánh mọi tuyến (2026)", description in Vietnamese.
  - Bidirectional `alternateVI` / `alternateEN`.
- Add `PageRegistryEntry` for both paths in `web/src/seo/pageRegistry.ts` so `sitemap.xml` auto-regenerates on build.

### Data Layer

- Create a single source-of-truth array `GUIDES_REGISTRY` in the new component file (or a sibling `web/src/seo/guidesRegistry.ts` if it grows past 20 entries). Each entry: `{ href, title, description, hub: 'HN' | 'SG' | 'EN', order: number }`. Hub grouping logic lives in the component.
- 15 articles to register (derived from `feature_list.json` `passing`/`completed` SEO articles):
  - **Hà Nội (HN) hub — 6 articles**:
    - `/bus-86-hanoi-airport` (EN)
    - `/vi/tuyen-86-noi-bai` (VI)
    - `/grab-vs-bus-hanoi-airport` (EN)
    - `/vi/grab-vs-xe-buyt-noi-bai` (VI)
    - `/noibai-t2-exit-time` (EN)
    - `/vi/thoi-gian-ra-cuong-t2-noi-bai` (VI)
    - `/hanoi-airport-late-night-bus` (EN)
    - `/hanoi-airport-late-night-transfer` (EN)
    - `/vi/di-chuyen-dem-khuya-san-bay-noi-bai` (VI)
    - `/noibai-airport-first-time-guide` (EN)
    - `/vi/noi-bai-lan-dau-di` (VI)
    - `/hanoi-airport-to-hoan-kiem-lake` (EN)
    - `/vi/san-bay-noi-bai-den-ho-hoan-kiem` (VI)
    - `/cheapest-way-hanoi-airport` (EN)
    - `/vi/cach-re-nhat-san-bay-noi-bai` (VI)
    - `/how-to-get-from-hanoi-airport-to-city` (EN)
    - `/vi/cach-di-tu-sanh-bay-noi-bai` (VI)
    - `/vi/grab-noi-bai-gia-bao-nhieu` (VI)
  - **TP.HCM (SG) hub — 6 articles**:
    - `/bus-109-saigon-airport` (EN)
    - `/vi/tuyen-109-tan-son-nhat` (VI)
    - `/bus-152-saigon-fare` (EN)
    - `/vi/tuyen-152-tan-son-nhat` (VI)
    - `/bus-109-vs-152-tan-son-nhat` (EN)
    - `/vi/xe-buyt-109-vs-152-tan-son-nhat` (VI)
    - `/cheapest-way-saigon-airport-district-1` (EN)
    - `/vi/cach-re-nhat-san-bay-sai-gon` (VI)
  - **English hub (EN, unordered — appears as "Other English guides") — 4 articles**:
    - `/is-grab-safe-hanoi-airport` (Reddit/Grab safety)
    - `/airport-bus-luggage-fee-vietnam` (luggage fees)
    - `/vi/phi-hanh-ly-xe-buyt-san-bay` (VI luggage)
    - `/airport-scam-vietnam-taxi` (scam guide)
    - `/vi/xe-lo-gio-sanh-bay-viet-nam` (VI scam)
    - `/bus-from-airport-to-city` (pillar)
    - `/vi/xe-buyt-san-bay-ve-trung-tam` (VI pillar)
  - **Total: 15 base articles, with EN+VI mirrors = ~25 entries across the listing.** Decision: keep one entry per path (matching what the URL points to). Filter by `language` so only the user's preferred-locale entries show in their main section; the other language's entries fall into a "Cross-language" footer or are hidden.
  - **Refined decision**: Show all 15 paths regardless of language. The listing is a **directory of guides written in their actual language**. When a user lands on `/guides` (EN locale), the listing shows the EN titles naturally — the EN versions of each article. The VI versions are accessible via the article's own hreflang toggle or by switching language site-wide. The grouping is by hub (city), not by displayed language. This avoids 25+ entries and keeps the page scannable.
- Each entry's `title` and `description` are pulled from the entry's `MetaConfig` (already exists in `metaConfig.ts`) — do NOT duplicate copy. The component reads `PAGE_META[href]` at render time. If `PAGE_META[href]` is missing, fall back to the entry's static `title` / `description` from the registry.

### Component

- Create `web/src/routes/GuidesPage.tsx` (single component, language-aware). Export both `GuidesPage` (imported by App.tsx for `/guides`) and `GuidesPageVI` (thin wrapper for `/vi/guides` — same pattern as `HomePage`/`HomePageVI`).
- The component renders 3 sections in this order: **Hà Nội**, **TP.HCM**, **English (other)**. Each section has an H2 heading, a 2-column grid on `md:` and up, single-column on mobile. Cards have badge (city), title, 1-line description, hover state.
- Reuse the `bg-blue-100 text-blue-700` (Hà Nội) and `bg-orange-100 text-orange-700` (TP.HCM) badge styles from `BusGuides.tsx` for visual consistency. Add a neutral gray badge for non-city-specific entries (luggage, scam, pillar).
- Page-level styling: `bg-white` body, `py-16 px-4 lg:px-8` outer section, `max-w-5xl mx-auto` container — matches `BusGuides.tsx` outer container for visual continuity.
- Title: H1 at top of page, then H2 per hub group. NO FAQ schema (listing page is not a search intent page).

### Homepage CTA

- Add a single CTA element below the 3-card grid in `BusGuides.tsx`. Layout: centered, `mt-10`, `text-sm font-semibold text-primary` with an arrow icon (mirrors the existing per-card arrow). The element is a `<Link>` (React Router) to `{language === 'vi' ? '/vi/guides' : '/guides'}`.
- New label translations: `vi: "Xem tất cả hướng dẫn"`, `en: "View all guides"`. Add to the existing `LABELS` object in `BusGuides.tsx`.
- Visual treatment: less prominent than the cards. No border, no background, just the link text + arrow. This keeps the 3 cards as the visual anchor and the CTA as a quiet pointer.

### Routing

- In `web/src/App.tsx`, add two new `<Route>` entries:
  - `<Route path="/guides" element={<GuidesPage />} />` placed AFTER the `/*` catch-all is **not** possible (catch-all swallows it). Place BEFORE the `<Route path="/vi/*" element={<HomePageVI />} />` and `<Route path="*" element={<HomePage />} />` catch-alls.
  - `<Route path="/vi/guides" element={<GuidesPageVI />} />` placed AFTER the next-most-specific VI route and BEFORE the `/vi/*` catch-all.
- Import the new components at the top of `App.tsx`.

### Styling

- Reuse existing Tailwind token classes (`text-ink`, `text-ink-soft`, `text-primary`, `border-surface-border`, `bg-white`, `bg-blue-100`, `bg-orange-100`) — no new token definitions.
- No glassmorphism, no blur, no hero image — the listing page is a quiet text directory. This contrasts with the `Hero.tsx` blur stack and reinforces the section's role as a reference library.

### Behavior

- No filter, no search box, no pagination. The page is short enough (15 cards × 3 sections) to scroll.
- No internal-link cross-linking between guide cards. The listing is a hub; the cards have their own internal links to each other from their article bodies.
- No "back to home" button at the top — the `Header` already has the logo-linked home.

## Testing Decisions

### Test-grade rules

- Test external behavior only: rendered text, link targets, badge text, group headings, language switching. Do NOT test internal state or CSS class names.
- Every test must use `getByRole` / `getByText` semantics, not `container.firstChild` or class assertions.

### Unit tests (Jest)

- `web/__tests__/routes/GuidesPage.test.tsx`:
  - Renders H1 "Hướng dẫn xe buýt sân bay" in VI mode.
  - Renders H1 "Vietnam Airport Bus Guides" in EN mode.
  - Renders 3 hub headings: "Hà Nội", "TP.HCM", "English".
  - Renders all 15 article titles exactly once (parametrize over the 15 slugs).
  - Each card link `href` matches the registered path.
  - When `useLanguage()` returns `'vi'`, the title text matches the VI `MetaConfig.title` for that path.
  - When `useLanguage()` returns `'en'`, the title text matches the EN `MetaConfig.title`.
  - Missing `PAGE_META[href]` falls back to the registry entry's static title (no crash).
  - Snapshot test: card structure matches previous render (catches accidental layout regression).

### E2E tests (Playwright)

- Add to `web/e2e/seo.spec.ts`:
  - `/guides` returns 200, has `<title>` from `metaConfig`, has `<meta name="description">`, has `<link rel="canonical" href="https://frylane.com/guides">`, has `hreflang` EN↔VI tags.
  - `/vi/guides` returns 200, has Vietnamese `<title>`, has `hreflang` VI↔EN.
  - Both URLs are present in `public/sitemap.xml` after `npm run build`.
  - Homepage `/` contains a link with text "Xem tất cả hướng dẫn →" pointing to `/vi/guides` (when language is VI).
  - Homepage `/` contains a link with text "View all guides →" pointing to `/guides` (when language is EN).
  - Clicking the homepage CTA navigates to `/guides` without a full page reload (URL changes, no `beforeunload`).
  - `/guides` renders the 3 hub sections in the correct order: Hà Nội first, then TP.HCM, then English.
  - Each guide card is keyboard-focusable (Tab navigates through them in DOM order).

### Visual / responsive

- Manual screenshot at 375px (mobile) and 1280px (desktop) — confirm 2-column grid on desktop, 1-column on mobile.
- No axe-core a11y violations (existing test infra).

### Sitemap

- After `npm run build`, verify `web/dist/sitemap.xml` contains both `/guides` and `/vi/guides` entries with correct `lastmod` and `hreflang` xhtml:link tags.

### Prior art

- `web/__tests__/components/Landing/BusGuides.test.tsx` (if exists) — pattern for badge-based card list tests.
- `web/__tests__/components/Result/ResultPage.test.tsx` — pattern for full-page component tests with `useLanguage()` mock.
- `web/e2e/seo.spec.ts` — pattern for the SEO meta + hreflang + sitemap assertions.

## Out of Scope

- Filter / search / sort UI on the listing page.
- Pagination (15 articles is small enough).
- Per-article featured-image cards (the listing is intentionally text-only).
- A "Most popular" or "Recently published" sort.
- Author pages or contributor bios (the articles don't have authors).
- Internal cross-links between guide cards inside the listing itself.
- A "Related guides" section inside any individual article body (articles already cross-link via `kw-0-internal-link-graph`).
- Changing the existing 3 homepage cards' visual treatment.
- Adding `/guides` to the header navigation (header has 2 slots, both occupied; nav addition is a separate change).
- A RSS feed for the guides listing.
- Caching / ISR (web is Vite SPA, no SSR).

## Further Notes

- This is a one-shot feature, not a recurring template. The next planned article work (e.g. `kw-8-noibai-old-quarter`, `kw-9-tsn-district-1`) does **not** require changes here — they will add entries to `GUIDES_REGISTRY` and to `pageRegistry.ts` per the existing `kw-0-internal-link-graph` rule.
- The `/guides` URL is language-path-based (matches existing convention: `/vi/*` for Vietnamese). The English page is `/guides` (no `/en/` prefix), matching the existing convention where `HomePageVI` is at `/vi/*` and `HomePage` is at `/`.
- The decision to use one entry per path (not per article) means the listing is a URL directory, not a content directory. This is correct: the URL is the unit of crawl, indexing, and hreflang pairing.
- The CTA arrow icon (`M9 5l7 7-7 7`) is the same chevron used in the existing `BusGuides` cards. Reuse it for consistency.
- The `/guides` page will not be included in the existing `BusGuides` section's data — `BusGuides` continues to show only the 3 hero routes. The CTA is the bridge.
- The accessibility tree should expose one `<h1>` (the page title) and three `<h2>` (one per hub group). Cards should be `<a>` elements with the badge as a `<span>`.
