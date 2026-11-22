import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { STAT_TABS } from "./stats";
import { buildLeaders, DEFAULT_LEADER_SORT, LEADER_SORTS } from "./qb-leaders";

/** One /stats tab: rows joined to team name, conference, and color. Data file stays server-side. */
export const getStatsTab = createServerFn({ method: "GET" })
  .validator(z.object({ tab: z.enum(STAT_TABS) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const teams = await sql.query<{ slug: string; name: string; conference: string; colorPrimary: string }>(
      `select slug, name, conference, color_primary as "colorPrimary" from teams`,
    );
    const { statRows, statsMeta } = await import("./stats.server");
    return { meta: statsMeta(), rows: statRows(data.tab, teams) };
  });

/** Team-page advanced block (CFBD metrics with FBS rank), or null when the team has no row. */
export const getTeamAdvanced = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { teamAdvanced } = await import("./stats.server");
    return teamAdvanced(data.slug);
  });

/** Matchup unit-vs-unit edges from the committed stats file, or null when a team has no row. */
export const getMatchupEdges = createServerFn({ method: "GET" })
  .validator(z.object({ home: z.string().min(1), away: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { matchupEdges } = await import("./stats.server");
    return matchupEdges(data.home, data.away);
  });

/** HASHMARK QB Desk for one QB (key = name + team slug); unknown keys fall back to the default QB. */
export const getQbDesk = createServerFn({ method: "GET" })
  .validator(z.object({ qb: z.string().max(120).optional() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const teams = await sql.query<{ slug: string; name: string; shortName: string; conference: string; colorPrimary: string }>(
      `select slug, name, short_name as "shortName", conference, color_primary as "colorPrimary" from teams`,
    );
    const { qbDesk } = await import("./qb-desk.server");
    return qbDesk(data.qb, teams);
  });

/**
 * QB stat leaderboard: qualified QBs sorted by one real stat, FBS ranks on every column, plus team record and
 * HX rank as context. `limit` trims the list (the board's compact module asks for 5).
 */
export const getQbLeaders = createServerFn({ method: "GET" })
  .validator(z.object({ sort: z.enum(LEADER_SORTS).optional(), limit: z.number().int().min(1).max(250).optional() }))
  .handler(async ({ data }) => {
    const { listTeams } = await import("./queries");
    const teams = await listTeams();
    const { statRows, statsMeta } = await import("./stats.server");
    const { deskKey } = await import("./qb-desk.server");
    const board = buildLeaders({
      rows: statRows("qb", teams),
      sort: data.sort ?? DEFAULT_LEADER_SORT,
      keyOf: (r) => deskKey(r.name, r.slug),
      teams: teams.map((t) => ({ slug: t.slug, w: t.seasonWins, l: t.seasonLosses, hxRank: t.hxRank ?? null })),
    });
    const meta = statsMeta();
    return { asOf: meta.as_of, advancedThrough: meta.advanced_through, n: board.n, rows: data.limit ? board.rows.slice(0, data.limit) : board.rows };
  });

/** /coordinators: every FBS unit's 2026 production with its listed coordinator, plus 2024–26 coordinator records. */
export const getCoordinators = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const teams = await sql.query<{ slug: string; name: string; colorPrimary: string }>(`select slug, name, color_primary as "colorPrimary" from teams`);
  const { coordinatorsFile, live2026, talent2026, stats2026AsOf, withLive2026 } = await import("./coordinators.server");
  const file = coordinatorsFile();
  const live = live2026();
  const coaches = withLive2026(file, live);
  const used = new Set([...file.units2026.map((u) => u.team), ...coaches.flatMap((c) => c.history.map((h) => h.team))]);
  const teamInfo = Object.fromEntries(teams.filter((t) => used.has(t.slug)).map((t) => [t.slug, { name: t.name, color: t.colorPrimary }]));
  return { built: file.built, source: file.source, units2026: file.units2026, prior2025: file.prior2025, coaches, live, talent: talent2026(), asOf2026: stats2026AsOf(), teams: teamInfo };
});
