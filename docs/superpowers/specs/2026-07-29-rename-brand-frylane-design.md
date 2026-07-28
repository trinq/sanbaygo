# Rename Brand: SanBayGo → Frylane

**Date:** 2026-07-29
**Scope:** Brand & copy only (per user direction)
**Trigger:** `research/domain-name-brief.md` recommends `frylane.com` as primary international domain

## Goal

Replace every **user-facing** occurrence of `SanBayGo` with `Frylane` in the project. Keep the repo directory (`/Users/trinq/Developer/sanbaygo`), package names (`@sanbaygo/core`, `sanbaygo-web`, `sanbaygo-mvp`), code identifiers, import paths, tsconfig aliases, and all internal ADRs/wiki/research **unchanged**.

## Out of Scope (Explicit Non-Changes)

- Repo directory name (`sanbaygo/` stays)
- npm package names: `sanbaygo-mvp`, `sanbaygo-web`, `@sanbaygo/core`
- Import paths: `from '@sanbaygo/core'`, `from '../core'`, etc.
- tsconfig path aliases
- Working docs: `docs/adr/*`, `docs/SPEC.md`, `docs/development-plan.md`, `docs/feature-research.md`, `docs/seo-ads-plan.md`, `docs/vps-deployment-guide.md`
- Wiki pages: `wiki/pages/*`, `wiki/index.md`, `wiki/log.md`
- Research: `research/domain-name-brief.md` (the brief that triggered this change)
- Session notes: `claude-progress.md`, `session-handoff.md`, `clean-state-checklist.md`, `evaluator-rubric.md`, `quality-document.md`
- Plan/spec files: `docs/superpowers/specs/*`, `docs/superpowers/plans/*`
- `scripts/deploy.sh` (internal tooling)
- `.scratch/*` (scratch work)
- DB migration SQL (no brand reference there, but checking)
- `package.json` `name` fields

The reasoning: brand-only rename. Working docs preserve history; the brief that recommended the new brand mentions `SanBayGo` as the predecessor — that historical context is correct and stays.

## In Scope (Concrete Changes)

### 1. Web index.html (1 file)
- `<title>SanBayGo — ...` → `<title>Frylane — ...`
- `og:url` `https://sanbaygo.app/` → `https://frylane.com/`
- `og:title` brand → `Frylane`
- `og:image` URL `https://sanbaygo.app/og-image.png` → `https://frylane.com/og-image.png`
- `twitter:title` brand → `Frylane`
- `twitter:image` URL → `https://frylane.com/og-image.png`

### 2. LanguageContext.tsx (1 file)
~25 brand string occurrences across vi + en translation tables. Replace `SanBayGo` → `Frylane` in:
- `header.title` (both languages)
- `pages.privacy.content` opening sentence (both)
- `pages.terms.content` opening sentence (both)
- `layout.brand` (both)
- `layout.topBar.title` (both)
- `landing.subtitle` opening (both — sentence currently starts with `SanBayGo so sánh...`)
- `landing.footer` (`© 2026 SanBayGo · Sản phẩm của Trinq` → `© 2026 Frylane · Built by Trinq`)
- `landing.navBrand` / `landing.navBrandAccent` (currently `SanBay` + `Go` → `Frylane` + nothing; the split-accent visual is the new identity)
- FAQ questions + answers that mention the brand by name (both languages — appears in Q1 and Q3 of both)

### 3. RN app/_layout.tsx (1 file)
- `Stack.Screen` `title: 'SanBayGo'` → `title: 'Frylane'`

### 4. design-system/tokens/tokens.ts (1 file)
- Top comment: `// Single source of truth for SanBayGo design tokens` → `// Single source of truth for Frylane design tokens`

### 5. components/Landing/landing-copy.vi.ts (1 file)
- `navBrand: 'SanBay'` → `navBrand: 'Frylane'`
- `navBrandAccent: 'Go'` → delete or set to `''` (no longer split brand)

### 6. FAQ test snapshot (1 file)
- `web/__tests__/components/Landing/FAQ.test.tsx` — likely asserts brand strings; update to match new translations

### 7. Tests that hardcode brand strings
Any test that asserts `SanBayGo` literal must be updated to `Frylane` so `npm test` stays green.

## Verification

After each batch:

```bash
cd web && npm test          # all suites pass
cd web && npx tsc --noEmit  # exit 0
cd /Users/trinq/Developer/sanbaygo && npm test   # root RN tests pass
```

After all changes:

```bash
# Confirm no user-facing brand leakage in shipping artifacts
rg -l 'SanBayGo|sanbaygo\.app|san-bay|sân bay' \
   web/src web/index.html web/__tests__ \
   app/_layout.tsx \
   components/Landing \
   design-system/tokens/tokens.ts \
   --type ts --type tsx --type html \
   | xargs -I {} echo {}

# Expected: only files where the leak is intentional (e.g. comments referencing history)
# or zero results if rename is complete
```

## Commit Strategy

Per `AGENTS.md`:
- Small focused commits, one feature at a time
- Format: `docs: rename brand SanBayGo → Frylane (user-facing copy)`

Single commit is appropriate here — the change is cohesive and atomic.

## Risks

- **Visual regression**: `navBrand`/`navBrandAccent` is rendered as `SanBay` + colored `Go` in the header. Removing the `Go` accent changes visual weight. Mitigation: confirm BrandMark component renders correctly after the change; visually verify if dev server runs.
- **OG/Twitter image URL**: changing `https://sanbaygo.app/og-image.png` to `https://frylane.com/og-image.png` is a forward-looking change; the file won't exist there yet (would need to be uploaded as part of DNS deploy). Document this in commit message.
- **Translation consistency**: `SanBayGo` appears in vi FAQ questions/answers as well; need to update both languages to keep tests green.

## Not Touched (Confirm With User Later)

If user wants additional files renamed later:
- Internal-only docs (`CONTEXT.md`, `AGENTS.md`, `README.md`, `feature_list.json`) — currently described as if for `SanBayGo`. Could re-frame as historical context for Frylane.
- Test fixtures that compare brand strings in error messages.

These are out of scope for the immediate ask.