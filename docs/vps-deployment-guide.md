# SanBayGo — VPS Deployment Guide

> Mục tiêu: deploy `web/dist/` lên VPS (nginx) từ GitHub Actions
> Hệ điều hành: Ubuntu 22.04+
> Web server: nginx
> SSL: Let's Encrypt (certbot)

---

## Tổng quan kiến trúc

```
GitHub repo
  └── push to main
        └── GitHub Actions workflow (.github/workflows/deploy.yml)
              ├── Build (npm ci && npm run build)
              └── Deploy (rsync → VPS)
                    └── nginx serves dist/
                          └── HTTPS via Let's Encrypt
```

**Các bước chính:**
1. Tạo SSH key cho GitHub Actions
2. Copy public key lên VPS
3. Thêm GitHub Secrets
4. Setup nginx trên VPS
5. Setup Let's Encrypt (sau khi có domain)
6. Test deployment

---

## Bước 1 — Tạo SSH Key cho GitHub Actions

Trên **máy local** (không phải VPS):

```bash
ssh-keygen -t ed25519 -C "github-actions@sanbaygo" -f ~/.ssh/id_ed25519_sanbaygo_github
```

> Dùng `ed25519` thay vì `rsa` — ngắn hơn, bảo mật hơn.

Output sẽ có 2 files:
- `~/.ssh/id_ed25519_sanbaygo_github` — **Private key** (cho GitHub Secrets)
- `~/.ssh/id_ed25519_sanbaygo_github.pub` — **Public key** (cho VPS `authorized_keys`)

---

## Bước 2 — Thêm Public Key vào VPS

```bash
# Copy public key lên VPS
ssh-copy-id -i ~/.ssh/id_ed25519_sanbaygo_github.pub user@1.2.3.4
```

Hoặc thủ công:

```bash
# SSH vào VPS
ssh user@1.2.3.4

# Tạo thư mục .ssh nếu chưa có
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Thêm public key
cat >> ~/.ssh/authorized_keys << 'EOF'
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... github-actions@sanbaygo
EOF

# Phân quyền đúng
chmod 600 ~/.ssh/authorized_keys
```

> Thay `user` bằng username VPS của bạn (thường là `root` hoặc user thường).

**Test SSH key:**

```bash
ssh -i ~/.ssh/id_ed25519_sanbaygo_github user@1.2.3.4 "echo 'SSH key OK'"
```

Nếu không hỏi password → key hoạt động.

---

## Bước 3 — Thêm GitHub Secrets

Trên GitHub: repo → **Settings → Secrets and variables → Actions → New repository secret**

Thêm 4 secrets:

| Secret Name | Value | Example |
|---|---|---|
| `VPS_HOST` | IP của VPS | `1.2.3.4` |
| `VPS_USER` | SSH username | `ubuntu` hoặc `root` |
| `VPS_DEPLOY_PATH` | Path deploy trên VPS | `/home/ubuntu/sanbaygo` |
| `VPS_SSH_PRIVATE_KEY` | Nội dung private key | (copy toàn bộ file `~/.ssh/id_ed25519_sanbaygo_github`) |

**Cách lấy private key:**

```bash
cat ~/.ssh/id_ed25519_sanbaygo_github
```

Copy toàn bộ output (bao gồm `-----BEGIN OPENSSH PRIVATE KEY-----` và `-----END OPENSSH PRIVATE KEY-----`).

---

## Bước 4 — Tạo thư mục deploy trên VPS

```bash
# SSH vào VPS
ssh user@1.2.3.4

# Tạo thư mục deploy
mkdir -p /home/ubuntu/sanbaygo

# Đảm bảo nginx có quyền đọc
chmod 755 /home/ubuntu/sanbaygo

# Tạm test: tạo file index.html để verify nginx hoạt động
echo "Hello from SanBayGo VPS" | sudo tee /home/ubuntu/sanbaygo/index.html
```

---

## Bước 5 — Setup nginx

### 5.1 Cài nginx (nếu chưa có)

```bash
sudo apt update
sudo apt install nginx -y
```

### 5.2 Tạo nginx config

```bash
sudo nano /etc/nginx/sites-available/sanbaygo
```

Nội dung:

```nginx
# HTTP only (HTTPS sẽ thêm sau khi có cert)
server {
    listen 80;
    server_name _;  # IP hoặc domain

    root /home/ubuntu/sanbaygo;
    index index.html;

    # SPA routing: fallback về index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5.3 Enable site

```bash
sudo ln -s /etc/nginx/sites-available/sanbaygo /etc/nginx/sites-enabled/sanbaygo
sudo rm /etc/nginx/sites-enabled/default  # xóa default site
sudo nginx -t  # test config
sudo systemctl reload nginx
```

### 5.4 Test

```bash
# Từ máy local:
curl http://1.2.3.4/
# Output: "Hello from SanBayGo VPS"
```

Nếu thấy message → nginx hoạt động.

---

## Bước 6 — Trigger first deployment

```bash
# Push lên main branch (sẽ trigger GitHub Actions)
git add .github/workflows/deploy.yml scripts/deploy.sh
git commit -m "feat: add VPS deployment via GitHub Actions"
git push origin main
```

Vào GitHub → repo → **Actions** tab để xem progress.

### Nếu deploy fail

Kiểm tra logs trong GitHub Actions. Lỗi thường gặp:

**1. `rsync: connection unexpectedly closed`**
→ SSH key không đúng hoặc `authorized_keys` chưa setup đúng

**2. `Permission denied`**
→ `VPS_DEPLOY_PATH` không tồn tại hoặc user không có quyền ghi

**3. `sudo: no tty present`**
→ Deploy user cần quyền sudo để rsync. Thêm vào sudoers:

```bash
# Trên VPS
sudo visudo
# Thêm dòng:
ubuntu ALL=(ALL) NOPASSWD: /usr/bin/rsync
```

---

## Bước 7 — HTTPS với Let's Encrypt (sau khi có domain)

Khi domain `sanbaygo.app` đã trỏ A record về VPS:

```bash
# SSH vào VPS
ssh user@1.2.3.4

# Cài certbot
sudo apt install certbot python3-certbot-nginx -y

# Lấy certificate
sudo certbot --nginx -d sanbaygo.app -d www.sanbaygo.app
```

Certbot sẽ:
1. Xác minh domain
2. Tự động update nginx config thêm HTTPS
3. Redirect HTTP → HTTPS
4. Redirect www → non-www

**Auto-renewal** (certbot tự thêm cron job):

```bash
sudo certbot renew --dry-run
```

---

## Bước 8 — Final nginx config (sau HTTPS)

Sau khi certbot chạy, nginx config sẽ tự động có dạng:

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

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Bước 9 — Verify deployment

```bash
# Test từ máy local
curl https://sanbaygo.app

# Kiểm tra JS load đúng
curl -s https://sanbaygo.app/assets/ | grep js

# Kiểm tra SPA routing hoạt động
curl -s https://sanbaygo.app/ket-qua | grep "root"
# → Should return index.html content (nginx serves index.html for unknown routes)
```

---

## Troubleshooting

### `404 on /ket-qua`

→ `try_files $uri $uri/ /index.html;` không có trong nginx config. Thêm vào.

### Deploy được nhưng trang trắng

→ `root` path trong nginx config sai. Kiểm tra:

```bash
# Trên VPS
ls -la /home/ubuntu/sanbaygo/
# → Phải thấy index.html
```

### CSS/JS 404

→ `dist/` được upload nhưng không có thư mục `assets/`. Kiểm tra:

```bash
# Trên VPS
ls /home/ubuntu/sanbaygo/assets/
# → Phải thấy file JS và CSS
```

### GitHub Actions deploy bị timeout

→ Thêm `timeout-minutes: 10` vào job trong `deploy.yml` hoặc kiểm tra network.

---

## Security checklist

- [ ] SSH key riêng cho GitHub Actions (không dùng key cá nhân)
- [ ] `VPS_SSH_PRIVATE_KEY` trong GitHub Secrets (không hardcode)
- [ ] `VPS_USER` là user thường, không phải `root` nếu có thể
- [ ] SSH `PasswordAuthentication no` trong `/etc/ssh/sshd_config` (sau khi test key hoạt động)
- [ ] Firewall: chỉ mở port 22 (SSH), 80 (HTTP), 443 (HTTPS)

```bash
# UFW firewall setup
sudo ufw default deny incoming
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

---

## Files đã tạo

```
.github/workflows/deploy.yml    — GitHub Actions deployment workflow
scripts/deploy.sh              — Manual deploy script (optional)
docs/vps-deployment-guide.md   — This guide
```
