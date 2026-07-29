import { useLanguage } from '../../contexts/LanguageContext';

const BUS_GUIDES = {
  vi: [
    {
      route: 'Bus 86',
      airport: 'Sân bay Nội Bài',
      href: '/bus-86-hanoi-airport',
      badge: 'Hà Nội',
      badgeBg: 'bg-blue-100 text-blue-700',
      fare: '50.000đ',
      duration: '50–75 phút',
      frequency: 'Mỗi 15 phút',
      summary: 'Tuyến buýt phổ biến nhất từ Nội Bài về phố cổ Hà Nội.',
    },
    {
      route: 'Bus 109',
      airport: 'Sân bay Tân Sơn Nhất',
      href: '/bus-109-saigon-airport',
      badge: 'TP.HCM',
      badgeBg: 'bg-orange-100 text-orange-700',
      fare: '15.000đ',
      duration: '30–70 phút',
      frequency: 'Mỗi 20 phút',
      summary: 'Xe buýt điện từ T3 vào trung tâm Sài Gòn.',
    },
    {
      route: 'Bus 152',
      airport: 'Sân bay Tân Sơn Nhất',
      href: '/bus-152-saigon-fare',
      badge: 'TP.HCM',
      badgeBg: 'bg-orange-100 text-orange-700',
      fare: '5.000đ',
      duration: '25–55 phút',
      frequency: 'Mỗi 12–20 phút',
      summary: 'Tuyến rẻ nhất từ T1/T2 vào trung tâm TP.HCM.',
    },
  ],
  en: [
    {
      route: 'Bus 86',
      airport: 'Noi Bai Airport',
      href: '/bus-86-hanoi-airport',
      badge: 'Hanoi',
      badgeBg: 'bg-blue-100 text-blue-700',
      fare: '50,000 VND',
      duration: '50–75 min',
      frequency: 'Every 15 min',
      summary: 'Most popular route from Noi Bai to Hanoi Old Quarter.',
    },
    {
      route: 'Bus 109',
      airport: 'Tan Son Nhat Airport',
      href: '/bus-109-saigon-airport',
      badge: 'Ho Chi Minh City',
      badgeBg: 'bg-orange-100 text-orange-700',
      fare: '15,000 VND',
      duration: '30–70 min',
      frequency: 'Every 20 min',
      summary: 'Electric bus from T3 to Ho Chi Minh City center.',
    },
    {
      route: 'Bus 152',
      airport: 'Tan Son Nhat Airport',
      href: '/bus-152-saigon-fare',
      badge: 'Ho Chi Minh City',
      badgeBg: 'bg-orange-100 text-orange-700',
      fare: '5,000 VND',
      duration: '25–55 min',
      frequency: 'Every 12–20 min',
      summary: 'Cheapest route from T1/T2 to Ho Chi Minh City center.',
    },
  ],
};

const LABELS = {
  vi: {
    title: 'Hướng dẫn các tuyến xe buýt sân bay',
    subtitle: 'Tìm hiểu lịch trình, giá vé và thời gian di chuyển của từng tuyến',
    fare: 'Giá vé',
    duration: 'Di chuyển',
    frequency: 'Tần suất',
    cta: 'Xem hướng dẫn đầy đủ',
  },
  en: {
    title: 'Airport Bus Route Guide',
    subtitle: 'Learn schedules, fares, and travel times for each route',
    fare: 'Fare',
    duration: 'Duration',
    frequency: 'Frequency',
    cta: 'View full guide',
  },
};

export function BusGuides() {
  const { language } = useLanguage();
  const buses = BUS_GUIDES[language];
  const labels = LABELS[language];

  return (
    <section className="bg-white py-16 px-4 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-ink mb-2">{labels.title}</h2>
          <p className="text-ink-soft">{labels.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {buses.map((bus) => (
            <a
              key={bus.href}
              href={bus.href}
              className="group block rounded-2xl border border-surface-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-ink group-hover:text-primary transition-colors">
                    {bus.route}
                  </h3>
                  <p className="text-sm text-ink-soft">{bus.airport}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${bus.badgeBg}`}>
                  {bus.badge}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-ink-soft uppercase tracking-wide">{labels.fare}</p>
                  <p className="font-semibold text-ink">{bus.fare}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-soft uppercase tracking-wide">{labels.duration}</p>
                  <p className="font-semibold text-ink">{bus.duration}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-ink-soft uppercase tracking-wide">{labels.frequency}</p>
                  <p className="font-semibold text-ink">{bus.frequency}</p>
                </div>
              </div>

              <p className="text-sm text-ink-soft mb-4">{bus.summary}</p>

              <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                {labels.cta}
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
