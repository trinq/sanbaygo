import { Helmet } from 'react-helmet-async';
import { BUS_86 } from '@core/data/busSchedule';

export function Bus86Page() {
  const schedule = BUS_86.scheduleSource.kind === 'explicit'
    ? BUS_86.scheduleSource.departures
    : [];

  const stops = [
    { name: 'Sân bay Nội Bài – Cổng A1, Tầng 1', address: 'Ga quốc tế T1, đối diện cột 12' },
    { name: 'Cầu Nhật Tân', address: 'Qua cầu Nhật Tân' },
    { name: 'Đại lộ Thăng Long', address: 'Đại lộ Thăng Long' },
    { name: 'Hoàng Mai', address: 'Quận Hoàng Mai' },
    { name: 'Phố Nào Đó – Khu phố cổ', address: 'Khu phố cổ Hà Nội' },
  ];

  return (
    <>
      <Helmet>
        <title>Bus 86 — Sân bay Nội Bài đến Phố Cổ | Frylane</title>
        <meta
          name="description"
          content="Xe buýt 86 từ sân bay Nội Bài đến khu phố cổ Hà Nội. Giá VND 35,000, thời gian 45–60 phút, khởi hành mỗi 15–20 phút từ 05:00–23:00. Tính thời gian đón xe ngay."
        />
        <meta name="keywords" content="bus 86 hanoi airport, xe buýt 86 nội bài, bus 86 noi bai, transportation hanoi airport" />
        <link rel="canonical" href="https://frylane.com/articles/bus-86-hanoi-airport" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://frylane.com/articles/bus-86-hanoi-airport" />
        <meta property="og:title" content="Bus 86 — Sân bay Nội Bài đến Phố Cổ Hà Nội" />
        <meta property="og:description" content="VND 35,000 · 45–60 min · Mỗi 15–20 phút · 05:00–23:00. Tất cả giờ khởi hành Bus 86 tại đây." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

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
              VND 35,000 · 45–60 phút · Mỗi 15–20 phút · 05:00–23:00
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
                    <td className="py-3 px-2">{BUS_86.operatingHours.start}</td>
                    <td className="py-3 px-2">{BUS_86.operatingHours.end}</td>
                    <td className="py-3 px-2">15–20 phút</td>
                    <td className="py-3 px-2 font-medium text-green-600">
                      VND {BUS_86.ticketPrice.toLocaleString()}
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
              Nguồn: Hanoi Public Transport Center (tramdep.vn). Xác minh lần cuối: tháng 7/2025.
            </p>
          </section>

          {/* Route Stops */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Các điểm dừng</h2>
            <div className="space-y-3">
              {stops.map((stop, i) => (
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
                      text: 'Xe buýt 86 có giá VND 35,000 một chuyến từ sân bay Nội Bài đến khu phố cổ Hà Nội.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Xe buýt 86 từ Nội Bài đến trung tâm thành phố mất bao lâu?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Hành trình mất khoảng 45–60 phút tùy thuộc vào tình trạng giao thông.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Xe buýt 86 dừng ở đâu tại sân bay Nội Bài?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Xe buýt 86 dừng tại Tầng 1 sảnh đến cổng A1 của sân bay Nội Bài, đối diện cột 12 (Ga T1).',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Xe buýt 86 chạy mấy giờ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Xe buýt 86 chạy từ 05:00 đến 23:00 hàng ngày, khởi hành mỗi 15–20 phút.',
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
            Cập nhật lần cuối: tháng 7/2025 · Nguồn: Hanoi Public Transport Center
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
