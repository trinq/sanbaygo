import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { SEOHelmet } from '../../components/SEO';
import { ExitTimeCalculator } from '../../components/ExitTimeCalculator';

const FAQ_ITEMS = [
  {
    q: 'How long does it take to exit Noi Bai T2 international?',
    a: 'Exit time varies by baggage and flight type. With carry-on luggage: 45–75 minutes (international flights). With checked baggage: 60–90 minutes. These estimates include passport control, baggage claim, and walking to the bus stop.',
  },
  {
    q: 'What terminal is T2 at Noi Bai Airport?',
    a: 'T2 (Terminal 2) is the international terminal at Noi Bai Airport (HAN). It handles all international flights, both arrivals and departures. Domestic flights use T1 (Terminal 1).',
  },
  {
    q: 'Do I need to go through immigration at T2?',
    a: 'Yes. All passengers arriving on international flights at T2 must pass through passport control (immigration). This typically takes 20–40 minutes during peak hours. Domestic connecting passengers from T2 do not go through immigration.',
  },
  {
    q: 'How long does international immigration take at Noi Bai?',
    a: 'Passport control at Noi Bai T2 typically takes 20–40 minutes during peak hours (7–9 AM and 5–7 PM). During off-peak times, it may be as quick as 15–25 minutes. E-passport gates (available for citizens of many countries) are usually faster.',
  },
  {
    q: 'Where is the bus stop after exiting T2?',
    a: 'Bus 86 stops at T2 Gate A1, on the arrivals floor (floor 1), opposite pillar 14. The stop is well-signposted in English and Vietnamese. Look for the blue public bus sign.',
  },
  {
    q: 'Can I take a bus immediately after landing at T2?',
    a: 'Yes, if you have collectible carry-on only and move quickly. Most passengers can reach the Bus 86 stop within 45–60 minutes of landing. Check our calculator above to estimate your specific exit time based on your flight details.',
  },
  {
    q: 'Is there a SIM card desk before the exit at T2?',
    a: 'Yes. Several telecom providers (Viettel, Vinaphone, Mobifone) have booths in the arrivals hall at T2, after passport control but before you exit to the bus stop. Prices are displayed. SIM cards are also sold at convenience stores near the bus stop.',
  },
  {
    q: 'How early should I arrive at T2 international for a domestic flight connection?',
    a: 'If you are catching a domestic connection at T1 after an international arrival at T2, add at least 2.5–3 hours to your estimated exit time. You will need to: exit T2 (45–90 min), walk or take the free shuttle between terminals (15 min), re-clear security at T1 (30 min), and reach your gate (15 min).',
  },
];

export function ExitTimePage() {
  return (
    <>
      <SEOHelmet path="/noibai-t2-exit-time" />
      <ArticleLayout languageSwitchPath="/vi/thoi-gian-ra-cuong-t2-noi-bai">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Noi Bai Airport Guide
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Noi Bai T2 International Exit Time: How Long to Get Out (2026)
            </h1>
            <p className="text-lg opacity-90">
              Real exit time estimates based on your terminal, baggage, and flight type.
              Use the calculator to plan your onward journey.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Calculator above the fold */}
          <section className="-mt-8 relative z-10 mb-10">
            <ExitTimeCalculator language="en" />
          </section>

          {/* Why this matters */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink mb-4">
              Why Exit Time Matters
            </h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              Noi Bai Airport (HAN) is 35 km from central Hanoi. If you misjudge how long
              it takes to exit T2, you might miss the last bus or arrive at your destination
              much later than expected.
            </p>
            <p className="text-ink-soft leading-relaxed">
              Bus 86 departs every 15–20 minutes from T2 Gate A1 (opposite pillar 14).
              The last departure is at 22:15. If you land at 21:00 with checked baggage
              and a long immigration queue, you may not make it.
            </p>
          </section>

          {/* Time breakdown infographic */}
          <section className="bg-slate-50 border border-surface-border rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-ink mb-4">
              What Adds Up to Your Exit Time
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <p className="font-medium text-ink">Passport control (international flights)</p>
                  <p className="text-sm text-ink-soft">
                    20–40 min peak / 15–25 min off-peak. Use e-passport gates if eligible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <p className="font-medium text-ink">Baggage claim</p>
                  <p className="text-sm text-ink-soft">
                    0–5 min (carry-on only) · 10–25 min (checked baggage)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <p className="font-medium text-ink">Walk to Bus 86 stop (T2 Gate A1)</p>
                  <p className="text-sm text-ink-soft">8–12 min from the exit gate</p>
                </div>
              </div>
            </div>
          </section>

          {/* T1 vs T2 comparison */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink mb-4">
              T1 Domestic vs T2 International
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-surface-border">
                    <th className="text-left py-3 px-3 text-ink-soft font-medium">Step</th>
                    <th className="text-right py-3 px-3 text-ink-soft font-medium">T1 Domestic</th>
                    <th className="text-right py-3 px-3 text-ink-soft font-medium">T2 International</th>
                  </tr>
                </thead>
                <tbody className="text-ink">
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-3">Exit gate</td>
                    <td className="py-3 px-3 text-right">5–10 min</td>
                    <td className="py-3 px-3 text-right">20–40 min (immigration)</td>
                  </tr>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-3">Baggage (carry-on)</td>
                    <td className="py-3 px-3 text-right">0–5 min</td>
                    <td className="py-3 px-3 text-right">0–5 min</td>
                  </tr>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-3">Baggage (checked)</td>
                    <td className="py-3 px-3 text-right">10–20 min</td>
                    <td className="py-3 px-3 text-right">10–25 min</td>
                  </tr>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-3">Walk to bus stop</td>
                    <td className="py-3 px-3 text-right">8–12 min</td>
                    <td className="py-3 px-3 text-right">8–12 min</td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="py-3 px-3">Total (carry-on)</td>
                    <td className="py-3 px-3 text-right text-emerald-700">15–25 min</td>
                    <td className="py-3 px-3 text-right text-emerald-700">45–75 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Bus 86 connection */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-ink mb-3">
              After Exit — Take Bus 86
            </h2>
            <p className="text-ink-soft mb-3">
              Bus 86 connects T2 directly to the Hanoi Old Quarter, departing every 15–20 minutes.
              Ticket: <strong>VND 50,000</strong>. Last bus: <strong>22:15</strong>.
            </p>
            <a
              href="/bus-86-hanoi-airport"
              className="inline-block text-emerald-700 font-medium hover:underline"
            >
              Full Bus 86 schedule and stops →
            </a>
          </section>

          {/* Grab fallback */}
          <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-ink mb-3">
              Grab — Your Backup Option
            </h2>
            <p className="text-ink-soft mb-3">
              Grab is available 24/7 at T2. Estimated fare to central Hanoi:{' '}
              <strong>VND 250,000–350,000</strong>. Fixed price shown in app before you confirm.
            </p>
            <a
              href="https://grab.com/vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-orange-700 font-medium hover:underline"
            >
              Open Grab app →
            </a>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink mb-4">
              Frequently Asked Questions
            </h2>
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

          {/* Internal links */}
          <section className="border-t border-surface-border pt-8 mt-8">
            <h2 className="text-lg font-semibold text-ink mb-3">Related Articles</h2>
            <ul className="space-y-2">
              <li>
                <a href="/bus-86-hanoi-airport" className="text-primary underline hover:text-primary/80">
                  Bus 86 — Hanoi Airport to Old Quarter
                </a>
              </li>
              <li>
                <a href="/airport-scam-vietnam-taxi" className="text-primary underline hover:text-primary/80">
                  Airport Taxi Scams in Vietnam: How to Avoid Them
                </a>
              </li>
            </ul>
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
