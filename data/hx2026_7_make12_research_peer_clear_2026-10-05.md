# RESEARCH PEER CLEAR — Make 12 / win-title 10k re-sim · HX 2026.7 (OFFLINE) · 2026-10-05 CT

**Role:** Research peer only — verify + memo. Do **not** stamp / merge / claim LIVE CLEAR / message AMD / Website / Chase.  
**As of:** 2026-10-05 ~9:28 AM CT  
**AMD pack verified:** `/workspace/cfb/hx2026_7_make12_resim_offline_2026-10-05.md`  
**Artifacts:** `sim_10k_2026_hx2026_7.{json,md}` · `hx_edge_full_sim_table_2026_7.json` · `hx_edge_unit_pulse_week5_hx2026_7.json`  
**Ship linkage:** `/workspace/cfb/week5_od_hx_ship_2026.json` (HX 2026.7 live board; Georgia hx_post **7.8964** · rank **1**)  
**Prior Make 12 baseline (free board still live):** `sim_10k_2026_hx2026_6.json` / `hx_edge_full_sim_table_2026_6.json` · Georgia **84.50 / 23.56** · seed **20260913** · locked **328 / 557**  
**Prior CLEAR pattern:** `/workspace/cfb/hx2026_6_make12_research_peer_clear_2026-09-28.md`

## Header summary

| Field | Value |
|------|-------|
| **Verdict** | **RESEARCH PEER CLEAR** |
| Date CT | 2026-10-05 ~9:28 AM CT |
| Georgia Make the 12 / Win the title | **86.51 / 24.29** (JSON exact; make_field / win_title) |
| Prior baseline (HX 2026.6 free board) | **84.50 / 23.56** (JSON `84.5` / `23.56`) |
| Seed / n_sims | **20260913** / **10000** |
| Locked / remaining | **387 / 498** (schedule FBS-involved **885** = 387+498) |
| Full sim table n | **136** |
| hx_board (Georgia) | **7.8964** ≡ ship `hx_post` (unchanged vs 2026.6) |
| Stampable for Website | **yes** — free-board **Make 12** swap; **win_title pack/paid only**; Research does not stamp |
| Soft-cal FLAG | **still in force** — Week 5 closer **20/55 36.4% FLAG**; Top 25 **7/15 46.7% FLAG**; all-D; no locks; **not** lifted by this pack |
| Free board until Website stamp | **HX 2026.6** |

## PASS / HOLD (PENDING checklist)

| # | Check | Research verdict | Notes |
|---|------|------------------|-------|
| 1 | Georgia cells (make_field / win_title / hx_board / proj_wins / conf_title) | **PASS** | sim JSON Georgia: `make_field=86.51` · `win_title=24.29` · `hx_board=7.8964` · `proj_wins=11.004` · `conf_title=57.08`. Full table row identical (0 mismatches sim↔table). Prior 2026.6: **84.5 / 23.56** → display **84.50 / 23.56**. Make ≠ title kept (two cells). Georgia **rank_make_field=4** (ND #1); Georgia **#1 win_title** — AMD top-5 table claimed correctly (not #1 on Make 12). |
| 2 | Seed | **PASS** | `meta.seed == 20260913` in sim JSON, full table, AMD note — same preferred seed as HX 2026.4 / 2026.6 Make 12. |
| 3 | HX stamp | **PASS** | sim `hx_stamp=HX 2026.7` · full table `hx_stamp=HX 2026.7` · ship `hx_stamp=HX 2026.7` · source `week5_od_hx_ship_2026.json`. |
| 4 | n_sims | **PASS** | `meta.n_sims=10000` (sim + full table). |
| 5 | Locked weeks 0–5 | **PASS** | `n_locked_finals=387` · `n_remaining_draws=498` · `locked_weeks` Week 0–5. SCOREBOARD_PATHS include `espn_week5_2026_scoreboard_fresh.json`. Prior 2026.6 was **328 / 557** (+59 / −59). Raw STATUS_FINAL ids across five scoreboards = **390** (99+86+75+71+59); schedule-matched lock **387** as claimed. |
| 6 | Soft-cal FLAG | **PASS** | AMD note + sim md + full-table `offline_note` + unit pulse: FLAG **still in force**; closer **20/55 36.4%**; Top 25 **7/15 46.7%**; all-D; no locks; no HX retune / A/B re-label. Soft-cal **not** lifted. |
| 7 | Full table n=136 + sums | **PASS** | teams **n=136**; `rank_make_field` unique 1..136; no NaNs; probs in **[0,100]** percent scale. Sum `make_field=1200.0000` (12-team field); sum `win_title=100.0000` (one champ). Rule: Monte Carlo slot counts / n_sims × 100. |
| 8 | Ship linkage (all 136 hx_board) | **PASS** | **0** mismatches table↔ship `hx_post`; **0** sim↔ship. Spot: Georgia **7.8964**, Notre Dame **7.0122**, Ohio State **7.839**, Texas Tech **5.7444**, Miami **5.2538**, Alabama **5.2904**, Oregon **6.9019**, Toledo **1.5024**, James Madison **1.4903**, UNLV **1.7315**. |
| 9 | Offline / free board | **PASS** | Pack language: OFFLINE DRAFT; free board stays **2026.6** until CLEAR+Website. No LIVE claim in artifacts. |
| 10 | Incomplete 11-game note | **PASS** | Same eight teams: Boise State, Colorado State, Fresno State, Oregon State, San Diego State, Texas State, Utah State, Washington State (11 games each; opponents not invented). |
| 11 | Scoreboard path (preferred vs fresh) | **PASS** | Preferred `espn_week5_2026_scoreboard.json`: **59** events, all `STATUS_SCHEDULED`, scores 0/0 (pre-kick). `_fresh`: **59** `STATUS_FINAL`. AMD reason accurate. FINALs CLEAR pack: FBS–FBS **55/55 CLEAR**, HOLD **0**. |
| — | Not a retrain | **PASS** | Sim-only on shipped HX 2026.7 `hx_post` (matchup = board). Runner `SHIP_PATH=week5_od_hx_ship_2026.json`; no new O/D knobs / weight retune / Vegas-fit. Soft-cal FLAG language retained. |
| — | win_title policy | **PASS** | Research CLEAR scope: free board may swap **Make 12** after Website stamp; **win_title stays pack/paid only**. Full table contract still lists featured Make-field + Win-title tease string (same contract family as 2026.6); Website owns what free chrome shows. |

## Key numbers

| Item | Value |
|------|-------|
| Board / stamp | **HX 2026.7** offline Make 12 · n=**136** · as_of **2026-10-05** CT |
| Georgia cells | Make the 12 **86.51** · Win the title **24.29** · hx_board **7.8964** · proj_wins **11.004** · conf_title **57.08** |
| Delta vs 2026.6 free board | mf 84.50→86.51 · wt 23.56→24.29 · hx 7.8964→7.8964 (unchanged) · proj 10.880→11.004 · conf 55.83→57.08 |
| Seed / n_sims | **20260913** / **10000** |
| Locked / remaining | **387 / 498** (was 328 / 557 on 2026.6) |
| Top make_field | ND 94.36 · TTU 91.73 · MIA 90.43 · UGA 86.51 · OSU 69.94 |
| Top win_title | UGA 24.29 · ND 17.81 · OSU 16.34 · TTU 9.07 · ORE 7.55 |
| Unit pulse | `/workspace/cfb/hx_edge_unit_pulse_week5_hx2026_7.json` present; soft-cal FLAG noted; Georgia #1 @ 7.8964 |
| Blockers | **none** |

## Nits (non-blocking)

1. `sim_10k_2026_hx2026_7.md` Georgia prose line rounds to **86.5% / 24.3%**; tables + JSON carry exact **86.51 / 24.29** — use JSON/table for ship cells.
2. Full-table `free_board` string still says featured Make-field + Win-title tease; Research CLEAR recommendation for Website chrome: **Make 12 on free board**; **win_title pack/paid only**.

## Soft-cal / free-board / Website reminder

- Soft-cal FLAG / all-D **still in force** — Week 5 closer **20/55 (36.4%) FLAG**; Top 25 **7/15 (46.7%) FLAG**. Do **not** re-label A/B. Do **not** retune HX. FLAG is **not** lifted by this Make 12 offline pack.
- **Free board must stay HX 2026.6** Make 12 / win-title cells until Website stamp after this CLEAR.
- After Website stamp: free board may show **Make 12** on HX 2026.7; **win_title pack/paid only**.
- Paid UI / Scenario Sim **not wired** by this CLEAR; no Scenario golden re-smoke / re-CLEAR here.
- Research does **not** stamp / merge / X / message agents. Parent hands off.

## Verdict scope

Research **CLEAR** for Website to stamp free-board **Make 12** swap (and paid full 136 table) from:

- `/workspace/cfb/sim_10k_2026_hx2026_7.json` (+ `.md`)
- `/workspace/cfb/hx_edge_full_sim_table_2026_7.json`
- unit pulse chrome: `/workspace/cfb/hx_edge_unit_pulse_week5_hx2026_7.json`

Ship ratings already live: HX **2026.7** `week5_od_hx_ship_2026.json` (Georgia #1 @ **7.8964**).

This memo does **not** authorize merge / LIVE CLEAR / Marketing quotes / X. Research does **not** stamp the site.

**VERDICT: RESEARCH PEER CLEAR**  
**hold_reasons: []**  
**stampable_for_website: yes** (Make 12 free-board swap; win_title pack/paid only; soft-cal FLAG stays)  
**free_board_until_website_stamp: HX 2026.6**
