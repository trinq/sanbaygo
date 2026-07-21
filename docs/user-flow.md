# User Flow - SanBayGo MVP

## Happy Path

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  START: User lands at Noi Bai Airport                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: Enter Actual Arrival Time                                          │
│  ─────────────────────────────────                                          │
│  User nhập giờ máy bay đáp (từ vé / bảng thông tin)                        │
│  Format: HH:MM                                                              │
│  Example: 15:30                                                             │
│                                                                             │
│  Validation: 00:00 - 23:59                                                   │
│  Default: current time                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 2: Select Terminal                                                     │
│  ─────────────────────────────────                                          │
│  [T1 - Domestic]  [T2 - International]                                       │
│                                                                             │
│  T1: "Chuyến bay nội địa"                                                   │
│  T2: "Chuyến bay quốc tế"                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 3: Select Baggage Status                                               │
│  ─────────────────────────────────                                          │
│  [Có hành lý ký gửi]  [Chỉ hành lý xách tay]                               │
│                                                                             │
│  Đây ảnh hưởng đến Terminal Exit Time estimate                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 4: Select Destination                                                 │
│  ─────────────────────────────────                                          │
│  [Ga Hà Nội]                                                                │
│  [162 Trần Quang Khải]                                                      │
│  [Long Biên / E3.4]                                                         │
│  [Phố Cổ / Hồ Gươm]                                                        │
│  [523 Lạc Long Quân]                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 5: System Calculates                                                  │
│  ─────────────────────────────────                                          │
│                                                                             │
│  1. Terminal Exit Time = f(terminal, baggage)                              │
│     → T2 International + Baggage = 35-60 min                                │
│     → T1 Domestic + Carry-on = 10-15 min                                   │
│                                                                             │
│  2. Peak Detection = f(actual_arrival_time)                                │
│     Peak if: 07:00-09:00 OR 17:00-19:00                                    │
│                                                                             │
│  3. Available Bus Trips = departures AFTER                                 │
│     (actual_arrival + terminal_exit_time + walking_to_pickup)             │
│                                                                             │
│  4. First Catchable Trip = first departure that user can reach             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 6: Display Results                                                    │
│  ─────────────────────────────────                                          │
│                                                                             │
│  ┌─────────────────────────────────────────────┐                           │
│  │  🚌 XE BUÝT 86 - KHẢ DỤNG                    │                           │
│  │                                              │                           │
│  │  Chuyến gần nhất: 15:55                      │                           │
│  │  (Bạn có thể bắt được)                       │                           │
│  │                                              │                           │
│  │  Điểm đón: T2, đối diện cột 14              │                           │
│  │  Giá vé: 50,000 VND                         │                           │
│  │  Thời gian di chuyển: ~55-70 phút           │                           │
│  │  (peak: ~70-90 phút)                        │                           │
│  │                                              │                           │
│  │  Dự kiến đến nơi: 16:50 - 17:05             │                           │
│  └─────────────────────────────────────────────┘                           │
│                                                                             │
│  ┌─────────────────────────────────────────────┐                           │
│  │  🚗 GRAB (tham khảo)                         │                           │
│  │                                              │                           │
│  │  Giá ước tính: 250,000 - 350,000 VND         │                           │
│  │  Thời gian: 40-60 phút                       │                           │
│  │  (peak: 60-90 phút)                          │                           │
│  └─────────────────────────────────────────────┘                           │
│                                                                             │
│  ┌─────────────────────────────────────────────┐                           │
│  │  📍 HƯỚNG DẪN NGẮN GỌN                      │                           │
│  │                                              │                           │
│  │  1. Ra khỏi sảnh đến Tầng 1                 │                           │
│  │  2. Đi đến đối diện cột 14                  │                           │
│  │  3. Đợi xe buýt 86                          │                           │
│  │  4. Xuống tại Ga Hà Nội                    │                           │
│  └─────────────────────────────────────────────┘                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Edge Cases

### Case 1: No catchable bus (too late for last departure)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🚫 KHÔNG CÓ CHUYẾN XE BUÝT 86                                           │
│                                                                             │
│  Chuyến cuối khởi hành lúc 22:15                                          │
│  Bạn sẽ ra terminal vào khoảng 22:05                                       │
│  → Không đủ thời gian bắt chuyến cuối                                     │
│                                                                             │
│  📱 Khuyến nghị: Gọi Grab hoặc taxi                                       │
│     Giá ước tính: 250,000 - 350,000 VND                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Case 2: Arrival outside operating hours

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🌙 XE BUÝT 86 KHÔNG HOẠT ĐỘNG                                            │
│                                                                             │
│  Giờ hoạt động: 06:40 - 22:15                                              │
│  Bạn đáp sau 22:15 → Xe buýt đã ngưng                                      │
│                                                                             │
│  📱 Khuyến nghị: Gọi Grab (24/7) hoặc taxi                                │
│     Giá ước tính: 250,000 - 350,000 VND                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Case 3: User just missed a bus

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⏰ BẠN VỪA BỎ LỠ CHUYẾN 15:40                                             │
│                                                                             │
│  Chuyến tiếp theo: 15:55                                                    │
│  Thời gian chờ: ~15 phút                                                   │
│                                                                             │
│  Dự kiến đến nơi: 16:50 - 17:00                                            │
│                                                                             │
│  💡 Tip: Đi bộ ngay đến điểm đón để không bỏ lỡ thêm                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Decision Tree (System Logic)

```
Input: actual_arrival, terminal, baggage, destination
│
├─► Calculate: exit_time = get_exit_time(terminal, baggage)
│
├─► Calculate: peak = is_peak_hour(actual_arrival)
│
├─► Calculate: ready_time = actual_arrival + exit_time + 5min_walking
│
├─► Find: first_trip = next_departure_after(ready_time)
│
├─► Calculate: travel_time = normal_time if not peak else peak_time
│
├─► Calculate: arrival_estimate = first_trip.departure + travel_time
│
├─► OUTPUT: recommendation
│
└─► If first_trip exists AND within operating hours:
        → Show Bus 86 recommendation
        → Show Grab fallback (static)
    Else:
        → Show Grab only
```

---

## Screen Mockup (Text-based)

### Input Screen

```
┌─────────────────────────────────────────┐
│                                         │
│     ✈️  SANBAYGO                      │
│                                         │
│  Giờ máy bay đáp                      │
│  ┌─────────────────┐                   │
│  │ 15:30           │                   │
│  └─────────────────┘                   │
│                                         │
│  Nhà ga                                 │
│  ┌───────────────┬───────────────┐     │
│  │  T1 Nội địa   │●│ T2 Quốc tế  │     │
│  └───────────────┴───────────────┘     │
│                                         │
│  Hành lý                                 │
│  ┌───────────────┬───────────────┐     │
│  │●│Có ký gửi    │ │ Chỉ xách tay │     │
│  └───────────────┴───────────────┘     │
│                                         │
│  Điểm đến                                │
│  ┌─────────────────────────────┐       │
│  │▼ Ga Hà Nội                   │       │
│  ├─────────────────────────────┤       │
│  │  162 Trần Quang Khải         │       │
│  │  Long Biên / E3.4             │       │
│  │  Phố Cổ / Hồ Gươm            │       │
│  │  523 Lạc Long Quân            │       │
│  └─────────────────────────────┘       │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         XEM KẾT QUẢ            │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Result Screen

```
┌─────────────────────────────────────────┐
│  ← Quay lại                              │
│                                         │
│  🚌 XE BUÝT 86                         │
│  ═══════════════════════════════════════ │
│                                         │
│  ✅ Có thể bắt được                     │
│                                         │
│  Chuyến: 15:55                          │
│  Điểm đón: T2, đối diện cột 14         │
│  Giá: 50,000 VND                        │
│                                         │
│  ───────────────────────────────────────│
│  ⏱️ Thời gian di chuyển                  │
│     ~55 phút (không kẹt xe)             │
│     ~70-90 phút (giờ cao điểm)           │
│                                         │
│  ───────────────────────────────────────│
│  📍 Dự kiến đến: 16:50 - 17:05          │
│                                         │
│  ───────────────────────────────────────│
│  📋 Hướng dẫn                          │
│     1. Ra sảnh Tầng 1                  │
│     2. Đến đối diện cột 14             │
│     3. Đợi xe buýt 86                  │
│     4. Xuống tại Ga Hà Nội             │
│                                         │
│  ───────────────────────────────────────│
│                                         │
│  🚗 GRAB (tham khảo)                    │
│  Giá: 250,000 - 350,000 VND             │
│  Thời gian: 40-90 phút                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## Validation Rules

| Field | Rules |
|-------|-------|
| Arrival Time | Required, HH:MM format, 00:00-23:59 |
| Terminal | Required, must select one |
| Baggage | Required, must select one |
| Destination | Required, must select one |

---

## Error States

| Scenario | Message |
|----------|---------|
| Missing time | "Vui lòng nhập giờ máy bay đáp" |
| Missing terminal | "Vui lòng chọn nhà ga" |
| Missing baggage | "Vui lòng chọn loại hành lý" |
| Missing destination | "Vui lòng chọn điểm đến" |
