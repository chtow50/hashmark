# Week 4 tape — Research peer CLEAR (2026-09-27)

**As of:** 2026-09-27 10:16 AM CT
**Desk:** HASHMARK Research CFB · peer CLEAR of offline `/workspace/cfb/metrics/weekly_hx_vs_vegas.md` + `week4_hx_vs_vegas_detail.json`
**Scope:** Week 4 FBS–FBS only · **n = 57** · COMPLETE finals only
**Engine ref (unchanged):** HX 2026.5 board (live Friday `30cd017`) · quadratic home-perspective · Research Vegas closes

## Verdict

- **Tape peer:** **CLEAR**
- **SU 42/57 · 73.7%**
- **closer 20/57 · 35.1%** (Vegas closer 37/57) · **FLAG closer < 45%**
- **HX ATS 28/57 · 49.1%** · MAE HX 12.79 / Vegas 11.21
- **Season W1–W4:** SU **80.8%** (164/203) · closer **40.9%** (83/203)
- **FLAG status:** closer soft-cal still **FLAG** (35.1% < 45). Soft-cal FLAG / all-D still in force. No locks language.
- **Stampable for Website:** **yes** — finals denominator complete (57/57 ESPN FINAL); SU/closer math peer-verified vs ESPN scores + Research Vegas closes + live HX board numbers. Research does **not** stamp/merge/X; Website owns Board+Tape ship.

## What was peer-CLEARed

1. **FINALs:** All 57 Week 4 FBS–FBS slate ESPN ids from `/workspace/cfb/week4_fbs_fbs_kick_tv_vegas_2026.json` are `STATUS_FINAL` on ESPN scoreboards 20260924–20260926. Scores match `metrics/week4_hx_vs_vegas_detail.json` 57/57. See `/workspace/cfb/week4_fbs_fbs_finals_clear_2026-09-27.md + .json`.
2. **Liberty@Coastal:** 34–17 FINAL reconfirmed (featured prior LIVE CLEAR).
3. **Vegas closes:** Detail `vegas_home` aligns with Research CLEAR pack `/workspace/cfb/week4_vegas_clear_pack_2026-09-23.json` + live board favorite lines (home-perspective for grading). **57/57** closes present — no blank Vegas blocker.
4. **HX pregame:** Detail `hx_home` / `pred_hx` match live schedule card numbers (e.g. Temple −6.6, Clemson −6.7, Texas A&M −2.7, Missouri −9.5).
5. **SU math:** HX winner = sign(`pred_hx`); actual = sign(home MOV). Recomputed **42/57** — matches offline note.
6. **Closer math:** `|MOV−pred_hx|` vs `|MOV−pred_vegas|` (Week 2/3 tape methodology). Recomputed **HX closer 20/57 · Vegas 37/57 · ties 0** — matches offline note.
7. **Live site:** `hashmarkcfb.com/schedule?w=4` still has only Liberty stamped FINAL; 56 cards still Kick/`scheduled`. `/stories` still has Week 3 tape as latest tape story.

## Offline note status

`/workspace/cfb/metrics/weekly_hx_vs_vegas.md` claimed SU **42/57 · 73.7%**, closer **20/57 · 35.1%** FLAG as_of 2026-09-27.
**Peer result:** claim **held** — now Research **CLEAR** (not merely offline).

## Notable HIT / MISS (facts only)

### Winner-flip HIT (HX ≠ Vegas favorite; HX SU correct)

- Navy@UAB: HX UAB -13.8 vs Vegas NAVY -7; FINAL 20–24 · closer=hx
- Clemson@California: HX Clemson −6.7 vs Vegas CAL -1.5; FINAL 24–10 · closer=hx

### Winner-flip MISS

- Army@Temple: HX Temple -6.6 vs Vegas ARMY -3; FINAL 21–17 (MOV=-4) · closer=vegas
- Ole Miss@Florida: HX Ole Miss −2.5 vs Vegas FLA -3.5; FINAL 28–52 (MOV=24) · closer=vegas
- Boise State@Western Michigan: HX Western Michigan -0.8 vs Vegas BOIS -7; FINAL 32–7 (MOV=-25) · closer=vegas
- Texas A&M@LSU: HX Texas A&M −2.7 vs Vegas LSU -8.5; FINAL 6–35 (MOV=29) · closer=vegas
- Missouri@Mississippi State: HX Missouri −9.5 vs Vegas MSST -6.5; FINAL 24–31 (MOV=7) · closer=vegas
- Air Force@Nevada: HX Nevada -6.7 vs Vegas AF -5.5; FINAL 36–33 (MOV=-3) · closer=vegas

### Chalk blowups (HX favorite; SU miss; large lean)

- Wake Forest@Louisville: HX_home=-14.8 · FINAL 30–27 (MOV=-3)
- Iowa@Michigan: HX_home=-7.0 · FINAL 20–19 (MOV=-1)
- Wisconsin@Penn State: HX_home=-14.6 · FINAL 24–20 (MOV=-4)
- Kansas State@Cincinnati: HX_home=7.3 · FINAL 26–31 (MOV=5)
- Missouri@Mississippi State: HX_home=9.5 · FINAL 24–31 (MOV=7)
- Minnesota@Washington: HX_home=-8.0 · FINAL 27–24 (MOV=-3)

### Full SU miss list (15)

1. **Temple** — Army@Temple: HX_home=-6.6 · Vegas_home=3.0 · FINAL 21–17 · closer=vegas
2. **Louisville** — Wake Forest@Louisville: HX_home=-14.8 · Vegas_home=-12.5 · FINAL 30–27 · closer=vegas
3. **Hawaiʻi** — Hawaiʻi@Wyoming: HX_home=5.3 · Vegas_home=3.0 · FINAL 10–27 · closer=vegas
4. **Ole Miss** — Ole Miss@Florida: HX_home=2.5 · Vegas_home=-3.5 · FINAL 28–52 · closer=vegas
5. **TCU** — TCU@UCF: HX_home=5.6 · Vegas_home=3.0 · FINAL 13–21 · closer=vegas
6. **Michigan** — Iowa@Michigan: HX_home=-7.0 · Vegas_home=-5.5 · FINAL 20–19 · closer=vegas
7. **Western Michigan** — Boise State@Western Michigan: HX_home=-0.8 · Vegas_home=7.0 · FINAL 32–7 · closer=vegas
8. **Penn State** — Wisconsin@Penn State: HX_home=-14.6 · Vegas_home=-10.0 · FINAL 24–20 · closer=vegas
9. **Kansas State** — Kansas State@Cincinnati: HX_home=7.3 · Vegas_home=6.5 · FINAL 26–31 · closer=vegas
10. **West Virginia** — Oklahoma State@West Virginia: HX_home=-3.4 · Vegas_home=-1.5 · FINAL 41–24 · closer=vegas
11. **Texas A&M** — Texas A&M@LSU: HX_home=2.7 · Vegas_home=-8.5 · FINAL 6–35 · closer=vegas
12. **Missouri** — Missouri@Mississippi State: HX_home=9.5 · Vegas_home=-6.5 · FINAL 24–31 · closer=vegas
13. **Georgia Tech** — Georgia Tech@Stanford: HX_home=3.8 · Vegas_home=3.5 · FINAL 27–34 · closer=vegas
14. **Nevada** — Air Force@Nevada: HX_home=-6.7 · Vegas_home=5.5 · FINAL 36–33 · closer=vegas
15. **Washington** — Minnesota@Washington: HX_home=-8.0 · Vegas_home=-10.0 · FINAL 27–24 · closer=hx

## Methodology (match Week 2/3 tape)

- **SU:** straight-up winner — HX predicted winner (`pred_hx = −hx_home`, home perspective) vs actual winner (home MOV = homeScore−awayScore).
- **Closer:** HX predicted margin closer to actual MOV than Vegas close when `|MOV−pred_hx| < |MOV−pred_vegas|`; ties counted separately (Week 4 ties = 0).
- **Denominator:** COMPLETE FBS–FBS finals only; no FCS; no invented scores/Vegas.
- **FLAG:** closer < 45% soft-cal FLAG remains; no model retune language in this CLEAR.

## Blockers

- **None for Research CLEAR.** Vegas closes 57/57; ESPN finals 57/57; SU/closer math consistent.
- **Website stamp still pending:** live board has not applied the 56 remaining FINAL stamps or Week 4 tape story (expected — Website blocked pending this CLEAR).

## Stampable

| Item | CLEAR/HOLD | Stampable for Website |
|------|------------|------------------------|
| Week 4 FBS–FBS FINALs pack | CLEAR (57/57) | **yes** (scores/status) |
| Week 4 tape SU/closer | CLEAR 42/57 · 20/57 FLAG | **yes** (numbers + FLAG) |
| Soft-cal / locks | FLAG closer; all-D; no locks | n/a — do not lift FLAG |

## File refs

- This memo: `/workspace/cfb/week4_tape_research_peer_clear_2026-09-27.md`
- Finals pack: `/workspace/cfb/week4_fbs_fbs_finals_clear_2026-09-27.md` + `.json`
- Offline metrics (now peer-CLEARed): `/workspace/cfb/metrics/weekly_hx_vs_vegas.md` + `week4_hx_vs_vegas_detail.json`
- Vegas closes: `/workspace/cfb/week4_vegas_clear_pack_2026-09-23.json`
- ESPN pulls: `/workspace/cfb/data/verify_w4_finals/espn_web_2026092{4,5,6}.json`

**Policy:** Research does not stamp/merge/X. No locks. Never invent scores/Vegas.
