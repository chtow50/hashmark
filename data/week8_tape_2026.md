# HASHMARK Week 8 tape — Board (2026)

**As of:** Sunday Oct 25, 2026 · 10:30 AM CT
**Scope:** FBS–FBS only · **n = 54** (slate locked, 54/54 ESPN STATUS_FINAL)
**Engine:** HX 2026.7 pregame lines (not retuned by this tape). Quadratic home-perspective, HFA 60 Elo (0 neutral). Stamped Vegas closes.

## Headline

- **SU 31/54 (57.4%)** — under 70%
- **HX closer 3/7 (42.9%)** · Vegas closer 4/7 · ties 0 — graded only on the 7 cards with a stamped Vegas close (small sample; raw full-slate count 3/54)
- HX ATS 4/7 (57.1%) — Re-derived: HX side vs stamped Vegas close; HX = Vegas and pushes excluded (n=7). · MAE HX 12.99 (all 54) / Vegas 7.43 (7 lined) · Brier 0.26
- Season W1–W8 arithmetic (not a fresh W1–W7 audit): SU **70.8%** (301/425) · closer **41.6%** (136/327, Vegas-lined cards)
- Soft-cal FLAG remains. HX not retuned.

### Board flags

- **Winner-flip MISS** — Virginia Tech @ Clemson: HX Clemson -12.1 vs Vegas VT -1.5; FINAL 20–16
- **Winner-flip MISS** — Vanderbilt @ Kentucky: HX Vanderbilt -3.0 vs Vegas UK -11.5; FINAL 17–34

## 23 SU misses (HASHMARK favorite)

1. **Florida International** — Middle Tennessee @ Florida International: HX Florida International -9.2 · Vegas — · FINAL Middle Tennessee 26–Florida International 23 · closer=n/a (no Vegas)
2. **Sam Houston** — New Mexico State @ Sam Houston: HX Sam Houston -5.0 · Vegas — · FINAL New Mexico State 30–Sam Houston 24 · closer=n/a (no Vegas)
3. **James Madison** — James Madison @ App State: HX James Madison -8.2 · Vegas — · FINAL James Madison 31–App State 34 OT · closer=n/a (no Vegas)
4. **Virginia** — Duke @ Virginia: HX Virginia -2.7 · Vegas — · FINAL Duke 19–Virginia 16 · closer=n/a (no Vegas)
5. **Tulsa** — Army @ Tulsa: HX Tulsa -7.1 · Vegas — · FINAL Army 38–Tulsa 35 · closer=n/a (no Vegas)
6. **NC State** — NC State @ Stanford: HX NC State -5.4 · Vegas — · FINAL NC State 28–Stanford 31 · closer=n/a (no Vegas)
7. **TCU** — West Virginia @ TCU: HX TCU -15.1 · Vegas — · FINAL West Virginia 24–TCU 20 · closer=n/a (no Vegas)
8. **Michigan** — Indiana @ Michigan: HX Michigan -3.0 · Vegas — · FINAL Indiana 13–Michigan 6 OT · closer=n/a (no Vegas)
9. **Akron** — Akron @ Kent State: HX Akron -3.5 · Vegas — · FINAL Akron 20–Kent State 35 · closer=n/a (no Vegas)
10. **Oregon** — Oregon @ Illinois: HX Oregon -14.4 · Vegas — · FINAL Oregon 10–Illinois 21 · closer=n/a (no Vegas)
11. **Georgia Tech** — Boston College @ Georgia Tech: HX Georgia Tech -17.4 · Vegas — · FINAL Boston College 49–Georgia Tech 27 · closer=n/a (no Vegas)
12. **Iowa** — Iowa @ Minnesota: HX Iowa -1.9 · Vegas IOWA -5.5 · FINAL Iowa 10–Minnesota 13 · closer=hx
13. **Tennessee** — Tennessee @ South Carolina: HX Tennessee -0.2 · Vegas — · FINAL Tennessee 24–South Carolina 27 · closer=n/a (no Vegas)
14. **Troy** — UL Monroe @ Troy: HX Troy -17.3 · Vegas — · FINAL UL Monroe 21–Troy 14 · closer=n/a (no Vegas)
15. **San José State** — San José State @ Nevada: HX San José State -0.2 · Vegas — · FINAL San José State 13–Nevada 28 · closer=n/a (no Vegas)
16. **Washington State** — Boise State @ Washington State: HX Washington State -1.4 · Vegas — · FINAL Boise State 31–Washington State 10 · closer=n/a (no Vegas)
17. **San Diego State** — San Diego State @ Colorado State: HX San Diego State -9.7 · Vegas — · FINAL San Diego State 49–Colorado State 56 · closer=n/a (no Vegas)
18. **Clemson** — Virginia Tech @ Clemson: HX Clemson -12.1 · Vegas VT -1.5 · FINAL Virginia Tech 20–Clemson 16 · closer=vegas · **winner-flip miss**
19. **USC** — USC @ Wisconsin: HX USC -4.8 · Vegas — · FINAL USC 7–Wisconsin 24 · closer=n/a (no Vegas)
20. **Vanderbilt** — Vanderbilt @ Kentucky: HX Vanderbilt -3.0 · Vegas UK -11.5 · FINAL Vanderbilt 17–Kentucky 34 · closer=vegas · **winner-flip miss**
21. **North Carolina** — Syracuse @ North Carolina: HX North Carolina -4.1 · Vegas — · FINAL Syracuse 31–North Carolina 30 OT · closer=n/a (no Vegas)
22. **Texas Tech** — Texas Tech @ Cincinnati: HX Texas Tech -20.3 · Vegas — · FINAL Texas Tech 24–Cincinnati 37 · closer=n/a (no Vegas)
23. **BYU** — BYU @ UCF: HX BYU -12.5 · Vegas — · FINAL BYU 31–UCF 39 OT · closer=n/a (no Vegas)

## Top 25 closer cut

HX Top 25 involvement (n=15, hx_rank ≤25 on the HX 2026.7 pregame board): SU 7/15 (46.7%). Closer 1/2 on the 2 Vegas-lined cards · Vegas 1. Week 4 rule. Not a separate headline.

## Method check

The same grader (data/week5_od_hx_ship_2026.json hx_post → src/lib/cfb/model.ts Elo/quadratic; closer = smaller |line − home margin|; SU by HX favorite) reproduces the published Week 7 tape exactly on the HX 2026.7 board (SU 34/57, closer 3/6, Vegas 2/6, 1 tie, MAE 12.68 / 13.67, Brier 0.234).

## Coverage / honesty

- FINAL scores: ESPN STATUS_FINAL (scoreboard + game summary). Week 8 stamped in 0066–0070; Utah 21–Houston 13 stamps in migration 0071.
- Vegas closes: the stamped 0064 Week 8 book (7 cards where ESPN DraftKings = CBS Sports exactly). 47 cards stayed blank and are not graded for closer. Not rewritten by this tape.
- HX pregame lines are the HX 2026.7 board (live since 0047, unchanged through Week 8). Not a retune.
- FCS games (Sacramento State at Ball State, North Dakota State at New Mexico) are not in this grade.
- No invented lines. Soft-cal FLAG stays. No locks language.
