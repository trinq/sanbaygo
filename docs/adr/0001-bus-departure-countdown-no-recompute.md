# Bus Departure Countdown Không Tự Động Recompute Kết Quả

**Status**: accepted

Khi người dùng đã submit form và nhận được `ArrivalResult`, `ResultPage` hiển thị kết quả bất biến cho tới khi người dùng nhấn "Quay lại" và submit lại. Bộ đếm tới giờ khởi hành dự kiến (`Bus Departure Countdown`) chỉ dịch chuyển vì mốc hiện tại thay đổi, không vì hệ thống tính lại `trip.departureTime` từ giờ hiện tại.

## Context

SanBayGo MVP dùng dữ liệu lịch trình tĩnh, không có nguồn realtime cho xe buýt hay chuyến bay. `arrivalTime` là **Actual Arrival** do người dùng khai báo một lần và là dữ liệu đầu vào duy nhất của `calculateTrip`. Khi đó có hai cách hiểu cho "đếm tới chuyến kế tiếp": (a) chỉ đếm tới chuyến đã được chọn trong kết quả hiện tại, hoặc (b) định kỳ tính lại kết quả từ giờ hiện tại để chuyến đếm có thể đổi theo thời gian.

## Decision

Chọn (a). `Bus Departure Countdown` được tính từ `Date.now()` đến `trip.departureTime` đã có trong `result.bus.trip`, không gọi lại `calculateTrip`. Khi `arrivalTime` đã ở quá khứ và `trip.departureTime` đã qua, bộ đếm ẩn và thẻ xe buýt hiển thị nguyên trạng; người dùng muốn cập nhật thì dùng nút "Quay lại" đã có trên header.

## Considered Options

- **Recompute mỗi 30 giây**: tự động tìm chuyến kế tiếp theo giờ hiện tại. Bị loại vì (1) `arrivalTime` là Actual Arrival đã khai báo một lần, không phải "thời điểm người dùng mở app" — việc hệ thống tự ý tính lại từ giờ hiện tại là thay đổi đầu vào ngoài ý muốn; (2) có thể đổi `selectedRoute` trong khi người dùng chưa kịp đọc, gây trải nghiệm khó hiểu; (3) policy "khi nào dừng recompute" không rõ ràng (sau khi qua `arrivalTime`? khi `arrivalTime` ở tương lai xa?).
- **Hiển thị thẻ fallback "đã qua giờ khởi hành" khi `arrivalTime` quá khứ**: bị loại vì (1) xung đột với rule "không recompute" — kết quả là dữ liệu tĩnh trong session; (2) phá vỡ việc đối chiếu nhiều phương án; (3) nếu `arrivalTime` quá khứ thật sự là vấn đề, đó là việc của form validation, không phải countdown.

## Consequences

- Kết quả session là bất biến. Người dùng cần cập nhật phải submit lại form.
- `ResultPage` không cần `setInterval` gọi `calculateTrip`, chỉ cần timer để re-render phần hiển thị `Còn X phút Y giây`.
- Khi bổ sung nguồn realtime (GTFS-RT, flight tracking) trong tương lai, quyết định này sẽ cần được review lại — lúc đó `Bus Departure Countdown` có thể chuyển từ "đếm tới chuyến đã chọn" sang "đếm tới chuyến thực tế đang đến", và có thể cần tách thành hai khái niệm riêng trong `CONTEXT.md`.
