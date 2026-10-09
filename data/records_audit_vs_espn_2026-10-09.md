# HASHMARK vs ESPN overall records audit (Fri 2026-10-09)

As of games **through Thu Oct 8, 2026** (Friday+ ignored as timing-only). Site: cache-busted `/rankings`. ESPN: standings group=80 + schedules for gap teams. Repo `b3583f7`. Read-only — no stamp.

## Counts

| | Teams |
|---|---|
| Match **now** (live site) | **72** / 136 |
| Mismatch now | 64 |
| Match **after Week 1 FCS backfill** (32 stubs) | **102** / 136 |
| Still mismatch after backfill | **34** |
| Remaining gap games | **36** (36 CLEAR / 0 HOLD) |

Week 1 backfill alone fixes 30 teams (72→102).

## Remaining gaps (after Week 1 backfill)

All are **FCS** finals missing from `fcs-stubs.ts` (not games-table FBS rows).

| Team | Site after W1 BF | ESPN | Missing game | Week | ESPN id | Home? | 2nd source | Verdict |
|---|---|---|---|---|---|---|---|---|
| eastern-michigan | 1–3 | 3–3 | Sacramento State · EMU 28–SAC 17 · W · 2026-08-29 | 0 | 401866408 | home | athletics | **CLEAR** |
| jacksonville-state ★ | 4–1 | 4–2 | North Dakota State · NDSU 33–JXST 7 · L · 2026-08-29 | 0 | 401864577 | **away** | athletics | **CLEAR** |
| boise-state | 3–1 | 4–1 | South Dakota · BOIS 38–SDAK 24 · W · 2026-09-19 | 3 | 401860885 | home | CBS | **CLEAR** |
| boston-college | 1–3 | 2–3 | Maine · BC 22–ME 16 · W · 2026-09-19 | 3 | 401858227 | home | CBS | **CLEAR** |
| california | 1–3 | 2–3 | Wagner · CAL 49–WAG 7 · W · 2026-09-19 | 3 | 401858233 | home | CBS | **CLEAR** |
| georgia-tech | 0–3 | 1–3 | Mercer · GT 44–MER 11 · W · 2026-09-19 | 3 | 401858228 | home | CBS | **CLEAR** |
| illinois | 1–3 | 2–3 | Southern Illinois · ILL 48–SIU 10 · W · 2026-09-19 | 3 | 401858448 | home | CBS | **CLEAR** |
| massachusetts | 2–1 | 4–1 | Stonehill · MASS 36–STO 14 · W · 2026-09-19 | 3 | 401866424 | home | CBS | **CLEAR** |
| memphis | 3–1 | 4–1 | UT Martin · MEM 45–UTM 21 · W · 2026-09-19 | 3 | 401862772 | home | CBS | **CLEAR** |
| nebraska | 4–0 | 5–0 | North Dakota · NEB 34–UND 7 · W · 2026-09-19 | 3 | 401858452 | home | CBS | **CLEAR** |
| oklahoma-state | 2–1 | 3–1 | Murray State · OKST 59–MUR 0 · W · 2026-09-19 | 3 | 401856803 | home | CBS | **CLEAR** |
| oregon-state | 2–2 | 3–2 | Montana · ORST 52–MONT 17 · W · 2026-09-19 | 3 | 401860886 | home | CBS | **CLEAR** |
| sam-houston | 0–4 | 1–4 | Nicholls · SHSU 59–NICH 0 · W · 2026-09-19 | 3 | 401870764 | home | CBS | **CLEAR** |
| tulsa | 2–2 | 3–2 | East Texas A&M · TLSA 42–ETAM 0 · W · 2026-09-19 | 3 | 401862775 | home | CBS | **CLEAR** |
| ul-monroe | 0–4 | 0–5 | SE Louisiana · ULM 35–SELA 38 · L · 2026-09-19 | 3 | 401868317 | home | CBS | **CLEAR** |
| usf | 3–2 | 4–2 | Delaware State · USF 59–DSU 17 · W · 2026-09-19 | 3 | 401862777 | home | CBS | **CLEAR** |
| washington | 2–2 | 3–2 | Eastern Washington · WASH 48–EWU 16 · W · 2026-09-19 | 3 | 401858459 | home | CBS | **CLEAR** |
| washington-state | 0–4 | 1–4 | Duquesne · WSU 48–DUQ 7 · W · 2026-09-19 | 3 | 401860890 | home | CBS | **CLEAR** |
| rutgers | 0–4 | 1–4 | Howard · RUTG 58–HOW 7 · W · 2026-09-25 | 4 | 401858468 | home | CBS | **CLEAR** |
| buffalo ★ | 1–3 | 2–3 | Robert Morris · BUFF 31–RMU 28 · W · 2026-09-26 | 4 | 401866426 | home | CBS | **CLEAR** |
| duke | 3–0 | 4–0 | William & Mary · DUKE 62–W&M 7 · W · 2026-09-26 | 4 | 401858244 | home | CBS | **CLEAR** |
| east-carolina | 1–2 | 2–2 | NC Central · ECU 42–NCCU 9 · W · 2026-09-26 | 4 | 401862781 | home | CBS | **CLEAR** |
| eastern-michigan | 1–3 | 3–3 | Lindenwood · EMU 29–LIN 3 · W · 2026-09-26 | 4 | 401866427 | home | CBS | **CLEAR** |
| fiu | 2–2 | 3–2 | LIU · FIU 20–LIU 3 · W · 2026-09-26 | 4 | 401867909 | home | CBS | **CLEAR** |
| florida-state | 2–2 | 3–2 | Central Arkansas · FSU 34–CARK 7 · W · 2026-09-26 | 4 | 401858237 | home | CBS | **CLEAR** |
| marshall | 2–2 | 3–2 | Gardner-Webb · MRSH 36–GWEB 35 · W · 2026-09-26 | 4 | 401868188 | home | CBS | **CLEAR** |
| massachusetts | 2–1 | 4–1 | Sacramento State · SAC 6–MASS 35 · W · 2026-09-26 | 4 | 401866429 | **away** | CBS | **CLEAR** |
| north-texas | 2–2 | 3–2 | Houston Christian · UNT 63–HCU 14 · W · 2026-09-26 | 4 | 401862783 | home | CBS | **CLEAR** |
| ohio | 2–2 | 3–2 | Stonehill · OHIO 35–STO 7 · W · 2026-09-26 | 4 | 401866428 | home | CBS | **CLEAR** |
| pittsburgh | 4–0 | 5–0 | Bucknell · PITT 59–BUCK 0 · W · 2026-09-26 | 4 | 401858236 | home | CBS | **CLEAR** |
| texas-state | 1–3 | 2–3 | Incarnate Word · TXST 63–UIW 10 · W · 2026-09-26 | 4 | 401860892 | home | CBS | **CLEAR** |
| western-kentucky | 1–4 | 2–4 | Mercyhurst · WKU 52–MERC 7 · W · 2026-09-26 | 4 | 401870745 | home | CBS | **CLEAR** |
| florida-atlantic | 3–1 | 4–1 | Texas Southern · FAU 66–TXSO 10 · W · 2026-10-03 | 5 | 401862790 | home | CBS | **CLEAR** |
| lsu | 3–1 | 4–1 | McNeese · LSU 63–MCN 14 · W · 2026-10-03 | 5 | 401856706 | home | CBS | **CLEAR** |
| uab | 2–2 | 3–2 | Samford · UAB 33–SAM 14 · W · 2026-10-03 | 5 | 401862793 | home | CBS | **CLEAR** |
| wyoming | 2–2 | 2–3 | North Dakota State · NDSU 28–WYO 0 · L · 2026-10-03 | 5 | 401864515 | **away** | CBS | **CLEAR** |

★ = already-known priors (Buffalo Week 4 RMU; Jax State Week 0 @ NDSU).

### Known priors (confirmed again)

- **buffalo**: Robert Morris 28 @ Buffalo 31, 2026-09-26, ESPN `401866426`, CLEAR (CBS).
- **jacksonville-state**: Jax State 7 @ NDSU 33, 2026-08-29, ESPN `401864577`, CLEAR (gobison.com Win 33–7 + jaxstatesports L 7–33).

## Repo structure note (`fcs-stubs.ts` @ b3583f7)

| Slot | Status | Action for these gaps |
|---|---|---|
| `WEEK1_FCS_STUBS` | exists | Covered by separate 32-stub CLEAR pack |
| `WEEK2` JSON | exists, already FINAL | UMass–SHU / Wyoming–UNCO already count — not in remaining gaps |
| `WEEK3_FCS_STUBS` | exists (Iowa, Oregon) | **Append** 16 Week 3 home finals |
| `WEEK0_FCS_STUBS` | **missing** | **Create** for EMU–Sac State (home W) + Jax State @ NDSU (away L) |
| `WEEK4_FCS_STUBS` | **missing** | **Create** (or Week 4 JSON) for 14 Week 4 finals |
| `WEEK5_FCS_STUBS` | **missing** | **Create** for FAU/LSU/UAB home W + Wyoming @ NDSU away L |
| `finalHome` | exists | Use for all FBS-home gaps |
| `finalAway` | **missing** | **Add helper** for 3 road FCS: Jax State @ NDSU, UMass @ Sac State, Wyoming @ NDSU |
| `games` table | FBS–FBS only | Do **not** insert FCS into `games` for W–L |

Suggested stub calls (scores verified; Website stamps later):

```ts
finalHome("eastern-michigan", 0, "2026-08-29", "Sacramento State", 28, 17),
finalAway("jacksonville-state", 0, "2026-08-29", "North Dakota State", 33, 7)  // venue home=NDSU 33, FBS away=JXST 7,
finalHome("boise-state", 3, "2026-09-19", "South Dakota", 38, 24),
finalHome("boston-college", 3, "2026-09-19", "Maine", 22, 16),
finalHome("california", 3, "2026-09-19", "Wagner", 49, 7),
finalHome("georgia-tech", 3, "2026-09-19", "Mercer", 44, 11),
finalHome("illinois", 3, "2026-09-19", "Southern Illinois", 48, 10),
finalHome("massachusetts", 3, "2026-09-19", "Stonehill", 36, 14),
finalHome("memphis", 3, "2026-09-19", "UT Martin", 45, 21),
finalHome("nebraska", 3, "2026-09-19", "North Dakota", 34, 7),
finalHome("oklahoma-state", 3, "2026-09-19", "Murray State", 59, 0),
finalHome("oregon-state", 3, "2026-09-19", "Montana", 52, 17),
finalHome("sam-houston", 3, "2026-09-19", "Nicholls", 59, 0),
finalHome("tulsa", 3, "2026-09-19", "East Texas A&M", 42, 0),
finalHome("ul-monroe", 3, "2026-09-19", "SE Louisiana", 35, 38),
finalHome("usf", 3, "2026-09-19", "Delaware State", 59, 17),
finalHome("washington", 3, "2026-09-19", "Eastern Washington", 48, 16),
finalHome("washington-state", 3, "2026-09-19", "Duquesne", 48, 7),
finalHome("buffalo", 4, "2026-09-26", "Robert Morris", 31, 28),
finalHome("duke", 4, "2026-09-26", "William & Mary", 62, 7),
finalHome("east-carolina", 4, "2026-09-26", "NC Central", 42, 9),
finalHome("eastern-michigan", 4, "2026-09-26", "Lindenwood", 29, 3),
finalHome("fiu", 4, "2026-09-26", "LIU", 20, 3),
finalHome("florida-state", 4, "2026-09-26", "Central Arkansas", 34, 7),
finalHome("marshall", 4, "2026-09-26", "Gardner-Webb", 36, 35),
finalAway("massachusetts", 4, "2026-09-26", "Sacramento State", 6, 35)  // venue home=SAC 6, FBS away=MASS 35,
finalHome("north-texas", 4, "2026-09-26", "Houston Christian", 63, 14),
finalHome("ohio", 4, "2026-09-26", "Stonehill", 35, 7),
finalHome("pittsburgh", 4, "2026-09-26", "Bucknell", 59, 0),
finalHome("rutgers", 4, "2026-09-25", "Howard", 58, 7),
finalHome("texas-state", 4, "2026-09-26", "Incarnate Word", 63, 10),
finalHome("western-kentucky", 4, "2026-09-26", "Mercyhurst", 52, 7),
finalHome("florida-atlantic", 5, "2026-10-03", "Texas Southern", 66, 10),
finalHome("lsu", 5, "2026-10-03", "McNeese", 63, 14),
finalHome("uab", 5, "2026-10-03", "Samford", 33, 14),
finalAway("wyoming", 5, "2026-10-03", "North Dakota State", 28, 0)  // venue home=NDSU 28, FBS away=WYO 0,
```

## Texas Tech Week 1 FCS stub correction

**CLEAR** — data wrong, record unchanged (still a W; site 5–0 = ESPN 5–0).

| | |
|---|---|
| Current stub | `finalHome("texas-tech", 1, "2026-09-05", "Nicholls", 33, 3)` |
| **Corrected call** | `finalHome("texas-tech", 1, "2026-09-05", "Abilene Christian", 33, 10)` |
| ESPN id | `401856770` |
| Final | Texas Tech 33, Abilene Christian 10 (home; no OT) · lines 14-3-9-7 / 0-3-0-7 |
| Kick | 2026-09-05 18:00 CT |
| Sources | ESPN summary STATUS_FINAL; CBS Week 1 (Abil Christian 10 @ Texas Tech 33) |
| Note | Nicholls played **Kansas State** 3–71 (`401856771`), already correctly stubbed. |

## change_spec (Website stamp recipe)

### `finalAway` helper (Website must add)

```ts
function finalAway(
  teamSlug: string,
  week: number,
  kickoffDate: string,
  opponentLabel: string,
  teamScore: number,
  oppScore: number,
): FcsStubGame
```

Mirrors `finalHome` arity. Sets `home: false`, `status: "final"`, `awayScore = teamScore`, `homeScore = oppScore` (venue home is the FCS opponent).

### Double-count check

- **Week 2 JSON:** 0 overlap with the 36 gap ESPN ids.
- **`games` table:** FCS are not part of the production 136-team W–L path (stubs only). Live hubs do not show these 36 as `status=final` games rows. Safe to stamp stubs once.

### WEEK0_FCS_STUBS (NEW)

```ts
finalHome("eastern-michigan", 0, "2026-08-29", "Sacramento State", 28, 17),
finalAway("jacksonville-state", 0, "2026-08-29", "North Dakota State", 7, 33),
```

### WEEK1_FCS_STUBS (TTU replace)

```ts
// REPLACE
finalHome("texas-tech", 1, "2026-09-05", "Nicholls", 33, 3),
// WITH
finalHome("texas-tech", 1, "2026-09-05", "Abilene Christian", 33, 10),
```

### WEEK3_FCS_STUBS (append)

```ts
finalHome("boise-state", 3, "2026-09-19", "South Dakota", 38, 24),
finalHome("boston-college", 3, "2026-09-19", "Maine", 22, 16),
finalHome("california", 3, "2026-09-19", "Wagner", 49, 7),
finalHome("georgia-tech", 3, "2026-09-19", "Mercer", 44, 11),
finalHome("illinois", 3, "2026-09-19", "Southern Illinois", 48, 10),
finalHome("massachusetts", 3, "2026-09-19", "Stonehill", 36, 14),
finalHome("memphis", 3, "2026-09-19", "UT Martin", 45, 21),
finalHome("nebraska", 3, "2026-09-19", "North Dakota", 34, 7),
finalHome("oklahoma-state", 3, "2026-09-19", "Murray State", 59, 0),
finalHome("oregon-state", 3, "2026-09-19", "Montana", 52, 17),
finalHome("sam-houston", 3, "2026-09-19", "Nicholls", 59, 0),
finalHome("tulsa", 3, "2026-09-19", "East Texas A&M", 42, 0),
finalHome("ul-monroe", 3, "2026-09-19", "SE Louisiana", 35, 38),
finalHome("usf", 3, "2026-09-19", "Delaware State", 59, 17),
finalHome("washington", 3, "2026-09-19", "Eastern Washington", 48, 16),
finalHome("washington-state", 3, "2026-09-19", "Duquesne", 48, 7),
```

### WEEK4_FCS_STUBS (NEW)

```ts
finalHome("buffalo", 4, "2026-09-26", "Robert Morris", 31, 28),
finalHome("duke", 4, "2026-09-26", "William & Mary", 62, 7),
finalHome("east-carolina", 4, "2026-09-26", "NC Central", 42, 9),
finalHome("eastern-michigan", 4, "2026-09-26", "Lindenwood", 29, 3),
finalHome("fiu", 4, "2026-09-26", "LIU", 20, 3),
finalHome("florida-state", 4, "2026-09-26", "Central Arkansas", 34, 7),
finalHome("marshall", 4, "2026-09-26", "Gardner-Webb", 36, 35),
finalAway("massachusetts", 4, "2026-09-26", "Sacramento State", 35, 6),
finalHome("north-texas", 4, "2026-09-26", "Houston Christian", 63, 14),
finalHome("ohio", 4, "2026-09-26", "Stonehill", 35, 7),
finalHome("pittsburgh", 4, "2026-09-26", "Bucknell", 59, 0),
finalHome("rutgers", 4, "2026-09-25", "Howard", 58, 7),
finalHome("texas-state", 4, "2026-09-26", "Incarnate Word", 63, 10),
finalHome("western-kentucky", 4, "2026-09-26", "Mercyhurst", 52, 7),
```

### WEEK5_FCS_STUBS (NEW)

```ts
finalHome("florida-atlantic", 5, "2026-10-03", "Texas Southern", 66, 10),
finalHome("lsu", 5, "2026-10-03", "McNeese", 63, 14),
finalHome("uab", 5, "2026-10-03", "Samford", 33, 14),
finalAway("wyoming", 5, "2026-10-03", "North Dakota State", 0, 28),
```

Call totals: WEEK0 2, WEEK1 fix 1, WEEK3 16, WEEK4 14, WEEK5 4 (plus the separate 32 Week 1 scheduled→finalHome pack).

## Records after all fixes

**136 / 136** match ESPN overall (through Oct 8) after Week 1 32-stub pack + 36 gap stamps + TTU correction.

**Exceptions: none.**

## Handoff
After Week 1 32-stub stamp, 34 teams / 36 FCS finals still diverge from ESPN. All 36 CLEAR with ESPN+CBS/athletics. Needs Week 0/3/4/5 FCS stub backfill + finalAway for 3 road games. Also: TTU Week1 opponent fix; add finalAway; WEEK0/4/5 arrays.

No self-stamp. Never invent scores.
