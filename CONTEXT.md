# SanBayGo

App giúp người đi từ sân bay về thành phố nắm rõ lịch trình xe buýt và chọn phương tiện phù hợp, ưu tiên xe buýt sân bay.

**Current**: Noi Bai Airport → Hanoi city, Express Bus 86 + Vehicle Comparison
**Future**: Mở rộng thêm nhiều sân bay khác, real-time traffic integration

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (App Router) + React |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

**Deferred**: Google Maps API (Directions/Distance Matrix) - can be added later

---

## Language

**Actual Arrival**:
Giờ máy bay thực tế đáp xuống sân bay, được user nhập từ vé hoặc bảng thông tin.
_Avoid_: Giờ dự kiến, scheduled arrival

**Terminal Exit Time**:
Thời gian từ lúc cánh cửa máy bay mở đến khi user bước ra khỏi terminal, phụ thuộc vào terminal type và baggage status.
_Avoid_: Exit time, walking time, clearance time

**Catchable Trip**:
Chuyến xe buýt 86 mà user có thể bắt được, dựa trên Actual Arrival + Terminal Exit Time + walking time đến điểm đón.
_Avoid_: Nearest bus, available bus

**Destination Point**:
Một trong các điểm đến được hệ thống hỗ trợ tính toán. Mỗi điểm có tọa độ cố định và thời gian di chuyển từ Bus 86 stop gần nhất.

**Route Coverage**:
Thuộc tính của Destination Point, cho biết điểm đó có nằm trên lộ trình Bus 86 hay không.
- Full coverage: Bus 86 đi thẳng đến điểm gần nhất
- No coverage: Cần fallback sang Grab hoặc phương tiện khác

**Fallback Recommendation**:
Phương án thay thế khi Bus 86 không phù hợp hoặc không coverage.
_Avoid_: Alternative, other options

**Vehicle Comparison**:
Bảng so sánh chi tiết các phương tiện cho cùng 1 destination point.
Mỗi phương tiện hiển thị: Giá ước tính, thời gian, giờ đến nơi, mức độ phù hợp hành lý, độ thoải mái, nhận xét ngắn.

**Smart Sort Order**:
Mặc định hiển thị Bus 86 đầu tiên (recommended first). User có thể đổi:
- Cheapest first (theo giá tăng dần)
- Fastest first (theo thời gian ngắn nhất)

---

## Rules

- System luôn ưu tiên Bus 86 nếu Catchable Trip tồn tại và Destination Point có full coverage
- System không tracking real-time flight delay
- User nhập Actual Arrival, system tính toán tất cả từ đó
- Vehicle comparison hiển thị tất cả 5 providers: Bus 86, Grab Bike, Xanh SM Bike, Grab Car, Xanh SM, Be
- Travel time estimates: kết hợp static data (Supabase DB) + real-time API (nếu có)
- Google Maps API: deferred, sẽ add sau khi cần thiết
- Grab integration: chỉ hiển thị estimate, không deep link đặt xe

---

## Data

### Transport Options

| ID | Name | Type | Base Price | Notes |
|----|------|------|------------|-------|
| BUS_86 | Bus 86 | Bus | 35,000 VND | Express airport bus |
| GRAB_BIKE | Grab Bike | Motorbike | ~80,000 VND | Most affordable private |
| XANH_SM_BIKE | Xanh SM Bike | Motorbike | ~80,000 VND | VinGroup electric bike |
| GRAB_CAR | Grab Car | Car 4-seat | ~250,000 VND | Grab economy |
| XANH_SM | Xanh SM | Electric Car | ~280,000 VND | VinGroup electric car |
| BE | Be Car | Car | ~250,000 VND | Local Vietnam |

Note: Prices are estimates, vary by demand/surge. Include airport toll (~15,000 VND).

### Bus 86 - Express Airport Bus

| Thuộc tính | Giá trị |
|------------|---------|
| Operator | Xí Nghiệp Xe Buýt Nhanh BRT Hà Nội |
| Ticket Price | 50,000 VND |
| Travel Time (normal) | 55 phút |
| Travel Time (peak) | 70 phút |
| Operating Hours | 06:40 - 22:15 (Airport → City) |

#### Pickup Points

| Terminal | Vị trí |
|----------|--------|
| T1 (Domestic) | Tầng 1 sảnh đến, đối diện cột 12 |
| T2 (International) | Tầng 1 sảnh đến, đối diện cột 14 |

#### Main Stops

```
Sân bay Nội Bài (T1/T2)
→ 523 Lạc Long Quân
→ Điểm trung chuyển Long Biên (E3.4)
→ 162 Trần Quang Khải
→ Nhà hát Lớn
→ Khách sạn Melia
→ Ga Hà Nội
```

#### Departure Schedule (Airport → City)

```
06:40, 07:20, 08:00, 08:40, 09:15, 09:40, 10:25, 11:00,
11:40, 12:20, 12:45, 13:15, 13:50, 14:30, 15:10, 15:40,
16:00, 16:45, 17:20, 17:55, 18:40, 19:20, 20:00, 20:45,
21:30, 22:15
```

#### Travel Time (Airport → City)

| Traffic | Duration |
|---------|----------|
| Normal | 50-70 min |
| Peak (7-9 AM, 5-7 PM) | 60-90 min |

### Destination Points

| ID | Name | Bus 86 Stop | Walking from Bus 86 |
|----|------|-------------|---------------------|
| HANOI_STATION | Ga Hà Nội | Ga Hà Nội | 0 min (stop itself) |
| TRAN_QUANG_KHAI | 162 Trần Quang Khải | 162 Trần Quang Khải | 0 min (stop itself) |
| LONG_BIEN | Long Biên / E3.4 | Điểm trung chuyển Long Biên | 2-5 min |
| OLD_QUARTER | Phố Cổ / Hồ Gươm | Nhà hát Lớn | 5-10 min |
| LAC_LONG_QUAN | 523 Lạc Long Quân | 523 Lạc Long Quân | 0 min (stop itself) |

Note: All points have Bus 86 coverage (full coverage). Fallback to Grab not needed for these destinations.

### Terminal Exit Time Estimates

| Scenario | Exit Time |
|----------|-----------|
| T1 Domestic + Carry-on | ~10-15 min |
| T1 Domestic + Checked Baggage | ~20-30 min |
| T2 International + Carry-on | ~15-30 min (immigration queue) |
| T2 International + Checked Baggage | ~35-60 min (immigration + baggage + customs) |

Note: T2 international has variable immigration wait (15-60 min depending on volume).
