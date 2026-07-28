# SanBayGo — Nghiên cứu tính năng (Session 14, 2026-07-28)

> Mục đích: tổng hợp bằng chứng từ codebase hiện tại, các nguồn bên ngoài năm 2026, và pain point thực tế của hành khách, từ đó đề xuất thứ tự ưu tiên các tính năng tiếp theo cho SanBayGo. Tài liệu này chỉ nhằm mục tiêu nghiên cứu — không yêu cầu sửa code trong phiên này.

---

## 1. Các phần của SanBayGo hiện tại

### 1.1 Cấu trúc monorepo

```
sanbaygo/
├── core/                    # Logic kinh doanh chia sẻ (TypeScript thuần)
│   ├── types/index.ts
│   ├── data/                # airport.ts, busSchedule.ts, grabEstimates.ts, …
│   ├── calculation-engine/  # isPeakHour, calculateExitTime, …
│   └── calculate-trip.ts    # Canonical entry point
├── web/                     # Vite + React
│   ├── src/components/{Landing, Result, RouteMap}
│   └── __tests__/           # chỉ 3 file (hooks + design-system)
├── app/                     # Expo Router (RN)
│   ├── hooks/, _layout.tsx, index.tsx
│   └── components/Landing/  # SearchCard, LandingPage (legacy)
├── api/                     # Express + routes/services (nhiều stub)
└── design-system/tokens/    # tokens.ts, index.ts
```

### 1.2 Tính năng đã chạy (đã verify bằng test/E2E)

- `core/` có 92/92 unit test pass; `web/` có 3 file test hẹp.
- Web landing: `Landing/Hero.tsx`, `Landing/SearchCard.tsx` chuyển sang Figma-style sky-blue + glass (xem `landing-hero-web` trong `feature_list.json`).
- Web result: `ResultPage.tsx` đã mirror Figma Make screen (sticky header, timeline 4 bước, primary bus card, divider, ride-hail card).
- Web `RouteMap/` có metro-style SVG cho 3 tuyến (Bus 86, 109, 152) — `Bus152Stops.ts` (17 stops × 2 chiều), `Bus86Stops.ts` (6 stops × 2), `Bus109Stops.ts` (6 stops × 2).
- RN landing: Hero + SearchCard với `expo-blur` + `NativeWind`, mirror web (`landing-hero-rn`).
- Tính năng 2-sân-bay (HAN, SGN) đã wired xuyên suốt `core/data/airports/{han,sgn}.ts` và `calculate-trip.ts`.

### 1.3 Domain model trọng yếu (`core/types/index.ts`)

- `Airport`, `Terminal` (kèm `flightTypes: FlightType[]`), `PickupPoint`.
- `BusRoute` có `scheduleSource: { kind:'explicit'|'frequency', …}`.
- `GrabEstimate` có `pickupLocations?: Partial<Record<TerminalId, string>>`.
- `ArrivalFormData` gồm `arrivalTime`, `airportId`, `terminal`, `baggage`, `destination`, `flightType`.
- Chưa có type nào cho `AirportFee`, `RealTimeProvider`, `TransferInfo`, hay `BusStop` chuẩn.

---

## 2. Vấn đề thực tế và điểm đau của người dùng (năm 2026)

> Phân loại: **[Fact]** = bằng chứng trong repo; **[Web]** = trích từ nguồn có URL; **[Inference]** = suy luận từ hai phía trên.

| Vấn đề | Bằng chứng |
| --- | --- |
| Bắt Grab khó vì thiếu điểm đón rõ ràng | **[Web]** Tuổi Trẻ: T3 mới mở đã tắc nghẽn pickup vì thiếu làn riêng ([news.tuoitre.vn/.../t3-pickup-woes](https://news.tuoitre.vn/tan-son-nhats-t3-terminal-faces-pickup-woes-despite-modern-design-103250811140137444.htm)); Grab cấm đón curbside nên phải đi xa tới làn chỉ định ([travelinstinctoz.com](https://travelinstinctoz.com/2026/06/23/hcmc-how-to-find-grab-at-tan-son-nhat/), [123dzovietnam.com](https://123dzovietnam.com/how-to-get-a-grab-from-tan-son-nhat-airport/)) |
| Lái xe "bait and switch" Grab | **[Web]** vietnam-tour.biz 2026: không khớp biển số → từ chối lên xe ([vietnam-tour.biz/noi-bai-airport-hanoi-city-center](https://www.vietnam-tour.biz/noi-bai-airport-to-hanoi-city-center/)) |
| Taxi "lái mồi" + phí ẩn (phí sân bay, hành lý, đường) | **[Web]** hanoishuttle.com 2026 ([hanoishuttle.com/.../hanoi-airport-scams](https://hanoishuttle.com/guide/hanoi-airport-scams-how-to-avoid/)); avia.vn note lái xe thêm phí ([avia.vn/hanoi-airport-taxi](https://avia.vn/hanoi-airport-taxi/)) |
| Chuyến bay trễ → bỏ luôn xe buýt cuối / phải chờ chuyến sau | **[Web]** Grab VN: Advance Booking tự theo dõi trễ chuyến ≥30 phút, hoàn nếu >6 giờ ([grab.com/vn/en/terms-policies/advance-booking-terms](https://www.grab.com/vn/en/terms-policies/advance-booking-terms/)); Citymapper, Transit, Moovit đều có "alert when delay" ([play.google.com](https://play.google.com/store/apps/details?id=com.citymapper.app.release)) |
| T1 quốc nội đôi khi có chuyến quốc tế → exit time dễ đoán sai | **[Fact]** `web/src/hooks/useLandingForm.ts:66` lấy `flightTypes[0] ?? type` mặc định `domestic` — user không có UI chọn flight type |
| Hành khách 2 người trở lên bị thiếu giá tổng | **[Fact]** `ArrivalFormData` không chứa `numberOfPassengers` (xem `core/types/index.ts:122`); `web/src/hooks/useLandingForm.ts` có state `people` nhưng không truyền vào form |
| App Grab/Xanh SM chỉ đón 3 phút → không biết khi nào nhấn "Đặt xe" | **[Web]** 123dzovietnam.com 2026 ([...](https://123dzovietnam.com/how-to-get-a-grab-from-tan-son-nhat-airport/)) |
| T3 không walkable từ T1/T2, cần shuttle miễn phí | **[Web]** vietnamparadisetravel.com 2026: T3 cách T1/T2 ~850 m, phải taxi/Grab/shuttle ([vietnamparadisetravel.com/blog/tan-son-nhat-airport](https://www.vietnamparadisetravel.com/blog/tan-son-nhat-airport)) |
| Transfer xe buýt (T1/T2 → T3) mất 15–20 phút chờ + chuyển | **[Fact]** `findCatchableBusForTerminal.test.ts` import `TIA` từ `core/data/busSchedules/sgn` nhưng file đó không có `BUS_TIA`, lệch với plan `2026-07-26-sgn-multi-airport.md` |
| Grab card trên web là dead stub | **[Fact]** `web/src/components/Result/ResultPage.tsx:303` vẫn `href="#"` + `e.preventDefault()` |
| Phí sân bay 10–15k VND không nhắc user | **[Fact]** `core/data/grabEstimates/sgn.ts:63` ghi trong comment nhưng UI không hiển thị |
| Số liệu giá Grab sai trong test fixture SGN | **[Fact]** `web/__tests__/components/Result/ResultPage.test.tsx:90` ghi `90000-150000 VND`, lệch với `SGN_GRAB_ESTIMATE.priceRange {100000, 180000}` |
| RN app vẫn dùng shape `departure/luggage` cũ, không chọn được airport | **[Fact]** `app/hooks/useLandingForm.ts` hardcode `'T1'`; `components/Landing/LandingPage.tsx` truyền `arrivalTime="12:00"` cứng |
| Coverage test web rất mỏng → regression 2026-07-27 (bus schedule time shape) đã trượt một lần | **[Fact]** `feature_list.json` feature `web-bus-schedules-time-shape` đã sửa nhưng chỉ có 3 test file |
| Map chỉ highlight khi `RouteMap/getDestinationStopId` match hardcode | **[Fact]** mapping `ResultPage.tsx:81–115` chỉ cover `'q1'`-`'ben-thanh'`; `q3/q5/binh-thanh/phu-nhuan` đều rơi về `'ben-thanh'` |

---

## 3. Đối thủ và xu hướng 2026

### 3.1 Đối thủ trực tiếp

- **[Web]** Google Maps chỉ chuyển transit khi agency đẩy dữ liệu lên Google Transit ([support.google.com/maps/answer/144339](https://support.google.com/maps/answer/144339)). Tại VN, Bus 86/109/152 không có trên Google Maps chính thức → khoảng trống của SanBayGo là có thật.
- **[Web]** Citymapper, Moovit: hỗ trợ "next bus", "disruption alert", Wear OS, chia sẻ live trip với bạn bè ([play.google.com .../citymapper](https://play.google.com/store/apps/details?id=com.citymapper.app.release), [play.google.com .../moovit](https://play.google.com/store/apps/details?hl=en_US&id=com.tranzmate)).
- **[Web]** Rome2Rio: multi-city travel planning, không có tích hợp airport-hotel transit chuyên sâu.
- **[Web]** Grab Advance Booking + flight tracking (Sandbox Viet Nam) ([grab.com/vn/en/transport/advance-booking](https://www.grab.com/vn/en/transport/advance-booking/)).
- **[Web]** Xanh SM Green Airport + code-share với Vietjet ([greensm.com/vn-en/green-airport](https://www.greensm.com/vn-en/green-airport), [greensm.com/vn-en/news/fly-with-vietjet](https://www.greensm.com/vn-en/news/fly-with-vietjet-ride-with-xanh-sm-pre-book-your-seamless-airport-taxis)).
- **[Web/Memo]** **Bước ngoặt thị trường 2026 — Xanh SM vượt Grab**: GSM 54,51% vs Grab 40,92% vs Be 4,57% (Mordor Q1/2026 — <https://vnauto.net/2026/04/30/green-sm-maintains-dominance-in-vietnams-taxi-hailing-market-in-q1-2026/>; cổng Vietnam.vn — <https://www.vietnam.vn/en/gsm-nam-hon-mot-nua-thi-phan-taxi-cong-nghe-doanh-thu-17-400-ty>); Q&Me 12/2025–01/2026 cũng cho GSM 52% / Grab 44% / Be 4% (<https://www.vietnam.vn/en/lan-dau-tien-ung-dung-goi-xe-cua-nguoi-viet-dan-dau-thi-truong>). Grab và Be **phản đối** figures của Mordor. SanBayGo CONTEXT.md chưa phản ánh sự thay đổi này.
- **[Web/Memo]** **Pin queue Grab** ra mắt 30/06/2026 tại sân bay Đà Nẵng (quốc nội) — user nhận PIN 4 số, đến điểm đón A, đưa PIN cho tài xế bất kỳ, khởi hành ngay. Nguồn: <https://xe.today/2026/07/05/seamless-airport-rides-book-your-grab-without-the-wait/>, <https://saigoneconomy247.net/tin-vui-cho-nguoi-dat-grab-tai-san-bay-dat-xe-khong-can-cho-doi-a269171.html>. Đây đúng là pattern SanBayGo thiếu.
- **[Web/Memo]** **VinBus E10** (VinGroup/VinBus, điện): Ocean Park ↔ Nội Bài, 9.000 VND, headway 20 phút, 05:00–22:00, ra mắt 01/01/2024. Nguồn: <https://hanoitimes.vn/electric-bus-route-officially-opened-to-hanois-airport.591713.html>, <https://laodongthudo.vn/chinh-thuc-co-xe-buyt-dien-vinbus-ket-noi-noi-do-ha-noi-toi-san-bay-noi-bai-164585.html>. SanBayGo **chưa có tuyến E10 trong data layer**.
- **[Web/Memo]** **Tuyến 109** chuyển sang xe buýt điện từ 28/04/2025, giá 8.000–15.000 VND, 110 chuyến/ngày, wifi + màn hình thông minh. Nguồn: <https://tienphong.vn/cong-ty-phuong-trang-chinh-thuc-dua-vao-van-hanh-xe-buyt-dien-tuyen-109-ket-noi-san-bay-tan-son-nhat-nha-ga-t3-post1737604.tpo>, <https://tuoitre.vn/nld/them-xe-buyt-dien-ket-noi-nha-ga-t3-san-bay-tan-son-nhat-19625042808095259.htm>. Đã có trong data (15.000 VND, 23 departures).
- **[Web/Memo]** **Tuyến 152** điện hóa do FUTA vận hành từ 01/03/2026 (16 tuyến mới). Nguồn: <https://www.electrive.com/2026/02/25/ho-chi-minh-city-launches-additional-25-electric-bus-routes/>, <https://vietnamnet.vn/en/ho-chi-minh-city-to-launch-25-electric-bus-routes-from-march-1-2492366.html>. Đã có trong data.
- **[Web/Memo]** **BusMap** — đối thủ chiến lược trên mảng "xe buýt sân bay": 600K user/năm, GPS thời gian thực, multi-modal (bus + metro + xe ôm + taxi), offline. <https://busmap.vn/tinh-nang/>. SanBayGo giữ lợi thế ở so sánh chi phí & pickup chuyên biệt, nhưng **thiếu nguồn realtime**.
- **[Web/Memo]** **Moovit** đã có sẵn tuyến 86 hai chiều với realtime countdown + auto-alight (<https://moovitapp.com/index/en/public_transit-line-86-H%C3%A0_N%E1%BB%99i-2921-1597502-17099406-0>) — đối thủ đã giải xong bài toán RouteMap hai chiều SanBayGo mới hoàn thành.

### 3.2 Xu hướng dữ liệu & tiêu chuẩn

- **[Web]** GTFS Realtime 2.0 là chuẩn dữ liệu thời gian thực toàn cầu, kèm trường `wheelchair_accessible` realtime ([developers.google.com/transit/gtfs-realtime](https://developers.google.com/transit/gtfs-realtime), [github.com/google/transit/.../reference.md](https://github.com/google/transit/blob/master/gtfs-realtime/spec/en/reference.md)). Cơ hội tiềm năng: SanBayGo có thể mở rộng ingest GTFS-RT sau này (BusMap/MultiGo đã có nguồn).
- **[Web]** MaaS tại sân bay: hợp nhất nhiều mode, dự đoán chính xác 89–92% mode khuyến nghị ([dataintelo.com/report/.../airport-ground-transport](https://dataintelo.com/report/maas-integration-for-airport-ground-transport-market)).
- **[Web]** EU MAIA: digital twin + AI dispatch cho SAV/UAM tích hợp với hạ tầng sân bay ([cordis.europa.eu/project/id/101114853](https://cordis.europa.eu/project/id/101114853)) — kim chỉ nam dài hạn (ngoài MVP).
- **[Web/Memo]** **Digital Arrival Card** bắt buộc tại Nội Bài từ **07/2026** (trước chỉ bắt buộc tại SGN) — <https://blog.wego.com/hanoi-airport-guide/>. Tác động phụ: phải khai báo trước khi vào immigration → thời gian exit terminal tại T2 HAN tăng.
- **[Web/Memo]** **Metro Line 1 mở rộng → Long Thành** phê duyệt 28/04/2026, vốn ~2,5–2,7 tỷ USD, triển khai 2026–2030 (<https://en.vneconomy.vn/25-bln-to-be-invested-in-metro-line-linking-hcmc-and-long-thanh-airport.htm>). Trong 24–36 tháng tới, bối cảnh "xe buýt sân bay" tại HCMC sẽ phức tạp hơn nhiều.

### 3.3 Bài học cho SanBayGo

- **[Inference]** Nguồn ground-truth của sân bay VN (đón xe, phí, giờ hoạt động) thay đổi liên tục (T3 mở 2025, T3 pickup reorganise 2026, VinBus E10 tuyến mới, Metro 2030). SanBayGo MVP với dữ liệu tĩnh đã có lợi thế đáng kể so với Google Maps, nhưng cần pipeline cập nhật có kiểm soát.
- **[Inference]** Người dùng VN kỳ vọng "đặt Grab trong 5 giây" — link trỏ về `grab.com/vn/` + cảnh báo điểm đón là bắt buộc, không phải nice-to-have. Đồng thời, **không nên chỉ dẫn về 1 nhà cung cấp** — Xanh SM đã là lựa chọn #1 (54,51% Mordor Q1/2026) và đang được curbside tại SGN-T1/T2.
- **[Inference]** Bài toán "còn bao nhiêu phút nữa xe đến" rất khó, ngay cả Grab cũng có sai số. SanBayGo dùng schedule tĩnh **phải truyền thông rõ ràng** "giờ là dự kiến, không phải thực tế".

---

## 4. Khoảng trống tính năng — so sánh nhu cầu với code hiện tại

| Nhu cầu người dùng | Code hiện tại | Khoảng trống |
| --- | --- | --- |
| Nhấn "Gọi Grab" phải mở app/website | `ResultPage.tsx` còn `href="#"` | Feature A: Deep link Grab + highlight điểm đón |
| **Mở cả Xanh SM** — đã vượt Grab 54,51% Q1/2026 (Mordor) | chỉ 1 Grab card | Feature M: Thêm Xanh SM card với pickup points curbside tại SGN (Làn A/C) |
| Biết phí sân bay 10–15k | comment trong `grabEstimates/sgn.ts` | Feature B: Hiển thị phí trên Grab card |
| Bắt GrabBike/GrabCar khác nhau | chỉ 1 card tổng | Feature C (nice-to-have): split vehicle type |
| **Bắt Pin Queue Grab** (mô hình Đà Nẵng 06/2026) | không có | Feature N: Copy-to-clipboard PIN sau khi user mở Grab |
| Tính giá bus cho cả gia đình | `ArrivalFormData` không có passengers | Feature D: Multi-passenger breakdown |
| User chọn "quốc tế" tại T1 | không có UI selector | Feature E: Flight type chips → sửa exit time |
| **Tuyến E10 (VinBus)** — 9.000 VND vs Bus 86 45.000 VND | không có trong data | Feature O: Thêm `BUS_E10` vào `core/data/busSchedules/han.ts` |
| Cập nhật điểm đón T3 (PNA / pillar 34) | đã có `SGN_GRAB_ESTIMATE.pickupLocations`; test fixture sai | Feature F: Chuẩn hóa test fixture SGN |
| Không bắt được xe buýt → hướng dẫn transfer miễn phí sang terminal khác | `findCatchableBusForTerminal.test.ts` mong đợi `TIA`; file `BUS_TIA` chưa tồn tại | Feature G: Model TIA shuttle (free, frequency 15/20') |
| **Hỗ trợ SIM/eSIM** để Grab hoạt động (prerequisite) | không có | Feature P: Link affiliate eSIM (Airalo/Holafly) trên result |
| Thấy điểm dừng tương ứng trên map | `getDestinationStopId` hardcode, map lệch | Feature H: Chuẩn hóa stop-id ↔ destination-id mapping |
| Đếm ngược tới chuyến xe buýt tiếp theo | không có timer | Feature I: Countdown timer (làm mới 30 giây) |
| **Cảnh báo lừa đảo** tại sân bay (5/6 scam "high risk" theo Tabiji.ai) | chỉ hướng dẫn chung trong note | Feature Q: Slide scam-warning sau submit |
| Cảnh báo chuyến bay trễ | không có | Feature J (nice-to-have): Flight-aware ước lượng (sau khi đăng nhập flight) |
| **Digital Arrival Card** — bắt buộc tại HAN từ 07/2026 | không đề cập | Feature R: Hiển thị deadline trước khi bay + deep link |
| RN app dùng được SGN + flight picker | đang cứng T1 | Feature K: Mirroring RN ↔ Web (AirportPicker, FlightTypeChips) |
| Regression coverage | 3 test file trên web | Feature L: mở rộng Playwright e2e (SGN flow, no-service, route-map) |
| **Ngôn ngữ hướng dẫn EN dán sẵn** (e.g. "xác nhận biển số trước khi lên xe") | vi/en chỉ toggle labels | Feature S: Quick-phrase clipboard cho du khách nước ngoài |
| **Metro Line 1 mở rộng Long Thành** (2030) | chưa có roadmap | Feature T: Theo dõi tiến độ để model metro khi vận hành |

---

## 5. Đề xuất ưu tiên tính năng (research-only, không thực thi trong phiên này)

### P0 — "Unblock grounded now" (1–2 phiên mỗi cái)

1. **Feature A — Grab deep link + pickup-location hint**
   - Phạm vi: `web/src/components/Result/ResultPage.tsx:301–306`. Thay `href="#"` bằng `https://grab.com/vn/?utm_source=sanbaygo` (desktop) và `grab://` scheme (mobile), kèm `target="_blank" rel="noopener noreferrer"`. Đặt dưới card, đã có sẵn `grabPickupLocation`.
   - Tác động UX: giải quyết "vì sao Grab card là dead stub" + hợp nhất tín hiệu đón xe.
2. **Feature B — Airport fee note**
   - Phạm vi: thêm `airportFeeNote?: string` vào `GrabEstimate` trong `core/types/index.ts`. Render dưới giá Grab.
   - Tác động UX: không bất ngờ 10–15k VND.
3. **Feature F — SGN Grab price fixture fix**
   - Phạm vi: 1 dòng test fixture (`web/__tests__/components/Result/ResultPage.test.tsx:90`) → `100000 - 180000 VND`. Pin để lần sau không drift.
4. **Feature M — Xanh SM card (theo bước ngoặt GSM 54,51%)** [Quick win, dựa memo market-research §5.2]
   - Phạm vi: thêm `XS_GRAB_ESTIMATE` vào `core/data/grabEstimates/` với pickup points curbside (SGN-T1 Làn C cột C3–C15, SGN-T2 Làn A cột A1–A3 — nguồn: <https://www.xanhsm.com/news/xanh-sm-airport-trien-khai-tai-san-bay-quoc-te-tan-son-nhat-huong-dan-don-xe-taxi-san-bay-va-bang-gia-dich-vu>). Thêm card thứ 2 dưới Grab card.
   - Tác động UX: phản ánh đúng tỉ trọng thị trường, giảm nguy cơ user bị "bait-and-switch" từ tài xế Grab giả.

### P1 — "Mở rộng data + UX" (1 phiên mỗi cái)

5. **Feature D — Multi-passenger breakdown**
   - Phạm vi: thêm `numberOfPassengers: number` vào `ArrivalFormData`; wire từ `useLandingForm.people`; tính `ticketPrice * passengers` trên UI bus card; hiển thị “× N khách / tổng X₫”.
   - Tác động: gia đình/đoàn dễ quyết định.
6. **Feature E — Flight type selector**
   - Phạm vi: `FlightTypeChips` mới; thêm `flightType` vào search card; đảm bảo `useLandingForm` ép `flightTypes[0]===domestic` thành fallback tạm — chip user chọn sẽ override.
   - Tác động: fix exit time bị đoán sai cho T1 international.
7. **Feature G — TIA shuttle data model**
   - Phạm vi: tạo `core/data/busSchedules/tia.ts` (`kind:'frequency'`, `headwayMinutes: {peak:15, normal:20}`, `pickupPoints: [T1,T2,T3]`, `ticketPrice: 0`). Thêm vào `SGN_AIRPORT.busRoutes`. Sau đó mới mở `TiaHint` UI (đã có placeholder trong plan `2026-07-26-sgn-multi-airport.md` Task 12).
   - Tác động: mở khoảng trống T1/T2 → T3 transfer miễn phí.
8. **Feature O — VinBus E10** [Quick win, dựa memo §5.2]
   - Phạm vi: `core/data/busSchedules/han.ts` thêm `BUS_E10` (Ocean Park ↔ HAN-T1/T2, 9.000 VND, `kind:'frequency'`, headway 20 phút, 05:00–22:00). Tag `recommendedFor: 'ocean-park'` để khớp destination mới.
   - Tác động: phủ tuyến sân bay rẻ nhất, khai thác USP "so sánh chi phí".
9. **Feature Q — Scam-warning slide sau submit** [Quick win, dựa memo §4.1]
   - Phạm vi: thêm `ScamBanner` ở cuối `ResultPage.tsx` (text Vi+En). Nội dung lấy từ CONTEXT.md + memo §4.1.
   - Tác động: giảm sốc cho du khách quốc tế.

### P2 — "Làm sạch & mở rộng nền tảng"

10. **Feature H — Centralize stop-id mapping + share BusStop model**
    - Phạm vi: thêm `BusStop` vào `core/types/index.ts`; `core/data/route-maps/{bus86,bus109,bus152}.ts`; `ResultPage.getDestinationStopId` đọc từ mapping trong core thay vì hardcode 3 object literal.
    - Tác động: fix bug map không highlight `q3/q5/binh-thanh/phu-nhuan`.
11. **Feature I — Countdown timer tới chuyến xe kế tiếp**
    - Phạm vi: `web/src/components/Result/CountdownTimer.tsx`, dùng `useEffect` + `setInterval(30s)` để render “Còn X phút Y giây” từ `result.bus.trip.departureTime`. Đặt trong timeline section.
    - Tác động: tăng urgency + giảm cảm giác “đã bỏ lỡ chuyến?”.

### P3 — Tầm nhìn (chờ tích hợp backend)

12. **Feature N — PIN queue clipboard** [Khi Grab/Be mở rộng mô hình Đà Nẵng]
    - Phạm vi: lưu PIN 4 số vào `sessionStorage`, hiển thị nút "Sao chép PIN" trong 60 giây đầu.
13. **Feature K — Đồng bộ RN ↔ Web/AirportPicker**
    - Phạm vi: `components/Landing/AirportPicker.tsx` mới; cập nhật `app/hooks/useLandingForm.ts` cho khớp shape của web.
14. **Feature L — Playwright e2e cho SGN, no-service, route-map**
    - Phạm vi: 3 file mới trong `web/e2e/` (`sgn-flow.spec.ts`, `no-service.spec.ts`, `route-map.spec.ts`). Pin các regression như bus schedule time shape.
15. **Feature P — eSIM affiliate link** [Nice-to-have, sau khi User onboarding đủ chín]
    - Phạm vi: link Airalo/Holafly trong banner "Trước khi bay".
16. **Feature R — Digital Arrival Card banner** [Nice-to-have, scope rõ ràng]
    - Phạm vi: nếu `airportId==='noi-bai'` & arrivalTime trong vòng 7 ngày → banner "Khai báo trước chuyến bay".
17. **Feature S — Quick-phrase clipboard cho du khách nước ngoài**
    - Phạm vi: 5 câu EN/VN dán sẵn ("Xác nhận biển số X trước khi lên xe", "Tôi muốn đi [destination]") với nút copy.
18. **Feature T — Metro Line 1 (Long Thành) tracking**
    - Phạm vi: theo dõi tiến độ, sẵn sàng model metro khi vận hành.

---

## Phụ lục — Nguồn đã đọc (URL đầy đủ)

- Grab VN: <https://www.grab.com/vn/en/transport/advance-booking/>, <https://www.grab.com/vn/en/terms-policies/advance-booking-terms/>, <https://www.grab.com/vn/blog/grab-boi-hoan-tre-chuyen-bay/>
- Xanh SM: <https://www.greensm.com/vn-en/green-airport>, <https://www.greensm.com/vn-en/news/fly-with-vietjet-ride-with-xanh-sm-pre-book-your-seamless-airport-taxis>
- Đối thủ transit app: <https://play.google.com/store/apps/details?id=com.citymapper.app.release>, <https://play.google.com/store/apps/details?hl=en_US&id=com.tranzmate>
- Tiêu chuẩn GTFS Realtime: <https://developers.google.com/transit/gtfs-realtime>, <https://github.com/google/transit/blob/master/gtfs-realtime/spec/en/reference.md>, <https://www.pysae.com/content/article/gtfs-realtime-essential-for-enhancing-public-transport-appeal>
- Bối cảnh sân bay VN: <https://news.tuoitre.vn/tan-son-nhats-t3-terminal-faces-pickup-woes-despite-modern-design-103250811140137444.htm>, <https://travelinstinctoz.com/2026/06/23/hcmc-how-to-find-grab-at-tan-son-nhat/>, <https://123dzovietnam.com/how-to-get-a-grab-from-tan-son-nhat-airport/>, <https://www.vietnamparadisetravel.com/blog/tan-son-nhat-airport>, <https://www.secretflying.com/guides/ho-chi-minh-city/airports/>, <https://www.vietnam-tour.biz/noi-bai-airport-to-hanoi-city-center/>, <https://vietnamunlock.com/hanoi-airport/>, <https://hanoishuttle.com/guide/hanoi-airport-scams-how-to-avoid/>, <https://avia.vn/hanoi-airport-taxi/>, <https://www.secretflying.com/guides/hanoi/airports/>
- Báo cáo thị trường MaaS: <https://dataintelo.com/report/maas-integration-for-airport-ground-transport-market>
- Nghiên cứu EU: <https://cordis.europa.eu/project/id/101114853>
- Docs kỹ thuật Google: <https://support.google.com/maps/answer/144339>, <https://developers.google.com/maps/documentation/javascript/routes/route-transit>, <https://developers.google.com/maps/documentation/routes/transit-rm>
- Nội bộ SanBayGo: `web/src/components/Result/ResultPage.tsx`, `core/data/grabEstimates/sgn.ts`, `core/calculate-trip.ts`, `core/data/busSchedules/sgn.ts`, `core/types/index.ts`, `core/data/airports/sgn.ts`, `web/src/components/RouteMap/Bus152Stops.ts`, `web/__tests__/components/Result/ResultPage.test.tsx`, `app/hooks/useLandingForm.ts`, `feature_list.json`, `docs/SPEC.md`, `docs/superpowers/plans/2026-07-26-sgn-multi-airport.md`, `docs/superpowers/plans/2026-07-27-bus-152-route-map-implementation.md`

### Nguồn bổ sung (memo market-research 2026-07-28)

- Grab mở rộng: `https://www.grab.com/vn/`, `https://www.grab.com/global/airport-rides/noi-bai-international-airport/`, `https://www.grab.com/vn/blog/driver/car/sanbaytansonnhat`
- Xanh SM mở rộng: `https://www.xanhsm.com/news/huong-dan-don-xe-taxi-xanh-sm-tai-san-bay-tan-son-nhat`, `https://www.xanhsm.com/news/xanh-sm-airport-trien-khai-tai-san-bay-quoc-te-tan-son-nhat-huong-dan-don-xe-taxi-san-bay-va-bang-gia-dich-vu`, `https://www.xanhsm.com/vn-en/news/pre-book-your-seamless-airport-taxis`
- Be Vietnam: `https://be.com.vn/ve-be`, `https://be.com.vn/be-airport/huong-dan-diem-don-becar-lan-b-ga-quoc-noi-san-bay-tan-son-nhat`
- BusMap & Moovit: `https://busmap.vn/`, `https://busmap.vn/tinh-nang/`, `https://play.google.com/store/apps/details?id=com.t7.busmap`, `https://play.google.com/store/apps/details?hl=en_US&id=com.t7.busmaphn`, `https://b-company.jp/analyzing-how-vietnamese-commuters-use-public-transport-apps/`, `https://moovitapp.com/index/en/public_transit-line-86-H%C3%A0_N%E1%BB%99i-2921-1597502-17099406-0`
- GTFS Realtime bổ sung: `https://www.pysae.com/content/article/gtfs-realtime-essential-for-enhancing-public-transport-appeal`
- Bối cảnh sân bay VN bổ sung: `https://vietnamunlock.com/saigon-airport-to-city/`, `https://vietnamunlock.com/vietnam-grab/`, `https://saigonshuttle.com/tan-son-nhat-airport-sgn/`, `https://tabiji.ai/scams/ho-chi-minh-city/`, `https://www.scam.travel/en/scams/fake-taxi-grab-drivers-vietnam`, `https://www.atlas-guide.com/resources/scams/vietnam`, `https://thaiest.com/vietnam/travel/hanoi-airport-bus-noi-bai-airport-city-center`, `https://thaiest.com/vietnam/travel/ho-chi-minh-airport-bus-152`, `https://blog.wego.com/hanoi-airport-guide/`, `https://hanoibus.com/route/86-noi-bai-airport-city-center`, `https://vinwonders.com/en/wonderpedia/news/hanoi-airport-bus/`, `https://tansonnhatairport.vn/en/cach-re-nhat-san-bay-tsn-ve-quan-1.html/`, `https://www.hanoilocaltour.com/bus-86-hanoi-city-to-noi-bai-airport-timetable-stops/`, `https://hongtaku.com/ho-chi-minh-airport-to-city-center-bus-cost-travel-time/`, `https://vietnam-airport.net/blog/2026/01/20/hanoi-airport-to-city-center-old-quarter-by-bus-86-complete-travel-guide/`
- Cơ quan nhà nước: `https://english.caa.gov.vn/news/note-for-passengers-arriving-and-departing-from-terminal-t3-tan-son-nhat-international-airport-20250423085705642.htm`, `https://www.noibaiairport.vn/en/noi-bai-international-airport-reviews-first-6-months-of-2026--breakthrough-growth--pioneering-digitalization-and-green-transformation-nid21296.html`, `https://acv.vn/en/tin-tuc/acv-s-activities/tan-son-nhat-international-airport-s-passenger-terminal-3-a-dynamic-and-modern-aviation-infrastructure`, `https://www.acv.vn/en/tin-tuc/acv-s-activities/acv-inaugurates-passenger-terminal-t3-tan-son-nhat-international-airport`
- Báo chính thống VN: `https://e.vnexpress.net/news/news/traffic/vietnam-s-international-air-passenger-number-surges-past-26-million-in-6-months-5099694.html`, `https://en.vietnamplus.vn/vietnam-records-154-growth-in-international-air-passengers-post348576.vnp`, `https://ovietnam.vietnamnews.vn/international-tourist-arrivals-to-vietnam-rise-nearly-15-in-first-half-of-2026-post407509.html`, `https://vietnamnet.vn/ung-dung-goi-xe-mo-them-diem-don-khach-o-san-bay-tan-son-nhat-i404798.html`, `https://vietnamnet.vn/en/ho-chi-minh-city-to-launch-25-electric-bus-routes-from-march-1-2492366.html`, `https://vietnamnet.vn/en/dong-nai-proposes-metro-extension-to-long-thanh-airport-2511173.html`, `https://tienphong.vn/cong-ty-phuong-trang-chinh-thuc-dua-vao-van-hanh-xe-buyt-dien-tuyen-109-ket-noi-san-bay-tan-son-nhat-nha-ga-t3-post1737604.tpo`, `https://tuoitre.vn/nld/them-xe-buyt-dien-ket-noi-nha-ga-t3-san-bay-tan-son-nhat-19625042808095259.htm`, `https://en.vneconomy.vn/25-bln-to-be-invested-in-metro-line-linking-hcmc-and-long-thanh-airport.htm`, `https://news.laodong.vn/xa-hoi/tphcm-tang-toc-viec-keo-dai-tuyen-metro-so-1-den-san-bay-long-thanh-1672263.ldo`, `https://vietnamnews.vn/society/1654348/hcm-city-launches-mini-bus-app-on-zalo.html`, `https://voh.com.vn/giao-thong/tuyen-xe-buyt-109-doi-lo-trinh-ket-noi-truc-tiep-nha-ga-t3-san-bay-tan-son-nhat-591657.html`
- Cổng chính phủ Vietnam.vn: `https://www.vietnam.vn/en/san-bay-noi-bai-bao-tin-vui`, `https://www.vietnam.vn/en/dong-nai-tang-toc-keo-dai-metro-tu-tp-hcm-den-trung-tam-hanh-chinh-va-san-bay-long-thanh`, `https://www.vietnam.vn/en/ung-dung-goi-xe-mo-them-diem-don-khach-o-san-bay-tan-son-nhat`, `https://www.vietnam.vn/en/lan-dau-tien-ung-dung-goi-xe-cua-nguoi-viet-dan-dau-thi-truong`, `https://www.vietnam.vn/en/gsm-nam-hon-mot-nua-thi-phan-taxi-cong-nghe-doanh-thu-17-400-ty`, `https://www.vietnam.vn/en/xu-phat-2-truong-hop-xe-buyt-bo-tram-khong-don-khach`, `https://www.vietnam.vn/en/xe-buyt-thinh-hung-dung-ung-dung-cho-khach-hang-theo-doi-hanh-trinh-truc-tuyen`, `https://www.vietnam.vn/en/dua-xe-buyt-dien-vao-khai-thac-tren-hai-tuyen-603-va-605-tu-ngay-12-7`, `https://www.vietnam.vn/en/thu-hoi-dat-trien-khai-du-an-metro-ben-thanh-suoi-tien-den-san-bay-long-thanh`
- VinBus E10: `https://hanoitimes.vn/electric-bus-route-officially-opened-to-hanois-airport.591713.html`, `https://laodongthudo.vn/chinh-thuc-co-xe-buyt-dien-vinbus-ket-noi-noi-do-ha-noi-toi-san-bay-noi-bai-164585.html`, `https://auto5.vn/325-vinbus-e10-d172466.html`, `https://taximailinhgialai.com/lo-trinh-xe-bus-e10-ha-noi/`
- Xu hướng 2026: `https://www.electrive.com/2026/02/25/ho-chi-minh-city-launches-additional-25-electric-bus-routes/`, `https://www.automotiveworld.com/articles/hcm-city-overhauls-public-transport-fleet-with-e-buses/`, `https://vnauto.net/2026/04/30/green-sm-maintains-dominance-in-vietnams-taxi-hailing-market-in-q1-2026/`, `https://www.thitruonghanghoa.com/tin-tuc/hang-taxi-cua-ong-pham-nhat-vuong-chiem-5451-thi-phan-tai-viet-nam-trong-3-thang-dau-nam-giu-chuoi-18-thang-lien-tiep-dan-dau-325282.html`, `https://xe.today/2026/07/05/seamless-airport-rides-book-your-grab-without-the-wait/`, `https://saigoneconomy247.net/tin-vui-cho-nguoi-dat-grab-tai-san-bay-dat-xe-khong-can-cho-doi-a269171.html`, `https://blog.vietnamteachingjobs.com/grab-taxi-in-vietnam/`, `https://vietnamesim.com/grab-xanh-sm-be-vietnam/`, `https://trulyvoyage.com/blogs/tips-tricks/your-first-ride-in-vietnam-getting-around-like-a-local-made-easy`, `https://daytripsvietnam.com/transport/grab-and-taxis-in-vietnam/`, `https://en.phongnhaexplorer.com/qna/transportation/what-ride-sharing-app-is-used-in-vietnam.html`, `https://roavara.com/da-nang-airport-guide/`, `https://vietnamtravelprice.com/en/cam-ranh-international-airport-guide`, `https://www.tisland.travel/en/blog/aeroport-kamran-gid`, `https://vietvisionfasttrack.com/comprehensive-guide-to-cam-ranh-airport/`
- Nội bộ SanBayGo bổ sung: `CONTEXT.md`, `.scratch/market-research-2026.md`

### Câu hỏi dở (chờ user — cập nhật sau memo 2026-07-28)

- **[Open]** Xanh SM card có phải ưu tiên P0 (theo bước ngoặt 54,51% thị trường) hay để P1 (giữ Grab làm primary vì user quen)?
- **[Open]** Có muốn nhúng GTFS Realtime từ FUTA City Bus/Trung tâm Quản lý GTC CC TP.HCM (BusMap/MultiGo) hay vẫn giữ static?
- **[Open]** Có muốn tạo landing variant có Flight Type là step đầu tiên thay vì chip phụ, hay giữ chip để không dồn thêm field buộc nhập?
- **[Open]** Khi RN chạy đa sân bay, có giữ search wizard 4 bước hiện tại hay dồn thành 1 trang như web?
- **[Open]** Có muốn thêm eSIM affiliate (Airalo/Holafly) hay giữ neutral để khỏi xung đột với đối tác vận tải?
- **[Open]** VinBus E10 — `BUS_E10` có nên khai báo là `recommendedFor: 'ocean-park'` (tạo destination mới) hay chỉ hiển thị nếu user chọn destination đó?
