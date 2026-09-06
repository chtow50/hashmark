import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ConfPills, PageHead, Panel, TeamSelect } from "@/components/shell";
import { CompareRow, TeamSwatch } from "@/components/marks";
import { TalentSliceChart, TalentSliceLeaders, TalentSliceMixCell, TalentSliceStats } from "@/components/talent-slices";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import { TALENT_UNITS } from "@/lib/cfb/positions";
import { SIZE_GROUPS, sizeSortLabel, type SizeSortKey } from "@/lib/cfb/size-groups";
import { hasPortalMix, hasPortalSlice } from "@/lib/cfb/talent-slices";
import { listTeams } from "@/lib/cfb/queries";
import { cn, fmtHeight, fmtNum, fmtPct } from "@/lib/utils";
import type { TeamSummary } from "@/lib/cfb/types";

type Board = "composite" | "size";
type Lens = "talentScore" | "hsTalent" | "portalTalent" | "starterTalent" | "offTalent" | "defTalent";

type Search = { board?: Board; conf?: ConfFilter };

const LENSES: { key: Lens; label: string }[] = [
  { key: "talentScore", label: "Composite" },
  { key: "hsTalent", label: "HS" },
  { key: "portalTalent", label: "Portal" },
  { key: "starterTalent", label: "Starters" },
  { key: "offTalent", label: "Offense" },
  { key: "defTalent", label: "Defense" },
];

const SIZE_SORT_OPTIONS: { key: SizeSortKey; label: string }[] = SIZE_GROUPS.flatMap((g) => [
  { key: g.weightKey, label: `${g.label} weight` },
  { key: g.heightKey, label: `${g.label} height` },
]);

export const Route = createFileRoute("/talent")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    board: s.board === "size" ? "size" : "composite",
    conf: parseConf(s.conf),
  }),
  loader: () => listTeams(),
  component: TalentPage,
  head: () => ({ meta: [{ title: "Roster Talent · HASHMARK" }] }),
});

function TalentPage() {
  const teams = Route.useLoaderData();
  const board = Route.useSearch().board ?? "composite";
  const conf = Route.useSearch().conf ?? "All";
  const [a, setA] = useState("ohio-state");
  const [b, setB] = useState("georgia");
  const [lens, setLens] = useState<Lens>("talentScore");
  const [sizeLens, setSizeLens] = useState<SizeSortKey>("olAvgWeightLbs");
  const left = teams.find((t) => t.slug === a);
  const right = teams.find((t) => t.slug === b);

  const pool = useMemo(() => teams.filter((t) => inConf(t.conference, conf)), [teams, conf]);

  const ranked = useMemo(
    () => [...pool].sort((x, y) => y[lens] - x[lens] || x.talentRank - y.talentRank),
    [pool, lens],
  );

  const sizeRanked = useMemo(
    () => [...pool].sort((x, y) => y[sizeLens] - x[sizeLens] || x.talentRank - y.talentRank),
    [pool, sizeLens],
  );

  return (
    <div>
      <PageHead
        kicker="Two-deep composite"
        title="Roster talent"
        lede="Who is on the roster now — high-school signees plus portal transfers. HS and portal are separate two-deep ratings and a weight mix, not additive slices of the composite. Starters carry full weight, backups 0.4. Size is a separate board — not talent and not HX."
      />

      <div className="mb-6 grid grid-cols-2 gap-2">
        <Link
          to="/talent"
          search={{ board: "composite", conf: conf === "All" ? undefined : conf }}
          className={cn(
            "rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150",
            board === "composite" ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised",
          )}
        >
          <div
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.16em]",
              board === "composite" ? "text-accent-fg/70" : "text-faint",
            )}
          >
            Ranking
          </div>
          <div className="font-display text-2xl tracking-wide sm:text-3xl">Composite</div>
          <p className={cn("mt-1 text-sm", board === "composite" ? "text-accent-fg/80" : "text-muted")}>
            Two-deep + transfers
          </p>
        </Link>
        <Link
          to="/talent"
          search={{ board: "size", conf: conf === "All" ? undefined : conf }}
          className={cn(
            "rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150",
            board === "size" ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised",
          )}
        >
          <div
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.16em]",
              board === "size" ? "text-accent-fg/70" : "text-faint",
            )}
          >
            Measurables
          </div>
          <div className="font-display text-2xl tracking-wide sm:text-3xl">Size</div>
          <p className={cn("mt-1 text-sm", board === "size" ? "text-accent-fg/80" : "text-muted")}>
            Height and weight by group
          </p>
        </Link>
      </div>

      {board === "composite" ? (
        <CompositeBoard
          ranked={ranked}
          left={left}
          right={right}
          a={a}
          b={b}
          teams={teams}
          setA={setA}
          setB={setB}
          conf={conf}
          lens={lens}
          setLens={setLens}
        />
      ) : (
        <SizeBoard
          ranked={sizeRanked}
          left={left}
          right={right}
          a={a}
          b={b}
          teams={teams}
          setA={setA}
          setB={setB}
          conf={conf}
          sizeLens={sizeLens}
          setSizeLens={setSizeLens}
        />
      )}
    </div>
  );
}

function CompositeBoard({
  ranked,
  left,
  right,
  a,
  b,
  teams,
  setA,
  setB,
  conf,
  lens,
  setLens,
}: {
  ranked: TeamSummary[];
  left?: TeamSummary;
  right?: TeamSummary;
  a: string;
  b: string;
  teams: TeamSummary[];
  setA: (s: string) => void;
  setB: (s: string) => void;
  conf: ConfFilter;
  lens: Lens;
  setLens: (l: Lens) => void;
}) {
  const chart = ranked.slice(0, 12).map((t) => ({
    name: t.shortName,
    talent: Number(t.talentScore.toFixed(1)),
  }));
  const ymin = Math.max(70, Math.floor(Math.min(...chart.map((c) => c.talent), 90) - 2));
  const ymax = Math.min(100, Math.ceil(Math.max(...chart.map((c) => c.talent), 94) + 1));

  return (
    <>
      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">High school vs portal</h2>
        <p className="mt-2 text-sm text-muted">
          Separate weighted 247 ratings on the listed two-deep — HS signees vs portal transfers — plus portal weight share.
          Sourced from roster players (transfer flag) and TWO·DEEP depth weights.
        </p>
        <div className="mt-5">
          <TalentSliceLeaders teams={ranked} />
        </div>
        <div className="mt-6">
          <TalentSliceChart teams={ranked} />
        </div>
      </Panel>

      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">How the composite is built</h2>
        <ul className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-3">
          <li>
            <div className="font-medium text-fg">The two-deep</div>
            <p className="mt-1">Listed TWO·DEEP charts where we have them; rating-sorted projection otherwise. 247 composite, transfers included.</p>
          </li>
          <li>
            <div className="font-medium text-fg">Transfers count</div>
            <p className="mt-1">A portal player is talent on this roster, not a hole in last year’s class.</p>
          </li>
          <li>
            <div className="font-medium text-fg">OL is not this board</div>
            <p className="mt-1">
              Line size is a measurable, not an HX term. Open{" "}
              <Link to="/talent" search={{ board: "size" }} className="text-fg underline decoration-border underline-offset-4">
                Size
              </Link>{" "}
              for mass. Units below are slices, not the ranking.
            </p>
          </li>
        </ul>
      </Panel>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {ranked.slice(0, 3).map((t) => (
          <Panel key={t.slug}>
            <div className="font-display text-3xl tabular text-muted">{t.talentRank}</div>
            <Link
              to="/teams/$slug"
              params={{ slug: t.slug }}
              className="mt-2 flex items-center gap-2 font-display text-2xl tracking-wide"
            >
              <TeamSwatch color={t.colorPrimary} />
              {t.name}
            </Link>
            <p className="mt-2 text-sm text-muted">{fmtNum(t.talentScore, 1)} composite</p>
            <TalentSliceStats team={t} className="mt-4" />
          </Panel>
        ))}
      </div>

      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">Compare two rosters</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TeamSelect id="talent-a" label="Team A" value={a} teams={teams} onChange={setA} />
          <TeamSelect id="talent-b" label="Team B" value={b} teams={teams} onChange={setB} />
        </div>
        {left && right ? (
          <div className="mt-6">
            <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-faint">HS vs portal slices</p>
            <CompareRow label="HS two-deep" a={left.hsTalent} b={right.hsTalent} max={100} format={(n) => fmtNum(n, 1)} />
            {hasPortalSlice(left) || hasPortalSlice(right) ? (
              <CompareRow
                label="Portal two-deep"
                a={left.portalTalent}
                b={right.portalTalent}
                max={100}
                format={(n) => fmtNum(n, 1)}
              />
            ) : null}
            {hasPortalMix(left) || hasPortalMix(right) ? (
              <CompareRow label="Portal weight" a={left.portalShare} b={right.portalShare} max={100} format={(n) => fmtPct(n, 0)} />
            ) : null}
            <CompareRow label="Talent composite" a={left.talentScore} b={right.talentScore} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Starter talent" a={left.starterTalent} b={right.starterTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Offense" a={left.offTalent} b={right.offTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Defense" a={left.defTalent} b={right.defTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Blue-chip %" a={left.blueChipPct} b={right.blueChipPct} max={100} format={(n) => fmtPct(n, 0)} />
            <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-faint">Unit slices — not the ranking</p>
            <div className="mt-1">
              {TALENT_UNITS.map((u) => (
                <CompareRow
                  key={u.key}
                  label={u.label}
                  a={left[u.key]}
                  b={right[u.key]}
                  max={100}
                  format={(n) => fmtNum(n, 1)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </Panel>

      <Panel className="mb-6">
        <h2 className="mb-1 font-display text-2xl tracking-wide">Top of the composite</h2>
        <p className="mb-4 text-sm text-muted">
          Weighted 247 of the listed two-deep, transfers included. HS and portal are subset ratings — not additive slices.
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="var(--color-line)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: "var(--color-faint)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[ymin, ymax]} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 10,
                  color: "var(--color-fg)",
                }}
                formatter={(v) => [`${v}`, "Composite"]}
              />
              <Bar dataKey="talent" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <ConfPills
        value={conf}
        to="/talent"
        searchFor={(c) => ({
          board: "composite",
          ...(c === "All" ? {} : { conf: c }),
        })}
      />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {LENSES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setLens(c.key)}
            className={cn(
              "h-11 shrink-0 rounded-full px-4 text-sm transition-colors duration-150",
              lens === c.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="mb-3 text-sm text-muted">
        Ranking by {LENSES.find((l) => l.key === lens)?.label ?? "composite"}. Offensive line lives on Size — measurables, not this sort.
      </p>

      <div className="space-y-3 sm:hidden">
        {ranked.map((t, i) => (
          <TalentCard key={t.slug} team={t} place={i + 1} lens={lens} />
        ))}
      </div>

      <Panel className="hidden overflow-hidden p-0 sm:block sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-4xl text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="px-4 py-3 font-medium">Rk</th>
                <th className="px-3 py-3 font-medium">Team</th>
                <th className="px-3 py-3 font-medium">Composite</th>
                <th className="px-3 py-3 font-medium">HS</th>
                <th className="px-3 py-3 font-medium">Portal</th>
                <th className="px-3 py-3 font-medium">Mix</th>
                <th className="px-3 py-3 font-medium">Off</th>
                <th className="px-3 py-3 font-medium">Def</th>
                <th className="px-3 py-3 font-medium">Blue</th>
                <th className="px-3 py-3 font-medium">Units</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((t, i) => (
                <tr key={t.slug} className="border-b border-line last:border-0 hover:bg-raised/60">
                  <td className="px-4 py-3 tabular">{i + 1}</td>
                  <td className="px-3 py-3">
                    <Link
                      to="/teams/$slug"
                      params={{ slug: t.slug }}
                      className="flex min-h-11 items-center gap-2.5"
                    >
                      <TeamSwatch color={t.colorPrimary} />
                      {t.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 tabular">{fmtNum(t.talentScore, 1)}</td>
                  <td className="px-3 py-3 tabular">{fmtNum(t.hsTalent, 1)}</td>
                  <td className="px-3 py-3 tabular">
                    {hasPortalSlice(t) ? (
                      <>
                        {fmtNum(t.portalTalent, 1)}
                        <span className="ml-1 text-xs text-muted">{t.transferCount}</span>
                      </>
                    ) : (
                      <span className="text-faint">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <TalentSliceMixCell team={t} />
                  </td>
                  <td className="px-3 py-3 tabular text-muted">{fmtNum(t.offTalent, 1)}</td>
                  <td className="px-3 py-3 tabular text-muted">{fmtNum(t.defTalent, 1)}</td>
                  <td className="px-3 py-3 tabular">{fmtPct(t.blueChipPct, 0)}</td>
                  <td className="px-3 py-3 text-xs tabular text-muted">
                    {TALENT_UNITS.map((u) => `${u.label} ${fmtNum(t[u.key], 0)}`).join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function SizeBoard({
  ranked,
  left,
  right,
  a,
  b,
  teams,
  setA,
  setB,
  conf,
  sizeLens,
  setSizeLens,
}: {
  ranked: TeamSummary[];
  left?: TeamSummary;
  right?: TeamSummary;
  a: string;
  b: string;
  teams: TeamSummary[];
  setA: (s: string) => void;
  setB: (s: string) => void;
  conf: ConfFilter;
  sizeLens: SizeSortKey;
  setSizeLens: (l: SizeSortKey) => void;
}) {
  const chart = ranked.slice(0, 12).map((t) => ({
    name: t.shortName,
    ol: Math.round(t.olAvgWeightLbs),
  }));

  function formatSize(team: TeamSummary, key: SizeSortKey): string {
    if (key.endsWith("HeightIn")) return fmtHeight(team[key]);
    return `${fmtNum(team[key], 0)} lb`;
  }

  return (
    <>
      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">Measurables by position group</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Average height and weight on the listed two-deep for QB, skill, OL, DL, LB, and DB.
          This board is separate from the talent composite — open{" "}
          <Link
            to="/talent"
            search={{ board: "composite", conf: conf === "All" ? undefined : conf }}
            className="text-fg underline decoration-border underline-offset-4"
          >
            Composite
          </Link>{" "}
          for roster ratings.
        </p>
      </Panel>

      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">Compare two teams</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TeamSelect id="size-a" label="Team A" value={a} teams={teams} onChange={setA} />
          <TeamSelect id="size-b" label="Team B" value={b} teams={teams} onChange={setB} />
        </div>
        {left && right ? (
          <div className="mt-6">
            {SIZE_GROUPS.map((g) => (
              <div key={g.key} className="border-b border-line last:border-0">
                <CompareRow
                  label={`${g.label} weight`}
                  a={left[g.weightKey]}
                  b={right[g.weightKey]}
                  max={360}
                  format={(n) => `${fmtNum(n, 0)} lb`}
                />
                <CompareRow
                  label={`${g.label} height`}
                  a={left[g.heightKey]}
                  b={right[g.heightKey]}
                  max={84}
                  format={(n) => fmtHeight(n)}
                />
              </div>
            ))}
            <div className="mt-2 border-t border-line pt-2">
              <CompareRow label="Roster weight" a={left.avgWeightLbs} b={right.avgWeightLbs} max={280} format={(n) => `${fmtNum(n, 0)} lb`} />
              <CompareRow label="Talent composite" a={left.talentScore} b={right.talentScore} max={100} format={(n) => fmtNum(n, 1)} />
            </div>
          </div>
        ) : null}
      </Panel>

      <Panel className="mb-6">
        <h2 className="mb-1 font-display text-2xl tracking-wide">Heaviest offensive lines</h2>
        <p className="mb-4 text-sm text-muted">Average OL weight on the two-deep.</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="var(--color-line)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: "var(--color-faint)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[290, 340]} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 10,
                  color: "var(--color-fg)",
                }}
                formatter={(v) => [`${v} lb`, "OL weight"]}
              />
              <Bar dataKey="ol" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <ConfPills
        value={conf}
        to="/talent"
        searchFor={(c) => ({
          board: "size",
          ...(c === "All" ? {} : { conf: c }),
        })}
      />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {SIZE_SORT_OPTIONS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setSizeLens(c.key)}
            className={cn(
              "h-10 shrink-0 rounded-full px-4 text-sm transition-colors duration-150",
              sizeLens === c.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="mb-3 text-sm text-muted">
        Sorted by {sizeSortLabel(sizeLens)}.
      </p>

      <div className="space-y-3 sm:hidden">
        {ranked.map((t, i) => (
          <Link
            key={t.slug}
            to="/teams/$slug"
            params={{ slug: t.slug }}
            className="block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="font-display text-xl tabular text-muted">{i + 1}</span>
                <TeamSwatch color={t.colorPrimary} />
                <span className="font-medium">{t.name}</span>
              </div>
              <span className="font-display text-xl tabular">{formatSize(t, sizeLens)}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs tabular text-muted">
              {SIZE_GROUPS.map((g) => (
                <span key={g.key}>
                  {g.label} {fmtHeight(t[g.heightKey])} / {fmtNum(t[g.weightKey], 0)} lb
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <Panel className="hidden overflow-hidden p-0 sm:block sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-5xl text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="px-4 py-3 font-medium">Rk</th>
                <th className="px-3 py-3 font-medium">Team</th>
                {SIZE_GROUPS.map((g) => (
                  <th key={g.key} className="px-3 py-3 font-medium" colSpan={2}>
                    {g.label}
                  </th>
                ))}
                <th className="px-3 py-3 font-medium">Composite</th>
              </tr>
              <tr className="border-b border-line text-[10px] uppercase tracking-[0.1em] text-faint">
                <th className="px-4 py-2" />
                <th className="px-3 py-2" />
                {SIZE_GROUPS.map((g) => (
                  <Fragment key={g.key}>
                    <th className="px-3 py-2 font-medium">Wt</th>
                    <th className="px-3 py-2 font-medium">Ht</th>
                  </Fragment>
                ))}
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {ranked.map((t, i) => (
                <tr key={t.slug} className="border-b border-line last:border-0 hover:bg-raised/60">
                  <td className="px-4 py-3 tabular">{i + 1}</td>
                  <td className="px-3 py-3">
                    <Link
                      to="/teams/$slug"
                      params={{ slug: t.slug }}
                      className="flex min-h-11 items-center gap-2.5"
                    >
                      <TeamSwatch color={t.colorPrimary} />
                      {t.name}
                    </Link>
                  </td>
                  {SIZE_GROUPS.flatMap((g) => [
                    <td key={`${t.slug}-${g.key}-wt`} className="px-3 py-3 tabular">{fmtNum(t[g.weightKey], 0)}</td>,
                    <td key={`${t.slug}-${g.key}-ht`} className="px-3 py-3 tabular">{fmtHeight(t[g.heightKey])}</td>,
                  ])}
                  <td className="px-3 py-3 tabular">{fmtNum(t.talentScore, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function TalentCard({ team, place, lens }: { team: TeamSummary; place: number; lens: Lens }) {
  return (
    <Link to="/teams/$slug" params={{ slug: team.slug }} className="block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-xl tabular text-muted">{place}</span>
          <TeamSwatch color={team.colorPrimary} />
          <span className="font-medium">{team.name}</span>
        </div>
        <span className="font-display text-xl tabular">{fmtNum(team[lens], 1)}</span>
      </div>
      <div className="mt-3 text-xs tabular text-muted">Composite {fmtNum(team.talentScore, 1)}</div>
      <TalentSliceStats team={team} className="mt-3" />
    </Link>
  );
}
