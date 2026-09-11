/**
 * Ship / CI gate: do not merge Vegas-only FBS–FCS schedule rows for week N
 * while that week's FBS–FBS games still lack kick / Vegas stamps.
 *
 * Wrong stamp is worse than late — this gate prefers blocking ship (and
 * blocking "ready to Re-Publish") over shipping half a slate. Week 2 shipped
 * FCS Vegas-only first; sort-by-kick then buried the real card under 39 FCS
 * rows with Kick — / Vegas —.
 *
 * General week-N rule: any `data/week{N}_fbs_fcs*.json` or vegas-only FCS
 * stubs on the board require a complete `data/week{N}_fbs_fbs_kick_tv_vegas*.json`
 * Research pack plus SQL `kickoff_at` / `vegas_spread` updates for that week.
 * Do not invent kick/Vegas here — only verify what Research already stamped.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fcsScheduleGamesForWeek } from "./fcs-stubs.ts";

export const HASHMARK_STAMP_WEEKS = { min: 0, max: 13 } as const;

/**
 * FBS–FBS `espn_event_id`s Research explicitly left with blank Vegas.
 * Empty until a pack documents a blank close — the gate requires non-null
 * `vegas_spread` otherwise (do not invent a number to pass).
 */
export const BLANK_VEGAS_ALLOWLIST: Readonly<Record<number, readonly string[]>> = {
  // 2: ["4018…"]  // example: only if the Week 2 pack names a blank book
};

export type FbsFbsStampRow = {
  espnEventId: string;
  label: string;
  kickCt: string | null;
  vegasSpread: number | null;
  tv?: string | null;
};

export type StampGapKind =
  | "missing_pack"
  | "missing_kick"
  | "missing_vegas"
  | "sql_unstamped"
  | "sql_missing_kick"
  | "sql_missing_vegas"
  | "count_mismatch";

export type StampGap = {
  week: number;
  kind: StampGapKind;
  game?: string;
  detail: string;
};

export type GateVerdict = {
  ok: boolean;
  weeksChecked: number[];
  gaps: StampGap[];
};

const FCS_JSON = /^week(\d+)_fbs_fcs.*\.json$/i;
const FBS_PACK_JSON = /^week(\d+)_fbs_fbs_kick_tv_vegas.*\.json$/i;

function isBlankKick(kickCt: string | null | undefined): boolean {
  return kickCt == null || String(kickCt).trim() === "";
}

function gap(week: number, kind: StampGapKind, detail: string, game?: string): StampGap {
  return game ? { week, kind, game, detail } : { week, kind, detail };
}

function allowlisted(week: number, espnEventId: string, extra?: readonly string[]): boolean {
  const ids = new Set([...(BLANK_VEGAS_ALLOWLIST[week] ?? []), ...(extra ?? [])]);
  return ids.has(espnEventId);
}

/**
 * Pure checker used by tests and the repo audit.
 * `fcsCount === 0` → no-op (weeks without FCS on the board may still lack kicks).
 */
export function evaluateFcsFbsStampGate(input: {
  week: number;
  fcsCount: number;
  fbsGames: FbsFbsStampRow[];
  sqlByEspn?: Map<string, { hasKick: boolean; hasVegas: boolean }>;
  seedFbsCount?: number;
  blankVegasAllowlist?: readonly string[];
}): StampGap[] {
  const { week, fcsCount, fbsGames } = input;
  if (fcsCount <= 0) return [];

  const gaps: StampGap[] = [];
  if (fbsGames.length === 0) {
    gaps.push(
      gap(
        week,
        "missing_pack",
        `Week ${week} has ${fcsCount} FBS–FCS (Vegas-only) row(s) but no FBS–FBS kick/Vegas Research pack. Wrong stamp is worse than late — block ship.`,
      ),
    );
    return gaps;
  }

  if (input.seedFbsCount != null && input.seedFbsCount !== fbsGames.length) {
    gaps.push(
      gap(
        week,
        "count_mismatch",
        `Week ${week} seed has ${input.seedFbsCount} FBS–FBS games; Research pack has ${fbsGames.length}. Incomplete stamps bury the slate under FCS.`,
      ),
    );
  }

  const sql = input.sqlByEspn;
  if (sql && sql.size > 0 && sql.size !== fbsGames.length) {
    gaps.push(
      gap(
        week,
        "count_mismatch",
        `Week ${week} SQL stamps ${sql.size} FBS–FBS games; Research pack has ${fbsGames.length}.`,
      ),
    );
  }

  for (const g of fbsGames) {
    const label = g.label || g.espnEventId || "(unnamed FBS–FBS)";
    if (isBlankKick(g.kickCt)) {
      gaps.push(
        gap(
          week,
          "missing_kick",
          `Week ${week} ${label} has no kick CT — FCS would sort above untimed FBS–FBS.`,
          label,
        ),
      );
    }
    if (g.vegasSpread == null && !allowlisted(week, g.espnEventId, input.blankVegasAllowlist)) {
      gaps.push(
        gap(
          week,
          "missing_vegas",
          `Week ${week} ${label} has blank Vegas (not on the Research allowlist).`,
          label,
        ),
      );
    }
    if (!sql) continue;
    const stamped = g.espnEventId ? sql.get(g.espnEventId) : undefined;
    if (!stamped) {
      gaps.push(
        gap(
          week,
          "sql_unstamped",
          `Week ${week} ${label} (${g.espnEventId}) is in the pack but no SQL update stamps kickoff_at/vegas_spread. Board reads the DB, not the JSON pack.`,
          label,
        ),
      );
      continue;
    }
    if (!stamped.hasKick) {
      gaps.push(
        gap(week, "sql_missing_kick", `Week ${week} ${label} SQL update has no kickoff_at.`, label),
      );
    }
    if (!stamped.hasVegas) {
      gaps.push(
        gap(week, "sql_missing_vegas", `Week ${week} ${label} SQL update has no vegas_spread.`, label),
      );
    }
  }

  return gaps;
}

export function formatStampGaps(gaps: StampGap[]): string {
  if (gaps.length === 0) return "";
  return gaps.map((g) => `[${g.kind}] ${g.detail}`).join("\n");
}

type FcsFile = {
  meta?: { week?: number; n_fbs_fcs?: number };
  games?: Array<{ espn_event_id?: string; hx_spread_policy?: string }>;
};

type FbsPackFile = {
  meta?: { week?: number; n_games?: number; n_blank_vegas?: number };
  games?: Array<{
    espn_event_id?: string;
    kick_ct?: string | null;
    vegas_spread?: number | null;
    tv?: string | null;
    home_location?: string;
    away_location?: string;
    home?: string;
    away?: string;
  }>;
};

function dataFiles(root: string, re: RegExp): Array<{ week: number; path: string }> {
  const dir = join(root, "data");
  if (!existsSync(dir)) return [];
  const out: Array<{ week: number; path: string }> = [];
  for (const name of readdirSync(dir)) {
    const m = name.match(re);
    if (!m) continue;
    out.push({ week: Number(m[1]), path: join(dir, name) });
  }
  return out;
}

export function fcsJsonGameCount(raw: FcsFile): number {
  if (Array.isArray(raw.games) && raw.games.length > 0) return raw.games.length;
  if (typeof raw.meta?.n_fbs_fcs === "number") return raw.meta.n_fbs_fcs;
  return 0;
}

export function packRowsFromJson(raw: FbsPackFile): FbsFbsStampRow[] {
  const games = raw.games ?? [];
  return games.map((g) => {
    const away = g.away_location ?? g.away ?? "?";
    const home = g.home_location ?? g.home ?? "?";
    return {
      espnEventId: String(g.espn_event_id ?? ""),
      label: `${away} @ ${home}`,
      kickCt: g.kick_ct ?? null,
      vegasSpread: g.vegas_spread ?? null,
      tv: g.tv ?? null,
    };
  });
}

/** Comment-headed `update games` blocks that set stamps for `g.week = N`. */
export function parseSqlStampsForWeek(
  sqlCorpus: string,
  week: number,
): Map<string, { hasKick: boolean; hasVegas: boolean }> {
  const map = new Map<string, { hasKick: boolean; hasVegas: boolean }>();
  const re = /(?:^--[^\n]*\n)+update games[\s\S]*?g\.week = (\d+);/gm;
  for (const m of sqlCorpus.matchAll(re)) {
    if (Number(m[1]) !== week) continue;
    const block = m[0];
    const espn =
      block.match(/ESPN (\d{6,})/)?.[1] ??
      block.match(/\b(401\d{6,})\b/)?.[1];
    if (!espn) continue;
    map.set(espn, {
      hasKick: /kickoff_at\s*=\s*timestamptz/.test(block),
      hasVegas: /vegas_spread\s*=/.test(block),
    });
  }
  return map;
}

export function readMigrationsSql(root: string): string {
  const dir = join(root, "migrations");
  if (!existsSync(dir)) return "";
  return readdirSync(dir)
    .filter((name) => name.endsWith(".sql"))
    .sort()
    .map((name) => readFileSync(join(dir, name), "utf8"))
    .join("\n\n");
}

export function countSeedFbsGamesForWeek(seedSql: string, week: number): number | null {
  const chunk = seedSql.split(/insert into games\b/i)[1];
  if (!chunk) return null;
  const body = chunk.split(/insert into\b/i)[0] ?? chunk;
  const re = new RegExp(`^\\s+\\(${week}, '`, "gm");
  return [...body.matchAll(re)].length;
}

export function weeksWithFcsJson(root: string): Map<number, number> {
  const counts = new Map<number, number>();
  for (const file of dataFiles(root, FCS_JSON)) {
    const raw = JSON.parse(readFileSync(file.path, "utf8")) as FcsFile;
    const n = fcsJsonGameCount(raw);
    if (n <= 0) continue;
    counts.set(file.week, (counts.get(file.week) ?? 0) + n);
  }
  return counts;
}

export function loadFbsPack(root: string, week: number): FbsFbsStampRow[] {
  const rows: FbsFbsStampRow[] = [];
  const seen = new Set<string>();
  for (const file of dataFiles(root, FBS_PACK_JSON).filter((f) => f.week === week)) {
    const raw = JSON.parse(readFileSync(file.path, "utf8")) as FbsPackFile;
    for (const row of packRowsFromJson(raw)) {
      const key = row.espnEventId || row.label;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push(row);
    }
  }
  return rows;
}

export type AuditOptions = {
  /** Merge weeks that already have vegas-only FCS stubs in `fcs-stubs.ts`. Default true. */
  includeCodePath?: boolean;
};

/**
 * Audit a workspace tree. Fixture tests pass a temp root with `includeCodePath: false`
 * so Week 2 production stubs do not leak into the fake week.
 */
export function auditStampShipGate(root: string, opts: AuditOptions = {}): GateVerdict {
  const includeCodePath = opts.includeCodePath !== false;
  const fcsFromJson = weeksWithFcsJson(root);
  const weeks = new Set<number>(fcsFromJson.keys());

  if (includeCodePath) {
    for (let w = HASHMARK_STAMP_WEEKS.min; w <= HASHMARK_STAMP_WEEKS.max; w++) {
      if (fcsScheduleGamesForWeek(w).length > 0) weeks.add(w);
    }
  }

  const sqlCorpus = readMigrationsSql(root);
  const seedPath = join(root, "migrations/0003_seed.sql");
  const seedSql = existsSync(seedPath) ? readFileSync(seedPath, "utf8") : "";

  const gaps: StampGap[] = [];
  const weeksChecked = [...weeks].sort((a, b) => a - b);

  for (const week of weeksChecked) {
    const fcsCount = Math.max(
      fcsFromJson.get(week) ?? 0,
      includeCodePath ? fcsScheduleGamesForWeek(week).length : 0,
    );
    const fbsGames = loadFbsPack(root, week);
    const sqlByEspn = parseSqlStampsForWeek(sqlCorpus, week);
    const seedFbsCount = seedSql ? countSeedFbsGamesForWeek(seedSql, week) : undefined;
    gaps.push(
      ...evaluateFcsFbsStampGate({
        week,
        fcsCount,
        fbsGames,
        sqlByEspn: fbsGames.length > 0 || (sqlByEspn.size > 0) ? sqlByEspn : undefined,
        seedFbsCount: seedFbsCount ?? undefined,
      }),
    );
  }

  return { ok: gaps.length === 0, weeksChecked, gaps };
}
