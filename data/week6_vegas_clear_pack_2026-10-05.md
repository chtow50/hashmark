# Week 6 2026 FBS–FBS Vegas CLEAR pack — HASHMARK Website stamp

- **Verified**: 2026-10-05 09:27 CT
- **Scope**: FBS–FBS only · Week 6 (Tue Oct 6 – Sat Oct 10 2026 CT; ESPN kick CT governs; HM labels Wed Oct 7 – Sun Oct 11)
- **Counts**: **56 games** · **54 CLEAR** · **2 HOLD** · **1 blank Vegas** · **55 with O/U** · **1 blank TV**
- **NEW lines** (blank → book since Oct 1): **43**
- **MOVED lines** (re-verified change vs Oct 1): **11**
- **Kick corrections/gains** vs Oct 1 pack: **4**
- **TV gains** (was —): **8**
- **By day (ESPN CT)**: Tue 1 · Wed 2 · Thu 4 · Fri 5 · Sat 44
- **JSON**: `/workspace/cfb/week6_vegas_clear_pack_2026-10-05.json`
- **Archive baseline**: `/workspace/cfb/week6_fbs_fbs_kick_tv_vegas_2026.{md,json}` (Oct 1) kept; do not treat as current.
- **Live board**: https://hashmarkcfb.com/schedule?w=6 — featured **ISU@BYU** already LIVE CLEAR (site still shows BYU −14.5 / 50.5; ESPN now **BYU −10.5 / 48.5** → MOVED restamp). Soft-cal FLAG stays.
- **Policy**: ESPN DraftKings `details` only. Home-perspective `vegas_spread` (neg = home favored). No invented Vegas/kick/TV. Research does not stamp/merge/X.
- **FINALs note**: First FINAL target **Southern Miss @ Troy Oct 6 7:00 CT ESPN2** is a separate nightly FINALs task — do not invent scores.

## Sources (named)

| Source | Role | as_of |
| --- | --- | --- |
| ESPN site.web.api scoreboard groups=80 week=6 / dates=20261006–20261010 | Kick CT, TV/broadcasts, DraftKings odds | 2026-10-05 09:27 CT |
| ESPN competition.odds / pickcenter provider=DraftKings (details, spread, overUnder) | Vegas CLEAR lines | 2026-10-05 09:27 CT |
| CBS Sports Week 6 gametracker board | Cross-check SC@FLA, TAMU@MIZ, Iowa@Wash, midweek openers | 2026-10-05 09:27 CT |
| hashmarkcfb.com/schedule?w=6 | Already LIVE CLEAR / stamped Vegas inventory | 2026-10-05 09:27 CT |
| Prior pack week6_fbs_fbs_kick_tv_vegas_2026 | Baseline CLEAR 9 / HOLD 47 (Oct 1 10:15 CT) | 2026-10-01 10:15 CT |

## Website handoff (stamp instructions)

1. **Peer CLEAR this pack** (Research → peer agent reviews JSON/MD; no invent).
2. **Website stamps** `/schedule?w=6` from CLEAR rows only (kick CT + TV + Vegas/O/U). Leave HOLD rows blank where noted.
3. **Smoke** schedule Week 6 after stamp.
4. **Research LIVE CLEAR** only after Website smoke OK.
5. **Marketing HOLD quotes** until LIVE CLEAR — do not publish Vegas quotes from this pack pre-stamp.
6. **Already LIVE rows with MOVED lines** (ISU@BYU featured, USM@Troy, JXST@KENN, IU@NEB, UCLA@ORE, TEX@OU, LSU@UK, USC@PSU, UGA@ALA): restamp Vegas/O/U from this pack — do not treat as brand-new cards.

Research does **not** stamp/merge/X. Soft-cal FLAG stays.

---

## Section A — Management priority + midweek opens

Management assign: **SC@FLA kick+TV**, **TAMU@MIZ kick+TV**, **Iowa@Wash TV**. Confirmed vs ESPN DraftKings + CBS Sports board sample.

| Kick CT | Away | Home | Matchup | TV | Vegas | ESPN ID | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-10 11:45 Sat | SC | FLA | South Carolina @ Florida | SEC Network | FLA -13.5 / O/U 62.5 | 401856714 | CLEAR | MOVED; Kick GAIN; TV GAIN |
| 2026-10-10 11:00 Sat | TA&M | MIZ | Texas A&M @ Missouri | ABC | MIZ -3.5 / O/U 48.5 | 401856716 | CLEAR | MOVED; Kick GAIN; TV GAIN |
| 2026-10-09 20:00 Fri | IOWA | WASH | Iowa @ Washington | — | WASH -2.5 / O/U 41.5 | 401858487 | HOLD | HOLD (TV); day-risk |

### Management priority detail

- **South Carolina @ Florida** (`401856714`): **FLA -13.5 / O/U 62.5** · 2026-10-10 11:45 Sat · SEC Network · **CLEAR** · MOVED (was FLA -14.5 / 57.5; Kick+TV were blank Oct 1). CBS board concurs FLA -13.5 / o62.5.
- **Texas A&M @ Missouri** (`401856716`): **MIZ -3.5 / O/U 48.5** · 2026-10-10 11:00 Sat · ABC · **CLEAR** · MOVED (was MIZ -1.5 / 50.5; Kick+TV were blank Oct 1). CBS board concurs MIZ -3.5 / o48.5.
- **Iowa @ Washington** (`401858487`): Kick **2026-10-09 20:00 Fri** · Vegas **WASH -2.5 / O/U 41.5** (MOVED from -1.5) · TV **—** · **HOLD (TV)**. ESPN + CBS show no network; Big Ten/UW/FOX pages still say FOX or FS1 TBD — do not invent. Day-risk (HM Saturday, Oct 10).

### Midweek CLEAR (Tue–Thu)

| Kick CT | Away | Home | Matchup | TV | Vegas | ESPN ID | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-06 19:00 Tue | USM | TROY | Southern Miss @ Troy | ESPN2 | TROY -10.5 / O/U 49.5 | 401871090 | CLEAR | MOVED; day-risk |
| 2026-10-07 18:00 Wed | JXST | KENN | Jacksonville State @ Kennesaw State | CBSSN | JXST -3 / O/U 50.5 | 401871051 | CLEAR | MOVED |
| 2026-10-07 18:30 Wed | NMSU | FIU | New Mexico State @ FIU | ESPN2 | FIU -6 / O/U 46.5 | 401871066 | CLEAR | NEW |
| 2026-10-08 18:00 Thu | MOST | WKU | Missouri State @ Western Kentucky | CBSSN | WKU -2.5 / O/U 55.5 | 401871052 | CLEAR | NEW |
| 2026-10-08 18:00 Thu | SHSU | LIB | Sam Houston @ Liberty | ESPNU | LIB -13.5 / O/U 52.5 | 401870766 | CLEAR | NEW |
| 2026-10-08 18:30 Thu | USA | ARST | South Alabama @ Arkansas State | ESPN2 | ARST -1.5 / O/U 57.5 | 401869933 | CLEAR | NEW |
| 2026-10-08 18:30 Thu | USF | UTSA | South Florida @ UTSA | ESPN | UTSA -7 / O/U 51.5 | 401862794 | CLEAR | NEW |

- **Southern Miss @ Troy** (`401871090`): **TROY -10.5 / O/U 49.5** · 2026-10-06 19:00 Tue · ESPN2 · **CLEAR** · MOVED (was -8.5 / 48.5) · ALREADY LIVE on site · day-risk (HM Wed Oct 7). Nightly FINALs target — not this pack.
- **Jacksonville State @ Kennesaw State** (`401871051`): **JXST -3 / O/U 50.5** · 2026-10-07 18:00 Wed · CBSSN · **CLEAR** · MOVED (was -2.5 / 48.5) · ALREADY LIVE on site.
- **New Mexico State @ FIU** (`401871066`): **FIU -6 / O/U 46.5** · 2026-10-07 18:30 Wed · ESPN2 · **CLEAR** · NEW.

---

## Section B — Fri / Sat remaining fills

### Friday

| Kick CT | Away | Home | Matchup | TV | Vegas | ESPN ID | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-09 18:00 Fri | FSU | LOU | Florida State @ Louisville | ESPN | LOU -4 / O/U 59.5 | 401858254 | CLEAR | NEW |
| 2026-10-09 20:00 Fri | IOWA | WASH | Iowa @ Washington | — | WASH -2.5 / O/U 41.5 | 401858487 | HOLD | HOLD (TV); day-risk |
| 2026-10-09 20:00 Fri | WSU | USU | Washington State @ Utah State | CW | USU -4.5 / O/U 43.5 | 401860922 | CLEAR | NEW; day-risk |
| 2026-10-09 20:00 Fri | WYO | SJSU | Wyoming @ San José State | CBSSN | SJSU -6.5 / O/U 43.5 | 401864519 | CLEAR | NEW; day-risk |
| 2026-10-09 21:15 Fri | ISU | BYU | Iowa State @ BYU | ESPN | BYU -10.5 / O/U 48.5 | 401856826 | CLEAR | MOVED; day-risk |

### Featured

- **Iowa State @ BYU** (`401856826`): **BYU -10.5 / O/U 48.5** · 2026-10-09 21:15 Fri · ESPN · **CLEAR** · MOVED (site LIVE still BYU -14.5 / 50.5) · day-risk (HM Sat Oct 10).

### Saturday

| Kick CT | Away | Home | Matchup | TV | Vegas | ESPN ID | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-10 11:00 Sat | ARIZ | WVU | Arizona @ West Virginia | TNT | ARIZ -3.5 / O/U 60.5 | 401856823 | CLEAR | NEW |
| 2026-10-10 11:00 Sat | IU | NEB | Indiana @ Nebraska | FOX | IU -7.5 / O/U 52.5 | 401858481 | CLEAR | MOVED |
| 2026-10-10 11:00 Sat | UNC | PITT | North Carolina @ Pittsburgh | ESPN | PITT -4.5 / O/U 47.5 | 401858256 | CLEAR | NEW; TV GAIN |
| 2026-10-10 11:00 Sat | TULN | ARMY | Tulane @ Army | CBSSN | ARMY -3 / O/U 47.5 | 401862795 | CLEAR | NEW |
| 2026-10-10 11:00 Sat | UCF | OKST | UCF @ Oklahoma State | ESPN2 | OKST -10 / O/U 53.5 | 401856824 | CLEAR | NEW; TV GAIN |
| 2026-10-10 11:00 Sat | WAKE | NCSU | Wake Forest @ NC State | CW | WAKE -3.5 / O/U 60.5 | 401858260 | CLEAR | NEW |
| 2026-10-10 11:00 Sat | TA&M | MIZ | Texas A&M @ Missouri | ABC | MIZ -3.5 / O/U 48.5 | 401856716 | CLEAR | MOVED; Kick GAIN; TV GAIN |
| 2026-10-10 11:30 Sat | BALL | NU | Ball State @ Northwestern | BTN | NU -36.5 / O/U 52.5 | 401858482 | CLEAR | NEW |
| 2026-10-10 11:45 Sat | SC | FLA | South Carolina @ Florida | SEC Network | FLA -13.5 / O/U 62.5 | 401856714 | CLEAR | MOVED; Kick GAIN; TV GAIN |
| 2026-10-10 12:00 Sat | ODU | APP | Old Dominion @ App State | ESPN+ | APP -9.5 / O/U 50.5 | 401869843 | CLEAR | NEW |
| 2026-10-10 13:00 Sat | M-OH | MASS | Miami (OH) @ Massachusetts | ESPN+ | M-OH -2.5 / O/U 47.5 | 401866440 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | BUFF | TOL | Buffalo @ Toledo | ESPN+ | TOL -20.5 / O/U 54.5 | 401866437 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | CMU | OHIO | Central Michigan @ Ohio | ESPN+ | OHIO -3 / O/U 46.5 | 401866438 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | CLT | UNT | Charlotte @ North Texas | ESPN+ | UNT -27.5 / O/U 59.5 | 401862796 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | DUKE | GT | Duke @ Georgia Tech | ESPN2 | DUKE -7 / O/U 49.5 | 401858255 | CLEAR | NEW; TV GAIN |
| 2026-10-10 14:30 Sat | EMU | AKR | Eastern Michigan @ Akron | ESPN+ | EMU -7 / O/U 50.5 | 401866435 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | HOU | KSU | Houston @ Kansas State | FOX | KSU -2.5 / O/U 56.5 | 401856825 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | ILL | MSU | Illinois @ Michigan State | FS1 | ILL -2.5 / O/U 49.5 | 401858480 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | KENT | WMU | Kent State @ Western Michigan | ESPN+ | WMU -13.5 / O/U 43.5 | 401866439 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | MISS | VAN | Ole Miss @ Vanderbilt | ESPN | MISS -10 / O/U 59.5 | 401856718 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | STAN | ND | Stanford @ Notre Dame | NBC | ND -37.5 / O/U 53.5 | 401858257 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | TEX | OU | Texas vs Oklahoma | ABC | TEX -8.5 / O/U 39.5 | 401856717 | CLEAR | MOVED |
| 2026-10-10 14:30 Sat | TLSA | NAVY | Tulsa @ Navy | CBSSN | NAVY -2.5 / O/U 49.5 | 401862799 | CLEAR | NEW |
| 2026-10-10 14:30 Sat | UCLA | ORE | UCLA @ Oregon | CBS | ORE -11.5 / O/U 59.5 | 401858484 | CLEAR | MOVED |
| 2026-10-10 14:30 Sat | VT | CAL | Virginia Tech @ California | ACC Network | VT -9.5 / O/U 53.5 | 401858259 | CLEAR | NEW; TV GAIN |
| 2026-10-10 14:45 Sat | CONN | TEM | UConn @ Temple | ESPNU | TEM -4.5 / O/U 54.5 | 401861964 | CLEAR | NEW |
| 2026-10-10 15:00 Sat | RICE | ECU | Rice @ East Carolina | ESPN+ | ECU -10 / O/U 49.5 | 401862797 | CLEAR | NEW |
| 2026-10-10 15:15 Sat | MD | OSU | Maryland @ Ohio State | BTN | OSU -34.5 / O/U 56.5 | 401858483 | CLEAR | NEW |
| 2026-10-10 15:15 Sat | TENN | ARK | Tennessee @ Arkansas | SEC Network | TENN -13.5 / O/U 50.5 | 401856713 | CLEAR | NEW |
| 2026-10-10 17:00 Sat | SDSU | ORST | San Diego State @ Oregon State | USA Net | ORST -14 / O/U 55.5 | 401860902 | CLEAR | NEW |
| 2026-10-10 18:00 Sat | CCU | MRSH | Coastal Carolina @ Marshall | ESPN+ | MRSH -3 / O/U 57.5 | 401869943 | CLEAR | NEW |
| 2026-10-10 18:00 Sat | LSU | UK | LSU @ Kentucky | ESPN | LSU -10 / O/U 54.5 | 401856715 | CLEAR | MOVED |
| 2026-10-10 18:00 Sat | NEV | UTEP | Nevada @ UTEP | FS1 | NEV -9.5 / O/U 49.5 | 401864517 | CLEAR | NEW |
| 2026-10-10 18:00 Sat | UAB | MEM | UAB @ Memphis | ESPN2 | MEM -14.5 / O/U 58.5 | 401862798 | CLEAR | NEW; Kick GAIN; TV GAIN |
| 2026-10-10 18:30 Sat | AFA | NIU | Air Force @ Northern Illinois | CBSSN | AF -10 / O/U 47.5 | 401864516 | CLEAR | NEW |
| 2026-10-10 18:30 Sat | UGA | ALA | Georgia @ Alabama | ABC | ALA -1.5 / O/U 55.5 | 401856712 | CLEAR | MOVED |
| 2026-10-10 18:30 Sat | UL | LT | Louisiana @ Louisiana Tech | ESPN+ | LT -3 / O/U 48.5 | 401869965 | CLEAR | NEW |
| 2026-10-10 18:30 Sat | SYR | UVA | Syracuse @ Virginia | ACC Network | UVA -9.5 / O/U 50.5 | 401858258 | CLEAR | NEW |
| 2026-10-10 18:30 Sat | USC | PSU | USC @ Penn State | NBC | PSU -1.5 / O/U 54.5 | 401858485 | CLEAR | MOVED |
| 2026-10-10 18:30 Sat | JMU | GASO | James Madison @ Georgia Southern | ESPNU | JMU -8.5 / O/U 53.5 | 401869949 | CLEAR | NEW; Kick GAIN; TV GAIN |
| 2026-10-10 19:00 Sat | MINN | PUR | Minnesota @ Purdue | BTN | MINN -2.5 / O/U 51.5 | 401858486 | CLEAR | NEW |
| 2026-10-10 20:30 Sat | HAW | ASU | Hawaiʻi @ Arizona State | FS1 | ASU -20.5 / O/U 51.5 | 401856808 | CLEAR | NEW |
| 2026-10-10 21:15 Sat | KU | UTAH | Kansas @ Utah | ESPN | — (DK O/U 52.5 no spread) | 401856827 | HOLD | HOLD (Vegas) |
| 2026-10-10 21:30 Sat | BOIS | FRES | Boise State @ Fresno State | CW | BOIS -5.5 / O/U 48.5 | 401860901 | CLEAR | NEW; day-risk |

### Prior blank kick/TV fills (Management + named)

- **UNC @ Pittsburgh** (`401858256`): **PITT -4.5 / O/U 47.5** · 2026-10-10 11:00 Sat · ESPN · **CLEAR** · NEW; TV GAIN.
- **UCF @ Oklahoma State** (`401856824`): **OKST -10 / O/U 53.5** · 2026-10-10 11:00 Sat · ESPN2 · **CLEAR** · NEW; TV GAIN.
- **Duke @ Georgia Tech** (`401858255`): **DUKE -7 / O/U 49.5** · 2026-10-10 14:30 Sat · ESPN2 · **CLEAR** · NEW; TV GAIN.
- **Virginia Tech @ California** (`401858259`): **VT -9.5 / O/U 53.5** · 2026-10-10 14:30 Sat · ACC Network · **CLEAR** · NEW; TV GAIN.
- **James Madison @ Georgia Southern** (`401869949`): **JMU -8.5 / O/U 53.5** · 2026-10-10 18:30 Sat · ESPNU · **CLEAR** · NEW; Kick+TV GAIN.
- **UAB @ Memphis** (`401862798`): **MEM -14.5 / O/U 58.5** · 2026-10-10 18:00 Sat · ESPN2 · **CLEAR** · NEW; Kick+TV GAIN.

### HOLD only

- **Iowa @ Washington** (`401858487`): HOLD (TV) — kick=`2026-10-09 20:00` tv=`—` vegas=`WASH -2.5`. Vegas MOVED vs Oct1 (WASH -1.5 → WASH -2.5) but still HOLD (TV); TV blank on ESPN+CBS; Big Ten/UW/FOX pages say FOX or FS1 TBD — do not invent; day-risk (HM Saturday, Oct 10 vs ESPN Fri 2026-10-09 20:00)
- **Kansas @ Utah** (`401856827`): HOLD (Vegas) — kick=`2026-10-10 21:15` tv=`ESPN` vegas=`—` · note (O/U 52.5 no spread — not stampable). DraftKings has O/U 52.5 only — no details/spread → Vegas HOLD

---

## Full CLEAR stamp table (compact)

| ESPN ID | Away | Home | Kick CT | TV | Vegas details | O/U | Status | Change |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 401871090 | USM | TROY | 2026-10-06 19:00 Tue | ESPN2 | TROY -10.5 | 49.5 | CLEAR | MOVED |
| 401871051 | JXST | KENN | 2026-10-07 18:00 Wed | CBSSN | JXST -3 | 50.5 | CLEAR | MOVED |
| 401871066 | NMSU | FIU | 2026-10-07 18:30 Wed | ESPN2 | FIU -6 | 46.5 | CLEAR | NEW |
| 401871052 | MOST | WKU | 2026-10-08 18:00 Thu | CBSSN | WKU -2.5 | 55.5 | CLEAR | NEW |
| 401870766 | SHSU | LIB | 2026-10-08 18:00 Thu | ESPNU | LIB -13.5 | 52.5 | CLEAR | NEW |
| 401869933 | USA | ARST | 2026-10-08 18:30 Thu | ESPN2 | ARST -1.5 | 57.5 | CLEAR | NEW |
| 401862794 | USF | UTSA | 2026-10-08 18:30 Thu | ESPN | UTSA -7 | 51.5 | CLEAR | NEW |
| 401858254 | FSU | LOU | 2026-10-09 18:00 Fri | ESPN | LOU -4 | 59.5 | CLEAR | NEW |
| 401860922 | WSU | USU | 2026-10-09 20:00 Fri | CW | USU -4.5 | 43.5 | CLEAR | NEW |
| 401864519 | WYO | SJSU | 2026-10-09 20:00 Fri | CBSSN | SJSU -6.5 | 43.5 | CLEAR | NEW |
| 401856826 | ISU | BYU | 2026-10-09 21:15 Fri | ESPN | BYU -10.5 | 48.5 | CLEAR | MOVED |
| 401856823 | ARIZ | WVU | 2026-10-10 11:00 Sat | TNT | ARIZ -3.5 | 60.5 | CLEAR | NEW |
| 401858481 | IU | NEB | 2026-10-10 11:00 Sat | FOX | IU -7.5 | 52.5 | CLEAR | MOVED |
| 401858256 | UNC | PITT | 2026-10-10 11:00 Sat | ESPN | PITT -4.5 | 47.5 | CLEAR | NEW |
| 401862795 | TULN | ARMY | 2026-10-10 11:00 Sat | CBSSN | ARMY -3 | 47.5 | CLEAR | NEW |
| 401856824 | UCF | OKST | 2026-10-10 11:00 Sat | ESPN2 | OKST -10 | 53.5 | CLEAR | NEW |
| 401858260 | WAKE | NCSU | 2026-10-10 11:00 Sat | CW | WAKE -3.5 | 60.5 | CLEAR | NEW |
| 401856716 | TA&M | MIZ | 2026-10-10 11:00 Sat | ABC | MIZ -3.5 | 48.5 | CLEAR | MOVED |
| 401858482 | BALL | NU | 2026-10-10 11:30 Sat | BTN | NU -36.5 | 52.5 | CLEAR | NEW |
| 401856714 | SC | FLA | 2026-10-10 11:45 Sat | SEC Network | FLA -13.5 | 62.5 | CLEAR | MOVED |
| 401869843 | ODU | APP | 2026-10-10 12:00 Sat | ESPN+ | APP -9.5 | 50.5 | CLEAR | NEW |
| 401866440 | M-OH | MASS | 2026-10-10 13:00 Sat | ESPN+ | M-OH -2.5 | 47.5 | CLEAR | NEW |
| 401866437 | BUFF | TOL | 2026-10-10 14:30 Sat | ESPN+ | TOL -20.5 | 54.5 | CLEAR | NEW |
| 401866438 | CMU | OHIO | 2026-10-10 14:30 Sat | ESPN+ | OHIO -3 | 46.5 | CLEAR | NEW |
| 401862796 | CLT | UNT | 2026-10-10 14:30 Sat | ESPN+ | UNT -27.5 | 59.5 | CLEAR | NEW |
| 401858255 | DUKE | GT | 2026-10-10 14:30 Sat | ESPN2 | DUKE -7 | 49.5 | CLEAR | NEW |
| 401866435 | EMU | AKR | 2026-10-10 14:30 Sat | ESPN+ | EMU -7 | 50.5 | CLEAR | NEW |
| 401856825 | HOU | KSU | 2026-10-10 14:30 Sat | FOX | KSU -2.5 | 56.5 | CLEAR | NEW |
| 401858480 | ILL | MSU | 2026-10-10 14:30 Sat | FS1 | ILL -2.5 | 49.5 | CLEAR | NEW |
| 401866439 | KENT | WMU | 2026-10-10 14:30 Sat | ESPN+ | WMU -13.5 | 43.5 | CLEAR | NEW |
| 401856718 | MISS | VAN | 2026-10-10 14:30 Sat | ESPN | MISS -10 | 59.5 | CLEAR | NEW |
| 401858257 | STAN | ND | 2026-10-10 14:30 Sat | NBC | ND -37.5 | 53.5 | CLEAR | NEW |
| 401856717 | TEX | OU | 2026-10-10 14:30 Sat | ABC | TEX -8.5 | 39.5 | CLEAR | MOVED |
| 401862799 | TLSA | NAVY | 2026-10-10 14:30 Sat | CBSSN | NAVY -2.5 | 49.5 | CLEAR | NEW |
| 401858484 | UCLA | ORE | 2026-10-10 14:30 Sat | CBS | ORE -11.5 | 59.5 | CLEAR | MOVED |
| 401858259 | VT | CAL | 2026-10-10 14:30 Sat | ACC Network | VT -9.5 | 53.5 | CLEAR | NEW |
| 401861964 | CONN | TEM | 2026-10-10 14:45 Sat | ESPNU | TEM -4.5 | 54.5 | CLEAR | NEW |
| 401862797 | RICE | ECU | 2026-10-10 15:00 Sat | ESPN+ | ECU -10 | 49.5 | CLEAR | NEW |
| 401858483 | MD | OSU | 2026-10-10 15:15 Sat | BTN | OSU -34.5 | 56.5 | CLEAR | NEW |
| 401856713 | TENN | ARK | 2026-10-10 15:15 Sat | SEC Network | TENN -13.5 | 50.5 | CLEAR | NEW |
| 401860902 | SDSU | ORST | 2026-10-10 17:00 Sat | USA Net | ORST -14 | 55.5 | CLEAR | NEW |
| 401869943 | CCU | MRSH | 2026-10-10 18:00 Sat | ESPN+ | MRSH -3 | 57.5 | CLEAR | NEW |
| 401856715 | LSU | UK | 2026-10-10 18:00 Sat | ESPN | LSU -10 | 54.5 | CLEAR | MOVED |
| 401864517 | NEV | UTEP | 2026-10-10 18:00 Sat | FS1 | NEV -9.5 | 49.5 | CLEAR | NEW |
| 401862798 | UAB | MEM | 2026-10-10 18:00 Sat | ESPN2 | MEM -14.5 | 58.5 | CLEAR | NEW |
| 401864516 | AFA | NIU | 2026-10-10 18:30 Sat | CBSSN | AF -10 | 47.5 | CLEAR | NEW |
| 401856712 | UGA | ALA | 2026-10-10 18:30 Sat | ABC | ALA -1.5 | 55.5 | CLEAR | MOVED |
| 401869965 | UL | LT | 2026-10-10 18:30 Sat | ESPN+ | LT -3 | 48.5 | CLEAR | NEW |
| 401858258 | SYR | UVA | 2026-10-10 18:30 Sat | ACC Network | UVA -9.5 | 50.5 | CLEAR | NEW |
| 401858485 | USC | PSU | 2026-10-10 18:30 Sat | NBC | PSU -1.5 | 54.5 | CLEAR | MOVED |
| 401869949 | JMU | GASO | 2026-10-10 18:30 Sat | ESPNU | JMU -8.5 | 53.5 | CLEAR | NEW |
| 401858486 | MINN | PUR | 2026-10-10 19:00 Sat | BTN | MINN -2.5 | 51.5 | CLEAR | NEW |
| 401856808 | HAW | ASU | 2026-10-10 20:30 Sat | FS1 | ASU -20.5 | 51.5 | CLEAR | NEW |
| 401860901 | BOIS | FRES | 2026-10-10 21:30 Sat | CW | BOIS -5.5 | 48.5 | CLEAR | NEW |

## HOLD table

| ESPN ID | Matchup | Kick CT | TV | Vegas | Reasons |
| --- | --- | --- | --- | --- | --- |
| 401858487 | Iowa @ Washington | 2026-10-09 20:00 | — | WASH -2.5 | TV |
| 401856827 | Kansas @ Utah | 2026-10-10 21:15 | ESPN | — | Vegas |

## Day-risk notes

ESPN kick CT governs. HM weekday label may differ:
- **Southern Miss @ Troy** (`401871090`): ESPN **Tue 2026-10-06 19:00 CT** vs HM **Wednesday, Oct 7**
- **Iowa @ Washington** (`401858487`): ESPN **Fri 2026-10-09 20:00 CT** vs HM **Saturday, Oct 10**
- **Washington State @ Utah State** (`401860922`): ESPN **Fri 2026-10-09 20:00 CT** vs HM **Saturday, Oct 10**
- **Wyoming @ San José State** (`401864519`): ESPN **Fri 2026-10-09 20:00 CT** vs HM **Saturday, Oct 10**
- **Iowa State @ BYU** (`401856826`): ESPN **Fri 2026-10-09 21:15 CT** vs HM **Saturday, Oct 10**
- **Boise State @ Fresno State** (`401860901`): ESPN **Sat 2026-10-10 21:30 CT** vs HM **Sunday, Oct 11**

## Conflicts vs live hashmarkcfb.com/schedule?w=6

| ESPN ID | Matchup | Site (live) | Pack (ESPN DK now) | Action |
| --- | --- | --- | --- | --- |
| 401856826 | Iowa State @ BYU | BYU -14.5 / 50.5 · 9:15 CT ESPN | BYU -10.5 / 48.5 | Restamp Vegas (MOVED) |
| 401871090 | Southern Miss @ Troy | TROY -8.5 / 48.5 | TROY -10.5 / 49.5 | Restamp Vegas (MOVED) |
| 401871051 | Jacksonville State @ Kennesaw State | JXST -2.5 / 48.5 | JXST -3 / 50.5 | Restamp Vegas (MOVED) |
| 401858481 | Indiana @ Nebraska | IU -9.5 / 50.5 | IU -7.5 / 52.5 | Restamp Vegas (MOVED) |
| 401858484 | UCLA @ Oregon | ORE -12.5 / 60.5 | ORE -11.5 / 59.5 | Restamp Vegas (MOVED) |
| 401856717 | Texas vs Oklahoma | TEX -9.5 / 41.5 | TEX -8.5 / 39.5 | Restamp Vegas (MOVED) |
| 401856715 | LSU @ Kentucky | LSU -10.5 / 49.5 | LSU -10 / 54.5 | Restamp Vegas (MOVED) |
| 401858485 | USC @ Penn State | PSU -1.5 / 58.5 | PSU -1.5 / 54.5 | Restamp O/U (MOVED) |
| 401856712 | Georgia @ Alabama | UGA -3.0 / 54.5 | ALA -1.5 / 55.5 | Restamp Vegas — favorite flip |
| 401856714 | South Carolina @ Florida | FLA -14.5 / 57.5 · Kick — | FLA -13.5 / 62.5 · 11:45 CT SECN | Stamp kick+TV; restamp Vegas |
| 401856716 | Texas A&M @ Missouri | MIZ -1.5 / 50.5 · Kick — | MIZ -3.5 / 48.5 · 11:00 CT ABC | Stamp kick+TV; restamp Vegas |
| 401858487 | Iowa @ Washington | WASH -1.5 / 41.5 · no TV | WASH -2.5 / 41.5 · TV HOLD | Restamp Vegas when peer OK; leave TV blank |

## Explicit

- Soft-cal FLAG stays / all-D not lifted.
- Featured ISU@BYU already LIVE CLEAR on site (line MOVED on ESPN — restamp).
- Research does not stamp/merge/X.
- Do not invent scores for Southern Miss @ Troy (nightly FINALs).

