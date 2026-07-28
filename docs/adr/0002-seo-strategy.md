# ADR-0002: Chiến lược SEO + Analytics

**Status:** accepted
**Date:** 2026-07-28
**Deciders:** SanBayGo Agent + Human

---

## Context

SanBayGo là web app SPA (Vite + React) chạy trên VPS với nginx. Sản phẩm đang ở giai đoạn pre-revenue, chưa có analytics, chưa có URL routing, chưa có sitemap/robots. Không có ngân sách quảng cáo. Mục tiêu kinh doanh: xây dựng content authority + backlinks để trở thành nguồn tham khảo chính về xe buýt sân bay tại Việt Nam.

---

## Decisions

### 1. Deployment & Routing

**VPS + nginx.** React Router (client-side routing) được dùng để tạo URL thực cho các trang. nginx config:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Không dùng Vercel/Netlify. Không dùng SSR.

### 2. Analytics

**Google Analytics 4** cho mọi tracking. GA4 là tiêu chuẩn, tích hợp tốt nhất với Google Ads (dù hiện tại không chạy ads). Cookie consent required cho EU visitors (GDPR).

**Cookie consent banner** dạng minimal: "We use cookies to improve your experience" + Accept/Decline. GA4 chỉ fire sau khi user accept. Không dùng full GDPR modal — phù hợp với quy mô sản phẩm hiện tại.

### 3. Conversion Definition

Không có transaction funnel. "Conversion" = **Grab/Xanh SM deep link click** — user leaves site to book a ride. Đây là proxy metric cho product value. Không track form submit riêng (form submit là prerequisite, không phải goal).

### 4. Blog / Content Strategy

Blog posts là **static React pages** trong cùng Vite project (`web/src/pages/blog/`). Không dùng CMS riêng. Không dùng subdomain. Mỗi bài viết = một React component.

**Language:** Bilingual. Vietnamese là ngôn ngữ chính, English summary ở cuối mỗi bài viết. Lý do: target cả người Việt trong nước (primary) và du khách quốc tế (secondary).

**Authorship:** Agent viết drafts → human reviews. Không thuê freelancer trong giai đoạn này.

**Cadence:** Bulk publish 3–4 bài trước (tuần 1–2), sau đó duy trì 1 bài/tuần.

### 5. Landing Pages

3 landing pages riêng cho Google Ads (dù hiện tại chưa chạy ads — chuẩn bị sẵn sàng):

- `/han` — Hà Nội / Noi Bai, tập trung Bus 86
- `/sgn` — TP.HCM / Tân Sơn Nhất, tập trung Bus 109 + 152
- `/grab-vs-bus` — Compare page, khi nào nên bus, khi nào nên Grab

### 6. Sitemap

Manual, đơn giản. 5 trang cố định:

```
/ (home)
/han
/sgn
/grab-vs-bus
/privacy
/terms
```

Không auto-generate. Cập nhật thủ công mỗi khi thêm landing page mới.

### 7. Competitor Content

**Không** target competitor keywords (Grab, BusMap, Moovit) trong giai đoạn này. Lý do: không có ads budget, content authority tập trung vào own brand + informational queries. Grab/competitor conquesting hợp lý khi có ngân sách ads.

### 8. JSON-LD / Structured Data

**FAQPage schema** được auto-generate từ `LanguageContext.tsx` (nơi lưu cả 5 câu hỏi VI + EN). FAQ content đã tồn tại — chỉ cần inject JSON-LD script vào `<head>`.

**WebApplication schema** cho trang chủ.

Không có FAQPage riêng cho blog posts trong giai đoạn 1.

---

## Consequences

### Positive

- Cookie consent + GA4 setup tạo nền tảng cho future ads
- 3 landing pages + React Router = Google có thể index 5+ trang thay vì 1
- Bilingual content phục vụ cả 2 audience segments
- Landing pages chuẩn bị sẵn cho khi có budget ads

### Negative / Trade-offs

- Cookie banner có thể ảnh hưởng conversion rate (user phải click accept trước khi GA4 fire)
- Static blog pages trong Vite = mỗi bài viết là một React component, cần build lại để publish. Không có CMS = không có preview, không có draft workflow
- Sitemap manual = dễ bị lỗi thời khi thêm landing page mới

### Deferred

- Auto-generate sitemap (Vite plugin) — làm sau khi có >5 blog posts
- Google Business Profile — tuần 3–4
- Backlink outreach — tuần 4+

---

## References

- `docs/seo-ads-plan.md` v2 — chi tiết implementation plan
- `web/src/contexts/LanguageContext.tsx` — FAQ content source
- `docs/feature_list.json` — Feature A (grab-deep-link) confirmed done
