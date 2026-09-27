# RESEARCH PEER CLEAR — HX 2026.6 (Week 4 → Week 5 O/D Δ ship) · 2026-09-27 CT

**Role:** Research peer only — verify + memo. Do **not** stamp / merge / claim LIVE CLEAR / message AMD / Website / Chase.  
**As of:** 2026-09-27 ~10:21 AM CT  
**AMD packs verified:** `/workspace/cfb/sunday_od_delta_2026_w4.{json,md}` · `/workspace/cfb/week4_od_hx_ship_2026.{json,md}`  
**Score truth (ground):** `/workspace/cfb/week4_fbs_fbs_finals_clear_2026-09-27.{md,json}` — **57 CLEAR / 0 HOLD**  
**Tape peer (ground):** `/workspace/cfb/week4_tape_research_peer_clear_2026-09-27.md` — CLEAR · SU 42/57 · **73.7%** · closer 20/57 · **35.1% FLAG**  
**Prior board:** `week3_od_hx_ship_2026.json` `hx_post` = **HX 2026.5**  
**Cross-check:** `metrics/week4_hx_vs_vegas_detail.json` (57, held=[]) · `data/espn_week4_2026_scoreboard_finals.json` · summaries `data/espn_summaries_w4/`  
**Prior peer pattern:** `/workspace/cfb/hx2026_5_week3_research_peer_clear.md` (HX 2026.5)

## Header summary

| Field | Value |
|------|-------|
| **Verdict** | **RESEARCH PEER CLEAR** |
| Date CT | 2026-09-27 ~10:21 AM CT |
| Georgia #1 | **7.8964** · rank **1** (hx_pre 7.8978 · ΔHX −0.0014) |
| 57/57 score match | **yes** (FINALs CLEAR ≡ grade ledger ≡ ESPN scoreboard OD input · 0 mismatches) |
| Knobs ok | **yes** (identical to W3 / frozen w1) |
| Stampable for Website | **yes** (HX 2026.6 ship JSON/MD) — Website owns stamp/merge/LIVE; Research does not |
| Soft-cal FLAG | **still in force** — closer 35.1% < 45 · all-D · **not** a ship-blocker; do **not** re-label A/B |

## PASS / HOLD

| Check | Research verdict | Notes |
|------|------------------|-------|
| 1. Score lock FBS–FBS | **PASS** | Programmatic: all **57** FINALs CLEAR `espn_event_id`s present in grade ledger + ESPN W4 scoreboard FINAL with **identical** `score_away`/`score_home`. Grade `held_games=[]`, `problems=[]`. OD meta `n_fbs_fbs=57`, `open_games=[]`, `blockers=[]`. Name unicode nit only: FINALs `Hawaiʻi` vs ship/OD `Hawai'i` — same team, scores lock by ESPN id. |
| 2. No invented FCS HX/scores | **PASS** | 14 FBS–FCS stubs flagged `FCS_opponent_stubbed` (Buffalo, Duke, ECU, EMU, FIU, FSU, Marshall, UMass, North Texas, Ohio, Pitt, Rutgers, Texas State, WKU). Opponent prior stubbed at league mean − 8 SP; **no** FCS schools on the 136-team board; method `unchanged` includes `no FCS HX invented`; `hx_board_changed=false`. FCS may affect FBS unit records only via stub path — documented. |
| 3. Georgia #1 ≈ 7.8964 | **PASS** | Ship JSON: `georgia_hx_post=7.8964`, `georgia_rank_post=1`. Team row: hx_pre **7.8978** → hx_post **7.8964**; ΔHX **−0.0014**; O/D post **39.241 / 23.423**; ΔO +1.759 · ΔD −1.835. Rank 1→1. |
| 4. ΔHX = (ΔO+ΔD)/55 | **PASS** | **0** formula errs after `round(..., 4)` on all 136. **0** `hx_post ≠ hx_pre+ΔHX`. Spot: Georgia (−0.00138→−0.0014); UCLA/Maryland ±0.0710; SMU −0.0511; PSU −0.0501. |
| 5. Frozen knobs | **PASS** | OD+ship W4 ≡ OD+ship W3 ≡ w1: `w_data_fbs=0.117647`, `w_data_fcs=0.044586`, `prior_n=7.5`, `epa_to_sp=55.0`, `obs_clip=18.0`, WP garbage [0.05,0.95], `margin_blowout=24`. No quadratic / talent retune (`quadratic_changed=false`, `talent_changed=false`). |
| 6. Board integrity | **PASS** | **136/136** teams; ranks **1..136** unique; hx non-increasing by rank; **0** NaNs; **hx_pre ≡ W3 hx_post** for all 136; updated **117** / prior-carry **19**. |
| 7. Ship packaging / schema | **PASS** | Matches HX 2026.5 (`week3_od_hx_ship_2026`) team-row schema exactly. Top-level adds non-breaking `research_finals_clear` + `research_tape_clear` path refs. `board: HX 2026.6`, `hx_post` + `hx_rank_post` on every team. MD top-25 / largest \|ΔHX\| align with JSON (3-dp display). |
| 8. Tape soft-cal FLAG | **PASS (noted)** | Preserved for Website: SU **42/57 · 73.7%** · closer **20/57 · 35.1% FLAG**. Soft-cal FLAG / all-D still in force. **Not** a HX ship-blocker. |
| 9. Unit O/D pulse | **DEFERRED (noted)** | No filled Week 4 unit-pulse pack on disk — only `hx_edge_unit_pulse_template_2026.json`. HX 2026.6 ship + sunday O/D Δ stand alone. Pulse is Edge-pack chrome; **not** required to CLEAR this ship (same posture as W3 HX 2026.5 peer CLEAR). |

## Key numbers

| Item | Value |
|------|-------|
| Board | **HX 2026.6** · n=**136** · as_of **2026-09-27** |
| Georgia | **#1** · 7.8978 → **7.8964** · ΔHX **−0.0014** · O/D 39.241/23.423 |
| Largest \|ΔHX\| | UCLA **+0.0710** (47→45); Maryland **−0.0710** (71→72) |
| FBS–FBS used | **57/57 FINAL** · FCS stubs **14** · teams updated **117** · prior-carry **19** |
| Base | HX **2026.5** (`week3_od_hx_ship_2026.json`) |
| Blockers | none · `open_games=[]` |

## Top 10 (HX 2026.6) — verified from ship JSON

| Rank | Team | HX | ΔHX | Δrk |
|---|---|---|---|---|
| 1 | Georgia | 7.8964 | −0.0014 | +0 |
| 2 | Ohio State | 7.8131 | +0.0000 | +0 |
| 3 | Notre Dame | 7.0216 | −0.0077 | +0 |
| 4 | Oregon | 6.9019 | −0.0037 | +0 |
| 5 | Texas | 6.4516 | +0.0073 | +0 |
| 6 | Texas A&M | 6.0586 | −0.0467 | +0 |
| 7 | Texas Tech | 5.8155 | −0.0051 | +0 |
| 8 | Ole Miss | 5.4289 | −0.0203 | +0 |
| 9 | Alabama | 5.2821 | −0.0177 | +0 |
| 10 | Miami | 5.2345 | +0.0000 | +0 |

## Spot-checks (ΔHX) — recomputed

| Team | ΔO | ΔD | (ΔO+ΔD)/55 | ship ΔHX | HX pre→post | rk |
|------|-----|-----|------------|----------|-------------|-----|
| Georgia | +1.759 | −1.835 | −0.00138 | **−0.0014** | 7.8978→7.8964 | 1→1 |
| UCLA | +1.789 | +2.118 | +0.07104 | **+0.0710** | 1.3253→1.3963 | 47→45 |
| Maryland | −2.118 | −1.789 | −0.07104 | **−0.0710** | −0.2474→−0.3184 | 71→72 |
| Ohio State | +0.000 | +0.000 | +0.00000 | **+0.0000** | 7.8131→7.8131 | 2→2 |
| Miami | +0.000 | +0.000 | +0.00000 | **+0.0000** | 5.2345→5.2345 | 10→10 |
| SMU | −1.238 | −1.570 | −0.05105 | **−0.0511** | 4.0469→3.9958 | 20→20 |
| Penn State | −1.463 | −1.290 | −0.05005 | **−0.0501** | 4.3342→4.2841 | 13→14 |

## Score-lock method (Research)

1. Load FINALs CLEAR 57 games + grade ledger 57 games + flatten ESPN `data/espn_week4_2026_scoreboard_finals.json` (same flatten as `sunday_od_delta_2026_w4.py`).  
2. Assert ID sets equal; assert every score triple (away/home) identical across all three; assert every status `STATUS_FINAL`.  
3. Result: **57/57 match · 0 mismatches · 0 missing**.

## Nits (non-blocking)

| Nit | Blocking? |
|-----|-----------|
| `max_abs_delta_hx` field is signed **+0.071** (UCLA), not absolute — consumers should `abs()` (same class of nit as W3) | **Non-blocking** |
| FINALs pack okina `Hawaiʻi` vs board ASCII `Hawai'i` | **Non-blocking** (ESPN id locks scores) |
| JSON/MD still labeled offline draft pending peer CLEAR — expected until Website stamp | **Non-blocking** |
| Unit O/D pulse not filled for W4 — deferred Edge chrome | **Non-blocking** for this HX ship CLEAR |

## Soft-cal / Website reminder

- Tape closer **35.1% FLAG** / soft-cal / all-D **still in force**.  
- Do **not** re-label as A/B. No locks language.  
- FLAG is preserved for Board+Tape ship messaging; it does **not** HOLD HX 2026.6 board stamp.

## Verdict scope

Research **CLEAR** for Website to stamp **HX 2026.6** from `week4_od_hx_ship_2026.json` (units from `sunday_od_delta_2026_w4.json`).  
This memo does **not** authorize merge / LIVE CLEAR / Marketing quotes / X. Research does **not** stamp. Parent hands off.

**VERDICT: RESEARCH PEER CLEAR**  
**hold_reasons: []**  
**stampable_for_website: yes**
