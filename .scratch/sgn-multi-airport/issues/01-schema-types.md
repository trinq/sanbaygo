# 01 — Schema: scoped TerminalId, AirportId, PickupPoint, scheduleSource

**What to build:** Extend `core/types/index.ts` to support multi-airport. Add `AirportId` discriminated union, change `TerminalId` literal to airport-scoped (`HAN-T1`, `HAN-T2`, `SGN-T1`, `SGN-T2`, `SGN-T3`), add `PickupPoint` type, change `BusRoute` to use `scheduleSource: { kind: 'explicit' } | { kind: 'frequency' }`. Existing `NOI_BAI_AIRPORT` still compiles; downstream consumers need to compile against the new types.

**Blocked by:** none

**Status:** ready-for-agent

**Acceptance criteria:**

- [ ] `TerminalId = 'HAN-T1' | 'HAN-T2' | 'SGN-T1' | 'SGN-T2' | 'SGN-T3'` exported
- [ ] `AirportId = 'noi-bai' | 'tan-son-nhat'` exported
- [ ] `PickupPoint = { terminalId: TerminalId; location: string }` exported
- [ ] `BusRoute.schedule` is removed; `BusRoute.scheduleSource` exists with the discriminated union
- [ ] `npx tsc --noEmit` exits 0
- [ ] `cd web && npx tsc --noEmit` exits 0
- [ ] RN `npx tsc --noEmit` (or `npx expo tsc`) exits 0
- [ ] Failing tests in `useLandingForm.test.ts` and equivalents are expected — they will pass after 02+03

**Out of scope:**

- Adding new airports (covered by 03)
- New bus routes (covered by 03)
- Migration of existing `TerminalId` consumer code (touched in 02)
