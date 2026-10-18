# HASHMARK Week 7 tape — Board (2026)

**As of:** Sunday Oct 18, 2026 · 10:45 AM CT
**Scope:** FBS–FBS only · **n = 57** (slate locked, 57/57 ESPN STATUS_FINAL)
**Engine:** HX 2026.7 pregame lines (not retuned by this tape). Quadratic home-perspective, HFA 60 Elo (0 neutral). Stamped Vegas closes.

## Headline

- **SU 34/57 (59.6%)** — under 70%
- **HX closer 3/6 (50.0%)** · Vegas closer 2/6 · ties 1 — graded only on the 6 cards with a stamped Vegas close (small sample; raw full-slate count 3/57)
- HX ATS 3/5 (60.0%) — Re-derived: HX side vs stamped Vegas close; HX = Vegas and pushes excluded (n=5). · MAE HX 12.68 (all 57) / Vegas 13.67 (6 lined) · Brier 0.234
- Season W1–W7 arithmetic (not a fresh W1–W6 audit): SU **72.8%** (270/371) · closer **41.6%** (133/320, Vegas-lined cards)
- Soft-cal FLAG remains. HX not retuned.

### Board flags

- **Winner-flip HIT** — Washington @ Purdue: HX Washington -11.8 vs Vegas PUR -2.5; FINAL 38–26

## 23 SU misses (HASHMARK favorite)

1. **Delaware** — Delaware @ Middle Tennessee: HX Delaware -3.1 · Vegas — · FINAL Delaware 30–Middle Tennessee 33 · closer=n/a (no Vegas)
2. **Old Dominion** — Georgia Southern @ Old Dominion: HX Old Dominion -4.6 · Vegas — · FINAL Georgia Southern 23–Old Dominion 15 · closer=n/a (no Vegas)
3. **East Carolina** — East Carolina @ UAB: HX East Carolina -1.4 · Vegas — · FINAL East Carolina 17–UAB 30 OT · closer=n/a (no Vegas)
4. **Memphis** — Memphis @ Tulane: HX Memphis -3.7 · Vegas — · FINAL Memphis 17–Tulane 31 · closer=n/a (no Vegas)
5. **Coastal Carolina** — App State @ Coastal Carolina: HX Coastal Carolina -3.7 · Vegas — · FINAL App State 35–Coastal Carolina 32 · closer=n/a (no Vegas)
6. **Texas** — Florida @ Texas: HX Texas -13.4 · Vegas — · FINAL Florida 27–Texas 24 · closer=n/a (no Vegas)
7. **Pittsburgh** — Pittsburgh @ Boston College: HX Pittsburgh -6.2 · Vegas — · FINAL Pittsburgh 21–Boston College 27 · closer=n/a (no Vegas)
8. **Florida Atlantic** — Florida Atlantic @ Army: HX Florida Atlantic -0.6 · Vegas — · FINAL Florida Atlantic 24–Army 56 · closer=n/a (no Vegas)
9. **Bowling Green** — Ball State @ Bowling Green: HX Bowling Green -6.5 · Vegas — · FINAL Ball State 32–Bowling Green 31 OT · closer=n/a (no Vegas)
10. **Maryland** — Rutgers @ Maryland: HX Maryland -2.4 · Vegas — · FINAL Rutgers 37–Maryland 30 · closer=n/a (no Vegas)
11. **Temple** — Charlotte @ Temple: HX Temple -11.7 · Vegas — · FINAL Charlotte 38–Temple 31 · closer=n/a (no Vegas)
12. **Alabama** — Alabama @ Tennessee: HX Alabama -0.4 · Vegas ALA -6.5 · FINAL Alabama 10–Tennessee 26 · closer=hx
13. **UNLV** — UNLV @ Air Force: HX UNLV -27.1 · Vegas — · FINAL UNLV 31–Air Force 41 · closer=n/a (no Vegas)
14. **Duke** — North Carolina @ Duke: HX Duke -12.1 · Vegas — · FINAL North Carolina 24–Duke 20 · closer=n/a (no Vegas)
15. **Georgia** — Auburn @ Georgia: HX Georgia -25.1 · Vegas — · FINAL Auburn 27–Georgia 24 · closer=n/a (no Vegas)
16. **Rice** — Tulsa @ Rice: HX Rice -1.9 · Vegas — · FINAL Tulsa 38–Rice 17 · closer=n/a (no Vegas)
17. **Washington State** — Washington State @ Oregon State: HX Washington State -1.9 · Vegas — · FINAL Washington State 30–Oregon State 48 · closer=n/a (no Vegas)
18. **Vanderbilt** — Arkansas @ Vanderbilt: HX Vanderbilt -9.5 · Vegas — · FINAL Arkansas 31–Vanderbilt 21 · closer=n/a (no Vegas)
19. **Southern Miss** — Arkansas State @ Southern Miss: HX Southern Miss -5.8 · Vegas — · FINAL Arkansas State 23–Southern Miss 13 · closer=n/a (no Vegas)
20. **Oklahoma** — Kentucky @ Oklahoma: HX Oklahoma -17.3 · Vegas OU -6.5 · FINAL Kentucky 21–Oklahoma 13 · closer=vegas
21. **Notre Dame** — Notre Dame @ BYU: HX Notre Dame -5.5 · Vegas — · FINAL Notre Dame 24–BYU 28 · closer=n/a (no Vegas)
22. **Hawaiʻi** — New Mexico @ Hawaiʻi: HX Hawaiʻi -6.3 · Vegas — · FINAL New Mexico 21–Hawaiʻi 10 · closer=n/a (no Vegas)
23. **California** — Wake Forest @ California: HX California -5.7 · Vegas — · FINAL Wake Forest 41–California 7 · closer=n/a (no Vegas)

## Top 25 closer cut

HX Top 25 involvement (n=15, hx_rank ≤25 on the HX 2026.7 pregame board): SU 10/15 (66.7%). Closer 2/3 on the 3 Vegas-lined cards · Vegas 1. Week 4 rule. Not a separate headline.

## Method check

The same grader (data/week5_od_hx_ship_2026.json hx_post → src/lib/cfb/model.ts Elo/quadratic; closer = smaller |line − home margin|; SU by HX favorite) reproduces the published Week 6 tape exactly on the HX 2026.7 board (SU 33/56, closer 27/56, Vegas 28/56, MAE 12.74 / 11.50, Brier 0.232) and the Week 5 tape on HX 2026.6 (SU 39/55, closer 20/55, MAE 14.87 / 13.19, Brier 0.195).

## Coverage / honesty

- FINAL scores: ESPN STATUS_FINAL (scoreboard + game summary). Oregon 17–Nebraska 14 stamps in migration 0063.
- Vegas closes: the stamped 0057 Week 7 book (6 cards where ESPN DraftKings = CBS Sports exactly). 51 cards stayed blank and are not graded for closer. Not rewritten by this tape.
- HX pregame lines are the HX 2026.7 board (live since 0047, unchanged through Week 7). Not a retune.
- FCS games (Clemson, Texas A&M, Nevada, Stanford, Ohio vs FCS) are not in this grade.
- No invented lines. Soft-cal FLAG stays. No locks language.
