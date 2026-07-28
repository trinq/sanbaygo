# Feature I — Bus Departure Countdown Timer

**Status**: draft
**Date**: 2026-07-28
**Linked**: glossary `Bus Departure Countdown` (`CONTEXT.md`), ADR `0001-bus-departure-countdown-no-recompute`

## Problem

Trên `ResultPage` hiện tại, khi `result.bus.trip` tồn tại, người dùng thấy giờ khởi hành dự kiến (`trip.departureTime`) dưới dạng text tĩnh. Người dùng tự tính khoảng cách tới giờ đó, dễ nhầm với giờ hạ cánh, đặc biệt khi đã ở gần cổng ra terminal. Tài liệu nghiên cứu (`docs/feature-research.md` mục 4, khoảng trống I) và memo thị trường cùng xác định đây là nhu cầu thật: BusMap, Moovit, Citymapper đều có countdown, SanBayGo thiếu.

## Solution

Thêm component `CountdownTimer` hiển thị dòng `Còn khoảng X phút` trong bước “Lên xe / Khởi hành” của timeline trong thẻ xe buýt. Bộ đếm chỉ làm mới hiển thị; không gọi lại logic tính toán.

## Behavior

- **Trigger**: `trip` (từ `result.bus.trip`) tồn tại và không null.
- **Hiển thị khi**:
  - `trip.departureTime` ở tương lai, **và**
  - còn **≤ 120 phút** đến `trip.departureTime`.
- **Ẩn khi**:
  - không có `trip` (tức `result.bus.available === false`, hoặc `reason ∈ {no_service, too_late, missed_last}`),
  - **hoặc** đã qua `trip.departureTime`,
  - **hoặc** còn hơn 120 phút.
- **Format**: `Còn khoảng X phút` (làm tròn xuống theo phút). Khi còn <1 phút nhưng chưa tới giờ khởi hành, hiển thị `Còn khoảng 0 phút` cho tới khi đạt ngưỡng ẩn.
- **Cập nhật**: `setInterval` 1 phút (60 000 ms). Component re-render mỗi tick; giá trị hiển thị chỉ thay đổi khi sang phút mới (vì số phút làm tròn xuống từ `Date.now()`).
- **Cleanup**: clear interval khi component unmount hoặc khi `trip` đổi từ có sang không.
- **Đồng hồ nguồn**: `Date.now()` của thiết bị. Không phụ thuộc timezone server. (MVP không cần hiển thị timezone vì cả form lẫn `departureTime` đều dùng giờ local của thiết bị.)

## Component Contract

```ts
interface CountdownTimerProps {
  trip: BusTrip; // result.bus.trip; caller đảm bảo non-null khi mount
}
```

Component chịu trách nhiệm:
- Parse `trip.departureTime: string` (định dạng `HH:mm`) thành phút trong ngày. Không dùng `new Date(trip.departureTime)` — phải ghép với ngày hôm nay theo local timezone, vì `departureTime` chỉ chứa giờ phút.
- Quyết định hiển thị / ẩn dựa trên `Date.now()` và `trip.departureTime`.
- Tự cleanup interval.

Caller (`ResultPage.tsx`) chỉ cần mount component khi `catchable && trip` (đã có điều kiện này ở bước “Lên xe / Khởi hành” trong timeline). Không cần kiểm tra gì thêm.

## Visual

Đặt trong bước **“Lên xe / Khởi hành”** của timeline (`ResultPage.tsx`), ngay dưới dòng `Dự kiến khởi hành lúc 14:30`:

```
Lên xe / Khởi hành
◷ Dự kiến khởi hành lúc 14:30
Còn 12 phút 30 giây
```

Khi ẩn, không chiếm chỗ trong layout (không để placeholder).

## Out of Scope

- Tracking vị trí thực tế của xe buýt (GTFS-RT). Glossary đã định nghĩa `Bus Departure Countdown` không đại diện cho tracking realtime.
- Tự động recompute `ArrivalResult` khi `Date.now()` dịch chuyển. ADR `0001-…` đã ghi quyết định này.
- Đếm ngược cho Grab, taxi, metro. Áp dụng được cùng component, nhưng chưa có trip tương ứng trong `ArrivalResult`.
- Hiển thị trên RN (`app/`). Spec này chỉ cho web.

## Files

Tạo mới:
- `web/src/components/Result/CountdownTimer.tsx` — component chính.
- `web/src/components/Result/CountdownTimer.module.css` — style cho dòng `Còn …`. Có thể dùng lại token đã có trong `ResultPage.module.css`.
- `web/__tests__/components/Result/CountdownTimer.test.tsx` — test logic quyết định hiển thị/ẩn với `Date.now` mock.

Sửa:
- `web/src/components/Result/ResultPage.tsx` — import `CountdownTimer`, đặt trong timeline item `Departure` ngay sau dòng `Dự kiến khởi hành lúc …`.

## Tests

- Component render `Còn khoảng X phút` khi mock `Date.now()` cho thời điểm cách `trip.departureTime` 30 phút.
- Component ẩn (không có text `Còn`) khi mock `Date.now()` cho thời điểm cách `trip.departureTime` 2 giờ.
- Component ẩn khi mock `Date.now()` đã vượt qua `trip.departureTime`.
- Component ẩn khi prop `trip = null` (caller truyền null thay vì có điều kiện bên ngoài — linh hoạt cho test edge case). Lưu ý: `BusTrip` không thể null trong type thật, nhưng component có thể nhận `trip: BusTrip | null` để caller không cần wrap điều kiện.
- Cleanup interval khi unmount (dùng `jest.useFakeTimers`, mount, unmount, kiểm tra `clearInterval` được gọi).

## Risks

- Test phụ thuộc `Date.now()` mock phải đặt trong `jest.setup.js` hoặc trong chính test file. Repo chưa có convention rõ; cần xác nhận khi implement.
- Component đặt trong `web/` chứ không phải `core/`. Nếu sau này muốn RN dùng chung logic (không phải style), cần refactor `core/` cho hook `useBusDepartureCountdown(trip)`.
- Khi bổ sung nguồn realtime (GTFS-RT) sau này, ADR `0001-…` sẽ cần review và có thể phải tách `Bus Departure Countdown` thành hai khái niệm (đếm tới chuyến đã chọn vs đếm tới chuyến thực tế đang đến).
