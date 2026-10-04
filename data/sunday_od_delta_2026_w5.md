# HASHMARK Sunday O/D/ST EPA Δ — Week 5 → Week 6 (2026)

**Status:** offline draft of the unit file. **Not stamped.** Do not push / Re-Publish / open PRs / claim LIVE CLEAR. This HX 2026.7 ship is not itself Research-peer-CLEARed.

**FINALs CLEAR (landed):** `week5_fbs_fbs_finals_clear_2026-10-04.md` — 55/55 HOLD 0. ESPN STATUS_FINAL all 55. Thu already live, scores agree, no re-stamp: NMSU 34–WKU 13; UNT 45–44 Tulsa OT.

**Tape Research peer CLEAR (landed):** `week5_tape_research_peer_clear_2026-10-04.md`. SU **39/55 (70.9%)** · closer **20/55 (36.4%)** FLAG. Same 55 ids; no score/SU/closer disagreements vs ESPN. Season rollup 203/258 in that memo is arithmetic, not a fresh W1–W4 audit, and is not re-audited here.

**Soft-cal FLAG stays.** Week 5 closer 20/55 = 36.4% < 45. Do not fix calibration in this pack.

**Game-count check:** Week 5 FBS–FBS **55/55 FINAL** graded vs `metrics/week5_hx_vs_vegas_detail.json` (tape Research peer CLEAR: SU 39/55 = 70.9%, closer 20/55 = 36.4% FLAG). Score mismatches vs ESPN scoreboard: **0**. FINALs CLEAR 55/55 HOLD 0. + FBS–FCS FINALs (FCS opponent stubbed; no invented FCS HX / scores). Teams with no Week 5 final carry prior.

## Method

- **Prior O/D/ST:** `sunday_od_delta_2026_w4.json` `post_off` / `post_def` / `post_st` (Week 4→5 unit posts; same numbers as `week4_od_hx_ship_2026.json` posts). **Not** raw `teams.json` SP+.
- **Signal:** ESPN Week 5 play-by-play → EPA via sportsdataverse `ep_model.ubj` (2026.08.27). Same extractor as `sunday_od_delta_2026.py`. Pass/rush(/sack) for O/D; FG attempts only for ST.
- **Garbage strip:** ESPN home WP outside [0.05, 0.95] **or** margin > 24 in Q3/Q4.
- **Blowout cap (update):** observation clipped to prior ± 18.0 SP points before blend.
- **w_data (FBS–FBS):** `0.117647` = 1.0/(7.5+1.0) (PRIOR_N=7.5 pseudo-games). **FCS stub games:** `0.044586`.
- **EPA→SP map:** `EPA_TO_SP=55.0` (EPA/play × 55 ≈ SP-point units; league means recenter on w4 posts). Opponent adjust uses **prior** unit ratings (w4 posts) only — no ridge / no retrain.
- **FCS:** opponent prior stubbed at league mean − 8 SP; flagged `FCS_opponent_stubbed`. No invented FCS PPA / HX.
- **HX note:** unit file does not rewrite the board. Ship file applies `ΔHX = (ΔO+ΔD)/55` on HX 2026.6 (`week4_od_hx_ship_2026.json` `hx_post`). Capped O/D EPA only.

## What does NOT change

- Quadratic spread (A=0.050835, B=4.5795e-5) — no Vegas-fit retune
- Soft-cal FLAG (closer 20/55 = 36.4% < 45) — not adjusted in this pack
- Talent / zTalent / zPrior / zTrend / zRetention / zPortal weights
- Coach C20 residual, team-HFA, weather-on-sides, QB/tenure/SOS un-zero
- Second rating system / wholesale HX rewrite
- Invented FCS ratings or invented scores

## Counts

- Teams in file: **136**
- Teams updated from Week 5 EPA: **110**
- Teams with no update (no Week 5 final): **26**
- Scoreboard games: **59** (all STATUS_FINAL)
- FBS–FBS games used: **55** (ledger n=55; score mismatches=0)
- FBS–FCS stub games used: **4**
- Open games (excluded from Δ until final): []
- Blockers: none on cached ESPN summaries

## Top 10 |ΔO|+|ΔD| movers

| Team | prior O/D | post O/D | ΔO | ΔD | w_data | plays O/D kept | garbage stripped | note |
|---|---|---|---|---|---|---|---|---|
| Colorado State | 21.4/4.0 | 23.5/1.9 | +2.12 | -2.12 | 0.118 | 35/51 | 38 |  |
| Georgia State | 24.4/-0.3 | 26.5/1.8 | +2.12 | +2.12 | 0.118 | 17/27 | 56 |  |
| Old Dominion | 30.1/15.7 | 27.9/13.6 | -2.12 | -2.12 | 0.118 | 27/17 | 46 |  |
| Oregon State | 22.7/11.3 | 24.8/9.2 | +2.12 | -2.12 | 0.118 | 51/35 | 31 |  |
| Army | 28.9/13.1 | 30.7/11.0 | +1.84 | -2.12 | 0.118 | 61/49 | 9 |  |
| Louisiana Tech | 27.7/12.2 | 29.8/10.4 | +2.12 | -1.84 | 0.118 | 49/61 | 9 |  |
| Iowa State | 30.5/17.7 | 32.3/15.5 | +1.81 | -2.12 | 0.118 | 71/61 | 5 |  |
| West Virginia | 27.0/9.2 | 29.2/7.3 | +2.12 | -1.81 | 0.118 | 61/71 | 1 |  |
| Colorado | 25.6/11.9 | 27.4/14.0 | +1.79 | +2.12 | 0.118 | 56/59 | 24 |  |
| Texas Tech | 39.0/22.4 | 36.9/20.6 | -2.12 | -1.79 | 0.118 | 59/56 | 6 |  |

## Teams with no Week 5 FBS final in this run

- App State: no_week5_espn_final
- Duke: no_week5_espn_final
- East Carolina: no_week5_espn_final
- Florida Atlantic: FCS_opponent_stubbed; low_play_count_n=0
- Florida International: no_week5_espn_final
- Georgia Tech: no_week5_espn_final
- Indiana: low_play_count_n=0
- Jacksonville State: no_week5_espn_final
- Kansas State: no_week5_espn_final
- Kennesaw State: no_week5_espn_final
- LSU: FCS_opponent_stubbed; low_play_count_n=0
- Missouri State: no_week5_espn_final
- Nevada: no_week5_espn_final
- Northern Illinois: no_week5_espn_final
- Oklahoma: no_week5_espn_final
- Oklahoma State: no_week5_espn_final
- Ole Miss: no_week5_espn_final
- Oregon: no_week5_espn_final
- Rutgers: low_play_count_n=0
- Sam Houston: no_week5_espn_final
- Southern Miss: no_week5_espn_final
- Texas: no_week5_espn_final
- Troy: no_week5_espn_final
- Tulane: no_week5_espn_final
- UCLA: no_week5_espn_final
- Utah: no_week5_espn_final

## Optional HX proposals (applied in ship file, not this unit file)

`ΔHX ≈ (ΔO + ΔD) / 55` on HX 2026.6. Unit JSON keeps `hx_board_changed: false`.

| Team | proposed ΔHX | from ΔO | from ΔD |
|---|---|---|---|
| Georgia State | +0.077 | +2.12 | +2.12 |
| Old Dominion | -0.077 | -2.12 | -2.12 |
| Colorado | +0.071 | +1.79 | +2.12 |
| Texas Tech | -0.071 | -2.12 | -1.79 |
| Illinois | -0.068 | -1.64 | -2.12 |
| Purdue | +0.068 | +2.12 | +1.64 |
| Akron | -0.060 | -1.19 | -2.12 |
| Central Michigan | +0.060 | +2.12 | +1.19 |
| Boston College | +0.050 | +1.00 | +1.75 |
| SMU | -0.050 | -1.75 | -1.00 |
| Michigan | -0.049 | -1.64 | -1.05 |
| Minnesota | +0.049 | +1.05 | +1.64 |
| Ball State | +0.048 | +2.12 | +0.54 |
| New Mexico State | -0.048 | -1.29 | -1.37 |
| Toledo | -0.048 | -0.54 | -2.12 |

## Chase-care / miss-cluster team movers

| Team | prior O/D | post O/D | ΔO | ΔD | ΔST | w | plays O/D | updated | note |
|---|---|---|---|---|---|---|---|---|---|
| Georgia | 39.2/23.4 | 39.4/23.3 | +0.14 | -0.14 | +0.00 | 0.008 | 1/5 | True | low_play_count_n=1 |
| Ohio State | 38.7/29.4 | 40.8/28.7 | +2.12 | -0.69 | -1.06 | 0.118 | 41/36 | True |  |
| Texas | 36.1/22.8 | 36.1/22.8 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | no_week5_espn_final |
| Michigan | 34.4/21.7 | 32.7/20.6 | -1.64 | -1.05 | +0.00 | 0.118 | 47/61 | True |  |
| Oregon | 41.0/20.4 | 41.0/20.4 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | no_week5_espn_final |
| UNLV | 32.8/11.1 | 32.6/10.3 | -0.28 | -0.86 | +1.06 | 0.118 | 47/65 | True |  |
| Mississippi State | 38.6/8.9 | 39.1/7.9 | +0.45 | -0.91 | +1.06 | 0.118 | 42/32 | True |  |
| Oklahoma | 34.1/23.9 | 34.1/23.9 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | no_week5_espn_final |
| Minnesota | 24.2/16.2 | 25.2/17.9 | +1.05 | +1.64 | +1.06 | 0.118 | 61/47 | True |  |
| North Texas | 44.5/10.7 | 44.1/9.7 | -0.37 | -0.97 | +0.54 | 0.118 | 83/78 | True |  |
| Oklahoma State | 19.8/8.3 | 19.8/8.3 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | no_week5_espn_final |
| Alabama | 35.3/17.4 | 36.2/17.0 | +0.91 | -0.45 | +0.00 | 0.118 | 32/42 | True |  |
| Utah | 40.6/23.9 | 40.6/23.9 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | no_week5_espn_final |
| Notre Dame | 39.0/21.2 | 40.3/19.3 | +1.29 | -1.81 | +0.00 | 0.118 | 34/17 | True |  |
| LSU | 31.2/24.2 | 31.2/24.2 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | FCS_opponent_stubbed; low_play_count_n=0 |
| Clemson | 26.0/19.3 | 26.8/17.4 | +0.80 | -1.86 | +1.06 | 0.118 | 29/17 | True |  |
| Florida State | 32.2/14.6 | 34.4/14.7 | +2.12 | +0.17 | +1.06 | 0.118 | 49/38 | True |  |
| Northwestern | 27.9/17.2 | 30.0/17.3 | +2.12 | +0.13 | +1.06 | 0.118 | 37/43 | True |  |
| Stanford | 23.2/7.9 | 22.0/6.6 | -1.27 | -1.27 | -0.64 | 0.071 | 12/9 | True | low_play_count_n=9 |

## Files

- Updater: `/workspace/cfb/sunday_od_delta_2026_w5.py` (EPA from `sunday_od_delta_2026.py`)
- JSON: `/workspace/cfb/sunday_od_delta_2026_w5.json`
- This note: `/workspace/cfb/sunday_od_delta_2026_w5.md`
- HX 2026.7 ship: `/workspace/cfb/week5_od_hx_ship_2026.json` / `/workspace/cfb/week5_od_hx_ship_2026.md`
- Prior units: `sunday_od_delta_2026_w4.json`
- HX 2026.6 base: `week4_od_hx_ship_2026.json` `hx_post`

## Data notes

- Scoreboard: ESPN full dict `data/espn_week5_2026_scoreboard_fresh.json` (events) flattened in-process.
- Scores verified vs `metrics/week5_hx_vs_vegas_detail.json` (55 FBS–FBS) (0 mismatches). Tape Research peer CLEAR (SU 39/55 = 70.9%, closer 20/55 = 36.4% FLAG).
- Summaries: `data/espn_summaries_w5/{espn_id}.json` via `site.web.api.espn.com`.
- CFBD PPA unused (no key). No 247 composite / TWO·DEEP in this delta. No invented scores.
- FINALs CLEAR: `week5_fbs_fbs_finals_clear_2026-10-04.md` (55/55 HOLD 0). Tape CLEAR: `week5_tape_research_peer_clear_2026-10-04.md`. **Not stamped.** HX 2026.7 ship still needs its own Research peer CLEAR before Website stamp.
