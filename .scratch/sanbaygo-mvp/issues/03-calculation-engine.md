# 03 — Calculation Engine

**What to build:** Tách biệt business logic thành pure functions, kèm unit tests đầy đủ.

**Blocked by:** 02 — Data Model & Static Data

**Status:** ready-for-agent

- [ ] `calculateExitTime(terminal, baggage)`: Trả về TimeRange dựa trên terminal type và baggage
- [ ] `isPeakHour(time)`: Trả về boolean, peak = 07:00-09:00 hoặc 17:00-19:00
- [ ] `findNextCatchableTrip(arrivalTime, exitTime, schedule)`: Tìm chuyến xe đầu tiên có thể bắt được
- [ ] `calculateArrivalEstimate(trip, destination, isPeak)`: Tính thời gian đến nơi ước tính
- [ ] Unit tests cho tất cả functions
- [ ] Tests cho edge cases: peak boundaries, last bus, outside operating hours

