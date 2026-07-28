# SanBayGo — Kế hoạch SEO (Organic)

> Ngày: 2026-07-28
> Phiên bản: 2.0 — SEO Only (no paid ads)
> Tác giả: SanBayGo Agent
> Trạng thái: Draft — pending nginx config + React Router implementation
> Deployment: Xem `docs/adr/0003-vps-deployment.md` + `docs/vps-deployment-guide.md`

---

## Mục lục

1. Phân tích website hiện tại
2. Mục tiêu kinh doanh
3. Kế hoạch SEO (Organic)
4. Content Plan
5. Cookie Consent + Analytics Setup
6. Landing Pages
7. Ưu tiên theo tuần
8. KPI

---

## 1. Phân tích website hiện tại (dựa trên codebase thật)

### 1.1 Cấu trúc trang

SanBayGo là **SPA (Single Page Application)** với state-based routing. Trong codebase (`web/src/App.tsx:13-14`):

| Trang / Section | Component | URL thực tế | URL mục tiêu | Trạng thái |
|---|---|---|---|---|
| Trang chủ | `LandingPage` | `/` | `/` | ✅ |
| Kết quả tìm kiếm | `ResultPage` | `/` (state) | `/ket-qua` | ❌ |
| Chính sách bảo mật | `Privacy` | `/` (state) | `/privacy` | ❌ |
| Điều khoản sử dụng | `Terms` | `/` (state) | `/terms` | ❌ |
| Landing Hà Nội | — | — | `/han` | ❌ |
| Landing Sài Gòn | — | — | `/sgn` | ❌ |
| Compare page | — | — | `/grab-vs-bus` | ❌ |
| FAQ | `FAQ` | Nhúng landing | `/` (FAQ section) | ✅ |

> **File gốc:** `web/src/App.tsx:13-14` — `type Page = 'home' | 'result' | 'privacy' | 'terms'`
> Toàn bộ "trang" chỉ là state `useState<Page>`. Đây là rào cản SEO lớn nhất.

### 1.2 Tình trạng SEO kỹ thuật

| Yếu tố | Trạng thái | File |
|---|---|---|
| `<title>` | ✅ Có | `web/index.html` |
| `<meta name="description">` | ✅ Có | `web/index.html` |
| Open Graph tags | ✅ Đầy đủ | `web/index.html` |
| Twitter Card | ✅ Có | `web/index.html` |
| Canonical URL | ❌ Thiếu | `web/index.html` |
| `robots.txt` | ❌ Thiếu | `web/public/` |
| `sitemap.xml` | ❌ Thiếu | `web/public/` |
| JSON-LD Schema | ❌ Thiếu | `web/index.html` |
| Semantic HTML | ✅ Tốt | Tất cả components |
| ARIA labels | ✅ Tốt | Tất cả components |
| Favicon | ⚠️ Emoji SVG | `web/public/favicon.svg` |
| OG image | ⚠️ Chưa xác minh | `web/public/og-image.png` |
| URL routing | ❌ State-based | `web/src/App.tsx` |
| Cookie consent | ❌ Thiếu | — |
| Analytics | ❌ Thiếu | — |
| Per-page `<title>` | ❌ Thiếu | — |

### 1.3 Kiến trúc infrastructure

```
Deployment: VPS (self-hosted) — Ubuntu 22.04+
Web server: nginx
SSL: Let's Encrypt (certbot)
CI/CD: GitHub Actions — build + rsync to VPS
Build location: GitHub Actions (no local build)
Deploy path: /home/ubuntu/sanbaygo
Domain: sanbaygo.app (IP-first, DNS redirect sau)
```

**Deployment files đã tạo:**

| File | Purpose |
|---|---|
| `.github/workflows/deploy.yml` | GitHub Actions: build + rsync to VPS |
| `scripts/deploy.sh` | Manual deploy (optional) |
| `docs/vps-deployment-guide.md` | Step-by-step VPS setup guide |
| `docs/adr/0003-vps-deployment.md` | ADR cho deployment decisions |

**GitHub Secrets cần thêm:**

| Secret | Value |
|---|---|
| `VPS_HOST` | IP của VPS |
| `VPS_USER` | SSH username |
| `VPS_DEPLOY_PATH` | `/home/ubuntu/sanbaygo` |
| `VPS_SSH_PRIVATE_KEY` | Ed25519 private key cho GitHub Actions |

**nginx config (SPA routing):**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

> Chi tiết: `docs/vps-deployment-guide.md`

### 1.4 Điểm mạnh & điểm yếu

**Điểm mạnh:**
- Bundle nhỏ (~215KB JS gzip) — tốc độ load tốt
- Semantic HTML + ARIA — accessibility foundation vững
- OG/Twitter tags đầy đủ
- Vietnamese-first — phù hợp thị trường mục tiêu
- FAQ content tồn tại trong `LanguageContext.tsx` (5 câu VI + 5 câu EN)
- Bilingual support có sẵn

**Điểm yếu:**
- **CRITICAL: Không có URL** — Google chỉ index 1 trang
- Không có analytics — 0 data về traffic
- Không có sitemap/robots
- Không có cookie consent
- Grab deep link đã done nhưng chưa track click event

---

## 2. Mục tiêu kinh doanh

### 2.1 Mục tiêu chính

**Trở thành nguồn tham khảo #1 về xe buýt sân bay tại Việt Nam** — nội dung chính xác, cập nhật, đáng tin cậy. Authority metric: backlinks từ travel sites + Google ranking cho informational queries.

### 2.2 Chân dung khách hàng

**Primary — Người Việt đáp máy bay:**
- Độ tuổi: 22–45
- Pain point: không biết giờ xe buýt, không biết có kịp không
- Ngân sách: nhạy cảm giá — ưu tiên bus
- Device: Mobile 85%+

**Secondary — Du khách quốc tế:**
- Không có SIM Việt Nam, không nói tiếng Việt
- Pain point: scam risk (5/6 high risk tại SGN theo Tabiji.ai)
- Cần English content + trust signals

### 2.3 Nhóm từ khóa

**Nhóm 1 — Brand:**
- `sanbaygo`, `san bay go`

**Nhóm 2 — Intent cao (người đang ở sân bay):**
- `xe buýt sân bay nội bài`, `tuyến 86 nội bài`
- `bus 86 sân bay nội bài giờ nào`
- `grab nội bài giá bao nhiêu`
- `tân sơn nhất về quận 1 xe gì`, `bus 152 sài gòn sân bay`

**Nhóm 3 — Comparison:**
- `xe buýt hay grab từ sân bay`
- `sân bay nội bài về phố cổ bao lâu`

**Nhóm 4 — Long-tail:**
- `đáp máy bay 8h sáng có kịp xe buýt không`
- `international flight đáp nội bài mất bao lâu ra`

> **Không target competitor keywords** (Grab, BusMap, Moovit) trong giai đoạn 1. Chỉ tập trung own brand + informational.

---

## 3. Kế hoạch SEO (Organic)

### 3.1 SEO kỹ thuật — Tuần 1

#### Step 1: React Router (2–4 giờ)

**File:** `web/src/App.tsx`, `web/src/pages/Privacy.tsx`, `web/src/pages/Terms.tsx`

```bash
cd web && npm install react-router-dom
```

Routes:
- `/` → `<LandingPage>`
- `/ket-qua` → `<ResultPage>` (state qua sessionStorage)
- `/privacy` → `<Privacy>`
- `/terms` → `<Terms>`

Cần pass `formData` + `result` từ Landing → Result qua `sessionStorage`:

```typescript
// LandingPage: khi submit
sessionStorage.setItem('sanbaygo_result', JSON.stringify({ formData, result }));
window.location.href = '/ket-qua';

// ResultPage: khi mount
const saved = sessionStorage.getItem('sanbaygo_result');
if (saved) { const { formData, result } = JSON.parse(saved); /* ... */ }
```

#### Step 2: nginx config (15 phút)

**File:** `/etc/nginx/sites-available/sanbaygo.app`

```nginx
server_name sanbaygo.app;
root /var/www/sanbaygo/dist;
index index.html;

location / {
    try_files $uri $uri/ /index.html;
}

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### Step 3: robots.txt (5 phút)

**File:** `web/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://sanbaygo.app/sitemap.xml
```

#### Step 4: sitemap.xml (10 phút)

**File:** `web/public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://sanbaygo.app/</loc><priority>1.0</priority></url>
  <url><loc>https://sanbaygo.app/han</loc><priority>0.8</priority></url>
  <url><loc>https://sanbaygo.app/sgn</loc><priority>0.8</priority></url>
  <url><loc>https://sanbaygo.app/grab-vs-bus</loc><priority>0.7</priority></url>
  <url><loc>https://sanbaygo.app/privacy</loc><priority>0.3</priority></url>
  <url><loc>https://sanbaygo.app/terms</loc><priority>0.3</priority></url>
</urlset>
```

#### Step 5: canonical URL + per-page title (15 phút)

**File:** `web/index.html` — thêm canonical:

```html
<link rel="canonical" href="https://sanbaygo.app/" />
```

Per-page `<title>` — dùng `react-router-helmet` hoặc `react-helmet-async`:

```bash
cd web && npm install react-helmet-async
```

```typescript
// App.tsx — per route
<Route path="/" element={<><Helmet><title>SanBayGo — Xe buýt sân bay Nội Bài & Tân Sơn Nhất</title></Helmet><LandingPage /></>} />
<Route path="/privacy" element={<><Helmet><title>Chính sách bảo mật — SanBayGo</title><meta name="description" content="SanBayGo không lưu trữ hay chia sẻ dữ liệu cá nhân. Miễn phí, không cookie, không analytics." /></Helmet><Privacy /></>} />
<Route path="/terms" element={<><Helmet><title>Điều khoản sử dụng — SanBayGo</title></Helmet><Terms /></>} />
<Route path="/han" element={<><Helmet><title>Đi xe buýt từ sân bay Nội Bài về Hà Nội — SanBayGo</title><meta name="description" content="Hướng dẫn đi xe buýt 86 từ sân bay Nội Bài về trung tâm Hà Nội. 26 chuyến/ngày, 50.000đ. So sánh với Grab." /></Helmet><HanLanding /></>} />
<Route path="/sgn" element={<><Helmet><title>Đi xe buýt từ sân bay Tân Sơn Nhất về TP.HCM — SanBayGo</title><meta name="description" content="Hướng dẫn đi xe buýt 109, 152 từ sân bay Tân Sơn Nhất. Chỉ 5.000–15.000đ. So sánh với Grab, Xanh SM." /></Helmet><SgnLanding /></>} />
<Route path="/grab-vs-bus" element={<><Helmet><title>Xe buýt hay Grab từ sân bay? — SanBayGo</title><meta name="description" content="So sánh xe buýt và Grab từ sân bay: giá, thời gian, khi nào nên chọn cái nào. Cập nhật 2026." /></Helmet><GrabVsBus /></>} />
```

#### Step 6: JSON-LD (30 phút)

**File:** `web/index.html` hoặc inject trong `<Helmet>`

```html
<!-- WebApplication schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SanBayGo",
  "description": "So sánh xe buýt sân bay và Grab để chọn phương tiện tốt nhất",
  "url": "https://sanbaygo.app",
  "applicationCategory": "TravelApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "VND" }
}
</script>
```

FAQPage schema auto-generate từ `LanguageContext.tsx`:

```typescript
// utils/generateFaqJsonLd.ts
export function generateFaqJsonLd(lang: 'vi' | 'en') {
  const faqData = translations[lang].landing.faq.questions;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
```

### 3.2 On-page SEO — Tuần 1–2

- [ ] Audit heading hierarchy (H1 unique per page)
- [ ] Add alt text cho tất cả images
- [ ] Audit internal links (hreflang nếu có EN version)

---

## 4. Content Plan

### 4.1 Blog posts cần viết

Thứ tự ưu tiên (bulk publish tuần 1–2, sau đó 1/tuần):

| # | Bài viết | Từ khóa | Độ dài | Ưu tiên |
|---|---|---|---|---|
| 1 | "Hướng dẫn đi xe buýt 86 từ sân bay Nội Bài về Hà Nội 2026" | xe buýt 86 nội bài | 1.500 word | 🔴 |
| 2 | "Đi Grab từ sân bay Nội Bài giá bao nhiêu? Cập nhật 2026" | grab nội bài giá | 800 word | 🔴 |
| 3 | "Xe buýt hay Grab: Nên chọn gì khi đáp sân bay?" | xe buýt hay grab sân bay | 1.200 word | 🔴 |
| 4 | "Tuyến xe buýt 109, 152 Sân bay Tân Sơn Nhất 2026" | bus 152 sài gòn sân bay | 1.000 word | 🟡 |
| 5 | "Cách bắt Grab tại sân bay Tân Sơn Nhất — điểm đón chuẩn" | bắt grab sân bay tân sơn nhất | 600 word | 🟡 |

**Language:** Vietnamese chính + English summary block ở cuối mỗi bài.

**Authorship:** Agent viết drafts → human reviews.

### 4.2 Blog page structure

```
web/src/pages/blog/
├── BlogBus86.tsx         # Route: /blog/xe-buýt-86-noi-bai
├── BlogGrabGia.tsx        # Route: /blog/grab-noi-bai-gia-bao-nhieu
├── BlogBusOrGrab.tsx      # Route: /blog/xe-buýt-hay-grab
├── BlogSgnBuses.tsx      # Route: /blog/xe-buýt-tan-son-nhat
├── BlogGrabSgn.tsx        # Route: /blog/bắt-grab-tan-son-nhat
└── BlogPost.tsx          # Shared layout component
```

### 4.3 Off-page — Tuần 3–4

- Google Business Profile (Hà Nội + TP.HCM)
- Facebook/LinkedIn page
- Reddit / r/VietNam
- Vietnam travel forums (TNR.vn, Webtretho)
- Vietnam business directories

---

## 5. Cookie Consent + Analytics Setup

### 5.1 Cookie Consent Banner

**Requirement:** GA4 requires cookie consent for EU visitors (GDPR). Vietnam nDSP not enforced yet.

**Solution:** Minimal banner — "Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn" + "Đồng ý" / "Từ chối"

**Implementation:**

```typescript
// web/src/components/CookieConsent.tsx
// State: null (not decided) | 'accepted' | 'declined'
// If accepted: initialize GA4
// If declined: no GA4, no tracking
// Persist choice in localStorage
```

**Consent categories (minimal):**
- Analytics (GA4)
- No third-party marketing scripts

**UX:** Banner ở bottom, không block nội dung. User có thể dismiss.

### 5.2 GA4 Setup

**Property ID:** Cần tạo trong Google Analytics (miễn phí)

**Implementation:**

```html
<!-- web/index.html — chỉ inject sau khi user accept consent -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
</script>
```

**Custom events to track:**

```typescript
gtag('event', 'search_started', { event_category: 'engagement' });
gtag('event', 'grab_clicked', { event_category: 'conversion', transport_type: 'beacon' });
gtag('event', 'xanhsm_clicked', { event_category: 'conversion', transport_type: 'beacon' });
```

---

## 6. Landing Pages

### 6.1 /han — Hà Nội Landing Page

**Mục tiêu:** Rank cho "xe buýt nội bài", "tuyến 86 nội bài", "sân bay nội bài về hà nội"

**Nội dung:**
- Hero: "Đi xe buýt từ sân bay Nội Bài về Hà Nội"
- Bus 86 schedule (26 departures, giá 50.000đ)
- So sánh nhanh: Bus 86 vs Grab
- Hướng dẫn điểm bắt xe (T1 cột 12, T2 cột 14)
- Inline demo form (SearchCard)
- FAQ riêng cho Hà Nội
- CTA: "Tính ngay — có kịp xe buýt không?"

### 6.2 /sgn — Sài Gòn Landing Page

**Mục tiêu:** Rank cho "xe buýt sân bay tân sơn nhất", "bus 152 sài gòn", "bus 109 sân bay"

**Nội dung:**
- Hero: "Đi xe buýt từ sân bay Tân Sơn Nhất về TP.HCM"
- Bus 152 (T1/T2, 5.000đ) + Bus 109 (T3, 15.000đ)
- Điểm bắt xe: T1 TCP Nhà để xe, T2 Bãi xe quốc tế, T3 Cột 34
- So sánh: Bus 152 vs Bus 109 vs Grab vs Xanh SM
- Inline demo form
- FAQ riêng cho Sài Gòn

### 6.3 /grab-vs-bus — Compare Page

**Mục tiêu:** Rank cho "xe buýt hay grab từ sân bay", "đi sân bay xe gì rẻ nhất"

**Nội dung:**
- Decision matrix: Khi nào chọn Bus, khi nào chọn Grab
- Price comparison table (Bus 86: 50k, Bus 152: 5k, Grab HAN: 250–350k, Grab SGN: 100–180k)
- Time comparison (normal vs peak hours)
- Luggage considerations
- International flight considerations
- Trust signals: "Miễn phí, không cần đặt trước, không cần app"

---

## 7. Ưu tiên theo tuần

### Tuần 1 — Infrastructure + Routing (P0)

```
□ npm install react-router-dom react-helmet-async
□ Refactor web/src/App.tsx: state → URL routing
□ nginx config: try_files $uri $uri/ /index.html
□ Tạo web/public/robots.txt
□ Tạo web/public/sitemap.xml
□ Thêm canonical URL vào web/index.html
□ Per-page <title> + meta description (react-helmet-async)
□ Inject WebApplication JSON-LD
□ Generate FAQPage JSON-LD from LanguageContext
□ Tạo CookieConsent component
□ Integrate GA4 (conditional on consent)
□ Gắn gtag events: search_started, grab_clicked
□ Verify og-image.png tồn tại
```

### Tuần 2 — Landing Pages + Content (P0)

```
□ Tạo /han landing page (React component)
□ Tạo /sgn landing page (React component)
□ Tạo /grab-vs-bus compare page
□ Viết blog post #1: "Hướng dẫn xe buýt 86 Nội Bài" (1.500 word, bilingual)
□ Viết blog post #2: "Grab Nội Bài giá bao nhiêu" (800 word, bilingual)
□ Viết blog post #3: "Xe buýt hay Grab" (1.200 word, bilingual)
□ Update sitemap.xml với blog posts
□ Submit sitemap.xml trong Google Search Console
□ Audit heading hierarchy + alt text
```

### Tuần 3 — Content + Off-page (P1)

```
□ Viết blog post #4: "Tuyến xe buýt 109, 152 Sân bay Tân Sơn Nhất" (1.000 word)
□ Viết blog post #5: "Cách bắt Grab tại Tân Sơn Nhất" (600 word)
□ Tạo Google Business Profile (Hà Nội + TP.HCM)
□ Tạo Facebook page
□ Tạo LinkedIn page (optional)
□ Audit internal links trên landing pages
```

### Tuần 4 — Backlinks + Measurement (P2)

```
□ Outreach 3–5 backlink (Vietnam travel forums, Reddit r/VietNam)
□ Đăng ký Vietnam business directories
□ Review GA4 data sau 2–3 tuần
□ Adjust content strategy dựa trên top pages
□ Update sitemap.xml nếu cần
□ Security: kiểm tra XSS, ensure no user data exposed
```

---

## 8. KPI

### Primary KPIs

| KPI | Tuần 1–2 | Tháng 1 | Tháng 3 |
|---|---|---|---|
| Indexed pages (GSC) | 5+ | 10+ | 20+ |
| Organic Sessions (GA4) | 50 | 200 | 1.000 |
| Google Search impressions | 500 | 3.000 | 10.000 |
| Top 10 ranking keywords | — | 5 | 15 |
| Backlinks | 0 | 3 | 10 |
| Grab link clicks (GA4 event) | 5 | 20 | 100 |
| Cookie consent rate | > 60% accept | > 60% | > 70% |

### Secondary KPIs

| KPI | Target |
|---|---|
| Bounce rate | < 60% |
| Pages / session | > 1.5 |
| Time on page (landing) | > 30s |
| GA4 no-match rate | < 10% |

### Định nghĩa "Thành công Giai đoạn 1" (60 ngày)

- ✅ GSC: ≥ 10 pages indexed
- ✅ Không có critical SEO errors trong GSC
- ✅ Organic traffic ≥ 200 UV/tháng
- ✅ ≥ 3 blog posts published
- ✅ ≥ 1 backlink từ external domain
- ✅ Grab link clicks ≥ 20 lần/tháng
- ✅ Cookie consent banner hoạt động

### KPI thất bại — cần pivot:

- Organic traffic = 0 sau 30 ngày → bug indexing hoặc sitemap chưa submit
- Bounce rate > 85% → landing page content không match search intent
- Grab clicks = 0 sau 100 sessions → form không convert

---

## Phụ lục — Files đã kiểm tra

```
web/index.html                          — OG tags, meta, title (needs canonical + JSON-LD)
web/src/App.tsx                         — State-based routing (needs React Router)
web/src/contexts/LanguageContext.tsx     — FAQ content VI+EN (5 câu mỗi ngôn ngữ)
web/src/components/Landing/             — 24 files (Hero, FAQ, HowItWorks…)
web/src/components/Result/ResultPage.tsx — Grab deep link ✅ (no href="#" found)
web/src/pages/Privacy.tsx              — Privacy page (needs URL route)
web/src/pages/Terms.tsx                — Terms page (needs URL route)
web/public/robots.txt                  — KHÔNG TỒN TẠI ❌
web/public/sitemap.xml                 — KHÔNG TỒN TẠI ❌
web/public/favicon.svg                 — Emoji SVG ⚠️
web/public/og-image.png                — Chưa xác minh ⚠️
web/package.json                        — Cần thêm: react-router-dom, react-helmet-async
```

## ADR References

Các quyết định kiến trúc được ghi trong:
- `docs/adr/0002-seo-strategy.md` — SEO + Analytics decisions
- `docs/adr/0003-vps-deployment.md` — VPS deployment decisions

Chi tiết deploy: `docs/vps-deployment-guide.md`
