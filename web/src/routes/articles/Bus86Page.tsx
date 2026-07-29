import { useNavigate } from 'react-router-dom';
import { SEOHelmet } from '../../components/SEO';
import { SearchCard } from '../../components/Landing/SearchCard';
import { useLandingForm } from '../../hooks/useLandingForm';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { BUS_86 } from '@core/data/busSchedule';

const STOPS = [
  { name: 'Sân bay Nội Bài – Ga T1, Cổng A1', address: 'Tầng 1 sảnh đến, đối diện cột 12' },
  { name: 'Sân bay Nội Bài – Ga T2, Cổng A1', address: 'Tầng 1 sảnh đến, đối diện cột 14' },
  { name: 'Cầu Nhật Tân', address: 'Qua cầu Nhật Tân' },
  { name: 'Đại lộ Thăng Long', address: 'Đại lộ Thăng Long, quận Bắc Từ Liêm' },
  { name: 'Phố cổ Hà Nội', address: 'Khu phố cổ, quận Hoàn Kiếm' },
];

function SearchCardCTA() {
  const navigate = useNavigate();
  const form = useLandingForm();

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;
    const params = new URLSearchParams({
      airport: formData.airportId === 'noi-bai' ? 'HAN' : 'SGN',
      flightTime: formData.arrivalTime,
      terminal: formData.terminal ?? '',
      destination: formData.destination ?? '',
      baggage: formData.baggage ?? 'carry_on',
      flightType: formData.flightType,
    });
    navigate(`/ket-qua?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-white/80 p-6 shadow-card backdrop-blur-md">
      <h2 className="text-lg font-semibold text-ink mb-1">
        Tính thời gian đón xe của bạn
      </h2>
      <p className="text-sm text-ink-soft mb-4">
        Nhập giờ đáp để xem Bus 86 có khả thi không.
      </p>
      <SearchCard
        arrivalTime={form.arrivalTime}
        airport={form.airport}
        terminal={form.terminal}
        destination={form.destination}
        people={form.people}
        carryOn={form.carryOn}
        checked={form.checked}
        flightType={form.flightType}
        showFlightTypeSelector={form.showFlightTypeSelector}
        terminalOptions={form.terminalOptions}
        destinationOptions={form.destinationOptions}
        onArrivalTimeChange={form.setArrivalTime}
        onAirportChange={form.setAirport}
        onTerminalChange={form.setTerminal}
        onDestinationChange={form.setDestination}
        onFlightTypeChange={form.setFlightType}
        onPeopleChange={form.setPeople}
        onCarryOnChange={form.setCarryOn}
        onCheckedChange={form.setChecked}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

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
      <ArticleLayout>
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
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

        {/* Search Card CTA */}
        <section className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
          <SearchCardCTA />
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Schedule Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Lịch trình hôm nay</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-surface-border">
                    <th className="text-left py-3 px-2 text-ink-soft font-medium">Giờ đầu</th>
                    <th className="text-left py-3 px-2 text-ink-soft font-medium">Giờ cuối</th>
                    <th className="text-left py-3 px-2 text-ink-soft font-medium">Tần suất</th>
                    <th className="text-left py-3 px-2 text-ink-soft font-medium">Giá vé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-2 text-ink">{startTime}</td>
                    <td className="py-3 px-2 text-ink">{endTime}</td>
                    <td className="py-3 px-2 text-ink">15–20 phút</td>
                    <td className="py-3 px-2 font-medium text-primary">
                      VND {fare}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-primary font-medium hover:underline">
                Xem tất cả giờ khởi hành ({schedule.length} chuyến)
              </summary>
              <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 gap-1">
                {schedule.map((time) => (
                  <span key={time} className="text-sm bg-slate-50 rounded px-2 py-1 text-center text-ink">
                    {time}
                  </span>
                ))}
              </div>
            </details>

            <p className="text-sm text-ink-soft mt-2">
              Nguồn: Hanoi Public Transport Center (tramdep.vn). Xác minh lần cuối: tháng 7/2026.
            </p>
          </section>

          {/* Route Stops */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Các điểm dừng</h2>
            <div className="space-y-3">
              {STOPS.map((stop, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-ink">{stop.name}</p>
                    <p className="text-sm text-ink-soft">{stop.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Travel Time Info */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-3">Thời gian di chuyển</h2>
            <p className="text-ink">
              Thời gian di chuyển từ sân bay Nội Bài đến trung tâm Hà Nội:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <span className="inline-block bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded">
                  Bình thường
                </span>
                <span className="text-ink">
                  {BUS_86.travelTime.normal.min}–{BUS_86.travelTime.normal.max} phút
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                  Giờ cao điểm (7–9 sáng, 5–7 tối)
                </span>
                <span className="text-ink">
                  {BUS_86.travelTime.peak.min}–{BUS_86.travelTime.peak.max} phút
                </span>
              </li>
            </ul>
          </section>

          {/* Grab Alternative */}
          <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-3">Phương án Grab thay thế</h2>
            <p className="text-ink mb-3">
              Nếu bạn lỡ xe buýt, Grab có giá khoảng <strong>VND 250,000–350,000</strong>.
              Dùng công cụ tính của chúng tôi để so sánh:
            </p>
            <a
              href="/"
              className="inline-block text-orange-700 font-medium hover:underline"
            >
              So sánh Bus vs Grab →
            </a>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Câu hỏi thường gặp</h2>
            <div className="space-y-4">
              {[
                { q: 'Xe buýt 86 từ sân bay Nội Bài giá bao nhiêu?', a: `Xe buýt 86 có giá VND ${fare} một chuyến từ sân bay Nội Bài đến trung tâm Hà Nội.` },
                { q: 'Xe buýt 86 từ Nội Bài đến trung tâm thành phố mất bao lâu?', a: `Hành trình mất khoảng ${BUS_86.travelTime.normal.min}–${BUS_86.travelTime.normal.max} phút bình thường, hoặc ${BUS_86.travelTime.peak.min}–${BUS_86.travelTime.peak.max} phút vào giờ cao điểm (7–9 sáng, 5–7 tối).` },
                { q: 'Xe buýt 86 dừng ở đâu tại sân bay Nội Bài?', a: 'Xe buýt 86 dừng tại Tầng 1 sảnh đến cổng A1 của cả hai nhà ga T1 và T2 tại sân bay Nội Bài.' },
                { q: 'Xe buýt 86 chạy mấy giờ?', a: `Xe buýt 86 chạy từ ${startTime} đến ${endTime} hàng ngày, khởi hành mỗi 15–20 phút.` },
                { q: 'Xe buýt 86 có an toàn cho du khách không?', a: 'Có, xe buýt 86 là tuyến do nhà nước vận hành với giá cố định. Không có nguy cơ bị tính phí cao hơn.' },
              ].map((item, i) => (
                <details key={i} className="rounded-xl border border-surface-border bg-white">
                  <summary className="cursor-pointer p-5 font-medium text-ink list-none flex items-center justify-between">
                    {item.q}
                    <svg className="h-5 w-5 text-ink-soft shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-surface-border px-5 pb-5 pt-4 text-ink-soft">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>

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
      </ArticleLayout>
    </>
  );
}
