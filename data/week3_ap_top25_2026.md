# AP Top 25 CLEAR stamp — Week 3 · Sept. 13, 2026

**Product:** AP ranks + chrome only · **no HX / model retune**
**Source:** [NCAA.com](https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings) · Cash Scout verify Texas #1 / Oregon #21
**Live problem:** hashmarkcfb.com still shows Week 1 AP (Sept. 8) while board is Week 3 HX 2026.4

## Chrome for Website
Replace `AP_STAMP` Week 1 / Sept. 8 with:
- week: **3**
- asOf: **Sept. 13**
- label: **Week 3 AP**
- columnHint: **W3 stamp**
- lede: HX is Week 3. AP is the last stamped poll (Week 3, Sept. 13) — not a Week 1 ballot.

## Ballot
| Rank | School | Rec | Prev | FPV | Pts |
|---:|---|---|---:|---:|---:|
| 1 | Texas | 2-0 | 4 | 56 | 1,678 |
| 2 | Georgia | 2-0 | 2 | 3 | 1,551 |
| 3 | Notre Dame | 2-0 | 3 | 1 | 1,531 |
| 4 | Indiana | 2-0 | 5 | 3 | 1,466 |
| 5 | Miami (FL) | 2-0 | 7 | 4 | 1,452 |
| 6 | Ohio State | 1-1 | 1 | — | 1,407 |
| 7 | LSU | 2-0 | 8 | 1 | 1,334 |
| 8 | Ole Miss | 2-0 | 9 | — | 1,216 |
| 9 | Texas A&M | 2-0 | 10 | — | 1,165 |
| 10 | Alabama | 2-0 | 12 | — | 1,068 |
| 11 | BYU | 2-0 | T14 | — | 966 |
| 12 | Southern Cal | 3-0 | T14 | — | 944 |
| 13 | Texas Tech | 2-0 | 13 | — | 910 |
| 14 | Penn State | 2-0 | 16 | — | 692 |
| 15 | Tennessee | 2-0 | 18 | — | 676 |
| 16 | SMU | 2-0 | 17 | — | 636 |
| 17 | Utah | 2-0 | 20 | — | 558 |
| 18 | Iowa | 2-0 | 21 | — | 391 |
| 19 | Michigan | 2-0 | NR | — | 382 |
| 20 | Missouri | 2-0 | 23 | — | 344 |
| 21 | Oregon | 1-1 | 6 | — | 324 |
| 22 | Houston | 2-0 | 22 | — | 292 |
| 23 | Louisville | 1-1 | 24 | — | 244 |
| 24 | Oklahoma | 1-1 | 11 | — | 222 |
| 25 | Virginia | 2-0 | 25 | — | 182 |

## Headline moves
- Texas 4→1 (56 FPV) after win vs Ohio State
- Ohio State 1→6
- Oregon 6→21 after loss at Oklahoma State
- Oklahoma 11→24 after loss at Michigan
- Michigan NR→19

## Website job
1. Stamp all 25 `ap_rank` (clear ranks 26+ / NR that left the ballot — esp. Washington if still carrying W1 AP)
2. Update AP chrome / `AP_STAMP` as above on home, rankings, disagreement cards
3. Ping Research for peer CLEAR → merge → LIVE CLEAR
4. Marketing / vs-AP Edge claims hold until LIVE CLEAR

**RESEARCH CLEAR** pack ready. Mirror JSON: `/workspace/cfb/ap_top25_week3_2026-09-13.json`
