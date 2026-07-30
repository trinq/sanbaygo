import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'What is the cheapest bus from Noi Bai Airport to the city?',
    a: 'The cheapest bus from Noi Bai Airport (HAN) to central Hanoi is Bus 17 at VND 7,000. It takes 45–60 minutes and departs from outside the terminal buildings. Bus 90 (VND 9,000) is the second cheapest option and takes 40–55 minutes toward the Tay Ho area. <a href="/cheapest-way-hanoi-airport" class="text-primary underline">See full cheapest options →</a>',
  },
  {
    q: 'How much is the bus from Tan Son Nhat Airport to District 1?',
    a: 'The cheapest bus from Tan Son Nhat Airport (SGN) to District 1 is Bus 152 at VND 5,000 — the cheapest airport bus in all of Vietnam. Bus 109 costs VND 15,000 and is faster (30–45 min) using the electric bus from T3. <a href="/bus-152-saigon-fare" class="text-primary underline">See Bus 152 fare details →</a> <a href="/bus-109-saigon-airport" class="text-primary underline">See Bus 109 schedule →</a>',
  },
  {
    q: 'Do airport buses in Vietnam have AC?',
    a: 'Most airport buses in Vietnam are air-conditioned. Bus 86 (Hanoi) is a premium fixed-fare service with AC. Bus 109 (Saigon) is an electric AC bus. Bus 17 and Bus 90 (Hanoi) may have limited AC. Bus 152 (Saigon) is a standard city bus — some routes have AC, some do not. Budget buses with standing room are also common on some routes.',
  },
  {
    q: 'Can I take a suitcase on the airport bus?',
    a: 'Yes — all Vietnam airport buses (Bus 17, 86, 90 in Hanoi; Bus 109, 152 in Saigon) allow standard carry-on luggage for free. Large or oversized bags may incur a small fee depending on the operator. Standard airport buses do not have dedicated luggage holds like airport shuttles. <a href="/airport-bus-luggage-fee-vietnam" class="text-primary underline">See full luggage policy →</a>',
  },
  {
    q: 'What is the last bus from Noi Bai Airport?',
    a: 'The last Bus 86 from Noi Bai Airport departs at 22:15 from outside the terminal. Bus 17 and Bus 90 have earlier last buses — typically around 20:00–21:00 depending on the day. After Bus 86 stops, Grab is your main option (VND 300,000–450,000 with night surcharge). <a href="/hanoi-airport-late-night-transfer" class="text-primary underline">Late night transfer guide →</a>',
  },
  {
    q: 'Is there a bus from Da Nang Airport to the city?',
    a: 'Yes, Da Nang Airport (DAD/DNA) has public buses connecting to the city center, though they are less frequent than in Hanoi or Saigon. Route information is limited and schedules may vary. Most visitors to Da Nang opt for Grab (VND 80,000–150,000 to city center, 15–25 minutes) or hotel transfers. Da Nang airport is smaller and easier to navigate than Noi Bai or Tan Son Nhat.',
  },
  {
    q: 'Which is better: airport bus or Grab?',
    a: 'It depends on your priorities. Buses cost VND 5,000–50,000 and take 30–80 minutes. Grab costs VND 80,000–300,000 and takes 20–50 minutes. Buses are best for budget travelers, daytime arrivals, and destinations on the bus route. Grab is better for speed, comfort, late-night arrivals, large groups, or heavy luggage. <a href="/grab-vs-bus-hanoi-airport" class="text-primary underline">See full Grab vs Bus comparison →</a>',
  },
  {
    q: 'Are airport buses in Vietnam safe for tourists?',
    a: 'Yes, airport buses in Vietnam are generally safe. They are operated by city transport authorities and are a popular choice among locals. The main risks are pickpocketing on crowded buses and approaching fake bus conductors near the terminal — always look for the official bus stop signs. <a href="/airport-scam-vietnam-taxi" class="text-primary underline">See how to avoid taxi and transport scams →</a>',
  },
];

export function AirportBusPillarPage() {
  return (
    <>
      <SEOHelmet path="/bus-from-airport-to-city" />
      <ArticleLayout languageSwitchPath="/vi/xe-buyt-san-bay-ve-trung-tam">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Airport Bus Vietnam · HAN · SGN · Da Nang
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Airport Bus to City: HAN + SGN + Da Nang Guide (2026)
            </h1>
            <p className="text-lg opacity-90">
              Complete guide to airport buses from all 3 major Vietnam airports to city center. Compare routes, fares, and travel times for Hanoi, Saigon, and Da Nang.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* Quick comparison table — above the fold */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">All airports at a glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left px-4 py-2 font-semibold text-ink">Airport</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">Cheapest Bus</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">Fastest Bus</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">Best Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 bg-emerald-50">
                    <td className="px-4 py-2 font-medium text-ink">Hanoi (Noi Bai) — HAN</td>
                    <td className="px-4 py-2 text-ink">Bus 17 · VND 7K</td>
                    <td className="px-4 py-2 text-ink">Bus 86 · VND 50K · 50–75 min</td>
                    <td className="px-4 py-2 text-ink">Bus 86</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Saigon (Tan Son Nhat) — SGN</td>
                    <td className="px-4 py-2 text-ink">Bus 152 · VND 5K</td>
                    <td className="px-4 py-2 text-ink">Bus 109 · VND 15K · 30–45 min</td>
                    <td className="px-4 py-2 text-ink">Bus 109</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Da Nang — DAD</td>
                    <td className="px-4 py-2 text-ink">Bus · ~VND 10K est.</td>
                    <td className="px-4 py-2 text-ink">Bus · est. 20–30 min</td>
                    <td className="px-4 py-2 text-ink">Grab recommended</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-ink-soft text-sm mt-3">
              Times are approximate; add 20–45 min for immigration and baggage claim at international terminals.
              <a href="/noibai-t2-exit-time" className="text-primary underline ml-2">
                Use our exit time calculator →
              </a>
            </p>
          </section>

          {/* Hub: child article links grid */}
          <section className="border-t border-surface-border pt-8">
            <h2 className="text-xl font-bold text-ink mb-4">Detailed guides for each route</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/bus-86-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚌 Bus 86: Hanoi Airport — Full Schedule</p>
                <p className="text-sm text-ink-soft">VND 50,000 · 50–75 min · Old Quarter · 05:00–22:15</p>
              </a>
              <a
                href="/bus-109-saigon-airport"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚌 Bus 109: Saigon Airport (T3) — Schedule</p>
                <p className="text-sm text-ink-soft">VND 15,000 · 30–45 min · Electric bus · 05:30–22:00</p>
              </a>
              <a
                href="/bus-152-saigon-fare"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚌 Bus 152: Saigon Airport — VND 5,000 Fare</p>
                <p className="text-sm text-ink-soft">VND 5,000 · Cheapest in Vietnam · T1/T2</p>
              </a>
              <a
                href="/grab-vs-bus-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚗 Grab vs Bus 86: Full Comparison</p>
                <p className="text-sm text-ink-soft">Cost, time, comfort, and safety — real data for 2026.</p>
              </a>
              <a
                href="/cheapest-way-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">💰 Cheapest Way from Hanoi Airport</p>
                <p className="text-sm text-ink-soft">5 options ranked by cost: VND 7,000 to VND 500,000.</p>
              </a>
              <a
                href="/cheapest-way-saigon-airport-district-1"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">💰 Cheapest Way from Saigon Airport to District 1</p>
                <p className="text-sm text-ink-soft">5 options ranked: VND 5,000 to VND 350,000.</p>
              </a>
              <a
                href="/noibai-airport-first-time-guide"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">✈️ First Time at Noi Bai Airport</p>
                <p className="text-sm text-ink-soft">Step-by-step: immigration, SIM card, ATM, and transport out.</p>
              </a>
              <a
                href="/how-to-get-from-hanoi-airport-to-city"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🗺️ How to Get from Hanoi Airport to City</p>
                <p className="text-sm text-ink-soft">6 options compared: bus, Grab, taxi, and private transfer.</p>
              </a>
              <a
                href="/airport-bus-luggage-fee-vietnam"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🧳 Airport Bus Luggage Fees in Vietnam</p>
                <p className="text-sm text-ink-soft">What you can bring on the bus — carry-on and oversized bags.</p>
              </a>
              <a
                href="/airport-scam-vietnam-taxi"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚨 Airport Taxi Scams in Vietnam</p>
                <p className="text-sm text-ink-soft">How to avoid scams and travel safely at all 3 airports.</p>
              </a>
            </div>
          </section>

          {/* Section 2: Hanoi (Noi Bai) */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Hanoi (Noi Bai Airport — HAN)</h2>
            <p className="text-ink-soft mb-4">
              Noi Bai Airport has 3 public bus routes connecting to central Hanoi. All buses depart from outside T1 (Domestic) and T2 (International) terminals.
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Bus 86</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Most popular</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">AC</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>VND 50,000</strong> · 50–75 min · Old Quarter</p>
                <p className="text-sm text-ink-soft">Runs every 20–30 min, 05:00–22:15. Direct to Old Quarter and Long Biên Station.</p>
                <a href="/bus-86-hanoi-airport" className="text-primary underline text-sm mt-1 inline-block">See full Bus 86 schedule →</a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Bus 17</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Cheapest</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>VND 7,000</strong> · 45–60 min</p>
                <p className="text-sm text-ink-soft">Budget option toward Long Biên area. Less frequent than Bus 86.</p>
                <a href="/cheapest-way-hanoi-airport" className="text-primary underline text-sm mt-1 inline-block">See cheapest options →</a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Bus 90</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Budget + Tay Ho</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>VND 9,000</strong> · 40–55 min</p>
                <p className="text-sm text-ink-soft">Route goes toward Tay Ho (West Lake) area. Runs less frequently.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Saigon (Tan Son Nhat) */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Saigon (Tan Son Nhat Airport — SGN)</h2>
            <p className="text-ink-soft mb-4">
              Tan Son Nhat Airport has 2 main public bus routes. Bus 152 serves T1 (Domestic) and T2 (International); Bus 109 departs from the new T3 terminal (opened 2025).
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Bus 152</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Cheapest in Vietnam · VND 5,000</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>VND 5,000</strong> · 45–60 min · T1 and T2</p>
                <p className="text-sm text-ink-soft">The most affordable airport bus in all of Vietnam. Standard city bus — may be crowded during peak hours.</p>
                <a href="/bus-152-saigon-fare" className="text-primary underline text-sm mt-1 inline-block">See Bus 152 fare details →</a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Bus 109</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Fastest bus · Electric · AC</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>VND 15,000</strong> · 30–45 min · T3 only</p>
                <p className="text-sm text-ink-soft">Electric AC bus, newest and most comfortable option. Departs from T3 Arrivals level.</p>
                <a href="/bus-109-saigon-airport" className="text-primary underline text-sm mt-1 inline-block">See Bus 109 schedule →</a>
              </div>
            </div>
          </section>

          {/* Section 4: Da Nang */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Da Nang Airport (DAD)</h2>
            <p className="text-ink-soft mb-4">
              Da Nang International Airport (DAD) is Vietnam's 3rd busiest airport. It is smaller and easier to navigate than Noi Bai or Tan Son Nhat. Public bus coverage is more limited.
            </p>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-ink">Public Bus</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Limited frequency</span>
              </div>
              <p className="text-sm text-ink-soft"><strong>~VND 10,000</strong> · est. 20–30 min to city center</p>
              <p className="text-sm text-ink-soft">Da Nang airport has basic bus service to the city center. Schedules are less reliable and information is harder to find. Most visitors use Grab (VND 80,000–150,000) or hotel transfers.</p>
            </div>
          </section>

          {/* Section 5: Bus vs Grab comparison */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">When to take the bus vs Grab</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left px-4 py-2 font-semibold text-ink">Factor</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">🚌 Airport Bus</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">🚗 Grab</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Cost</td>
                    <td className="px-4 py-2 text-ink">VND 5,000–50,000</td>
                    <td className="px-4 py-2 text-ink">VND 80,000–300,000</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Travel time</td>
                    <td className="px-4 py-2 text-ink">30–80 min</td>
                    <td className="px-4 py-2 text-ink">20–50 min</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Operating hours</td>
                    <td className="px-4 py-2 text-ink">05:00–22:15 (varies)</td>
                    <td className="px-4 py-2 text-ink">24/7</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Best for</td>
                    <td className="px-4 py-2 text-ink">Budget, daytime, flexible time</td>
                    <td className="px-4 py-2 text-ink">Speed, comfort, late night, luggage</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a href="/grab-vs-bus-hanoi-airport" className="text-primary underline text-sm mt-3 inline-block">
              See full Grab vs Bus comparison →
            </a>
          </section>

          {/* Section 6: Practical tips */}
          <section>
            <h2 className="text-xl font-bold text-ink mb-4">Practical tips for taking the airport bus</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-surface-border rounded-xl p-4">
                <h3 className="font-semibold text-ink mb-2">💴 Bring exact change</h3>
                <p className="text-sm text-ink-soft">Cash fares only. Drivers may not give change on buses. VND coins and small bills are best.</p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-4">
                <h3 className="font-semibold text-ink mb-2">🚌 Look for official stops</h3>
                <p className="text-sm text-ink-soft">Official bus stops are marked with blue signs. Ignore unsolicited "bus agents" near the terminal exit.</p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-4">
                <h3 className="font-semibold text-ink mb-2">⏰ Peak hours</h3>
                <p className="text-sm text-ink-soft">Bus 86 and others run 20–45 min longer during rush hour (07:00–09:00 and 17:00–19:00). Plan accordingly.</p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-4">
                <h3 className="font-semibold text-ink mb-2">🧳 Luggage</h3>
                <p className="text-sm text-ink-soft">Standard carry-on is free. Large bags may incur a fee. <a href="/airport-bus-luggage-fee-vietnam" className="text-primary underline">See full luggage policy →</a></p>
              </div>
            </div>
          </section>

          {/* Calculator CTA */}
          <section className="bg-white border-2 border-primary rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-ink mb-2">Calculate your exact exit time from the airport</h2>
            <p className="text-ink-soft mb-4">
              Know when to leave the terminal so you never miss your bus. Enter your flight time, terminal, and baggage.
            </p>
            <a
              href="/"
              className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Open SanBayGo — Exit Time Calculator
            </a>
          </section>

          {/* Author note */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-ink mb-2">About this guide</h2>
            <p className="text-ink-soft text-sm">
              This pillar page is compiled from official bus schedules, real traveler data, and current on-the-ground conditions at Noi Bai Airport (HAN), Tan Son Nhat Airport (SGN), and Da Nang Airport (DAD). Bus fares are set by the Hanoi and Ho Chi Minh City Public Transport Authorities and do not change with traffic. Grab prices are estimated ranges — always confirm the fare in the app before booking. Last updated: 2026.
            </p>
          </section>

          <FAQSection items={FAQ_ITEMS} />
        </div>

        <FAQSchema items={FAQ_ITEMS} />
      </ArticleLayout>
    </>
  );
}
