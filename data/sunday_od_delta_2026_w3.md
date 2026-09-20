# HASHMARK Sunday O/D/ST EPA Δ — Week 3 → Week 4 (2026)

**Status:** offline draft pending Research/AMD peer clear. Do **not** push / Re-Publish / open PRs / claim LIVE CLEAR.

**Stamp:** Week 3 FBS–FBS **56/56 FINAL** (graded vs `metrics/week3_hx_vs_vegas_detail.json`) + FBS–FCS FINALs (FCS opponent stubbed; no invented FCS HX / scores). Teams with no Week 3 final carry prior.

## Method

- **Prior O/D/ST:** `sunday_od_delta_2026_w2.json` `post_off` / `post_def` / `post_st` (Week 2→3 unit posts). **Not** raw `teams.json` SP+.
- **Signal:** ESPN Week 3 play-by-play → EPA via sportsdataverse `ep_model.ubj` (2026.08.27). Same extractor as `sunday_od_delta_2026.py`. Pass/rush(/sack) for O/D; FG attempts only for ST.
- **Garbage strip:** ESPN home WP outside [0.05, 0.95] **or** margin > 24 in Q3/Q4.
- **Blowout cap (update):** observation clipped to prior ± 18.0 SP points before blend.
- **w_data (FBS–FBS):** `0.117647` = 1.0/(7.5+1.0) (PRIOR_N=7.5 pseudo-games). **FCS stub games:** `0.044586`.
- **EPA→SP map:** `EPA_TO_SP=55.0` (EPA/play × 55 ≈ SP-point units; league means recenter on w2 posts). Opponent adjust uses **prior** unit ratings (w2 posts) only — no ridge / no retrain.
- **FCS:** opponent prior stubbed at league mean − 8 SP; flagged `FCS_opponent_stubbed`. No invented FCS PPA / HX.
- **HX note:** unit file does not rewrite the board. Ship file applies `ΔHX = (ΔO+ΔD)/55` on HX 2026.4 (`week2_od_hx_ship_2026.json` `hx_post`).

## What does NOT change

- Quadratic spread (A=0.050835, B=4.5795e-5) — no Vegas-fit retune
- Talent / zTalent / zPrior / zTrend / zRetention / zPortal weights
- Coach C20 residual, team-HFA, weather-on-sides, QB/tenure/SOS un-zero
- Second rating system / wholesale HX rewrite
- Invented FCS ratings or invented scores

## Counts

- Teams in file: **136**
- Teams updated from Week 3 EPA: **107**
- Teams with no update (no Week 3 final): **29**
- Scoreboard games: **75** (all STATUS_FINAL)
- FBS–FBS games used: **56** (locked 56/56)
- FBS–FCS stub games used: **18**
- Open games (excluded from Δ until final): []
- Blockers: none on cached ESPN summaries

## Top 10 |ΔO|+|ΔD| movers

| Team | prior O/D | post O/D | ΔO | ΔD | w_data | plays O/D kept | garbage stripped | note |
|---|---|---|---|---|---|---|---|---|
| Alabama | 32.7/21.0 | 34.8/18.9 | +2.12 | -2.12 | 0.118 | 48/41 | 21 |  |
| Florida State | 30.1/16.7 | 32.2/14.6 | +2.12 | -2.12 | 0.118 | 41/48 | 25 |  |
| Louisville | 33.7/19.6 | 35.8/17.5 | +2.12 | -2.12 | 0.118 | 52/69 | 8 |  |
| NC State | 30.1/14.0 | 32.2/11.8 | +2.12 | -2.12 | 0.118 | 75/54 | 3 |  |
| Purdue | 24.3/8.3 | 26.4/6.2 | +2.12 | -2.12 | 0.118 | 48/65 | 11 |  |
| SMU | 35.9/19.4 | 38.0/17.3 | +2.12 | -2.12 | 0.118 | 69/52 | 10 |  |
| Temple | 28.8/8.2 | 30.9/6.1 | +2.12 | -2.12 | 0.118 | 63/58 | 10 |  |
| Toledo | 28.0/20.5 | 30.1/18.4 | +2.12 | -2.12 | 0.118 | 58/63 | 18 |  |
| UCLA | 24.5/9.9 | 26.7/7.8 | +2.12 | -2.12 | 0.118 | 65/48 | 15 |  |
| Vanderbilt | 37.7/18.5 | 39.8/16.4 | +2.12 | -2.12 | 0.118 | 54/75 | 1 |  |

## Teams with no Week 3 FBS final in this run

- Air Force: no_week3_espn_final
- Army: no_week3_espn_final
- Buffalo: low_play_count_n=0
- California: FCS_opponent_stubbed; low_play_count_n=0
- Hawai'i: no_week3_espn_final
- Illinois: FCS_opponent_stubbed; low_play_count_n=0
- Indiana: low_play_count_n=0
- Kennesaw State: low_play_count_n=0
- Kent State: low_play_count_n=0
- Memphis: FCS_opponent_stubbed; low_play_count_n=0
- Michigan State: low_play_count_n=0
- Navy: no_week3_espn_final
- Nebraska: FCS_opponent_stubbed; low_play_count_n=0
- New Mexico State: no_week3_espn_final
- Notre Dame: low_play_count_n=0
- Ohio State: low_play_count_n=0
- Oklahoma State: FCS_opponent_stubbed; low_play_count_n=0
- Oregon: FCS_opponent_stubbed; low_play_count_n=0
- Penn State: low_play_count_n=0
- Tennessee: low_play_count_n=0
- Texas: low_play_count_n=0
- Tulsa: FCS_opponent_stubbed; low_play_count_n=0
- UNLV: no_week3_espn_final
- UTSA: low_play_count_n=0
- Utah: low_play_count_n=0
- Utah State: low_play_count_n=0
- Washington: FCS_opponent_stubbed; low_play_count_n=0
- Washington State: FCS_opponent_stubbed; low_play_count_n=0
- Western Kentucky: low_play_count_n=0

## Optional HX proposals (applied in ship file, not this unit file)

`ΔHX ≈ (ΔO + ΔD) / 55` on HX 2026.4. Unit JSON keeps `hx_board_changed: false`.

| Team | proposed ΔHX | from ΔO | from ΔD |
|---|---|---|---|
| Missouri | -0.071 | -2.12 | -1.79 |
| Troy | +0.071 | +1.79 | +2.12 |
| Mississippi State | +0.053 | +2.12 | +0.78 |
| South Carolina | -0.053 | -0.78 | -2.12 |
| BYU | +0.048 | +1.41 | +1.25 |
| Colorado State | -0.048 | -1.25 | -1.41 |
| Southern Miss | -0.047 | -1.92 | -0.66 |
| UConn | +0.047 | +0.66 | +1.92 |
| Coastal Carolina | +0.044 | +1.59 | +0.84 |
| Delaware | -0.044 | -0.84 | -1.59 |
| Akron | +0.041 | +0.28 | +1.98 |
| Kansas State | +0.041 | +1.35 | +0.88 |
| Minnesota | -0.041 | -1.98 | -0.28 |
| Tulane | -0.041 | -0.88 | -1.35 |
| Virginia | -0.040 | -0.09 | -2.12 |

## Chase-care / miss-cluster team movers

| Team | prior O/D | post O/D | ΔO | ΔD | ΔST | w | plays O/D | updated | note |
|---|---|---|---|---|---|---|---|---|---|
| Georgia | 37.5/25.7 | 37.5/25.3 | +0.00 | -0.42 | +0.00 | 0.024 | 0/3 | True | low_play_count_n=3 |
| Ohio State | 38.7/29.4 | 38.7/29.4 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | low_play_count_n=0 |
| Texas | 37.1/21.3 | 37.1/21.3 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | low_play_count_n=0 |
| Michigan | 32.3/22.0 | 32.2/21.8 | -0.02 | -0.14 | +0.00 | 0.008 | 9/1 | True | low_play_count_n=1 |
| Oregon | 39.1/22.5 | 39.1/22.5 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | FCS_opponent_stubbed; low_play_count_n=0 |
| UNLV | 31.2/11.7 | 31.2/11.7 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | no_week3_espn_final |
| Mississippi State | 35.7/8.7 | 37.8/9.5 | +2.12 | +0.78 | +0.81 | 0.118 | 46/55 | True |  |
| Oklahoma | 33.0/25.2 | 32.3/25.7 | -0.70 | +0.51 | -1.06 | 0.118 | 48/55 | True |  |
| Minnesota | 24.1/16.3 | 22.1/16.0 | -1.98 | -0.28 | +0.18 | 0.110 | 14/18 | True | low_play_count_n=14 |
| North Texas | 44.7/12.5 | 44.4/10.7 | -0.26 | -1.77 | +0.00 | 0.118 | 75/64 | True |  |
| Oklahoma State | 17.7/9.1 | 17.7/9.1 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | FCS_opponent_stubbed; low_play_count_n=0 |
| Alabama | 32.7/21.0 | 34.8/18.9 | +2.12 | -2.12 | +1.06 | 0.118 | 48/41 | True |  |
| Utah | 39.6/24.1 | 39.6/24.1 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | low_play_count_n=0 |
| Notre Dame | 39.0/21.6 | 39.0/21.6 | +0.00 | +0.00 | +0.00 | 0.000 | 0/0 | False | low_play_count_n=0 |
| LSU | 27.0/24.9 | 29.1/23.7 | +2.12 | -1.25 | +0.37 | 0.118 | 67/70 | True |  |
| Clemson | 24.4/20.6 | 26.3/18.7 | +1.95 | -1.88 | +1.06 | 0.118 | 59/64 | True |  |
| Florida State | 30.1/16.7 | 32.2/14.6 | +2.12 | -2.12 | +0.00 | 0.118 | 41/48 | True |  |
| Northwestern | 24.7/19.5 | 25.8/17.4 | +1.09 | -2.12 | +0.00 | 0.118 | 41/27 | True |  |
| Stanford | 20.5/10.3 | 21.1/10.0 | +0.60 | -0.32 | +0.00 | 0.118 | 22/35 | True |  |

## Files

- Updater: `/workspace/cfb/sunday_od_delta_2026_w3.py` (EPA from `sunday_od_delta_2026.py`)
- JSON: `/workspace/cfb/sunday_od_delta_2026_w3.json`
- This note: `/workspace/cfb/sunday_od_delta_2026_w3.md`
- HX 2026.5 ship: `/workspace/cfb/week3_od_hx_ship_2026.json` / `/workspace/cfb/week3_od_hx_ship_2026.md`
- Prior units: `sunday_od_delta_2026_w2.json`
- HX 2026.4 base: `week2_od_hx_ship_2026.json` `hx_post`

## Data notes

- Scoreboard: ESPN site.web.api dates 20260917–20260920 (groups=80) flattened to `data/espn_week3_2026_scoreboard_finals.json`.
- Scores verified vs `metrics/week3_hx_vs_vegas_detail.json` (56 FBS–FBS) (0 mismatches).
- Summaries: `data/espn_summaries_w3/{espn_id}.json` via `site.web.api.espn.com`.
- CFBD PPA unused (no key). No invented scores.

## Research dependency / WP garbage strip

**Status remains:** offline draft pending Research/AMD peer clear — do **not** claim LIVE CLEAR / stamp site / open PRs.

Week 3 blowouts and heavy-favorite WP paths strip nearly all plays under frozen knobs (`WP` outside [0.05, 0.95] **or** margin > 24 in Q3/Q4). Teams with a FINAL on the scoreboard but **0 kept pass/rush plays** carry prior (no invented EPA):

Buffalo, California, Illinois, Indiana, Kennesaw State, Kent State, Memphis, Michigan State, Nebraska, Notre Dame, Ohio State, Oklahoma State, Oregon, Penn State, Tennessee, Texas, Tulsa, UTSA, Utah, Utah State, Washington, Washington State, Western Kentucky

Bye / no Week 3 ESPN final (carry prior): Air Force, Army, Hawai'i, Navy, New Mexico State, UNLV

FBS–FBS scoreboard vs `metrics/week3_hx_vs_vegas_detail.json`: **56/56, 0 score mismatches**. Open games: none.
