# SanBayGo — Kế hoạch Phát triển

> File này là kế hoạch chiến lược để đưa SanBayGo ra giới thiệu bên ngoài. Được viết dựa trên bằng chứng thực tế từ codebase (commit, file, test) tại thời điểm 2026-07-28.

---

## 1. Tóm tắt sản phẩm hiện tại

### 1.1 Sản phẩm đang làm gì

SanBayGo là ứng dụng web + di động giúp hành khách đáp máy bay tại sân bay Nội Bài (Hà Nội) và Tân Sơn Nhất (TP.HCM) quyết định nhanh chóng giữa **xe buýt công cộng** và **Grab/taxi công nghệ** để về trung tâm thành phố.

Luồng người dùng cốt lõi:

1. Nhập giờ đáp máy bay
2. Chọn nhà ga (T1/T2 tại HAN; T1/T2/T3 tại SGN)
3. Chọn loại hành lý (xách tay / ký gửi)
4. Chọn điểm đến (5 khu vực: Phố Cổ, Ba Đình, Đống Đa, Cầu Giấy, khác)
5. Nhấn "Tìm phương tiện" → xem chuyến xe buýt gần nhất + so sánh với Grab

### 1.2 Những gì đã có sẵn (tính đến 2026-07-28)

#### Cấu trúc monorepo

```
sanbaygo/
├── core/                    # Logic kinh doanh chia sẻ (TypeScript thuần)
│   ├── types/index.ts       # Airport, Terminal, BusRoute, ArrivalFormData, …
│   ├── data/                # airport.ts, busSchedule.ts, grabEstimates.ts, …
│   ├── calculation-engine/  # isPeakHour, calculateExitTime, findCatchableBusForTerminal, calculateArrivalEstimate
│   └── calculate-trip.ts    # Canonical entry point cho UI
├── web/                     # Vite + React (ứng dụng chính)
│   ├── src/App.tsx          # Root component với state lifting
│   ├── src/components/Landing/    # Hero, SearchCard, Nav, Footer, SocialProof, BenefitChips, …
│   ├── src/components/Result/      # ResultPage, CountdownTimer, RouteMap
│   └── __tests__/           # Unit test + Playwright e2e
├── app/                     # Expo Router (RN — legacy, chưa đồng bộ web)
│   ├── hooks/, _layout.tsx, index.tsx
│   └── components/Landing/  # Hero, SearchCard (legacy version)
├── api/                     # Express + routes/services (stub)
└── design-system/tokens/    # tokens.ts, index.ts
```

#### Tính năng đã chạy và verify

| Tính năng | File / Commit | Test |
|---|---|---|
| Calculation engine (4 pure functions) | `core/calculation-engine/*.ts` | 35 unit tests, 92/92 total |
| Landing page hero (Figma-style sky-blue + glass) | `web/src/components/Landing/Hero.tsx` (commit `7240ead`) | `Hero.test.tsx` |
| Search card form | `web/src/components/Landing/SearchCard.tsx` | `SearchCard.test.tsx` |
| Result page (timeline 4 bước, primary bus card, divider, ride-hail card) | `web/src/components/Result/ResultPage.tsx` (commit `8b4f19e`) | `ResultPage.test.tsx` |
| Bus departure countdown timer (0–120 phút, không recompute) | `web/src/components/Result/CountdownTimer.tsx` (commit `e9fe6aa`) | `CountdownTimer.test.tsx` |
| Route map SVG (3 tuyến: 86, 109, 152) | `web/src/components/RouteMap/Bus{86,109,152}Stops.ts` | — |
| Multi-airport support (HAN + SGN) | `core/data/airports/{han,sgn}.ts` | Bus schedule tests |
| Language toggle vi/en | `web/src/contexts/LanguageContext.tsx` | — |
| Side-by-side layout (desktop) / stacked (mobile) | `ArrivalForm` | `App.layout.test.tsx` |
| Grab fallback card | `ResultPage.tsx` (static) | — |
| Vehicle comparison + sort toggle | `web/src/components/Result/VehicleComparison.tsx` | — |
| Grab deep link | **Chưa có** — `ResultPage.tsx:301` vẫn `href="#"` | — |

#### Business logic đã test

- `isPeakHour()` — 15 test cases cho 7-9 AM và 5-7 PM
- `calculateExitTime()` — matrix lookup theo terminal type × baggage × flight type
- `findCatchableBusForTerminal()` — 10 edge cases (no_service, too_late, missed_last)
- `calculateArrivalEstimate()` — peak surcharge + travel time range
- `calculateTrip()` (composition) — full pipeline test

#### Data đã có

- **Bus 86** (HAN): 26 departures, 50,000 VND, 45–75 phút, T1 pickup
- **Bus 109** (SGN, điện hóa 2025): 23 departures, 15,000 VND, T3 pickup
- **Bus 152** (SGN, điện hóa 2026): frequency-based, T3 pickup
- **VinBus E10**: **CHƯA CÓ** trong data
- **Grab estimates**: HAN (250k–350k VND), SGN (100k–180k VND), có `pickupLocations` per terminal
- **Xanh SM**: **CHƯA CÓ** trong data (thị phần 54.51% Q1/2026)

### 1.3 Những gì còn thiếu để giới thiệu ra ngoài

| Hạng mục | Tình trạng | Ghi chú |
|---|---|---|
| Landing page / trang giới thiệu | ⚠️ App là landing page | Không có trang giới thiệu riêng; headline + SearchCard là "landing" |
| Social proof | ⚠️ Placeholder | `"4.9 điểm từ 12.000+ hành khách"` — chưa có thật |
| Grab deep link | ❌ Dead stub | `href="#"` + `e.preventDefault()` |
| Xanh SM card | ❌ Không có | Thị phần 54.51% (Mordor Q1/2026) |
| SEO meta tags | ⚠️ Cơ bản | Không có Open Graph, Twitter card |
| Favicon / App icon | ⚠️ Mặc định | Không có |
| "How it works" section | ❌ Không có | Chỉ có benefit chips |
| Responsive verification | ⚠️ Chưa đầy đủ | 3 Playwright viewport test nhưng chỉ cover landing flow |
| Privacy/Terms page | ❌ Không có | Footer có link nhưng page trống |
| Analytics / tracking | ❌ Không có | Không có GA, Mixpanel, … |
| Error boundary | ⚠️ Cơ bản | Không có ErrorBoundary component |
| Offline handling | ❌ Không có | Không có Service Worker |
| Share functionality | ❌ Không có | Không có "Chia sẻ kết quả" |
| Multi-passenger pricing | ⚠️ Có state `people` nhưng không tính tổng | `ArrivalFormData` thiếu `numberOfPassengers` |

---

## 2. Mục tiêu giai đoạn "Giới thiệu sản phẩm"

### 2.1 Mục tiêu cụ thể

**Mục tiêu chính:** Tạo trang giới thiệu (landing page) độc lập với nội dung marketing rõ ràng, demo trực tiếp, và CTA hành động — đủ để chia sẻ link với người dùng thật và thu thập phản hồi đầu tiên.

**Mục tiêu phụ:**

- Người dùng hiểu sản phẩm là gì trong 30 giây đầu
- Người dùng có thể dùng thử ngay mà không cần đăng ký
- Người dùng có thể chia sẻ kết quả cho bạn bè
- Có cơ sở để đo lường (basic analytics)

### 2.2 Người dùng mục tiêu cần hiểu được gì

Sau khi xem phần giới thiệu, người dùng cần trả lời được:

1. **"Đây là gì?"** — Ứng dụng so sánh xe buýt và Grab để về từ sân bay về trung tâm
2. **"Tôi có cần không?"** — Nếu đang ở/sắp đến Nội Bài hoặc Tân Sơn Nhất và muốn tiết kiệm chi phí
3. **"Dùng thế nào?"** — Nhập giờ đáp → chọn nhà ga → xem kết quả
4. **"Tin được không?"** — Lịch trình thực, giá công khai, không phí ẩn
5. **"Bắt đầu ở đâu?"** — Nút CTA rõ ràng

### 2.3 Kết quả mong muốn

- [ ] Có **landing page** riêng (tách khỏi app form) tại `/` hoặc subdomain
- [ ] Headline, mô tả, lợi ích (3 benefit) rõ ràng
- [ ] Social proof đáng tin cậy (số người dùng thật hoặc removed)
- [ ] Demo trực tiếp: người dùng thấy form và kết quả mà không cần rời trang
- [ ] CTA rõ ràng: "Bắt đầu ngay" → mở form
- [ ] Responsive: đẹp trên mobile (ứng dụng chính là mobile-first)
- [ ] Tốc độ: Lighthouse score ≥ 80
- [ ] Có thể share được: Open Graph meta tags cho Facebook/Zalo/Messenger

---

## 3. Phạm vi công việc giai đoạn Giới thiệu

### 3.1 Landing page / Trang giới thiệu

| Hạng mục | Mô tả | Ưu tiên |
|---|---|---|
| Landing page độc lập | Tách landing content khỏi `SearchCard`. Hero → Benefits → How it works → Demo → CTA | P0 |
| Favicon + App icon | SVG favicon + manifest cho PWA | P1 |
| SEO meta tags | Open Graph, Twitter card, description | P1 |

### 3.2 Nội dung (headline, mô tả, lợi ích, social proof…)

| Hạng mục | Mô tả | Ưu tiên |
|---|---|---|
| Headline + subtitle | Viết lại copy: "Cách nhanh nhất từ sân bay về trung tâm" + mô tả ngắn | P0 |
| 3 benefit chips | Nhanh / An toàn / Tiết kiệm (đã có trong `Hero.tsx`) | P0 |
| "How it works" section | 3 bước: Nhập giờ → Xem kết quả → Di chuyển | P1 |
| Social proof | Xóa placeholder "12.000+ hành khách" hoặc thay bằng proof thật | P0 |
| FAQ section | 3–5 câu hỏi thường gặp | P2 |

### 3.3 Demo / Screenshot / Video

| Hạng mục | Mô tả | Ưu tiên |
|---|---|---|
| Inline demo form | Nhúng SearchCard trực tiếp vào landing page (đã có slot `{children}` trong `Hero.tsx`) | P0 |
| Screenshot cho social | Ảnh chụp kết quả để share trên MXH | P2 |

### 3.4 CTA (nút hành động)

| Hạng mục | Mô tả | Ưu tiên |
|---|---|---|
| Primary CTA | "Bắt đầu ngay" → scroll/focus vào form | P0 |
| Secondary CTA | "Tìm hiểu thêm" → scroll đến FAQ | P1 |

### 3.5 Responsive + Tốc độ

| Hạng mục | Mô tả | Ưu tiên |
|---|---|---|
| Responsive verification | Chạy Playwright ở 3 viewport (375px, 768px, 1280px) cho landing flow | P0 |
| Lighthouse optimization | Image optimization, lazy load, font preload | P1 |

### 3.6 Các trang phụ cần thiết

| Hạng mục | Mô tả | Ưu tiên |
|---|---|---|
| Privacy page | `/privacy` — nội dung đơn giản (no data stored) | P1 |
| Terms page | `/terms` — điều khoản sử dụng | P1 |
| 404 page | Custom 404 với link về home | P2 |

---

## 4. Thứ tự thực hiện (Roadmap ngắn)

### Phase 1: Giới thiệu sản phẩm ✅ **ƯU TIÊN CAO NHẤT**

Xây landing page độc lập, nội dung marketing, demo trực tiếp, và CTA. Chi tiết ở **Phần 5**.

**Mục tiêu:** Có thể chia sẻ link `sanbaygo.app` với người dùng thật.

---

### Phase 2: Tính năng cốt lõi (P0 Bugfix + P0 Features)

1. **Grab deep link** — thay `href="#"` bằng `grab://` (mobile) và `https://grab.com/vn/` (desktop)
2. **Xanh SM card** — thêm lựa chọn #1 thị trường (54.51%) vào result page
3. **Fix SGN test fixture** — price range `90000-150000` → `100000-180000 VND`
4. **Multi-passenger pricing** — hiển thị tổng giá cho gia đình
5. **Flight type selector** — sửa exit time cho T1 international

---

### Phase 3: Mở rộng nền tảng

1. **VinBus E10** — thêm tuyến 9,000 VND vào data
2. **BusMap / RouteMap improvements** — highlight chính xác destination
3. **Countdown timer** — đã có trong code (`CountdownTimer.tsx`) nhưng cần verify end-to-end
4. **Analytics** — thêm basic tracking (page views, form submissions)
5. **RN app sync** — đồng bộ AirportPicker + FlightTypeChips từ web sang RN

---

## 5. Checklist chi tiết cho Phase 1 (Giới thiệu)

### 5.1 Landing Page Structure

| # | Task | Effort | File ảnh hưởng | Status |
|---|---|---|---|---|
| 1.1 | Tạo landing page component mới (`LandingPage` → `MarketingLanding`) tách khỏi app form | Medium | `web/src/components/Landing/` | ⬜ |
| 1.2 | Cập nhật routing: `/` → MarketingLanding, `/app` → SearchCard form | Low | `web/src/App.tsx` | ⬜ |
| 1.3 | Thêm section "How it works" (3 bước) dưới benefit chips | Low | `web/src/components/Landing/HowItWorks.tsx` | ⬜ |
| 1.4 | Thêm section "Why SanBayGo" (3 lý do chọn thay vì Grab trực tiếp) | Low | `web/src/components/Landing/WhySanBayGo.tsx` | ⬜ |

### 5.2 Content & Copy

| # | Task | Effort | File ảnh hưởng | Status |
|---|---|---|---|---|
| 2.1 | Viết lại headline + subtitle (tham khảo `landing-copy.vi.ts`) | Low | `web/src/contexts/LanguageContext.tsx` | ⬜ |
| 2.2 | Xóa placeholder social proof hoặc thay bằng nội dung trung thực | Low | `web/src/components/Landing/SocialProof.tsx` | ⬜ |
| 2.3 | Thêm nội dung "How it works" vào LanguageContext (vi + en) | Low | `web/src/contexts/LanguageContext.tsx` | ⬜ |
| 2.4 | Viết FAQ section (5 câu hỏi thường gặp) | Low | `web/src/components/Landing/FAQ.tsx` | ⬜ |

### 5.3 SEO & Meta

| # | Task | Effort | File ảnh hưởng | Status |
|---|---|---|---|---|
| 3.1 | Thêm Open Graph meta tags vào `index.html` | Low | `web/index.html` | ⬜ |
| 3.2 | Thêm Twitter card meta tags | Low | `web/index.html` | ⬜ |
| 3.3 | Thêm `robots.txt` cho phép crawl | Low | `web/public/robots.txt` | ⬜ |
| 3.4 | Thêm sitemap.xml cơ bản | Low | `web/public/sitemap.xml` | ⬜ |

### 5.4 Visual Assets

| # | Task | Effort | File ảnh hưởng | Status |
|---|---|---|---|---|
| 4.1 | Tạo SVG favicon (logo SanBayGo) | Low | `web/public/favicon.svg` | ⬜ |
| 4.2 | Thêm `manifest.json` cho PWA | Medium | `web/public/manifest.json` | ⬜ |
| 4.3 | Tối ưu `hero.jpg` (WebP conversion, srcset) | Low | `web/public/hero.jpg` | ⬜ |

### 5.5 Responsive & Performance

| # | Task | Effort | File ảnh hưởng | Status |
|---|---|---|---|---|
| 5.1 | Chạy Playwright e2e landing flow ở 3 viewport | Low | `web/e2e/landing-flow.spec.ts` | ⬜ |
| 5.2 | Lighthouse audit (target: Performance ≥ 80) | Low | — | ⬜ |
| 5.3 | Font preload cho font chính | Low | `web/index.html` | ⬜ |

### 5.6 Legal Pages

| # | Task | Effort | File ảnh hưởng | Status |
|---|---|---|---|---|
| 6.1 | Tạo `/privacy` page (no data stored — state only in memory) | Low | `web/src/pages/Privacy.tsx` | ⬜ |
| 6.2 | Tạo `/terms` page | Low | `web/src/pages/Terms.tsx` | ⬜ |
| 6.3 | Cập nhật Footer links | Low | `web/src/components/Landing/Footer.tsx` | ⬜ |

### 5.7 Grab Deep Link (Quick Fix)

| # | Task | Effort | File ảnh hưởng | Status |
|---|---|---|---|---|
| 7.1 | Thay `href="#"` bằng `href="https://grab.com/vn/"` + `target="_blank"` trên Grab card | Low | `web/src/components/Result/ResultPage.tsx:301` | ⬜ |
| 7.2 | Thêm mobile detection → dùng `grab://` scheme trên mobile | Medium | `web/src/utils/platform.ts` | ⬜ |

---

## 6. Định nghĩa "Xong Phase 1"

### 6.1 Khi nào thì đủ để giới thiệu sản phẩm ra ngoài

SanBayGo được coi là **sẵn sàng giới thiệu** khi:

1. **Landing page tồn tại** — người dùng mới hiểu sản phẩm trong 30 giây
2. **Demo trực tiếp** — có thể nhập giờ và xem kết quả mà không cần rời trang
3. **CTA rõ ràng** — nút "Bắt đầu ngay" hoạt động
4. **Responsive** — đẹp và dùng được trên mobile
5. **Social shareable** — Open Graph tags cho link shared trên MXH
6. **Grab link hoạt động** — không còn dead stub

### 6.2 Tiêu chí kiểm tra (Checklist cuối)

#### Functionality

- [ ] `/` render landing page với headline, benefits, how it works, demo form, CTA
- [ ] Nhấn CTA → scroll đến form hoặc mở form
- [ ] Fill form (arrivalTime, airport, terminal, destination) → nhấn "Tìm phương tiện"
- [ ] Xem result page với bus recommendation + timeline
- [ ] Nhấn Grab card → mở grab.com hoặc grab://
- [ ] Language toggle vi ↔ en hoạt động
- [ ] `/privacy` và `/terms` render đúng nội dung
- [ ] 404 page render custom page

#### Responsive

- [ ] Playwright: 375px → landing page đẹp, form usable
- [ ] Playwright: 768px → side-by-side layout
- [ ] Playwright: 1280px → desktop layout với hero 5-layer blur stack

#### Performance

- [ ] Lighthouse Performance score ≥ 80
- [ ] `web npm test` → all tests pass
- [ ] `web npx tsc --noEmit` → exit 0

#### SEO / Social

- [ ] `<title>` = "SanBayGo — Đi xe buýt từ Nội Bài"
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:image`)
- [ ] Twitter card tags present
- [ ] `robots.txt` exists and allows crawl
- [ ] Favicon renders correctly

#### Code Quality

- [ ] Không có `console.error` trong production path
- [ ] Không có dead UI elements (`href="#"`, empty onClick)
- [ ] Vietnamese labels cho tất cả user-facing text
- [ ] TypeScript strict mode passes

---

## Checklist Phase 1 — Tổng hợp

### Must Have (P0) — Để gọi là "xong"

- [ ] **Task 1.1** — Landing page component mới, tách khỏi SearchCard
- [ ] **Task 2.1** — Headline + subtitle viết lại, rõ ràng
- [ ] **Task 2.2** — Social proof không còn là placeholder sai
- [ ] **Task 3.1** — Open Graph meta tags
- [ ] **Task 4.1** — Favicon
- [ ] **Task 5.1** — Playwright e2e landing flow ở 3 viewport pass
- [ ] **Task 7.1** — Grab card mở link thật (không còn `href="#"`)

### Should Have (P1) — Để gọi là "đủ tốt"

- [ ] **Task 1.3** — "How it works" section
- [ ] **Task 2.4** — FAQ section
- [ ] **Task 3.2** — Twitter card
- [ ] **Task 4.2** — PWA manifest
- [ ] **Task 5.2** — Lighthouse ≥ 80
- [ ] **Task 6.1** + **6.2** — Privacy + Terms pages

### Nice to Have (P2) — Để gọi là "hoàn thiện"

- [ ] **Task 1.4** — "Why SanBayGo" section
- [ ] **Task 4.3** — WebP hero image
- [ ] **Task 6.3** — Footer links updated
- [ ] Screenshot assets cho social sharing

---

## Phụ lục

### File cấu hình quan trọng

| File | Mục đích |
|---|---|
| `web/src/App.tsx` | Root component, routing giữa Landing và Result |
| `web/src/contexts/LanguageContext.tsx` | Tất cả copy vi/en |
| `web/src/components/Landing/Hero.tsx` | Hero background + slot cho SearchCard |
| `web/src/components/Landing/SearchCard.tsx` | Form chính |
| `web/src/components/Result/ResultPage.tsx` | Result page (dead Grab stub ở dòng 301) |
| `core/calculate-trip.ts` | Canonical calculation entry point |
| `feature_list.json` | Trạng thái tất cả features |

### Nguồn tham khảo

- Market research: `docs/feature-research.md` (2026-07-28)
- Feature list: `feature_list.json`
- Progress log: `claude-progress.md`
- Landing copy hiện tại: `components/Landing/landing-copy.vi.ts`

### Ghi chú

- **Grab card dead stub**: `web/src/components/Result/ResultPage.tsx:301` — `href="#"` cần fix ngay
- **Social proof placeholder**: `web/src/components/Landing/SocialProof.tsx` — "4.9 điểm từ 12.000+ hành khách" không có thật
- **Xanh SM**: chưa có trong data, thị phần 54.51% (Q1/2026 Mordor) — nên thêm sau Phase 1
- **VinBus E10**: chưa có trong data — nên thêm sau Phase 1
