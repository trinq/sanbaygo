---
last_verified: 2026-07-29
sources:
  - path: docs/keyword-research-brief-airport-bus-vn.md
  - path: docs/superpowers/specs/2026-07-29-rename-brand-frylane-design.md
  - path: docs/seo-ads-plan.md
  - path: wiki/log.md
sources_note: Derived from the 2026-07-29 lean_intl pivot session log entry and the rewritten keyword brief; the frylane domain decision pre-dates this page and is sourced from the rename-brand spec.
summary: frylane.com targets international travelers (EN) as primary audience, with Vietnamese domestic as secondary.
---

# SEO & Content Strategy (lean_intl)

## Current audience posture

**lean_intl** — international English-speaking travellers are the primary target
(≈ 60% of SEO effort), with Vietnamese domestic users as secondary (≈ 40%).

This is not a permanent lock-in; it reflects the current marketing stage: an
English-facing domain (`frylane.com`) plus a Vietnamese-facing one
(`sanbaygo.app`) allow both audiences to land in the right language without
mixing on one page.

## Why intl primary

The original brief balanced VN and intl 50/50. After review, three factors
shifted the weight:

1. **SEO moat is larger for EN intl.** Bus 86, Bus 109, and Bus 152 are
   invisible to most English-speaking travellers. Ranking for `bus 86 hanoi
   airport` against a thin Reddit thread is a quick win. Ranking for
   `xe buýt sân bay nội bài` requires competing against Vietnamese transport
   blogs with years of domain authority.

2. **Scam anxiety is the primary intl pain point.** SGN taxi scams are a
   well-documented Reddit/TripAdvisor topic. A page titled `airport scam
   vietnam taxi` with real exit-time data from `core/data/exitTimeEstimates.ts`
   and a comparison table earns trust and backlinks from travel writers.

3. **Monetisation optics.** International travellers have higher average
   ride-hail spend. English-language comparison content on `frylane.com`
   attracts the audience more likely to use Grab or convertible affiliate
   links (Klook, 12Go) if that lane opens later.

## Content language split

| Domain | Audience | Language | Priority |
|--------|----------|----------|----------|
| `frylane.com` | International travellers (EN) | English | Primary |
| `sanbaygo.app` | Vietnamese domestic | Vietnamese | Secondary |

Rule: **never mix languages on one page.** Google Hreflang distinguishes the
two. Default route is English; Vietnamese is a locale variant, not the other
way around.

## Keyword tier targets (from brief)

### Tier 1 — write first (KD < 30)

- `bus 86 hanoi airport` (EN, Bus 86 pillar)
- `bus 109 saigon airport` (EN, Bus 109 pillar)
- `bus 152 saigon fare` (EN, Bus 152 pillar)
- `tan son nhat airport bus 109 vs 152` (EN, comparison, KD 18)
- `t2 international noibai how long to exit` (EN, scenario, from Reddit mining)
- `8pm arrival hanoi airport bus still running` (EN, scenario, from Reddit mining)
- `is grab safe at hanoi airport reddit` (EN, trust/scam signal)
- `airport scam vietnam taxi` (EN, E-E-A-T authority piece — HIGH priority)

### Tier 2 — next sprint (KD 30–45)

- `cheapest way from airport hanoi`
- `grab vs bus airport hanoi`
- `how to get from hanoi airport to city`
- `noi bai airport to old quarter` ( HAN pillar, high volume)
- `tan son nhat airport to district 1` (SGN pillar, high volume)
- `what to do at noibai airport first time` (EN, E-E-A-T authority)
- `late night airport transfer hanoi`

### Tier 3 — later (KD 45+)

- `bus from airport to city center` (EN, global pillar, ~8–15K/mo)
- `hanoi airport to hoan kiem lake`
- All Tier 3 posts require 6–12 months of link-building before ranking.

### Vietnamese (on `sanbaygo.app`, Tier 1 only)

- `xe buýt sân bay nội bài`
- `tuyến 86 nội bài giờ`
- `grab nội bài giá bao nhiêu 2026`

## Content format rules

- **Above the fold on mobile must show**: departure time table + fare + step-by-step
  directions in ≤ 3 steps. Intl readers bounce within 5 seconds if this is not
  visible immediately.
- **E-E-A-T signals**: author must have first-hand experience on Bus 86/109/152.
  If not, add a transparent disclaimer. Google 2025–2026 penalises YMYL travel
  content without E-E-A-T.
- **Grammarly / LanguageTool**: all English content must be grammar-checked before
  publish. Poor grammar destroys trust for intl readers instantly.
- **FAQ schema (JSON-LD)**: every informational article ends with 5–8 PAA-derived
  questions to capture featured-snippet and AI-Overview citations.
- **No competitor brand keywords in H1 or title tags** unless writing a
  fair-comparison article (e.g. `grab vs bus 86`). First mention of a Vietnamese
  operator (e.g. Phương Trang FUTA Bus Lines) must include an English explainer.

## SEO channels

1. **Google Search Console 4-filter audit** — run after 30+ pages are indexed.
   Before then, use Methods 2–3 (Autocomplete + PAA) only.
2. **Reddit mining** (`r/solotravel`, `r/VietNam`, `r/Hanoi`, `r/HoChiMinhCity`)
   for long-tail scenario phrases. Check Reddit extraction against Google SERP top 10
   before committing to a keyword.
3. **Google Trends 5-year view** — check multi-region (Vietnam vs United States
   vs United Kingdom) to spot rising queries before competitors.
4. **Competitor SERP scan** — travelfish.com, theculturetrip.com,
   vietnamcoracle.com, Reddit threads. If top 10 is all Reddit/TripAdvisor, the
   keyword is winnable.

## Relationship to other wiki pages

- [project-overview](./project-overview.md): `frylane.com` is the international face;
  `sanbaygo.app` is the domestic face. This page documents that split.
- [decisions](./decisions.md): the frylane rename and domain strategy are recorded
  as decisions; this page is the SEO/content execution layer on top of those
  decisions.
- [data-sources](./data-sources.md): the bus schedule data and exit-time estimates
  in `core/data/` are the primary E-E-A-T proof points for EN intl content.

## Open items

- [ ] Wire React Router (seo-ads-plan §3.1) to enable per-keyword URL routing —
  without it, all 23 target keywords compete for 1 page.
- [ ] Set up GSC property for `frylane.com` and `sanbaygo.app` separately.
- [ ] Write the 3 Tier 1 VN keyword pages on `sanbaygo.app` after EN pages land.
- [ ] Evaluate affiliate links (Klook, 12Go) on `frylane.com` for the
  `vietnam airport transfer booking` keyword cluster.
