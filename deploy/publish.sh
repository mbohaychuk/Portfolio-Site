#!/usr/bin/env bash
#
# Publish the static site to the web host over FTP/FTPS.
#
# Usage:
#   cp deploy/.env.example deploy/.env   # then fill in credentials
#   ./deploy/publish.sh                  # mirror the site up
#   ./deploy/publish.sh --dry-run        # show what would change, upload nothing
#
# Requires lftp (Debian/Ubuntu: sudo apt-get install lftp).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT/deploy/.env"

if ! command -v lftp >/dev/null 2>&1; then
    echo "error: lftp is not installed. Install it with: sudo apt-get install lftp" >&2
    exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
    echo "error: $ENV_FILE not found. Copy deploy/.env.example to deploy/.env and fill it in." >&2
    exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

: "${FTP_HOST:?set FTP_HOST in deploy/.env}"
: "${FTP_USER:?set FTP_USER in deploy/.env}"
: "${FTP_PASS:?set FTP_PASS in deploy/.env}"
: "${FTP_REMOTE_DIR:=/}"
: "${FTP_PROTOCOL:=ftp}"

DRY_RUN=""
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN="--dry-run"
    echo "(dry run — no files will be uploaded)"
fi

SSL_ALLOW="false"
[[ "$FTP_PROTOCOL" == "ftps" ]] && SSL_ALLOW="true"

echo "Publishing $ROOT/  ->  $FTP_PROTOCOL://$FTP_HOST$FTP_REMOTE_DIR"

# mirror -R : reverse mirror (local -> remote)
# --delete  : remove remote files no longer present locally
# Excludes keep repo/tooling/scratch files off the public host.
lftp <<LFTP
set ftp:ssl-allow $SSL_ALLOW
set ssl:verify-certificate no
set net:max-retries 2
set net:timeout 20
open -u "$FTP_USER","$FTP_PASS" "$FTP_PROTOCOL://$FTP_HOST"
mirror -R --delete --only-newer --verbose $DRY_RUN \
    --exclude-glob .git/ \
    --exclude-glob deploy/ \
    --exclude-glob .playwright-mcp/ \
    --exclude-glob .claude/ \
    --exclude-glob node_modules/ \
    --exclude-glob '*.local.md' \
    --exclude-glob 'verify-*.png' \
    --exclude-glob 'portfolio-*.png' \
    --exclude-glob 'web.config' \
    --exclude-glob 'web.*.config' \
    --exclude README.md \
    --exclude CLAUDE.md \
    --exclude AGENTS.md \
    --exclude .gitignore \
    "$ROOT/" "$FTP_REMOTE_DIR"
bye
LFTP

echo "Done."
