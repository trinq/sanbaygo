# 07 — Contract: verify single source of truth and clean tree

**What to build:** Final integration check that proves the refactor is complete. After this ticket, no `core`-owned business logic remains outside `core/`, no consumer imports the legacy relative paths, both projects' test suites are green, both `tsc --noEmit` checks exit 0, and the working tree is clean.

**Blocked by:** 06 — both web and RN migrations must be complete

**Status:** ready-for-agent

- [ ] `ls data types utils calculation-engine` from repo root reports "No such file or directory" for each
- [ ] `rg "from '\.\./data/|from '\.\./\.\./data/|from '\.\./types'|from '\.\./\.\./types'|from '\.\./utils/time'|from '\.\./\.\./utils/time'|from '\.\./calculation-engine'|from '\.\./\.\./calculation-engine'" app components hooks web/src` returns no matches
- [ ] `cd web && npm test` passes with zero failures
- [ ] Root `npm test` passes with zero failures
- [ ] `cd web && npx tsc --noEmit` exits 0
- [ ] Root `npx tsc --noEmit` exits 0
- [ ] `git status` reports `nothing to commit, working tree clean`
- [ ] `git log --oneline -7` shows the seven feature commits from tickets 01–06 in order
- [ ] No new commit needed — this ticket is verification-only. If any step fails, file a follow-up ticket and stop; do not amend prior commits
