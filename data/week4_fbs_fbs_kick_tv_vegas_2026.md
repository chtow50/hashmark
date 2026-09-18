# Week 4 2026 FBS–FBS kick / TV / Vegas — HASHMARK stamp pack

- **Verified**: Research CLEAR 2026-09-17 10:34 CT
- **Scope**: FBS–FBS only · Week 4 (Thu Sep 24 – Sat Sep 26 2026 CT)
- **Counts**: **57 kicks** · **50 TVs** · **14 Vegas** · **11 CLEAR** · **46 HOLD**
- **JSON**: `data/week4_fbs_fbs_kick_tv_vegas_2026.json`
- **SQL**: `migrations/0031_week4_kick_tv_vegas.sql`
- **Policy**: Do not invent kick / TV / Vegas. Stamp by home/away slug + `week = 4`. HOLD fields stay null. No ESPN event IDs. Pack has no stable `hashmark_id`s.

## Featured (Website card)

**Liberty @ Coastal Carolina** (`coastal-carolina` / `liberty`)
- Kick: **Thu 2026-09-24 18:30 CT**
- TV: **ESPN**
- Vegas: **—** — **HOLD** (DraftKings not posted on ESPN at verify). Stamp kick/TV; leave Vegas blank.
- Site: Brooks Stadium (SC) — Liberty @ Coastal Carolina, not neutral

Alt card if needed: **Texas A&M @ LSU** · Sat 2026-09-26 18:30 CT · ABC · **LSU -5.5**.

## CLEAR (kick + TV + Vegas)

| Kick CT | Matchup | TV | Vegas |
| --- | --- | --- | --- |
| Sat 11:00 | Texas @ Tennessee | ABC | TEX -4.5 |
| Sat 12:30 | UCLA @ Maryland | BTN | UCLA -1.5 |
| Sat 14:30 | Iowa @ Michigan | CBS | MICH -4.5 |
| Sat 15:15 | Vanderbilt @ Auburn | SEC Network | AUB -8.5 |
| Sat 16:00 | Wisconsin @ Penn State | Peacock | PSU -11.5 |
| Sat 16:00 | Nebraska @ Michigan State | BTN | NEB -5.5 |
| Sat 18:00 | South Carolina @ Alabama | ESPN | ALA -11.5 |
| Sat 18:00 | Oklahoma State @ West Virginia | FS1 | OKST -2.5 |
| Sat 18:30 | Texas A&M @ LSU | ABC | LSU -5.5 |
| Sat 18:30 | Oregon @ USC | NBC | USC -2.5 |
| Sat 18:45 | Missouri @ Mississippi State | SEC Network | MSST -1.5 |

## TV HOLDs (kick stamped; TV stays blank)

Boise State @ Western Michigan · Houston @ Georgia Southern · Colorado @ Baylor · Virginia Tech @ Boston College · Wake Forest @ Louisville · Oklahoma @ Georgia · Ole Miss @ Florida.

Vegas still stamped when sourced: Boise State @ WMU **BOIS -7.5**, Oklahoma @ Georgia **UGA -13.5**, Ole Miss @ Florida **FLA -1.5**.

## ESPN CT day risks (kickoff_date from kick_iso, not stale HM dates)

| Matchup | ESPN CT | HM date |
| --- | --- | --- |
| Northwestern @ Indiana | Fri 19:00 Sep 25 | Sat Sep 26 |
| Clemson @ California | Fri 21:30 Sep 25 | Sat Sep 26 |
| Boise State @ Western Michigan | Fri 23:00 Sep 25 | Sat Sep 26 |
| Houston @ Georgia Southern | Fri 23:00 Sep 25 | Sat Sep 26 |
| Tulsa @ Arkansas | Sat 19:00 Sep 26 | Sun Sep 27 |
| Oregon State @ UTEP | Sat 20:00 Sep 26 | Sun Sep 27 |
| Rice @ Fresno State | Sat 21:00 Sep 26 | Sun Sep 27 |
| Georgia Tech @ Stanford | Sat 21:30 Sep 26 | Sun Sep 27 |

## Convention

Pack `vegas_spread` is home-relative (negative = home favored). SQL stores the Week 2 / board convention (positive = home favored). Neutral sites: none on this slate.
