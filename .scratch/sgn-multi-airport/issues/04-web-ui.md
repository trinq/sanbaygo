# 04 — Web: AirportPicker + TiaHint + useLandingForm airport field

**What to build:** Web UI to expose the airport choice:
- New `web/src/components/Landing/AirportPicker.tsx` — dropdown of airports (HAN, SGN) from `AIRPORT_LIST`
- Modify `web/src/hooks/useLandingForm.ts` — add `airport: AirportId | null` field, filter terminal/destination options by selected airport, include `airportId` in submit shape
- Modify `web/src/lib/calculation-result.ts` to pass `airportId` through
- New `web/src/components/Result/TiaHint.tsx` — visible only when (selected bus = 109) AND (terminal = SGN-T1 or SGN-T2); computes TIA transfer timing
- Modify `web/src/components/Landing/SearchCard.tsx` to slot `AirportPicker` as first control
- Modify vehicle comparison component to filter buses by airport
- Update `web/__tests__/hooks/useLandingForm.test.ts` — add airport switching, terminal filtering, destination filtering tests
- Add `web/__tests__/components/Landing/AirportPicker.test.tsx`
- Add `web/__tests__/components/Result/TiaHint.test.tsx`

**Blocked by:** 01, 02, 03

**Status:** ready-for-agent

**Acceptance criteria:**

- [ ] `useLandingForm.airport` field type is `AirportId | null`, required
- [ ] Setting airport updates available terminals and destinations
- [ ] Submission shape includes `airportId`
- [ ] `AirportPicker` renders 2 options: "Sân bay Nội Bài", "Sân bay Tân Sơn Nhất"
- [ ] `TiaHint` component renders nothing when terminal is SGN-T3
- [ ] `TiaHint` component renders the transfer message when terminal is SGN-T1 or T2 and the recommended bus is 109
- [ ] Vehicle comparison uses airport-aware bus list (Bus 86 only for HAN; Bus 109/152/TIA for SGN)
- [ ] All Vietnamese strings routed through LanguageContext (`landing.airport.*`, `result.tia.*`)
- [ ] `cd web && npm test` passes; `cd web && npx tsc --noEmit` exits 0
- [ ] `web/e2e/multi-airport.spec.ts` (NEW) — fills form for SGN, sees Bus 152 first in result

**Out of scope:**

- Native RN mirroring (covered by 05)
- ResultDisplay visual redesign
