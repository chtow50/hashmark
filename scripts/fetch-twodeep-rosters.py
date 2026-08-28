#!/usr/bin/env python3
"""Pull 2026 two-deeps from thetwodeep.com and write data/twodeep-rosters.json."""
from __future__ import annotations

import json
import re
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")
OUT = ROOT / "data" / "twodeep-rosters.json"
SEED = ROOT / "scripts" / "generate-cfb-seed.mjs"

UA = "Mozilla/5.0 (compatible; HASHMARK/1.0; +https://grok.com)"
ALIASES = {
    "usf": ["south-florida"],
    "app-state": ["appalachian-state"],
    "utsa": ["texas-san-antonio"],
    "uconn": ["connecticut"],
}

SKIP_POS = {
    "K", "KO", "PK", "P", "PT", "LS", "KR", "PR", "KOR", "PRN", "H", "HLD",
}

POS_NORM = {
    "WR-SL": "SLOT",
    "SL": "SLOT",
    "SLOT": "SLOT",
    "WR-H": "SLOT",
    "SLWR": "SLOT",
    "X": "WR-X",
    "LWR": "WR-X",
    "Z": "WR-Z",
    "RWR": "WR-Z",
    "TB": "RB",
    "HB": "RB",
    "LE": "DE",
    "RE": "DE",
    "NG": "NT",
    "MIKE": "MLB",
    "WILL": "WLB",
    "NCB": "NB",
    "NICK": "NB",
    "NICKEL": "NB",
    "STAR": "NB",
}

OFF_POS = {
    "QB", "RB", "FB", "WR", "WR-X", "WR-Z", "SLOT", "TE",
    "LT", "LG", "C", "RG", "RT", "OT", "OG", "OL",
}

STATE_NAME = {
    "alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR",
    "california": "CA", "colorado": "CO", "connecticut": "CT", "delaware": "DE",
    "florida": "FL", "georgia": "GA", "hawaii": "HI", "hawai'i": "HI",
    "idaho": "ID", "illinois": "IL", "indiana": "IN", "iowa": "IA",
    "kansas": "KS", "kentucky": "KY", "louisiana": "LA", "maine": "ME",
    "maryland": "MD", "massachusetts": "MA", "michigan": "MI", "minnesota": "MN",
    "mississippi": "MS", "missouri": "MO", "montana": "MT", "nebraska": "NE",
    "nevada": "NV", "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM",
    "new york": "NY", "north carolina": "NC", "north dakota": "ND", "ohio": "OH",
    "oklahoma": "OK", "oregon": "OR", "pennsylvania": "PA", "rhode island": "RI",
    "south carolina": "SC", "south dakota": "SD", "tennessee": "TN", "texas": "TX",
    "utah": "UT", "vermont": "VT", "virginia": "VA", "washington": "WA",
    "west virginia": "WV", "wisconsin": "WI", "wyoming": "WY",
    "district of columbia": "DC", "washington dc": "DC",
}


def our_slugs() -> list[str]:
    text = SEED.read_text()
    m = re.search(r"const TEAMS = \[([\s\S]*?)\];\n\nconst GAMES", text)
    if not m:
        raise SystemExit("could not parse TEAMS from generate-cfb-seed.mjs")
    return re.findall(r'\n  \["([^"]+)"', m.group(1))


def parse_json_at(s: str, i: int):
    dec = json.JSONDecoder()
    obj, end = dec.raw_decode(s[i:])
    return obj, i + end


def extract_depth_chart(html: str):
    marker = "self.__next_f.push("
    start = 0

    def walk(obj):
        if isinstance(obj, dict):
            dc = obj.get("depth_chart")
            if isinstance(dc, list) and dc:
                return obj
            for v in obj.values():
                found = walk(v)
                if found:
                    return found
        elif isinstance(obj, list):
            for v in obj:
                found = walk(v)
                if found:
                    return found
        return None

    while True:
        i = html.find(marker, start)
        if i < 0:
            return None
        try:
            obj, _ = parse_json_at(html, i + len(marker))
        except json.JSONDecodeError:
            start = i + len(marker)
            continue
        start = i + len(marker)
        if not (isinstance(obj, list) and len(obj) >= 2 and isinstance(obj[1], str)):
            continue
        payload = obj[1]
        if "depth_chart" not in payload:
            continue
        colon = payload.find(":")
        if colon < 0:
            continue
        try:
            data = json.loads(payload[colon + 1 :])
        except json.JSONDecodeError:
            continue
        found = walk(data)
        if found:
            return found
    return None


def parse_height(h) -> int:
    if not h:
        return 73
    s = str(h).replace("″", '"').replace("’", "'").replace("′", "'")
    m = re.match(r"\s*(\d+)\s*['’]\s*(\d+)", s)
    if m:
        return int(m.group(1)) * 12 + int(m.group(2))
    m = re.match(r"\s*(\d+)\s*-\s*(\d+)", s)
    if m:
        return int(m.group(1)) * 12 + int(m.group(2))
    return 73


def parse_state(hometown: str | None) -> str:
    if not hometown:
        return "US"
    parts = [p.strip() for p in hometown.split(",") if p.strip()]
    token = parts[-1] if parts else hometown
    t = token.strip()
    if len(t) == 2 and t.isalpha():
        return t.upper()
    key = t.lower().replace(".", "")
    if key in STATE_NAME:
        return STATE_NAME[key]
    # "Hawai'i" etc
    key2 = key.replace("ʻ", "").replace("'", "")
    if key2 in STATE_NAME:
        return STATE_NAME[key2]
    if len(t) <= 3:
        return t.upper()
    return "XX"


def class_year(raw: str | None) -> str:
    if not raw:
        return "SO"
    s = str(raw).replace(" ", "")
    # keep a readable form: RS JR, JR/TR, FR
    s = str(raw).strip()
    return s[:12]


def unit_of(pos: str) -> str:
    return "OFF" if pos in OFF_POS else "DEF"


def players_from_chart(chart: list) -> list[dict]:
    # group by listed pos, take depth 1-2
    grouped: dict[str, list] = {}
    for group in chart or []:
        for p in group.get("players") or []:
            raw_pos = (p.get("pos") or p.get("listed", {}).get("pos_abb") or group.get("position") or "WR")
            raw_pos = str(raw_pos).upper()
            if raw_pos in SKIP_POS:
                continue
            pos = POS_NORM.get(raw_pos, raw_pos)
            if pos in SKIP_POS:
                continue
            slot = p.get("depth_slot") or 99
            rec = p.get("recruiting") or {}
            stars = rec.get("stars")
            if stars is None:
                stars = (p.get("ids") or {}).get("recruit_stars") or 3
            rating = rec.get("rating")
            if rating is None:
                rating = (p.get("ids") or {}).get("recruit_rating") or 0.82
            if rating and rating <= 1.5:
                rating = round(rating * 100, 2)
            else:
                rating = round(float(rating or 82), 2)
            item = {
                "name": p.get("name") or "Unknown",
                "jersey": int(p.get("jersey") or 0),
                "position": pos,
                "depth": int(slot),
                "classYear": class_year(p.get("class_2026")),
                "heightIn": parse_height(p.get("height")),
                "weightLbs": int(p.get("weight") or 210),
                "stars": int(stars or 3),
                "rating": min(99.9, max(60.0, float(rating))),
                "hometown": p.get("hometown") or "",
                "hometownState": parse_state(p.get("hometown")),
                "unit": unit_of(pos),
            }
            grouped.setdefault(pos, []).append(item)

    out = []
    seen = set()
    for pos, items in grouped.items():
        items.sort(key=lambda x: (x["depth"], x["name"]))
        kept = []
        for it in items:
            key = (it["name"].lower(), it["jersey"])
            if key in seen:
                continue
            if it["depth"] > 2 and len(kept) >= 2:
                continue
            if len(kept) >= 2:
                continue
            it["depth"] = len(kept) + 1
            kept.append(it)
            seen.add(key)
        out.extend(kept)
    return out


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html"})
    with urllib.request.urlopen(req, timeout=25) as resp:
        return resp.read().decode("utf-8", "replace")


def load_team(slug: str) -> tuple[str, list[dict] | None, str]:
    keys = [slug] + [a for a in ALIASES.get(slug, []) if a != slug]
    last_err = ""
    for key in keys:
        url = f"https://www.thetwodeep.com/college/{key}"
        try:
            html = fetch(url)
        except urllib.error.HTTPError as e:
            last_err = f"HTTP {e.code} {url}"
            continue
        except Exception as e:
            last_err = f"{type(e).__name__} {url}: {e}"
            continue
        data = extract_depth_chart(html)
        if not data:
            last_err = f"no depth_chart in {url}"
            continue
        players = players_from_chart(data.get("depth_chart") or [])
        if not players:
            last_err = f"empty two-deep {url}"
            continue
        return slug, players, key
    return slug, None, last_err


def main():
    slugs = our_slugs()
    print(f"fetching {len(slugs)} teams from thetwodeep.com", flush=True)
    results: dict[str, list] = {}
    failures: dict[str, str] = {}
    with ThreadPoolExecutor(max_workers=5) as pool:
        futs = {pool.submit(load_team, s): s for s in slugs}
        done = 0
        for fut in as_completed(futs):
            slug, players, meta = fut.result()
            done += 1
            if players:
                results[slug] = players
                qbs = [p for p in players if p["position"] == "QB"]
                qb1 = next((p["name"] for p in qbs if p["depth"] == 1), "?")
                print(f"  [{done}/{len(slugs)}] {slug:20} {len(players):3} players  QB1 {qb1}", flush=True)
            else:
                failures[slug] = meta
                print(f"  [{done}/{len(slugs)}] FAIL {slug}: {meta}", flush=True)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"source": "https://www.thetwodeep.com", "fetched": time.strftime("%Y-%m-%d"), "teams": results, "failures": failures}, indent=2))
    print(f"wrote {OUT}  ok={len(results)} fail={len(failures)}")
    if failures:
        sys.exit(2)


if __name__ == "__main__":
    main()
