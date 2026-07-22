# 01a — Stand up `core/types/` (expand phase)

**What to build:** A new `core/types/index.ts` containing the existing TypeScript types verbatim from `types/index.ts`, plus `core/tsconfig.json` so the type module can be type-checked in isolation. No consumer imports from `@core` yet — the expand phase only adds the type module alongside the existing root `types/`.

**Blocked by:** None — can start immediately

**Status:** ready-for-agent

- [ ] Create `core/types/index.ts` containing the existing types verbatim from `types/index.ts` (no additions, no shape changes, no `Terminal.flightTypes` yet — that lands in ticket 02)
- [ ] Create `core/tsconfig.json` with `target: ES2020`, `module: ESNext`, `moduleResolution: bundler`, `strict: true`, `skipLibCheck: true`, `noEmit: true`, `include: ["./types/index.ts"]` (only types, not utils/data/calc-engine — those land in 01b/01c/01d)
- [ ] `cd core && npx tsc --noEmit -p tsconfig.json` exits 0
- [ ] `cd web && npm test` and root `npm test` both still pass (proves the expand did not break the existing world)
- [ ] `git status` shows only `core/types/` and `core/tsconfig.json` additions; no other directories touched
- [ ] Commit with message `feat(core): scaffold types module and tsconfig`