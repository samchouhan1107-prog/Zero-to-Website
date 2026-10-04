#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f server.ts || ! -f package-lock.json ]]; then
  echo "Run this script from the WebZoneBW project root." >&2
  exit 1
fi

: "${VPS_HOST:?Set VPS_HOST to the hostname or IP of your VPS}"
: "${VPS_USER:?Set VPS_USER to the SSH deployment account}"

if [[ ! "$VPS_HOST" =~ ^[A-Za-z0-9.-]+$ ]]; then
  echo "VPS_HOST must be a hostname or IPv4 address." >&2
  exit 1
fi

if [[ ! "$VPS_USER" =~ ^[A-Za-z_][A-Za-z0-9_-]*$ ]]; then
  echo "VPS_USER must be a valid Unix account name." >&2
  exit 1
fi

if ! command -v ssh >/dev/null || ! command -v rsync >/dev/null; then
  echo "Install ssh and rsync before deploying." >&2
  exit 1
fi

npm run build
test -f dist/server.cjs

rsync -az \
  --exclude='.git/' \
  --exclude='node_modules/' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='/data/' \
  ./ "$VPS_USER@$VPS_HOST:/opt/webzonebw/"

ssh "$VPS_USER@$VPS_HOST" \
  'cd /opt/webzonebw && npm ci --omit=dev && sudo -n systemctl restart webzonebw-api'

echo "WebZoneBW API deployed to $VPS_HOST."
