import { BUS_86 } from '@core/data/busSchedule';
import { AirportArticleLayout } from '../../components/Layout/AirportArticleLayout';
import type { BusArticleConfig } from '../../components/Layout/AirportArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'Is Bus 86 still running at 8pm?',
    a: 'Yes — if you exit the terminal by around 21:30, you can still catch Bus 86 from Noi Bai Airport. The last departure from the airport is at 22:15. After that, Grab is your only option.',
  },
  {
    q: 'What time does the last bus leave from Noi Bai Airport?',
    a: 'The last Bus 86 departure from Noi Bai Airport is at 22:15. The bus runs from 06:40 to 22:15 daily, departing every 15–20 minutes.',
  },
  {
    q: 'Is Grab available at Hanoi Airport after midnight?',
    a: 'Yes. Grab is available 24/7 at Noi Bai Airport. Use the Grab app to book a ride — prices are fixed and shown before you confirm, so there is no risk of being overcharged.',
  },
  {
    q: 'How much is Grab from Noi Bai at night?',
    a: 'Grab rides from Noi Bai to central Hanoi typically cost VND 250,000–350,000. Night rides may be slightly higher due to demand, but the price is shown in the app before you book.',
  },
  {
    q: 'Is it safe to take Grab at Hanoi Airport late at night?',
    a: 'Using the Grab app is the safest option. Prices are fixed, payments are digital, and your trip is tracked. Avoid street taxis that approach you with fixed-price offers — use the app to avoid scams.',
  },
];

const STOPS = [
  { name: 'Noi Bai Airport — T1 Gate A1', address: 'Arrivals hall, floor 1, opposite pillar 12' },
  { name: 'Noi Bai Airport — T2 Gate A1', address: 'Arrivals hall, floor 1, opposite pillar 14' },
  { name: 'Nhật Tân Bridge', address: 'Crossing Nhật Tân Bridge' },
  { name: 'Thăng Long Boulevard', address: 'Thăng Long Boulevard, Bắc Từ Liêm district' },
  { name: 'Hanoi Old Quarter', address: 'Old Quarter, Hoàn Kiếm district' },
];

export function LateNightBusPage() {
  const config: BusArticleConfig = {
    seoPath: '/hanoi-airport-late-night-bus',
    h1En: '8 PM at Hanoi Airport: Is the Bus Still Running? (2026)',
    categoryLabel: 'Hanoi Airport Guide',
    subtitle: 'Last Bus 86: 22:15 · Grab available 24/7',
    bus: BUS_86,
    airportCode: 'HAN',
    defaultTerminal: 'HAN-T1',
    stops: STOPS,
    frequency: 'Every 15–20 min',
    grabPriceRange: 'VND 250,000–350,000',
    scheduleCount: BUS_86.scheduleSource.kind === 'explicit' ? BUS_86.scheduleSource.departures.length : 0,
    dataSource: 'Hanoi Public Transport Center (tramdep.vn)',
    pickupHint: 'Bus 86 picks up at T1 Gate A1 (arrivals, pillar 12) and T2 Gate A1 (pillar 14).',
    faqItems: FAQ_ITEMS,
    relatedArticles: [
      { label: 'Bus 86 — Hanoi Airport to Old Quarter', href: '/bus-86-hanoi-airport' },
      { label: 'Airport Taxi Scams in Vietnam: How to Avoid Them', href: '/airport-scam-vietnam-taxi' },
    ],
  };

  return (
    <>
      <AirportArticleLayout config={config} />
      <nav className="max-w-3xl mx-auto px-4 pb-8 text-sm text-ink-soft">
        Related:{' '}
        <a href="/hanoi-airport-late-night-bus" className="text-primary underline">Is Bus 86 running at 8 PM?</a>
        {' · '}
        <a href="/airport-scam-vietnam-taxi" className="text-primary underline">Vietnam airport taxi scams</a>
        {' · '}
        <a href="/grab-vs-bus-hanoi-airport" className="text-primary underline">Grab vs Bus 86 comparison</a>
      </nav>
    </>
  );
}
