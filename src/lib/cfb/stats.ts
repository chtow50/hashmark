/**
 * /stats metric catalog and math (client-safe; no data import).
 * Rows come from data/stats_2026.json via the getStatsTab server function (stats.server.ts).
 * Box counting stats: cfbstats.com. Advanced: CollegeFootballData (CFBD) play-by-play.
 */
export const STAT_TABS = ["teams", "qb", "rush", "rec"] as const;
export type StatTab = (typeof STAT_TABS)[number];
export const TAB_LABEL: Record<StatTab, string> = { teams: "Teams", qb: "QBs", rush: "Rushers", rec: "Receivers" };
export const parseTab = (v: unknown): StatTab => (STAT_TABS.includes(v as StatTab) ? (v as StatTab) : "teams");

/** Where a number comes from: shown next to every definition. */
export type MetricSource = "box" | "derived" | "cfbd-adj" | "cfbd";
export const SOURCE_LABEL: Record<MetricSource, string> = {
  box: "cfbstats box",
  derived: "Derived from cfbstats box",
  "cfbd-adj": "CFBD, opponent-adjusted",
  cfbd: "CFBD play-by-play",
};

export type Metric = {
  k: string;
  /** Long label. */
  l: string;
  /** Column label. */
  s: string;
  /** Higher is better. */
  hi: boolean;
  d: number;
  g: string;
  src: MetricSource;
  def: string;
  /** Show a + sign on positive values. */
  signed?: boolean;
};

const m = (k: string, l: string, s: string, hi: boolean, d: number, g: string, src: MetricSource, def: string, signed = false): Metric => ({
  k, l, s, hi, d, g, src, def, signed,
});

export const G_OFF = "Offense";
export const G_DEF = "Defense";
export const G_RATE = "Rates";
export const G_EPA = "EPA (CFBD)";
export const G_BOX = "Box";
export const G_EFF = "Efficiency";

export const METRICS: Record<StatTab, Metric[]> = {
  teams: [
    m("nepa", "Net adjusted EPA per play", "Net EPA", true, 3, G_EPA, "cfbd-adj", "Offensive adjusted EPA/play minus defensive adjusted EPA/play allowed. EPA = expected points added: how much each play changed the expected points of the drive.", true),
    m("epa", "Offensive adjusted EPA per play", "Off EPA", true, 3, G_EPA, "cfbd-adj", "Average EPA per offensive play, adjusted for opposing defenses."),
    m("oepa", "Defensive adjusted EPA per play allowed", "Def EPA", false, 3, G_EPA, "cfbd-adj", "Average EPA per play allowed, adjusted for opposing offenses. Lower is better."),
    m("sr", "Offensive success rate", "Off SR %", true, 1, G_EPA, "cfbd-adj", "Share of plays that gain 50% of needed yards on 1st down, 70% on 2nd, 100% on 3rd/4th. Opponent-adjusted."),
    m("osr", "Defensive success rate allowed", "Def SR %", false, 1, G_EPA, "cfbd-adj", "Opponent success rate, adjusted for opposing offenses. Lower is better."),
    m("xpl", "Offensive explosiveness", "Off XPL", true, 3, G_EPA, "cfbd-adj", "Average EPA on successful plays: how big the good plays are. Opponent-adjusted."),
    m("oxpl", "Explosiveness allowed", "Def XPL", false, 3, G_EPA, "cfbd-adj", "Average EPA on opponents' successful plays. Lower is better."),
    m("repa", "Rushing adjusted EPA per play", "Rush EPA", true, 3, G_EPA, "cfbd-adj", "Offensive EPA per rush, opponent-adjusted."),
    m("pepa", "Passing adjusted EPA per play", "Pass EPA", true, 3, G_EPA, "cfbd-adj", "Offensive EPA per dropback, opponent-adjusted."),
    m("ly", "Offensive line yards", "Line Yds", true, 2, G_EPA, "cfbd-adj", "Rushing yards credited to the line: 0–4 yards full credit, 5–10 half, losses count 120%. Opponent-adjusted."),
    m("oly", "Line yards allowed", "Opp Line Yds", false, 2, G_EPA, "cfbd-adj", "Opponent line yards per carry. Lower is better."),
    m("hav", "Defensive havoc rate", "Havoc %", true, 1, G_EPA, "cfbd", "Share of defensive plays with a tackle for loss, forced fumble, interception, or pass breakup. Raw, not opponent-adjusted."),
    m("ohav", "Havoc allowed", "Havoc alw %", false, 1, G_EPA, "cfbd", "Share of offensive plays with a havoc event against. Lower is better."),
    m("ppg", "Points per game", "Pts/G", true, 1, G_OFF, "box", "Points scored divided by games."),
    m("ypg", "Total yards per game", "Yds/G", true, 1, G_OFF, "box", "Rush plus pass yards per game."),
    m("ypp", "Yards per play", "Yds/Play", true, 2, G_OFF, "box", "Total yards divided by offensive plays."),
    m("rypg", "Rush yards per game", "Rush/G", true, 1, G_OFF, "box", "Net rushing yards per game (NCAA counts sack yardage as rushing)."),
    m("pypg", "Pass yards per game", "Pass/G", true, 1, G_OFF, "box", "Passing yards per game."),
    m("c3", "3rd-down conversion %", "3rd %", true, 1, G_OFF, "box", "Third-down conversions divided by attempts."),
    m("rz", "Red-zone score %", "RZ %", true, 1, G_OFF, "box", "Red-zone trips ending in any score."),
    m("sa", "Sacks allowed", "Sacks alw", false, 0, G_OFF, "box", "Sacks taken by the offense, season total."),
    m("oppg", "Points allowed per game", "Opp Pts/G", false, 1, G_DEF, "box", "Opponent points divided by games."),
    m("oypg", "Yards allowed per game", "Opp Yds/G", false, 1, G_DEF, "box", "Opponent total yards per game."),
    m("oypp", "Yards per play allowed", "Opp Yds/Play", false, 2, G_DEF, "box", "Opponent total yards divided by opponent plays."),
    m("orypg", "Rush yards allowed per game", "Opp Rush/G", false, 1, G_DEF, "box", "Opponent rushing yards per game."),
    m("opypg", "Pass yards allowed per game", "Opp Pass/G", false, 1, G_DEF, "box", "Opponent passing yards per game."),
    m("oc3", "Opponent 3rd-down %", "Opp 3rd %", false, 1, G_DEF, "box", "Opponent third-down conversion rate."),
    m("sk", "Sacks", "Sacks", true, 0, G_DEF, "box", "Defensive sacks, season total."),
    m("tom", "Turnover margin", "TO +/-", true, 0, G_DEF, "box", "Takeaways minus giveaways.", true),
    m("pen", "Penalties per game", "Pen/G", false, 1, G_DEF, "box", "Accepted penalties against the team per game."),
    m("pd", "Point differential per game", "Pt Diff/G", true, 1, G_RATE, "derived", "(Points scored minus points allowed) / games.", true),
    m("yppm", "Yards-per-play margin", "YPP +/-", true, 2, G_RATE, "derived", "Yards per play minus yards per play allowed.", true),
    m("nypa", "Net yards per pass attempt", "Net Y/A", true, 2, G_RATE, "derived", "(Pass yards minus sack yards) / (attempts plus sacks)."),
    m("ypc", "Rush yards per carry", "Rush Y/C", true, 2, G_RATE, "derived", "Rushing yards / carries (sacks included per NCAA rules)."),
    m("oypc", "Rush yards per carry allowed", "Opp Y/C", false, 2, G_RATE, "derived", "Opponent rushing yards / opponent carries."),
    m("tdr", "Offensive TD rate", "TD/100 plays", true, 2, G_RATE, "derived", "Rushing plus passing TDs per 100 offensive plays."),
  ],
  qb: [
    m("epa", "EPA per dropback", "EPA/Play", true, 3, G_EPA, "cfbd", "Average EPA on the player's passing plays. Raw, not opponent-adjusted."),
    m("tepa", "Total EPA", "Tot EPA", true, 1, G_EPA, "cfbd", "Season EPA on all the player's plays (pass and rush).", true),
    m("use", "Usage", "Usage %", true, 1, G_EPA, "cfbd", "Share of the team's offensive plays that involve the player."),
    m("att", "Pass attempts", "Att", true, 0, G_BOX, "box", "Passes thrown."),
    m("cmp", "Completion %", "Cmp %", true, 1, G_BOX, "box", "Completions divided by attempts."),
    m("yds", "Passing yards", "Yds", true, 0, G_BOX, "box", "Season passing yards."),
    m("td", "Passing TDs", "TD", true, 0, G_BOX, "box", "Touchdown passes."),
    m("int", "Interceptions", "INT", false, 0, G_BOX, "box", "Interceptions thrown."),
    m("ruy", "Rushing yards", "Rush Yds", true, 0, G_BOX, "box", "Net rushing yards (NCAA counts sack losses here)."),
    m("ypg", "Pass yards per game", "Yds/G", true, 1, G_EFF, "derived", "Passing yards / games played."),
    m("ypa", "Yards per attempt", "Y/A", true, 2, G_EFF, "derived", "Passing yards / attempts."),
    m("aya", "Adjusted yards per attempt", "AY/A", true, 2, G_EFF, "derived", "(Yards + 20×TD − 45×INT) / attempts."),
    m("tdp", "Touchdown %", "TD %", true, 2, G_EFF, "derived", "TD passes per 100 attempts."),
    m("intp", "Interception %", "INT %", false, 2, G_EFF, "derived", "Interceptions per 100 attempts."),
    m("eff", "NCAA passing efficiency", "NCAA Eff", true, 1, G_EFF, "derived", "(8.4×Yds + 330×TD + 100×Cmp − 200×INT) / Att."),
  ],
  rush: [
    m("epa", "EPA per rush", "EPA/Rush", true, 3, G_EPA, "cfbd", "Average EPA on the player's carries. Raw, not opponent-adjusted."),
    m("tepa", "Total rushing EPA", "Tot EPA", true, 1, G_EPA, "cfbd", "Season EPA on the player's carries.", true),
    m("use", "Rush usage", "Usage %", true, 1, G_EPA, "cfbd", "Share of the team's rushes that are the player's."),
    m("att", "Carries", "Att", true, 0, G_BOX, "box", "Rushing attempts."),
    m("yds", "Rushing yards", "Yds", true, 0, G_BOX, "box", "Net rushing yards."),
    m("td", "Rushing TDs", "TD", true, 0, G_BOX, "box", "Rushing touchdowns."),
    m("ypc", "Yards per carry", "Y/C", true, 2, G_EFF, "derived", "Rushing yards / carries."),
    m("ypg", "Rush yards per game", "Yds/G", true, 1, G_EFF, "derived", "Rushing yards / games played."),
    m("tdr", "TD per 100 carries", "TD/100", true, 2, G_EFF, "derived", "Rushing TDs per 100 carries."),
  ],
  rec: [
    m("epa", "EPA per target", "EPA/Tgt", true, 3, G_EPA, "cfbd", "Average EPA on passes thrown to the player. Raw, not opponent-adjusted."),
    m("tepa", "Total receiving EPA", "Tot EPA", true, 1, G_EPA, "cfbd", "Season EPA on passes thrown to the player.", true),
    m("use", "Target usage", "Usage %", true, 1, G_EPA, "cfbd", "Share of the team's passes thrown to the player."),
    m("rec", "Receptions", "Rec", true, 0, G_BOX, "box", "Catches."),
    m("yds", "Receiving yards", "Yds", true, 0, G_BOX, "box", "Receiving yards."),
    m("td", "Receiving TDs", "TD", true, 0, G_BOX, "box", "Receiving touchdowns."),
    m("ypr", "Yards per reception", "Y/R", true, 2, G_EFF, "derived", "Receiving yards / receptions."),
    m("ypg", "Receiving yards per game", "Yds/G", true, 1, G_EFF, "derived", "Receiving yards / games played."),
    m("tdr", "TD per 100 catches", "TD/100", true, 2, G_EFF, "derived", "Receiving TDs per 100 receptions."),
  ],
};

export const GROUPS: Record<StatTab, string[]> = {
  teams: [G_EPA, G_OFF, G_DEF, G_RATE],
  qb: [G_EPA, G_BOX, G_EFF],
  rush: [G_EPA, G_BOX, G_EFF],
  rec: [G_EPA, G_BOX, G_EFF],
};

export const metricOf = (tab: StatTab, k: string): Metric | undefined => METRICS[tab].find((x) => x.k === k);

/** One table row: identity plus every metric value (null = not available from the source). */
export type StatRow = {
  id: string;
  name: string;
  slug: string;
  team: string;
  conference: string;
  color: string;
  pos: string;
  g: number;
  /** Teams: W–L. Players: "". */
  wl: string;
  v: Record<string, number | null>;
};

type Raw = Record<string, unknown>;
const n = (x: unknown): number | null => (typeof x === "number" && Number.isFinite(x) ? x : null);

/** Adds derived per-attempt values to a raw JSON row. Pure; used by the server function and tests. */
export function deriveValues(tab: StatTab, r: Raw): Record<string, number | null> {
  const v: Record<string, number | null> = {};
  for (const mt of METRICS[tab]) v[mt.k] = n(r[mt.k]);
  const g = n(r.g) ?? 0;
  if (tab === "qb") {
    const att = n(r.att) ?? 0, yds = n(r.yds) ?? 0, td = n(r.td) ?? 0, it = n(r.int) ?? 0, cmp = ((n(r.cmp) ?? 0) * att) / 100;
    if (att > 0) Object.assign(v, { ypa: yds / att, aya: (yds + 20 * td - 45 * it) / att, tdp: (100 * td) / att, intp: (100 * it) / att, eff: (8.4 * yds + 330 * td + 100 * cmp - 200 * it) / att });
    v.ypg = g > 0 ? yds / g : null;
  } else if (tab === "rush") {
    const att = n(r.att) ?? 0, yds = n(r.yds) ?? 0, td = n(r.td) ?? 0;
    if (att > 0) Object.assign(v, { ypc: yds / att, tdr: (100 * td) / att });
    v.ypg = g > 0 ? yds / g : null;
  } else if (tab === "rec") {
    const rec = n(r.rec) ?? 0, yds = n(r.yds) ?? 0, td = n(r.td) ?? 0;
    if (rec > 0) Object.assign(v, { ypr: yds / rec, tdr: (100 * td) / rec });
    v.ypg = g > 0 ? yds / g : null;
  }
  return v;
}

/**
 * Percentile and rank of one value inside a cohort (ties share the midpoint). Rows with a null value
 * for the metric are left out of the cohort. P100 = best, P0 = worst.
 */
export function standing(mt: Metric, val: number | null, cohort: (number | null)[]): { p: number; rank: number; n: number } | null {
  if (val == null) return null;
  const vals = cohort.filter((x): x is number => x != null);
  const len = vals.length;
  if (!len) return null;
  const eps = 1e-9;
  const better = vals.filter((x) => (mt.hi ? x > val + eps : x < val - eps)).length;
  const ties = Math.max(1, vals.filter((x) => Math.abs(x - val) <= eps).length);
  const mid = better + (ties + 1) / 2;
  return { p: len > 1 ? Math.max(0, Math.min(100, (100 * (len - mid)) / (len - 1))) : 100, rank: better + 1, n: len };
}

export function fmtStat(mt: Metric, x: number | null | undefined): string {
  if (x == null || !Number.isFinite(x)) return "—";
  const s = x.toFixed(mt.d);
  return mt.signed && x > 0 ? `+${s}` : s;
}

/** Sort rows by a metric, best first; nulls last. */
export function sortRows(rows: StatRow[], mt: Metric, dir: "best" | "worst" = "best"): StatRow[] {
  const sign = (mt.hi ? -1 : 1) * (dir === "best" ? 1 : -1);
  return [...rows].sort((a, b) => {
    const x = a.v[mt.k], y = b.v[mt.k];
    if (x == null && y == null) return a.name.localeCompare(b.name);
    if (x == null) return 1;
    if (y == null) return -1;
    return sign * (x - y) || a.name.localeCompare(b.name);
  });
}

export type StatsMeta = {
  as_of: string;
  box_source: string;
  advanced_source: string;
  advanced_through: string;
  adjustment: string;
  pools: Record<"qb" | "rush" | "rec", string>;
  matched_advanced: Record<"qb" | "rush" | "rec", string>;
};

/** Team-page advanced block: the CFBD metrics with FBS rank. */
export const TEAM_ADVANCED_KEYS = ["nepa", "epa", "oepa", "sr", "osr", "xpl", "oxpl", "ly", "oly", "hav", "ohav"] as const;
