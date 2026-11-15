/** Server only: reads data/qb_desk_2026.json and data/stats_2026.json. Imported dynamically from server functions. */
import deskRaw from "../../../data/qb_desk_2026.json" with { type: "json" };
import statsRaw from "../../../data/stats_2026.json" with { type: "json" };
import keysRaw from "../../../data/game_keys_2026.json" with { type: "json" };
import { chicagoDate, gameKey } from "./game-key.ts";
import { buildDesk, type DeskFile, type QbDesk } from "./qb-desk.ts";
import { isQualified, type StatRow } from "./stats.ts";
import { statRows } from "./stats.server.ts";

type TeamInfo = { slug: string; name: string; shortName?: string; conference: string; colorPrimary: string };
const file = deskRaw as unknown as DeskFile;
const rawQb = (statsRaw as unknown as { qb: QbDeskRaw[] }).qb;
type QbDeskRaw = { name: string; slug: string; g: number; att: number; cmp: number; yds: number; td: number; int: number; ruy: number; epa: number | null; tepa: number | null };
const finals = new Set((keysRaw as unknown as { keys: string[] }).keys);
const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/** Same key as scripts/build-qb-desk-data.mjs: name + team slug. */
export const deskKey = (name: string, slug: string) => `${slugify(name)}-${slug}`;
export const DEFAULT_QB = deskKey("Marcel Reed", "texas-am");

/** The desk for one QB key; unknown or unqualified keys fall back to the default QB. */
export function qbDesk(key: string | undefined, teams: TeamInfo[]): QbDesk | null {
  const rows: StatRow[] = statRows("qb", teams);
  const keyOf = (r: StatRow) => deskKey(r.name, r.slug);
  const find = (k: string | undefined) => (k ? rows.find((r) => keyOf(r) === k && isQualified("qb", r)) : undefined);
  const row = find(key) ?? find(DEFAULT_QB);
  if (!row) return null;
  const entry = file.qbs.find((q) => q.key === keyOf(row));
  const raw = rawQb.find((q) => q.slug === row.slug && q.name === row.name);
  if (!entry || !raw) return null;
  const short = new Map(teams.map((t) => [t.slug, t.shortName ?? t.name]));
  return buildDesk({
    file,
    entry,
    row,
    raw,
    rows,
    keyOf,
    teamShort: (slug, name) => (slug ? (short.get(slug) ?? name) : name),
    gameKeyOf: (g, slug) => {
      if (!g.opp) return null;
      const k = g.home ? gameKey(chicagoDate(g.date), g.opp, slug) : gameKey(chicagoDate(g.date), slug, g.opp);
      return finals.has(k) ? k : null;
    },
  });
}
