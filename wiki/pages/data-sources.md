---
last_verified: 2026-07-29
sources:
  - path: CONTEXT.md
  - path: AGENTS.md
sources_note: File list comes from AGENTS.md's "Static Data Location" section. Airport + route detail (terminal IDs, pickup points, prices, schedules) is from CONTEXT.md.
summary: Inventory of static data files and the canonical facts they encode.
---

# Data Sources

All static data lives in `core/data/`. This page is the canonical inventory —
if a fact about an airport, route, schedule, exit time, or destination is
disputed, the version in `core/data/` wins (after triage).

## Files

| File | Holds |
|------|-------|
| `core/data/airport.ts` | Noi Bai + Tan Son Nhat airport definitions, terminal IDs |
| `core/data/busSchedule.ts` | Bus 86 (26 departures), Route 109, Route 152 |
| `core/data/exitTimeEstimates.ts` | Exit-time matrix (terminal × baggage) |
| `core/data/destinations.ts` | HAN + SGN destination points |
| `core/data/grabEstimates.ts` | Static Grab/Xanh SM/Be estimates |

## Airports (from CONTEXT.md)

### Noi Bai (HAN) — Hà Nội
- T1: domestic (also handles some international)
- T2: international (immigration)
- Express Bus: Route 86, 50,000 VND, 06:40–22:15

### Tan Son Nhat (SGN) — TP.HCM
- T1 (SGN-T1): domestic (old)
- T2 (SGN-T2): international
- T3 (SGN-T3): domestic/international, opened April 2025
- Express Buses:
  - **Route 109** — T3 only (FUTA electric bus, 15,000 / 7,000 VND student,
    05:30–22:00, headway 40–45 min). Does NOT stop at T1/T2.
  - **Route 152** — T1/T2 (Làn B curbside).
    - T1 (old domestic): columns B06–B09, walk out to Làn B.
    - T2 (international): **opposite columns 4 and 5** of the international
      arrivals hall; cross Làn A to reach Làn B.
    - 5,000 / 3,000 VND student, 05:00–22:00, headway ~12–20 min.
    - Phương Trang (FUTA City Bus), electric bus.

## Terminal ID scheme

Globally unique: `HAN-T1`, `HAN-T2`, `SGN-T1`, `SGN-T2`, `SGN-T3`. No
ambiguity when multiple airports are in scope.

## Bus route pickup points

`BusRoute` type has `pickupPoints: { terminalId: TerminalId, location: string }[]`.
Each bus lists the terminals it serves + the exact stop (column/lane).

`BusRoute.scheduleSource` is a discriminated union:

- `{ kind: 'explicit', departures: string[] }` — fixed `HH:mm` list (Bus 86,
  109, 152).
- `{ kind: 'frequency', headwayMinutes: { peak: number, normal: number } }`
  — runs every Nth minute within `operatingHours`. **Currently unused** by
  any SGN route; reserved for future routes.

## Bus 86 — Express Airport Bus (HAN)

| Attribute | Value |
|-----------|-------|
| Operator | Xí Nghiệp Xe Buýt Nhanh BRT Hà Nội |
| Ticket Price | 50,000 VND |
| Travel Time (normal) | 55 min |
| Travel Time (peak) | 70 min |
| Operating Hours | 06:40 – 22:15 (Airport → City) |

### Pickup points

- T1 (Domestic): Tầng 1 sảnh đến, đối diện cột 12
- T2 (International): Tầng 1 sảnh đến, đối diện cột 14

### Departure schedule (Airport → City)

```
06:40, 07:20, 08:00, 08:40, 09:15, 09:40, 10:25, 11:00,
11:40, 12:20, 12:45, 13:15, 13:50, 14:30, 15:10, 15:40,
16:00, 16:45, 17:20, 17:55, 18:40, 19:20, 20:00, 20:45,
21:30, 22:15
```

**26 departures**, matching the AGENTS.md claim of "Bus 86 schedule (26 departures)".

### Travel time (Airport → City)

- Normal: 50–70 min
- Peak (7–9 AM, 5–7 PM): 60–90 min

### Main stops

```
Sân bay Nội Bài (T1/T2)
→ 523 Lạc Long Quân
→ Điểm trung chuyển Long Biên (E3.4)
→ 162 Trần Quang Khải
→ Nhà hát Lớn
→ Khách sạn Melia
→ Ga Hà Nội
```

## Destination points (HAN)

| ID | Name | Bus 86 Stop | Walking from stop |
|----|------|-------------|-------------------|
| HANOI_STATION | Ga Hà Nội | Ga Hà Nội | 0 min (stop itself) |
| TRAN_QUANG_KHAI | 162 Trần Quang Khải | 162 Trần Quang Khải | 0 min (stop itself) |
| LONG_BIEN | Long Biên / E3.4 | Điểm trung chuyển Long Biên | 2–5 min |
| OLD_QUARTER | Phố Cổ / Hồ Gươm | Nhà hát Lớn | 5–10 min |
| LAC_LONG_QUAN | 523 Lạc Long Quân | 523 Lạc Long Quân | 0 min (stop itself) |

All five have full Bus 86 coverage. No Grab fallback required for these.

## Terminal exit time estimates

| Scenario | Exit Time |
|----------|-----------|
| T1 Domestic + Carry-on | ~10–15 min |
| T1 Domestic + Checked Baggage | ~20–30 min |
| T2 International + Carry-on | ~15–30 min (immigration queue) |
| T2 International + Checked Baggage | ~35–60 min (immigration + baggage + customs) |

T2 international immigration is variable (15–60 min depending on volume).

## Grab / ride-hail pickup at SGN (research dated 2026-07-27)

| Terminal | Pickup point |
|----------|--------------|
| T1 (domestic old) | Nhà để xe TCP (across from arrivals hall), Làn D1 ground floor (Làn D2 overflow). Lanes A/B/C are private cars + Bus 152 — **not** ride-hail. User crosses A/B/C into TCP, then books. |
| T2 (international) | Bãi xe công nghệ quốc tế (outdoor). Access from Cột 5GF: exit → turn left → corridor past Cột 8GF, 9GF → Cột 5GF → cross to lot. App shows **Làn B or Làn D** per trip (no fixed lane like T1). |
| T3 (new, opened 04/2025) | Floor 1, Nhà để xe PNA — Cột 34. Grab VN confirmed. Max 3-min driver stop. |

Motorbikes (GrabBike, BeBike) do **not** stop at the lanes; rider meets user
outside the TCP gate (T1) or the car-ticket gate (T2) on Trường Sơn road.

Tolls/port fees (~10–15k VND) are typically **not** included in the
on-app price — paid to the driver on top.

**Anti-scam warning (T2):** the international tech-parking lot has reported
solicitation. Users must verify the licence plate matches the app.