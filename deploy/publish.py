#!/usr/bin/env python3
"""Publish the static site to the web host over FTP/FTPS — standard library only.

No dependencies, no install. Uploads exactly the tracked site files (from
`git ls-files`, minus repo/tooling files), creating remote folders as needed.

Usage:
  cp deploy/.env.example deploy/.env     # fill in FTP_HOST / FTP_USER / FTP_PASS
  python3 deploy/publish.py --dry-run    # list what would upload; transfer nothing
  python3 deploy/publish.py              # upload (overwrites; never deletes)
  python3 deploy/publish.py --prune      # upload, then delete remote files not present locally

deploy/.env is gitignored, so credentials never get committed.
"""
import sys
import ftplib
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV = ROOT / "deploy" / ".env"


def load_env(path):
    if not path.exists():
        sys.exit(f"error: {path} not found. Copy deploy/.env.example to deploy/.env and fill it in.")
    cfg = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, val = line.split("=", 1)
        cfg[key.strip()] = val.strip().strip('"').strip("'")
    return cfg


def included(rel):
    if rel in ("README.md", ".gitignore"):
        return False
    if rel.startswith("deploy/"):
        return False
    if rel.endswith(".local.md"):
        return False
    if rel == "web.config" or rel.endswith("/web.config"):
        return False
    return True


def local_files():
    out = subprocess.run(
        ["git", "-C", str(ROOT), "ls-files"],
        capture_output=True, text=True, check=True,
    ).stdout
    return sorted(f for f in out.splitlines() if f and included(f))


def connect(cfg):
    proto = cfg.get("FTP_PROTOCOL", "ftp").lower()
    port = int(cfg.get("FTP_PORT", "21"))
    cls = ftplib.FTP_TLS if proto == "ftps" else ftplib.FTP
    ftp = cls(timeout=30)
    ftp.connect(cfg["FTP_HOST"], port)
    ftp.login(cfg["FTP_USER"], cfg["FTP_PASS"])
    if proto == "ftps":
        ftp.prot_p()
    ftp.set_pasv(True)
    return ftp


def ensure_dir(ftp, abspath, made):
    """Create each segment of a remote directory path, ignoring 'already exists'."""
    path = ""
    for seg in [p for p in abspath.split("/") if p]:
        path += "/" + seg
        if path in made:
            continue
        try:
            ftp.mkd(path)
        except ftplib.error_perm:
            pass  # already exists or no-op
        made.add(path)


def remote_files(ftp, base):
    """Recursively list remote file paths under base (uses MLSD)."""
    found = []

    def walk(path):
        try:
            entries = list(ftp.mlsd(path))
        except Exception as exc:  # MLSD unsupported or path missing
            raise RuntimeError(f"cannot list {path or '/'}: {exc}")
        for name, facts in entries:
            if name in (".", ".."):
                continue
            full = (path.rstrip("/") + "/" + name) if path else "/" + name
            kind = facts.get("type", "")
            if kind in ("dir", "cdir", "pdir"):
                if kind == "dir":
                    walk(full)
            elif kind == "file":
                found.append(full)

    walk(base or "/")
    return found


def main():
    dry = "--dry-run" in sys.argv
    prune = "--prune" in sys.argv
    cfg = load_env(ENV)
    for key in ("FTP_HOST", "FTP_USER", "FTP_PASS"):
        if not cfg.get(key):
            sys.exit(f"error: set {key} in deploy/.env")

    base = "/" + cfg.get("FTP_REMOTE_DIR", "/").strip().strip("/")
    base = base.rstrip("/")  # "" means server root
    files = local_files()
    proto = cfg.get("FTP_PROTOCOL", "ftp")
    print(f"Publishing {len(files)} files -> {proto}://{cfg['FTP_HOST']}{base or '/'}")

    targets = {(base + "/" + rel) for rel in files}

    ftp = connect(cfg)
    try:
        # Verify the remote base directory exists (catches a wrong FTP_REMOTE_DIR early).
        try:
            ftp.cwd(base or "/")
        except ftplib.error_perm:
            sys.exit(f"error: remote dir {base or '/'} not found — check FTP_REMOTE_DIR in deploy/.env")

        made = set()
        for rel in files:
            abspath = base + "/" + rel
            rdir = abspath.rsplit("/", 1)[0]
            if dry:
                print("  would upload", rel)
                continue
            ensure_dir(ftp, rdir, made)
            with open(ROOT / rel, "rb") as fh:
                ftp.storbinary(f"STOR {abspath}", fh)
            print("  uploaded", rel)

        if prune:
            print("Prune: scanning remote for files not present locally...")
            try:
                existing = remote_files(ftp, base)
            except RuntimeError as exc:
                print(f"  prune skipped — {exc}")
                existing = []
            for rpath in existing:
                name = rpath.rsplit("/", 1)[-1]
                if name == "web.config":
                    continue  # never delete the IIS config
                if rpath not in targets:
                    if dry:
                        print("  would delete", rpath)
                    else:
                        try:
                            ftp.delete(rpath)
                            print("  deleted", rpath)
                        except ftplib.error_perm as exc:
                            print(f"  could not delete {rpath}: {exc}")
    finally:
        try:
            ftp.quit()
        except Exception:
            pass

    print("Dry run complete — nothing uploaded." if dry else "Done.")


if __name__ == "__main__":
    main()
