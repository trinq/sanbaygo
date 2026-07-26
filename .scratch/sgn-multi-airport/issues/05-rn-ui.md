# 05 — RN: AirportPicker + TiaHint + useLandingForm airport field

**What to build:** Mirror of 04 in RN (Expo):
- New `components/Landing/AirportPicker.tsx` mirroring web implementation in NativeWind
- Modify `app/hooks/useLandingForm.ts` — mirror web
- New `components/Result/TiaHint.tsx`
- Modify `tests/landing-flow.test.tsx`
- Modify `components/Landing/SearchCard.tsx` to slot AirportPicker

**Blocked by:** 01, 02, 03, 04 — must run after web UI ships to catch any contract drift

**Status:** ready-for-agent

**Acceptance criteria:**

- [ ] Same tests as 04 pass on RN
- [ ] NativeWind class strings work on `AirportPicker` and `TiaHint`
- [ ] RN flight picker renders all airports on device sizing
- [ ] `npm test` passes at root; RN tests pass
- [ ] `bash init.sh` green

**Out of scope:**

- New tests on web (covered by 04)
