#!/bin/bash
# SanBayGo — Manual Deploy Script
# Usage: ./scripts/deploy.sh
# Requires: rsync, sshpass (or SSH key-based auth configured)
#
# Prerequisites on local machine:
#   1. npm install in web/
#   2. SSH key or sshpass configured for $VPS_HOST
#   3. Set environment variables or edit defaults below

set -e

# === CONFIGURATION (edit these) ===
VPS_HOST="${VPS_HOST:-}"
VPS_USER="${VPS_USER:-}"
VPS_DEPLOY_PATH="${VPS_DEPLOY_PATH:-/home/www/sanbaygo}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_rsa_vps_sanbaygo}"
# OR use password: VPS_PASS="yourpassword"
# If using password instead of key, install sshpass: brew install hudochenkov/sshpass/sshpass
# Then uncomment the RSYNC_CMD line using sshpass below
# VPS_PASS="${VPS_PASS:-}"

# === SANITY CHECKS ===
if [[ -z "$VPS_HOST" ]]; then
  echo "❌ VPS_HOST is not set. Set it via env var or edit this script."
  echo "   Example: VPS_HOST=1.2.3.4 ./scripts/deploy.sh"
  exit 1
fi

if [[ -z "$VPS_USER" ]]; then
  echo "❌ VPS_USER is not set. Set it via env var or edit this script."
  exit 1
fi

# === BUILD ===
echo "📦 Building web app..."
cd "$(dirname "$0")/.."
cd web
npm ci
npm run build

if [[ ! -d "dist" ]]; then
  echo "❌ Build failed — dist/ not found"
  exit 1
fi

# === DEPLOY ===
echo "🚀 Deploying to $VPS_USER@$VPS_HOST:$VPS_DEPLOY_PATH"

if [[ -n "${VPS_PASS:-}" ]]; then
  # Password-based rsync
  if ! command -v sshpass &> /dev/null; then
    echo "❌ sshpass not found. Install: brew install hudochenkov/sshpass/sshpass"
    exit 1
  fi
  sshpass -p "$VPS_PASS" rsync -avz --delete \
    --rsync-path="sudo rsync" \
    -e "ssh -o StrictHostKeyChecking=no" \
    dist/ "$VPS_USER@$VPS_HOST:$VPS_DEPLOY_PATH/"
else
  # SSH key-based rsync
  rsync -avz --delete \
    -e "ssh -i '$SSH_KEY' -o StrictHostKeyChecking=no" \
    dist/ "$VPS_USER@$VPS_HOST:$VPS_DEPLOY_PATH/"
fi

echo "✅ Deploy complete!"
echo "   App should be live at: http://$VPS_HOST"
