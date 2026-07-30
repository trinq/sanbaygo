import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { SEOHelmet } from '../../components/SEO';

const FAQ_ITEMS = [
  {
    q: 'Is Grab safe at Hanoi Airport?',
    a: 'Yes. Grab is generally safe at Noi Bai Airport (HAN). The app uses fixed pricing — you see the fare before you confirm. Your trip is tracked, payments are digital, and there is no meter to manipulate. Thousands of travelers use Grab daily at HAN without incident.',
  },
  {
    q: 'How much is Grab from Noi Bai Airport to the Old Quarter?',
    a: 'A Grab ride from Noi Bai Airport to the Hanoi Old Quarter typically costs VND 250,000–350,000 depending on traffic, time of day, and vehicle type. GrabX (shared) can be cheaper. The exact price is shown in the app before you confirm.',
  },
  {
    q: 'Is there Grab at Noi Bai Airport?',
    a: 'Yes. Grab operates at Noi Bai Airport 24/7. You can book a ride inside the terminal as soon as you clear arrivals. Pickup zones are clearly marked in the parking area — follow signs to P1 or P2.',
  },
  {
    q: 'Should I use Grab or a taxi at Hanoi Airport?',
    a: 'Grab is the safer choice. With a taxi, you risk meter manipulation, unnecessary detours, or a driver refusing to use the meter. Grab shows the price upfront, so there are no surprises. If you must take a taxi, insist on the meter and say "đồng hồ" firmly.',
  },
  {
    q: 'Can I pay cash for Grab at Noi Bai Airport?',
    a: 'Yes. While most Grab users pay via in-app credit or card, cash payment is available. Select "Cash" as your payment method in the app before booking. Note that some drivers prefer digital payment — if cash is important to you, confirm with the driver before confirming the ride.',
  },
];

const REDDIT_PERSPECTIVES = [
  {
    quote: 'Grab all the way. I have used it dozens of times at Noi Bai. Fixed price, no drama.',
    source: 'r/Solotravel, 2024',
  },
  {
    quote: 'I ignored the Grab drivers and got in a taxi. Paid 3× what Grab would have cost. Never again.',
    source: 'r/VietNam, 2024',
  },
  {
    quote: 'Surge pricing at the airport is real. Book 10 minutes before you exit — prices spike right after international arrivals.',
    source: 'r/VietNam, 2025',
  },
  {
    quote: 'Night arrivals are fine with Grab. The airport pickup area is well-lit and busy. Just follow the signs to P2.',
    source: 'r/SoutheastAsiaTravel, 2025',
  },
  {
    quote: 'Locals use Grab for a reason — it is trackable and you get proof of trip in the app. Much safer than street taxis.',
    source: 'r/VietNam, 2024',
  },
];

export function GrabSafePage() {
  return (
    <>
      <SEOHelmet path="/is-grab-safe-hanoi-airport" />
      <ArticleLayout>
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Hanoi Airport Guide
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Is Grab Safe at Hanoi Airport? Reddit Verdict (2026)
            </h1>
            <p className="text-lg opacity-90">
              Yes — Grab is generally safe at Noi Bai Airport. Here is what real Reddit users say,
              and what experienced travelers do.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Direct Answer */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <p className="text-emerald-800 font-semibold text-lg leading-relaxed">
              ✅ Yes, Grab is safe at Hanoi Airport (Noi Bai / HAN). The app shows your fare
              before you confirm — no meter, no negotiation, no overcharging. Your trip is tracked
              and you have a digital receipt. That is why locals prefer it.
            </p>
          </section>

          {/* Reddit Voices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">What Reddit Travelers Actually Say</h2>
            <div className="space-y-4">
              {REDDIT_PERSPECTIVES.map((item, i) => (
                <blockquote
                  key={i}
                  className="border-l-4 border-primary/30 pl-5 py-1 bg-white rounded-r-lg shadow-sm"
                >
                  <p className="text-ink-soft italic mb-2">"{item.quote}"</p>
                  <footer className="text-xs text-ink-soft/70">— {item.source}</footer>
                </blockquote>
              ))}
            </div>
          </section>

          {/* Why Locals Use Grab */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Why Vietnamese Travelers Use Grab</h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              Locals in Vietnam overwhelmingly prefer Grab over street taxis — and it is not
              just about price. Here is the reasoning:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block w-5 h-5 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium shrink-0">1</span>
                <div>
                  <strong className="text-ink">Fixed price, shown upfront.</strong>
                  <span className="text-ink-soft"> You see the exact cost before confirming. Traffic delays do not change the price.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block w-5 h-5 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium shrink-0">2</span>
                <div>
                  <strong className="text-ink">No negotiation.</strong>
                  <span className="text-ink-soft"> Street taxi drivers often quote 3–5× the real fare. Grab eliminates this entirely.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block w-5 h-5 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium shrink-0">3</span>
                <div>
                  <strong className="text-ink">Full trip record.</strong>
                  <span className="text-ink-soft"> The app saves your pickup point, destination, driver details, and payment. You have proof if anything goes wrong.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block w-5 h-5 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium shrink-0">4</span>
                <div>
                  <strong className="text-ink">Available 24/7.</strong>
                  <span className="text-ink-soft"> Grab runs around the clock at Noi Bai. No searching for a taxi at 3 AM.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* How to Use Grab at Noi Bai */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">How to Use Grab at Noi Bai Airport</h2>
            <div className="space-y-4">
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <span className="inline-block bg-primary text-white text-sm font-bold px-2.5 py-1 rounded mb-2">Step 1</span>
                <h3 className="font-semibold text-ink mb-1">Get connected</h3>
                <p className="text-sm text-ink-soft">
                  Use the free airport WiFi or buy a Vietnamese SIM card at arrivals (VND 50,000–100,000 for a week of data). The Grab app requires an internet connection.
                </p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <span className="inline-block bg-primary text-white text-sm font-bold px-2.5 py-1 rounded mb-2">Step 2</span>
                <h3 className="font-semibold text-ink mb-1">Open the Grab app</h3>
                <p className="text-sm text-ink-soft">
                  Set your destination to your hotel or wherever you are going. GrabX (shared rides) are the cheapest option and are usually available.
                </p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <span className="inline-block bg-primary text-white text-sm font-bold px-2.5 py-1 rounded mb-2">Step 3</span>
                <h3 className="font-semibold text-ink mb-1">Check the price</h3>
                <p className="text-sm text-ink-soft">
                  Grab shows the fare before you confirm. If the price looks too high, wait 2–3 minutes — prices often drop as the airport rush clears.
                </p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <span className="inline-block bg-primary text-white text-sm font-bold px-2.5 py-1 rounded mb-2">Step 4</span>
                <h3 className="font-semibold text-ink mb-1">Find your pickup point</h3>
                <p className="text-sm text-ink-soft">
                  Follow signs to <strong>P1</strong> (Level 1) or <strong>P2</strong> (Level 2) in the parking structure. Your driver will state their name and car plate — confirm before getting in.
                </p>
              </div>
            </div>
          </section>

          {/* Safety Tips */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-4">Safety Tips for Grab at Noi Bai</h2>
            <ul className="space-y-3 text-ink-soft">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span><strong>Confirm the plate number</strong> before getting in — match it to what the app shows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span><strong>Share your trip</strong> with a friend or family member via the Grab app's safety feature.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span><strong>Ignore anyone approaching you</strong> outside the terminal offering rides. Use the app only.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span><strong>Book after deplaning, not before.</strong> Wait until you have cleared immigration and have your bags.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span><strong>Know your destination in Vietnamese</strong> (or show the address on your phone) in case the driver needs clarification.</span>
              </li>
            </ul>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/bus-86-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">🚌 Bus 86</p>
                <p className="font-semibold text-ink">Bus 86 Hanoi Airport — Schedule, VND 50,000 Fare</p>
                <p className="text-sm text-ink-soft mt-1">The direct public bus from Noi Bai to the Old Quarter.</p>
              </a>
              <a
                href="/airport-scam-vietnam-taxi"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">⚠️ Scam Guide</p>
                <p className="font-semibold text-ink">Airport Taxi Scams in Vietnam — How to Avoid</p>
                <p className="text-sm text-ink-soft mt-1">Common schemes and how to protect yourself.</p>
              </a>
              <a
                href="/noibai-t2-exit-time"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">⏱️ Exit Time</p>
                <p className="font-semibold text-ink">Noi Bai T2 Exit Time — How Long to Get Out</p>
                <p className="text-sm text-ink-soft mt-1">Plan your pickup by knowing exactly when you will exit.</p>
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
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
