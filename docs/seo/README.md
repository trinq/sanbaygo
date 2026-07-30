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
