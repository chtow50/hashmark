import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { STAT_TABS } from "./stats";

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
