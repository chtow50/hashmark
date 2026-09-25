# AP Top 25 CLEAR stamp — Week 4 · Sept. 20, 2026

**Product:** AP ranks + chrome only · **no HX / model retune**
**Source:** [NCAA.com](https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings)
**Website peer CLEAR:** 2026-09-25 (with Friday Stories package)

## Chrome for Website
Replace `AP_STAMP` Week 3 / Sept. 13 with:
- week: **4**
- asOf: **Sept. 20**
- label: **Week 4 AP**
- columnHint: **W4 stamp**
- lede: HX is Week 4. AP is the last stamped poll (Week 4, Sept. 20) — not a Week 3 ballot.

## Ballot
| Rank | School | Rec | Prev | FPV | Pts |
|---:|---|---|---:|---:|---:|
| 1 | Texas | 3-0 | 1 | 58 | 1,706 |
| 2 | Georgia | 3-0 | 2 | 3 | 1,580 |
| 3 | Notre Dame | 3-0 | 3 | — | 1,517 |
| 4 | Ole Miss | 3-0 | 8 | 3 | 1,488 |
| 5 | Indiana | 3-0 | 4 | 4 | 1,467 |
| 6 | Miami (FL) | 3-0 | 5 | 1 | 1,445 |
| 7 | Ohio State | 2-1 | 6 | — | 1,415 |
| 8 | Alabama | 3-0 | 10 | — | 1,182 |
| 9 | BYU | 3-0 | 11 | — | 1,090 |
| 10 | LSU | 2-1 | 7 | — | 1,078 |
| 11 | Texas Tech | 3-0 | 13 | — | 1,067 |
| 12 | Southern Cal | 4-0 | 12 | — | 907 |
| 13 | Penn State | 3-0 | 14 | — | 850 |
| 14 | Tennessee | 3-0 | 15 | — | 826 |
| 15 | Utah | 3-0 | 17 | — | 752 |
| 16 | Louisville | 2-1 | 23 | — | 692 |
| 17 | Iowa | 3-0 | 18 | — | 561 |
| 18 | Michigan | 3-0 | 19 | — | 432 |
| 19 | Missouri | 3-0 | 20 | — | 369 |
| 20 | Oregon | 2-1 | 21 | — | 364 |
| 21 | Florida | 3-0 | NR | — | 269 |
| 22 | SMU | 2-1 | 16 | — | 212 |
| 23 | Texas A&M | 2-1 | 9 | — | 202 |
| 24 | Mississippi State | 3-0 | NR | — | 179 |
| 25 | Houston | 2-1 | 22 | — | 127 |

## Website job
1. Stamp all 25 `ap_rank` (clear ranks for dropouts — esp. Oklahoma, Virginia)
2. Update AP chrome / `AP_STAMP` on home, rankings, disagreement cards
3. Rebuild `data/week4_hx_vs_ap_gaps_2026.json` from live HX 2026.5 + this ballot
4. Peer CLEAR → merge → LIVE CLEAR

JSON: `/workspace/cfb/ap_top25_week4_2026-09-20.json`
