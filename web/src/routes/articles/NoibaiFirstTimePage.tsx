import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'What terminal does my flight arrive at at Noi Bai Airport?',
    a: 'Noi Bai Airport (HAN) has two terminals: T1 for domestic flights and T2 for international flights. Most international arrivals (including flights from Southeast Asia, China, Europe, and the US) land at T2. If you are on a Vietnam Airlines, VietJet Air, or Bamboo Airways domestic flight, you will likely arrive at T1. After landing, follow the signs — immigration is clearly marked in both terminals.',
  },
  {
    q: 'Where can I buy a SIM card at Noi Bai Airport?',
    a: 'SIM card desks are located in the arrivals hall of both T1 and T2, typically on the right side after you pass through baggage claim and before you exit. Look for Viettel, Vinaphone, or Mobifone booths. A tourist SIM with 10 GB data costs approximately VND 50,000–100,000. Viettel has the best rural coverage if you plan to travel outside Hanoi. The desks are staffed until the last flight of the day.',
  },
  {
    q: 'Is there a free ATM at Noi Bai Airport?',
    a: 'There are ATMs from major Vietnamese banks (VietinBank, Vietcombank, BIDV, ACB) in the arrivals hall of both T1 and T2. ATM withdrawals are subject to a fee of VND 1,000–5,000 per transaction plus your bank\'s foreign withdrawal fee. Currency exchange booths are also available but offer poor rates — only exchange a small amount at the airport and get better rates at gold shops or banks in the city.',
  },
  {
    q: 'How do I get to Bus 86 from T1 or T2?',
    a: 'Bus 86 stops at both T1 and T2. From T1 (domestic terminal): after exiting arrivals, walk straight ahead to Column A1 — the bus shelter is outside, clearly marked. From T2 (international terminal): after exiting, go to Column A1 on the right side of the arrivals curb. Bus 86 runs from 05:00 to 22:15 and costs VND 50,000. <a href="/bus-86-hanoi-airport" className="text-primary underline">See full Bus 86 schedule →</a>',
  },
  {
    q: 'Can I call Grab inside Noi Bai Airport?',
    a: 'Yes. Grab works perfectly inside Noi Bai Airport — open the app, set your destination, and request a ride. The pickup point is on the arrivals curb outside T1 or T2, clearly marked with a Grab pickup zone sign. You do not need a Vietnamese SIM card to use Grab — the app works on any international SIM or airport Wi-Fi. Wait times are typically 5–15 minutes. <a href="/grab-vs-bus-hanoi-airport" className="text-primary underline">Compare Grab vs Bus 86 →</a>',
  },
  {
    q: 'Is Noi Bai Airport safe at night?',
    a: 'Yes, Noi Bai Airport is generally safe at night. Security staff are present 24/7, and the terminal is well-lit. The main concern after dark is aggressive taxi drivers and unofficial drivers who may approach you in the arrivals area. Ignore all solicitations and head directly to the official Grab pickup zone or pre-arranged transport. Women traveling alone should use Grab rather than accept any roadside offers.',
  },
  {
    q: 'How much time should I allow after landing at Noi Bai?',
    a: 'Plan for 30–60 minutes from wheels-down to being outside the terminal with transport arranged. The breakdown: deplaning (5 min), walking to immigration (5 min), immigration queue (10–30 min depending on flight size and time of day), baggage claim (10–15 min), and walking to transport (5 min). During peak hours (7–9 AM, 5–7 PM), immigration queues can stretch to 45 minutes. <a href="/noibai-t2-exit-time" className="text-primary underline">Use our exit time calculator →</a>',
  },
  {
    q: 'What is the best way to leave Noi Bai Airport?',
    a: 'For budget travelers arriving before 22:15, Bus 86 (VND 50,000) is the best option — it goes to the Old Quarter and runs regularly. For speed or arrivals after 22:15, Grab (VND 200,000–300,000) is safest and most reliable. Avoid airport taxi meters unless you know the fixed fare — there is scam risk. If you have heavy luggage or are a group of 4+, GrabSUV or a pre-arranged hotel transfer is the best choice.',
  },
];

export function NoibaiFirstTimePage() {
  return (
    <>
      <SEOHelmet path="/noibai-airport-first-time-guide" />
      <ArticleLayout languageSwitchPath="/vi/noi-bai-lan-dau-di">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Sân bay Nội Bài · Hà Nội
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              First Time at Noi Bai Airport: Arrival Guide (2026)
            </h1>
            <p className="text-lg opacity-90">
              Step-by-step: immigration, SIM card, ATM, and how to leave the airport.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* Quick checklist */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Your arrival checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <p className="text-ink text-sm">Immigration → follow signs to Arrivals</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <p className="text-ink text-sm">Baggage claim → check the screen for belt number</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <p className="text-ink text-sm">Customs (nothing to declare → green channel)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <p className="text-ink text-sm">Exit to arrivals hall → find your transport</p>
              </div>
            </div>
          </section>

          {/* Arrival sequence */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6">Step-by-step: what happens after landing</h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Deplane and walk to immigration',
                  desc: 'Follow the signs to "Immigration" or "Passport Control". The walk from the gate to the immigration hall is typically 3–5 minutes.',
                },
                {
                  step: '2',
                  title: 'Pass through immigration',
                  desc: 'Queue at the international counters (for foreign passport holders). Have your passport and arrival card ready. Processing takes 30 seconds to 5 minutes per person. During peak hours (morning and evening), expect a queue of 10–30 minutes.',
                },
                {
                  step: '3',
                  title: 'Baggage claim',
                  desc: 'Check the LCD screen for your flight number — it shows the baggage belt number. Walk to that belt in the arrivals hall. Allow 10–15 minutes for bags to appear.',
                },
                {
                  step: '4',
                  title: 'Customs',
                  desc: 'If you have nothing to declare, walk through the green channel. If you have goods over the duty-free allowance, use the red channel.',
                },
                {
                  step: '5',
                  title: 'Exit to the arrivals hall',
                  desc: 'After customs, you exit into the main arrivals hall. This is where you will find SIM card desks, ATMs, currency exchange, and the transport options below.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">{title}</h3>
                    <p className="text-ink-soft text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SIM card */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Buy a SIM card</h2>
            <p className="text-ink-soft mb-4">
              The SIM card desk is on the right side of the arrivals hall in both T1 and T2, before you exit
              through the doors. Look for the Viettel or Vinaphone booths.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink font-medium">Viettel tourist eSIM</span>
                <span className="text-ink-soft">~VND 50,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink font-medium">Vinaphone tourist SIM</span>
                <span className="text-ink-soft">~VND 100,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink font-medium">Mobifone tourist SIM</span>
                <span className="text-ink-soft">~VND 100,000</span>
              </div>
            </div>
            <p className="text-ink-soft text-sm mt-3">
              <strong>Viettel tip:</strong> Viettel has the best coverage in rural northern Vietnam. If you are
              heading to Sa Pa, Ha Long Bay, or remote areas, Viettel is the safest choice.
            </p>
          </section>

          {/* ATM / Exchange */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">ATM and currency exchange</h2>
            <p className="text-ink-soft mb-4">
              ATMs from VietinBank, Vietcombank, BIDV, and ACB are in the arrivals hall. Withdrawal fee is
              VND 1,000–5,000 per transaction.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                <strong>Currency exchange:</strong> Airport exchange booths offer poor rates (typically 2–5%
                below the market rate). Exchange only VND 100,000–200,000 here for incidentals. Get the rest at
                a gold shop on Tran Phu Street or a city bank — rates are significantly better.
              </p>
            </div>
          </section>

          {/* Bus stop location */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Bus 86 stop location</h2>
            <p className="text-ink-soft mb-3">
              Bus 86 stops at both terminals. The bus shelter is clearly marked with the route number and
              destination.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-ink mb-1">T1 — Domestic Terminal</p>
                <p className="text-ink-soft text-sm">Column A1, Arrivals Hall, outside the main exit</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-ink mb-1">T2 — International Terminal</p>
                <p className="text-ink-soft text-sm">Column A1, Arrivals Hall, right side of the exit curb</p>
              </div>
            </div>
            <p className="text-ink-soft text-sm mt-3">
              <a href="/bus-86-hanoi-airport" className="text-primary underline">
                Bus 86 runs 05:00–22:15 · VND 50,000 · See full schedule →
              </a>
            </p>
          </section>

          {/* Grab pickup */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Grab pickup point</h2>
            <p className="text-ink-soft mb-3">
              The Grab pickup zone is outside the arrivals hall at both T1 and T2, clearly signed. Open the
              Grab app, set your destination, and a car will arrive in 5–15 minutes. No need for a Vietnamese
              SIM — airport Wi-Fi works fine for booking.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Grab tip:</strong> GrabCar (sedan) is cheapest; GrabSUV is better for groups with
                large luggage. Both show the fare before you confirm — no meter, no negotiation.
                <br />
                <a href="/grab-vs-bus-hanoi-airport" className="underline mt-1 inline-block">
                  Compare Grab vs Bus 86 fares →
                </a>
              </p>
            </div>
          </section>

          {/* Taxi safety */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Taxi safety</h2>
            <p className="text-ink-soft mb-4">
              Official metered taxis are available but come with risks for first-time visitors.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-red-500 mt-0.5">✕</span>
                <p className="text-ink">
                  <strong>Avoid:</strong> Drivers who approach you inside the terminal or call out to you
                  outside. These are unlicensed drivers who may overcharge.
                </p>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <p className="text-ink">
                  <strong>Safe option:</strong> Mai Linh (hotline 024 38 61 61 61) and Vinasun — reputable
                  companies with meters. Expect to pay VND 300,000–500,000 to central Hanoi.
                </p>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <p className="text-ink">
                  <strong>Best option:</strong> Use Grab — fixed price, app-tracked, no language barrier for
                  payment.
                </p>
              </li>
            </ul>
            <p className="mt-3 text-sm text-ink-soft">
              <a href="/airport-scam-vietnam-taxi" className="text-primary underline">
                See our full taxi scam avoidance guide →
              </a>
            </p>
          </section>

          {/* Author note */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-ink mb-2">About this guide</h2>
            <p className="text-ink-soft text-sm">
              This arrival guide is compiled from real traveler reports, official airport information, and
              current on-the-ground conditions at Noi Bai Airport (HAN). We verify bus stop locations,
              SIM card availability, and transport options before publishing. Last updated: 2026.
            </p>
          </section>

          {/* Related articles */}
          <section className="border-t border-surface-border pt-8">
            <h2 className="text-lg font-semibold text-ink mb-3">Related articles</h2>
            <ul className="space-y-2">
              <li>
                <a href="/bus-86-hanoi-airport" className="text-primary underline hover:text-primary/80">
                  Bus 86 Hanoi Airport — Schedule, VND 50,000 Fare &amp; How to Catch It (2026)
                </a>
              </li>
              <li>
                <a href="/grab-vs-bus-hanoi-airport" className="text-primary underline hover:text-primary/80">
                  Grab vs Bus 86: Hanoi Airport Cost &amp; Time (2026)
                </a>
              </li>
              <li>
                <a href="/noibai-t2-exit-time" className="text-primary underline hover:text-primary/80">
                  Noi Bai T2 Exit Time: How Long to Get Out (2026)
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
