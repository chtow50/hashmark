import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { formatKickCt, formatKickDayTitle } from "@/lib/cfb/chicago";
import { favoriteLine } from "@/lib/cfb/featured";
import { getGamePage, type BoxSide, type GamePage } from "@/lib/cfb/game-queries";
import { seo } from "@/lib/seo";
import OG_CARDS from "@/lib/og/cards.json";
import { cn, fmtPct } from "@/lib/utils";

type Page = Exclude<GamePage, { redirect: string }>;

export const Route = createFileRoute("/games/$key")({
  loader: async ({ params }) => {
    const page = await getGamePage({ data: { key: params.key } });
    if (!page) throw notFound();
    if ("redirect" in page) throw redirect({ to: "/games/$key", params: { key: page.redirect }, statusCode: 301 });
    return page;
  },
  component: GamePageView,
  head: ({ loaderData, params }) => {
    const g = loaderData as Page | undefined;
    const final = g && g.homeScore != null && g.awayScore != null && g.status === "final";
    return seo({
      path: `/games/${params.key}`,
      image: g && OG_CARDS.games.includes(g.key) ? `/og/games/${g.key}.jpg` : undefined,
      title: g
        ? `${g.away.shortName} ${final ? g.awayScore : ""} at ${g.home.shortName} ${final ? g.homeScore : ""} · ${final ? "box score, EPA, HX grade" : "HX line"} · HASHMARK`.replace(/\s+/g, " ")
        : "Game · HASHMARK",
      description: g
        ? `${g.away.name} at ${g.home.name}, ${g.kickoffDate}: ${final ? "final score, advanced box score (EPA per play, success rate, explosiveness, line yards) and the frozen pregame HX line" : "kickoff, Vegas line and the HX matchup"}.`
        : "HASHMARK game page.",
    });
  },
});

const pct = (v: unknown) => (v == null ? "—" : `${Number(v).toFixed(1)}%`);
const dec = (d: number) => (v: unknown) => (v == null ? "—" : `${Number(v) < 0 ? "−" : ""}${Math.abs(Number(v)).toFixed(d)}`);
const int = (v: unknown) => (v == null ? "—" : String(v));
const pair = (a: unknown, b: unknown) => (a == null || b == null ? "—" : `${a}–${b}`);

type Line = { label: string; get: (s: BoxSide) => string; num?: (s: BoxSide) => number | null; hi?: boolean; hint?: string };

const BOX: Line[] = [
  { label: "First downs", get: (s) => int(s.fd), num: (s) => s.fd as number, hi: true },
  { label: "Total yards", get: (s) => int(s.yds), num: (s) => s.yds as number, hi: true },
  { label: "Rushing", get: (s) => (s.ra == null ? "—" : `${s.ra}–${s.ry}`), num: (s) => s.ry as number, hi: true, hint: "carries–yards" },
  { label: "Yards per carry", get: (s) => (s.ra ? (Number(s.ry) / Number(s.ra)).toFixed(1) : "—"), num: (s) => (s.ra ? Number(s.ry) / Number(s.ra) : null), hi: true },
  { label: "Passing", get: (s) => (s.pa == null ? "—" : `${s.cmp}/${s.pa}, ${s.py}`), num: (s) => s.py as number, hi: true, hint: "comp/att, net yards" },
  { label: "3rd down", get: (s) => pair(s.c3, s.a3), num: (s) => (s.a3 ? Number(s.c3) / Number(s.a3) : null), hi: true },
  { label: "4th down", get: (s) => pair(s.c4, s.a4) },
  { label: "Turnovers", get: (s) => int(s.to), num: (s) => s.to as number, hi: false, hint: "INT thrown + fumbles lost" },
  { label: "Sacks (by defense)", get: (s) => int(s.sk), num: (s) => s.sk as number, hi: true },
  { label: "Tackles for loss", get: (s) => int(s.tfl), num: (s) => s.tfl as number, hi: true },
  { label: "Penalties", get: (s) => pair(s.pen, s.peny), num: (s) => s.peny as number, hi: false, hint: "number–yards" },
  { label: "Time of possession", get: (s) => (s.top == null ? "—" : String(s.top)) },
];

const ADV: Line[] = [
  { label: "EPA per play", get: (s) => dec(3)(s.epa), num: (s) => s.epa as number, hi: true, hint: "Expected points added per offensive play" },
  { label: "Success rate", get: (s) => pct(s.sr), num: (s) => s.sr as number, hi: true, hint: "Plays that gain enough yardage for the down and distance" },
  { label: "Explosiveness", get: (s) => dec(2)(s.xpl), num: (s) => s.xpl as number, hi: true, hint: "Average EPA on successful plays" },
  { label: "Rush EPA / play", get: (s) => dec(3)(s.repa), num: (s) => s.repa as number, hi: true },
  { label: "Rush success", get: (s) => pct(s.rsr), num: (s) => s.rsr as number, hi: true },
  { label: "Pass EPA / play", get: (s) => dec(3)(s.pepa), num: (s) => s.pepa as number, hi: true },
  { label: "Pass success", get: (s) => pct(s.psr), num: (s) => s.psr as number, hi: true },
  { label: "Standard-down success", get: (s) => pct(s.sdsr), num: (s) => s.sdsr as number, hi: true },
  { label: "Passing-down success", get: (s) => pct(s.pdsr), num: (s) => s.pdsr as number, hi: true },
  { label: "Line yards / carry", get: (s) => dec(2)(s.ly), num: (s) => s.ly as number, hi: true },
  { label: "Stuff rate", get: (s) => pct(s.stuff), num: (s) => s.stuff as number, hi: false, hint: "Runs stopped at or behind the line" },
  { label: "Plays · drives", get: (s) => (s.plays == null ? "—" : `${s.plays} · ${s.drives}`) },
];

function BoxTable({ title, lines, g, note }: { title: string; lines: Line[]; g: Page; note: string }) {
  const sides = title === "Box score" ? g.box! : g.adv!;
  return (
    <Panel className="p-0 sm:p-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 pt-4 sm:px-5">
        <h2 className="font-display text-2xl tracking-wide">{title}</h2>
        <p className="text-xs text-muted">{note}</p>
      </div>
      <table className="mt-3 w-full table-fixed text-sm">
        <colgroup>
          <col />
          <col className="w-[30%] sm:w-[22%]" />
          <col className="w-[30%] sm:w-[22%]" />
        </colgroup>
        <thead>
          <tr className="text-[11px] uppercase tracking-[0.12em] text-muted">
            <th className="border-b border-line px-4 py-2 text-left font-normal sm:px-5">Stat</th>
            <th className="border-b border-line px-2 py-2 text-right font-normal">{g.away.shortName}</th>
            <th className="border-b border-line px-4 py-2 text-right font-normal sm:px-5">{g.home.shortName}</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => {
            const a = l.num?.(sides.away) ?? null;
            const h = l.num?.(sides.home) ?? null;
            const better = a == null || h == null || a === h || l.hi == null ? null : (a > h) === l.hi ? "away" : "home";
            return (
              <tr key={l.label}>
                <td className="border-b border-line px-4 py-2 sm:px-5">
                  {l.label}
                  {l.hint ? <span className="block text-[11px] leading-snug text-faint">{l.hint}</span> : null}
                </td>
                <td className={cn("border-b border-line px-2 py-2 text-right tabular", better === "away" ? "font-semibold text-fg" : "text-muted")}>
                  {l.get(sides.away)}
                </td>
                <td className={cn("border-b border-line px-4 py-2 text-right tabular sm:px-5", better === "home" ? "font-semibold text-fg" : "text-muted")}>
                  {l.get(sides.home)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Panel>
  );
}

function GamePageView() {
  const g = Route.useLoaderData() as Page;
  const final = g.status === "final" && g.homeScore != null && g.awayScore != null;
  const vegasLine = g.vegasSpread == null ? null : favoriteLine(g.home.shortName, g.away.shortName, g.vegasSpread);
  const gr = g.graded;
  const hxLine = gr?.graded && gr.hxSpread != null ? favoriteLine(g.home.shortName, g.away.shortName, gr.hxSpread) : null;
  const hxFavP = gr?.graded && gr.pHome != null && gr.hxSpread != null ? (gr.hxSpread >= 0 ? gr.pHome : 1 - gr.pHome) : null;
  const winner = final ? (g.homeScore! > g.awayScore! ? "home" : "away") : null;
  const sideRow = (t: Page["home"], score: number | null, side: "home" | "away") => (
    <div className="flex items-center justify-between gap-3">
      <Link to="/teams/$slug" params={{ slug: t.slug }} className="flex min-w-0 items-center gap-3 hover:text-accent">
        <TeamMark slug={t.slug} color={t.color} swatchClassName="h-9 w-1.5" logoSize={28} />
        <span className="min-w-0">
          <span className="block truncate text-lg font-medium">{t.name}</span>
          <span className="block text-xs text-muted">{t.hxRank != null ? `HX No. ${t.hxRank} now` : "Not on the HX board"}</span>
        </span>
      </Link>
      <span className={cn("font-display text-5xl tabular", winner && winner !== side ? "text-muted" : "text-fg")}>{score ?? "—"}</span>
    </div>
  );

  return (
    <div>
      <PageHead
        kicker={`Week ${g.week} · ${formatKickDayTitle(g.kickoffAt, g.kickoffDate)}${g.neutral ? " · Neutral site" : ""}`}
        title={`${g.away.shortName} at ${g.home.shortName}`}
        lede={[final ? "FINAL" : g.kickoffAt ? formatKickCt(g.kickoffAt) : null, g.tv, g.location].filter(Boolean).join(" · ")}
      />

      <Panel className="mb-4">
        <div className="space-y-4">
          {sideRow(g.away, g.awayScore, "away")}
          {sideRow(g.home, g.homeScore, "home")}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 sm:grid-cols-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.12em] text-muted">Pregame HX</div>
            <div className="mt-1 tabular">{hxLine ?? (final ? (g.unrated ? "No pregame HX" : "n/a") : "—")}</div>
            {hxFavP != null ? <div className="text-xs text-muted">{fmtPct(hxFavP * 100, 1)} to win</div> : null}
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.12em] text-muted">Vegas line</div>
            <div className="mt-1 tabular">{vegasLine ?? "Not on file"}</div>
            {g.vegasTotal != null ? <div className="text-xs text-muted">O/U {g.vegasTotal.toFixed(1)}</div> : null}
          </div>
          {gr?.graded ? (
            <>
              <div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted">HX pick</div>
                <div className="mt-1">{gr.suHit == null ? "Pick'em" : gr.suHit ? "Right" : "Wrong"}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted">Line missed by</div>
                <div className="mt-1 tabular">{gr.absErr!.toFixed(1)} pts</div>
              </div>
            </>
          ) : null}
        </div>
        <p className="mt-4 text-xs text-muted">
          {final
            ? "Pregame HX is the board frozen when this game was stamped FINAL; later refits never change it. "
            : "This game hasn't been played. "}
          <Link
            to="/matchup"
            search={{ home: g.home.slug, away: g.away.slug, ...(g.neutral ? { neutral: true } : {}) }}
            className="underline underline-offset-4 hover:text-fg"
          >
            {final ? "Run it on today's board" : "HX line on today's board"}
          </Link>
          {final ? (
            <>
              {" · "}
              <Link to="/accuracy" search={{ week: g.week }} className="underline underline-offset-4 hover:text-fg">
                Week {g.week} accuracy
              </Link>
            </>
          ) : null}
        </p>
      </Panel>

      {final ? (
        g.box ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <BoxTable title="Box score" lines={BOX} g={g} note="Team totals" />
            {g.adv ? (
              <BoxTable title="Advanced" lines={ADV} g={g} note="Offense, all plays" />
            ) : (
              <Panel>
                <h2 className="font-display text-2xl tracking-wide">Advanced</h2>
                <p className="mt-2 text-sm text-muted">No play-by-play advanced stats on file for this game.</p>
              </Panel>
            )}
          </div>
        ) : (
          <Panel>
            <p className="text-sm text-muted">No box score on file for this game yet. It appears after the next weekly data pull.</p>
          </Panel>
        )
      ) : null}
      {g.source ? (
        <p className="mt-4 text-xs text-faint">
          Source: {g.source.box}, games through {g.source.through.slice(0, 10)}. Bold = the better side for that stat.
        </p>
      ) : null}
    </div>
  );
}
