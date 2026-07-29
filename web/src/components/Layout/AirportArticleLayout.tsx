import { useNavigate } from 'react-router-dom';
import type { BusRoute } from '@core/types';
import { SEOHelmet } from '../SEO';
import { SearchCard } from '../Landing/SearchCard';
import { useLandingForm } from '../../hooks/useLandingForm';
import { ArticleLayout } from './ArticleLayout';

export interface BusArticleConfig {
  /** SEO Helmet path, e.g. "/bus-86-hanoi-airport" */
  seoPath: string;
  /** English H1 — e.g. "Bus 86 — Hanoi Airport to Old Quarter" */
  h1En: string;
  /** Vietnamese label above H1 — e.g. "Xe buýt sân bay Hà Nội" */
  categoryLabel: string;
  /** Vietnamese subtitle below H1 — e.g. "VND 50,000 · 06:40–22:15" */
  subtitle: string;
  bus: BusRoute;
  /** Airport code: "HAN" or "SGN" */
  airportCode: string;
  /** Default terminal for search form, e.g. "HAN-T1" or "SGN-T3" */
  defaultTerminal: string;
  /** List of stops with Vietnamese name and address */
  stops: Array<{ name: string; address: string }>;
  /** How often the bus departs — e.g. "Every 15–20 min" */
  frequency: string;
  /** Optional Grab price range for article page — e.g. "VND 250,000–350,000" */
  grabPriceRange?: string;
  /** Number of departure times to show before collapsible list */
  scheduleCount: number;
  /** Data source attribution — e.g. "Hanoi Public Transport Center (tramdep.vn)" */
  dataSource: string;
  /** Pickup location hint shown below exit-time section */
  pickupHint?: string;
  /** FAQ items — each has a Vietnamese question and answer */
  faqItems: Array<{ q: string; a: string }>;
  /** Path to the counterpart language page — used for the language switcher link in nav.
   *  e.g. EN page: "/vi/tuyen-86-noi-bai", VI page: "/bus-86-hanoi-airport" */
  alternatePath?: string;
}

interface Props {
  config: BusArticleConfig;
}

function SearchCardCTA({ airportCode, defaultTerminal }: { airportCode: string; defaultTerminal: string }) {
  const navigate = useNavigate();
  const form = useLandingForm();

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;
    const params = new URLSearchParams({
      airport: airportCode,
      flightTime: formData.arrivalTime,
      terminal: formData.terminal ?? defaultTerminal,
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
        Nhập giờ đáp để xem xe buýt có khả thi không.
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

function ExitTimeSection({ summary, pickupHint }: { summary?: string; pickupHint?: string }) {
  if (!summary) return null;
  return (
    <section className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-12">
      <h2 className="text-xl font-bold text-ink mb-3">Thời gian ra khỏi nhà ga</h2>
      <p className="text-ink mb-3">
        Sau khi máy bay hạ cánh, cộng thêm thời gian này trước khi đón xe buýt:
      </p>
      <p className="text-ink font-medium">{summary}</p>
      {pickupHint && (
        <p className="text-sm text-ink-soft mt-4">
          <strong>Mẹo:</strong> {pickupHint}
        </p>
      )}
    </section>
  );
}

function ScamWarningSection() {
  return (
    <section className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
      <h2 className="text-xl font-bold text-ink mb-3">
        Mẹo an toàn cho du khách quốc tế
      </h2>
      <p className="text-ink mb-3">
        Lừa đảo taxi phổ biến tại sân bay Việt Nam. Dưới đây là cách bảo vệ bạn:
      </p>
      <ul className="list-disc list-inside space-y-2 text-ink-soft">
        <li><strong>Sử dụng Grab hoặc BeBike app</strong> — Giá cố định, không mặc cả</li>
        <li><strong>Bỏ qua các tài xế taxi đề nghị "giá đặc biệt"</strong> ngay khi ra cổng</li>
        <li><strong>Xe buýt công cộng có giá cố định do nhà nước quy định</strong> — Không có nguy cơ lừa đảo</li>
        <li><strong>Nếu bắt taxi:</strong> Yêu cầu bật đồng hồ (meter)</li>
      </ul>
    </section>
  );
}

function GrabAlternativeSection({ priceRange }: { priceRange?: string }) {
  if (!priceRange) return null;
  return (
    <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-12">
      <h2 className="text-xl font-bold text-ink mb-3">Phương án Grab thay thế</h2>
      <p className="text-ink mb-3">
        Nếu bạn lỡ xe buýt, Grab có giá khoảng <strong>{priceRange}</strong>.
        Dùng công cụ tính của chúng tôi để so sánh:
      </p>
      <a
        href="https://grab.com/vn/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-orange-700 font-medium hover:underline"
      >
        So sánh Bus vs Grab →
      </a>
    </section>
  );
}

function TravelTimeSection({ bus }: { bus: BusRoute }) {
  return (
    <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
      <h2 className="text-xl font-bold text-ink mb-3">Thời gian di chuyển</h2>
      <p className="text-ink">Thời gian di chuyển từ sân bay đến trung tâm thành phố:</p>
      <ul className="mt-3 space-y-2">
        <li className="flex items-center gap-2">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded">
            Bình thường
          </span>
          <span className="text-ink">
            {bus.travelTime.normal.min}–{bus.travelTime.normal.max} phút
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
            Giờ cao điểm (7–9 sáng, 5–7 tối)
          </span>
          <span className="text-ink">
            {bus.travelTime.peak.min}–{bus.travelTime.peak.max} phút
          </span>
        </li>
      </ul>
    </section>
  );
}

function StopsSection({ stops }: { stops: Array<{ name: string; address: string }> }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-ink mb-4">Các điểm dừng</h2>
      <div className="space-y-3">
        {stops.map((stop, i) => (
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
  );
}

function ScheduleSection({
  bus,
  frequency,
  scheduleCount,
  dataSource,
}: {
  bus: BusRoute;
  frequency: string;
  scheduleCount: number;
  dataSource: string;
}) {
  const departures =
    bus.scheduleSource.kind === 'explicit' ? bus.scheduleSource.departures : [];
  const fare = bus.ticketPrice.toLocaleString();

  return (
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
              <td className="py-3 px-2 text-ink">{bus.operatingHours.start}</td>
              <td className="py-3 px-2 text-ink">{bus.operatingHours.end}</td>
              <td className="py-3 px-2 text-ink">{frequency}</td>
              <td className="py-3 px-2 font-medium text-primary">
                VND {fare}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {departures.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-primary font-medium hover:underline">
            Xem tất cả giờ khởi hành ({departures.length} chuyến)
          </summary>
          <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 gap-1">
            {departures.map((time) => (
              <span
                key={time}
                className="text-sm bg-slate-50 rounded px-2 py-1 text-center text-ink"
              >
                {time}
              </span>
            ))}
          </div>
        </details>
      )}

      <p className="text-sm text-ink-soft mt-2">
        Nguồn: {dataSource}. Xác minh lần cuối: tháng 7/2026.
      </p>
    </section>
  );
}

function FAQSection({ items, bus }: { items: Array<{ q: string; a: string }>; bus: BusRoute }) {
  const fare = bus.ticketPrice.toLocaleString();

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-ink mb-4">Câu hỏi thường gặp</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
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
  );
}

function FAQSchema({ items, bus }: { items: Array<{ q: string; a: string }>; bus: BusRoute }) {
  const mainEntity = items.map((item) => ({
    '@type': 'Question' as const,
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: item.a,
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity,
        }),
      }}
    />
  );
}

export function AirportArticleLayout({ config }: Props) {
  const {
    seoPath,
    h1En,
    categoryLabel,
    subtitle,
    bus,
    airportCode,
    defaultTerminal,
    stops,
    frequency,
    grabPriceRange,
    scheduleCount,
    dataSource,
    pickupHint,
    faqItems,
    alternatePath,
  } = config;

  return (
    <>
      <SEOHelmet path={seoPath} />
      <ArticleLayout languageSwitchPath={alternatePath}>
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              {categoryLabel}
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{h1En}</h1>
            <p className="text-lg opacity-90">{subtitle}</p>
          </div>
        </header>

        {/* Search Card CTA */}
        <section className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
          <SearchCardCTA airportCode={airportCode} defaultTerminal={defaultTerminal} />
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <ScheduleSection
            bus={bus}
            frequency={frequency}
            scheduleCount={scheduleCount}
            dataSource={dataSource}
          />
          <StopsSection stops={stops} />
          <ScamWarningSection />
          <TravelTimeSection bus={bus} />
          <ExitTimeSection summary={bus.exitTimeSummary} pickupHint={pickupHint} />
          <GrabAlternativeSection priceRange={grabPriceRange} />
          <FAQSection items={faqItems} bus={bus} />
        </div>

        <FAQSchema items={faqItems} bus={bus} />
      </ArticleLayout>
    </>
  );
}
