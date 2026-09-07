#!/usr/bin/env python3
"""Emit a players + roster_profile-only TWO·DEEP refresh migration.

Reuses build_listed + roster_profile from import-user-cfb.py.
Does not truncate games / rankings / recruiting / teams and does not write rankings.
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMPORT = ROOT / "scripts" / "import-user-cfb.py"


def main() -> int:
    cmd = [sys.executable, str(IMPORT), "--players-roster-only", *sys.argv[1:]]
    return subprocess.call(cmd)


if __name__ == "__main__":
    raise SystemExit(main())
