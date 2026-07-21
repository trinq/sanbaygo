# Evaluator Rubric - SanBayGo MVP

Score each session's output using this rubric. Each dimension is scored 0-2.

## Scoring Guide

| Score | Meaning |
|-------|---------|
| 0 | Does not meet bar - fundamental issues |
| 1 | Partially meets bar - needs fixes |
| 2 | Fully meets bar - no issues |

## Dimensions

### 1. Correctness (Weight: 25%)

Does the implementation match the target behavior from SPEC.md?

**Score 2:** All user stories work correctly, edge cases handled
**Score 1:** Core features work, some edge cases missing
**Score 0:** Core features broken or missing

**Checklist:**
- [ ] User can input arrival time
- [ ] User can select T1/T2 terminal
- [ ] User can select baggage type
- [ ] User can select destination
- [ ] Bus recommendation shows correct trip
- [ ] Grab fallback shows with price
- [ ] Peak hour detection works (7-9 AM, 5-7 PM)
- [ ] Edge cases: no_service, too_late, missed_last handled
- [ ] International flights add immigration time

### 2. Verification (Weight: 25%)

Were the required checks actually run, with evidence?

**Score 2:** All verification commands run with recorded evidence
**Score 1:** Some verification run, but incomplete or missing evidence
**Score 0:** No verification run

**Checklist:**
- [ ] `npm test` runs and passes
- [ ] `npx tsc --noEmit` runs with no errors
- [ ] Manual UI test performed (if applicable)
- [ ] Evidence recorded in `feature_list.json`

### 3. Scope Discipline (Weight: 20%)

Did the agent stay within the selected feature scope?

**Score 2:** Only implemented MVP scope, no gold-plating
**Score 1:** Some scope creep, but minimal
**Score 0:** Significant scope creep (implemented post-MVP features)

**Checklist:**
- [ ] No real-time bus tracking
- [ ] No real-time Grab pricing
- [ ] No multi-airport support
- [ ] No booking/ticketing
- [ ] No offline mode
- [ ] No push notifications

### 4. Reliability (Weight: 15%)

Does the result survive a restart or re-run?

**Score 2:** Clean build, reproducible results
**Score 1:** Minor issues on rebuild
**Score 0:** Build fails or unpredictable behavior

**Checklist:**
- [ ] `npm install` succeeds
- [ ] Tests pass consistently
- [ ] No flaky tests
- [ ] TypeScript compiles cleanly

### 5. Maintainability (Weight: 10%)

Is the code and documentation clear enough for the next session?

**Score 2:** Well-organized, documented, follows patterns
**Score 1:** Some organization issues, minor gaps
**Score 0:** Poorly organized, hard to understand

**Checklist:**
- [ ] File structure follows plan
- [ ] Types well-defined and used
- [ ] Comments explain non-obvious logic
- [ ] Vietnamese UI text consistent
- [ ] Calculation engine is pure functions

### 6. Handoff Readiness (Weight: 5%)

Can a new session continue using only repo artifacts?

**Score 2:** Complete handoff with all artifacts updated
**Score 1:** Partial handoff, some artifacts stale
**Score 0:** No handoff, next session confused

**Checklist:**
- [ ] `claude-progress.md` updated
- [ ] `feature_list.json` reflects state
- [ ] `session-handoff.md` completed
- [ ] Next session has clear next action

---

## Scoring Summary

| Dimension | Weight | Score (0-2) | Weighted Score |
|-----------|--------|-------------|---------------|
| Correctness | 25% | | |
| Verification | 25% | | |
| Scope Discipline | 20% | | |
| Reliability | 15% | | |
| Maintainability | 10% | | |
| Handoff Readiness | 5% | | |
| **Total** | 100% | | |

## Conclusion

- [ ] **Accept** (≥1.5 weighted average) - meets the bar
- [ ] **Revise** (1.0-1.4) - needs fixes before accepting
- [ ] **Block** (<1.0) - fundamental issues

## Tuning Notes

<!-- Record rubric tuning observations here -->

| Date | Observation | Adjustment |
|------|-------------|------------|
| 2026-07-21 | Initial rubric created | - |
