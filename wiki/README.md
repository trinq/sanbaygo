# SanBayGo Wiki

The wiki is the **curated, structured, link-checked, drift-checked** knowledge
layer for the SanBayGo repository. It is derived from raw sources (code, ADRs,
`CONTEXT.md`, `feature_list.json`, hand-written plans) and is the single place
an agent should look when orienting itself to the project.

## How the wiki works

```
raw sources        wiki (curated)       wiki diagram
───────────        ─────────────       ─────────────
CONTEXT.md     ──▶ wiki/pages/*.md ──▶ ./wiki-diagram.svg
feature_list.json ─▶
AGENTS.md      ──▶
core/, web/, api/ ─▶
docs/adr/*.md ──▶
```

Each wiki page declares its `sources:` in frontmatter. The lint script
(`wiki/scripts/lint.mjs`) walks those sources and:

- **C1 (staleness)** flags any page whose source file was modified after
  the page's `last_verified` date.
- **C2 (broken links)** flags any internal Markdown link whose target does
  not exist.
- **C5 (schema)** flags any page missing required frontmatter fields.

## Conventions for wiki pages

Every page in `wiki/pages/` must have this frontmatter:

```yaml
---
last_verified: YYYY-MM-DD    # date you last reconciled the page with sources
sources:                     # paths to the raw sources this page is derived from
  - path: path/to/source
sources_note: short rationale
summary: one-line description (used by wiki/index.md)
---
```

Use ISO dates (`YYYY-MM-DD`). Keep `summary` to one short sentence.

## Operations

| Command | Purpose |
|---------|---------|
| `npm run wiki:lint` | Run C1 + C2 + C5 checks, exit 1 if any errors |
| `npm run wiki:render` | Render `wiki/diagram.mmd` → `./wiki-diagram.svg` |

Add to `wiki/log.md` (not `claude-progress.md`) at the end of every session.

## Why not just rely on `docs/`?

`docs/` contains the *raw research* (feature research, SEO/ads plans,
deployment guides, hand-written specs). These are valuable as primary
sources but they are:

- not structured for quick agent orientation,
- not link-checked,
- not cross-checked against code drift.

The wiki extracts the curated subset that an agent actually needs on
session 0 and keeps it honest with the lint pass.

See `wiki/log.md` for the full session history.