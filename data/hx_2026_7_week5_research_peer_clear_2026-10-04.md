# RESEARCH PEER CLEAR — HX 2026.7 (Week 5 → Week 6 O/D Δ ship) · 2026-10-04 CT

**Role:** Research peer only — verify + memo. Do **not** stamp / merge / claim LIVE CLEAR / message AMD / Website / Chase.
**As of:** 2026-10-04 ~10:17 AM CT
**AMD packs verified:** `/workspace/cfb/sunday_od_delta_2026_w5.{json,md,py}` · `/workspace/cfb/week5_od_hx_ship_2026.{json,md}`
**Score truth (ground):** `/workspace/cfb/week5_fbs_fbs_finals_clear_2026-10-04.{md,json}` — **55 CLEAR / 0 HOLD**
**Tape peer (ground):** `/workspace/cfb/week5_tape_research_peer_clear_2026-10-04.md` — RESEARCH PEER CLEAR · SU **39/55 · 70.9%** · closer **20/55 · 36.4% FLAG**
**Prior board:** `week4_od_hx_ship_2026.json` `hx_post` = **HX 2026.6** (Georgia 7.8964)
**Unit prior:** `sunday_od_delta_2026_w4.json` `post_off` / `post_def` / `post_st`
**Cross-check:** `metrics/week5_hx_vs_vegas_detail.json` (n=55, held=[], problems=[]) · ESPN scoreboard `data/espn_week5_2026_scoreboard_fresh.json` (59 events, all STATUS_FINAL)
**Prior peer pattern:** `/workspace/cfb/hx2026_6_week4_research_peer_clear.md` (HX 2026.6)

## Header summary

| Field | Value |
|------|-------|
| **Verdict** | **RESEARCH PEER CLEAR** |
| Date CT | 2026-10-04 ~10:17 AM CT |
| Georgia #1 | **7.8964** · rank **1** (hx_pre 7.8964 · ΔHX **+0.0000** · ΔO **+0.141** / ΔD **−0.141**) |
| 55/55 score match | **yes** (FINALs CLEAR ≡ grade ledger ≡ ESPN scoreboard OD input · 0 mismatches) |
| Knobs ok | **yes** (identical to W4 and W3 / frozen w1) |
| Method | O/D delta on HX 2026.6 posts. **Not a retrain.** |
| Stampable for Website | **yes** (HX 2026.7 ship JSON/MD) — Website owns stamp/merge/LIVE; Research does not |
| Soft-cal FLAG | **still in force** — closer 36.4% < 45 · **not** cleared · **not** a ship-blocker |
| Season 203/258 | **not re-audited** (tape memo arithmetic only) |

## PASS / HOLD

| Check | Research verdict | Notes |
|------|------------------|-------|
| 1. Score lock FBS–FBS | **PASS** | Programmatic: all **55** FINALs CLEAR `espn_event_id`s present in `metrics/week5_hx_vs_vegas_detail.json` and in flattened ESPN W5 scoreboard with **identical** `score_away`/`score_home`. Every matched status `STATUS_FINAL`. Grade `held_games=[]`, `problems=[]`. OD meta `n_fbs_fbs=55`, `grade_n=55`, `score_mismatch_n=0`, `open_games=[]`, `blockers=[]`, `fbs_fbs_locked=true`. Ship JSON same counts. |
| 2. No invented FCS HX/scores | **PASS** | 4 FBS–FCS stubs flagged `FCS_opponent_stubbed`: Florida Atlantic, LSU, UAB, Wyoming. Same four ids the FINALs pack excludes from the 55 (McNeese@LSU 14–63, Samford@UAB 14–33, Wyoming@NDSU 0–28, Texas Southern@FAU 10–66). Opponent prior stubbed at league mean − 8 SP (`FCS_STUB_SHIFT_OFF/DEF = -8.0`). No FCS schools on the 136-team board. `hx_board_changed=false`. |
| 3. Georgia #1 = 7.8964, ΔHX 0.0000 | **PASS** | Ship JSON: `georgia_hx_pre=7.8964`, `georgia_hx_post=7.8964`, `georgia_delta_hx=0.0`, ranks 1→1, `georgia_hx_2026_6=7.8964`. Row: ΔO **+0.141** · ΔD **−0.141** · (sum)/55 = **0**. O/D post displays **39.4/23.3**. Low-play note `low_play_count_n=1` (w_data 0.0078; 1/5 plays kept, 70 garbage-stripped) — net zero, not a rank move. |
| 4. ΔHX = (ΔO+ΔD)/55 | **PASS** | **0** formula errs after `round(..., 4)` on all **136**. **0** `hx_post ≠ round(hx_pre+ΔHX, 4)`. **0** abs error > 5e-5. Code path `write_ship`: `d_hx = (delta_off + delta_def) / EPA_TO_SP` with `EPA_TO_SP=55.0`. |
| 5. Frozen knobs | **PASS** | W5 OD meta ≡ W4 OD meta ≡ W3 OD meta ≡ `sunday_od_delta_2026.py`: `w_data_fbs=0.117647` (= 1.0/(7.5+1.0)), `w_data_fcs=0.044586` (= 0.35/(7.5+0.35)), `prior_n=7.5`, `epa_to_sp=55.0`, `obs_clip=18.0`, WP garbage **[0.05, 0.95]**, `margin_blowout=24`. Quadratic cited unchanged **A=0.050835, B=4.5795e-5** (same line as W4 unit MD). `quadratic_changed=false`, `talent_changed=false`. QB/tenure/SOS stay in `unchanged` as un-zero. |
| 6. Not a retrain | **PASS** | Base is HX **2026.6** posts, not a refit. **136/136** `hx_pre` ≡ week4 ship `hx_post`. **136/136** unit `prior_off/def/st` ≡ week4 OD `post_off/def/st`. Ship O/D fields ≡ week5 OD rows (0 mismatches). File language is “no weight retrain / no ridge / no Vegas-fit”, not a retrain claim. `hx_board_changed=false`. |
| 7. Board integrity | **PASS** | **136/136** teams; ranks **1..136** unique; hx strictly decreasing by rank (no ties); **0** NaNs; updated **110** / not-updated **26**. Team-row schema keys identical to HX 2026.6 ship. |
| 8. Soft-cal FLAG | **PASS (FLAG stays)** | Ship + unit MD/JSON: “Soft-cal FLAG stays”, closer **20/55 = 36.4% < 45**, “do not fix calibration”. No “FLAG cleared” / “lift FLAG” / “soft-cal clear”. FLAG is **not** cleared by this peer. Not a HX ship-blocker (same posture as HX 2026.6). |
| 9. Season rollup | **NOT AUDITED** | Tape memo’s 203/258 SU / closer rollup is arithmetic from prior weekly notes plus this week. This peer did **not** re-audit W1–W4. Not required. Not a blocker. |

## Key numbers

| Item | Value |
|------|-------|
| Board | **HX 2026.7** · n=**136** · as_of **2026-10-04** · generated_utc **2026-10-04T15:13:54Z** (10:13 AM CT) · `stamped=false` |
| Georgia | **#1** · 7.8964 → **7.8964** · ΔHX **+0.0000** · ΔO **+0.141** · ΔD **−0.141** |
| Largest \|ΔHX\| | Georgia State **+0.0770** (122→122); Old Dominion **−0.0770** (92→92). Exact pair ±2.118 / ±2.118. |
| Next | Texas Tech **−0.0711** (7→7); Colorado **+0.0711** (73→72) |
| FBS–FBS used | **55/55 FINAL** · score_mismatch_n **0** · FCS stubs **4** · teams updated **110** · prior-carry **26** |
| Base | HX **2026.6** (`week4_od_hx_ship_2026.json` `hx_post`) |
| Tape (cited, not re-graded) | SU **39/55 (70.9%)** · closer **20/55 (36.4%) FLAG** |
| Blockers | none · `open_games=[]` |

## Top 10 (HX 2026.7) — verified from ship JSON

| Rank | Team | HX | ΔHX | Δrk |
|---|---|---|---|---|
| 1 | Georgia | 7.8964 | +0.0000 | +0 |
| 2 | Ohio State | 7.8390 | +0.0259 | +0 |
| 3 | Notre Dame | 7.0122 | −0.0094 | +0 |
| 4 | Oregon | 6.9019 | +0.0000 | +0 |
| 5 | Texas | 6.4516 | +0.0000 | +0 |
| 6 | Texas A&M | 6.0649 | +0.0063 | +0 |
| 7 | Texas Tech | 5.7444 | −0.0711 | +0 |
| 8 | Ole Miss | 5.4289 | +0.0000 | +0 |
| 9 | Alabama | 5.2904 | +0.0083 | +0 |
| 10 | Miami | 5.2538 | +0.0193 | +0 |

MD top-25 is the same board at 3 decimals (Texas Tech −0.071 is −0.0711 rounded). Rank order matches.

## Spot-checks (ΔHX) — recomputed

| Team | ΔO | ΔD | (ΔO+ΔD)/55 | ship ΔHX | HX pre→post | rk |
|------|-----|-----|------------|----------|-------------|-----|
| Georgia | +0.141 | −0.141 | +0.000000 | **+0.0000** | 7.8964→7.8964 | 1→1 |
| Georgia State | +2.118 | +2.118 | +0.077018 | **+0.0770** | −4.3349→−4.2579 | 122→122 |
| Old Dominion | −2.118 | −2.118 | −0.077018 | **−0.0770** | −1.3494→−1.4264 | 92→92 |
| Kansas | +0.332 | +1.301 | +0.029691 | **+0.0297** | 0.7891→0.8188 | 55→55 |
| Boise State | +0.706 | −0.192 | +0.009345 | **+0.0093** | 1.3371→1.3464 | 47→47 |

Kansas and Boise State are the two extra spots (seed 20261004 over the 136-name list, excluding the three named teams). Full-board check is 136/136, not only these five.

## Frozen knobs (quoted from the files)

From `sunday_od_delta_2026_w5.json` `meta` and `week5_od_hx_ship_2026.json` `method`, identical to W4 and W3 OD meta and to `sunday_od_delta_2026.py`:

- `w_data_fbs` **0.117647** = `N_EFF_FBS / (PRIOR_N + N_EFF_FBS)` with `N_EFF_FBS=1.0`, `PRIOR_N=7.5`
- `w_data_fcs` **0.044586** = `0.35 / (7.5 + 0.35)`
- `epa_to_sp` **55.0** — also the ΔHX divisor
- `obs_clip` **18.0** (observation clipped to prior ± 18 SP before blend)
- `wp_garbage` **[0.05, 0.95]**
- `margin_blowout` **24**
- Quadratic (unit MD, same string as W4): **A=0.050835, B=4.5795e-5** — no Vegas-fit retune
- `ST_W_SCALE=0.5`, FCS stub shift **−8** SP (code constants; not retuned in `sunday_od_delta_2026_w5.py`, which imports them from `sunday_od_delta_2026`)

`sunday_od_delta_2026_w5.py` header: “Same frozen knobs. NO retrain, NO quadratic retune, NO team HFA, NO invent FCS HX, NO invent scores. NO calibration fix.”

## Score-lock method (Research)

1. Load FINALs CLEAR 55 games + grade ledger 55 games + flatten ESPN `data/espn_week5_2026_scoreboard_fresh.json` (same flatten as `sunday_od_delta_2026_w5.py`).
2. Assert ID sets of FINALs and grade equal; assert every score pair identical; assert every scoreboard status for those ids `STATUS_FINAL`.
3. Result: **55/55 match · 0 mismatches · 0 missing**. Scoreboard has 59 finals; the extra 4 are the FBS–FCS stubs above, not in the grade denominator.
4. Thursday already-live scores inside the 55 agree: NMSU 34–WKU 13 (13–34); UNT 45–44 Tulsa.

## Soft-cal / season reminder

- Tape closer **36.4% FLAG** / soft-cal **still in force**. This memo does **not** clear it.
- Do **not** re-label as A/B. No locks language. Do not fix calibration in this pack.
- Season **203/258** is **not** a fresh W1–W4 audit and was not treated as one.

## Nits (non-blocking)

| Nit | Blocking? |
|-----|-----------|
| `max_abs_delta_hx` field is signed **−0.077** (Old Dominion), not the absolute value — same class of nit as HX 2026.6 (that field was signed +0.071) | **Non-blocking** |
| Unit MD section “Teams with no Week 5 FBS final” also lists Indiana, Rutgers, LSU, and Florida Atlantic. Those four **did** have a Week 5 FINAL (`games_used=1`) but **0** non-garbage O/D plays (garbage stripped 76 / 71 / 107 / 60). ΔO=ΔD=0 is what the frozen garbage rule produces, not a missing score. Indiana@Rutgers 47–15 and the two FCS blowouts are in the score lock. | **Non-blocking** |
| 3-dp MD display: Texas Tech −0.071 vs JSON −0.0711; unit proposal table rounds NMSU to −0.048 while ship 3-dp shows −0.049 (exact **−0.0485**). Formula at 4 dp is exact. | **Non-blocking** |
| Ship JSON/MD still say the HX 2026.7 ship is not itself Research-peer-CLEARed (`hx_ship_research_peer_clear: false`). Expected AMD draft state. This memo is the peer CLEAR; Research does not edit or stamp the ship. | **Non-blocking** |

## Verdict scope

Research **CLEAR** for Website to stamp **HX 2026.7** from `week5_od_hx_ship_2026.json` (units from `sunday_od_delta_2026_w5.json`).
This memo does **not** authorize merge / LIVE CLEAR / Marketing quotes / X. Research does **not** stamp. Parent hands off.
Soft-cal FLAG is **not** cleared. Season 203/258 was **not** re-audited.

**VERDICT: RESEARCH PEER CLEAR**
**hold_reasons: []**
**stampable_for_website: yes**
**soft_cal_flag: STAYS (closer 20/55 = 36.4% < 45)**
