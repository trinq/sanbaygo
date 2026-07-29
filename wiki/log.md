# Wiki Session Log

One entry per session. Newest at the top. Format:

```
## YYYY-MM-DD — <one-line summary>
- Sources touched: `<path>`, `<path>`, …
- Wiki pages touched: `<page>`, `<page>`, …
- Lint status: clean | <n> errors / <n> warns
- Commit: <sha> — <message>
```

---

## 2026-07-29 — Initial wiki scaffold + lint + diagram
- Wiki pages created: all 8 seed pages (`project-overview`, `architecture`,
  `domain-model`, `data-sources`, `sessions-history`, `decisions`,
  `conventions`, `tooling`).
- Wiki pages touched: none (this commit *creates* them).
- Lint status: clean (8/8 pages, 0 issues).
- Diagram: `./wiki-diagram.svg` rendered from `wiki/diagram.mmd` via
  `@mermaid-js/mermaid-cli` (40 KB SVG, transparent background).
- Tests: `node --test wiki/scripts/__tests__/lint.test.mjs` → 8/8 pass.
- TypeScript: `npx tsc --noEmit` → clean.
- Commit: `26de171` — `feat: add wiki/ knowledge layer + lint + Mermaid diagram`.
- Open follow-ups: see `wiki/pages/decisions.md#open-contradictions` —
  the `docs/` triage (resolving the "no backend" vs "Next.js + Supabase +
  Vercel" contradiction, the ADR 0001 numbering gap, etc.) is deferred to
  a later session per the design decision recorded there.

---

## 2026-07-29 — Pivot keyword brief to lean_intl (EN primary, VN secondary)
- Sources touched: `docs/keyword-research-brief-airport-bus-vn.md` (rewrite per audience pivot).
- Sources read for context: `CONTEXT.md`, `docs/superpowers/specs/2026-07-29-rename-brand-frylane-design.md`, `docs/seo-ads-plan.md`, `feature_list.json`, `wiki/pages/decisions.md`.
- Wiki pages touched: none (no wiki page claims these sources, so no `last_verified` bump needed).
- Lint status: clean (`npm run wiki:lint` → 8/8 pages, 0 issues).
- Commit: `7211c18` — `docs(seo): pivot keyword brief to lean_intl (EN primary 60%, VN secondary 40%)`.
- Decisions deferred: not touched (the lean_intl pivot is a content/SEO scoping decision, not a domain model or architecture change — no ADR or wiki page needs migration).
- Lưu ý kết thúc: file `research/domain-name-brief.md` vẫn untracked; brief mới là sản phẩm SEO content, không phải entity upstream.