import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'Is Grab available at Hanoi Airport after midnight?',
    a: 'Yes. Grab operates 24/7 at Noi Bai Airport (HAN). The app works throughout the night, and pickup areas (P1/P2) are open around the clock. Book through the app — prices are fixed and shown before you confirm.',
  },
  {
    q: 'How much is Grab from Noi Bai Airport at night?',
    a: 'Grab rides from Noi Bai to central Hanoi cost VND 300,000–450,000 at night. Night surcharges (1.5×–2×) apply between 22:00 and 05:00. The exact price is shown in the app before you confirm — no surprises.',
  },
  {
    q: 'What time does the last bus leave from Noi Bai Airport?',
    a: 'Bus 86 is the last public bus from Noi Bai Airport, departing at 22:15. After 22:15, no public bus runs until the next morning (first departure ~06:40). If you arrive after 22:15, Grab or a taxi is your only option.',
  },
  {
    q: 'Are taxis safe at Hanoi Airport at night?',
    a: 'Street taxis at Noi Bai are not recommended at night. Unmetered drivers may quote 3–5× the real fare. Mai Linh Taxi (hotline 024 38 61 61 61) is the safest metered option. Grab is the most reliable choice — price is fixed and your trip is tracked.',
  },
  {
    q: 'Can I stay overnight at Noi Bai Airport?',
    a: 'Yes — Noi Bai Airport Terminal 2 (T2) has basic seating in the arrivals hall and some 24-hour cafes. The terminal is open all night. For more comfort, hotels near the airport (5–10 minutes by Grab) offer free airport shuttles if you book in advance.',
  },
  {
    q: 'What is the Mai Linh taxi hotline for Noi Bai Airport?',
    a: 'Mai Linh Taxi can be reached at 024 38 61 61 61 (Hanoi). Ask the dispatcher to send a car to the terminal — specify P1 or P2 pickup zone. Mai Linh uses a meter and is considered reputable. Always confirm the meter will be used before starting your trip.',
  },
];

export function LateNightHanPage() {
  return (
    <>
      <SEOHelmet path="/hanoi-airport-late-night-transfer" />
      <ArticleLayout languageSwitchPath="/vi/di-chuyen-dem-khuya-san-bay-noi-bai">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Hanoi Airport Guide
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Hanoi Airport Late Night: Grab, Taxi, Hotel Transfer (2026)
            </h1>
            <p className="text-lg opacity-90">
              Arriving between 22:00 and 05:00? Bus 86 has stopped. Here is what actually works —
              and what to avoid.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Direct Answer */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <p className="text-emerald-800 font-semibold text-lg leading-relaxed">
              ✅ Grab is your safest option after midnight at Noi Bai Airport (HAN). Prices are
              1.5×–2× higher at night (VND 300,000–450,000 to central Hanoi), but the fare is
              shown before you confirm. Pre-arrange a hotel pickup for maximum peace of mind.
            </p>
          </section>

          {/* Time Window */}
          <section className="mb-10">
            <div className="bg-white border border-surface-border rounded-xl overflow-hidden">
              <div className="bg-amber-50 px-5 py-3 border-b border-amber-200">
                <p className="text-amber-800 font-semibold text-sm">
                  ⏰ Time window: 22:00 – 05:00 daily
                </p>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-ink-soft leading-relaxed">
                  Bus 86 stops running at <strong className="text-ink">22:15</strong> from Noi Bai Airport.
                  The next morning&apos;s first departure is around <strong className="text-ink">06:40</strong>.
                  That leaves a 8-hour window — from 22:15 to 06:40 — where Grab, a taxi, or a pre-arranged
                  hotel pickup are your only practical options.
                </p>
              </div>
            </div>
          </section>

          {/* Options */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">Your Options After Midnight</h2>
            <div className="space-y-4">
              {/* Grab */}
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-bold px-2.5 py-1 rounded mt-0.5 shrink-0">
                    ✅ Safest
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-1">Grab (Recommended)</h3>
                <p className="text-ink-soft text-sm mb-3">
                  Available 24/7. Book via the Grab app — price is shown before you confirm.
                  No meter, no negotiation, no overcharging.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Night fare range</p>
                    <p className="font-semibold text-ink">VND 300,000–450,000</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Night surcharge</p>
                    <p className="font-semibold text-ink">1.5×–2×</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Travel time</p>
                    <p className="font-semibold text-ink">35–55 min</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Pickup zone</p>
                    <p className="font-semibold text-ink">P1 or P2</p>
                  </div>
                </div>
              </div>

              {/* Mai Linh */}
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-2.5 py-1 rounded mt-0.5 shrink-0">
                    📞 Traditional
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-1">Mai Linh Taxi</h3>
                <p className="text-ink-soft text-sm mb-3">
                  Reputable metered taxi company. Call ahead or find them at the taxi stand.
                  <strong className="text-ink"> Always insist on the meter.</strong>
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Hotline (Hanoi)</p>
                    <p className="font-semibold text-ink">024 38 61 61 61</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Estimated fare</p>
                    <p className="font-semibold text-ink">VND 350,000–500,000</p>
                  </div>
                </div>
              </div>

              {/* Hotel Pickup */}
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-block bg-purple-100 text-purple-700 text-sm font-bold px-2.5 py-1 rounded mt-0.5 shrink-0">
                    🏨 Most convenient
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-1">Hotel Airport Pickup</h3>
                <p className="text-ink-soft text-sm mb-3">
                  Many hotels near Noi Bai Airport offer free shuttle or private transfer.
                  Best for those with early morning plans or heavy luggage.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Cost</p>
                    <p className="font-semibold text-ink">Free – VND 300,000</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Book via</p>
                    <p className="font-semibold text-ink">Your hotel directly</p>
                  </div>
                </div>
              </div>

              {/* Sleep at airport */}
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-block bg-gray-100 text-gray-600 text-sm font-bold px-2.5 py-1 rounded mt-0.5 shrink-0">
                    💤 Free option
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-1">Stay at the Airport</h3>
                <p className="text-ink-soft text-sm mb-3">
                  Noi Bai T2 arrivals hall has seating and some 24-hour cafes. Basic but free.
                  Not recommended for early departures — fatigue can set in quickly.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Cost</p>
                    <p className="font-semibold text-ink">Free</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Best for</p>
                    <p className="font-semibold text-ink">Short waits (&lt;4h)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What to avoid */}
          <section className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-4">What to Avoid at Night</h2>
            <ul className="space-y-3 text-ink-soft">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span><strong className="text-ink">Unmetered taxis</strong> — drivers who quote a fixed price in advance almost always overcharge, especially at night.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span><strong className="text-ink">Someone approaching you</strong> inside or outside the terminal with &ldquo;taxi, taxi&rdquo; — this is the most common scam setup.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span><strong className="text-ink">Cash transactions without a receipt</strong> — always get a receipt or use in-app payment. Digital trails protect you.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span><strong className="text-ink">Riding with strangers</strong> offered as a shared taxi at the curb — unsafe and often overpriced.</span>
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
                <p className="text-sm text-ink-soft mt-1">The direct public bus for daytime arrivals.</p>
              </a>
              <a
                href="/grab-vs-bus-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">⚖️ Comparison</p>
                <p className="font-semibold text-ink">Grab vs Bus 86 Hanoi Airport — Honest Breakdown</p>
                <p className="text-sm text-ink-soft mt-1">Full cost and time comparison for all hours.</p>
              </a>
              <a
                href="/airport-scam-vietnam-taxi"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">⚠️ Safety</p>
                <p className="font-semibold text-ink">Airport Taxi Scams in Vietnam — How to Avoid</p>
                <p className="text-sm text-ink-soft mt-1">Protect yourself from common schemes.</p>
              </a>
              <a
                href="/hanoi-airport-late-night-bus"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">🌙 Late Bus</p>
                <p className="font-semibold text-ink">8 PM at Hanoi Airport — Is the Bus Still Running?</p>
                <p className="text-sm text-ink-soft mt-1">Last bus times and transition window.</p>
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">Frequently Asked Questions</h2>
            <FAQSection items={FAQ_ITEMS} />
          </section>
        </div>

        {/* FAQ Schema */}
        <FAQSchema items={FAQ_ITEMS} />
      </ArticleLayout>
    </>
  );
}
