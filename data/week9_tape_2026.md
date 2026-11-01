# HASHMARK Week 9 tape — Board (2026)

**As of:** Sunday Nov 1, 2026 · 10:30 AM CT
**Scope:** FBS–FBS only · **n = 54** (slate locked, 54/54 ESPN STATUS_FINAL)
**Engine:** HX 2026.7 pregame lines (not retuned by this tape). Quadratic home-perspective, HFA 60 Elo (0 neutral). Stamped Vegas closes.

## Headline

- **SU 44/54 (81.5%)** — over 70%
- **HX closer 3/6 (50.0%)** · Vegas closer 3/6 · ties 0 — graded only on the 6 cards with a stamped Vegas close (small sample, not under 45%, no closer FLAG; raw full-slate count 3/54)
- HX ATS 4/6 (66.7%) — Re-derived: HX side vs stamped Vegas close; HX = Vegas and pushes excluded (n=6). · MAE HX 12.38 (all 54) / Vegas 17.0 (6 lined) · Brier 0.153
- Season W1–W9 arithmetic (not a fresh W1–W8 audit): SU **72.0%** (345/479) · closer **41.7%** (139/333, Vegas-lined cards)
- Soft-cal FLAG remains. HX not retuned.

### Board flags

- **Winner-flip HIT** — Baylor @ UCF: HX Baylor -1.8 vs Vegas UCF -2.5; FINAL 41–9
- **Winner-flip MISS** — Virginia @ Wake Forest: HX Virginia -1.3 vs Vegas WAKE -13.5; FINAL 7–51

## 10 SU misses (HASHMARK favorite)

1. **Western Kentucky** — Delaware @ Western Kentucky: HX Western Kentucky -13.7 · Vegas — · FINAL Delaware 35–Western Kentucky 21 · closer=n/a (no Vegas)
2. **Middle Tennessee** — Kennesaw State @ Middle Tennessee: HX Middle Tennessee -0.8 · Vegas — · FINAL Kennesaw State 44–Middle Tennessee 28 · closer=n/a (no Vegas)
3. **James Madison** — Troy @ James Madison: HX James Madison -12.1 · Vegas — · FINAL Troy 24–James Madison 21 OT · closer=n/a (no Vegas)
4. **SMU** — SMU @ Syracuse: HX SMU -14.1 · Vegas — · FINAL SMU 27–Syracuse 30 · closer=n/a (no Vegas)
5. **Kansas State** — Kansas State @ Colorado: HX Kansas State -4.9 · Vegas — · FINAL Kansas State 24–Colorado 27 OT · closer=n/a (no Vegas)
6. **South Alabama** — Louisiana Tech @ South Alabama: HX South Alabama -1.0 · Vegas — · FINAL Louisiana Tech 35–South Alabama 20 · closer=n/a (no Vegas)
7. **UConn** — UConn @ Air Force: HX UConn -11.7 · Vegas — · FINAL UConn 26–Air Force 35 · closer=n/a (no Vegas)
8. **Virginia** — Virginia @ Wake Forest: HX Virginia -1.3 · Vegas WAKE -13.5 · FINAL Virginia 7–Wake Forest 51 · closer=vegas · **winner-flip miss**
9. **Oklahoma** — South Carolina @ Oklahoma: HX Oklahoma -7.5 · Vegas — · FINAL South Carolina 42–Oklahoma 25 · closer=n/a (no Vegas)
10. **Ohio State** — Ohio State @ USC: HX Ohio State -9.3 · Vegas — · FINAL Ohio State 18–USC 30 · closer=n/a (no Vegas)

## Top 25 closer cut

HX Top 25 involvement (n=19, hx_rank ≤25 on the HX 2026.7 pregame board): SU 16/19 (84.2%). Closer 2/4 on the 4 Vegas-lined cards · Vegas 2. Week 4 rule. Not a separate headline.

## Method check

The same grader (data/week5_od_hx_ship_2026.json hx_post → src/lib/cfb/model.ts Elo/quadratic; closer = smaller |line − home margin|; SU by HX favorite) reproduces the published Week 8 tape exactly on the HX 2026.7 board (SU 31/54, closer 3/7, Vegas 4/7, 0 ties, ATS 4/7, MAE 12.99 / 7.43, Brier 0.26).

## Coverage / honesty

- FINAL scores: ESPN STATUS_FINAL (scoreboard + game summary). Week 9 stamped in 0074–0079 (54/54). No stragglers.
- Vegas closes: the stamped 0072 Week 9 book (6 cards where ESPN DraftKings = CBS Sports exactly). 48 cards stayed blank and are not graded for closer. Not rewritten by this tape.
- HX pregame lines are the HX 2026.7 board (live since 0047, unchanged through Week 9). Not a retune.
- FCS games (Kent State at Sacramento State, UTEP at North Dakota State — FCS stubs) are not in this grade.
- No invented lines. Soft-cal FLAG stays. No locks language.
