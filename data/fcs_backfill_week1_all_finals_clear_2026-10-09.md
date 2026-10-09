# HASHMARK FCS Week 1 ALL FINALs CLEAR pack (Fri 2026-10-09 run)

Window: all **32** still-`scheduled(...)` Week 1 FCS W–L stubs in `src/lib/cfb/fcs-stubs.ts` (buffalo → vanderbilt), including UTSA + South Alabama. Repo `4e721e7`. Helper used: **`finalHome` only** (no `finalAway` in file; every game was FBS home). Sources: ESPN scoreboard groups=80 dates=20260903–05 + summary, CBS FBS Week 1 scoreboard, school athletics where noted.

**32 CLEAR / 0 HOLD**, 1 OT (Charlotte Final/3OT). Weeks 4–5: **no FCS stub arrays** in file.

| Stub | ESPN id | Final | OT | 2nd source | Verdict |
|---|---|---|---|---|---|
| `buffalo` w1 · -2001000 | 401866409 | BUFF 21, UAlbany 17 | no | CBS score MATCH | **CLEAR** |
| `delaware` w1 · -2001001 | 401864424 | DEL 42, Merrimack 7 | no | CBS score MATCH | **CLEAR** |
| `kennesaw-state` w1 · -2001002 | 401864425 | KENN 47, West Georgia 0 | no | CBS score MATCH | **CLEAR** |
| `ucf` w1 · -2001005 | 401856767 | UCF 73, Bethune-Cookman 6 | no | CBS score MATCH | **CLEAR** |
| `georgia-state` w1 · -2001007 | 401866623 | GAST 59, North Carolina A&T 10 | no | CBS score MATCH | **CLEAR** |
| `kansas` w1 · -2001008 | 401856769 | KU 51, LIU 6 | no | CBS score MATCH | **CLEAR** |
| `air-force` w1 · -2001010 | 401864496 | AFA 34, Duquesne 0 | no | CBS score MATCH | **CLEAR** |
| `arizona` w1 · -2001012 | 401856773 | ARIZ 35, Northern Arizona 7 | no | CBS score MATCH | **CLEAR** |
| `arizona-state` w1 · -2001013 | 401856774 | ASU 70, Morgan State 7 | no | CBS score MATCH | **CLEAR** |
| `arkansas` w1 · -2001014 | 401856635 | ARK 31, North Alabama 14 | no | CBS score MATCH | **CLEAR** |
| `bowling-green` w1 · -2001016 | 401866410 | Tarleton State 20, BGSU 13 (FBS L) | no | CBS score MATCH | **CLEAR** |
| `charlotte` w1 · -2001018 | 401862694 | The Citadel 43, CLT 41 (FBS L) | yes 3OT | CBS score MATCH | **CLEAR** |
| `georgia-southern` w1 · -2001020 | 401868170 | GASO 31, Charleston Southern 0 | no | CBS score MATCH | **CLEAR** |
| `iowa-state` w1 · -2001021 | 401856779 | ISU 38, Southeast Missouri State 10 | no | CBS score MATCH | **CLEAR** |
| `jacksonville-state` w1 · -2001022 | 401868140 | JXST 49, Eastern Kentucky 7 | no | CBS score MATCH | **CLEAR** |
| `kansas-state` w1 · -2001023 | 401856771 | KSU 71, Nicholls 3 | no | CBS score MATCH | **CLEAR** |
| `kentucky` w1 · -2001024 | 401856659 | UK 45, Youngstown State 13 | no | CBS score MATCH | **CLEAR** |
| `louisiana` w1 · -2001025 | 401869142 | UL 38, Lamar 7 | no | CBS score MATCH | **CLEAR** |
| `louisiana-tech` w1 · -2001026 | 401869129 | LT 80, Northwestern State 6 | no | CBS score MATCH | **CLEAR** |
| `middle-tennessee` w1 · -2001028 | 401867866 | MTSU 38, Murray State 14 | no | CBS score MATCH | **CLEAR** |
| `new-mexico-state` w1 · -2001030 | 401870790 | NMSU 51, Mercyhurst 14 | no | CBS score MATCH | **CLEAR** |
| `northwestern` w1 · -2001031 | 401858431 | NU 34, South Dakota State 18 | no | CBS score MATCH | **CLEAR** |
| `old-dominion` w1 · -2001032 | 401867973 | ODU 31, Norfolk State 10 | no | CBS score MATCH | **CLEAR** |
| `rice` w1 · -2001033 | 401862697 | RICE 31, Houston Christian 3 | no | CBS score MATCH | **CLEAR** |
| `san-diego-state` w1 · -2001034 | 401860879 | SDSU 53, Portland State 20 | no | CBS score MATCH | **CLEAR** |
| `south-alabama` w1 · -2001035 | 401868316 | USA 39, SE Louisiana 14 | no | CBS score MATCH | **CLEAR** |
| `southern-miss` w1 · -2001036 | 401868356 | USM 49, Alcorn State 3 | no | CBS score MATCH | **CLEAR** |
| `syracuse` w1 · -2001037 | 401858208 | SYR 66, New Hampshire 3 | no | CBS score MATCH | **CLEAR** |
| `temple` w1 · -2001038 | 401862698 | TEM 38, Rhode Island 14 | no | CBS score MATCH | **CLEAR** |
| `utah-state` w1 · -2001042 | 401860880 | Idaho State 29, USU 17 (FBS L) | no | CBS score MATCH | **CLEAR** |
| `utsa` w1 · -2001043 | 401862700 | UTSA 45, UT Rio Grande Valley 16 | no | CBS score MATCH | **CLEAR** |
| `vanderbilt` w1 · -2001044 | 401856669 | VAN 28, Austin Peay 9 | no | CBS score MATCH | **CLEAR** |

## Replacement calls (exact)

```ts
finalHome("buffalo", 1, "2026-09-03", "UAlbany", 21, 17),  // was scheduled("buffalo", 1, "2026-09-03")
finalHome("delaware", 1, "2026-09-03", "Merrimack", 42, 7),  // was scheduled("delaware", 1, "2026-09-03")
finalHome("kennesaw-state", 1, "2026-09-03", "West Georgia", 47, 0),  // was scheduled("kennesaw-state", 1, "2026-09-03")
finalHome("ucf", 1, "2026-09-03", "Bethune-Cookman", 73, 6),  // was scheduled("ucf", 1, "2026-09-03")
finalHome("georgia-state", 1, "2026-09-04", "North Carolina A&T", 59, 10),  // was scheduled("georgia-state", 1, "2026-09-04")
finalHome("kansas", 1, "2026-09-04", "LIU", 51, 6),  // was scheduled("kansas", 1, "2026-09-04")
finalHome("air-force", 1, "2026-09-05", "Duquesne", 34, 0),  // was scheduled("air-force", 1, "2026-09-05")
finalHome("arizona", 1, "2026-09-05", "Northern Arizona", 35, 7),  // was scheduled("arizona", 1, "2026-09-05")
finalHome("arizona-state", 1, "2026-09-05", "Morgan State", 70, 7),  // was scheduled("arizona-state", 1, "2026-09-05")
finalHome("arkansas", 1, "2026-09-05", "North Alabama", 31, 14),  // was scheduled("arkansas", 1, "2026-09-05")
finalHome("bowling-green", 1, "2026-09-05", "Tarleton State", 13, 20),  // was scheduled("bowling-green", 1, "2026-09-05")
finalHome("charlotte", 1, "2026-09-05", "The Citadel", 41, 43),  // was scheduled("charlotte", 1, "2026-09-05")
finalHome("georgia-southern", 1, "2026-09-05", "Charleston Southern", 31, 0),  // was scheduled("georgia-southern", 1, "2026-09-05")
finalHome("iowa-state", 1, "2026-09-05", "Southeast Missouri State", 38, 10),  // was scheduled("iowa-state", 1, "2026-09-05")
finalHome("jacksonville-state", 1, "2026-09-05", "Eastern Kentucky", 49, 7),  // was scheduled("jacksonville-state", 1, "2026-09-05")
finalHome("kansas-state", 1, "2026-09-05", "Nicholls", 71, 3),  // was scheduled("kansas-state", 1, "2026-09-05")
finalHome("kentucky", 1, "2026-09-05", "Youngstown State", 45, 13),  // was scheduled("kentucky", 1, "2026-09-05")
finalHome("louisiana", 1, "2026-09-05", "Lamar", 38, 7),  // was scheduled("louisiana", 1, "2026-09-05")
finalHome("louisiana-tech", 1, "2026-09-05", "Northwestern State", 80, 6),  // was scheduled("louisiana-tech", 1, "2026-09-05")
finalHome("middle-tennessee", 1, "2026-09-05", "Murray State", 38, 14),  // was scheduled("middle-tennessee", 1, "2026-09-05")
finalHome("new-mexico-state", 1, "2026-09-05", "Mercyhurst", 51, 14),  // was scheduled("new-mexico-state", 1, "2026-09-05")
finalHome("northwestern", 1, "2026-09-05", "South Dakota State", 34, 18),  // was scheduled("northwestern", 1, "2026-09-05")
finalHome("old-dominion", 1, "2026-09-05", "Norfolk State", 31, 10),  // was scheduled("old-dominion", 1, "2026-09-05")
finalHome("rice", 1, "2026-09-05", "Houston Christian", 31, 3),  // was scheduled("rice", 1, "2026-09-05")
finalHome("san-diego-state", 1, "2026-09-05", "Portland State", 53, 20),  // was scheduled("san-diego-state", 1, "2026-09-05")
finalHome("south-alabama", 1, "2026-09-05", "SE Louisiana", 39, 14),  // was scheduled("south-alabama", 1, "2026-09-05")
finalHome("southern-miss", 1, "2026-09-05", "Alcorn State", 49, 3),  // was scheduled("southern-miss", 1, "2026-09-05")
finalHome("syracuse", 1, "2026-09-05", "New Hampshire", 66, 3),  // was scheduled("syracuse", 1, "2026-09-05")
finalHome("temple", 1, "2026-09-05", "Rhode Island", 38, 14),  // was scheduled("temple", 1, "2026-09-05")
finalHome("utah-state", 1, "2026-09-05", "Idaho State", 17, 29),  // was scheduled("utah-state", 1, "2026-09-05")
finalHome("utsa", 1, "2026-09-05", "UT Rio Grande Valley", 45, 16),  // was scheduled("utsa", 1, "2026-09-05")
finalHome("vanderbilt", 1, "2026-09-05", "Austin Peay", 28, 9),  // was scheduled("vanderbilt", 1, "2026-09-05")
```

## Records (site before → after vs ESPN overall)

| Team | Site before | After stamp | ESPN overall | Aligns? |
|---|---|---|---|---|
| buffalo | 0–3 | 1–3 | 2–3 | **NO** |
| delaware | 1–3 | 2–3 | 2–3 | yes |
| kennesaw-state | 0–4 | 1–4 | 1–4 | yes |
| ucf | 2–2 | 3–2 | 3–2 | yes |
| georgia-state | 3–1 | 4–1 | 4–1 | yes |
| kansas | 1–2 | 2–2 | 2–2 | yes |
| air-force | 2–1 | 3–1 | 3–1 | yes |
| arizona | 3–1 | 4–1 | 4–1 | yes |
| arizona-state | 1–2 | 2–2 | 2–2 | yes |
| arkansas | 1–3 | 2–3 | 2–3 | yes |
| bowling-green | 1–3 | 1–4 | 1–4 | yes |
| charlotte | 0–4 | 0–5 | 0–5 | yes |
| georgia-southern | 1–3 | 2–3 | 2–3 | yes |
| iowa-state | 2–2 | 3–2 | 3–2 | yes |
| jacksonville-state | 3–1 | 4–1 | 4–2 | **NO** |
| kansas-state | 2–1 | 3–1 | 3–1 | yes |
| kentucky | 3–1 | 4–1 | 4–1 | yes |
| louisiana | 3–1 | 4–1 | 4–1 | yes |
| louisiana-tech | 1–2 | 2–2 | 2–2 | yes |
| middle-tennessee | 1–3 | 2–3 | 2–3 | yes |
| new-mexico-state | 1–4 | 2–4 | 2–4 | yes |
| northwestern | 2–1 | 3–1 | 3–1 | yes |
| old-dominion | 0–4 | 1–4 | 1–4 | yes |
| rice | 0–4 | 1–4 | 1–4 | yes |
| san-diego-state | 1–3 | 2–3 | 2–3 | yes |
| south-alabama | 3–2 | 4–2 | 4–2 | yes |
| southern-miss | 0–4 | 1–4 | 1–4 | yes |
| syracuse | 1–2 | 2–2 | 2–2 | yes |
| temple | 1–3 | 2–3 | 2–3 | yes |
| utah-state | 1–3 | 1–4 | 1–4 | yes |
| utsa | 4–1 | 5–1 | 5–1 | yes |
| vanderbilt | 2–2 | 3–2 | 3–2 | yes |

### Still differ after stamp (2)

- **buffalo**: site after 1–3 vs ESPN 2–3 — After Week 1 stamp still 1–3 vs ESPN 2–3: missing Week 4 FCS FINAL Buffalo 31–Robert Morris 28 (2026-09-26). No Week 4 FCS stub exists yet.
- **jacksonville-state**: site after 4–1 vs ESPN 4–2 — After Week 1 stamp still 4–1 vs ESPN 4–2: missing Week 0 FCS loss Jacksonville State 7 @ North Dakota State 33 (2026-08-29). No Week 0 FCS stub for Jax State.

## HOLDs

None. Every stubbed date had a played FBS-home FINAL with matching ESPN + CBS scores (athletics corroboration for edge cases).

## Weeks 4–5 FCS stubs

None in `fcs-stubs.ts`. Outside-stub FCS games still affecting W–L: Buffalo Week 4 vs Robert Morris; Jacksonville State Week 0 @ NDSU.

## Nits

- Existing stamped finalHome("texas-tech", 1, "2026-09-05", "Nicholls", 33, 3) is wrong opponent — ESPN Week 1 Texas Tech beat Abilene Christian 33–10; Nicholls played Kansas State (71–3). Out of scope for this pack; flag for Website hygiene.
- iowa-state and old-dominion: CBS quarter lines differ from ESPN scoring-play linescores; finals totals match. Pack uses ESPN linescores.
- charlotte Final/3OT: CBS collapses OT periods; score 41–43 matches ESPN.
- charlotte: ESPN status_detail=Final/3OT; CBS OT quarters collapsed differently but total 41-43 matches
- iowa-state: CBS regulation linescore differs from ESPN (CBS H[14, 3, 7, 14]/A[0, 7, 0, 3] vs ESPN H[14, 14, 3, 7]/A[0, 7, 0, 3]); finals totals match — using ESPN linescore

## Handoff

Replace all 32 scheduled(...) Week 1 stubs with the replacement_calls list (finalHome only). Smoke team hubs; expect 30/32 records to match ESPN overall. buffalo and jacksonville-state still need later FCS stub backfills (Week 4 RMU; Week 0 NDSU).

No self-stamp.
