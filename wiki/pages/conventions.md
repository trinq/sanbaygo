---
last_verified: 2026-07-29
sources:
  - path: AGENTS.md
sources_note: All rules on this page are quoted directly from AGENTS.md (which is the repo-level agent instructions file). Where AGENTS.md is itself contradicted by reality (e.g., the project-structure diagram), that is flagged in [decisions](./decisions.md).
summary: Coding, naming, UI-language, commit, and TDD conventions — all from AGENTS.md.
---

# Conventions

This page mirrors the working rules in `AGENTS.md`. If a rule on this page
disagrees with `AGENTS.md`, **`AGENTS.md` wins** until this page is updated.

## One feature at a time
- Work on only **one** feature at a time.
- Mark it `in_progress` in `feature_list.json` before starting.
- Complete it fully (tests pass, lint clean, committed) before moving on.

## Test-Driven Development
1. Write a **failing test first**.
2. Run the test — confirm it fails.
3. Write the **minimal code** to pass.
4. Run the test — confirm it passes.
5. Refactor if needed.
6. **Commit only when the test passes.**

## Frequent commits
- Commit after each completed feature.
- Format: `feat: …`, `fix: …`, `docs: …`.
- Keep commits small and focused.

## Evidence before assertions
- Always run verification commands.
- Record actual output as evidence (in `feature_list.json` and / or commit
  messages).
- Do not claim work is done without running the tests.

## Definition of Done

A feature is complete when **all** of:

- [ ] All tests pass
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Code follows project conventions
- [ ] Feature marked `passing` in `feature_list.json`
- [ ] Evidence recorded in `feature_list.json`
- [ ] Changes committed

## End of session

- Update `claude-progress.md` with a session record.

> **2026-07-29 note**: `claude-progress.md` is being deprecated. Future
> sessions should append one entry to [wiki/log.md](../log.md) instead,
> pointing at which source files changed. The old file is kept as raw
> history and not modified further.

- Update `feature_list.json` with current status.
- Verify `clean-state-checklist.md` items pass.
- Leave session handoff in `session-handoff.md`.

## Vietnamese Language UI

All user-facing text **must** be in Vietnamese:

- Form labels and hints
- Error messages
- Result displays
- Instructions

This is a hard rule. Code comments and internal docs may be English;
domain terms in the UI must be Vietnamese.

## No Backend (per AGENTS.md — *see contradictions*)

AGENTS.md says MVP is fully client-side: no API calls, no auth, no data
persistence, static data only.

`CONTEXT.md` contradicts this — see [decisions](./decisions.md#open-contradictions).
Until that contradiction is resolved, treat AGENTS.md as the authoritative
*working rule* and CONTEXT.md's tech-stack table as the *aspirational*
direction.

## Static data location

All static data is in `data/` (per AGENTS.md) — but as of 2026-07-29 the
actual files live in `core/data/`. See [architecture](./architecture.md)
and [data-sources](./data-sources.md).