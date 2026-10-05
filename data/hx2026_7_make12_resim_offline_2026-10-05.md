# AMD NOTE — Make 12 / win-title 10k re-sim on HX 2026.7 (OFFLINE) · 2026-10-05 CT

**Role:** AMD queue/run only. **Do not** claim LIVE / market / stamp site / message agents.  
**As of:** 2026-10-05 ~9:27 AM CT  
**Seed:** `20260913` (same as HX 2026.4 / 2026.6 Make 12; preferred seed policy)  
**Soft-cal FLAG:** **still in force** — Mon Model Health W5: full slate closer **20/55 (36.4%) FLAG**; Top 25 **7/15 (46.7%) FLAG**. Leave `hx_edge_confidence_schema_2026.json` as contract; all-D; no locks; no HX retune / Vegas-fit / un-zero QB / A/B re-label.  
**No:** site stamp · LIVE claim · HX board retune · Scenario Sim marketing · PR #46 touch.

## Status

| Field | Value |
|------|-------|
| Verdict | **OFFLINE DRAFT** pending Research peer CLEAR |
| Prior live Make 12 (unchanged on free board) | HX **2026.6** · Georgia **make_field 84.50** / **win_title 23.56** · seed 20260913 · `sim_10k_2026_hx2026_6.json` / `hx_edge_full_sim_table_2026_6.json` |
| This run | HX **2026.7** offline · `week5_od_hx_ship_2026.json` · Week 0–5 FINALs locked · seed **20260913** |
| Free board | Still shows **2026.6** Make 12 / win-title cells until CLEAR + Website stamp |
| Paid UI / Scenario Sim | **Not wired**; no Scenario golden re-smoke / re-CLEAR here |
| Gate | **Research peer CLEAR** required before anyone quotes new numbers or swaps free board |

## Confirm prior Make 12 = 2026.6 (free board)

- `sim_10k_2026_hx2026_6.json` meta: `hx_stamp=HX 2026.6`, `seed=20260913`, `as_of=2026-09-28`, source ship `week4_od_hx_ship_2026.json`
- Georgia: **make_field 84.50** / **win_title 23.56** (spell out separately — Make the 12 ≠ Win the title)
- Full table: `hx_edge_full_sim_table_2026_6.json` (136 teams) — free board still these cells

## SCOREBOARD_PATHS promote

`sim_10k_2026.py` now locks Week 0–5 (kept w1–w4; added Week 5 FINALs; scores not invented):

1. `/workspace/cfb/data/espn_week1_2026_scoreboard.json`
2. `/workspace/cfb/data/espn_week2_2026_scoreboard.json`
3. `/workspace/cfb/data/espn_week3_2026_scoreboard_finals.json`
4. `/workspace/cfb/data/espn_week4_2026_scoreboard_finals.json`
5. `/workspace/cfb/data/espn_week5_2026_scoreboard_fresh.json` — **used after verify**

**Scoreboard note:** Preferred path `/workspace/cfb/data/espn_week5_2026_scoreboard.json` is a **pre-kick** snapshot (59 events, all `STATUS_SCHEDULED`, scores 0/0). Verified better: `_fresh` has **59 `STATUS_FINAL`**, scores agree **55/55** with `/workspace/cfb/week5_fbs_fbs_finals_clear_2026-10-04.json` (CLEAR HOLD 0). Also locks the 4 ESPN FBS–FCS finals on that scoreboard that match the DB schedule. No scores invented.

| Metric | Before (2026.6) | After (2026.7 offline) |
|--------|-----------------|-------------------------|
| SCOREBOARD `STATUS_FINAL` ids | **331** (99+86+75+71) | **390** (331+59) |
| Schedule-matched `n_locked_finals` | **328** | **387** (+59) |
| Remaining draws | **557** | **498** (−59) |
| HX ship input | `week4_od_hx_ship_2026.json` | `week5_od_hx_ship_2026.json` |

## Georgia Make the 12 / Win the title (before → after)

Keep **two cells**. Never ship Make≠title shorthand.

| Cell | HX 2026.6 (live free board) | HX 2026.7 (this offline draft) |
|------|-----------------------------|--------------------------------|
| **Make the 12** (`make_field`) | **84.50%** | **86.51%** |
| **Win the title** (`win_title`) | **23.56%** | **24.29%** |
| hx_board | 7.8964 | 7.8964 |
| proj_wins | 10.880 | 11.004 |
| conf_title | 55.83% | 57.08% |

## Top 5 make_field (HX 2026.7 offline) — Make the 12 %

| # | Team | make_field (Make the 12) | win_title (Win the title) | hx_board |
|---|------|--------------------------|---------------------------|----------|
| 1 | Notre Dame | 94.36 | 17.81 | 7.0122 |
| 2 | Texas Tech | 91.73 | 9.07 | 5.7444 |
| 3 | Miami | 90.43 | 6.32 | 5.2538 |
| 4 | Georgia | 86.51 | 24.29 | 7.8964 |
| 5 | Ohio State | 69.94 | 16.34 | 7.8390 |

## Soft-cal FLAG (still in force)

- Mon Model Health W5 (from CLEARed Week 5 tape / Edge pack on disk — not invented): full slate closer **20/55 · 36.4% FLAG**; Top 25 **7/15 · 46.7% FLAG**
- Soft-cal FLAG / all-D stays. **No** locks language. **No** HX weight retune. **No** A/B re-label. **No** Scenario Sim marketing.
- Soft-cal FLAG is **not** lifted by this Make 12 offline draft.

## Unit pulse

Existing standalone verified (not reinvented movers): `/workspace/cfb/hx_edge_unit_pulse_week5_hx2026_7.json`  
Sources: `week5_od_hx_ship_2026.json` + `sunday_od_delta_2026_w5.json`. Top movers match ship `delta_hx`. Georgia #1 @ **7.8964** (ΔHX +0.0000). Soft-cal FLAG noted in pulse offline note.

## Artifacts (absolute paths)

| Artifact | Path |
|----------|------|
| Sim JSON | `/workspace/cfb/sim_10k_2026_hx2026_7.json` |
| Sim MD | `/workspace/cfb/sim_10k_2026_hx2026_7.md` |
| Full 136 table | `/workspace/cfb/hx_edge_full_sim_table_2026_7.json` |
| Unit pulse standalone | `/workspace/cfb/hx_edge_unit_pulse_week5_hx2026_7.json` |
| This AMD note | `/workspace/cfb/hx2026_7_make12_resim_offline_2026-10-05.md` |
| Research peer CLEAR stub (PENDING) | `/workspace/cfb/hx2026_7_make12_research_peer_clear_PENDING_2026-10-05.md` |
| Runner (updated) | `/workspace/cfb/sim_10k_2026.py` |
| HX ship source | `/workspace/cfb/week5_od_hx_ship_2026.json` (HX 2026.7; Georgia hx_post 7.8964; n=136; Research peer CLEARed board live on main) |

### Unchanged

- `hx_edge_confidence_schema_2026.json` — contract left as-is
- Free-board Make 12 / win-title still **2026.6** until Research CLEAR + Website stamp
- Soft-cal FLAG stays; PR #46 untouched
- No site stamp / no agent messages / no paid UI wire / no Scenario golden re-smoke
- Elo/HFA/engine/CFP assumptions/FCS stubs unchanged in runner

## Blockers / notes

- None for offline draft. Eight teams still list **11** DB games (untreated FCS gap; same as prior): Boise State, Colorado State, Fresno State, Oregon State, San Diego State, Texas State, Utah State, Washington State.
- Week 5 scoreboard path: used `_fresh` after verifying preferred non-fresh file is pre-kick (documented above).
- **Gate:** Research peer CLEAR required before any quote of new Make the 12 / Win the title numbers / free-board swap / Website stamp.
