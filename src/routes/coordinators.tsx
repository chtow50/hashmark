import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useMemo, useState } from "react";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import {
  buildBoard,
  COL_META,
  COORD_COLS,
  coordSearch,
  fmtCol,
  higherIsBetter,
  inWindow,
  parseCoordDir,
  parseCoordSort,
  parseUnit,
  parseWindow,
  qualifyCounts,
  unrankedFor,
  UNIT_LABEL,
  UNIT_SHORT,
  WINDOWS,
  type CoachRecord,
  type CoordCol,
  type CoordDir,
  type HistoryRow,
  type Season2026,
  type Unit,
  type WindowKey,
} from "@/lib/cfb/coordinators";
import { getCoordinators } from "@/lib/cfb/stats-queries";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { unit?: Unit; window?: WindowKey; sort?: CoordCol; dir?: CoordDir };
type Teams = Record<string, { name: string; color: string }>;

export const Route = createFileRoute("/coordinators")({
  validateSearch: (s: Record<string, unknown>): Search => coordSearch(parseUnit(s.unit), parseWindow(s.window), parseCoordSort(s.sort), parseCoordDir(s.dir)),
  loader: () => getCoordinators(),
  component: CoordinatorsPage,
  head: () =>
    seo({
      path: "/coordinators",
      title: "Best coordinators · unit track records of current Power 4 OCs and DCs · HASHMARK",
      description:
        "Current Power 4 offensive and defensive coordinators ranked by the opponent-adjusted EPA of the units they ran, 2016–25. Only seasons with a verified sole-coordinator credit count. Track record of the units, not a coach rating.",
      image: "/og/coordinators.jpg",
    }),
});

function CoordinatorsPage() {
  const { file, now, asOf2026, teams } = Route.useLoaderData();
  const search = Route.useSearch();
  const unit = search.unit ?? "off";
  const w = search.window ?? "10y";
  const sort = search.sort ?? "epa";
  const dir = search.dir ?? "best";
  const rows = useMemo(() => buildBoard(file.coaches, unit, w, sort, dir), [file, unit, w, sort, dir]);
  const counts = qualifyCounts(file, unit, w);
  const unranked = unrankedFor(file, unit, w);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const win = WINDOWS[w];
  const side = unit === "off" ? "offense" : "defense";
  const tn = (slug: string, fallback?: string) => teams[slug]?.name ?? fallback ?? slug;

  return (
    <div>
      <PageHead
        kicker="Current Power 4 coordinators · credits verified through 2025"
        title="Best coordinators"
        lede="Track record of the units they ran, not a coach rating. Each current Power 4 coordinator is measured by how his units played in seasons where an official staff page and a cited source show he alone ran that side of the ball. No composite score: HX stays the only rating on HASHMARK."
      />

      <Panel className="mb-4">
        <h2 className="font-display text-lg">How a season gets credited</h2>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
          <li>
            <span className="text-fg">Who is in it:</span> coordinators listed as the only OC or DC on their school&apos;s official 2026 staff page. Co-coordinator setups, and schools with no
            single OC or DC listed, are left out.
          </li>
          <li>
            <span className="text-fg">Which seasons count:</span> FBS seasons from the coach&apos;s official bio where (1) that season&apos;s official staff page lists him as the only coordinator on that
            side, (2) a cited source shows the head coach did not call that side (his own bio says he called plays, or the head coach&apos;s bio has no coordinator role on that side), and (3) the
            head coach and coordinator stayed put all season, bowl included. Anything unclear is left out and shown greyed in his history with the reason.
          </li>
          <li>
            <span className="text-fg">Who gets ranked:</span> 5+ credited seasons in the 10-year view (2016–25) or 3+ in the 5-year view (2021–25). Each season counts once.
          </li>
          <li>
            <span className="text-fg">The numbers</span> are the {side}&apos;s season values from the HASHMARK ridge model, same as /stats (opponent-adjusted EPA per play, success rate and explosiveness
            over FBS-vs-FBS games), plus points per drive and the unit&apos;s FBS rank on adjusted EPA. {unit === "def" ? "For defenses, lower is better on every stat." : ""} 2026 to date is shown
            in each history as context and is not part of the ranking.
          </li>
        </ul>
      </Panel>

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex max-w-full shrink-0 rounded-xl bg-raised p-1" role="tablist" aria-label="Side of the ball">
          {(["off", "def"] as const).map((u) => (
            <Link
              key={u}
              to="/coordinators"
              search={coordSearch(u, w, "epa", "best")}
              resetScroll={false}
              role="tab"
              aria-selected={unit === u}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors sm:flex-none",
                unit === u ? "bg-fg text-bg" : "text-muted hover:text-fg",
              )}
            >
              {UNIT_LABEL[u]}
            </Link>
          ))}
        </div>
        <div className="flex max-w-full shrink-0 rounded-xl bg-raised p-1" role="group" aria-label="Window">
          {(["10y", "5y"] as const).map((k) => (
            <Link
              key={k}
              to="/coordinators"
              search={coordSearch(unit, k, sort, dir)}
              resetScroll={false}
              aria-pressed={w === k}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors sm:flex-none",
                w === k ? "bg-fg text-bg" : "text-muted hover:text-fg",
              )}
            >
              {WINDOWS[k].label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-3 rounded-xl bg-inset px-4 py-3 text-sm">
        <p>
          <span className="font-medium" data-testid="qualify-count">
            {counts.ranked} of {counts.total} current Power 4 {UNIT_SHORT[unit]}s qualify
          </span>
          <span className="text-muted">
            {" "}
            for the {win.label} view ({win.min}+ credited seasons). Sorted by {COL_META[sort].l}, {dir === "best" ? "best first" : "worst first"}.
          </span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">Small counts are the honest result of the verification rules, not a cutoff. Tap a coach for every season, with sources.</p>
      </div>

      <Panel className="p-0 sm:p-0">
        <ol className="divide-y divide-border lg:hidden">
          {rows.map((r) => {
            const k = `${unit}|${r.coach.name}`;
            return (
              <li key={k} className="px-4 py-3" data-testid="coord-card">
                <button type="button" onClick={() => toggle(k)} aria-expanded={!!open[k]} className="flex w-full items-center gap-3 text-left">
                  <span className="w-6 shrink-0 text-right tabular text-sm text-faint">{r.rank}</span>
                  <CoachName c={r.coach} teams={teams} />
                  <span className="shrink-0 rounded-md bg-raised px-2 py-1 text-right">
                    <span className="block font-display text-xl leading-none tabular">{fmtCol(sort, r.sum[sort])}</span>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-fg/80">{COL_META[sort].s}</span>
                  </span>
                </button>
                <dl className="mt-2 grid grid-cols-3 gap-1 pl-9 text-xs">
                  {COORD_COLS.filter((c) => c !== sort).map((c) => (
                    <div key={c} className="min-w-0 rounded bg-raised/60 px-1.5 py-1">
                      <dt className="truncate text-[10px] uppercase tracking-wide text-fg/80">{COL_META[c].s}</dt>
                      <dd className="tabular text-fg/90">{fmtCol(c, r.sum[c])}</dd>
                    </div>
                  ))}
                </dl>
                <button type="button" onClick={() => toggle(k)} aria-expanded={!!open[k]} className="mt-2 ml-9 inline-flex h-9 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border">
                  {open[k] ? "Hide history" : "Season-by-season history"}
                </button>
                {open[k] ? <History c={r.coach} w={w} now={now[k] ?? null} asOf={asOf2026} tn={tn} /> : null}
              </li>
            );
          })}
        </ol>
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="w-12 px-3 py-2 text-right font-medium">#</th>
                <th className="px-3 py-2 font-medium">Coordinator · team now</th>
                {COORD_COLS.map((c, i) => (
                  <HeaderCell key={c} col={c} unit={unit} w={w} sort={sort} dir={dir} alignRight={i >= COORD_COLS.length - 2} />
                ))}
                <th className="px-3 py-2 text-right font-medium">History</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const k = `${unit}|${r.coach.name}`;
                return (
                  <Fragment key={k}>
                    <tr className="border-b border-border/60 hover:bg-raised/60" data-testid="coord-row">
                      <td className="px-3 py-2 text-right tabular text-faint">{r.rank}</td>
                      <td className="max-w-[22rem] px-3 py-2">
                        <CoachName c={r.coach} teams={teams} />
                      </td>
                      {COORD_COLS.map((c) => (
                        <td key={c} className={cn("whitespace-nowrap px-2 py-2 text-right tabular", c === sort ? "font-semibold text-fg" : "text-fg/90")}>
                          {fmtCol(c, r.sum[c])}
                        </td>
                      ))}
                      <td className="px-3 py-2 text-right">
                        <button type="button" onClick={() => toggle(k)} aria-expanded={!!open[k]} className="inline-flex h-8 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border">
                          {open[k] ? "Hide" : "Show"}
                        </button>
                      </td>
                    </tr>
                    {open[k] ? (
                      <tr className="border-b border-border/60 bg-inset/40">
                        <td />
                        <td colSpan={COORD_COLS.length + 2} className="max-w-0 px-3 pb-4">
                          <History c={r.coach} w={w} now={now[k] ?? null} asOf={asOf2026} tn={tn} />
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? <p className="px-4 py-10 text-center text-muted">No current {UNIT_SHORT[unit]} has enough credited seasons for this view.</p> : null}
      </Panel>

      <Panel className="mt-4">
        <h2 className="font-display text-lg">Not ranked in this view</h2>
        <p className="mt-1 text-sm text-muted">
          {unranked.length} current Power 4 {UNIT_SHORT[unit]}s have fewer than {win.min} credited seasons in {win.from}–{String(win.to).slice(2)}: new coordinators, co-coordinator years, head
          coaches who call that side, or seasons without an official staff page all leave a season uncredited.
        </p>
        <ul className="mt-3 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {unranked.map((p) => (
            <li key={`${p.team}|${p.name}`} className="truncate text-fg/90">
              {p.name} <span className="text-muted">· {tn(p.team)}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <p className="mt-4 text-xs leading-relaxed text-muted">{file.source} Built {file.built}. 2026 to date uses the /stats team board through {asOf2026}.</p>
    </div>
  );
}

function CoachName({ c, teams }: { c: CoachRecord; teams: Teams }) {
  const t = teams[c.team];
  return (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      <TeamMark slug={c.team} color={t?.color ?? "#888888"} />
      <span className="min-w-0">
        <span className="block truncate font-medium">{c.name}</span>
        <span className="block truncate text-xs text-muted">
          {t?.name ?? c.team} · {c.title}
        </span>
      </span>
    </span>
  );
}

function HeaderCell({ col, unit, w, sort, dir, alignRight }: { col: CoordCol; unit: Unit; w: WindowKey; sort: CoordCol; dir: CoordDir; alignRight: boolean }) {
  const m = COL_META[col];
  const active = sort === col;
  const nextDir: CoordDir = active && dir === "best" ? "worst" : "best";
  const hi = higherIsBetter(unit, col);
  return (
    <th className="group/th relative px-2 py-2 text-right font-medium" aria-sort={active ? ((hi ? dir === "best" : dir === "worst") ? "descending" : "ascending") : undefined}>
      <Link
        to="/coordinators"
        search={coordSearch(unit, w, col, nextDir)}
        resetScroll={false}
        title={m.l}
        className={cn(
          "inline-flex min-h-8 items-center justify-end gap-1 whitespace-nowrap underline decoration-dotted decoration-faint underline-offset-4 hover:text-fg",
          active ? "text-fg decoration-fg" : "text-muted",
        )}
      >
        {m.s}
        <span aria-hidden className={cn("text-[10px]", active ? "opacity-100" : "opacity-0 group-hover/th:opacity-40")}>
          {active && dir === "worst" ? "▲" : "▼"}
        </span>
      </Link>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute top-full z-40 mt-1 hidden w-56 rounded-lg border border-border bg-raised p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg shadow-xl group-hover/th:block group-focus-within/th:block",
          alignRight ? "right-0" : "left-0",
        )}
      >
        <span className="block font-medium">{m.l}</span>
        <span className="mt-1 block text-muted">{m.def}</span>
        <span className="mt-1 block text-faint">{hi ? "higher is better" : "lower is better"}</span>
      </span>
    </th>
  );
}

function History({ c, w, now, asOf, tn }: { c: CoachRecord; w: WindowKey; now: Season2026 | null; asOf: string; tn: (s: string, f?: string) => string }) {
  const rows = [...c.history].sort((a, b) => b.season - a.season);
  return (
    <div className="mt-3 space-y-2" data-testid="coord-history">
      {now ? (
        <div className="rounded-lg border border-border/70 px-3 py-2 text-xs">
          <p className="font-medium text-fg">
            2026 to date · {tn(c.team)} {c.unit === "off" ? "offense" : "defense"} <span className="font-normal text-muted">(context only, not ranked; through {asOf})</span>
          </p>
          <p className="mt-1 tabular text-fg/90">
            Adj EPA/play {fmtCol("epa", now.epa)} · FBS #{now.rank} of {now.n} · Success {now.sr == null ? "—" : `${now.sr.toFixed(1)}%`} · Explosiveness {fmtCol("xpl", now.xpl)}
            {now.games ? ` · ${now.games} games` : ""}
          </p>
        </div>
      ) : null}
      <ol className="divide-y divide-border/50 rounded-lg border border-border/70">
        {rows.map((h) => (
          <HistoryLine key={`${h.team}${h.season}`} h={h} inWin={inWindow(h.season, w)} tn={tn} />
        ))}
      </ol>
      <p className="text-[11px] text-faint">
        Stops from his{" "}
        <a href={c.bioUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
          official bio
        </a>
        . FBS seasons 2016–25 only. Greyed seasons are not credited.
      </p>
    </div>
  );
}

function HistoryLine({ h, inWin, tn }: { h: HistoryRow; inWin: boolean; tn: (s: string, f?: string) => string }) {
  const ok = h.status === "verified";
  const s = h.stats;
  return (
    <li className={cn("px-3 py-2 text-xs", ok ? "" : "text-faint")} data-status={h.status}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={cn("w-10 tabular font-medium", ok ? "text-fg" : "")}>{h.season}</span>
        <span className={cn("min-w-28", ok ? "text-fg" : "")}>{tn(h.team, h.school)}</span>
        {s ? (
          <span className={cn("tabular", ok ? "text-fg/90" : "")}>
            {fmtCol("epa", s.epa)} adj EPA · FBS #{s.rank} of {s.nFbs} · {s.sr == null ? "—" : `${s.sr.toFixed(1)}%`} success · {fmtCol("ppd", s.ppd)} pts/drive · {fmtCol("xpl", s.xpl)} XPL
          </span>
        ) : (
          <span>no FBS unit numbers</span>
        )}
        <span className={cn("rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide", ok ? "bg-raised text-fg/80" : "bg-raised/50")}>
          {ok ? (inWin ? "credited" : "credited · outside window") : "not credited"}
        </span>
      </div>
      <p className="mt-1 leading-relaxed sm:pl-[3.25rem]">
        {ok ? (
          <>
            Head coach {h.headCoach}. {h.hcNote}{" "}
          </>
        ) : (
          <>{h.reasons?.join("; ")}. </>
        )}
        {h.staffUrl ? (
          <a href={h.staffUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
            {h.season} staff page
          </a>
        ) : null}
        {ok && h.hcUrl ? (
          <>
            {" · "}
            <a href={h.hcUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
              play-caller source
            </a>
          </>
        ) : null}
      </p>
    </li>
  );
}

