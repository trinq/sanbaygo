import { ArticleLayout } from '../components/Layout/ArticleLayout';
import { SEOHelmet } from '../components/SEO';

const SCAM_TIPS = [
  {
    title: 'Use Grab or BeBike Apps',
    description: 'Fixed prices, no haggling. Download before you arrive.',
    icon: '📱',
  },
  {
    title: 'Ignore "Special Rate" Offers',
    description: 'Taxi drivers at exits often quote 3–5× the real fare. Walk away.',
    icon: '🚫',
  },
  {
    title: 'Take the Public Bus',
    description: 'Bus 86 costs VND 50,000. Fixed government price — no scam possible.',
    icon: '🚌',
  },
  {
    title: 'If Taking a Taxi — Insist on the Meter',
    description: 'Say "đồng hồ" (meter) firmly. If they refuse, take another taxi.',
    icon: '🚕',
  },
  {
    title: 'Beware of Hotel "Call a Car" Services',
    description: 'Some hotel staff arrange "private cars" at 5–10× the Grab price. Always book your own ride.',
    icon: '🏨',
  },
  {
    title: 'Airport Staff Are Not Endorsing Taxis',
    description: 'People in uniform who point you to a taxi queue may be on commission. Verify prices yourself.',
    icon: '👮',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Are taxi scams common at Vietnamese airports?',
    a: 'Yes. Overcharging by taxi drivers is one of the most common complaints from tourists in Vietnam. Fares can be 3–10× the real price if you do not know the routes or agree to a fixed price before starting.',
  },
  {
    q: 'Is Grab safe to use at Vietnamese airports?',
    a: 'Yes. Grab uses fixed pricing — you see the price before you confirm. There is no meter to manipulate. Grab is widely available at both Noi Bai (HAN) and Tan Son Nhat (SGN) airports.',
  },
  {
    q: 'What is the real cost of a taxi from Noi Bai Airport to central Hanoi?',
    a: 'A metered taxi from Noi Bai to central Hanoi typically costs VND 250,000–400,000 depending on traffic. Without a meter, drivers may ask for VND 500,000–1,000,000.',
  },
  {
    q: 'Is the airport bus safe from scams?',
    a: 'Yes. Bus 86 (Hanoi) costs exactly VND 50,000 — the price is printed on the ticket. Bus 109 (Saigon, T3) costs VND 15,000. Bus 152 (Saigon, T1/T2) costs VND 5,000. No negotiation needed.',
  },
  {
    q: 'What should I do if I think I have been scammed?',
    a: 'If you agreed to a fixed price and feel you were overcharged, calmly refuse to pay more and walk away. In serious cases, you can report to the airport authority. For minor overcharges, the best lesson is to use Grab on your next trip.',
  },
];

export function ScamPage() {
  return (
    <>
      <SEOHelmet path="/airport-scam-vietnam-taxi" />
      <ArticleLayout languageSwitchPath="/vi/xe-lo-gio-sanh-bay-viet-nam">
        {/* Hero */}
        <header className="bg-red-600 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Airport Safety
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Airport Taxi Scams in Vietnam — How to Avoid Them
            </h1>
            <p className="text-lg opacity-90">
              Taxi overcharging is the #1 tourist complaint at Vietnamese airports.
              Here is everything you need to know before you land.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Warning Banner */}
          <section className="bg-red-50 border border-red-300 rounded-xl p-6 mb-8">
            <p className="text-red-800 font-semibold text-lg">
              ⚠️ Scam taxis are common at Noi Bai (HAN) and Tan Son Nhat (SGN) airports.
              Read this guide before you arrive.
            </p>
          </section>

          {/* How Scams Work */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">How the Scam Works</h2>
            <p className="text-ink-soft mb-4 leading-relaxed">
              When you exit the arrivals hall, taxi drivers (or their agents) approach
              tourists and offer a "special rate" to the city. These rates are typically
              3–10× the real cost. Even metered taxis are not safe — some drivers take
              unnecessary detours or start the meter late.
            </p>
            <p className="text-ink-soft leading-relaxed">
              The scam works because:
            </p>
            <ul className="list-disc list-inside space-y-2 text-ink-soft mt-3">
              <li>Tourists do not know local fares</li>
              <li>Language barrier prevents checking prices</li>
              <li>Exhausted travelers want the quickest option</li>
              <li>Drivers may be persistent or even aggressive</li>
            </ul>
          </section>

          {/* Safety Tips Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">How to Protect Yourself</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCAM_TIPS.map((tip, i) => (
                <div key={i} className="bg-white border border-surface-border rounded-xl p-5">
                  <div className="text-3xl mb-2">{tip.icon}</div>
                  <h3 className="font-semibold text-ink mb-1">{tip.title}</h3>
                  <p className="text-sm text-ink-soft">{tip.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real Fares */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-4">Real Fares — Know Before You Go</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="text-left py-2 text-ink-soft">Route</th>
                  <th className="text-right py-2 text-ink-soft">Real Price</th>
                  <th className="text-right py-2 text-ink-soft">Scam Price</th>
                </tr>
              </thead>
              <tbody className="text-ink">
                <tr className="border-b border-blue-100">
                  <td className="py-2">HAN → Hanoi Old Quarter (taxi)</td>
                  <td className="py-2 text-right font-medium">VND 250k–400k</td>
                  <td className="py-2 text-right text-red-600">VND 500k–1M</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2">HAN → Hanoi Old Quarter (Bus 86)</td>
                  <td className="py-2 text-right font-medium">VND 50,000</td>
                  <td className="py-2 text-right text-emerald-600">No scam risk</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2">SGN T3 → Saigon Center (taxi)</td>
                  <td className="py-2 text-right font-medium">VND 100k–180k</td>
                  <td className="py-2 text-right text-red-600">VND 300k–500k</td>
                </tr>
                <tr>
                  <td className="py-2">SGN T3 → Saigon Center (Bus 109)</td>
                  <td className="py-2 text-right font-medium">VND 15,000</td>
                  <td className="py-2 text-right text-emerald-600">No scam risk</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Grab Callout */}
          <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-3">Use Grab — It is Cheaper and Safer</h2>
            <p className="text-ink-soft mb-4">
              Grab (available at both HAN and SGN airports) shows you the exact price
              before you confirm. No meter, no detour, no negotiation.
            </p>
            <a
              href="https://grab.com/vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Open Grab →
            </a>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
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

          {/* Compare CTA */}
          <section className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-ink mb-2">
              Compare Bus vs Grab Before You Land
            </h2>
            <p className="text-ink-soft mb-4">
              Use our calculator to find the fastest or cheapest option for your flight.
            </p>
            <a
              href="/"
              className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try the Calculator →
            </a>
          </section>
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ_ITEMS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            }),
          }}
        />
      </ArticleLayout>
    </>
  );
}
