import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'Is luggage included in the airport bus fare?',
    a: 'Yes. All Vietnam airport buses — Bus 86, Bus 109, and Bus 152 — are free for standard carry-on luggage. You pay only the ticket fare (VND 5,000–50,000 depending on the route). No extra charge for a regular suitcase or backpack that fits in the aisle or overhead.',
  },
  {
    q: 'How much luggage can I bring on Bus 86?',
    a: 'Bus 86 allows one standard piece of carry-on luggage for free. Oversized bags — typically those over 70 cm in any dimension — may be assessed a small fee at the driver\'s discretion. If your bag is very large (e.g. multiple large suitcases), a Grab or taxi may be more practical.',
  },
  {
    q: 'Does Bus 109 charge for oversized luggage?',
    a: 'Bus 109 is an electric bus from T3 Tan Son Nhat Airport. Standard carry-on luggage travels free. Oversized items (bicycles, surfboards, very large boxes) may be refused or incur a fee depending on available space. The driver makes the final call on bulky items.',
  },
  {
    q: 'Can I bring a surfboard on Bus 152?',
    a: 'Bus 152 is a public city bus and has limited space for oversized items. While the driver may allow small foldable items, a surfboard or large sporting equipment will likely be refused. Use a Grab or taxi for sports equipment. Bus 152 has no formal luggage hold — you carry everything yourself.',
  },
  {
    q: 'What happens if my luggage is too big for the bus?',
    a: 'If your luggage exceeds the bus\'s capacity, the driver may refuse boarding. Vietnam\'s airport buses were not designed for large cargo. Your options: (1) Take a Grab (VND 100,000–350,000 depending on destination), (2) Pre-arrange a taxi through your hotel, or (3) Use a luggage storage service near the airport before boarding the bus.',
  },
  {
    q: 'Do I need to pay extra for a stroller on airport buses?',
    a: 'Collapsible strollers travel for free on all three airport buses. Fold the stroller before boarding, carry it on, and store it in the aisle or designated area. Non-collapsible strollers may be treated as oversized luggage — drivers generally accommodate them if space allows, but there is no guaranteed space.',
  },
  {
    q: 'Is there a weight limit on Vietnam airport buses?',
    a: 'There is no official published weight limit for airport buses in Vietnam. However, practical limits apply: you must be able to carry your luggage on and off yourself. For checked luggage (large suitcases over 20 kg), a Grab or taxi is recommended. Airport buses have no cargo hold.',
  },
  {
    q: 'Where can I store luggage at Noi Bai Airport if the bus won\'t take it?',
    a: 'Noi Bai Airport (HAN) has a left luggage service in the arrivals hall — look for the service desk near Gate A1. Storage costs approximately VND 50,000–100,000 per item per day depending on size. At Tan Son Nhat Airport (SGN), luggage lockers are available in T1 and T3. Using a locker lets you take the bus with just a daypack, then retrieve your bags later.',
  },
];

export function LuggageFeePage() {
  return (
    <>
      <SEOHelmet path="/airport-bus-luggage-fee-vietnam" />
      <ArticleLayout languageSwitchPath="/vi/phi-hanh-ly-xe-buyt-san-bay">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Xe buýt sân bay Việt Nam
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Vietnam Airport Bus Luggage Fees: Bus 86 / 109 / 152 (2026)
            </h1>
            <p className="text-lg opacity-90">
              Free carry-on on all three routes. Oversized bags may incur a small fee.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* Quick answer */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Quick answer</h2>
            <p className="text-ink">
              All Vietnam airport buses (Bus 86, Bus 109, Bus 152) are{' '}
              <strong>free for standard carry-on luggage</strong>. Oversized bags (large suitcases, sports
              equipment) may incur a small fee at the driver&apos;s discretion or be refused if space is
              limited. No pre-booking or pre-payment for luggage is required.
            </p>
          </section>

          {/* Per-bus breakdown */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6">Per-bus breakdown</h2>
            <div className="space-y-6">
              {/* Bus 86 */}
              <div className="bg-white border border-surface-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
                    HAN — Hanoi
                  </span>
                  <h3 className="text-lg font-bold text-ink">Bus 86: Noi Bai Airport</h3>
                </div>
                <p className="text-ink-soft mb-3">
                  <strong>Standard luggage:</strong> Free. One carry-on bag allowed per passenger.
                </p>
                <p className="text-ink-soft mb-3">
                  <strong>Oversized bags:</strong> A small fee may apply for very large items. Driver
                  discretion.
                </p>
                <p className="text-ink-soft">
                  <strong>Pickup point:</strong> T1 Gate A1 (Column 12) and T2 Gate A1 (Column 14),
                  Arrivals Hall.
                </p>
              </div>

              {/* Bus 109 */}
              <div className="bg-white border border-surface-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    SGN — Saigon
                  </span>
                  <h3 className="text-lg font-bold text-ink">Bus 109: Tan Son Nhat Airport (T3)</h3>
                </div>
                <p className="text-ink-soft mb-3">
                  <strong>Standard luggage:</strong> Free. Electric bus with aisle space for carry-ons.
                </p>
                <p className="text-ink-soft mb-3">
                  <strong>Oversized items:</strong> May be refused if the bus is crowded. No formal luggage
                  hold. Bicycles and surfboards not allowed.
                </p>
                <p className="text-ink-soft">
                  <strong>Pickup point:</strong> T3 Arrivals Hall, curbside columns A17–A20.
                </p>
              </div>

              {/* Bus 152 */}
              <div className="bg-white border border-surface-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    SGN — Saigon
                  </span>
                  <h3 className="text-lg font-bold text-ink">Bus 152: Tan Son Nhat Airport (T1/T2)</h3>
                </div>
                <p className="text-ink-soft mb-3">
                  <strong>Standard luggage:</strong> Free. Carry your bag onto the bus yourself.
                </p>
                <p className="text-ink-soft mb-3">
                  <strong>Oversized items:</strong> Very limited space. Drivers may refuse large items,
                  especially during peak hours. No formal luggage hold.
                </p>
                <p className="text-ink-soft">
                  <strong>Pickup point:</strong> T1 and T2 Arrivals Hall curbside.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison table */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Luggage allowance comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-surface-border">
                    <th className="text-left py-3 px-4 font-semibold text-ink">Bus route</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink">Airport / Terminal</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink">Standard carry-on</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink">Oversized fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-4 text-ink font-medium">Bus 86</td>
                    <td className="py-3 px-4 text-ink">HAN — T1 &amp; T2</td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">Free</td>
                    <td className="py-3 px-4 text-ink-soft">Driver discretion</td>
                  </tr>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-4 text-ink font-medium">Bus 109</td>
                    <td className="py-3 px-4 text-ink">SGN — T3 only</td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">Free</td>
                    <td className="py-3 px-4 text-ink-soft">May be refused</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-ink font-medium">Bus 152</td>
                    <td className="py-3 px-4 text-ink">SGN — T1 &amp; T2</td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">Free</td>
                    <td className="py-3 px-4 text-ink-soft">Very limited space</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-soft mt-3">
              <strong>Note:</strong> All fares are fixed by state regulation. No extra charge for standard
              carry-on luggage on any of these three routes.
            </p>
          </section>

          {/* Tips */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Tips for travelers with large bags</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">→</span>
                <p className="text-ink">
                  <strong>Use a Grab</strong> for 2+ large suitcases. A Grab costs VND 100,000–350,000
                  but has a proper trunk. Frylane&apos;s calculator compares bus vs Grab so you can decide
                  before you land.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">→</span>
                <p className="text-ink">
                  <strong>Pre-arrange airport luggage storage</strong> at Noi Bai (VND 50,000–100,000/day)
                  or Tan Son Nhat (lockers available) if you want to take the bus and shop before
                  retrieving bags.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">→</span>
                <p className="text-ink">
                  <strong>Bus 86 is the most luggage-friendly</strong> of the three routes — the bus is
                  larger and has more aisle space. Bus 152 gets crowded and has the least room for bags.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">→</span>
                <p className="text-ink">
                  <strong>Peak hours (7–9 AM, 5–7 PM)</strong> mean buses are more crowded and luggage
                  space is tighter. If possible, plan your landing time outside peak hours.
                </p>
              </li>
            </ul>
          </section>

          {/* Related articles */}
          <section className="border-t border-surface-border pt-8">
            <h2 className="text-lg font-semibold text-ink mb-3">Related articles</h2>
            <ul className="space-y-2">
              <li>
                <a href="/bus-86-hanoi-airport" className="text-primary underline hover:text-primary/80">
                  Bus 86 Hanoi Airport — Schedule, VND 50,000 Fare (2026)
                </a>
              </li>
              <li>
                <a href="/bus-109-saigon-airport" className="text-primary underline hover:text-primary/80">
                  Bus 109 Saigon Airport — Schedule, VND 15,000 Fare (2026)
                </a>
              </li>
              <li>
                <a href="/bus-152-saigon-fare" className="text-primary underline hover:text-primary/80">
                  Bus 152 Saigon Airport — VND 5,000 Fare (Cheapest Option)
                </a>
              </li>
              <li>
                <a href="/airport-scam-vietnam-taxi" className="text-primary underline hover:text-primary/80">
                  Airport Taxi Scams in Vietnam (2026) — How to Avoid Them
                </a>
              </li>
            </ul>
          </section>

          <FAQSection items={FAQ_ITEMS} />
        </div>

        <FAQSchema items={FAQ_ITEMS} />
      </ArticleLayout>
    </>
  );
}
