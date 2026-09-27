# HASHMARK Sunday O/D/ST EPA Δ — Week 4 → Week 5 (2026)

**Status:** offline draft pending Research/Website peer CLEAR of **HX 2026.6** ship. Do **not** push / Re-Publish / open PRs / claim LIVE CLEAR.

**Research FINALs+tape (already on disk):** `/workspace/cfb/week4_fbs_fbs_finals_clear_2026-09-27.{md,json}` (57/57 CLEAR) · `/workspace/cfb/week4_tape_research_peer_clear_2026-09-27.md` (tape peer CLEAR). HX 2026.6 Research peer CLEAR memo still required before Website stamp.

**Stamp:** Week 4 FBS–FBS **57/57 FINAL** (graded vs `metrics/week4_hx_vs_vegas_detail.json`) + FBS–FCS FINALs (FCS opponent stubbed; no invented FCS HX / scores). Teams with no Week 4 final carry prior.

## Method

- **Prior O/D/ST:** `sunday_od_delta_2026_w3.json` `post_off` / `post_def` / `post_st` (Week 3→4 unit posts). **Not** raw `teams.json` SP+.
- **Signal:** ESPN Week 4 play-by-play → EPA via sportsdataverse `ep_model.ubj` (2026.08.27). Same extractor as `sunday_od_delta_2026.py`. Pass/rush(/sack) for O/D; FG attempts only for ST.
- **Garbage strip:** ESPN home WP outside [0.05, 0.95] **or** margin > 24 in Q3/Q4.
- **Blowout cap (update):** observation clipped to prior ± 18.0 SP points before blend.
- **w_data (FBS–FBS):** `0.117647` = 1.0/(7.5+1.0) (PRIOR_N=7.5 pseudo-games). **FCS stub games:** `0.044586`.
- **EPA→SP map:** `EPA_TO_SP=55.0` (EPA/play × 55 ≈ SP-point units; league means recenter on w3 posts). Opponent adjust uses **prior** unit ratings (w3 posts) only — no ridge / no retrain.
- **FCS:** opponent prior stubbed at league mean − 8 SP; flagged `FCS_opponent_stubbed`. No invented FCS PPA / HX.
- **HX note:** unit file does not rewrite the board. Ship file applies `ΔHX = (ΔO+ΔD)/55` on HX 2026.5 (`week3_od_hx_ship_2026.json` `hx_post`).

## What does NOT change

- Quadratic spread (A=0.050835, B=4.5795e-5) — no Vegas-fit retune
- Talent / zTalent / zPrior / zTrend / zRetention / zPortal weights
- Coach C20 residual, team-HFA, weather-on-sides, QB/tenure/SOS un-zero
- Second rating system / wholesale HX rewrite
- Invented FCS ratings or invented scores

## Counts

- Teams in file: **136**
- Teams updated from Week 4 EPA: **117**
- Teams with no update (no Week 4 final): **19**
- Scoreboard games: **71** (all STATUS_FINAL)
- FBS–FBS games used: **57** (locked 57/57)
- FBS–FCS stub games used: **14**
- Open games (excluded from Δ until final): []
- Blockers: none on cached ESPN summaries

## Top 10 |ΔO|+|ΔD| movers

| Team | prior O/D | post O/D | ΔO | ΔD | w_data | plays O/D kept | garbage stripped | note |
|---|---|---|---|---|---|---|---|---|
| Georgia Southern | 27.5/3.7 | 29.6/1.5 | +2.12 | -2.12 | 0.118 | 25/29 | 43 |  |
| Houston | 33.7/13.8 | 35.8/11.7 | +2.12 | -2.12 | 0.118 | 29/25 | 38 |  |
| Georgia Tech | 30.7/14.1 | 32.8/12.0 | +2.09 | -2.12 | 0.118 | 64/71 | 5 |  |
| Stanford | 21.1/10.0 | 23.2/7.9 | +2.12 | -2.09 | 0.118 | 71/64 | 1 |  |
| Florida Atlantic | 29.1/3.8 | 31.1/1.6 | +2.00 | -2.12 | 0.118 | 52/25 | 39 |  |
| UL Monroe | 18.1/2.5 | 20.2/0.5 | +2.12 | -2.00 | 0.118 | 25/52 | 39 |  |
| Oregon | 39.1/22.5 | 41.0/20.4 | +1.92 | -2.12 | 0.118 | 62/62 | 6 |  |
| USC | 39.1/17.3 | 41.2/15.4 | +2.12 | -1.92 | 0.118 | 62/62 | 14 |  |
| Charlotte | 15.4/0.8 | 13.5/2.9 | -1.86 | +2.05 | 0.118 | 24/59 | 22 |  |
| Louisiana | 26.3/5.9 | 24.3/7.7 | -2.05 | +1.86 | 0.118 | 59/24 | 19 |  |

## Teams with no Week 4 FBS final in this run

- Arizona State: no_week4_espn_final
- BYU: no_week4_espn_final
- Central Michigan: low_play_count_n=0
- Duke: FCS_opponent_stubbed; low_play_count_n=0
- East Carolina: FCS_opponent_stubbed; low_play_count_n=0
- Florida State: FCS_opponent_stubbed; low_play_count_n=0
- Illinois: low_play_count_n=0
- Kansas: no_week4_espn_final
- Louisiana Tech: no_week4_espn_final
- Memphis: no_week4_espn_final
- Miami: low_play_count_n=0
- North Carolina: no_week4_espn_final
- Ohio: FCS_opponent_stubbed; low_play_count_n=0
- Ohio State: low_play_count_n=0
- Pittsburgh: FCS_opponent_stubbed; low_play_count_n=0
- Rutgers: FCS_opponent_stubbed; low_play_count_n=0
- San José State: no_week4_espn_final
- Syracuse: no_week4_espn_final
- Western Kentucky: FCS_opponent_stubbed; low_play_count_n=0

## Optional HX proposals (applied in ship file, not this unit file)

`ΔHX ≈ (ΔO + ΔD) / 55` on HX 2026.5. Unit JSON keeps `hx_board_changed: false`.

| Team | proposed ΔHX | from ΔO | from ΔD |
|---|---|---|---|
| Maryland | -0.071 | -2.12 | -1.79 |
| UCLA | +0.071 | +1.79 | +2.12 |
| Missouri State | +0.051 | +1.57 | +1.24 |
| SMU | -0.051 | -1.24 | -1.57 |
| Penn State | -0.050 | -1.46 | -1.29 |
| Wisconsin | +0.050 | +1.29 | +1.46 |
| LSU | +0.047 | +2.06 | +0.51 |
| Texas A&M | -0.047 | -0.51 | -2.06 |
| Minnesota | +0.043 | +2.12 | +0.23 |
| Washington | -0.043 | -0.23 | -2.12 |
| Boise State | +0.042 | +1.53 | +0.76 |
| Western Michigan | -0.042 | -0.76 | -1.53 |
| Baylor | -0.038 | -1.87 | -0.20 |
| Colorado | +0.038 | +0.20 | +1.87 |
| San Diego State | -0.036 | -0.67 | -1.30 |

## Chase-care / miss-cluster team movers

| Team | prior O/D | post O/D | ΔO | ΔD | ΔST | w | plays O/D | updated | note |
|---|---|---|---|---|---|---|---|---|---|
| Georgia | 37.5/25.3 | 39.2/23.4 | +1.76 | -1.83 | +0.00 | 0.102 | 15/13 | True | low_play_count_n=13 |
| Ohio State | 38.7/29.4 | 38.7/29.4 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | low_play_count_n=0 |
| Texas | 37.1/21.3 | 36.1/22.8 | -1.03 | +1.43 | +1.06 | 0.118 | 49/61 | True |  |
| Michigan | 32.2/21.8 | 34.4/21.7 | +2.12 | -0.17 | +1.06 | 0.118 | 67/47 | True |  |
| Oregon | 39.1/22.5 | 41.0/20.4 | +1.92 | -2.12 | +0.85 | 0.118 | 62/62 | True |  |
| UNLV | 31.2/11.7 | 32.8/11.1 | +1.66 | -0.60 | +0.00 | 0.118 | 40/45 | True |  |
| Mississippi State | 37.8/9.5 | 38.6/8.9 | +0.80 | -0.67 | +0.79 | 0.118 | 75/70 | True |  |
| Oklahoma | 32.3/25.7 | 34.1/23.9 | +1.83 | -1.76 | +0.00 | 0.102 | 13/15 | True | low_play_count_n=13 |
| Minnesota | 22.1/16.0 | 24.2/16.2 | +2.12 | +0.23 | +1.06 | 0.118 | 56/46 | True |  |
| North Texas | 44.4/10.7 | 44.5/10.7 | +0.05 | -0.05 | +0.00 | 0.003 | 2/1 | True | FCS_opponent_stubbed; low_play_count_n=1 |
| Oklahoma State | 17.7/9.1 | 19.8/8.3 | +2.12 | -0.79 | -1.04 | 0.118 | 56/75 | True |  |
| Alabama | 34.8/18.9 | 35.3/17.4 | +0.50 | -1.47 | +0.00 | 0.118 | 18/27 | True |  |
| Utah | 39.6/24.1 | 40.6/23.9 | +0.99 | -0.24 | +0.44 | 0.118 | 23/30 | True |  |
| Notre Dame | 39.0/21.6 | 39.0/21.2 | +0.00 | -0.42 | +0.00 | 0.024 | 0/3 | True | low_play_count_n=3 |
| LSU | 29.1/23.7 | 31.2/24.2 | +2.06 | +0.51 | +0.00 | 0.118 | 32/35 | True |  |
| Clemson | 26.3/18.7 | 26.0/19.3 | -0.37 | +0.58 | +0.15 | 0.118 | 64/52 | True |  |
| Florida State | 32.2/14.6 | 32.2/14.6 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | FCS_opponent_stubbed; low_play_count_n=0 |
| Northwestern | 25.8/17.4 | 27.9/17.2 | +2.12 | -0.22 | +0.00 | 0.118 | 36/54 | True |  |
| Stanford | 21.1/10.0 | 23.2/7.9 | +2.12 | -2.09 | +1.06 | 0.118 | 71/64 | True |  |

## Files

- Updater: `/workspace/cfb/sunday_od_delta_2026_w4.py` (EPA from `sunday_od_delta_2026.py`)
- JSON: `/workspace/cfb/sunday_od_delta_2026_w4.json`
- This note: `/workspace/cfb/sunday_od_delta_2026_w4.md`
- HX 2026.6 ship: `/workspace/cfb/week4_od_hx_ship_2026.json` / `/workspace/cfb/week4_od_hx_ship_2026.md`
- Prior units: `sunday_od_delta_2026_w3.json`
- HX 2026.5 base: `week3_od_hx_ship_2026.json` `hx_post`

## Data notes

- Scoreboard: ESPN full dict `data/espn_week4_2026_scoreboard_finals.json` (events) flattened in-process.
- Scores verified vs `metrics/week4_hx_vs_vegas_detail.json` (57 FBS–FBS) (0 mismatches).
- Summaries: `data/espn_summaries_w4/{espn_id}.json` via `site.web.api.espn.com`.
- CFBD PPA unused (no key). No invented scores.
