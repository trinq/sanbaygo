# Cloudflare Deployment — SanBayGo

**Ngày truy cập primary sources:** 2026-07-31
**Tác giả:** research sub-agent (được dispatch từ session review-code) + parent agent hoàn thiện.
**Phạm vi:** Chỉ trả lời câu hỏi "project SanBayGo hiện tại deploy/upload lên Cloudflare được không?" — **không sửa code**.

## TL;DR

| Phần của project | Deploy được lên Cloudflare? | Target khuyến nghị | Ghi chú |
|---|---|---|---|
| `web/` (Vite + React SPA, output `web/dist/`) | **Có** | Cloudflare **Pages** (Direct Upload hoặc Git integration) | Framework preset đã có sẵn: `npm run build` → `dist`. SPA routing tự động (không cần `_routes.json` nếu không dùng Pages Functions). |
| `app/` (Expo Router / React Native) | **Không (trực tiếp)** | Expo EAS Build / App Store / Google Play | Là mobile app native, không host được trên Cloudflare web hosting. |
| `api/` (Express, optional theo `init.sh`) | **Không khuyến nghị** dùng trực tiếp | Cloudflare **Workers** (nếu cần chuyển) | Express Node server không chạy trên Workers runtime; phải port sang Hono/itty-router hoặc dùng Pages Functions. Hiện AGENTS.md nói MVP "no backend" và `init.sh` coi `api/` là optional. |
| `core/` (pure TS calculation engine + static data) | **Không phải runtime** | N/A | Build-time consumer của `web/`; không cần host riêng. |

**Kết luận ngắn:** **Có, `web/` deploy được lên Cloudflare Pages theo preset chính thức, không cần đổi code.** `app/` (Expo) không phải web host — sẽ đi theo Expo EAS/App/Play Store. `api/` không cần thiết theo AGENTS.md; nếu sau này cần backend thì port sang Workers, không đẩy Express lên Pages.

## Primary sources (đã đọc, ngày 2026-07-31)

| URL | Tiêu đề | Dùng cho |
|---|---|---|
| https://developers.cloudflare.com/pages/configuration/build-configuration/ | "Build configuration · Cloudflare Pages docs" | Bảng framework presets — khẳng định **React (Vite)** → `npm run build` + `dist`. |
| https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/ | "Vite 3 · Cloudflare Pages docs" | Quy trình import Git → set build/output → `*.pages.dev`. |
| https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/ | "React · Cloudflare Pages docs" | Quy trình tương tự cho React; dùng `create-cloudflare` C3 nếu muốn. |
| https://developers.cloudflare.com/pages/get-started/direct-upload/ | "Direct Upload · Cloudflare Pages docs" | Lệnh `npx wrangler pages deploy <DIRECTORY>` cho upload thủ công. |
| https://developers.cloudflare.com/pages/get-started/git-integration/ | "Git integration guide · Cloudflare Pages docs" | Kết nối GitHub repo, Root directory cho monorepo. |
| https://developers.cloudflare.com/pages/configuration/serving-pages/ | "Serving Pages · Cloudflare Pages docs" | SPA rendering tự động khi **không có `404.html` top-level**. |
| https://developers.cloudflare.com/pages/functions/routing/ | "Routing · Cloudflare Pages docs" | `_routes.json` chỉ cần khi có Pages Functions; project này không có. |
| https://developers.cloudflare.com/pages/platform/limits/ | "Limits · Cloudflare Pages docs" | Free plan: 1 build tại một thời điểm, 500 builds/tháng, custom domain, static requests unlimited. |
| https://developers.cloudflare.com/pages/functions/pricing/ | "Pricing · Cloudflare Pages docs" | Static asset requests **free & unlimited** trên mọi plan. |
| https://developers.cloudflare.com/workers/wrangler/commands/pages/ | "Pages · Cloudflare Workers docs" | Tham chiếu lệnh `wrangler pages deploy [DIRECTORY] --project-name=<…>`. |
| https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/ | "Single Page Application (SPA) · Cloudflare Workers docs" | Phương án Workers + assets SPA thay thế (nếu muốn migrate). |

Repo sources đối chiếu:

- `web/package.json` — script `build` = `tsc && vite build` (chạy TS check rồi Vite build).
- `web/vite.config.mts` — output mặc định `web/dist/`; plugin tự sinh `sitemap.xml` trong `closeBundle`.
- `AGENTS.md` — MVP "fully client-side … No Backend, static data only".
- `init.sh` — `api/` là optional trong local dev; root + web + core là bắt buộc.
- `docs/adr/0003-vps-deployment.md` — ADR hiện hành chọn VPS + nginx; có ghi chú "CDN (Cloudflare) — tốt cho global latency, làm sau nếu traffic tăng".
- `docs/vps-deployment-guide.md` — hướng dẫn triển khai VPS hiện tại.
- `research/domain-name-brief.md` — convention `research/` đã tồn tại (file domain-name-brief.md), nhưng báo cáo này đặt dưới `docs/research/` cho dễ khám phá từ `docs/`.

## Build & output dự kiến

- **Build command:** `npm run build` (trong `web/`) — chạy `tsc && vite build`. Đã verify `tsc` exit 0 ở session này.
- **Build output directory:** `web/dist/` (Vite default; `web/vite.config.mts` không override).
- **Artifact mong đợi:** `web/dist/index.html` + bundle hashed (`assets/*.js`, `assets/*.css`) + `public/` được copy kèm. `sitemap.xml` được sinh cuối `closeBundle` và nằm trong `dist/sitemap.xml`.
- **Node version:** Pages build mặc định Node 20 (đã khớp với workflow hiện tại `.github/workflows/deploy.yml`).

## Cách deploy lên Cloudflare (hai con đường đều được)

### A. Git integration (khuyến nghị cho production dài hạn)

Dashboard Cloudflare → **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository** → chọn repo.

Trong **Set up builds and deployments**:

| Field | Giá trị |
|---|---|
| Framework preset | `React (Vite)` (Pages sẽ tự điền `npm run build` + `dist`) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory (advanced) | `web` ← **bắt buộc** vì repo là monorepo (Pages mặc định lấy root) |
| Environment variables | _(để trống cho MVP — không có env runtime theo AGENTS.md)_ |

Sau khi Save and Deploy, project chạy tại `<name>.pages.dev`. Mỗi push lên nhánh đã cấu hình sẽ rebuild; PR mở preview deployment riêng.

### B. Direct Upload bằng Wrangler (thuận tiện cho staging / test nhanh)

```bash
# Local: build rồi upload
cd web
npm ci
npm run build
npx wrangler pages deploy dist --project-name=sanbaygo-web
```

Yêu cầu: `CLOUDFLARE_ACCOUNT_ID` + Cloudflare API token trong CI secret nếu chạy từ GitHub Actions (xem hướng dẫn `cloudflare/wrangler-action@v3`).

Cũng có thể khai báo `wrangler.toml` / `wrangler.jsonc` ở `web/` với `pages_build_output_dir = "./dist"` để `wrangler pages deploy` (không cần truyền tham số directory).

## Giới hạn & lưu ý thực tế

### Giới hạn của Cloudflare Pages (Free plan)
- 1 build tại một thời điểm; **500 builds/tháng**; build timeout 20 phút.
- **Static requests unlimited & free**; nếu thêm Pages Functions thì requests tính vào Workers Free 100k/ngày.
- Tối đa **100 custom domains** mỗi project (đủ cho frylane.com và có thể kèm www/subdomain).
- **20.000 files** / project, mỗi file ≤ **25 MiB** — bundle Vite của SanBayGo (`web/dist/` sau build) đâu đó vài chục file, không gần ngưỡng.
- Repo SanBayGo hiện đẩy khoảng 1–5 lần/ngày (ước lượng từ cadence commit trong `git log`) → còn rất xa 500 builds/tháng.

### SPA routing
- Web là React SPA với React Router (`web/src/seo/pageRegistry.ts` + `react-router-dom`). Pages tự nhận diện SPA khi **không có file `404.html` top-level** trong build output. Sau `npm run build`, `web/dist/` của project này có `index.html` và không có `404.html` riêng → SPA fallback tự động hoạt động — **không cần `_routes.json`**.
- Nếu sau này thêm Pages Functions, cần khai `_routes.json` để loại trừ các route asset khỏi Function invocation (giữ free unlimited static). Hiện chưa có Functions nên bước này chưa cần.

### Build pipeline
- Workflow hiện tại (`.github/workflows/deploy.yml`) đã có sẵn: `npm ci` → `tsc --noEmit` → `npm run build` → upload artifact `web/dist/`. Có thể **tái sử dụng** y nguyên cho Pages (chỉ đổi bước deploy cuối).
- Node 20 đã khớp với Pages build image mặc định.

### Env / secrets / SSR
- AGENTS.md nói MVP "fully client-side, no API calls, no auth, no data persistence, static data only" → **không cần biến môi trường runtime** hay secrets cho Pages deployment.
- Pages không chạy SSR Node; toàn bộ tính toán (`calculateTrip` …) chạy trong trình duyệt. Khớp với kiến trúc hiện tại.

### Conflict với ADR hiện hành
- `docs/adr/0003-vps-deployment.md` chọn VPS + nginx, có ghi chú "Cloudflare CDN làm sau nếu traffic tăng". Việc đẩy web lên Pages song song (hoặc thay thế) là một quyết định cần ADR mới; báo cáo này **không tự ý thay đổi** hướng đi. Hai lựa chọn khả dĩ:
  - (1) **Pages-only**: bỏ VPS, dùng Cloudflare Pages trực tiếp cho `frylane.com`.
  - (2) **Hybrid**: VPS giữ nguyên cho `api/` (nếu bật lại), đẩy `web/` static qua Pages trỏ domain về VPS hoặc ngược lại.
  - (3) **CDN-in-front**: giữ VPS, bật Cloudflare proxy trước VPS (Free plan Cloudflare hỗ trợ), không cần Pages. Đây là option nhẹ nhất về mặt thay đổi.

### `app/` (Expo) — không host trên Cloudflare
- Là React Native; build artifact là `.apk`/`.aab`/`.ipa` qua Expo EAS hoặc Xcode/Android Studio.
- Cloudflare không host mobile app binary. Đường đi riêng: EAS Build → App Store / Google Play. Không có thay đổi gì nếu chỉ chuyển web.

### `api/` (Express, optional)
- Hiện không có signal rằng MVP dùng backend (AGENTS.md "no backend"). Nếu sau này bật lại:
  - Express Node server **không chạy trực tiếp** trên Workers runtime.
  - Lựa chọn: (a) port sang **Cloudflare Workers** (Hono/itty-router); (b) giữ Express trên VPS theo ADR 0003 và bật Cloudflare CDN phía trước.
  - Pages Functions (JavaScript / TypeScript) chỉ phù hợp cho endpoint nhẹ — không thay thế Express + WebSocket.

## Checklist triển khai (Pages, con đường A)

1. **Quyết định hướng đi qua ADR** (Pages-only / Hybrid / CDN-in-front). Báo cáo này không tự quyết.
2. Tạo Pages project trong dashboard, kết nối GitHub repo.
3. Đặt **Root directory = `web`** (Pages build mặc định ở root, đây là bướm dễ quên với monorepo).
4. Build command = `npm run build`; output = `dist`. Chọn framework preset **React (Vite)** nếu có (Pages sẽ tự điền).
5. **Không cần** thêm `_routes.json` hay Pages Functions.
6. **Không cần** env vars cho MVP.
7. Kiểm tra: push một commit → build → xem preview URL `<branch>.<project>.pages.dev`.
8. Gắn custom domain (`frylane.com` + `www.frylane.com`) trong tab **Custom domains** của project; Pages sẽ tự cấp CNAME.
9. Sau khi ổn định, cập nhật `.github/workflows/deploy.yml` (hoặc thêm workflow mới) để deploy qua Pages; giữ workflow VPS nếu vẫn dùng VPS cho `api/`/khác.
10. Cập nhật `wiki/pages/tooling.md` (`last_verified` mới + đoạn deployment) và `wiki/pages/decisions.md` (tham chiếu ADR mới nếu có).

## Các phần chưa xác minh (caveats)

- Chưa thực sự chạy `wrangler pages deploy` trên project này (chưa có account/test project); mọi phát biểu dựa trên tài liệu chính thức Cloudflare đã trích dẫn ở trên.
- Chưa xác minh kích thước `web/dist/` sau build trong session này (chưa chạy `npm run build` cho `web/`); chỉ xác minh `npx tsc --noEmit` exit 0.
- Chưa xem xét vấn đề SEO/sitemap khi chuyển host — Pages phục vụ file tĩnh nguyên vẹn, nên `sitemap.xml` sinh trong `closeBundle` sẽ tiếp tục chạy được, nhưng cần verify URL host khớp với `SITE_ORIGIN` (file `web/src/seo/pageRegistry.ts`).
- Chưa xem xét analytics / Cloudflare Web Analytics — không nằm trong scope câu hỏi.

## Tài liệu tham chiếu bổ sung (không truy cập, chỉ liệt kê)

- Cloudflare Workers limits: https://developers.cloudflare.com/workers/platform/limits/ — chỉ cần nếu sau này chuyển `api/` sang Workers.
- `web/` build script chi tiết: `web/package.json` (`build = tsc && vite build`) — đã đọc.