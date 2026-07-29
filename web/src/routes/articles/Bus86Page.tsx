import { SEOHelmet } from '../components/SEO';
import { BUS_86 } from '@core/data/busSchedule';

const STOPS = [
  { name: 'Sân bay Nội Bài – Ga T1, Cổng A1', address: 'Tầng 1 sảnh đến, đối diện cột 12' },
  { name: 'Sân bay Nội Bài – Ga T2, Cổng A1', address: 'Tầng 1 sảnh đến, đối diện cột 14' },
  { name: 'Cầu Nhật Tân', address: 'Qua cầu Nhật Tân' },
  { name: 'Đại lộ Thăng Long', address: 'Đại lộ Thăng Long, quận Bắc Từ Liêm' },
  { name: 'Phố cổ Hà Nội', address: 'Khu phố cổ, quận Hoàn Kiếm' },
];

export function Bus86Page() {
  const schedule = BUS_86.scheduleSource.kind === 'explicit'
    ? BUS_86.scheduleSource.departures
    : [];

  const fare = BUS_86.ticketPrice.toLocaleString();
  const startTime = BUS_86.operatingHours.start;
  const endTime = BUS_86.operatingHours.end;

  return (
    <>
      <SEOHelmet path="/bus-86-hanoi-airport" />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <header className="bg-green-600 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Xe buýt sân bay Hà Nội
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Bus 86 — Sân bay Nội Bài đến Khu phố cổ Hà Nội
            </h1>
            <p className="text-lg opacity-90">
              VND {fare} · {startTime}–{endTime} · Mỗi 15–20 phút
            </p>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12">
          {/* Quick CTA */}
          <section className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">
              Bạn sẽ đón Bus 86 sau khi máy bay hạ cánh?
            </h2>
            <p className="text-gray-600 mb-4">
              Nhập giờ đến để tính xem Bus 86 có khả thi không và chuyến tiếp theo khởi hành lúc nào.
            </p>
            <a
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Tính thời gian đón xe của tôi →
            </a>
          </section>

          {/* Schedule Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Lịch trình hôm nay</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2">Giờ đầu</th>
                    <th className="text-left py-3 px-2">Giờ cuối</th>
                    <th className="text-left py-3 px-2">Tần suất</th>
                    <th className="text-left py-3 px-2">Giá vé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2">{startTime}</td>
                    <td className="py-3 px-2">{endTime}</td>
                    <td className="py-3 px-2">15–20 phút</td>
                    <td className="py-3 px-2 font-medium text-green-600">
                      VND {fare}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-green-700 font-medium hover:underline">
                Xem tất cả giờ khởi hành ({schedule.length} chuyến)
              </summary>
              <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 gap-1">
                {schedule.map((time) => (
                  <span key={time} className="text-sm bg-gray-50 rounded px-2 py-1 text-center">
                    {time}
                  </span>
                ))}
              </div>
            </details>

            <p className="text-sm text-gray-500 mt-2">
              Nguồn: Hanoi Public Transport Center (tramdep.vn). Xác minh lần cuối: tháng 7/2026.
            </p>
          </section>

          {/* Route Stops */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Các điểm dừng</h2>
            <div className="space-y-3">
              {STOPS.map((stop, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{stop.name}</p>
                    <p className="text-sm text-gray-500">{stop.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Travel Time Info */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-3">Thời gian di chuyển</h2>
            <p className="text-gray-700">
              Thời gian di chuyển từ sân bay Nội Bài đến trung tâm Hà Nội:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <span className="inline-block bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
                  Bình thường
                </span>
                <span>
                  {BUS_86.travelTime.normal.min}–{BUS_86.travelTime.normal.max} phút
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                  Giờ cao điểm (7–9 sáng, 5–7 tối)
                </span>
                <span>
                  {BUS_86.travelTime.peak.min}–{BUS_86.travelTime.peak.max} phút
                </span>
              </li>
            </ul>
          </section>

          {/* Grab Alternative */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-3">Phương án Grab thay thế</h2>
            <p className="text-gray-700 mb-3">
              Nếu bạn lỡ xe buýt, Grab có giá khoảng <strong>VND 250,000–350,000</strong>.
              Dùng công cụ tính của chúng tôi để so sánh:
            </p>
            <a
              href="/"
              className="inline-block text-amber-700 font-medium hover:underline"
            >
              So sánh Bus vs Grab →
            </a>
          </section>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Xe buýt 86 từ sân bay Nội Bài giá bao nhiêu?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: `Xe buýt 86 có giá VND ${fare} một chuyến từ sân bay Nội Bài đến trung tâm Hà Nội.`,
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Xe buýt 86 từ Nội Bài đến trung tâm thành phố mất bao lâu?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: `Hành trình mất khoảng ${BUS_86.travelTime.normal.min}–${BUS_86.travelTime.normal.max} phút bình thường, hoặc ${BUS_86.travelTime.peak.min}–${BUS_86.travelTime.peak.max} phút vào giờ cao điểm (7–9 sáng, 5–7 tối).`,
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Xe buýt 86 dừng ở đâu tại sân bay Nội Bài?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Xe buýt 86 dừng tại Tầng 1 sảnh đến cổng A1 của cả hai nhà ga T1 và T2 tại sân bay Nội Bài.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Xe buýt 86 chạy mấy giờ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: `Xe buýt 86 chạy từ ${startTime} đến ${endTime} hàng ngày, khởi hành mỗi 15–20 phút.`,
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Xe buýt 86 có an toàn cho du khách không?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Có, xe buýt 86 là tuyến do nhà nước vận hành với giá cố định. Không có nguy cơ bị tính phí cao hơn.',
                    },
                  },
                ],
              }),
            }}
          />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          <p>
            Cập nhật lần cuối: tháng 7/2026 · Nguồn: Hanoi Public Transport Center
          </p>
          <p className="mt-1">
            <a href="/" className="text-green-600 hover:underline">
              ← Quay lại Frylane
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
