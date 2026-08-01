import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  { q: 'Does Bus 109 stop at Tan Son Nhat T2?', a: 'No. Bus 109 now serves Terminal 3 (T3) only. If you arrive at T1 or T2, take the free inter-terminal shuttle to T3 before boarding.' },
  { q: 'Where do I catch Bus 109 at T3?', a: 'Go to the T3 arrivals curbside and follow the public-bus signs to the Bus 109 pickup area. The current stop is by columns A17–A20 on the ground floor.' },
  { q: 'Is the T1/T2 → T3 shuttle free?', a: 'Yes. The airport inter-terminal shuttle is free for passengers moving between T1, T2, and T3.' },
  { q: 'How long does the shuttle take?', a: 'Allow about 10–15 minutes for the shuttle ride, plus waiting and walking time. Leave a buffer if you are connecting to the last Bus 109 departure.' },
  { q: 'Can I use Bus 109 at night?', a: 'Bus 109 operates from approximately 05:30 to 22:00. After the final departure, use Grab or a licensed taxi.' },
  { q: 'What if I have a lot of luggage?', a: 'The free shuttle is the simplest way to reach T3, but Bus 109 has limited luggage space. Grab or a taxi is more practical for multiple large suitcases.' },
];

export function SgnBus109T3RoutingPage() {
  const config: ComparisonArticleConfig = {
    seoPath: '/sgn-bus-109-t3-routing',
    h1En: 'Bus 109 at Tan Son Nhat: T3 Only — What About T1 & T2? (2026)',
    categoryLabel: 'Tan Son Nhat terminal routing',
    subtitle: 'Bus 109 now departs from T3 only. Here is what T1 and T2 arrivals should do.',
    intro: 'Bus 109 moved to Tan Son Nhat Terminal 3. If your flight arrives at T1 or T2, do not wait at the old bus stop: take the free inter-terminal shuttle first, then board at T3. Last verified: 2026-08-02. Sources: CAAV T3 notice (2025-04-23), VOH Bus 109 change notice, Thaiest terminal shuttle guide.',
    options: [
      { name: 'Bus 109 from T3 (recommended)', priceRange: 'VND 15,000', durationRange: '30–45 minutes', pros: ['Direct airport-to-city route', 'Electric bus with air conditioning', 'Best option when already at T3'], cons: ['T3 only', 'Limited late-night service'], bestFor: 'T3 arrivals with light or moderate luggage' },
      { name: 'Free T1/T2 → T3 shuttle + Bus 109', priceRange: 'VND 15,000', durationRange: '45–65 minutes', pros: ['Free transfer between terminals', 'Keeps the low Bus 109 fare', 'Works for T1 and T2 arrivals'], cons: ['Requires an extra transfer', 'Add waiting and walking time'], bestFor: 'T1/T2 arrivals who want Bus 109' },
      { name: 'Bus 152 (T2 alternative)', priceRange: 'VND 5,000', durationRange: '25–55 minutes', pros: ['Boards at T1/T2', 'Cheapest airport bus', 'Frequent daytime departures'], cons: ['Not a T3 pickup', 'Less luggage space', 'Can be crowded'], bestFor: 'T1/T2 arrivals prioritizing price' },
      { name: 'Grab/taxi direct', priceRange: 'VND 100,000–300,000', durationRange: '20–40 minutes', pros: ['Door-to-door', 'No terminal transfer', 'Best for heavy luggage'], cons: ['Much more expensive', 'Traffic affects arrival time', 'Use official pickup and verify the vehicle'], bestFor: 'Groups, late arrivals, or bulky luggage' },
    ],
    verdict: 'If you arrive at T1 or T2, take the free shuttle first. Choose Bus 109 from T3 for the low-cost direct route; use Bus 152 when you want to board without transferring, or Grab/taxi when luggage and time matter more than price.',
    faqItems: FAQ_ITEMS,
  };

  return (
    <>
      <ComparisonArticleLayout config={config} />
      <nav aria-label="Related articles" className="mx-auto max-w-3xl px-4 pb-12 flex flex-wrap gap-3">
        <a href="/bus-109-saigon-airport" className="text-primary underline">Bus 109 schedule</a>
        <a href="/airport-scam-vietnam-taxi" className="text-primary underline">Airport taxi safety</a>
        <a href="/sgn-t2-t3-shuttle" className="text-primary underline">T2 to T3 shuttle</a>
        <a href="/bus-152-saigon-fare" className="text-primary underline">Bus 152 fare</a>
      </nav>
    </>
  );
}
