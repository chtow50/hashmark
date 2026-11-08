# HASHMARK Week 10 tape — Board (2026)

**As of:** Sunday Nov 8, 2026 · 10:30 AM CT
**Scope:** FBS–FBS only · **n = 61** (slate locked, 61/61 ESPN STATUS_FINAL)
**Engine:** HX 2026.7 pregame lines (not retuned by this tape). Quadratic home-perspective, HFA 60 Elo (0 neutral). Stamped Vegas closes.

## Headline

- **SU 36/61 (59.0%)** — under 70% — SU FLAG
- **HX closer 3/5 (60.0%)** · Vegas closer 2/5 · ties 0 — graded only on the 5 cards with a stamped Vegas close (small sample, not under 45%, no closer FLAG; raw full-slate count 3/61)
- HX ATS 3/5 (60.0%) — Re-derived: HX side vs stamped Vegas close; HX = Vegas and pushes excluded (n=5). · MAE HX 15.95 (all 61) / Vegas 19.8 (5 lined) · Brier 0.266
- Season W1–W10 arithmetic (not a fresh W1–W9 audit): SU **70.6%** (381/540) · closer **42.0%** (142/338, Vegas-lined cards)
- Soft-cal FLAG remains. HX not retuned.

### Board flags

- **Winner-flip HIT** — South Florida @ East Carolina: HX East Carolina -1.5 vs Vegas USF -1.5; FINAL 17–20
- **Winner-flip HIT** — Iowa @ Northwestern: HX Iowa -2.3 vs Vegas NU -1.5; FINAL 24–10
- **Winner-flip MISS** — Marshall @ Georgia Southern: HX Marshall -2.9 vs Vegas GASO -8.5; FINAL 13–49

## 25 SU misses (HASHMARK favorite)

1. **Miami (OH)** — Buffalo @ Miami (OH): HX Miami (OH) -11.5 · Vegas — · FINAL Buffalo 34–Miami (OH) 31 OT · closer=n/a (no Vegas)
2. **Ball State** — Ball State @ Massachusetts: HX Ball State -7.7 · Vegas — · FINAL Ball State 30–Massachusetts 31 OT · closer=n/a (no Vegas)
3. **Eastern Michigan** — Central Michigan @ Eastern Michigan: HX Eastern Michigan -1.6 · Vegas — · FINAL Central Michigan 35–Eastern Michigan 7 · closer=n/a (no Vegas)
4. **UTSA** — UTSA @ Florida Atlantic: HX UTSA -10.4 · Vegas — · FINAL UTSA 29–Florida Atlantic 60 · closer=n/a (no Vegas)
5. **UConn** — North Carolina @ UConn: HX UConn -0.7 · Vegas — · FINAL North Carolina 38–UConn 21 · closer=n/a (no Vegas)
6. **Minnesota** — UCLA @ Minnesota: HX Minnesota -4.9 · Vegas — · FINAL UCLA 34–Minnesota 20 · closer=n/a (no Vegas)
7. **Tulane** — Tulsa @ Tulane: HX Tulane -9.7 · Vegas — · FINAL Tulsa 60–Tulane 10 · closer=n/a (no Vegas)
8. **NC State** — Duke @ NC State: HX NC State -5.0 · Vegas — · FINAL Duke 41–NC State 3 · closer=n/a (no Vegas)
9. **Coastal Carolina** — Old Dominion @ Coastal Carolina: HX Coastal Carolina -1.4 · Vegas — · FINAL Old Dominion 21–Coastal Carolina 8 · closer=n/a (no Vegas)
10. **App State** — Georgia State @ App State: HX App State -10.2 · Vegas APP -3.5 · FINAL Georgia State 39–App State 23 · closer=vegas
11. **Texas A&M** — Texas A&M @ South Carolina: HX Texas A&M -6.4 · Vegas — · FINAL Texas A&M 9–South Carolina 17 · closer=n/a (no Vegas)
12. **Arkansas State** — UL Monroe @ Arkansas State: HX Arkansas State -15.5 · Vegas — · FINAL UL Monroe 19–Arkansas State 17 · closer=n/a (no Vegas)
13. **Delaware** — Delaware @ Kennesaw State: HX Delaware -0.7 · Vegas — · FINAL Delaware 40–Kennesaw State 42 · closer=n/a (no Vegas)
14. **Ohio State** — Oregon @ Ohio State: HX Ohio State -6.2 · Vegas — · FINAL Oregon 41–Ohio State 28 · closer=n/a (no Vegas)
15. **Washington** — Penn State @ Washington: HX Washington -0.3 · Vegas — · FINAL Penn State 28–Washington 25 · closer=n/a (no Vegas)
16. **Temple** — Temple @ Navy: HX Temple -2.2 · Vegas — · FINAL Temple 35–Navy 42 · closer=n/a (no Vegas)
17. **Marshall** — Marshall @ Georgia Southern: HX Marshall -2.9 · Vegas GASO -8.5 · FINAL Marshall 13–Georgia Southern 49 · closer=vegas · **winner-flip miss**
18. **Western Kentucky** — Western Kentucky @ Middle Tennessee: HX Western Kentucky -13.6 · Vegas — · FINAL Western Kentucky 42–Middle Tennessee 51 · closer=n/a (no Vegas)
19. **Kansas** — UCF @ Kansas: HX Kansas -8.4 · Vegas — · FINAL UCF 33–Kansas 32 · closer=n/a (no Vegas)
20. **Troy** — Louisiana Tech @ Troy: HX Troy -6.4 · Vegas — · FINAL Louisiana Tech 41–Troy 17 · closer=n/a (no Vegas)
21. **Michigan** — Michigan State @ Michigan: HX Michigan -30.7 · Vegas — · FINAL Michigan State 15–Michigan 6 · closer=n/a (no Vegas)
22. **Army** — Air Force @ Army: HX Army -10.5 · Vegas — · FINAL Air Force 24–Army 21 · closer=n/a (no Vegas)
23. **Florida** — Oklahoma @ Florida: HX Florida -1.2 · Vegas — · FINAL Oklahoma 23–Florida 7 · closer=n/a (no Vegas)
24. **UNLV** — Wyoming @ UNLV: HX UNLV -24.5 · Vegas — · FINAL Wyoming 41–UNLV 35 · closer=n/a (no Vegas)
25. **Kansas State** — Oklahoma State @ Kansas State: HX Kansas State -16.1 · Vegas — · FINAL Oklahoma State 66–Kansas State 28 · closer=n/a (no Vegas)

## Top 25 closer cut

HX Top 25 involvement (n=15, hx_rank ≤25 on the HX 2026.7 pregame board): SU 10/15 (66.7%). Closer 2/2 on the 2 Vegas-lined cards · Vegas 0. Week 4 rule. Not a separate headline.

## Method check

The same grader (data/week5_od_hx_ship_2026.json hx_post → src/lib/cfb/model.ts Elo/quadratic; closer = smaller |line − home margin|; SU by HX favorite) reproduces the published Week 9 tape exactly on the HX 2026.7 board (SU 44/54, closer 3/6, Vegas 3/6, 0 ties, ATS 4/6, MAE 12.38 / 17.0, Brier 0.153).

## Coverage / honesty

- FINAL scores: ESPN STATUS_FINAL (scoreboard + game summary). Week 10 stamped in 0082–0086 (61/61). No stragglers.
- Vegas closes: the stamped 0080 Week 10 book (5 cards where ESPN DraftKings = CBS Sports exactly). 56 cards stayed blank and are not graded for closer. Not rewritten by this tape.
- HX pregame lines are the HX 2026.7 board (live since 0047, unchanged through Week 10). Not a retune.
- FCS games (Toledo at Sacramento State, Merrimack at Wake Forest — FCS stubs) are not in this grade.
- No invented lines. Soft-cal FLAG stays. No locks language.
