import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import {
  COL_LABEL,
  coachSearch,
  deltas,
  parseCol,
  parseDir,
  parseView,
  pctText,
  recordText,
  signed,
  tone,
  viewRows,
  yearsText,
  type CoachCol,
  type CoachDir,
  type CoachRow,
  type CoachView,
  type SeasonRow,
  type Window,
} from "@/lib/cfb/coaches";
import { getCoaches } from "@/lib/cfb/stats-queries";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { view?: CoachView; sort?: CoachCol; dir?: CoachDir; team?: string };
type Info = Record<string, { name: string; color: string; conference: string; hxRank: number | null }>;

export const Route = createFileRoute("/coaches")({
  validateSearch: (s: Record<string, unknown>): Search =>
    coachSearch(parseView(s.view), parseCol(s.sort), parseDir(s.dir), typeof s.team === "string" ? s.team.slice(0, 60) : undefined),
  loader: () => getCoaches(),
  component: CoachesPage,
  head: () =>
    seo({
      path: "/coaches",
      title: "Head coach before and after · every FBS head coach, program record, recruiting and talent · HASHMARK",
      description:
        "Each current FBS head coach's program in the seasons before he arrived next to the same number of seasons under him: win percentage, recruiting class rank, 247 talent rank and opponent-adjusted EPA. Side-by-side changes with sources, not a coach rating.",
    }),
});

const SORTS: CoachCol[] = ["win", "rec", "tal", "epa", "tenure", "name", "school"];

function CoachesPage() {
  const { file, teams } = Route.useLoaderData();
  const search = Route.useSearch();
  const view = search.view ?? "compared";
  const sort = search.sort ?? "win";
  const dir = search.dir ?? "best";
  const focus = search.team;
  const navigate = useNavigate();
  const rows = useMemo(() => viewRows(file, view, sort, dir), [file, view, sort, dir]);
  const nCompared = file.coaches.filter((c) => c.status === "compared").length;
  const nNew = file.coaches.filter((c) => c.status === "too-new").length;
  const nNone = file.coaches.filter((c) => c.status === "no-before").length;
  const [open, setOpen] = useState<Record<string, boolean>>(focus ? { [focus]: true } : {});
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  useEffect(() => {
    if (!focus) return;
    setOpen((o) => ({ ...o, [focus]: true }));
    const t = setTimeout(() => [...document.querySelectorAll<HTMLElement>(`[data-coach="${focus}"]`)].find((el) => el.offsetParent !== null)?.scrollIntoView({ block: "start" }), 60);
    return () => clearTimeout(t);
  }, [focus]);

  return (
    <div>
      <PageHead
        kicker={`Every current FBS head coach · seasons through ${file.lastCompleted} · built ${file.built}`}
        title="Head coach before and after"
        lede="For each coach, the program in the seasons before he arrived next to the same number of seasons under him: record, recruiting classes, roster talent and opponent-adjusted EPA, as side-by-side changes. Context, not a verdict: no coach score and no second rating. HX stays the only team rating on HASHMARK."
      />

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex max-w-full shrink-0 rounded-xl bg-raised p-1" role="group" aria-label="View">
          {(["compared", "all"] as const).map((k) => (
            <Link
              key={k}
              to="/coaches"
              search={coachSearch(k, sort, dir)}
              resetScroll={false}
              aria-pressed={view === k}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors sm:flex-none sm:px-4",
                view === k ? "bg-fg text-bg" : "text-muted hover:text-fg",
              )}
            >
              {k === "compared" ? `Compared (${nCompared})` : `All ${file.coaches.length} coaches`}
            </Link>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted lg:hidden">
          <span className="shrink-0">Sort by</span>
          <select
            value={sort}
            onChange={(e) => navigate({ to: "/coaches", search: coachSearch(view, parseCol(e.target.value), "best"), resetScroll: false })}
            className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-raised px-2 text-fg"
            aria-label="Sort by"
          >
            {SORTS.map((c) => (
              <option key={c} value={c}>
                {COL_LABEL[c]}
              </option>
            ))}
          </select>
          <Link
            to="/coaches"
            search={coachSearch(view, sort, dir === "best" ? "worst" : "best")}
            resetScroll={false}
            className="inline-flex h-10 shrink-0 items-center rounded-lg bg-raised px-3 text-fg"
          >
            {dir === "best" ? "Best first" : "Worst first"}
          </Link>
        </label>
      </div>

      <div className="mb-3 rounded-xl bg-inset px-4 py-3 text-sm">
        <p>
          <span className="font-medium" data-testid="coach-count">
            {view === "compared" ? `${nCompared} coaches compared` : `${file.coaches.length} coaches listed`}
          </span>
          <span className="text-muted">
            {" "}
            · {nNew} too new (under {file.minSeasons} completed seasons, listed under All) · {nNone} with no usable before window. Sorted by {COL_LABEL[sort]}
            {sort === "name" || sort === "school" ? "" : dir === "best" ? ", biggest improvement first" : ", biggest decline first"}.
          </span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Windows are matched: the same number of seasons (up to {file.maxMatch}) right before he arrived and right after. Green is better, red is worse. Tap a coach for the season-by-season rows, prior head-coaching stops and notes.
        </p>
      </div>

      <Panel className="p-0 sm:p-0">
        <ol className="divide-y divide-border lg:hidden">
          {rows.map((c) => (
            <CoachCard key={c.slug} c={c} teams={teams} open={!!open[c.slug]} toggle={() => toggle(c.slug)} />
          ))}
        </ol>
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-3 py-2 font-medium">
                  <SortLink col="name" label="Coach · school" view={view} sort={sort} dir={dir} />
                </th>
                <th className="px-2 py-2 font-medium">
                  <SortLink col="tenure" label="Window" view={view} sort={sort} dir={dir} />
                </th>
                <th className="px-2 py-2 text-right font-medium">
                  <SortLink col="win" label="Win %" view={view} sort={sort} dir={dir} />
                </th>
                <th className="px-2 py-2 text-right font-medium">
                  <SortLink col="rec" label="Class rank" view={view} sort={sort} dir={dir} />
                </th>
                <th className="px-2 py-2 text-right font-medium">
                  <SortLink col="tal" label="Talent rank" view={view} sort={sort} dir={dir} />
                </th>
                <th className="px-2 py-2 text-right font-medium">
                  <SortLink col="epa" label="Net adj EPA" view={view} sort={sort} dir={dir} />
                </th>
                <th className="px-2 py-2 text-right font-medium">HX now</th>
                <th className="px-3 py-2 text-right font-medium">More</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => {
                const t = teams[c.slug];
                return (
                  <Fragment key={c.slug}>
                    <tr data-coach={c.slug} className="scroll-mt-32 border-b border-border/60 align-top hover:bg-raised/60" data-testid="coach-row">
                      <td className="px-3 py-2">
                        <Who c={c} t={t} slug={c.slug} />
                      </td>
                      <td className="px-2 py-2 text-xs text-muted">{windowText(c)}</td>
                      <MetricCells c={c} />
                      <td className="px-2 py-2 text-right tabular text-fg/90">{t?.hxRank ? `#${t.hxRank}` : "—"}</td>
                      <td className="px-3 py-2 text-right">
                        <button type="button" onClick={() => toggle(c.slug)} aria-expanded={!!open[c.slug]} className="inline-flex h-8 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border">
                          {open[c.slug] ? "Hide" : "Show"}
                        </button>
                      </td>
                    </tr>
                    {open[c.slug] ? (
                      <tr className="border-b border-border/60 bg-inset/40">
                        <td colSpan={8} className="max-w-0 px-3 pb-4">
                          <Detail c={c} teams={teams} />
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

      <Method file={file} />
    </div>
  );
}

function windowText(c: CoachRow) {
  if (c.status === "compared" && c.before && c.after) return `${yearsText(c.before.years)} → ${yearsText(c.after.years)}`;
  if (c.status === "too-new") return c.completed ? `${c.completed} completed season, too new` : c.first >= 2026 ? "First year (2026)" : "No completed season";
  return "No before window";
}

function SortLink({ col, label, view, sort, dir }: { col: CoachCol; label: string; view: CoachView; sort: CoachCol; dir: CoachDir }) {
  const active = sort === col;
  const next = active ? (dir === "best" ? "worst" : "best") : "best";
  return (
    <Link to="/coaches" search={coachSearch(view, col, next)} resetScroll={false} className={cn("inline-flex items-center gap-1 hover:text-fg", active && "text-fg")}>
      {label}
      {active ? <span aria-hidden>{dir === "best" ? "▼" : "▲"}</span> : null}
    </Link>
  );
}

function Who({ c, t, slug }: { c: CoachRow; t?: Info[string]; slug: string }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <TeamMark slug={slug} color={t?.color ?? "#888888"} />
      <span className="min-w-0">
        <span className="block font-medium">
          {c.name}
          {c.status === "too-new" ? <Chip>too new</Chip> : null}
          {c.status === "no-before" ? <Chip>no before window</Chip> : null}
          {c.status === "compared" && c.notes.some((n) => n.startsWith("Started partway")) ? <Chip>started midseason</Chip> : null}
        </span>
        <span className="block text-xs text-muted">
          <Link to="/teams/$slug" params={{ slug }} className="underline-offset-2 hover:underline">
            {t?.name ?? c.school}
          </Link>{" "}
          · since {c.first}
        </span>
      </span>
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="ml-1.5 inline-block whitespace-nowrap rounded border border-dashed border-border px-1.5 py-px align-middle text-[10px] font-normal uppercase tracking-wide text-muted">{children}</span>;
}

function Cell({ before, after, delta, unit }: { before: string; after: string; delta: number | null; unit?: string }) {
  return (
    <span className="block leading-tight">
      <span className={cn("block font-display text-lg tabular", tone(delta, 0.0001))}>{unit === "pts" ? `${signed(delta, 1)} pts` : unit === "rank" ? `${delta == null ? "—" : delta > 0 ? "▲" : delta < 0 ? "▼" : ""} ${delta == null ? "" : Math.abs(delta).toFixed(1)}` : signed(delta, 3)}</span>
      <span className="block text-[11px] text-muted tabular">
        {before} → {after}
      </span>
    </span>
  );
}

function MetricCells({ c }: { c: CoachRow }) {
  const d = deltas(c);
  const b = c.before;
  const a = c.after;
  if (c.status !== "compared" || !b || !a) {
    return (
      <td colSpan={4} className="px-2 py-2 text-xs text-muted">
        {c.status === "too-new" ? "Not compared yet: a coach needs at least two completed seasons." : "Not compared: the program has no usable before window."}
      </td>
    );
  }
  const r1 = (v: number | null) => (v == null ? "—" : v.toFixed(1));
  return (
    <>
      <td className="px-2 py-2 text-right">
        <Cell before={pctText(b.winPct)} after={pctText(a.winPct)} delta={d.win} unit="pts" />
      </td>
      <td className="px-2 py-2 text-right">
        <Cell before={r1(b.recRank)} after={r1(a.recRank)} delta={d.rec} unit="rank" />
      </td>
      <td className="px-2 py-2 text-right">
        <Cell before={r1(b.talentRank)} after={r1(a.talentRank)} delta={d.tal} unit="rank" />
      </td>
      <td className="px-2 py-2 text-right">
        <Cell before={signed(b.netEpa, 3)} after={signed(a.netEpa, 3)} delta={d.epa} />
      </td>
    </>
  );
}

function CoachCard({ c, teams, open, toggle }: { c: CoachRow; teams: Info; open: boolean; toggle: () => void }) {
  const t = teams[c.slug];
  const d = deltas(c);
  const b = c.before;
  const a = c.after;
  const r1 = (v: number | null) => (v == null ? "—" : v.toFixed(1));
  return (
    <li data-coach={c.slug} className="scroll-mt-32 px-4 py-3" data-testid="coach-card">
      <button type="button" onClick={toggle} aria-expanded={open} className="flex w-full items-start gap-2 text-left">
        <Who c={c} t={t} slug={c.slug} />
        <span className="ml-auto shrink-0 text-right text-[11px] text-muted">{t?.hxRank ? `HX #${t.hxRank}` : ""}</span>
      </button>
      <p className="mt-1 text-xs text-muted">{windowText(c)}</p>
      {c.status === "compared" && b && a ? (
        <dl className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
          <Stat k="Win %" before={pctText(b.winPct)} after={pctText(a.winPct)} text={`${signed(d.win, 1)} pts`} delta={d.win} />
          <Stat k="Class rank" before={r1(b.recRank)} after={r1(a.recRank)} text={d.rec == null ? "—" : `${d.rec > 0 ? "▲" : d.rec < 0 ? "▼" : ""} ${Math.abs(d.rec).toFixed(1)}`} delta={d.rec} />
          <Stat k="Talent rank" before={r1(b.talentRank)} after={r1(a.talentRank)} text={d.tal == null ? "—" : `${d.tal > 0 ? "▲" : d.tal < 0 ? "▼" : ""} ${Math.abs(d.tal).toFixed(1)}`} delta={d.tal} />
          <Stat k="Net adj EPA" before={signed(b.netEpa, 3)} after={signed(a.netEpa, 3)} text={signed(d.epa, 3)} delta={d.epa} />
        </dl>
      ) : (
        <p className="mt-2 text-xs text-muted">{c.status === "too-new" ? "Listed, not compared: needs at least two completed seasons." : "Listed, not compared: no usable before window."}</p>
      )}
      <button type="button" onClick={toggle} aria-expanded={open} className="mt-2 inline-flex h-9 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border">
        {open ? "Hide details" : "Seasons, prior stops & notes"}
      </button>
      {open ? <Detail c={c} teams={teams} /> : null}
    </li>
  );
}

function Stat({ k, before, after, text, delta }: { k: string; before: string; after: string; text: string; delta: number | null }) {
  return (
    <div className="min-w-0 rounded bg-raised/60 px-2 py-1.5">
      <dt className="text-[10px] uppercase tracking-wide text-fg/80">{k}</dt>
      <dd className={cn("font-display text-base tabular", tone(delta, 0.0001))}>{text}</dd>
      <dd className="text-[11px] text-muted tabular">
        {before} → {after}
      </dd>
    </div>
  );
}

function Detail({ c, teams }: { c: CoachRow; teams: Info }) {
  const t = teams[c.slug];
  const winLine = (label: string, w: Window | null) =>
    w ? (
      <div className="rounded-lg bg-raised/60 px-3 py-2">
        <p className="text-[10px] uppercase tracking-wide text-fg/80">{label}</p>
        <p className="tabular text-sm">
          {recordText(w)} · {pctText(w.winPct)} <span className="text-muted">({yearsText(w.years)})</span>
        </p>
        <p className="text-xs text-muted tabular">
          Class rank {w.recRank == null ? "—" : w.recRank.toFixed(1)} ({w.recPts == null ? "—" : w.recPts.toFixed(0)} pts) · talent rank {w.talentRank == null ? "—" : w.talentRank.toFixed(1)} · off {signed(w.offEpa, 3)} / def {signed(w.defEpa, 3)} EPA
        </p>
      </div>
    ) : null;
  return (
    <div className="mt-3 space-y-3 text-sm" data-testid="coach-detail">
      <div className="grid gap-2 sm:grid-cols-3">
        {c.status === "compared" ? winLine(`Before (${c.n} seasons)`, c.before) : null}
        {c.status === "compared" ? winLine(`Under ${c.name.split(" ").slice(-1)[0]} (first ${c.n})`, c.after) : null}
        {c.tenure && (c.completed > c.n || c.status !== "compared") ? winLine(`Full tenure (${c.completed} completed seasons)`, c.tenure) : null}
      </div>
      {c.notes.length ? (
        <ul className="space-y-1 text-xs text-muted">
          {c.notes.map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      ) : null}
      <div>
        <p className="mb-1 text-[11px] uppercase tracking-wide text-muted">Prior FBS head-coaching stops (CFBD, 2005 on)</p>
        {c.prior.length ? (
          <ul className="text-xs">
            {c.prior.map((p) => (
              <li key={p.school + p.from} className="tabular">
                {p.school} {yearsText([p.from, p.to])}: {recordText(p)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-muted">None in the CFBD record since 2005. FCS, NFL and other stops are not in this source, so a blank is not a claim there were none.</p>
        )}
      </div>
      <SeasonTable c={c} />
      <p className="text-xs text-muted">
        <Link to="/teams/$slug" params={{ slug: c.slug }} className="text-accent hover:underline">
          {t?.name ?? c.school} team page →
        </Link>
      </p>
    </div>
  );
}

const ROLE: Record<SeasonRow["who"], string> = { before: "before", earlier: "earlier", transition: "transition", tenure: "under him", "2026": "2026" };

function SeasonTable({ c }: { c: CoachRow }) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[30rem] text-xs">
        <thead>
          <tr className="border-b border-border text-left text-[10px] uppercase tracking-wide text-muted">
            <th className="py-1 pr-2 font-medium">Season</th>
            <th className="px-1 py-1 font-medium">Role</th>
            <th className="px-1 py-1 text-right font-medium">Record</th>
            <th className="px-1 py-1 text-right font-medium">Class</th>
            <th className="px-1 py-1 text-right font-medium">Talent</th>
            <th className="px-1 py-1 text-right font-medium">Off EPA</th>
            <th className="px-1 py-1 text-right font-medium">Def EPA</th>
          </tr>
        </thead>
        <tbody>
          {c.seasons.map((s) => (
            <tr key={s.y} className={cn("border-b border-border/50 tabular", s.win ? "text-fg" : "text-muted")}>
              <td className="py-1 pr-2">{s.y}</td>
              <td className="px-1 py-1">
                {ROLE[s.who]}
                {s.win ? " ✓" : ""}
              </td>
              <td className="px-1 py-1 text-right">{recordText(s)}</td>
              <td className="px-1 py-1 text-right">{s.rec ? `#${s.rec[0]}` : "NR"}</td>
              <td className="px-1 py-1 text-right">{s.tal ? `#${s.tal[0]}` : "—"}</td>
              <td className="px-1 py-1 text-right">{s.epa ? signed(s.epa.off, 3) : "—"}</td>
              <td className="px-1 py-1 text-right">{s.epa ? signed(s.epa.de, 3) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-1 text-[11px] text-muted">✓ = season counted in the matched windows. Def EPA is EPA allowed per play, so lower is better.</p>
    </div>
  );
}

function Method({ file }: { file: Parameters<typeof viewRows>[0] }) {
  return (
    <section className="mt-6 rounded-xl border border-border/70 px-4 py-4 text-sm text-muted" data-testid="coach-method">
      <h2 className="mb-2 font-display text-xl tracking-wide text-fg">How this is built</h2>
      <ul className="space-y-1.5 leading-relaxed">
        <li>
          <span className="text-fg">Coaches.</span> The 138 FBS head coaches CFBD lists for 2026. A coach counts from the first season he coached at least 75% of the team&apos;s games. A season he started partway through (interim or midseason hire) is shown and left out of both windows.
        </li>
        <li>
          <span className="text-fg">Windows.</span> Up to {file.maxMatch} seasons right before he arrived against his first {file.maxMatch} completed seasons, matched in length (never fewer than {file.minSeasons}). {file.lastCompleted} is the last completed season; 2026 is in progress and not in any window. Full-tenure numbers are in each coach&apos;s detail.
        </li>
        <li>
          <span className="text-fg">Minimum tenure.</span> At least {file.minSeasons} completed seasons to be compared. Newer coaches are listed under All, marked too new. Coaches hired before 2005 have no before window in this data.
        </li>
        <li>
          <span className="text-fg">Win %.</span> Team win-loss totals including bowls and playoffs, from CFBD /records; ties count half. The 2020 season is included as played. Win % changes are in percentage points.
        </li>
        <li>
          <span className="text-fg">Recruiting.</span> 247Sports Composite national class rank (CFBD), averaged over the class years that match the season windows (his first class is the class signed in his first season). Class rank is the average rank: a lower number is better, and the arrow shows rank positions gained (▲) or lost (▼).
        </li>
        <li>
          <span className="text-fg">Talent.</span> 247Sports Team Talent Composite rank among FBS teams (CFBD /talent, 2015 on), averaged the same way. Blank when the window starts before 2015. Roster talent lags recruiting, so a new coach inherits most of year one.
        </li>
        <li>
          <span className="text-fg">Net adj EPA.</span> HASHMARK&apos;s opponent-adjusted offense EPA/play minus defense EPA allowed per play (the same adjustment as /stats), FBS vs FBS, 2016 on. Blank when the window starts before 2016.
        </li>
        <li>
          <span className="text-fg">HX now.</span> Today&apos;s HX rank, for context only. HX is not recomputed for past seasons and nothing here is blended into it.
        </li>
        <li>
          <span className="text-fg">Left out on purpose.</span> Transfer-portal class ranks: no credible, citable source we can pull (247 blocks automated access and CFBD has no team portal ranking), so none are shown. NCAA sanctions, injuries, conference moves and coordinator changes are not tracked here; a change is not proof the coach caused it. Prior head-coaching stops come from CFBD (FBS, 2005 on), so FCS, NFL and earlier stops are missing.
        </li>
      </ul>
      <p className="mt-3 text-xs">Sources:</p>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs">
        {file.sources.map((s) => (
          <li key={s.label}>
            {s.label}{" "}
            <a href={s.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
              link
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs">Built {file.built}. Related: <Link to="/coordinators" className="text-accent hover:underline">Best coordinators</Link> · <Link to="/recruiting" className="text-accent hover:underline">Recruiting</Link> · <Link to="/talent" className="text-accent hover:underline">Talent</Link>.</p>
    </section>
  );
}
