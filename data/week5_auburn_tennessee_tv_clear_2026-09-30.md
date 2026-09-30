# CLEAR pack — Auburn @ Tennessee TV only (Week 5)

**Role:** Research CFB CLEAR — TV field only for Website stamp.  
**As of:** 2026-09-30 ~15:20 CT (America/Chicago)  
**Soft-cal FLAG / all-D:** still in force — not lifted.  
**Live board:** https://hashmarkcfb.com/schedule?w=5  
**Prior pack:** `/workspace/cfb/week5_vegas_clear_pack_2026-09-28.{md,json}` — Aub@Tenn was the **1 HOLD (TV blank)**; kick + Vegas already stamped.

---

## Verdict

| Field | Value |
|------|-------|
| **Verdict** | **TV CLEAR — ESPN** |
| Matchup | Auburn @ Tennessee (Neyland Stadium) |
| ESPN ID | `401856710` |
| Kick CT (live confirmed) | **Saturday, Oct 3 · 2:30 CT** (= 3:30 EDT) |
| Vegas (live confirmed) | **Tennessee −7.0 · O/U 54.5** (DraftKings) |
| TV (prior) | blank / HOLD (`tv:null`) |
| TV (this pack) | **ESPN** |
| Stamp scope | **TV field only** — do **not** restamp kick or Vegas (live agrees) |

---

## Live board confirm (step 1)

Fetched https://hashmarkcfb.com/schedule?w=5 on 2026-09-30 CT:

- **Auburn@Tennessee** · Neyland Stadium
- **Saturday, Oct 3 2:30 CT** (no TV network on kick line)
- HASHMARK Tennessee −9.4 · 71.8%
- Vegas **Tennessee −7.0 · O/U 54.5**
- Kick line reads **Kick 2:30 CT** with TV blank (HOLD residual from Sep 28 pack)

Kick + Vegas match prior CLEAR stamp. **TV was the only blank.**

---

## Cross-check prior Week 5 Vegas pack (step 5)

From `/workspace/cfb/week5_vegas_clear_pack_2026-09-28.md`:

- Counts: **54 CLEAR · 1 HOLD · 1 blank TV**
- HOLD only: **Auburn @ Tennessee** (`401856710`) — HOLD (TV); tv=`—`; vegas=`TENN -7` / O/U 54.5
- Note then: ESPN + CBS Sports showed no public TV as of 2026-09-28 09:34 CT; stamp kick/Vegas, leave TV blank until sourced

This pack closes that HOLD.

---

## TV sourcing (step 2) — authoritative

| # | Source | What it says | URL |
|---|--------|--------------|-----|
| 1 | **ESPN site API summary** `event=401856710` | National TV **ESPN**; status detail Sat Oct 3 3:30 PM EDT; DraftKings TENN −7 / 54.5 | `https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/summary?event=401856710` |
| 2 | **ESPN scoreboard** week 5 groups=80 | broadcasts names **ESPN**; odds DraftKings TENN −7 OU 54.5 | `https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?week=5&seasontype=2&dates=2026&groups=80&limit=300` |
| 3 | **ESPN Press Room** Week 5 commentators schedule (Sep 28, 2026) | Sat Oct 3 **3:30 p.m.** Auburn at No. 17 Tennessee · **ESPN/ESPN Radio** (Wischusen / Riddick / Buonantony) | `https://espnpressroom.com/2026-27-espn-college-football-commentators-schedule/` |
| 4 | **University of Tennessee News** (Sep 30, 2026) | “broadcast nationally on **ESPN** at 3:30 p.m. EDT” | `https://news.utk.edu/2026/09/30/ut-to-celebrate-100-years-of-gen-neyland-at-football-game-vs-auburn/` |
| 5 | **SEC designation** (via Saturday Down South, cites @SEC Sep 27, 2026) | Auburn at Tennessee · 3:30 PM ET on **ESPN** | `https://www.saturdaydownsouth.com/news/college-football/sec-announces-finalized-tv-networks-for-5-week-5-games/` |

**Primary stamp sources:** ESPN API + ESPN Press Room + UT News. SDS/SEC is corroborating.

**Do not invent TV** — network is explicitly ESPN across ESPN API, ESPN Press Room, and official UT athletics news.

---

## Stamp instruction for Website

**One-line stamp ask:**

> Stamp Auburn @ Tennessee Week 5 TV = **ESPN** only (`espn_id` 401856710 / `/schedule?w=5`); leave kick **2:30 CT** and Vegas **TENN −7.0 / 54.5** unchanged.

Rules:

1. Update **TV field only** on Aub@Tenn.
2. Do **not** restamp kick or Vegas unless live board disagrees (it does not — confirmed 2:30 CT + TENN −7.0/54.5).
3. Soft-cal FLAG / all-D remains in force — this CLEAR does not lift FLAG.
4. Research does **not** message Website / Management / Marketing / Chase — parent delivers.

---

## Payload (for Website)

```json
{
  "espn_id": "401856710",
  "matchup": "Auburn @ Tennessee",
  "kick_ct": "2026-10-03 14:30",
  "kick_display": "Saturday, Oct 3 · 2:30 CT",
  "vegas": "TENN -7.0",
  "ou": 54.5,
  "tv": "ESPN",
  "tv_prior": null,
  "status": "CLEAR",
  "stamp_fields": ["tv"],
  "do_not_restamp": ["kick_ct", "vegas", "ou"]
}
```

---

## File refs

- Memo: `/workspace/cfb/week5_auburn_tennessee_tv_clear_2026-09-30.md`
- JSON: `/workspace/cfb/week5_auburn_tennessee_tv_clear_2026-09-30.json`
- Prior HOLD context: `/workspace/cfb/week5_vegas_clear_pack_2026-09-28.{md,json}`
