import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'How much is the bus from Hanoi Airport to the city?',
    a: 'There are three airport buses from Noi Bai to central Hanoi. Bus 17 costs VND 7,000 (cheapest, 45–60 min), Bus 90 costs VND 9,000 (40–55 min, toward Tay Ho), and Bus 86 costs VND 50,000 (50–75 min, direct to Old Quarter). All buses depart from outside T1 and T2 terminals. <a href="/bus-86-hanoi-airport" className="text-primary underline">See full Bus 86 schedule →</a>',
  },
  {
    q: 'What is the fastest way from Noi Bai Airport to downtown Hanoi?',
    a: 'Grab is the fastest option at 35–50 minutes, costing VND 200,000–300,000. A traditional taxi takes 35–45 minutes at VND 300,000–500,000. Private transfer is fastest overall (30–40 min, VND 400,000–800,000). Among buses, Bus 90 is quickest at 40–55 minutes for VND 9,000.',
  },
  {
    q: 'Is there a direct bus from Noi Bai Airport?',
    a: 'Yes. Bus 86 is the most popular direct bus from Noi Bai Airport to the Old Quarter. It runs every 20–30 minutes from 05:00 to 22:15 and costs VND 50,000. Bus 17 (VND 7,000) and Bus 90 (VND 9,000) also depart from outside the terminals but take different routes. <a href="/bus-86-hanoi-airport" className="text-primary underline">Bus 86 full schedule →</a>',
  },
  {
    q: 'How long does it take from Hanoi Airport to Old Quarter?',
    a: 'By Grab: 30–45 minutes (VND 200,000–300,000). By Bus 86: 50–75 minutes (VND 50,000) — 50 min off-peak, up to 75 min during rush hour. By taxi: 35–45 minutes (VND 300,000–500,000). Add 20–45 minutes for immigration and baggage claim before leaving the terminal. <a href="/noibai-t2-exit-time" className="text-primary underline">Use our exit time calculator →</a>',
  },
  {
    q: 'Should I take a taxi or Grab from Hanoi Airport?',
    a: 'Always choose Grab over a traditional taxi at Noi Bai Airport. Grab (VND 200,000–300,000) is safer, cheaper, and fully trackable — the fare is shown upfront with no meter manipulation possible. Traditional metered taxis (VND 300,000–500,000) carry real scam risk for first-time visitors. <a href="/grab-vs-bus-hanoi-airport" className="text-primary underline">See full Grab vs Bus 86 comparison →</a>',
  },
  {
    q: 'Are there trains from Noi Bai Airport?',
    a: 'No. There are no train stations at or directly connected to Noi Bai Airport. The nearest train station is Hanoi Railway Station (Ga Hà Nội) on Le Dai Hanh Street, accessible by Bus 86, Grab, or taxi. If you need to connect to a train from the airport, take Bus 86 or Grab to the Old Quarter and transfer from there.',
  },
  {
    q: 'What is the best time to arrive for the bus?',
    a: 'Bus 86 runs from 05:00 to 22:15 daily. If you are landing before 21:30, you can reliably catch Bus 86. If you land between 21:30 and 22:15, walk quickly — the last bus departs at 22:15 and does not wait. For arrivals after 22:15, Grab is your only option (VND 300,000–450,000 with night surcharge). <a href="/hanoi-airport-late-night-transfer" className="text-primary underline">Late night transfer guide →</a>',
  },
];

const TRANSPORT_OPTIONS = [
  {
    name: 'Bus 17',
    price: 'VND 7,000',
    time: '45–60 min',
    highlight: 'Ultra-budget',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
    icon: '🚌',
    description: 'The cheapest airport bus in Hanoi. Runs from Noi Bai to Long Biên area. Less frequent than Bus 86.',
    bestFor: 'Ultra-budget travelers whose destination aligns with the Bus 17 route',
    link: '/cheapest-way-hanoi-airport',
  },
  {
    name: 'Bus 90',
    price: 'VND 9,000',
    time: '40–55 min',
    highlight: 'Budget + Tay Ho',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
    icon: '🚌',
    description: 'Second cheapest option. Route goes toward the Tay Ho (West Lake) area. Runs less frequently than Bus 86.',
    bestFor: 'Travelers heading to Tay Ho, or budget-conscious visitors who can check the schedule',
    link: '/cheapest-way-hanoi-airport',
  },
  {
    name: 'Bus 86',
    price: 'VND 50,000',
    time: '50–75 min',
    highlight: 'Best value',
    color: 'bg-emerald-50 border-emerald-200',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    icon: '🚌',
    description: 'The most popular airport bus. Direct to Old Quarter, every 20–30 minutes, 05:00–22:15. Fixed fare, air-conditioned.',
    bestFor: 'Most travelers — best balance of cost, reliability, and route coverage',
    link: '/bus-86-hanoi-airport',
  },
  {
    name: 'Grab',
    price: 'VND 200,000–300,000',
    time: '35–50 min',
    highlight: 'Fastest + safest',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-800',
    icon: '🚗',
    description: 'App-based ride-hailing. Fixed price shown upfront, GPS-tracked, no meter fraud possible. Works 24/7.',
    bestFor: 'Speed, comfort, arrivals after 22:15, or travelers with large luggage',
    link: '/grab-vs-bus-hanoi-airport',
  },
  {
    name: 'Taxi',
    price: 'VND 300,000–500,000',
    time: '35–45 min',
    highlight: 'Groups + luggage',
    color: 'bg-amber-50 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-800',
    icon: '🚕',
    description: 'Traditional metered taxi. Use Mai Linh (024 38 61 61 61) or Vinasun. Avoid unsolicited drivers in the terminal.',
    bestFor: 'Groups of 4+ with heavy luggage who prefer not to use an app',
    link: '/airport-scam-vietnam-taxi',
  },
  {
    name: 'Private Transfer',
    price: 'VND 400,000–800,000',
    time: '30–40 min',
    highlight: 'Pre-arranged + VIP',
    color: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-800',
    icon: '🚙',
    description: 'Booked in advance through your hotel or a service like Klook. Driver meets you at arrivals with a nameboard. No negotiation, no waiting.',
    bestFor: 'Travelers who want zero hassle, VIP service, or groups with lots of luggage',
    link: '/cheapest-way-hanoi-airport',
  },
];

export function HowToGetHanPage() {
  return (
    <>
      <SEOHelmet path="/how-to-get-from-hanoi-airport-to-city" />
      <ArticleLayout languageSwitchPath="/vi/cach-di-tu-sanh-bay-noi-bai">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Sân bay Nội Bài · Hà Nội · HAN
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              How to Get from Hanoi Airport to City Center (2026)
            </h1>
            <p className="text-lg opacity-90">
              6 transport options compared: bus, Grab, taxi, and private transfer. Costs from VND 7,000 to VND 800,000.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* Quick options table — above the fold */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">All options at a glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left px-4 py-2 font-semibold text-ink">Option</th>
                    <th className="text-right px-4 py-2 font-semibold text-ink">Cost</th>
                    <th className="text-right px-4 py-2 font-semibold text-ink">Time</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 bg-emerald-50">
                    <td className="px-4 py-2 font-medium text-ink">🚌 Bus 86</td>
                    <td className="text-right px-4 py-2 text-ink">VND 50,000</td>
                    <td className="text-right px-4 py-2 text-ink">50–75 min</td>
                    <td className="px-4 py-2 text-ink-soft">Best value — Old Quarter</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚌 Bus 17</td>
                    <td className="text-right px-4 py-2 text-ink">VND 7,000</td>
                    <td className="text-right px-4 py-2 text-ink">45–60 min</td>
                    <td className="px-4 py-2 text-ink-soft">Ultra-budget</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚌 Bus 90</td>
                    <td className="text-right px-4 py-2 text-ink">VND 9,000</td>
                    <td className="text-right px-4 py-2 text-ink">40–55 min</td>
                    <td className="px-4 py-2 text-ink-soft">Budget — Tay Ho area</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚗 Grab</td>
                    <td className="text-right px-4 py-2 text-ink">VND 200,000–300,000</td>
                    <td className="text-right px-4 py-2 text-ink">35–50 min</td>
                    <td className="px-4 py-2 text-ink-soft">Speed + comfort</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚕 Taxi</td>
                    <td className="text-right px-4 py-2 text-ink">VND 300,000–500,000</td>
                    <td className="text-right px-4 py-2 text-ink">35–45 min</td>
                    <td className="px-4 py-2 text-ink-soft">Groups + luggage</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚙 Private Transfer</td>
                    <td className="text-right px-4 py-2 text-ink">VND 400,000–800,000</td>
                    <td className="text-right px-4 py-2 text-ink">30–40 min</td>
                    <td className="px-4 py-2 text-ink-soft">Pre-arranged + VIP</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-ink-soft text-sm mt-3">
              Times include average road travel; add 20–45 min for immigration and baggage claim.
              <a href="/noibai-t2-exit-time" className="text-primary underline ml-2">
                Use our exit time calculator →
              </a>
            </p>
          </section>

          {/* Verdict callout */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-ink mb-2">Our recommendation</h2>
            <p className="text-ink">
              <strong>Bus 86 (VND 50,000)</strong> is the best choice for most travelers — affordable, reliable,
              and goes directly to the Old Quarter. <strong>Grab (VND 200,000–300,000)</strong> is best if you
              value speed or arrive after 22:15. For the absolute cheapest option, <strong>Bus 17 (VND 7,000)</strong>{' '}
              if your destination is on its route.
            </p>
          </div>

          {/* Transport options detail cards */}
          {TRANSPORT_OPTIONS.map((opt) => (
            <section
              key={opt.name}
              className={`${opt.color} border rounded-xl p-6`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-ink">{opt.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${opt.badgeColor}`}>
                      {opt.highlight}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-ink">{opt.price}</p>
                  <p className="text-sm text-ink-soft">{opt.time}</p>
                </div>
              </div>
              <p className="text-ink-soft mb-3">{opt.description}</p>
              <p className="text-sm text-ink">
                <strong>Best for:</strong> {opt.bestFor}
              </p>
              <a
                href={opt.link}
                className="text-primary underline text-sm mt-2 inline-block"
              >
                Read full guide →
              </a>
            </section>
          ))}

          {/* Hub: child article links */}
          <section className="border-t border-surface-border pt-8">
            <h2 className="text-xl font-bold text-ink mb-4">Detailed guides for each option</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/bus-86-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚌 Bus 86: Schedule &amp; How to Catch It</p>
                <p className="text-sm text-ink-soft">Full schedule, VND 50,000 fare, terminal stops, and timing tips.</p>
              </a>
              <a
                href="/grab-vs-bus-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚗 Grab vs Bus 86: Full Comparison</p>
                <p className="text-sm text-ink-soft">Cost, time, comfort, and safety comparison with real data.</p>
              </a>
              <a
                href="/cheapest-way-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">💰 Cheapest Way from Hanoi Airport</p>
                <p className="text-sm text-ink-soft">5 options ranked by cost: from VND 7,000 to VND 500,000.</p>
              </a>
              <a
                href="/hanoi-airport-to-hoan-kiem-lake"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🏛️ Hanoi Airport to Hoan Kiem Lake</p>
                <p className="text-sm text-ink-soft">4 routes to the Old Quarter, with exact times and costs.</p>
              </a>
              <a
                href="/noibai-airport-first-time-guide"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">✈️ First Time at Noi Bai Airport</p>
                <p className="text-sm text-ink-soft">Step-by-step: immigration, SIM card, ATM, and transport out.</p>
              </a>
              <a
                href="/hanoi-airport-late-night-transfer"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🌙 Late Night Arrival at Hanoi Airport</p>
                <p className="text-sm text-ink-soft">Options after Bus 86 stops (22:15), Grab night surcharge, taxi tips.</p>
              </a>
            </div>
          </section>

          {/* Additional resources */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-ink mb-3">More useful resources</h2>
            <ul className="space-y-2">
              <li>
                <a href="/noibai-t2-exit-time" className="text-primary underline">
                  Noi Bai T2 Exit Time Calculator — How long to get out of the terminal
                </a>
              </li>
              <li>
                <a href="/airport-scam-vietnam-taxi" className="text-primary underline">
                  Airport Taxi Scams in Vietnam — How to avoid them
                </a>
              </li>
              <li>
                <a href="/is-grab-safe-hanoi-airport" className="text-primary underline">
                  Is Grab Safe at Hanoi Airport? Reddit Verdict (2026)
                </a>
              </li>
              <li>
                <a href="/airport-bus-luggage-fee-vietnam" className="text-primary underline">
                  Airport Bus Luggage Fees in Vietnam — What you can bring on the bus
                </a>
              </li>
            </ul>
          </section>

          {/* Calculator CTA */}
          <section className="bg-white border-2 border-primary rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-ink mb-2">Calculate your exact exit time from Noi Bai</h2>
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
              This hub page is compiled from real traveler data, official bus schedules, and current on-the-ground
              conditions at Noi Bai Airport (HAN). Bus fares are fixed by the Hanoi Public Transport Authority and
              do not change with traffic. Grab prices are estimated ranges — confirm the fare in the app before
              booking. Last updated: 2026.
            </p>
          </section>

          <FAQSection items={FAQ_ITEMS} />
        </div>

        <FAQSchema items={FAQ_ITEMS} />
      </ArticleLayout>
    </>
  );
}
