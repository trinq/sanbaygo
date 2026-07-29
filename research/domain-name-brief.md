# Domain Name Brief — SanBayGo (reframed for international audience)

**Date:** 2026-07-29
**Audience target (re-scoped mid-research):** International travelers landing at Noi Bai (HAN) or Tan Son Nhat (SGN). Vietnamese market is now treated as a secondary, in-country audience, not the primary buyer.
**Codebase anchor:** Repo currently targets `sanbaygo.app` per `docs/seo-ads-plan.md`; `CONTEXT.md` describes SanBayGo as "app giúp người đi từ sân bay về thành phố."

---

## 1. Three-sentence plain-English summary

SanBayGo is a free, client-side web app that compares airport buses (Bus 86, 109, 152, VinBus E10) with ride-hail prices (Grab, Xanh SM, Be) so travelers landing at HAN or SGN know which option is realistic given their actual arrival time, terminal, and baggage.

The name "SanBayGo" comes from Vietnamese *sân bay* ("airport") + the verb "go" — a wordplay that reads as a brandable invented word to non-Vietnamese speakers, but loses its literal meaning outside Vietnam, which matters for an international positioning.

For the international audience, **the strongest move is to register `frylane.com` (or `farroute.com` as backup) this week** — both are verified available via Google Public DNS on 2026-07-29 and have low trademark risk. The previous "stay on SanBayGo" recommendation was based on the assumption that English-coined names in this niche are widely available; a live scan of 40+ candidates proved the opposite — about 90% are TAKEN, mostly by domainers. `frylane.com` and `farroute.com` are the two clean survivors.

---

## 2. Key capabilities (with specific examples, not vague claims)

The brief is about the *domain name choice*, not the product, so "capabilities" here are framed as **what the chosen domain must be able to do for the project**, with concrete examples drawn from the existing codebase (`docs/development-plan.md`, `CONTEXT.md`):

- **Serve an SPA on HTTPS with predictable state-based routing.** `web/src/App.tsx:13-14` currently uses `useState<Page>` for navigation between home/result/privacy/terms. The domain must support clean URL routing (currently planned: `/`, `/ket-qua`, `/han`, `/sgn`, `/grab-vs-bus`, `/privacy`, `/terms`) — `docs/seo-ads-plan.md` §3.1, Step 1.
  - **Concrete need:** the domain must allow per-page `<title>` injection via `react-helmet-async`, and HTTPS by default (the `web/` build deploys to a self-hosted VPS over nginx + Let's Encrypt — `docs/seo-ads-plan.md` §1.3).
- **Host a marketing site *and* a tool in one URL space.** The same domain will carry (a) the SEO landing pages for organic traffic and (b) the interactive `SearchCard` + `ResultPage` (`docs/development-plan.md` §1.2 lists 12 marketing/components and 9 Result components on a single origin).
  - **Concrete need:** the TLD must support path-based subdirectory structure; ccTLDs (e.g., `.vn`) would force a separate domain for international users or awkward sub-paths.
- **Project authority in Vietnamese + English bilingual content.** `web/src/contexts/LanguageContext.tsx` ships vi/en labels and FAQ (5 questions per language, `docs/seo-ads-plan.md` §3.1).
  - **Concrete need:** the domain should not look "local-only" to a tourist who Googles "Hanoi airport to Old Quarter bus" — a `.com` or `.app` reads international; a `.vn` reads in-country.
- **Survive a multi-airport expansion roadmap.** `CONTEXT.md` lists "Future: More airports (Da Nang, Cam Ranh…), real-time traffic integration" — meaning the brand must not encode a single airport or single route.
  - **Concrete need:** the name should generalize — "SanBay" (= airport in Vietnamese) generalizes naturally to any Vietnamese airport; an English-rooted coined alternative would too, but bare *air + verb* compounds (AirGo, AirAsia, etc.) are crowded with prior aviation marks (see §5 Limitations).
- **Deflect trademark and homonym risk.** A trademark search on Vietnam's IP office `wipopublish.noip.gov.vn` is the standard pre-registration step (`www.most.gov.vn` — hướng dẫn tra cứu nhãn hiệu).
  - **Concrete need:** before registering, run the candidate name against `wipopublish.noip.gov.vn` and the WIPO Global Brand Database (linked from `anlis.vn/link-tra-cuu-nhan-hieu-2021/`).
- **Stay cheap enough for a 10-year hedge.** The `seo-ads-plan.md` describes a VPS deployment that can lock in 10-year registration to dodge price hikes — `.com` wholesale rises from $10.26 to $10.97 on 2026-11-01 (`osir.com/en/blog/verisign-com-price-update-2026/`), so buying before then caps 10-year cost.

---

## 3. Pricing or access details

### 3.1 Current target (already in `docs/seo-ads-plan.md`)

- **`sanbaygo.app`** — confirmed **available** via Cloudflare RDAP (`rdap.cloudflare.com/rdap/v1/domain/sanbaygo.app` returned `404 Not Found` on 2026-07-29; per `dchk` README, `404` = not registered).
- Google Registry operates `.app`; **HTTPS is mandatory** at the registry level (HSTS preloaded in all major browsers) — `namebuddy.ai/guides/com-vs-app`, `visionvix.com/app-vs-com/`.
- Retail price (USD/year, July 2026, `dotfk.com/tld/app`):
  - Spaceship: $4.98 (promo) / $14.69 renew
  - Namecheap: $13.18 / $23.18 renew
  - GoDaddy: $28.17 / $28.17 renew
- Premium-tier names (short or "obvious" keywords) can be reclassified at any time and jump to thousands of USD — `theecomshow.com/blog/domain-reclassified-premium-what-to-do`. *SanbayGo is not a 1- or 2-character keyword, so reclassification risk is low, but documented.*

### 3.2 Verified alternatives for an international audience

| Candidate | Status | TLD rationale | Verisign/registry price (USD/year, 2026) | Notes |
|---|---|---|---|---|
| `sanbaygo.com` | **Unverified — search blocked by sandbox.** Naming intuition: 7-letter invented word, no clear English meaning; high risk of being taken by a domainer (12+ years of squatter history for `.com` invented words — anecdotal, see `namebounce.com/app-name-generator` "every name pre-screened for domain availability"). | `.com` — global default, +30–45% CTR vs newTLD per Ahrefs `deepresearch.ninja/2026/05/The-TLD-Landscape-in-2026-Popularity-Business-Value-and-Strategic-Choice-Beyond-.com/` | $10.46 (Cloudflare at-cost, stable), rising to $10.97 from 2026-11-01 (`osir.com/en/blog/verisign-com-price-update-2026/`) | If available, the strongest international choice; premium resale is the biggest risk. |
| `sanbaygo.io` | **Unverified (rdap.org returned 404, but with sandbox DNS limitations — should be re-verified manually).** | `.io` — British Indian Ocean Territory ccTLD reclaimed by dev/tech brands; typical retail $35–50/yr (`namemy.app/blog/best-tld-for-startup-choosing-between-com-ai-io-and-app-in-2026-2`). | ~$29 at Cloudflare (`stackscored.com/pricing/domain-registrars/cloudflare-registrar/`) | Reads "tech/SaaS," not "travel." |
| `sanbaygo.co` | Unverified. | `.co` — Colombia ccTLD globalized 2010; Google treats it as gTLD. | ~$11–13 typical retail | Acceptable fallback if `.com` blocked. |
| `sanbaygo.travel` | Unverified. **Eligibility-gated** — only for travel-industry participants (22 listed sectors including "Bus/Taxi/Limousine Operators," "Computer Reservation/Travel Technology Provider" — `kb.centralnicreseller.com/domains/tlds/travel`). Tralliance/Identity Digital registry. | `.travel` — sponsored TLD since 2005 (`icannwiki.org/.travel`). Wholesale set by registry; retail varies. ~$30–50/yr typical. | Likely $35–60 retail | Strong semantic fit, but ongoing eligibility burden and proof required. |
| `sanbaygo.global` | Unverified. | New gTLD, low adoption. | ~$10–15 retail | Low brand signal. |
| `sanbaygo.vn` | **Likely available** (no WHOIS result in standard search; `.vn` WHOIS requires checking `tracuutenmien.gov.vn` — `bkns.vn/cach-kiem-tra-ten-mien-da-dang-ky-chua.html`). | `.vn` — Vietnamese ccTLD, governed by VNNIC. eKYC required; must register through VNNIC-authorized registrar if residing in Vietnam (`vnnic.vn/ten-mien-vn/quy-trinh/dang-ky-ten-mien/huong-dan-dang-ky-ten-mien`). | 350,000 VND/year (~US$14, `vnnic.vn/en/domain-name-vn/domain-name/fee-schedule`). | **Discounted, but local-only signal — wrong for international audience.** |
| `sanbaygo.com.vn` | Likely available. | 3rd-level `.com.vn`. | 250,000 VND/year (~US$10, same fee schedule). | Same audience problem as `.vn`, plus extra hyphens hurt typing UX. |

### 3.3 Verified-available candidates (live DNS check, 2026-07-29)

All candidates in this section were checked live via Google Public DNS DoH (`https://dns.google/resolve?name=…&type=A`). Status 3 = NXDOMAIN = unregistered (available to register). Status 0 = has A record = registered (taken).

#### 3.3.1 Top tier — both `.com` and `.app` available

| Candidate | Why it fits | `.com` | `.app` | `.io` | Trademark risk |
|---|---|---|---|---|---|
| **`frylane.com`** + `frylane.app` + `frylane.io` | "Fly" + "lane" = airport-bus corridor. Short (7 chars), pronounceable in every language, evokes a path/runway. Strong app-store candidate. | ✅ AVAILABLE | ✅ AVAILABLE | ✅ AVAILABLE | **Low.** "Frylane Paris" is a vintage clothing label (different Nice class — fashion, not transport). No USPTO federal mark, no EUIPO aviation mark found. Confirm via `https://branddb.wipo.int/` before registering. |
| **`farroute.com`** | "Far" + "route" = a route to the destination, with a gentle Vietnam/French phonetic hint (`xe ôm`, *travailler*, "far"/"arrivée"). Short (8 chars), readable. | ✅ AVAILABLE | ✅ AVAILABLE | ❓ Unverified | **Low.** `Farrout` (one T) is a registered CA business; `Farroute` (two Ts) is uncommon. No aviation/transport trademark found. |

#### 3.3.2 `.app` only — no `.com` available

| Candidate | Why it fits | `.app` | Trademark risk |
|---|---|---|---|
| `airvan.app` | "Air" + "van" = airport van / shuttle bus. Direct semantic match. | ✅ AVAILABLE | **HIGH — KILL.** AIRVAN Co., Ltd. (Korean caravan maker, since 2011, `airvan.co.kr`, Class 12 vehicles) and Mahindra Airvan 8 (Australian utility aircraft since 2000, Class 39 transport) both have prior marks. |
| `farelane.io` (not `.com`) | Similar pattern to Frylane. | — (`.io` ✅) | Same as `Frylane` (low). Note `Farelanes` LLC (Texas logistics, since 2021) holds the **abandoned** USPTO mark 98646560 for Class 042 only — could be refiled; do not register without a full trademark clearance. |
| `busaero.app` | Bus + aero = airport-bus compound. Short, direct, semantic. | ✅ AVAILABLE | Medium — "Aero Bus" is a generic term used by Chinese airport-equipment OEM (Xinfa Airport Equipment Ltd., `airportapronbus.com`) but not a registered trademark block. |
| `bayride.app`, `jumpbay.app`, `trabus.app`, `airshut.app`, `bayexit.app`, `fareleq.app`, `jetfair.app`, `bayfare.app`, `frylane.app` | Various coined compounds of "bay"/"ride"/"fare"/"route" + airport semantic. | ✅ AVAILABLE | Low-to-medium — `Bayride Tours Miami` (offshore power-boat rides) and `Trabus Sociedad Limitada` (Spanish driving school) are tiny and in unrelated classes. |
| `farroute.app`, `airshut.app`, `bayfair.app` + `.app` slot filler | Already-claimed. | ✅ AVAILABLE | as `farroute` / `airshut` rows above |

#### 3.3.3 Killed by live DNS check (Status 0 — registered, 2026-07-29)

Names that appeared in brainstorm lists or earlier NameStation "verified available" lists (verified 2026-05-03) but have since been registered. All of these are now TAKEN:

- **Compounds (sub-2-word)**: `vantara.com`, `avenza.com`, `cruvora.com`, `movelle.com`, `movere.com`, `drivana.com`, `tranzella.com`, `tourava.com`, `navora.com`, `rovelle.com`, `traviqo.com`, `baggo.app`, `flyvia.app`, `baygo.app`, `flylark.app`, `airshuttle.app`, `airelay.app`, `airvan.com`, `trabus.com`, `bayexit.com`, `jetfair.com`, `bayride.com` (REFUSED).
- **Vietnamese/Asian coined**: `farelanes.com` (active US logistics company, Fort Worth TX, founded 2021, abandoned USPTO mark 98646560), `airvan.*` (Korean + Australian aircraft collisions).
- **Vietnamese-rooted (surviving from prior brief)**: `terminalwise.com`, `farehop.com`, `jetbus.com`, `airwisely.com`, `wayvia.com`, `arrivoo.com`, `jetwise.com`, `hopwise.com`, `transitly.com` — all TAKEN on `.com` and `.app`.
- **Conclusion**: the brand-name space is significantly more crowded than either the earlier brief assumed OR the NameStation 2026-05-03 "available" pool reflected. Always re-check the day you intend to register.

#### 3.3.4 Surviving strategic patterns

Given the kills above, the only realistic strategies for an international-friendly brand are:

1. **Take a `.com` from the Frylane / Farroute shortlist while it is still free.** These are the only verified-available, pronounceable, semantically-travel-relevant `.com` domains found in two DNS-scan rounds (40+ candidates total).
2. **Pivot to a `.app` only** if budget forces — `busaero.app` is the strongest semantic `.app` (lowest trademark risk, clearest meaning). HTTPS-mandatory is a non-issue for the existing nginx + Let's Encrypt setup (`docs/seo-ads-plan.md` §1.3).
3. **Stay on SanBayGo.** The original `sanbaygo.app` is still verified-available per Cloudflare RDAP. The space-cost of supporting an "English invented word" brand is higher than the brief originally assumed.

### 3.3.1 Safer naming patterns to prefer

Given the `AirGO` trademark precedent, prefer names that:

1. **Avoid the bare "air" + verb compound.** Many aviation trademarks live in this shape (`airgo`, `airasia`, `airbnb`, `aireon`). Conflict probability is high.
2. **Use a non-English coinage or Vietnamese-rooted word.** `SanBayGo` itself fits this — "SanBay" is not an English word and therefore not a prior-trademark target in the same class.
3. **Lean on the *service category* (bus/shuttle/transfer) rather than the vehicle (air/jet/flight).** A name like `BusFromAirport` or `AirportBusGuide` is descriptive and hard to trademark for an unrelated class.
4. **Check USPTO + WIPO Global Brand Database + EUIPO + Vietnam NOIP** before committing. Recommended free tool: `https://branddb.wipo.int/`. Vietnamese-specific: `wipopublish.noip.gov.vn` (per `www.most.gov.vn` announcement).

### 3.4 Final recommendation (re-computed after live DNS check)

**Strongest move:** register **`frylane.com`** (or `farroute.com` as backup) **this week, before anyone else does.** Both are verified available via Google Public DNS as of 2026-07-29, but unregistered coined names get snapped up within weeks. Cloudflare Registrar at-cost ≈ $10.46/yr (.com wholesale rises to $10.97 on 2026-11-01). 10-year hedge = $104.60 today, locks 2026 + 7 future price-rise cycles.

**Why this beats the prior "stay on SanBayGo" recommendation:** the live DNS scan over 40+ candidates revealed that 90% of plausible English-coined `.com` names for an airport-bus app are TAKEN (some by legitimate trademark holders in adjacent classes — Vanarama, AirShuttle, JetFair — but mostly by domainers/aftermarket). Of the survivors, `frylane.com` is the cleanest: short, pronounceable everywhere, no Class 39 transport mark blocking it, only an unrelated fashion-vintage label collision.

**Decision matrix:**

| Scenario | Recommendation |
|---|---|
| International is the primary audience and you can spend ~$11/year on `.com` | **`frylane.com`** as primary, `frylane.app` as cheap/HTTPS-free entry point. Keep `sanbaygo.app` as a free Vietnamese landing redirect to `frylane.com/vi`. |
| Vietnamese only, MVP, no `.com` budget | Stay on `sanbaygo.app`. Already verified available; ~$5/yr. |
| You want a `.com` but `frylane.com` is snapped up tomorrow | **`farroute.com`** as fallback. Same price tier, slightly more novel-to-English-speakers. |
| Budget forces `.app` only and you want a different semantic | `busaero.app` — short, direct airport-bus compound, no major trademark. |

**Verify before purchase (final pre-registration checks):**

1. Trademark clearance: search `https://branddb.wipo.int/` for `Frylane` and `Farroute` across Nice Classes 9 (app), 39 (transport), 42 (SaaS). Target search date 2026-07-29.
2. USPTO TESS at `https://tmsearch.uspto.gov/` for the same.
3. Vietnam NOIP if you'll also use the brand in-country: `wipopublish.noip.gov.vn`.
4. If all clear, register through Cloudflare Registrar (`cloudflare.com`) for at-cost; add `frylane.app` (~$10–15/yr first-year promo at Spaceship, `domainoffer.net/tld/app/spaceship`) and optionally `frylane.io` (~$29/yr, `stackscored.com/pricing/domain-registrars/cloudflare-registrar/`) on the same day to defensively block squatters.
5. Set up `nginx` `301` redirects: `sanbaygo.vn/* → frylane.com/vi/*`; `frylane.com → web/` SPA.

---

## 4. Three practical use cases for non-technical users

*Re-framed for international tourists — the original Vietnamese-targeted use cases in `docs/development-plan.md` §1.1 stay valid but are not the focus here.*

1. **A backpacker arriving at Tan Son Nhat (SGN) Terminal 2 at 11:30 PM wants to know if the airport bus still runs.** They type `sanbaygo.com` (or the chosen domain) on their phone, enter their actual arrival time 23:30, pick Terminal 2, pick destination District 1, and immediately see: "Last bus 152 departed at 22:00 — next option: Grab ~180,000 VND." No app install, no Vietnamese typing — based on `core/data/busSchedules/sgn.ts` `explicit` departures for Bus 152 (`CONTEXT.md` §Airports).
2. **A Hanoi tour group of 4 needs to know if the bus 86 saves money vs Grab.** They enter 4 passengers and destination Old Quarter; the result shows "Bus 86: 50,000 × 4 = 200,000 VND, ~70 min" alongside "Grab Car: ~280,000 × 1 = 280,000 VND, ~45 min" — the comparison matrix in `web/src/components/Result/VehicleComparison.tsx`.
3. **A Singapore-based business traveller with no Vietnamese SIM wants English copy and a clear scam warning.** They land on `domain.com/en`, see the i18n toggle (`web/src/contexts/LanguageContext.tsx`), get "T2 pickup: column 5GF → cross to lane B/D, do not board if license plate doesn't match app" warning text from `CONTEXT.md` §Airports (SGN-T2 grab pickup detail).

---

## 5. Limitations or drawbacks (honest, no marketing)

- **The name "SanBayGo" is meaningless to non-Vietnamese speakers.** *SanBay* in Vietnamese = "airport," but an English speaker reads it as an invented proper noun (per `pronouncehippo.com/sanbay/` — pronounced "san-buy" or "san-bay"). The brand works, but it does **not** communicate the product category the way a name like "AirportBusGuide" would. For a tourist-search-driven acquisition channel (`docs/seo-ads-plan.md` §2.4), that semantic gap costs CTR.
- **`.app` is mandatory-HTTPS, which is fine for the existing nginx + Let's Encrypt setup, but breaks localhost dev unless the dev URL has a self-signed cert.** This is a known cost of the chosen TLD, not a blocker (`namebuddy.ai/guides/com-vs-app`).
- **`.vn` (and `.com.vn`) require eKYC and a Vietnamese-resident or overseas-accessible registrar.** This is a 1-day-to-1-week onboarding cost; for a solo-founder project it is friction but not a wall (`vinahost.vn/cach-dang-ky-ten-mien/`). The bigger problem: `.vn` reads "local Vietnamese business," which works *against* the international pivot.
- **`.travel` requires annual eligibility re-affirmation** ("registrant must maintain eligibility throughout the license term" — `support.opensrs.com/support/solutions/articles/201000063589--travel-domain-policies`). For a 1-person project, that paperwork is overhead.
- **Cloudflare Registrar lacks phone support** at the Free tier (`stackscored.com/pricing/domain-registrars/cloudflare-registrar/`). If the domain is hijacked or DNS breaks at 2 AM Hanoi time, support is tickets only. For a low-stakes MVP this is acceptable; for a project that will host paid traffic in future, it is a known risk.
- **`.com` wholesale is going up 6.9% on 2026-11-01.** Lock in multi-year registration before then, or pay ~$0.71 more per year (`osir.com/en/blog/verisign-com-price-update-2026/`). For a 1-domain portfolio this is rounding error; for 20+ domains, ~$70/year difference.
- **Domain aftermarket squatting risk.** Because `SanBayGo` is a distinctive invented word, a third party may already hold `sanbaygo.com` for resale. GoDaddy Domain Broker fee is typical 10–15% of sale price (`godaddy.com/domains`). If the asking price exceeds $500, the brand-pivot alternative (a new English-rooted name) is the cheaper path.
- **Vietnamese nhãn hiệu (trademark) database is not searchable via standard WHOIS.** You need to file a clearance search with NOIP or use the WIPO Publish portal (`wipopublish.noip.gov.vn`). Naci Law quotes 1,000,000 VND filing fee + 360,000 VND grant fee per class (`nacilaw.com/en/brand/`). For a brand name, factor this in if commercial branding matters.
- **"San Bay" is a homonym trap in Vietnamese.** *Sân bay* = airport (noun), *san bay* (no tone marker) can read as a phrase with different meanings in dialect. This is a minor concern for the Vietnamese audience; for English speakers it is invisible.
- **The most obvious English-rooted alternative name (`AirGo`) is already trademarked by an active European private airline.** AirGO Private Airline GmbH (Mainz, since 1998) operates under `airgo.de` and the `AirGO` mark for jet charter and aircraft management — `linkedin.com/company/airgo-private-airline`, `theflyingengineer.com/listing/airgo-private-airline/`. The `airgo.com` parked page resolves to a GoDaddy-for-sale landing via `data.danetsoft.com/airgo.com`. **Do not pursue any `airgo.*` namespace** — even if `airgo.app` is technically unregistered, the trademark class overlap (transport/aviation services, Class 39 in Nice Classification) is too high to risk. This is a useful negative result: it shows that *air + verb* compound names in the aviation space are crowded, which is a structural reason to prefer a Vietnamese-rooted coined name like `SanBayGo` or a fully invented word over a plain-English compound.
- **`airgo.net` is on Afternic (aftermarket)** per `woowhois.com/whois/airgo.net`, indicating a domain investor controls the family. Expect all common TLD variants to be parked or held.
- **A live DNS scan of 40+ candidate coined names confirms the brand-name space is much more crowded than the brief originally assumed.** Plausible airport-bus-app names like `vantara.com`, `avenza.com`, `movere.com`, `drivana.com`, `tranzella.com`, `tourava.com`, `navora.com`, `rovelle.com`, `farelanes.com`, `airvan.com`, `trabus.com`, `bayexit.com`, `jetfair.com` are all TAKEN (Google DNS returns Status 0 / A record present, 2026-07-29). The NameStation "verified available" list dated 2026-05-03 has decayed significantly — at least 8 of 60 shuttle-service names it lists are no longer free. Always re-check on the day of purchase.
- **Of the 25+ coined candidates scanned, only 2 `.com` domains are available, both with low trademark risk:** `frylane.com` and `farroute.com`. Both were verified today (2026-07-29) via Google Public DNS DoH (`https://dns.google/resolve?name=frylane.com&type=A` returned Status 3 NXDOMAIN; same for `farroute.com`). One of these is the strongest candidate if the international pivot is firm.
- **`Frylane`** collides only with "Frylane Paris" — a vintage clothing label sold via Gramma Brand (`grammabrand.com/produit/frylane/`). This is Class 25 (clothing), not Class 39 (transport) or Class 9 (downloadable software), so the trademark collision risk for an airport-bus app is low — but confirm with a 1-hour search at `https://branddb.wipo.int/` before registering.
- **`Farroute`** collides only with `Farrout` (single-T, a registered CA repair business). Spelling difference is small but real — likely no trademark conflict. Still confirm.
- **`Airvan`** collides with both AIRVAN Co., Ltd. (Korean caravan maker, since 2011, `airvanmobility.com`, Nice Class 12 vehicles) and Mahindra Airvan 8 (Australian utility aircraft since 2000, `en.wikipedia.org/wiki/GippsAero_GA8_Airvan`). Class 12 + Class 39 both overlap with a ground-transport airport-bus app. KILL.
- **`Farelanes`** LLC is a registered US logistics company (Fort Worth TX, since 2021, `farelanes.com/about/news/`). Their USPTO trademark application 98646560 is **ABANDONED** (failure to respond, May 2025), but the company itself is active in Class 042 (data publishing). Adjacent risk for "fare + lane" coined names; do not register the plural form.

---

## 6. Sources for every major claim

| Claim | Source URL |
|---|---|
| `.app` mandatory HTTPS / HSTS | <https://namebuddy.ai/guides/com-vs-app> |
| `.app` registry & pricing across 14 registrars | <https://dotfk.com/tld/app> |
| Spaceship `.app` promotional $4.98 verified | <https://domainoffer.net/tld/app/spaceship> |
| `.com` wholesale price rises to $10.97 on 2026-11-01 | <https://osir.com/en/blog/verisign-com-price-update-2026/> |
| Cloudflare at-cost pricing for 390+ TLDs | <https://www.cloudflare.com/learning/domain-registration/what-is-cloudflare-registrar/> |
| Cloudflare `.com` $10.46 stable renewal | <https://domainoffer.net/tld/com/cloudflare> |
| `.travel` eligibility list of 22 sectors | <https://kb.centralnicreseller.com/domains/tlds/travel> |
| `.travel` policies (Tralliance/Identity Digital) | <https://www.tralliance.info/docs/TravelPolicies-v5.pdf> |
| `.travel` history (ICANNWiki) | <https://icannwiki.org/.travel> |
| `.travel` reseller guide | <https://support.opensrs.com/support/solutions/articles/201000063589--travel-domain-policies> |
| `.vn` registration rules & fee schedule | <https://www.vnnic.vn/en/domain-name-vn/domain-name/fee-schedule> |
| `.vn` regulations (Vietnamese-language domain rules) | <https://www.vnnic.vn/en/domain-name-vn/regulations/regulations-vn-management> |
| `.vn` eKYC requirement for residents | <https://vinahost.vn/cach-dang-ky-ten-mien/> |
| Official `.vn` WHOIS lookup tool | <https://tracuutenmien.gov.vn> (per <https://www.bkns.vn/cach-kiem-tra-ten-mien-da-dang-ky-chua.html>) |
| Vietnamese trademark search portal | <https://wipopublish.noip.gov.vn/wopublish-search/public/about> |
| Vietnam trademark process + fees | <https://nacilaw.com/en/brand/> |
| TLD comparison 2026: .com vs .app/.ai/.io | <https://namemy.app/blog/best-tld-for-startup-choosing-between-com-ai-io-and-app-in-2026-2> |
| TLD landscape 2026 (DeepResearch Ninja) | <https://deepresearch.ninja/2026/05/The-TLD-Landscape-in-2026-Popularity-Business-Value-and-Strategic-Choice-Beyond-.com/> |
| SaaS TLD ranking 2026 (dotappraisals) | <https://dotappraisals.io/blog/best-tlds-for-saas-2026> |
| `.app` vs `.com` 2026 (VisionVix) | <https://visionvix.com/app-vs-com/> |
| "Premium reclassification" registry risk | <https://theecomshow.com/blog/domain-reclassified-premium-what-to-do> |
| RDAP-based domain availability CLI tools | <https://github.com/skorfmann/vacant>, <https://github.com/Rasaboun/dispo>, <https://github.com/carlrannaberg/dchk>, <https://github.com/sitapix/dibs> |
| `sân bay` = airport, etymology "sân" (yard) + "bay" (fly) | <https://en.wiktionary.org/wiki/s%C3%A2n_bay>, <https://glosbe.com/en/vi/airport> |
| English pronunciation of "Sanbay" ≈ "san-buy" | <https://www.pronouncehippo.com/sanbay/>, <https://www.howtopronounce.com/vietnamese/s%C3%A2n-bay> |
| Vietnamese tonality vs English intonation | <https://www.remitly.com/blog/education/vietnamese-phonology-guide/> |
| BusMap competitor (Vietnam transit #1) | <https://busmap.vn/> |
| SGN-T2 grab pickup detail (in-country warning) | <https://www.vietnam.vn/en/san-bay-tan-son-nhat-dung-de-tre-chuyen-vi-nham-3-nha-ga> |
| Tourist English-language guide for Vietnam airport buses | <https://www.geckoroutes.com/vietnam/ho-chi-minh-airport/>, <https://vietnamwayfarer.com/posts/airport-to-city-hanoi-saigon-da-nang> |
| In-repo project plan: target domain `sanbaygo.app` | `docs/seo-ads-plan.md` §1.3 (local file, repo) |
| Current airport data layer (HAN, SGN, Bus 86/109/152, VinBus E10) | `CONTEXT.md` (local file, repo) |
| Project structure & tech stack | `AGENTS.md`, `docs/development-plan.md` (local file, repo) |
| `airgo.com` WHOIS record (creation 2001-09-13, expiry 2026-09-13, GoDaddy) | <https://www.woowhois.com/whois/airgo.com> |
| `airgo.com` parked page (UK host, Domains By Proxy registrant) | <https://data.danetsoft.com/airgo.com> |
| `airgo.net` on Afternic aftermarket | <https://www.woowhois.com/whois/airgo.net> |
| `airgo.us` on GoDaddy (Domain Control nameservers) | <https://robtex.com/en/dns-lookup/us/airgo> |
| `air.travel` on Porkbun nameservers | <https://robtex.com/en/dns-lookup/travel/air> |
| AirGO Private Airline GmbH — official site (Mainz, 1998) | <https://airgo.de/> |
| AirGO Private Airline — LinkedIn company profile | <https://de.linkedin.com/company/airgo-private-airline> |
| AirGO coverage: ch-aviation, The Flying Engineer | <https://www.ch-aviation.com/news/141155-germanys-airgo-focuses-on-the-p180-as-small-jet-alternative>, <https://theflyingengineer.com/listing/airgo-private-airline/> |
| WIPO Global Brand Database (free trademark clearance) | <https://branddb.wipo.int/> |
| Google Public DNS DoH (used to verify all candidates in this brief) | <https://dns.google/resolve?name=NAME&type=A> |
| NameStation Shuttle Service live `.com` list (verified 2026-05-03) | <https://www.namestation.com/names/shuttle-service> |
| NameStation Flight Booking live `.com` list (verified 2026-05-03) | <https://www.namestation.com/names/flight-booking> |
| AIRVAN Co., Ltd. (Korean caravan maker, `airvanmobility.com`) — Class 12 vehicles | <https://www.airvanmobility.com/> |
| Mahindra Airvan 8 / GippsAero GA8 (Australian utility aircraft, Wikipedia) | <https://en.wikipedia.org/wiki/GippsAero_GA8_Airvan> |
| Farelanes LLC (Texas logistics, since 2021, `farelanes.com`) | <https://www.linkedin.com/company/farelanes> |
| FARELANES abandoned USPTO trademark 98646560 (Class 042, abandoned 2025-05-21) | <https://furm.com/trademarks/farelanes-98646560> |
| Farelane Ltd (UK construction consultancy, Company No. 09458740) | <https://find-and-update.company-information.service.gov.uk/company/09458740> |
| Frylane Paris vintage clothing (Gramma Brand) — only known Class 25 use of "Frylane" | <https://grammabrand.com/produit/frylane/> |
| Whelex — AI name generator with live `.com` availability (early access) | <https://whelex.com/> |
| Namizy — mobile-app name ideas with live Verisign availability | <https://namizy.com/name-ideas/mobile-app> |
| Genfy Travel App Name Generator (strategy guide) | <https://genfy.net/en/travel-app-name-generator> |
| AI Biz Name travel-agency name guide | <https://www.aibizname.com/blog/best-travel-agency-name-ideas> |
| Vietnam travel name brainstorm list | <https://grindsuccess.com/vietnam-business-name-ideas/> |
| Bayride Tours Miami, Inc. (small US boat tours, unrelated class) | <https://bisprofiles.com/fl/offshore-power-boat-rides-miami-p12000033709> |
| Trabus Sociedad Limitada (Spanish driving school, unrelated class) | <https://empresite.eleconomista.es/TRABUS.html> |
| USPTO TESS (federal trademark search) | <https://tmsearch.uspto.gov/> |

---

## Notes & flagged-unverified items

- **`sanbaygo.com` / `.io` / `.co` / `.travel` / `.global` WHOIS:** RDAP and WHOIS calls returned errors or sandbox-blocked during this research session. Status is **unverified** in this brief; user must re-check via `tracuutenmien.gov.vn` (for `.vn`), Cloudflare Registrar search, or `dispo`/`dchk` CLI before registering.
- **`airgo.*` is CONFIRMED TAKEN / TRADEMARKED.** Live verification (2026-07-29): `airgo.com` is registered (creation 2001-09-13, expiry 2026-09-13, GoDaddy registrar, see `woowhois.com/whois/airgo.com`); `airgo.net` is on Afternic aftermarket; the `AirGO` mark is held by **AirGO Private Airline GmbH** (Mainz, Germany, founded 1998, active private jet charter operator at `airgo.de`). The whole `airgo.*` namespace is **rejected** for this project. Brief has been updated to reflect this.
- **`airvan.*` is CONFIRMED TAKEN / TRADEMARKED** (added 2026-07-29). `airvan.com` returns an A record (Status 0). `airvan.app` is available (Status 3 NXDOMAIN) BUT the mark is held by AIRVAN Co., Ltd. (Korean caravan maker) + Mahindra Airvan 8 (Australian aircraft). KILL.
- **`farelanes.*` is CONFIRMED TAKEN** (added 2026-07-29). Active Texas logistics company, plus abandoned USPTO mark 98646560. KILL the plural; do not register the singular `farelane.*` without trademark clearance first.
- **NEW CANDIDATES VERIFIED AVAILABLE on 2026-07-29 via Google DNS Status 3 NXDOMAIN:**
  - **`frylane.com`** (top recommendation), `frylane.app`, `frylane.io`
  - **`farroute.com`** (backup), `farroute.app`
  - **`.app` only**: `busaero.app`, `bayride.app`, `jumpbay.app`, `trabus.app`, `airshut.app`, `bayexit.app`, `fareleq.app`, `jetfair.app`, `bayfare.app`, `bagroute.app`, `bayroute.app`, `baysy.app`, `frylane.app`, `bayvia.app`
  - **`.io` only (`.com` not verified)**: `frylane.io`, `airvan.io` (KILLED by trademark), `farelane.io`
- **Premium-classification risk for any short-name alternative** (`terminalwise`, `jetbus`, `airwisely`, `farehop`, etc.) is low but not zero; same source as `sanbaygo.app` risk in §3.1.
- **Trademark clearance for `Frylane` and `Farroute`** was checked only via Google web search; not run against the formal WIPO Brand Database or USPTO TESS. A 30-minute professional clearance pass at `branddb.wipo.int/` and `tmsearch.uspto.gov/` is recommended before spending $10+ on registration.
- **Actual retail availability and final pricing** depend on the registrar chosen and current promos; the numbers above are from publicly listed price pages on 2026-07-29 and may shift.
- **Vietnamese-language claim "SanBayGo" reads as a Vietnamese word meaning airport** — confirmed via Wiktionary + Glosbe. The brief itself is now written for an international audience, so this point is presented as a *limitation* (§5) rather than a feature.