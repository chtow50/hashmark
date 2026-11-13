import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { RACE_CONFS, confRace, confRacesMeta, fmtOdds, parseRaceConf, type RaceConf } from "@/lib/cfb/conf-races";
import { listTeams } from "@/lib/cfb/queries";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { conf?: RaceConf };
const DEFAULT_CONF: RaceConf = "SEC";

export const Route = createFileRoute("/conferences")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const conf = parseRaceConf(s.conf);
    return conf && conf !== DEFAULT_CONF ? { conf } : {};
  },
  loader: () => listTeams(),
  component: ConferencesPage,
  head: () =>
    seo({
      path: "/conferences",
      title: "Conference races · title game and conference title odds · HASHMARK",
      description:
        "Every FBS conference race from 10,000 simulated seasons on the HX board: odds to reach the conference title game, odds to win the league, and projected conference records.",
    }),
});

function ConferencesPage() {
  const teams = Route.useLoaderData();
  const conf = Route.useSearch().conf ?? DEFAULT_CONF;
  const meta = confRacesMeta();
  const bySlug = new Map(teams.map((t) => [t.slug, t]));
  const rows = confRace(conf);
  const hasCcg = conf !== "Pac-12";
  const leader = rows[0];
  const leaderTeam = leader ? bySlug.get(leader.slug) : undefined;
  const alive = rows.filter((r) => (r.conf_title ?? 0) > 0).length;

  return (
    <div>
      <PageHead
        kicker={`${meta.hx_stamp} · ${meta.n_sims.toLocaleString("en-US")} simulated seasons · ${meta.as_of}`}
        title="Conference races"
        lede="Who reaches each title game and who wins the league, from the same 10,000 HX season simulations behind Make 12. FINALs are locked; every remaining game is drawn from HX win probability."
      />

      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="tablist" aria-label="Conference">
        {RACE_CONFS.map((c) => (
          <Link
            key={c}
            to="/conferences"
            search={c === DEFAULT_CONF ? {} : { conf: c }}
            role="tab"
            aria-selected={conf === c}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150 sm:h-9 sm:px-3.5",
              conf === c ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {c}
          </Link>
        ))}
      </div>

      {leader && leaderTeam ? (
        <Panel className="mb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <TeamMark slug={leaderTeam.slug} color={leaderTeam.colorPrimary} swatchClassName="h-10 w-1.5 rounded-sm" logoSize={22} />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{conf} favorite</p>
                <Link to="/teams/$slug" params={{ slug: leaderTeam.slug }} className="font-display text-3xl tracking-wide">
                  {leaderTeam.name}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <Big label="Win the league" value={fmtOdds(leader.conf_title)} />
              <Big label={hasCcg ? "Title game" : "Title game"} value={hasCcg ? fmtOdds(leader.make_ccg) : "None"} />
              <Big label="Still alive" value={`${alive} of ${rows.length}`} />
            </div>
          </div>
        </Panel>
      ) : null}

      <Panel className="p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.08em] text-muted">
                <th className="border-b border-border px-3 py-3 text-left font-medium">Team</th>
                <th className="hidden border-b border-border px-3 py-3 text-right font-medium sm:table-cell" title="Conference record in FINALs so far">Conf now</th>
                <th className="border-b border-border px-2 py-3 text-right font-medium sm:px-3" title="Average simulated conference record after the regular season">Proj conf</th>
                {hasCcg ? (
                  <th className="border-b border-border px-3 py-3 text-right font-medium sm:text-left">
                  <span className="sm:hidden">Title gm</span>
                  <span className="hidden sm:inline">Title game</span>
                </th>
                ) : null}
                <th className="border-b border-border px-3 py-3 text-right font-medium sm:text-left">
                  <span className="sm:hidden">Champ</span>
                  <span className="hidden sm:inline">Win the league</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const t = bySlug.get(r.slug);
                if (!t) return null;
                return (
                  <tr key={r.slug} className="hover:[&>td]:bg-raised">
                    <td className="border-b border-line py-2 pl-3 pr-1 sm:px-3">
                      <Link to="/teams/$slug" params={{ slug: t.slug }} className="flex min-h-10 items-center gap-2">
                        <TeamMark slug={t.slug} color={t.colorPrimary} />
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{t.name}</span>
                          <span className="block text-xs text-muted">
                            HX No. {t.hxRank}
                            <span className="sm:hidden"> · {r.conf_w_now}–{r.conf_l_now} conf</span>
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="hidden whitespace-nowrap border-b border-line px-3 py-2 text-right tabular text-muted sm:table-cell">
                      {r.conf_w_now}–{r.conf_l_now}
                    </td>
                    <td className="whitespace-nowrap border-b border-line px-2 py-2 text-right tabular sm:px-3">
                      {r.proj_conf_w.toFixed(1)}–{r.proj_conf_l.toFixed(1)}
                    </td>
                    {hasCcg ? (
                      <td className="border-b border-line px-2 py-2 sm:px-3">
                        <OddsBar value={r.make_ccg} color={t.colorPrimary} />
                      </td>
                    ) : null}
                    <td className="border-b border-line px-2 py-2 sm:px-3">
                      <OddsBar value={r.conf_title} color={t.colorPrimary} strong />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel className="mt-6">
        <h2 className="font-display text-lg">How this works</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
          <li>
            {meta.n_sims.toLocaleString("en-US")} seasons, fixed seed {meta.seed}, on the {meta.hx_stamp} board. Each remaining game is a coin weighted by HX win probability (Elo = 1500 + 55 × HX, 60 points home field). Played games are locked.
          </li>
          <li>{meta.title_game_rule}</li>
          <li>{meta.pac12_rule}</li>
          <li>Title-game odds add to 200% in each league (two teams per game); league-title odds add to 100%. &ldquo;&lt;0.1%&rdquo; means alive but rare; 0% means it never happened in the draws.</li>
          <li>
            Same draws as Make 12 on the{" "}
            <Link to="/rankings" className="underline underline-offset-4 hover:text-fg">
              rankings
            </Link>
            . Method details on{" "}
            <Link to="/model" className="underline underline-offset-4 hover:text-fg">
              The Model
            </Link>
            .
          </li>
        </ul>
      </Panel>
    </div>
  );
}

function Big({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</div>
      <div className="mt-1 font-display text-2xl tabular">{value}</div>
    </div>
  );
}

function OddsBar({ value, color, strong }: { value: number | null; color: string; strong?: boolean }) {
  const w = value == null ? 0 : Math.max(value > 0 ? 1.5 : 0, Math.min(100, value));
  return (
    <div className="flex items-center justify-end gap-2 sm:min-w-[9rem] sm:justify-start">
      <span className={cn("shrink-0 text-right tabular sm:w-14", strong ? "font-semibold text-fg" : "text-fg/85")}>{fmtOdds(value)}</span>
      <span className="hidden h-2 flex-1 rounded-full bg-raised sm:block">
        <span className="block h-2 rounded-full" style={{ width: `${w}%`, background: color }} />
      </span>
    </div>
  );
}
