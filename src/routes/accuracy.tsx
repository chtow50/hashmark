import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { PageHead, Panel } from "@/components/shell";
import { ShareImageButton } from "@/components/share-button";
import type { AccGame } from "@/lib/cfb/accuracy";
import { getAccuracy } from "@/lib/cfb/accuracy-queries";
import { favoriteLine } from "@/lib/cfb/featured";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { week?: number };

export const Route = createFileRoute("/accuracy")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const w = Number(s.week);
    return Number.isInteger(w) && w >= 0 && w <= 16 ? { week: w } : {};
  },
  loader: () => getAccuracy(),
  component: AccuracyPage,
  head: () =>
    seo({
      path: "/accuracy",
      title: "HX accuracy · every FINAL against its pregame line · HASHMARK",
      description:
        "Every 2026 FINAL graded against the frozen pregame HX line and win probability: straight-up picks, average miss, Brier score, weekly and season rollups, and the same games against the Vegas close.",
    }),
});

const f = (x: number | null, d = 1) => (x == null ? "n/a" : x.toFixed(d));
const NA_TEXT: Record<string, string> = {
  fcs: "FCS opponent: no HX",
  unrated: "Newcomer: no pregame HX line",
  "no-lock": "No frozen pregame number",
};

function AccuracyPage() {
  const { games, season, weeks } = Route.useLoaderData();
  const search = Route.useSearch();
  const latest = weeks.filter((w) => w.r.graded > 0).at(-1)?.week ?? weeks.at(-1)?.week ?? 0;
  const week = search.week != null && weeks.some((w) => w.week === search.week) ? search.week : latest;
  const list = games.filter((g) => g.week === week);

  return (
    <div>
      <PageHead
        kicker="2026 season · frozen pregame numbers only"
        title="Accuracy"
        lede="Every FINAL against the HX line and win probability that were live before kickoff. The pregame number is frozen when a game is stamped and never rewritten by a later board. Games with no frozen number are marked n/a, not backfilled."
        action={
          <ShareImageButton
            card={() => ({
              kicker: "HX accuracy · 2026 season",
              title: "Frozen pregame HX vs results",
              subtitle: `${season.graded} of ${season.games} FINALs graded · ${season.na} n/a (no frozen number)`,
              stats: [
                { label: "Winners picked", value: season.suPct == null ? "n/a" : `${season.suPct.toFixed(1)}%` },
                { label: "Avg miss", value: season.mae == null ? "n/a" : `${season.mae.toFixed(1)} pts` },
                { label: "Brier", value: f(season.brier, 3) },
                { label: "Vegas close miss", value: season.maeVegasLined == null ? "n/a" : `${season.maeVegasLined.toFixed(1)} pts` },
              ],
              footer: `Vegas close on the ${season.lined} lined games; HX missed ${f(season.maeHxLined)} on the same games.`,
              filename: "hashmark-accuracy-2026.png",
            })}
          />
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card label="Winners picked" value={season.suPct == null ? "n/a" : `${season.suPct.toFixed(1)}%`} sub={`${season.suHits} of ${season.graded - pickEms(games)} picks`} />
        <Card label="Average miss" value={season.mae == null ? "n/a" : `${season.mae.toFixed(1)} pts`} sub="|final margin − HX line|" />
        <Card label="Brier score" value={f(season.brier, 3)} sub="win % calibration · lower is better" />
        <Card label="Graded" value={`${season.graded}`} sub={`of ${season.games} FINALs · ${season.na} n/a`} />
      </div>

      <Panel className="mb-6">
        <h2 className="font-display text-lg">Against the Vegas close</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          On the {season.lined} graded games that also have a Vegas line on file, HX missed by {f(season.maeHxLined)} points on average and the close missed by {f(season.maeVegasLined)}.{" "}
          {season.maeHxLined != null && season.maeVegasLined != null && season.maeVegasLined < season.maeHxLined
            ? "The market is still better. That is the Soft-cal FLAG, and it stays up."
            : null}{" "}
          Bias {season.bias == null ? "n/a" : `${season.bias > 0 ? "+" : ""}${season.bias.toFixed(1)}`} (positive = home teams beat the HX line).
        </p>
      </Panel>

      <Panel className="mb-6 p-0 sm:p-0">
        <div className="flex items-baseline justify-between gap-3 px-4 pt-4 sm:px-5">
          <h2 className="font-display text-lg">By week</h2>
          <span className="text-xs text-muted">Tap a week for its games</span>
        </div>
        <div className="overflow-x-auto">
          <table className="mt-2 w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.08em] text-muted">
                <th className="border-b border-border px-3 py-2 text-left font-medium">Week</th>
                <th className="border-b border-border px-3 py-2 text-right font-medium">Graded</th>
                <th className="border-b border-border px-3 py-2 text-right font-medium">Winners</th>
                <th className="border-b border-border px-3 py-2 text-right font-medium">Avg miss</th>
                <th className="hidden border-b border-border px-3 py-2 text-right font-medium sm:table-cell">Brier</th>
                <th className="hidden border-b border-border px-3 py-2 text-right font-medium sm:table-cell">HX / Vegas miss</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map(({ week: w, r }) => (
                <tr key={w} className={cn("hover:[&>td]:bg-raised", w === week && "[&>td]:bg-raised")}>
                  <td className="border-b border-line px-3 py-1.5">
                    <Link to="/accuracy" search={w === latest ? {} : { week: w }} className="inline-flex min-h-10 items-center font-medium underline-offset-4 hover:underline">
                      Week {w}
                    </Link>
                  </td>
                  <td className="border-b border-line px-3 py-1.5 text-right tabular text-muted">
                    {r.graded}/{r.games}
                  </td>
                  <td className="border-b border-line px-3 py-1.5 text-right tabular">{r.suPct == null ? "n/a" : `${r.suPct.toFixed(1)}%`}</td>
                  <td className="border-b border-line px-3 py-1.5 text-right tabular">{f(r.mae)}</td>
                  <td className="hidden border-b border-line px-3 py-1.5 text-right tabular sm:table-cell">{f(r.brier, 3)}</td>
                  <td className="hidden border-b border-line px-3 py-1.5 text-right tabular text-muted sm:table-cell">
                    {r.lined ? `${f(r.maeHxLined)} / ${f(r.maeVegasLined)} (${r.lined})` : "n/a"}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="px-3 py-2">Season</td>
                <td className="px-3 py-2 text-right tabular">
                  {season.graded}/{season.games}
                </td>
                <td className="px-3 py-2 text-right tabular">{season.suPct == null ? "n/a" : `${season.suPct.toFixed(1)}%`}</td>
                <td className="px-3 py-2 text-right tabular">{f(season.mae)}</td>
                <td className="hidden px-3 py-2 text-right tabular sm:table-cell">{f(season.brier, 3)}</td>
                <td className="hidden px-3 py-2 text-right tabular sm:table-cell">
                  {f(season.maeHxLined)} / {f(season.maeVegasLined)} ({season.lined})
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel className="p-0 sm:p-0">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 pt-4 sm:px-5">
          <h2 className="font-display text-lg">Week {week} games</h2>
          <span className="text-xs text-muted">{list.length} FINALs</span>
        </div>
        <ul className="mt-2 divide-y divide-line">
          {list.map((g) => (
            <GameRow key={g.id} g={g} />
          ))}
        </ul>
      </Panel>

      <Panel className="mt-6">
        <h2 className="font-display text-lg">How games are graded</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
          <li>The pregame number is the HX board that was live when the game was stamped FINAL, saved on the game (Week 0 was frozen before the coach-change moves). Later refits never touch it.</li>
          <li>HX line and win % come from those two numbers through the board&apos;s matchup engine (Elo = 1500 + 55 × HX, 60 points home field).</li>
          <li>Winners picked counts games where the HX favorite won; pick&apos;ems don&apos;t count. Average miss = |final margin − HX line|. Brier = squared gap between the HX win % and the result (0 is perfect, 0.25 is a coin flip).</li>
          <li>n/a: FCS opponents (no HX), and 2026 newcomers&apos; games before they joined the board. These are never filled in from a later board.</li>
          <li>Vegas comparison uses only games with a Vegas line on file. Method on <Link to="/model" className="underline underline-offset-4 hover:text-fg">The Model</Link>.</li>
        </ul>
      </Panel>
    </div>
  );
}

function pickEms(games: AccGame[]) {
  return games.filter((g) => g.graded && g.suHit == null).length;
}

function Card({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</div>
      <div className="mt-1 font-display text-2xl tabular">{value}</div>
      <div className="mt-0.5 text-xs text-muted">{sub}</div>
    </div>
  );
}

function GameRow({ g }: { g: AccGame }) {
  const line = g.hxSpread == null ? null : favoriteLine(g.homeShort, g.awayShort, g.hxSpread);
  const favP = g.pHome == null ? null : g.hxSpread != null && g.hxSpread < 0 ? 1 - g.pHome : g.pHome;
  const winnerHome = g.margin > 0;
  return (
    <li className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="min-w-0 text-sm">
        <div className="truncate">
          <span className={cn(!winnerHome && "font-semibold text-fg")}>{g.awayShort} {g.awayScore}</span>
          <span className="text-faint">{g.neutral ? " vs " : " at "}</span>
          <span className={cn(winnerHome && "font-semibold text-fg")}>{g.homeShort} {g.homeScore}</span>
        </div>
        <div className="text-xs text-muted">{g.kickoffDate}</div>
      </div>
      <div className="flex items-center gap-4 text-sm sm:justify-end">
        {g.graded ? (
          <>
            <span className="tabular">
              <span className="text-[11px] uppercase tracking-wide text-faint">HX </span>
              {line}
            </span>
            <span className="tabular text-muted">{favP == null ? "" : `${(favP * 100).toFixed(1)}%`}</span>
            <span className="tabular text-muted">miss {g.absErr!.toFixed(1)}</span>
            {g.suHit == null ? (
              <span className="text-xs text-muted">PK</span>
            ) : g.suHit ? (
              <Check className="h-4 w-4 text-up" aria-label="Winner picked" />
            ) : (
              <X className="h-4 w-4 text-down" aria-label="Winner missed" />
            )}
          </>
        ) : (
          <span className="text-xs text-muted">n/a · {NA_TEXT[g.naReason ?? "no-lock"]}</span>
        )}
      </div>
    </li>
  );
}
