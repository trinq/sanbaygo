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
- Sources touched: `AGENTS.md`, `package.json`, `claude-progress.md` (deprecation banner only).
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