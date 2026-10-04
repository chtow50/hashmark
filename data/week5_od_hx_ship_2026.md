# HASHMARK Week 5 → Week 6 ship board — HX 2026.7 (draft)

**hx_stamp:** HX 2026.7
**Status:** offline draft. **Not stamped.** Do not claim LIVE CLEAR. This HX 2026.7 ship is not itself Research-peer-CLEARed.
**FINALs CLEAR:** `week5_fbs_fbs_finals_clear_2026-10-04.md` — 55/55 HOLD 0. ESPN STATUS_FINAL all 55. Thu already live, no re-stamp: NMSU 34–WKU 13; UNT 45–44 Tulsa OT.
**Tape Research peer CLEAR:** `week5_tape_research_peer_clear_2026-10-04.md` — SU **39/55 (70.9%)** · closer **20/55 (36.4%)** FLAG. Same 55 ids; no score/SU/closer disagreements vs ESPN. Do not treat season rollup 203/258 as a fresh W1–W4 audit.
**Soft-cal FLAG stays.** Week 5 closer 20/55 = 36.4% < 45. Do not fix calibration in this pack.
**Method:** Capped O/D EPA only. ΔHX = (ΔO+ΔD)/55 on HX 2026.6 posts. Frozen W3/W4 knobs (no weight retrain, no Vegas-fit, QB / tenure / SOS stay zero).
**OD source:** `sunday_od_delta_2026_w5.json` (Week 5 EPA, FBS–FBS FINAL + FCS stubs)
**HX base:** `week4_od_hx_ship_2026.json` `hx_post` = HX 2026.6 (Georgia prior 7.8964)
**Georgia:** rank 1 @ 7.8964 (pre 7.8964 vs 2026.6 7.8964, ΔHX +0.0000, rank 1→1)

## Game-count check

- Graded ledger FBS–FBS: **55** (`metrics/week5_hx_vs_vegas_detail.json`)
- Scoreboard FBS–FBS used: **55**
- Score mismatches vs ledger: **0** (target 0)
- FBS–FCS stubs: **4**
- Full FBS board (O, D, HX, rank, Δ from 2026.6) is `teams` in the ship JSON (136).

## Do not change
- Quadratic spread, talent/z* weights, team-HFA, weather, QB/tenure/SOS un-zero
- No retrain, no invented FCS HX, no invented scores, no calibration fix

## Top 25 after ΔHX (HX 2026.7)

| Rank | Team | HX | ΔHX | Δrk | O/D post | ΔO | ΔD |
|---|---|---|---|---|---|---|---|
| 1 | Georgia | 7.896 | +0.000 | +0 | 39.4/23.3 | +0.14 | -0.14 |
| 2 | Ohio State | 7.839 | +0.026 | +0 | 40.8/28.7 | +2.12 | -0.69 |
| 3 | Notre Dame | 7.012 | -0.009 | +0 | 40.3/19.3 | +1.29 | -1.81 |
| 4 | Oregon | 6.902 | +0.000 | +0 | 41.0/20.4 | +0.00 | +0.00 |
| 5 | Texas | 6.452 | +0.000 | +0 | 36.1/22.8 | +0.00 | +0.00 |
| 6 | Texas A&M | 6.065 | +0.006 | +0 | 35.4/18.7 | -0.48 | +0.83 |
| 7 | Texas Tech | 5.744 | -0.071 | +0 | 36.9/20.6 | -2.12 | -1.79 |
| 8 | Ole Miss | 5.429 | +0.000 | +0 | 43.0/15.6 | +0.00 | +0.00 |
| 9 | Alabama | 5.290 | +0.008 | +0 | 36.2/17.0 | +0.91 | -0.45 |
| 10 | Miami | 5.254 | +0.019 | +0 | 39.9/21.6 | +1.86 | -0.80 |
| 11 | Indiana | 4.947 | +0.000 | +0 | 42.0/26.0 | +0.00 | +0.00 |
| 12 | Michigan | 4.881 | -0.049 | +0 | 32.7/20.6 | -1.64 | -1.05 |
| 13 | Utah | 4.287 | +0.000 | +0 | 40.6/23.9 | +0.00 | +0.00 |
| 14 | Missouri | 4.245 | -0.012 | +1 | 32.3/19.4 | +1.03 | -1.68 |
| 15 | Penn State | 4.243 | -0.041 | -1 | 30.0/18.0 | -0.13 | -2.12 |
| 16 | Oklahoma | 4.189 | +0.000 | +0 | 34.1/23.9 | +0.00 | +0.00 |
| 17 | BYU | 4.125 | +0.002 | +1 | 36.4/22.1 | -0.74 | +0.83 |
| 18 | LSU | 4.124 | +0.000 | -1 | 31.2/24.2 | +0.00 | +0.00 |
| 19 | Tennessee | 4.047 | -0.028 | +0 | 37.5/15.0 | -0.16 | -1.37 |
| 20 | SMU | 3.946 | -0.050 | +0 | 35.0/14.8 | -1.75 | -1.00 |
| 21 | USC | 3.852 | -0.001 | +0 | 41.7/14.8 | +0.54 | -0.57 |
| 22 | Clemson | 3.814 | -0.019 | +0 | 26.8/17.4 | +0.80 | -1.86 |
| 23 | Iowa | 3.680 | -0.026 | +0 | 34.6/18.7 | +0.69 | -2.12 |
| 24 | Florida | 3.532 | +0.012 | +0 | 31.4/12.0 | +1.68 | -1.03 |
| 25 | Washington | 3.244 | +0.001 | +0 | 33.0/20.2 | +0.57 | -0.54 |

## Largest |ΔHX|

| Team | ΔHX | rank pre→post |
|---|---|---|
| Old Dominion | -0.077 | 92→92 |
| Georgia State | +0.077 | 122→122 |
| Texas Tech | -0.071 | 7→7 |
| Colorado | +0.071 | 73→72 |
| Illinois | -0.068 | 38→41 |
| Purdue | +0.068 | 94→93 |
| Central Michigan | +0.060 | 113→113 |
| Akron | -0.060 | 116→117 |
| SMU | -0.050 | 20→20 |
| Boston College | +0.050 | 104→104 |
| Michigan | -0.049 | 12→12 |
| Minnesota | +0.049 | 35→35 |
| Western Kentucky | +0.049 | 64→62 |
| New Mexico State | -0.049 | 125→125 |
| Toledo | -0.048 | 42→43 |

## Rank climbers

| Team | Δrk | HX |
|---|---|---|
| Texas State | +2 | 0.775 |
| Western Kentucky | +2 | 0.349 |
| Marshall | +2 | 0.212 |
| Oregon State | +2 | -1.005 |
| Missouri | +1 | 4.245 |
| BYU | +1 | 4.125 |
| Houston | +1 | 1.640 |
| Georgia Tech | +1 | 1.621 |
| Arizona State | +1 | 1.575 |
| Duke | +1 | 1.523 |

## Rank droppers

| Team | Δrk | HX |
|---|---|---|
| Illinois | -3 | 1.567 |
| Washington State | -2 | 0.743 |
| Kentucky | -2 | 0.312 |
| Ohio | -2 | 0.197 |
| Penn State | -1 | 4.243 |
| LSU | -1 | 4.124 |
| Toledo | -1 | 1.502 |
| Arkansas | -1 | 0.576 |
| Maryland | -1 | -0.325 |
| Cincinnati | -1 | -1.008 |

## Chase-care / notable movers

| Team | HX pre→post | ΔHX | rk | O/D |
|---|---|---|---|---|
| Georgia | 7.896→7.896 | +0.000 | 1→1 | 39.4/23.3 |
| Ohio State | 7.813→7.839 | +0.026 | 2→2 | 40.8/28.7 |
| Texas | 6.452→6.452 | +0.000 | 5→5 | 36.1/22.8 |
| Michigan | 4.930→4.881 | -0.049 | 12→12 | 32.7/20.6 |
| Oregon | 6.902→6.902 | +0.000 | 4→4 | 41.0/20.4 |
| UNLV | 1.752→1.732 | -0.021 | 37→37 | 32.6/10.3 |
| Mississippi State | 0.207→0.199 | -0.008 | 66→66 | 39.1/7.9 |
| Oklahoma | 4.189→4.189 | +0.000 | 16→16 | 34.1/23.9 |
| Alabama | 5.282→5.290 | +0.008 | 9→9 | 36.2/17.0 |
| Utah | 4.287→4.287 | +0.000 | 13→13 | 40.6/23.9 |
| Notre Dame | 7.022→7.012 | -0.009 | 3→3 | 40.3/19.3 |
| LSU | 4.124→4.124 | +0.000 | 17→18 | 31.2/24.2 |
| Clemson | 3.834→3.814 | -0.019 | 22→22 | 26.8/17.4 |
| Oklahoma State | -1.172→-1.172 | +0.000 | 89→89 | 19.8/8.3 |
| North Texas | -2.212→-2.236 | -0.024 | 103→103 | 44.1/9.7 |
| Minnesota | 1.881→1.930 | +0.049 | 35→35 | 25.2/17.9 |

## Files

- `/workspace/cfb/week5_od_hx_ship_2026.json`
- `/workspace/cfb/week5_od_hx_ship_2026.md`

## Research / Website dependency

- **Not stamped.** Website stamp is out of scope for this pack. HX 2026.7 ship still needs its own Research peer CLEAR before Website stamp.
- **FINALs CLEAR (landed):** `week5_fbs_fbs_finals_clear_2026-10-04.md` — 55/55 HOLD 0. Thu already live, scores agree, no re-stamp: NMSU 34–WKU 13; UNT 45–44 Tulsa OT.
- **Tape Research peer CLEAR (landed):** `week5_tape_research_peer_clear_2026-10-04.md` — SU 39/55 (70.9%) · closer 20/55 (36.4%) FLAG. Same 55 ids; no score/SU/closer disagreements vs ESPN.
- Season rollup 203/258 in the tape memo is arithmetic, not a fresh W1–W4 audit. Not re-audited here.
- Soft-cal FLAG stays (closer 36.4% < 45). Do not fix calibration.
- Sources for this delta: ESPN PBP via `site.web.api.espn.com` and sportsdataverse `ep_model.ubj`. CFBD PPA unused. 247 composite and TWO·DEEP are not inputs here.
