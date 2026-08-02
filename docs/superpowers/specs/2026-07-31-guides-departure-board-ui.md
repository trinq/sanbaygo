# SPEC: Airport Departure Board UI for /guides

## Problem Statement

The `/guides` listing page currently uses a card grid layout with rounded corners and shadow effects. While functional, it lacks visual distinctiveness and doesn't reflect the airport transit domain. Users scanning for specific bus routes (86, 109, 152) need better visual anchoring — the route numbers should stand out like an airport departure board, not blend into card titles.

## Solution

Redesign the `/guides` page with an airport departure board aesthetic:

- **Header**: Airport code-style display (`HANOI  ✈` / `SAIGON  ✈`) with horizontal rule
- **List layout**: Replace card grid with a flat list of rows separated by dividers
- **Route numbers**: Bold monospace typography that stands apart from Vietnamese text
- **Visual rhythm**: Clear horizontal lines between entries, consistent vertical spacing

## User Stories

1. As a traveler landing at Noi Bai, I want to quickly scan the HN hub for Bus 86 guides, so I can decide my transit option within seconds
2. As a first-time visitor to Vietnam, I want to see all guides organized by airport hub, so I understand what information is relevant to my arrival
3. As a returning customer, I want to switch between English and Vietnamese guides, so I can read in my preferred language
4. As a mobile user, I want the guides page to work well on small screens, so I can access it during my airport transit
5. As a user comparing bus options, I want to see route numbers (86, 109, 152) visually distinct, so I can quickly identify the relevant guide
6. As a SEO visitor arriving from Google, I want to land on `/guides` and immediately understand it's a comprehensive listing, so I can navigate to specific articles
7. As a user with visual accessibility needs, I want sufficient color contrast on the guides page, so I can read without strain
8. As a user scanning for Grab-related content, I want to identify non-bus articles by their lack of route numbers, so I can differentiate them from bus routes
9. As a user exploring from Ho Chi Minh City, I want the SG hub clearly labeled as "Ho Chi Minh City", so I don't confuse it with Hanoi
10. As a user interested in cross-cutting topics (luggage, scams), I want to find them in a dedicated "Other" section, so I can access them separately from city-specific content
11. As a fast-scanner, I want the page to load instantly with no skeleton states, so I can immediately browse content
12. As a returning user, I want to recognize the consistent visual language between the guides page and the result page, so the site feels cohesive

## Implementation Decisions

### Data Schema Changes

Add an optional `routeNumber` field to `GuideEntry`:

```typescript
export type GuideEntry = {
  href: string;
  articleId: string;
  hub: 'HN' | 'SG' | 'CROSS';
  order: number;
  routeNumber?: string; // e.g. '86', '109', '152' — undefined for non-bus articles
};
```

Map route numbers to article IDs:
- `'bus-86'` → `'86'`
- `'bus-109'` → `'109'`
- `'bus-152'` → `'152'`
- All other article IDs → `undefined`

### Component Changes

**Inline components in GuidesPage.tsx** (no new files):

- `HubHeader`: Displays hub label with airport-style formatting
  - Props: `hub: Hub`, `language: 'vi' | 'en'`
  - Renders: Hub label with horizontal rule divider

- `GuideRow`: Single guide entry in departure board style
  - Props: `entry: GuideEntry`, `language: 'vi' | 'en'`
  - Renders: Route number (if exists) | Title | Hub badge | Arrow
  - Route number: `font-mono font-bold text-ink`
  - Title: `text-base font-medium text-ink`
  - Bottom border separator

- `HubSection`: Groups GuideRows by hub
  - Props: `hub: Hub`, `entries: GuideEntry[]`, `language: 'vi' | 'en'`
  - Renders: HubHeader + list of GuideRows

### Styling Approach

Use existing Tailwind utilities and design tokens:

```css
/* Route number styling */
font-mono font-bold text-ink

/* Row styling */
flex items-center justify-between py-4 border-b border-surface-border

/* Header styling */
text-2xl font-bold text-ink tracking-tight

/* Hub badge */
text-xs font-semibold px-2 py-1 rounded-full
```

### Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  HANOI  ✈                                                      │
│  ───────────────────────────────────────────────────────────── │
│  86       Hướng dẫn tuyến 86 Nội Bài → Trung tâm        [HN]→ │
│  ────     So sánh Grab vs Bus 86                              [HN]→ │
│  ────     Thời gian ra cửa Nhà ga T2                          [HN]→ │
│  ...                                                           │
├──────────────────────────────────────────────────────────────────┤
│  SAIGON  ✈                                                     │
│  ───────────────────────────────────────────────────────────── │
│  109      Hướng dẫn tuyến 109 Tân Sơn Nhất                    [SG]→ │
│  152      Hướng dẫn tuyến 152 Tân Sơn Nhất                    [SG]→ │
│  ────     So sánh Bus 109 vs 152                               [SG]→ │
├──────────────────────────────────────────────────────────────────┤
│  OTHER                                                         │
│  ───────────────────────────────────────────────────────────── │
│  ────     Phí hành lý xe buýt sân bay                         [CR]→ │
│  ────     Cảnh giác lừa đảo taxi sân bay                       [CR]→ │
└────────────────────────────────────────────────────────────────┘
```

### SEO Compatibility

- Preserve existing page titles, descriptions, canonical URLs
- Preserve existing EN/VI URL pairs (`/guides` ↔ `/vi/guides`)
- No changes to `metaConfig.ts` structure

### i18n Compatibility

- Hub labels remain in `HUB_LABEL` constant
- Page title remains in `DEFAULT_LOCALE_TITLE` constant
- Language context (`useLanguage`) continues to control all text display

## Testing Decisions

### Test Strategy

External behavior only — verify rendered output matches design intent.

### Files to Test

- `web/__tests__/routes/GuidesPage.test.tsx` — extend existing test suite

### Test Cases

1. **Route numbers render correctly**: Entries with `articleId` matching bus routes display route number in monospace bold; entries without bus articleIds show no route number
2. **Hub grouping preserved**: HN entries before SG entries before CROSS entries
3. **Language switching works**: All text updates when language context changes
4. **Hub badge colors unchanged**: HN = blue, SG = orange, CROSS = slate
5. **All 33 entries render**: No missing or duplicate links
6. **Mobile layout**: Horizontal scrolling not required; content wraps appropriately
7. **Accessibility**: Color contrast ratios meet WCAG AA standards for text

### Prior Art

Existing `GuidesPage.test.tsx` (457 lines) provides test structure patterns:
- Language context wrapper
- Render checking with `screen.getByRole('link', { name: ... })`
- Grouped assertions for hub ordering

## Out of Scope

- Adding search/filter functionality to guides
- Creating new pages or modifying article content
- Changing the card layout used elsewhere (result page, etc.)
- Adding departure times or flight information to guide listings
- Animations or transitions on guide rows
- Custom fonts beyond what the design system already includes

## Further Notes

- The monospace font family (`JetBrains Mono`, `SF Mono`) is already defined in `design-system/tokens/tokens.css` as `--font-mono-family`
- The departure board aesthetic should feel like airport information displays — functional, scannable, not decorative
- Horizontal rule dividers replace the need for card shadows; the visual hierarchy comes from typography contrast
