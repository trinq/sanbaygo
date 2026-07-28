---
last_verified: 2026-07-29
sources:
  - path: CONTEXT.md
  - path: AGENTS.md
sources_note: Domain terms and "Avoid" lists come verbatim from the "Language" section of CONTEXT.md. AGENTS.md confirms "Vietnamese Language UI" rule.
summary: Canonical vocabulary for SanBayGo — Actual Arrival, Terminal Exit Time, Catchable Trip, Route Coverage, etc.
---

# Domain Model

This page is the canonical vocabulary for the project. **If a domain term has
multiple candidate names in code or docs, the term used here wins.**

## Terms

### Actual Arrival
**Giờ máy bay thực tế đáp xuống sân bay**, được user nhập từ vé hoặc bảng
thông tin.

The time the plane actually touched down at the airport gate. **User-entered**,
from their boarding pass or the arrivals board.

_Avoid: "Giờ dự kiến", "scheduled arrival"._ We do not infer this from schedule
data — the user always provides it.

### Terminal Exit Time
**Thời gian từ lúc cánh cửa máy bay mở đến khi user bước ra khỏi terminal**,
phụ thuộc vào terminal type và baggage status.

The elapsed time from the moment the plane door opens until the user is
outside the terminal building. Depends on (a) terminal type
(domestic/international) and (b) whether the user has checked baggage.

_Avoid: "exit time", "walking time", "clearance time"._ None of those
capture the full sequence (baggage carousel, immigration, customs).

### Catchable Trip
**Chuyến xe buýt trên tuyến phù hợp mà user có thể bắt được**, dựa trên
Actual Arrival + Terminal Exit Time + thời gian đi bộ đến điểm đón.

A scheduled bus departure that the user can still board, given their arrival
time, the terminal exit time, and the walking time to the bus stop.

This is the trip the **system** picks; the user does not select a different
trip in the UI.

_Avoid: "nearest bus", "available bus"._ "Catchable" emphasises that the
system has computed, not the user.

### Bus Departure Countdown
**Khoảng thời gian tính từ thời điểm hiện tại của thiết bị đến giờ khởi hành
dự kiến của Catchable Trip.**

The wall-clock minutes between *now* and the scheduled departure of the
catchable trip. **The countdown is not a real-time bus position.** It is a
schedule-only indicator.

Behaviour:
- Format: `Còn khoảng X phút` (floored to integer minutes), refreshed every 60s.
- When <1 minute remains but departure is in the future: `Còn khoảng 0 phút`.
- Shown only when ≤120 minutes remain until departure; hidden when further.
- When "now" is past the scheduled departure: **hidden** (no negative count,
  no auto-advance to a later trip).
- Not rendered when no Catchable Trip exists (`no_service`, `too_late`,
  `missed_last`).

_Avoid: "real-time bus countdown", "live vehicle tracking"._

### Destination Point
Một trong các điểm đến được hệ thống hỗ trợ tính toán. Mỗi điểm có tọa độ
cố định và thời gian di chuyển từ Bus 86 stop gần nhất.

A supported destination, with fixed coordinates and a known walking time
from the nearest Bus 86 stop. Each destination has a `coverage` attribute.

### Route Coverage
Thuộc tính của Destination Point, cho biết điểm đó có nằm trên lộ trình
Bus 86 hay không.

- `full coverage`: the destination *is* a Bus 86 stop (or is the same
  point), so the bus is recommended.
- `no coverage`: requires fallback (Grab, etc.).

### Fallback Recommendation
Phương án thay thế khi Bus 86 không phù hợp hoặc không coverage.

_Avoid: "alternative", "other options"._

### Vehicle Comparison
Bảng so sánh chi tiết các phương tiện cho cùng 1 destination point.

Each row: estimated price, travel time, arrival time, baggage suitability,
comfort, short note. Five providers are always shown: Bus 86, Grab Bike,
Xanh SM Bike, Grab Car, Xanh SM, Be.

### Smart Sort Order
Default: Bus 86 first (recommended). User can switch to:

- Cheapest first (ascending price)
- Fastest first (shortest travel time)

## System rules (from CONTEXT.md)

- System always prefers Bus 86 when a Catchable Trip exists AND the
  destination has full coverage.
- System does not track real-time flight delay.
- User enters Actual Arrival; system computes everything downstream.
- Travel time estimates combine static data with real-time API (if/when
  the deferred Google Maps integration is added).
- Grab integration is **estimate-only**; no deep-link booking.