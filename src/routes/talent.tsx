import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ConfPills, PageHead, Panel, TeamSelect } from "@/components/shell";
import { CompareRow, MixBar, TeamSwatch } from "@/components/marks";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import { TALENT_UNITS } from "@/lib/cfb/positions";
import { listTeams } from "@/lib/cfb/queries";
import { cn, fmtHeight, fmtNum, fmtPct } from "@/lib/utils";
import type { TeamSummary } from "@/lib/cfb/types";

type Board = "composite" | "size";
type Lens = "talentScore" | "hsTalent" | "portalTalent" | "starterTalent" | "offTalent" | "defTalent";
type SizeLens = "olAvgWeightLbs" | "olAvgHeightIn" | "avgWeightLbs" | "skillAvgHeightIn" | "dbAvgHeightIn";

type Search = { board?: Board; conf?: ConfFilter };

const LENSES: { key: Lens; label: string }[] = [
  { key: "talentScore", label: "Composite" },
  { key: "hsTalent", label: "HS" },
  { key: "portalTalent", label: "Portal" },
  { key: "starterTalent", label: "Starters" },
  { key: "offTalent", label: "Offense" },
  { key: "defTalent", label: "Defense" },
];

const SIZE_LENSES: { key: SizeLens; label: string }[] = [
  { key: "olAvgWeightLbs", label: "OL weight" },
  { key: "olAvgHeightIn", label: "OL height" },
  { key: "avgWeightLbs", label: "Roster weight" },
  { key: "skillAvgHeightIn", label: "Skill height" },
  { key: "dbAvgHeightIn", label: "DB height" },
];

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
  const [sizeLens, setSizeLens] = useState<SizeLens>("olAvgWeightLbs");
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
        lede="Who is on the roster now — high-school signees plus portal transfers. Starters carry full weight, backups 0.4. Size (including OL mass) is a separate board. It is not the talent ranking and not an HX term."
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
            OL mass, not talent
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
            <p className="mt-2 text-sm text-muted">
              {fmtNum(t.talentScore, 1)} composite · {t.transferCount} transfers · {fmtPct(t.portalShare, 0)} portal weight
            </p>
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
            <CompareRow label="Talent composite" a={left.talentScore} b={right.talentScore} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="HS two-deep" a={left.hsTalent} b={right.hsTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Portal two-deep" a={left.portalTalent} b={right.portalTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Portal weight" a={left.portalShare} b={right.portalShare} max={100} format={(n) => fmtPct(n, 0)} />
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
                    {fmtNum(t.portalTalent, 1)}
                    <span className="ml-1 text-xs text-muted">{t.transferCount}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex h-1.5 w-20 overflow-hidden rounded-full bg-raised">
                      <div className="h-full bg-accent" style={{ width: `${100 - t.portalShare}%` }} />
                      <div className="h-full bg-faint" style={{ width: `${t.portalShare}%` }} />
                    </div>
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
  sizeLens: SizeLens;
  setSizeLens: (l: SizeLens) => void;
}) {
  const chart = ranked.slice(0, 12).map((t) => ({
    name: t.shortName,
    ol: Math.round(t.olAvgWeightLbs),
  }));

  return (
    <>
      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">A feature, not the composite</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Offensive-line mass is a size comparison, not the talent ranking and not an HX term.
          Use this board for height and weight. Rank talent on{" "}
          <Link
            to="/talent"
            search={{ board: "composite", conf: conf === "All" ? undefined : conf }}
            className="text-fg underline decoration-border underline-offset-4"
          >
            Composite
          </Link>
          .
        </p>
      </Panel>

      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">Compare size</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TeamSelect id="size-a" label="Team A" value={a} teams={teams} onChange={setA} />
          <TeamSelect id="size-b" label="Team B" value={b} teams={teams} onChange={setB} />
        </div>
        {left && right ? (
          <div className="mt-6">
            <CompareRow label="OL weight" a={left.olAvgWeightLbs} b={right.olAvgWeightLbs} max={360} format={(n) => `${fmtNum(n, 0)} lb`} />
            <CompareRow label="OL height" a={left.olAvgHeightIn} b={right.olAvgHeightIn} max={82} format={(n) => fmtHeight(n)} />
            <CompareRow label="Skill height" a={left.skillAvgHeightIn} b={right.skillAvgHeightIn} max={80} format={(n) => fmtHeight(n)} />
            <CompareRow label="DB height" a={left.dbAvgHeightIn} b={right.dbAvgHeightIn} max={78} format={(n) => fmtHeight(n)} />
            <CompareRow label="Roster weight" a={left.avgWeightLbs} b={right.avgWeightLbs} max={280} format={(n) => `${fmtNum(n, 0)} lb`} />
            <div className="mt-2 border-t border-line pt-2">
              <CompareRow label="Talent composite" a={left.talentScore} b={right.talentScore} max={100} format={(n) => fmtNum(n, 1)} />
            </div>
          </div>
        ) : null}
      </Panel>

      <Panel className="mb-6">
        <h2 className="mb-1 font-display text-2xl tracking-wide">Heaviest lines</h2>
        <p className="mb-4 text-sm text-muted">Average listed offensive-line weight. This chart does not rank talent.</p>
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
        {SIZE_LENSES.map((c) => (
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
        Sorted by {SIZE_LENSES.find((l) => l.key === sizeLens)?.label ?? "OL weight"}. Composite stays on the right so size never pretends to be talent.
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
              <span className="font-display text-xl tabular">
                {sizeLens.includes("Height") || sizeLens.endsWith("In")
                  ? fmtHeight(t[sizeLens])
                  : `${fmtNum(t[sizeLens], 0)} lb`}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs tabular text-muted">
              <span>OL {fmtHeight(t.olAvgHeightIn)} / {fmtNum(t.olAvgWeightLbs, 0)} lb</span>
              <span>Talent {fmtNum(t.talentScore, 1)}</span>
            </div>
          </Link>
        ))}
      </div>

      <Panel className="hidden overflow-hidden p-0 sm:block sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="px-4 py-3 font-medium">Rk</th>
                <th className="px-3 py-3 font-medium">Team</th>
                <th className="px-3 py-3 font-medium">OL wt</th>
                <th className="px-3 py-3 font-medium">OL ht</th>
                <th className="px-3 py-3 font-medium">Skill ht</th>
                <th className="px-3 py-3 font-medium">DB ht</th>
                <th className="px-3 py-3 font-medium">Roster wt</th>
                <th className="px-3 py-3 font-medium">Composite</th>
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
                  <td className="px-3 py-3 tabular">{fmtNum(t.olAvgWeightLbs, 0)}</td>
                  <td className="px-3 py-3 tabular">{fmtHeight(t.olAvgHeightIn)}</td>
                  <td className="px-3 py-3 tabular">{fmtHeight(t.skillAvgHeightIn)}</td>
                  <td className="px-3 py-3 tabular">{fmtHeight(t.dbAvgHeightIn)}</td>
                  <td className="px-3 py-3 tabular text-muted">{fmtNum(t.avgWeightLbs, 0)}</td>
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
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs tabular text-muted">
        <span>Comp {fmtNum(team.talentScore, 1)}</span>
        <span>HS {fmtNum(team.hsTalent, 1)}</span>
        <span>Portal {fmtNum(team.portalTalent, 1)}</span>
      </div>
      <div className="mt-3">
        <MixBar leftPct={100 - team.portalShare} leftLabel="HS" rightLabel="Portal" />
      </div>
    </Link>
  );
}
