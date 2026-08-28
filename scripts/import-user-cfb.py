#!/usr/bin/env python3
"""Convert data/cfb.db (user CFBD/ESPN database) into HASHMARK migrations/0003_seed.sql.

Power rankings reimplement power_rankings.py DEFAULT_WEIGHTS in pure Python.
Two-deeps: TWO·DEEP listed charts when we have them; otherwise a CFBD projected
two-deep (rating then seniority) — labelled as an estimate, never invented names.
"""
from __future__ import annotations

import json
import math
import re
import sqlite3
import unicodedata
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "cfb.db"
TWODEEP_PATH = ROOT / "data" / "twodeep-rosters.json"
SEED_PATH = ROOT / "migrations" / "0003_seed.sql"
YEAR = 2026

WEIGHTS = {
    "talent": 1.5,
    "retention": 0.5,
    "trend": 1.0,
    "portal_net": 0.5,
    "prior_rating": 1.5,
}
TREND_YEAR_WEIGHTS = [0.4, 0.3, 0.2, 0.1]
ELO_SCALE = 55.0
HFA = 60.0
PTS_PER_ELO = 0.0534
BASE_ELO = 1500.0
STAR_RATING_FALLBACK = {5: 0.98, 4: 0.92, 3: 0.85, 2: 0.79}
UNRATED = 0.80

TEAM_NAME_ALIASES = {
    "hawaii": "hawai'i",
    "app state": "appalachian state",
    "ole miss": "mississippi",
    "southern miss": "southern mississippi",
    "uconn": "connecticut",
    "umass": "massachusetts",
    "utsa": "ut san antonio",
    "smu": "southern methodist",
    "pitt": "pittsburgh",
    "ul monroe": "louisiana monroe",
    "louisiana": "louisiana lafayette",
    "miami oh": "miami (oh)",
    "miami (oh)": "miami ohio",
    "san jose state": "san josé state",
    "texas am": "texas a&m",
    "nc state": "north carolina state",
}

CONF_MAP = {
    "American Athletic": "American",
    "Mid-American": "MAC",
    "Conference USA": "CUSA",
    "FBS Independents": "Independent",
}

MASCOT_FIX = {
    "charlotte": "49ers",
    "troy": "Trojans",
}

# slug -> (short, city, state, color1, color2) for programs HASHMARK did not already brand
EXTRA_META = {
    "arkansas-state": ("Arkansas St", "Jonesboro", "AR", "#e81018", "#000000"),
    "air-force": ("Air Force", "Colorado Springs", "CO", "#0033a0", "#8a8d8f"),
    "akron": ("Akron", "Akron", "OH", "#00285e", "#84754e"),
    "bowling-green": ("Bowling Grn", "Bowling Green", "OH", "#fe5000", "#4f2c1d"),
    "buffalo": ("Buffalo", "Buffalo", "NY", "#005bbb", "#ffffff"),
    "charlotte": ("Charlotte", "Charlotte", "NC", "#005035", "#a49665"),
    "coastal-carolina": ("Coastal", "Conway", "SC", "#006f71", "#a27752"),
    "delaware": ("Delaware", "Newark", "DE", "#00539f", "#ffd200"),
    "hawaii": ("Hawai'i", "Honolulu", "HI", "#024731", "#c8b18b"),
    "jacksonville-state": ("Jax State", "Jacksonville", "AL", "#b50538", "#ffffff"),
    "kennesaw-state": ("Kennesaw", "Kennesaw", "GA", "#000000", "#febc11"),
    "kent-state": ("Kent St", "Kent", "OH", "#002664", "#eaaa00"),
    "louisiana": ("Louisiana", "Lafayette", "LA", "#ce181e", "#ffffff"),
    "louisiana-tech": ("LA Tech", "Ruston", "LA", "#002f6c", "#e31c3d"),
    "marshall": ("Marshall", "Huntington", "WV", "#00b140", "#ffffff"),
    "massachusetts": ("UMass", "Amherst", "MA", "#881c1c", "#ffffff"),
    "nevada": ("Nevada", "Reno", "NV", "#002e62", "#ffffff"),
    "new-mexico": ("New Mexico", "Albuquerque", "NM", "#ba0c2f", "#a7a8aa"),
    "new-mexico-state": ("NM State", "Las Cruces", "NM", "#8c0b32", "#ffffff"),
    "old-dominion": ("ODU", "Norfolk", "VA", "#003057", "#7c878e"),
    "rice": ("Rice", "Houston", "TX", "#00205b", "#c1c6c8"),
    "san-jose-state": ("San José St", "San Jose", "CA", "#0055a2", "#e5a823"),
    "southern-miss": ("Southern Miss", "Hattiesburg", "MS", "#000000", "#ffc423"),
    "temple": ("Temple", "Philadelphia", "PA", "#9d2235", "#ffffff"),
    "troy": ("Troy", "Troy", "AL", "#8a2432", "#a2aaad"),
    "tulsa": ("Tulsa", "Tulsa", "OK", "#002d72", "#c5b783"),
    "uab": ("UAB", "Birmingham", "AL", "#1e6b52", "#c4d600"),
    "ul-monroe": ("UL Monroe", "Monroe", "LA", "#800029", "#b18444"),
    "utep": ("UTEP", "El Paso", "TX", "#ff8200", "#041e42"),
    "wyoming": ("Wyoming", "Laramie", "WY", "#492f24", "#ffc425"),
    "florida-atlantic": ("FAU", "Boca Raton", "FL", "#003366", "#cc0000"),
    "fiu": ("FIU", "Miami", "FL", "#081e3f", "#b6862c"),
    "georgia-southern": ("Ga Southern", "Statesboro", "GA", "#011e41", "#a3aaae"),
    "georgia-state": ("Georgia St", "Atlanta", "GA", "#0039a6", "#c60c30"),
    "middle-tennessee": ("Middle Tenn", "Murfreesboro", "TN", "#0066cc", "#ffffff"),
    "missouri-state": ("Missouri St", "Springfield", "MO", "#5e0009", "#ffffff"),
    "sam-houston": ("Sam Houston", "Huntsville", "TX", "#f47321", "#ffffff"),
    "western-kentucky": ("WKU", "Bowling Green", "KY", "#c60c30", "#ffffff"),
    "central-michigan": ("Central Mich", "Mount Pleasant", "MI", "#6a0032", "#ffc82e"),
    "eastern-michigan": ("Eastern Mich", "Ypsilanti", "MI", "#006633", "#ffffff"),
    "miami-oh": ("Miami (OH)", "Oxford", "OH", "#c41230", "#000000"),
    "northern-illinois": ("NIU", "DeKalb", "IL", "#ba0c2e", "#000000"),
    "ohio": ("Ohio", "Athens", "OH", "#00694e", "#ffffff"),
    "western-michigan": ("Western Mich", "Kalamazoo", "MI", "#6c4023", "#b5a167"),
    "oregon-state": ("Oregon St", "Corvallis", "OR", "#dc4405", "#000000"),
    "south-alabama": ("South Alabama", "Mobile", "AL", "#00205b", "#d52027"),
    "utah-state": ("Utah St", "Logan", "UT", "#0f2439", "#8b0000"),
}

SLUG_OVERRIDES = {
    "texas a&m": "texas-am",
    "app state": "app-state",
    "nc state": "nc-state",
    "miami (oh)": "miami-oh",
    "hawai'i": "hawaii",
    "ul monroe": "ul-monroe",
    "south florida": "usf",
    "florida international": "fiu",
    "ole miss": "ole-miss",
    "san josé state": "san-jose-state",
    "san jose state": "san-jose-state",
    "uconn": "uconn",
    "utsa": "utsa",
    "ucf": "ucf",
    "uab": "uab",
    "utep": "utep",
    "smu": "smu",
    "lsu": "lsu",
    "usc": "usc",
    "ucla": "ucla",
    "byu": "byu",
    "tcu": "tcu",
    "unlv": "unlv",
}

STATE_META = {
    "AL": ("Alabama", "South"), "AK": ("Alaska", "West"), "AZ": ("Arizona", "West"),
    "AR": ("Arkansas", "South"), "CA": ("California", "West"), "CO": ("Colorado", "West"),
    "CT": ("Connecticut", "Northeast"), "DE": ("Delaware", "Northeast"),
    "DC": ("District of Columbia", "Northeast"), "FL": ("Florida", "South"),
    "GA": ("Georgia", "South"), "HI": ("Hawaii", "West"), "ID": ("Idaho", "West"),
    "IL": ("Illinois", "Midwest"), "IN": ("Indiana", "Midwest"), "IA": ("Iowa", "Midwest"),
    "KS": ("Kansas", "Midwest"), "KY": ("Kentucky", "South"), "LA": ("Louisiana", "South"),
    "ME": ("Maine", "Northeast"), "MD": ("Maryland", "Northeast"),
    "MA": ("Massachusetts", "Northeast"), "MI": ("Michigan", "Midwest"),
    "MN": ("Minnesota", "Midwest"), "MS": ("Mississippi", "South"),
    "MO": ("Missouri", "Midwest"), "MT": ("Montana", "West"), "NE": ("Nebraska", "Midwest"),
    "NV": ("Nevada", "West"), "NH": ("New Hampshire", "Northeast"),
    "NJ": ("New Jersey", "Northeast"), "NM": ("New Mexico", "West"),
    "NY": ("New York", "Northeast"), "NC": ("North Carolina", "South"),
    "ND": ("North Dakota", "Midwest"), "OH": ("Ohio", "Midwest"), "OK": ("Oklahoma", "South"),
    "OR": ("Oregon", "West"), "PA": ("Pennsylvania", "Northeast"),
    "RI": ("Rhode Island", "Northeast"), "SC": ("South Carolina", "South"),
    "SD": ("South Dakota", "Midwest"), "TN": ("Tennessee", "South"), "TX": ("Texas", "South"),
    "UT": ("Utah", "West"), "VT": ("Vermont", "Northeast"), "VA": ("Virginia", "South"),
    "WA": ("Washington", "West"), "WV": ("West Virginia", "South"),
    "WI": ("Wisconsin", "Midwest"), "WY": ("Wyoming", "West"),
}

SIZE_DEFAULT = {
    "QB": (75, 215), "RB": (71, 210), "WR": (73, 195), "TE": (76, 245),
    "OL": (76, 310), "DL": (75, 280), "LB": (74, 235), "DB": (72, 190), "ST": (72, 195),
}

# Projected two-deep slots (position, unit). Two rows per listed slot → depth 1/2.
PROJECTED_SLOTS = [
    ("QB", "QB", "OFF"),
    ("RB", "RB", "OFF"),
    ("FB", "RB", "OFF"),
    ("WR-X", "WR", "OFF"),
    ("WR-Z", "WR", "OFF"),
    ("SLOT", "WR", "OFF"),
    ("TE", "TE", "OFF"),
    ("TE-H", "TE", "OFF"),
    ("LT", "OL", "OFF"),
    ("LG", "OL", "OFF"),
    ("C", "OL", "OFF"),
    ("RG", "OL", "OFF"),
    ("RT", "OL", "OFF"),
    ("LDE", "DL", "DEF"),
    ("RDE", "DL", "DEF"),
    ("DT", "DL", "DEF"),
    ("NT", "DL", "DEF"),
    ("MLB", "LB", "DEF"),
    ("WLB", "LB", "DEF"),
    ("OLB", "LB", "DEF"),
    ("LCB", "DB", "DEF"),
    ("RCB", "DB", "DEF"),
    ("FS", "DB", "DEF"),
    ("SS", "DB", "DEF"),
]

GROUP_NEED = defaultdict(int)
for _slot, grp, _u in PROJECTED_SLOTS:
    GROUP_NEED[grp] += 1  # two-deep filled later as pairs

CLASS_RANK = {"SR": 0, "GR": 0, "JR": 1, "SO": 2, "FR": 3, "RFR": 3}


def fold(s: str) -> str:
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    return s


def normalize(name: str) -> str:
    n = fold(name).lower().strip()
    for ch in ("'", "’", ".", "&"):
        n = n.replace(ch, "")
    n = n.replace("-", " ")
    n = re.sub(r"[^a-z0-9 ]+", " ", n)
    return re.sub(r"\s+", " ", n).strip()


def name_key(name: str) -> str:
    return re.sub(r"[^a-z]", "", fold(name).lower())


def slugify(school: str) -> str:
    key = normalize(school)
    if key in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[key]
    s = fold(school).lower().replace("&", "").replace("'", "")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def sql_str(v) -> str:
    if v is None:
        return "NULL"
    return "'" + str(v).replace("'", "''") + "'"


def sql_bool(v: bool) -> str:
    return "true" if v else "false"


def round2(n, d=2):
    if n is None:
        return 0.0
    p = 10 ** d
    return math.floor(float(n) * p + 0.5) / p


def mean(xs):
    xs = [x for x in xs if x is not None]
    return sum(xs) / len(xs) if xs else None


def stdev(xs):
    xs = [x for x in xs if x is not None]
    if len(xs) < 2:
        return None
    m = sum(xs) / len(xs)
    var = sum((x - m) ** 2 for x in xs) / (len(xs) - 1)
    return math.sqrt(var) if var > 0 else None


def zscore_map(values: dict) -> dict:
    nums = [v for v in values.values() if v is not None]
    m = mean(nums)
    s = stdev(nums)
    out = {}
    for k, v in values.items():
        if v is None or s is None or s == 0:
            out[k] = 0.0
        else:
            out[k] = (v - m) / s
    return out


def to_247(rating, stars) -> float:
    if rating is not None:
        return round2(float(rating) * 100, 2)
    if stars in STAR_RATING_FALLBACK:
        return round2(STAR_RATING_FALLBACK[stars] * 100, 2)
    return 80.0


def parse_jersey(v):
    if v is None or v == "":
        return None
    m = re.search(r"\d+", str(v))
    return int(m.group()) if m else None


def parse_class(v) -> str:
    if not v:
        return "SO"
    s = str(v).upper()
    if "SR" in s or s in ("GR", "GS"):
        return "SR"
    if "JR" in s:
        return "JR"
    if "SO" in s:
        return "SO"
    if "FR" in s:
        return "FR"
    return s[:2] if len(s) >= 2 else "SO"


def parse_hashmark_meta() -> dict:
    src = (ROOT / "scripts" / "generate-cfb-seed.mjs").read_text()
    rows = re.findall(
        r'\["([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)"',
        src,
    )
    meta = {}
    for slug, name, short, mascot, conf, city, st, c1, c2 in rows:
        meta[slug] = {
            "short": short, "mascot": mascot, "city": city, "state": st,
            "c1": c1, "c2": c2, "name": name, "conf": conf,
        }
    return meta


def connect():
    conn = sqlite3.connect(f"file:{DB_PATH}?mode=ro", uri=True)
    conn.row_factory = sqlite3.Row
    return conn


def build_name_lookup(conn):
    by_norm, by_loose = {}, {}
    for row in conn.execute("SELECT id, school, name FROM teams"):
        for raw in (row["school"], row["name"]):
            if not raw:
                continue
            by_norm[normalize(raw)] = row["id"]
            loose = normalize(re.sub(r"\([^)]*\)", "", raw))
            by_loose[loose] = row["id"]
    return by_norm, by_loose


def match_team_id(school: str, by_norm, by_loose):
    if not school:
        return None
    norm = normalize(school)
    if norm in by_norm:
        return by_norm[norm]
    alias = TEAM_NAME_ALIASES.get(norm)
    if alias and normalize(alias) in by_norm:
        return by_norm[normalize(alias)]
    for espn_norm, cfbd_alias in TEAM_NAME_ALIASES.items():
        if normalize(cfbd_alias) == norm and espn_norm in by_norm:
            return by_norm[espn_norm]
    loose = normalize(re.sub(r"\([^)]*\)", "", school))
    return by_loose.get(loose)


def load_fbs(conn):
    rows = conn.execute(
        "SELECT id, school, abbreviation, mascot, conference, name FROM teams WHERE division='FBS' ORDER BY school"
    ).fetchall()
    return [dict(r) for r in rows]


def compute_power(conn, fbs, by_norm, by_loose):
    fbs_ids = {t["id"] for t in fbs}
    school_by_id = {t["id"]: t["school"] for t in fbs}

    def mapped(rows, name_key="team"):
        out = {}
        for r in rows:
            tid = match_team_id(r[name_key], by_norm, by_loose)
            if tid in fbs_ids:
                out[tid] = r
        return out

    talent_rows = conn.execute(
        "SELECT team, talent, season FROM team_talent WHERE season BETWEEN ? AND ? ORDER BY season",
        (YEAR - 2, YEAR),
    ).fetchall()
    talent_last = {}
    for r in talent_rows:
        talent_last[r["team"]] = r["talent"]
    talent = {}
    for name, val in talent_last.items():
        tid = match_team_id(name, by_norm, by_loose)
        if tid in fbs_ids:
            talent[tid] = val

    ret_rows = conn.execute(
        "SELECT team, percent_ppa, usage, percent_passing_ppa FROM team_returning_production WHERE season=?",
        (YEAR,),
    ).fetchall()
    retention, qb_return = {}, {}
    ppa_vals = []
    tmp_qb = {}
    for r in ret_rows:
        tid = match_team_id(r["team"], by_norm, by_loose)
        if tid not in fbs_ids:
            continue
        parts = [x for x in (r["percent_ppa"], r["usage"]) if x is not None]
        if parts:
            retention[tid] = sum(parts) / len(parts)
        if r["percent_passing_ppa"] is not None:
            tmp_qb[tid] = r["percent_passing_ppa"]
            ppa_vals.append(r["percent_passing_ppa"])
    if len(ppa_vals) >= 10:
        xs = sorted(ppa_vals)
        lo = xs[max(0, int(len(xs) * 0.02))]
        hi = xs[min(len(xs) - 1, int(len(xs) * 0.98))]
        qb_return = {k: min(hi, max(lo, v)) for k, v in tmp_qb.items()}
    else:
        qb_return = tmp_qb

    trend_acc = defaultdict(lambda: [0.0, 0.0])
    for i, w in enumerate(TREND_YEAR_WEIGHTS, start=1):
        yr = YEAR - i
        for r in conn.execute(
            "SELECT team, wins, losses, ties FROM team_records WHERE season=?", (yr,)
        ):
            tid = match_team_id(r["team"], by_norm, by_loose)
            if tid not in fbs_ids:
                continue
            g = (r["wins"] or 0) + (r["losses"] or 0) + (r["ties"] or 0)
            if not g:
                continue
            wp = (r["wins"] or 0) / g
            trend_acc[tid][0] += wp * w
            trend_acc[tid][1] += w
    trend = {tid: a / b for tid, (a, b) in trend_acc.items() if b}

    portal = conn.execute(
        "SELECT origin_team, destination_team, rating FROM transfer_portal WHERE season=?",
        (YEAR,),
    ).fetchall()
    incoming = defaultdict(float)
    outgoing = defaultdict(float)
    for r in portal:
        rating = r["rating"] or 0.0
        if r["destination_team"]:
            tid = match_team_id(r["destination_team"], by_norm, by_loose)
            if tid in fbs_ids:
                incoming[tid] += rating
        if r["origin_team"]:
            tid = match_team_id(r["origin_team"], by_norm, by_loose)
            if tid in fbs_ids:
                outgoing[tid] += rating
    portal_net = {tid: incoming.get(tid, 0) - outgoing.get(tid, 0) for tid in fbs_ids}

    prior_rows = conn.execute(
        "SELECT team, sp_overall, sp_offense, sp_defense, sp_special_teams, elo, srs FROM team_advanced_ratings WHERE season=?",
        (YEAR - 1,),
    ).fetchall()
    # Multiple sources possible — keep last per team name
    prior_raw = {}
    for r in prior_rows:
        prior_raw[r["team"]] = r
    sp_o, sp_d, sp_s, elo, srs, overall = {}, {}, {}, {}, {}, {}
    for name, r in prior_raw.items():
        tid = match_team_id(name, by_norm, by_loose)
        if tid not in fbs_ids:
            continue
        if r["sp_offense"] is not None:
            sp_o[tid] = r["sp_offense"]
        if r["sp_defense"] is not None:
            sp_d[tid] = r["sp_defense"]
        if r["sp_special_teams"] is not None:
            sp_s[tid] = r["sp_special_teams"]
        if r["elo"] is not None:
            elo[tid] = r["elo"]
        if r["srs"] is not None:
            srs[tid] = r["srs"]
        if r["sp_overall"] is not None:
            overall[tid] = r["sp_overall"]
    z_sp = zscore_map({tid: overall.get(tid) for tid in fbs_ids})
    z_elo = zscore_map({tid: elo.get(tid) for tid in fbs_ids})
    z_srs = zscore_map({tid: srs.get(tid) for tid in fbs_ids})
    prior = {}
    for tid in fbs_ids:
        parts = [z_sp[tid], z_elo[tid], z_srs[tid]]
        prior[tid] = sum(parts) / 3.0

    # SOS: avg prior of regular-season opponents
    pairs = conn.execute(
        """
        SELECT home_team_id AS team_id, away_team_id AS opp_id FROM games WHERE season=? AND week<=14
        UNION ALL
        SELECT away_team_id, home_team_id FROM games WHERE season=? AND week<=14
        """,
        (YEAR, YEAR),
    ).fetchall()
    floor = min(prior.values()) if prior else 0.0
    sos_acc = defaultdict(list)
    for r in pairs:
        if r["team_id"] in fbs_ids:
            sos_acc[r["team_id"]].append(prior.get(r["opp_id"], floor))
    sos = {tid: (sum(v) / len(v) if v else None) for tid, v in sos_acc.items()}

    z_talent = zscore_map({tid: talent.get(tid) for tid in fbs_ids})
    z_ret = zscore_map({tid: retention.get(tid) for tid in fbs_ids})
    z_trend = zscore_map({tid: trend.get(tid) for tid in fbs_ids})
    z_portal = zscore_map({tid: portal_net.get(tid) for tid in fbs_ids})
    z_prior = zscore_map({tid: prior.get(tid) for tid in fbs_ids})

    scored = []
    for t in fbs:
        tid = t["id"]
        comp = (
            WEIGHTS["talent"] * z_talent[tid]
            + WEIGHTS["retention"] * z_ret[tid]
            + WEIGHTS["trend"] * z_trend[tid]
            + WEIGHTS["portal_net"] * z_portal[tid]
            + WEIGHTS["prior_rating"] * z_prior[tid]
        )
        scored.append({
            "espn_id": tid,
            "school": t["school"],
            "composite": comp,
            "z_talent": z_talent[tid],
            "z_retention": z_ret[tid],
            "z_trend": z_trend[tid],
            "z_portal": z_portal[tid],
            "z_prior": z_prior[tid],
            "talent_raw": talent.get(tid),
            "retention": retention.get(tid),
            "portal_net": portal_net.get(tid, 0.0),
            "sp_off": sp_o.get(tid),
            "sp_def": sp_d.get(tid),
            "sp_spec": sp_s.get(tid),
            "sos": sos.get(tid),
        })
    scored.sort(key=lambda r: r["composite"], reverse=True)
    for i, r in enumerate(scored, 1):
        r["rank"] = i
    return scored, school_by_id


def expected_home_p(home_elo, away_elo, neutral=False):
    diff = home_elo - away_elo + (0 if neutral else HFA)
    return 1.0 / (1.0 + 10.0 ** (-diff / 400.0))


def load_records(conn, by_norm, by_loose, fbs_ids):
    out = {}
    for r in conn.execute(
        "SELECT team, wins, losses, conference_wins, conference_losses FROM team_records WHERE season=2025"
    ):
        tid = match_team_id(r["team"], by_norm, by_loose)
        if tid in fbs_ids:
            out[tid] = r
    return out


# Official 2026 preseason AP Top 25, released Aug 17 2026.
# BYU and USC tied at 14; next rank is 16.
PRESEASON_AP_2026 = {
    "Ohio State": 1,
    "Oregon": 2,
    "Georgia": 3,
    "Notre Dame": 4,
    "Texas": 5,
    "Indiana": 6,
    "Miami": 7,
    "Texas A&M": 8,
    "Ole Miss": 9,
    "Oklahoma": 10,
    "LSU": 11,
    "Texas Tech": 12,
    "Alabama": 13,
    "BYU": 14,
    "USC": 14,
    "Michigan": 16,
    "Washington": 17,
    "Penn State": 18,
    "SMU": 19,
    "Tennessee": 20,
    "Utah": 21,
    "Iowa": 22,
    "Houston": 23,
    "Louisville": 24,
    "Missouri": 25,
}


def load_ap(conn):
    """2026 preseason AP ranks, keyed by ESPN team id."""
    by_norm, by_loose = build_name_lookup(conn)
    out = {}
    for school, rank in PRESEASON_AP_2026.items():
        tid = match_team_id(school, by_norm, by_loose)
        if tid is None:
            print("WARN AP unmatched", school)
            continue
        out[tid] = rank
    return out


def load_ap_2025_final(conn):
    rows = conn.execute(
        """
        SELECT r.team_id, r.rank FROM rankings r
        WHERE r.poll LIKE 'AP%' AND r.season=2025
          AND r.week = (SELECT MAX(week) FROM rankings WHERE poll LIKE 'AP%' AND season=2025)
        """
    ).fetchall()
    return {r["team_id"]: r["rank"] for r in rows}


def load_recruiting(conn, by_norm, by_loose, fbs_ids):
    """year -> espn_id -> {rank, points, commits, avg, five, four, three}"""
    board = defaultdict(dict)
    for r in conn.execute("SELECT year, rank, team, points FROM team_recruiting WHERE year BETWEEN 2023 AND 2026"):
        tid = match_team_id(r["team"], by_norm, by_loose)
        if tid in fbs_ids:
            board[r["year"]][tid] = {
                "rank": r["rank"] or 136,
                "points": r["points"] or 0.0,
                "commits": 0, "avg": 0.0, "five": 0, "four": 0, "three": 0,
            }
    stars = defaultdict(lambda: defaultdict(lambda: {"n": 0, "sum": 0.0, "five": 0, "four": 0, "three": 0}))
    for r in conn.execute(
        "SELECT year, committed_to, stars, rating FROM recruits WHERE year BETWEEN 2023 AND 2026 AND committed_to IS NOT NULL"
    ):
        tid = match_team_id(r["committed_to"], by_norm, by_loose)
        if tid not in fbs_ids:
            continue
        b = stars[r["year"]][tid]
        b["n"] += 1
        if r["rating"] is not None:
            b["sum"] += r["rating"]
        if r["stars"] == 5:
            b["five"] += 1
        elif r["stars"] == 4:
            b["four"] += 1
        elif r["stars"] == 3:
            b["three"] += 1
    for year, teams in stars.items():
        for tid, b in teams.items():
            row = board[year].setdefault(tid, {"rank": 136, "points": 0.0, "commits": 0, "avg": 0.0, "five": 0, "four": 0, "three": 0})
            row["commits"] = b["n"]
            row["avg"] = (b["sum"] / b["n"] * 100) if b["n"] and b["sum"] else 0.0
            row["five"] = b["five"]
            row["four"] = b["four"]
            row["three"] = b["three"]
    return board


def load_recruits_index(conn):
    """name_key -> list of {state, rating, stars, committed}"""
    idx = defaultdict(list)
    for r in conn.execute(
        "SELECT name, year, state, rating, stars, committed_to FROM recruits WHERE year BETWEEN 2022 AND 2026"
    ):
        idx[name_key(r["name"])].append(dict(r))
    return idx


def load_portal_dest(conn, by_norm, by_loose, fbs_ids):
    dest = defaultdict(set)
    for r in conn.execute(
        "SELECT player_name, destination_team FROM transfer_portal WHERE season=? AND destination_team IS NOT NULL",
        (YEAR,),
    ):
        tid = match_team_id(r["destination_team"], by_norm, by_loose)
        if tid in fbs_ids:
            dest[tid].add(name_key(r["player_name"]))
    return dest


def load_players(conn):
    by_team = defaultdict(list)
    for r in conn.execute(
        """
        SELECT team_id, name, position, position_group, jersey, class_year, height, weight,
               recruit_rating, recruit_stars
        FROM players WHERE season=?
        """,
        (YEAR,),
    ):
        by_team[r["team_id"]].append(dict(r))
    return by_team


def hometown_for(name, team_school, rec_idx, team_state):
    nk = name_key(name)
    cands = rec_idx.get(nk) or []
    school_n = normalize(team_school)
    for c in cands:
        if c["committed_to"] and normalize(c["committed_to"]) == school_n:
            st = (c["state"] or "").upper()
            if st in STATE_META:
                return st
    for c in cands:
        st = (c["state"] or "").upper()
        if st in STATE_META:
            return st
    return team_state or "--"


def build_projected(roster, dest_names, rec_idx, team_school, team_state, team_id):
    groups = defaultdict(list)

    def sort_key(p):
        rating = p["recruit_rating"]
        # unrated sort last
        r = -rating if rating is not None else 1
        cls = CLASS_RANK.get(parse_class(p["class_year"]), 4)
        return (r, cls, p["name"] or "")

    for p in roster:
        grp = p["position_group"] or "ST"
        groups[grp].append(p)
    for g in groups.values():
        g.sort(key=sort_key)

    used = set()
    out = []
    # Consume in slot order; each listed position takes the next unused player from its group, two-deep
    taken = defaultdict(int)
    # We'll pair: for each unique slot position, take 2 from the group
    by_slot = defaultdict(list)
    for slot, grp, unit in PROJECTED_SLOTS:
        by_slot[slot] = (grp, unit)
    # preserve order of first occurrence
    seen_slot = []
    for slot, grp, unit in PROJECTED_SLOTS:
        if slot not in seen_slot:
            seen_slot.append(slot)

    for slot in seen_slot:
        grp, unit = by_slot[slot]
        pool = groups.get(grp, [])
        picks = []
        for p in pool:
            ident = id(p)
            if ident in used:
                continue
            used.add(ident)
            picks.append(p)
            if len(picks) == 2:
                break
        for depth, p in enumerate(picks, 1):
            h_def, w_def = SIZE_DEFAULT.get(grp, (73, 210))
            h = int(round(p["height"])) if p["height"] else h_def
            w = int(round(p["weight"])) if p["weight"] else w_def
            cls = parse_class(p["class_year"])
            transfer = name_key(p["name"]) in dest_names
            out.append({
                "team_id": team_id,
                "name": p["name"],
                "jersey": parse_jersey(p["jersey"]),
                "position": slot,
                "depth": depth,
                "class_year": cls + ("/TR" if transfer else ""),
                "height": max(66, min(82, h)),
                "weight": max(160, min(380, w)),
                "stars": int(p["recruit_stars"] or 0) if p["recruit_stars"] else (4 if (p["recruit_rating"] or 0) >= 0.89 else 3 if (p["recruit_rating"] or 0) >= 0.80 else 0),
                "rating": to_247(p["recruit_rating"], p["recruit_stars"]),
                "hometown": hometown_for(p["name"], team_school, rec_idx, team_state),
                "unit": unit,
                "transfer": transfer,
            })
    return out


def build_listed(td_players, dest_names, rec_idx, team_school, team_state, team_id):
    out = []
    for p in td_players:
        cls = p.get("classYear") or "SO"
        transfer = bool(re.search(r"TR", str(cls), re.I)) or name_key(p["name"]) in dest_names
        jersey = p.get("jersey")
        try:
            jersey = int(jersey) if jersey not in (None, "") else None
        except (TypeError, ValueError):
            jersey = parse_jersey(jersey)
        hometown = p.get("hometownState") or hometown_for(p["name"], team_school, rec_idx, team_state)
        stars = int(p.get("stars") or 0)
        rating = p.get("rating")
        if rating is None:
            rating = to_247(None, stars)
        out.append({
            "team_id": team_id,
            "name": p["name"],
            "jersey": jersey,
            "position": p.get("position") or "WR",
            "depth": int(p.get("depth") or 1),
            "class_year": cls,
            "height": int(p.get("heightIn") or 73),
            "weight": int(p.get("weightLbs") or 210),
            "stars": stars,
            "rating": round2(float(rating), 2),
            "hometown": hometown if hometown in STATE_META else (hometown[:2].upper() if hometown else team_state),
            "unit": "DEF" if p.get("unit") == "DEF" else "OFF",
            "transfer": transfer,
        })
    return out


def roster_profile(players, returning_pct):
    def depth_w(p):
        return 1.0 if p["depth"] == 1 else 0.4

    def wavg(arr, fn):
        if not arr:
            return 0.0
        s = w = 0.0
        for p in arr:
            ww = depth_w(p)
            s += fn(p) * ww
            w += ww
        return s / w if w else 0.0

    def avg(arr, fn):
        if not arr:
            return 0.0
        return sum(fn(p) for p in arr) / len(arr)

    ol = [p for p in players if p["position"] in {"LT", "LG", "C", "RG", "RT", "OT", "OG", "OL", "QT", "QG", "SG", "ST"}]
    skill = [p for p in players if p["position"] in {
        "RB", "RB-A", "RB-B", "FB", "SB", "WR", "WR-X", "WR-Z", "WR-F", "WR-Y", "SLOT", "TE", "TE-Y", "TE-H", "TE-F",
    }]
    qb = [p for p in players if p["position"] == "QB"]
    dl = [p for p in players if p["position"] in {"DE", "LDE", "RDE", "JACK", "EDGE", "DT", "NT", "LDT", "RDT", "DL"}]
    lb = [p for p in players if p["position"] in {"MLB", "WLB", "ILB", "OLB", "LB", "MAC", "MONEY", "SLB"}]
    db = [p for p in players if p["position"] in {"CB", "LCB", "RCB", "FCB", "BCB", "NB", "FS", "SS", "S", "DB"}]
    off = [p for p in players if p["unit"] == "OFF"]
    defn = [p for p in players if p["unit"] == "DEF"]
    starters = [p for p in players if p["depth"] == 1]
    blue = [p for p in players if p["stars"] >= 4]
    tr = [p for p in players if p["transfer"]]
    hs = [p for p in players if not p["transfer"]]
    talent = round2(wavg(players, lambda p: p["rating"]))
    tr_w = sum(depth_w(p) for p in tr)
    all_w = sum(depth_w(p) for p in players) or 1
    ret_starters = int(round((returning_pct or 0.55) * 22))
    return {
        "talent_score": talent,
        "blue_chip_pct": round2((len(blue) / len(players) * 100) if players else 0, 1),
        "transfer_pct": round2((len(tr) / len(players) * 100) if players else 0, 1),
        "transfer_count": len(tr),
        "off_talent": round2(wavg(off or players, lambda p: p["rating"])),
        "def_talent": round2(wavg(defn or players, lambda p: p["rating"])),
        "starter_talent": round2(wavg(starters or players, lambda p: p["rating"])),
        "hs_talent": round2(wavg(hs or players, lambda p: p["rating"])),
        "portal_talent": round2(wavg(tr, lambda p: p["rating"]) if tr else 0),
        "portal_share": round2(tr_w / all_w * 100, 1),
        "qb_talent": round2(wavg(qb, lambda p: p["rating"]) if qb else 0),
        "skill_talent": round2(wavg(skill, lambda p: p["rating"]) if skill else 0),
        "ol_talent": round2(wavg(ol, lambda p: p["rating"]) if ol else 0),
        "dl_talent": round2(wavg(dl, lambda p: p["rating"]) if dl else 0),
        "lb_talent": round2(wavg(lb, lambda p: p["rating"]) if lb else 0),
        "db_talent": round2(wavg(db, lambda p: p["rating"]) if db else 0),
        "avg_rating": talent,
        "avg_height": round2(avg(players, lambda p: p["height"]), 1),
        "avg_weight": round2(avg(players, lambda p: p["weight"]), 1),
        "ol_h": round2(avg(ol or players, lambda p: p["height"]), 1),
        "ol_w": round2(avg(ol or players, lambda p: p["weight"]), 1),
        "sk_h": round2(avg(skill or players, lambda p: p["height"]), 1),
        "sk_w": round2(avg(skill or players, lambda p: p["weight"]), 1),
        "db_h": round2(avg(db or players, lambda p: p["height"]), 1),
        "returning_starters": max(6, min(22, ret_starters)),
    }


def playoff_odds(rank: int) -> float:
    # 12-team field, logistic around the cut — stored as 0–100 for the UI
    return round2(100 / (1 + math.exp((rank - 12.5) / 2.8)), 1)


def last_finish(ap, rec, conf):
    if ap == 1:
        return "National Champion"
    if ap and ap <= 4:
        return f"CFP · AP #{ap}"
    if ap:
        return f"Finished AP #{ap}"
    if rec:
        cw, cl = rec["conference_wins"], rec["conference_losses"]
        if cw is not None and cl is not None:
            return f"{cw}–{cl} {conf}"
        w, l = rec["wins"] or 0, rec["losses"] or 0
        return "Bowl season" if w >= 6 else "Did not bowl"
    return "2025 season"


def short_name(school, extra_short=None):
    if extra_short:
        return extra_short
    s = school.replace("State", "St").replace("University", "")
    return s[:14].strip()


def main():
    if not DB_PATH.exists():
        raise SystemExit(f"missing {DB_PATH}")
    hm_meta = parse_hashmark_meta()
    twodeep = {}
    if TWODEEP_PATH.exists():
        twodeep = json.loads(TWODEEP_PATH.read_text()).get("teams") or {}

    conn = connect()
    fbs = load_fbs(conn)
    by_norm, by_loose = build_name_lookup(conn)
    fbs_ids = {t["id"] for t in fbs}
    scored, _ = compute_power(conn, fbs, by_norm, by_loose)
    print("HX Top 25 (user model):")
    for r in scored[:25]:
        print(f"  {r['rank']:3}. {r['school']:<24} {r['composite']:+.2f}  talent={r['z_talent']:+.2f} prior={r['z_prior']:+.2f} trend={r['z_trend']:+.2f}")

    records = load_records(conn, by_norm, by_loose, fbs_ids)
    ap = load_ap(conn)
    ap_2025 = load_ap_2025_final(conn)
    rec_board = load_recruiting(conn, by_norm, by_loose, fbs_ids)
    rec_idx = load_recruits_index(conn)
    portal_dest = load_portal_dest(conn, by_norm, by_loose, fbs_ids)
    players_by_team = load_players(conn)

    score_by_espn = {r["espn_id"]: r for r in scored}
    elo_by_espn = {r["espn_id"]: BASE_ELO + ELO_SCALE * r["composite"] for r in scored}

    # Projected wins from the 2026 slate (FCS opponents ~0.90)
    proj = defaultdict(float)
    fcs_games = defaultdict(int)
    games_rows = []
    espn_div = {r["id"]: True for r in fbs}
    for g in conn.execute(
        """
        SELECT g.week, g.start_time, g.home_team_id, g.away_team_id, g.venue, g.neutral_site,
               th.division AS home_div, ta.division AS away_div,
               th.school AS home_school, ta.school AS away_school
        FROM games g
        JOIN teams th ON th.id = g.home_team_id
        JOIN teams ta ON ta.id = g.away_team_id
        WHERE g.season=? AND g.week <= 14
        ORDER BY g.week, g.start_time
        """,
        (YEAR,),
    ):
        hid, aid = g["home_team_id"], g["away_team_id"]
        home_fbs, away_fbs = hid in espn_div, aid in espn_div
        if home_fbs and away_fbs:
            he, ae = elo_by_espn[hid], elo_by_espn[aid]
            p = expected_home_p(he, ae, bool(g["neutral_site"]))
            proj[hid] += p
            proj[aid] += 1 - p
            kick = (g["start_time"] or "2026-09-05")[:10]
            games_rows.append({
                "week": g["week"] or 1,
                "date": kick,
                "home": hid,
                "away": aid,
                "neutral": bool(g["neutral_site"]),
                "location": g["venue"],
                "headline": None,
            })
        elif home_fbs and not away_fbs:
            proj[hid] += 0.90
            fcs_games[hid] += 1
        elif away_fbs and not home_fbs:
            proj[aid] += 0.18
            fcs_games[aid] += 1

    # Assemble HASHMARK teams in HX rank order
    teams = []
    listed_n = projected_n = 0
    all_players = []
    for r in scored:
        espn_id = r["espn_id"]
        raw = next(t for t in fbs if t["id"] == espn_id)
        slug = slugify(raw["school"])
        meta = hm_meta.get(slug)
        extra = EXTRA_META.get(slug)
        conf = CONF_MAP.get(raw["conference"] or "", raw["conference"] or "Independent")
        mascot = MASCOT_FIX.get(slug, raw["mascot"] or "Tigers")
        if meta:
            short, city, state, c1, c2 = meta["short"], meta["city"], meta["state"], meta["c1"], meta["c2"]
            mascot = meta["mascot"] or mascot
        elif extra:
            short, city, state, c1, c2 = extra
        else:
            short, city, state, c1, c2 = short_name(raw["school"]), "Campus", "US", "#1f2933", "#9aa3ad"
            print("WARN no meta for", slug, raw["school"])
        rec = records.get(espn_id)
        last_w = (rec["wins"] if rec else 0) or 0
        last_l = (rec["losses"] if rec else 0) or 0
        ap_rank = ap.get(espn_id)
        rec2026 = rec_board[2026].get(espn_id, {"rank": 136, "points": 0, "commits": 0, "avg": 0, "five": 0, "four": 0, "three": 0})
        source = "listed" if slug in twodeep and twodeep[slug] else "projected"
        dest_names = portal_dest.get(espn_id, set())
        if source == "listed":
            plist = build_listed(twodeep[slug], dest_names, rec_idx, raw["school"], state, None)
            listed_n += 1
        else:
            plist = build_projected(players_by_team.get(espn_id, []), dest_names, rec_idx, raw["school"], state, None)
            projected_n += 1
        hx_id = r["rank"]  # assigned after we know insertion id
        teams.append({
            "espn_id": espn_id,
            "slug": slug,
            "name": raw["school"],
            "short": short,
            "mascot": mascot,
            "conference": conf,
            "city": city,
            "state": state,
            "c1": c1,
            "c2": c2,
            "last_w": last_w,
            "last_l": last_l,
            "last_finish": last_finish(ap_2025.get(espn_id), rec, conf),
            "score": r,
            "ap": ap_rank,
            "rec2026": rec2026,
            "source": source,
            "players": plist,
            "proj_w": round2(proj.get(espn_id, 6.5), 1),
        })

    # sequential HASHMARK ids in HX order
    espn_to_hid = {}
    for i, t in enumerate(teams, 1):
        t["id"] = i
        espn_to_hid[t["espn_id"]] = i
        for p in t["players"]:
            p["team_id"] = i
            all_players.append(p)

    profiles = []
    for t in teams:
        prof = roster_profile(t["players"], t["score"]["retention"])
        prof["team_id"] = t["id"]
        prof["source"] = t["source"]
        profiles.append(prof)
    profiles.sort(key=lambda p: p["talent_score"], reverse=True)
    for i, p in enumerate(profiles, 1):
        p["talent_rank"] = i
    prof_by_id = {p["team_id"]: p for p in profiles}

    # Recruiting rows 2023-2026
    rec_rows = []
    for t in teams:
        for year in (2023, 2024, 2025, 2026):
            row = rec_board[year].get(t["espn_id"], {
                "rank": 136, "points": 0.0, "commits": 0, "avg": 0.0, "five": 0, "four": 0, "three": 0,
            })
            rec_rows.append({
                "team_id": t["id"], "year": year,
                "rank": int(row["rank"] or 136),
                "commits": int(row["commits"] or 0),
                "avg": round2(row["avg"] or 0, 2),
                "points": round2(row["points"] or 0, 2),
                "five": int(row["five"] or 0),
                "four": int(row["four"] or 0),
                "three": int(row["three"] or 0),
            })

    # States from 2026 recruits
    state_stats = defaultdict(lambda: {"n": 0, "five": 0, "rating": 0.0, "commits": defaultdict(int)})
    for r in conn.execute(
        "SELECT state, stars, rating, committed_to FROM recruits WHERE year=2026 AND state IS NOT NULL"
    ):
        st = (r["state"] or "").upper()
        if st not in STATE_META:
            continue
        b = state_stats[st]
        b["n"] += 1
        if (r["stars"] or 0) >= 5:
            b["five"] += 1
        if r["rating"]:
            b["rating"] += r["rating"] * 100
        tid = match_team_id(r["committed_to"], by_norm, by_loose) if r["committed_to"] else None
        hid = espn_to_hid.get(tid)
        if hid:
            b["commits"][hid] += 1

    # Games mapped to HASHMARK ids
    mapped_games = []
    for g in games_rows:
        hid = espn_to_hid.get(g["home"])
        aid = espn_to_hid.get(g["away"])
        if not hid or not aid or hid == aid:
            continue
        mapped_games.append({**g, "home": hid, "away": aid})

    conn.close()

    def emit_states():
        rows = []
        for code, (name, region) in STATE_META.items():
            b = state_stats.get(code, {"n": 0, "five": 0, "rating": 0.0})
            avg = (b["rating"] / b["n"]) if b["n"] else 0.0
            idx = round2(avg * (1 + math.log10(max(b["n"], 1)) / 4), 2)
            rows.append((code, name, region, b["n"], b["five"], round2(avg, 2), idx))
        rows.append(("--", "Unknown", "South", 0, 0, 0.0, 0.0))
        a("insert into states (code, name, region, recruits, five_stars, avg_rating, talent_index) values")
        for i, s in enumerate(rows):
            comma = ";" if i == len(rows) - 1 else ","
            a(f"  ({sql_str(s[0])}, {sql_str(s[1])}, {sql_str(s[2])}, {s[3]}, {s[4]}, {s[5]}, {s[6]}){comma}")

    lines = []
    a = lines.append
    a("-- HASHMARK 2026 preseason seed — generated from user cfb.db")
    a("-- Rankings: power_rankings.py DEFAULT_WEIGHTS (talent 1.5, prior 1.5, trend 1.0, retention 0.5, portal 0.5)")
    a("-- Two-deeps: TWO·DEEP listed charts where present; CFBD projected otherwise")
    a("truncate state_commits, games, players, roster_profile, recruiting, rankings, states, teams restart identity cascade;")
    a("")
    a("insert into teams (id, slug, name, short_name, mascot, conference, city, state, color_primary, color_secondary, last_wins, last_losses, last_finish) values")
    for i, t in enumerate(teams):
        comma = ";" if i == len(teams) - 1 else ","
        a(
            f"  ({t['id']}, {sql_str(t['slug'])}, {sql_str(t['name'])}, {sql_str(t['short'])}, {sql_str(t['mascot'])}, "
            f"{sql_str(t['conference'])}, {sql_str(t['city'])}, {sql_str(t['state'])}, {sql_str(t['c1'])}, {sql_str(t['c2'])}, "
            f"{t['last_w']}, {t['last_l']}, {sql_str(t['last_finish'])}){comma}"
        )

    a("")
    emit_states()

    a("")
    a(
        "insert into rankings (team_id, season, week, hx_rank, hx_rating, ap_rank, offense_rating, defense_rating, "
        "special_rating, sos_rating, projected_wins, returning_production, playoff_odds, prior_score, talent_score, "
        "z_talent, z_retention, z_trend, z_portal, z_prior) values"
    )
    for i, t in enumerate(teams):
        s = t["score"]
        p = prof_by_id[t["id"]]
        apv = "NULL" if t["ap"] is None else t["ap"]
        off = round2(s["sp_off"] if s["sp_off"] is not None else 20.0)
        defense = round2(40.0 - (s["sp_def"] if s["sp_def"] is not None else 20.0))
        special = round2((s["sp_spec"] if s["sp_spec"] is not None else 0.0) * 10)
        sos = round2((s["sos"] if s["sos"] is not None else 0.0) * 10)
        ret = round2((s["retention"] or 0) * 100, 1)
        comma = ";" if i == len(teams) - 1 else ","
        a(
            f"  ({t['id']}, 2026, 0, {t['score']['rank']}, {round2(s['composite'], 3)}, {apv}, {off}, {defense}, "
            f"{special}, {sos}, {t['proj_w']}, {ret}, {playoff_odds(s['rank'])}, {round2(s['z_prior'], 3)}, "
            f"{p['talent_score']}, {round2(s['z_talent'], 3)}, {round2(s['z_retention'], 3)}, {round2(s['z_trend'], 3)}, "
            f"{round2(s['z_portal'], 3)}, {round2(s['z_prior'], 3)}){comma}"
        )

    a("")
    a("insert into recruiting (team_id, class_year, composite_rank, commits, avg_rating, points, five_stars, four_stars, three_stars) values")
    for i, r in enumerate(rec_rows):
        comma = ";" if i == len(rec_rows) - 1 else ","
        a(
            f"  ({r['team_id']}, {r['year']}, {r['rank']}, {r['commits']}, {r['avg']}, {r['points']}, "
            f"{r['five']}, {r['four']}, {r['three']}){comma}"
        )

    a("")
    a(
        "insert into roster_profile (team_id, talent_rank, talent_score, blue_chip_pct, transfer_pct, transfer_count, "
        "off_talent, def_talent, starter_talent, hs_talent, portal_talent, portal_share, qb_talent, skill_talent, "
        "ol_talent, dl_talent, lb_talent, db_talent, avg_rating, avg_height_in, avg_weight_lbs, ol_avg_height_in, "
        "ol_avg_weight_lbs, skill_avg_height_in, skill_avg_weight_lbs, db_avg_height_in, returning_starters, two_deep_source) values"
    )
    for i, p in enumerate(sorted(profiles, key=lambda x: x["team_id"])):
        comma = ";" if i == len(profiles) - 1 else ","
        a(
            f"  ({p['team_id']}, {p['talent_rank']}, {p['talent_score']}, {p['blue_chip_pct']}, {p['transfer_pct']}, "
            f"{p['transfer_count']}, {p['off_talent']}, {p['def_talent']}, {p['starter_talent']}, {p['hs_talent']}, "
            f"{p['portal_talent']}, {p['portal_share']}, {p['qb_talent']}, {p['skill_talent']}, {p['ol_talent']}, "
            f"{p['dl_talent']}, {p['lb_talent']}, {p['db_talent']}, {p['avg_rating']}, {p['avg_height']}, {p['avg_weight']}, "
            f"{p['ol_h']}, {p['ol_w']}, {p['sk_h']}, {p['sk_w']}, {p['db_h']}, {p['returning_starters']}, {sql_str(p['source'])}){comma}"
        )

    chunk = 80
    for i in range(0, len(all_players), chunk):
        slice_p = all_players[i:i + chunk]
        a("")
        a(
            "insert into players (team_id, name, jersey, position, depth, class_year, height_in, weight_lbs, stars, rating, hometown_state, unit, transfer) values"
        )
        for j, p in enumerate(slice_p):
            comma = ";" if j == len(slice_p) - 1 else ","
            jersey = "NULL" if p["jersey"] is None else int(p["jersey"])
            ht = p["hometown"] if p["hometown"] in STATE_META else (p["hometown"][:2].upper() if p["hometown"] else "--")
            if ht not in STATE_META:
                ht = "--"
            a(
                f"  ({p['team_id']}, {sql_str(p['name'][:80])}, {jersey}, {sql_str(p['position'])}, {p['depth']}, "
                f"{sql_str(p['class_year'][:12])}, {int(p['height'])}, {int(p['weight'])}, {int(p['stars'] or 0)}, "
                f"{p['rating']}, {sql_str(ht)}, {sql_str(p['unit'])}, {sql_bool(p['transfer'])}){comma}"
            )

    if mapped_games:
        a("")
        a("insert into games (week, kickoff_date, home_team_id, away_team_id, neutral, location, headline) values")
        for i, g in enumerate(mapped_games):
            comma = ";" if i == len(mapped_games) - 1 else ","
            a(
                f"  ({g['week']}, {sql_str(g['date'])}, {g['home']}, {g['away']}, {sql_bool(g['neutral'])}, "
                f"{sql_str(g['location'])}, {sql_str(g['headline'])}){comma}"
            )

    commits = []
    for code, b in state_stats.items():
        for hid, n in b["commits"].items():
            commits.append((code, hid, n))
    if commits:
        a("")
        a("insert into state_commits (state_code, team_id, commits) values")
        for i, (code, hid, n) in enumerate(commits):
            comma = ";" if i == len(commits) - 1 else ","
            a(f"  ({sql_str(code)}, {hid}, {n}){comma}")

    SEED_PATH.write_text("\n".join(lines) + "\n")
    print(f"\nWrote {SEED_PATH} ({SEED_PATH.stat().st_size / 1024:.0f} KB)")
    print(f"Teams {len(teams)}  players {len(all_players)}  listed {listed_n}  projected {projected_n}  games {len(mapped_games)}")
    print("Sample slugs:", ", ".join(t["slug"] for t in teams[:8]))
    am = next((t for t in teams if t["slug"] == "texas-am"), None)
    if am:
        qbs = [p for p in am["players"] if p["position"] == "QB"]
        print("A&M two-deep source", am["source"], "QBs", [(p["name"], p["depth"], p["jersey"]) for p in qbs])


if __name__ == "__main__":
    main()
