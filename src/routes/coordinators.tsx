import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useMemo, useState } from "react";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import {
  buildBoard2026,
  buildBoard3y,
  COL_META,
  colsFor,
  coordSearch,
  fmtCol,
  higherIsBetter,
  labelCounts,
  LABEL_TEXT,
  parseCoordDir,
  parseCoordSort,
  parseUnit,
  parseView,
  qualifies3y,
  UNIT_LABEL,
  UNIT_SHORT,
  UNIT_SIDE,
  VIEWS,
  whoLine,
  type Board2026Row,
  type CoachRecord,
  type CoordCol,
  type CoordDir,
  type HistoryRow,
  type SeasonStats,
  type Unit,
  type Unit2026,
  type ViewKey,
} from "@/lib/cfb/coordinators";
import { getCoordinators } from "@/lib/cfb/stats-queries";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { view?: ViewKey; unit?: Unit; sort?: CoordCol; dir?: CoordDir };
type Teams = Record<string, { name: string; color: string }>;
type TN = (slug: string) => string;

export const Route = createFileRoute("/coordinators")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const view = parseView(s.view);
    return coordSearch(view, parseUnit(s.unit), parseCoordSort(s.sort, view), parseCoordDir(s.dir));
  },
  loader: () => getCoordinators(),
  component: CoordinatorsPage,
  head: () =>
    seo({
      path: "/coordinators",
      title: "Best coordinators by production · every FBS OC and DC, 2026 and 2024–26 · HASHMARK",
      description:
        "Every FBS offense and defense ranked by opponent-adjusted EPA per play, with the coordinator each school lists, plus a 2024–26 average for current coordinators. A production board for offseason hiring. Track record of the units, not a coach rating.",
      image: "/og/coordinators.jpg",
    }),
});

function CoordinatorsPage() {
  const data = Route.useLoaderData();
  const { units2026, prior2025, coaches, live, talent, asOf2026, teams } = data;
  const search = Route.useSearch();
  const view = search.view ?? "2026";
  const unit = search.unit ?? "off";
  const sort = search.sort ?? "epa";
  const dir = search.dir ?? "best";
  const tn: TN = (slug) => teams[slug]?.name ?? slug;
  const byCoach = useMemo(() => new Map(coaches.map((c) => [`${c.unit}|${c.team}|${c.name}`, c])), [coaches]);

  return (
    <div>
      <PageHead
        kicker={`Production board · every FBS offense and defense · through ${asOf2026}`}
        title="Best coordinators"
        lede="Who is producing right now, and who has done it for more than one year. Every FBS unit is ranked on what it produced, with the coordinator the school lists for it: a gauge for offseason hiring. Track record of the units they ran, not a coach rating. HX stays the only team rating on HASHMARK."
      />

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex max-w-full shrink-0 rounded-xl bg-raised p-1" role="tablist" aria-label="Side of the ball">
          {(["off", "def"] as const).map((u) => (
            <Link
              key={u}
              to="/coordinators"
              search={coordSearch(view, u, "epa", "best")}
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
        <div className="flex max-w-full shrink-0 rounded-xl bg-raised p-1" role="group" aria-label="View">
          {(["2026", "3y"] as const).map((k) => (
            <Link
              key={k}
              to="/coordinators"
              search={coordSearch(k, unit, "epa", "best")}
              resetScroll={false}
              aria-pressed={view === k}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors sm:flex-none sm:px-4",
                view === k ? "bg-fg text-bg" : "text-muted hover:text-fg",
              )}
            >
              {VIEWS[k].label}
            </Link>
          ))}
        </div>
      </div>

      {view === "2026" ? (
        <Board2026 units={units2026} live={live} prior={prior2025} talent={talent} unit={unit} sort={sort} dir={dir} teams={teams} tn={tn} byCoach={byCoach} asOf={asOf2026} />
      ) : (
        <Board3y coaches={coaches} units={units2026} unit={unit} sort={sort} dir={dir} teams={teams} tn={tn} />
      )}

      <Method unit={unit} />
      <p className="mt-4 text-xs leading-relaxed text-muted">
        {data.source} Built {data.built}. 2026 numbers use the /stats team board through {asOf2026}.
      </p>
    </div>
  );
}

function Board2026({
  units,
  live,
  prior,
  talent,
  unit,
  sort,
  dir,
  teams,
  tn,
  byCoach,
  asOf,
}: {
  units: Unit2026[];
  live: Parameters<typeof buildBoard2026>[1];
  prior: Parameters<typeof buildBoard2026>[2];
  talent: Record<string, number>;
  unit: Unit;
  sort: CoordCol;
  dir: CoordDir;
  teams: Teams;
  tn: TN;
  byCoach: Map<string, CoachRecord>;
  asOf: string;
}) {
  const rows = useMemo(() => buildBoard2026(units, live, prior, talent, unit, sort, dir), [units, live, prior, talent, unit, sort, dir]);
  const lc = labelCounts(units, unit);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const cols = colsFor("2026");
  const ranked = rows.filter((r) => r.rank > 0).length;
  return (
    <>
      <div className="mb-3 rounded-xl bg-inset px-4 py-3 text-sm">
        <p>
          <span className="font-medium" data-testid="board-count">
            All {ranked} FBS {UNIT_SIDE[unit]}s ranked on 2026 production
          </span>
          <span className="text-muted">
            {" "}
            · {lc.sole} with one listed {UNIT_SHORT[unit]}
            {lc["with-co"] ? ` · ${lc["with-co"]} ${UNIT_SHORT[unit]} plus a co-${UNIT_SHORT[unit]}` : ""}
            {lc.co ? ` · ${lc.co} co-${UNIT_SHORT[unit]}s only` : ""}
            {lc["hc-title"] + lc["hc-calls"] ? ` · ${lc["hc-title"] + lc["hc-calls"]} head-coach-run` : ""}
            {lc.interim ? ` · ${lc.interim} interim` : ""}
            {lc.unverified ? ` · ${lc.unverified} unverified` : ""}. Sorted by {COL_META[sort].l}, {dir === "best" ? "best first" : "worst first"}.
          </span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">Labeled units stay on the board so the list is complete. Tap a unit for sources, last season, and the coordinator&apos;s 2024–26 record.</p>
      </div>
      <Panel className="p-0 sm:p-0">
        <ol className="divide-y divide-border lg:hidden">
          {rows.map((r) => {
            const k = `${unit}|${r.u.team}`;
            return (
              <li key={k} className="px-4 py-3" data-testid="coord-card">
                <button type="button" onClick={() => toggle(k)} aria-expanded={!!open[k]} className="flex w-full items-center gap-3 text-left">
                  <span className="w-7 shrink-0 text-right tabular text-sm text-faint">{r.rank || "—"}</span>
                  <UnitName u={r.u} teams={teams} />
                  <span className="shrink-0 rounded-md bg-raised px-2 py-1 text-right">
                    <span className="block font-display text-xl leading-none tabular">{fmtCol(sort, r.v[sort])}</span>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-fg/80">{COL_META[sort].s}</span>
                  </span>
                </button>
                <dl className="mt-2 grid grid-cols-3 gap-1 pl-10 text-xs">
                  {cols
                    .filter((c) => c !== sort)
                    .map((c) => (
                      <div key={c} className="min-w-0 rounded bg-raised/60 px-1.5 py-1">
                        <dt className="truncate text-[10px] uppercase tracking-wide text-fg/80">{COL_META[c].s}</dt>
                        <dd className="tabular text-fg/90">{fmtCol(c, r.v[c])}</dd>
                      </div>
                    ))}
                </dl>
                <button type="button" onClick={() => toggle(k)} aria-expanded={!!open[k]} className="mt-2 ml-10 inline-flex h-9 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border">
                  {open[k] ? "Hide details" : "Sources & record"}
                </button>
                {open[k] ? <UnitDetail r={r} prior={prior[r.u.team]?.[unit] ?? null} tn={tn} byCoach={byCoach} asOf={asOf} /> : null}
              </li>
            );
          })}
        </ol>
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="w-12 px-3 py-2 text-right font-medium">#</th>
                <th className="px-3 py-2 font-medium">Unit · coordinator</th>
                {cols.map((c, i) => (
                  <HeaderCell key={c} col={c} unit={unit} view="2026" sort={sort} dir={dir} alignRight={i >= cols.length - 2} />
                ))}
                <th className="px-3 py-2 text-right font-medium">More</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const k = `${unit}|${r.u.team}`;
                return (
                  <Fragment key={k}>
                    <tr className="border-b border-border/60 hover:bg-raised/60" data-testid="coord-row">
                      <td className="px-3 py-2 text-right tabular text-faint">{r.rank || "—"}</td>
                      <td className="max-w-[24rem] px-3 py-2">
                        <UnitName u={r.u} teams={teams} />
                      </td>
                      {cols.map((c) => (
                        <td key={c} className={cn("whitespace-nowrap px-2 py-2 text-right tabular", c === sort ? "font-semibold text-fg" : "text-fg/90")}>
                          {fmtCol(c, r.v[c])}
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
                        <td colSpan={cols.length + 2} className="max-w-0 px-3 pb-4">
                          <UnitDetail r={r} prior={prior[r.u.team]?.[unit] ?? null} tn={tn} byCoach={byCoach} asOf={asOf} />
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function LabelChip({ u }: { u: Unit2026 }) {
  if (u.label === "sole") return null;
  const tone = u.label === "unverified" ? "border-dashed text-muted" : "text-fg/80";
  const text = u.label === "with-co" ? `+ co-${UNIT_SHORT[u.unit]} ${u.coaches.slice(1).map((c) => c.name.split(" ").slice(-1)[0]).join(", ")}` : LABEL_TEXT[u.label];
  return <span className={cn("ml-1.5 inline-block whitespace-nowrap rounded border border-border px-1.5 py-px align-middle text-[10px] uppercase tracking-wide", tone)}>{text}</span>;
}

function UnitName({ u, teams }: { u: Unit2026; teams: Teams }) {
  const t = teams[u.team];
  return (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      <TeamMark slug={u.team} color={t?.color ?? "#888888"} />
      <span className="min-w-0">
        <span className="block truncate font-medium">
          {u.coaches.length ? whoLine(u) : <span className="text-muted">No coordinator listed</span>}
          {u.since === 2026 ? <span className="ml-1.5 align-middle text-[10px] uppercase tracking-wide text-accent">1st year</span> : null}
        </span>
        <span className="block truncate text-xs text-muted">
          {t?.name ?? u.team} {UNIT_SIDE[u.unit]}
          <LabelChip u={u} />
        </span>
      </span>
    </span>
  );
}

function statLine(s: SeasonStats | null | undefined, ppdOrPpg: "ppd" | "ppg") {
  if (!s) return "no FBS unit numbers";
  const pts = ppdOrPpg === "ppd" ? (s.ppd != null ? ` · ${s.ppd.toFixed(2)} pts/drive` : "") : s.ppg != null ? ` · ${s.ppg.toFixed(1)} pts/game` : "";
  return `${fmtCol("epa", s.epa)} adj EPA · FBS #${s.rank ?? "—"} of ${s.nFbs} · ${s.sr == null ? "—" : `${(s.sr > 1 ? s.sr : s.sr * 100).toFixed(1)}%`} success · ${fmtCol("xpl", s.xpl)} XPL${pts}`;
}

function UnitDetail({ r, prior, tn, byCoach, asOf }: { r: Board2026Row; prior: SeasonStats | null; tn: TN; byCoach: Map<string, CoachRecord>; asOf: string }) {
  const u = r.u;
  const recs = u.coaches.map((c) => byCoach.get(`${u.unit}|${u.team}|${c.name}`)).filter((c): c is CoachRecord => !!c);
  const lr = r.live;
  return (
    <div className="mt-3 space-y-2 text-xs" data-testid="coord-detail">
      <div className="rounded-lg border border-border/70 px-3 py-2 leading-relaxed">
        <p className="font-medium text-fg">Who runs it</p>
        {u.coaches.length ? (
          <ul className="mt-1 space-y-0.5">
            {u.coaches.map((c) => (
              <li key={c.name}>
                <span className="text-fg">{c.name}</span> <span className="text-muted">· {c.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-muted">The school&apos;s 2026 staff page lists no {u.unit === "off" ? "offensive" : "defensive"} coordinator.</p>
        )}
        {u.label !== "sole" ? <p className="mt-1 text-muted">{LABEL_TEXT[u.label]}{u.note ? `: ${u.note}` : "."}</p> : u.note ? <p className="mt-1 text-muted">{u.note}</p> : null}
        {u.hcSource ? (
          <p className="mt-1 text-muted">
            &ldquo;{u.hcSource.quote}&rdquo;{" "}
            <a href={u.hcSource.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
              source
            </a>
          </p>
        ) : null}
        {u.since != null ? <p className="mt-1 text-muted">{u.since === 2026 ? "First season in this role here." : u.since <= 2024 ? "In this role here since 2024 or earlier (official staff pages)." : `In this role here since ${u.since} (official staff pages).`}</p> : null}
        {u.staffUrl ? (
          <a href={u.staffUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block underline underline-offset-2 hover:text-fg">
            2026 staff page
          </a>
        ) : null}
      </div>
      <div className="rounded-lg border border-border/70 px-3 py-2 leading-relaxed">
        <p className="tabular text-fg/90">
          <span className="font-medium text-fg">2026</span> · {lr ? statLine({ ...lr, nFbs: lr.n }, "ppg") : "no adjusted numbers yet"}
          {lr?.games ? ` · ${lr.games} games` : ""} <span className="text-faint">(through {asOf})</span>
        </p>
        <p className="mt-0.5 tabular text-muted">
          <span className="text-fg/80">2025, same school</span> · {statLine(prior, "ppd")}
        </p>
        {r.talent != null && lr?.rank ? (
          <p className="mt-0.5 text-muted">
            Roster talent #{r.talent} (247 composite) vs {UNIT_SIDE[u.unit]} #{lr.rank}: {lr.rank < r.talent ? `producing ${r.talent - lr.rank} spots above` : lr.rank > r.talent ? `${lr.rank - r.talent} spots below` : "level with"} its talent rank.
          </p>
        ) : null}
      </div>
      {recs.map((c) => (
        <div key={c.name}>
          <p className="mb-1 font-medium text-fg">
            {c.name}, 2024–26 {qualifies3y(c) ? "" : <span className="font-normal text-muted">(not enough credited seasons for the 3-year board)</span>}
          </p>
          <History c={c} tn={tn} />
        </div>
      ))}
    </div>
  );
}

function Board3y({ coaches, units, unit, sort, dir, teams, tn }: { coaches: CoachRecord[]; units: Unit2026[]; unit: Unit; sort: CoordCol; dir: CoordDir; teams: Teams; tn: TN }) {
  const rows = useMemo(() => buildBoard3y(coaches, unit, sort, dir), [coaches, unit, sort, dir]);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const cols = colsFor("3y");
  const pool = coaches.filter((c) => c.unit === unit);
  const unranked = pool.filter((c) => !qualifies3y(c)).sort((a, b) => a.team.localeCompare(b.team));
  const unitOf = new Map(units.map((u) => [`${u.unit}|${u.team}`, u]));
  return (
    <>
      <div className="mb-3 rounded-xl bg-inset px-4 py-3 text-sm">
        <p>
          <span className="font-medium" data-testid="board-count">
            {rows.length} of {pool.length} current {UNIT_SHORT[unit]}s ranked on 2024–26 production
          </span>
          <span className="text-muted">
            {" "}
            ({VIEWS["3y"].min}+ credited seasons; each season counts once). Sorted by {COL_META[sort].l}, {dir === "best" ? "best first" : "worst first"}.
          </span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          A season counts when that year&apos;s official staff page lists him with the full {UNIT_SHORT[unit]} title at that school (a co-{UNIT_SHORT[unit]} may also be listed). 2026 counts to date. Tap a coach for every season with sources.
        </p>
      </div>
      <Panel className="p-0 sm:p-0">
        <ol className="divide-y divide-border lg:hidden">
          {rows.map((r) => {
            const k = `${unit}|${r.coach.name}`;
            return (
              <li key={k} className="px-4 py-3" data-testid="coord-card">
                <button type="button" onClick={() => toggle(k)} aria-expanded={!!open[k]} className="flex w-full items-center gap-3 text-left">
                  <span className="w-7 shrink-0 text-right tabular text-sm text-faint">{r.rank}</span>
                  <CoachName c={r.coach} teams={teams} u={unitOf.get(`${unit}|${r.coach.team}`)} />
                  <span className="shrink-0 rounded-md bg-raised px-2 py-1 text-right">
                    <span className="block font-display text-xl leading-none tabular">{fmtCol(sort, r.v[sort])}</span>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-fg/80">{COL_META[sort].s}</span>
                  </span>
                </button>
                <dl className="mt-2 grid grid-cols-4 gap-1 pl-10 text-xs">
                  {cols
                    .filter((c) => c !== sort)
                    .map((c) => (
                      <div key={c} className="min-w-0 rounded bg-raised/60 px-1.5 py-1">
                        <dt className="truncate text-[10px] uppercase tracking-wide text-fg/80">{COL_META[c].s}</dt>
                        <dd className="tabular text-fg/90">{fmtCol(c, r.v[c])}</dd>
                      </div>
                    ))}
                </dl>
                <button type="button" onClick={() => toggle(k)} aria-expanded={!!open[k]} className="mt-2 ml-10 inline-flex h-9 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border">
                  {open[k] ? "Hide history" : "Season-by-season history"}
                </button>
                {open[k] ? <History c={r.coach} tn={tn} /> : null}
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
                {cols.map((c, i) => (
                  <HeaderCell key={c} col={c} unit={unit} view="3y" sort={sort} dir={dir} alignRight={i >= cols.length - 2} />
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
                      <td className="max-w-[24rem] px-3 py-2">
                        <CoachName c={r.coach} teams={teams} u={unitOf.get(`${unit}|${r.coach.team}`)} />
                      </td>
                      {cols.map((c) => (
                        <td key={c} className={cn("whitespace-nowrap px-2 py-2 text-right tabular", c === sort ? "font-semibold text-fg" : "text-fg/90")}>
                          {fmtCol(c, r.v[c])}
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
                        <td colSpan={cols.length + 2} className="max-w-0 px-3 pb-4">
                          <History c={r.coach} tn={tn} />
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? <p className="px-4 py-10 text-center text-muted">No current {UNIT_SHORT[unit]} has enough credited seasons yet.</p> : null}
      </Panel>
      {unranked.length ? (
        <Panel className="mt-4">
          <h2 className="font-display text-lg">Current {UNIT_SHORT[unit]}s with one credited season</h2>
          <p className="mt-1 text-sm text-muted">
            First-year coordinators, co-coordinator years, and seasons without an official staff page leave only 2026. They are on the 2026 board.
          </p>
          <ul className="mt-3 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {unranked.map((c) => (
              <li key={`${c.team}|${c.name}`} className="truncate text-fg/90">
                {c.name} <span className="text-muted">· {tn(c.team)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}
    </>
  );
}

function CoachName({ c, teams, u }: { c: CoachRecord; teams: Teams; u?: Unit2026 }) {
  const t = teams[c.team];
  return (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      <TeamMark slug={c.team} color={t?.color ?? "#888888"} />
      <span className="min-w-0">
        <span className="block truncate font-medium">{c.name}</span>
        <span className="block truncate text-xs text-muted">
          {t?.name ?? c.team} · {c.title}
          {u ? <LabelChip u={u} /> : null}
        </span>
      </span>
    </span>
  );
}

function HeaderCell({ col, unit, view, sort, dir, alignRight }: { col: CoordCol; unit: Unit; view: ViewKey; sort: CoordCol; dir: CoordDir; alignRight: boolean }) {
  const m = COL_META[col];
  const active = sort === col;
  const nextDir: CoordDir = active && dir === "best" ? "worst" : "best";
  const hi = higherIsBetter(unit, col);
  return (
    <th className="group/th relative px-2 py-2 text-right font-medium" aria-sort={active ? ((hi ? dir === "best" : dir === "worst") ? "descending" : "ascending") : undefined}>
      <Link
        to="/coordinators"
        search={coordSearch(view, unit, col, nextDir)}
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
          "pointer-events-none absolute top-full z-40 mt-1 hidden w-60 rounded-lg border border-border bg-raised p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg shadow-xl group-hover/th:block group-focus-within/th:block",
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

function History({ c, tn }: { c: CoachRecord; tn: TN }) {
  const rows = [...c.history].sort((a, b) => b.season - a.season);
  return (
    <div className="mt-2 space-y-2" data-testid="coord-history">
      <ol className="divide-y divide-border/50 rounded-lg border border-border/70">
        {rows.map((h) => (
          <HistoryLine key={`${h.team}${h.season}`} h={h} tn={tn} />
        ))}
      </ol>
      <p className="text-[11px] text-faint">FBS seasons 2024–26 from official season staff pages (live or archived). A missing year means he was not listed as a coordinator on an available FBS staff page that season. Greyed seasons are not credited.</p>
    </div>
  );
}

function HistoryLine({ h, tn }: { h: HistoryRow; tn: TN }) {
  const ok = h.status === "credited";
  return (
    <li className={cn("px-3 py-2 text-xs", ok ? "" : "text-faint")} data-status={h.status}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={cn("w-10 tabular font-medium", ok ? "text-fg" : "")}>{h.season}</span>
        <span className={cn("min-w-28", ok ? "text-fg" : "")}>{tn(h.team)}</span>
        <span className={cn("tabular", ok ? "text-fg/90" : "")}>{statLine(h.stats, h.season === 2026 ? "ppg" : "ppd")}</span>
        <span className={cn("rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide", ok ? "bg-raised text-fg/80" : "bg-raised/50")}>{ok ? "credited" : "not credited"}</span>
      </div>
      <p className="mt-1 leading-relaxed sm:pl-[3.25rem]">
        {h.title ? <>{h.title}. </> : null}
        {!ok && h.reasons?.length ? <>{h.reasons.join("; ")}. </> : null}
        {ok && h.playcall ? <>{h.playcall} </> : null}
        {h.staffUrl ? (
          <a href={h.staffUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
            {h.season} staff page
          </a>
        ) : null}
      </p>
    </li>
  );
}

function Method({ unit }: { unit: Unit }) {
  return (
    <Panel className="mt-4">
      <details>
        <summary className="cursor-pointer font-display text-lg">How it works</summary>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
          <li>
            <span className="text-fg">Production, not reputation:</span> units are ranked on opponent-adjusted EPA per play from the HASHMARK ridge model (same as /stats, FBS-vs-FBS games), with
            success rate, explosiveness and points as support. {unit === "def" ? "For defenses, lower is better on EPA, success rate, explosiveness and points." : ""} No composite score.
          </li>
          <li>
            <span className="text-fg">2026 board:</span> every FBS {UNIT_SIDE[unit]}. The coordinator is whoever the school&apos;s official 2026 staff page lists. Co-coordinators, head coaches who hold the
            title or are documented play-callers (with a cited source), interim setups, and units with no listed or confirmed coordinator are labeled, not dropped. &ldquo;vs 2025&rdquo; is the same
            school&apos;s unit last season; for a first-year coordinator that is the unit he inherited. Talent rank is the 247 Team Talent Composite, for context.
          </li>
          <li>
            <span className="text-fg">3-year board (2024–26):</span> current coordinators only. A season counts when that year&apos;s official staff page (live or archived) lists him holding the
            full coordinator title on that side at that school (a co-coordinator may also be listed), the school had one head coach that season (2024–25), and the head coach is not documented
            calling that side. Seasons where he was only a co-coordinator, missing staff pages and head-coach play-caller seasons are shown greyed with the reason. Each credited season counts once (equal weight); 2026 counts to date; 2 credited seasons to be ranked.
          </li>
          <li>
            <span className="text-fg">Limits:</span> a staff page is a snapshot, so a mid-season change can hide behind it. Titles say who holds the job, not always who calls every play. Treat
            this as the track record of the units they ran, not a coach rating.
          </li>
        </ul>
      </details>
    </Panel>
  );
}
