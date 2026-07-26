# 06 — Research: validate SGN travel-time estimates (optional, async)

**What to build:** Validate the SGN travel-time estimates (Bus 109: 30–45 normal / 50–70 peak; Bus 152: 25–35 / 40–55) against real-world data. Sources: BusMap app timing, Moovit trip planner, Google Maps typical duration between SGN and the destination quận (distance + traffic).

**Blocked by:** none — runs in parallel with 04/05

**Status:** ready-for-agent

**Acceptance criteria:**

- [ ] Output file `docs/superpowers/research/2026-07-26-sgn-travel-time.md`
- [ ] For each Bus 109 / Bus 152 / TIA route, document: (a) 3 sample trips from BusMap, (b) peak vs normal spread, (c) recommendation: keep / adjust estimate
- [ ] If estimates are off by >30%, file a follow-up ticket to update `core/data/busSchedules/sgn.ts`

**Out of scope:**

- Live API integration
