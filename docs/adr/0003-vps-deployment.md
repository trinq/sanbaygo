# ADR-0003: VPS Deployment với nginx + GitHub Actions

**Status:** accepted
**Date:** 2026-07-28
**Deciders:** SanBayGo Agent + Human

---

## Context

SanBayGo là static SPA (Vite + React) deploy trên VPS thay vì managed platform (Vercel/Netlify). Cần xác định deployment stack, CI/CD pipeline, và cách quản lý infrastructure.

---

## Decision

**VPS + nginx + GitHub Actions rsync + Let's Encrypt**

### Deployment Stack

| Layer | Technology | Notes |
|---|---|---|
| Infrastructure | VPS (self-hosted) | Ubuntu 22.04+, user-controlled |
| Web server | nginx | SPA routing via `try_files` |
| SSL | Let's Encrypt (certbot) | Auto-renewal, free |
| CI/CD | GitHub Actions | Build + rsync to VPS |
| Deploy protocol | rsync over SSH | Incremental, efficient |
| Build location | GitHub Actions | No local build required |

### Directory Structure

```
VPS: /home/ubuntu/sanbaygo/
  └── dist/  (Vite build output, served by nginx)
```

### CI/CD Flow

```
git push main
  → GitHub Actions: npm ci && npm run build
  → GitHub Actions: rsync dist/ → VPS:/home/ubuntu/sanbaygo
  → nginx serves files at sanbaygo.app
```

### GitHub Secrets Required

| Secret | Value |
|---|---|
| `VPS_HOST` | VPS IP address |
| `VPS_USER` | SSH username |
| `VPS_DEPLOY_PATH` | `/home/ubuntu/sanbaygo` |
| `VPS_SSH_PRIVATE_KEY` | Ed25519 private key for GitHub Actions |

### SSH Key Strategy

- Dedicated Ed25519 key `~/.ssh/id_ed25519_sanbaygo_github` cho GitHub Actions
- Không dùng key cá nhân
- Public key trong VPS `~/.ssh/authorized_keys`
- `PasswordAuthentication no` sau khi key hoạt động

---

## Considered Options

### Option A — VPS + nginx + GitHub Actions rsync ✅ (chosen)

**Pros:**
- Full control — user owns the infrastructure
- Không giới hạn bandwidth/requests như free tier của Vercel/Netlify
- Có thể deploy nhiều apps trên cùng VPS
- Hoàn toàn miễn phí (trừ VPS cost)
- Tốt cho học hỏi infrastructure

**Cons:**
- Tự quản lý server (security updates, uptime, monitoring)
- Không có auto-scaling
- Không có edge CDN mặc định
- Cần setup SSH keys, CI/CD manually

### Option B — Vercel

**Pros:**
- Zero-config, SPA routing built-in
- Edge CDN global
- Auto-deploy from GitHub
- Free tier generous

**Cons:**
- Giới hạn free tier (100GB bandwidth/month)
- Không control infrastructure
- Cầnpaid plan nếu traffic tăng
- Không hỗ trợ custom server config nếu cần

### Option C — Netlify

**Pros:**
- Tương tự Vercel, drop-in deploy
- Form handling, identity features

**Cons:**
- Tương tự Vercel cons
- Không có free tier cho commercial use

### Option D — Docker + self-hosted runner

**Pros:**
- Reproducible environment
- Có thể dùng GitHub Actions self-hosted runner

**Cons:**
- Overhead không cần thiết cho static SPA
- Complexity cao hơn
- Docker trên VPS thêm layer không cần thiết

---

## Consequences

### Positive

- Full control over infrastructure
- Không có chi phí platform (chỉ có VPS cost)
- Có thể mở rộng (add API server, database trên cùng VPS nếu cần)
- Tốt cho việc học hỏi DevOps

### Negative / Trade-offs

- Tự quản lý security updates — cần chạy `apt update && apt upgrade` định kỳ
- Không có auto-scaling — nếu traffic spike, có thể down
- Không có edge CDN — latency cao hơn cho users ở xa Việt Nam
- Uptime phụ thuộc vào VPS provider

### Deferred

- Monitoring/alerting (Uptime Kuma, Grafana) — tuần sau nếu cần
- CDN (Cloudflare) — tốt cho global latency, làm sau nếu traffic tăng
- Multiple environments (staging vs production) — chỉ cần khi có team

---

## nginx Configuration

```nginx
server {
    listen 80;
    server_name sanbaygo.app www.sanbaygo.app;
    return 301 https://sanbaygo.app$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.sanbaygo.app;
    ssl_certificate /etc/letsencrypt/live/sanbaygo.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sanbaygo.app/privkey.pem;
    return 301 https://sanbaygo.app$request_uri;
}

server {
    listen 443 ssl http2;
    server_name sanbaygo.app;

    root /home/ubuntu/sanbaygo;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/sanbaygo.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sanbaygo.app/privkey.pem;

    # SPA routing — critical for React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets (1 year)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## References

- `docs/vps-deployment-guide.md` — step-by-step deployment guide
- `scripts/deploy.sh` — manual deploy script
- `.github/workflows/deploy.yml` — GitHub Actions workflow
