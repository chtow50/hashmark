import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ConfPills, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { ShowMore } from "@/components/show-more";
import type { ConfFilter } from "@/lib/cfb/conferences";
import {
  summarizeTalentResults,
  TALENT_247_SOURCE,
  type TalentResultsRow,
  type TalentResultsSummary,
} from "@/lib/cfb/talent-results";
import { cn, fmtNum } from "@/lib/utils";

const fmtRho = (r: number) => (Number.isFinite(r) ? r.toFixed(2) : "—");
const record = (t: TalentResultsRow) => `${t.seasonWins}-${t.seasonLosses}`;

function Gap({ gap, className }: { gap: number; className?: string }) {
  if (gap === 0) return <span className={cn("tabular text-faint", className)}>even</span>;
  return (
    <span className={cn("tabular", gap > 0 ? "text-up" : "text-down", className)}>
      {gap > 0 ? `+${gap}` : `−${Math.abs(gap)}`}
    </span>
  );
}

function MiniList({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: TalentResultsRow[];
  empty: string;
}) {
  return (
    <div>
      <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">{empty}</p>
      ) : (
        <ol className="space-y-1">
          {rows.map((t) => (
            <li key={t.slug}>
              <Link
                to="/teams/$slug"
                params={{ slug: t.slug }}
                className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 hover:bg-raised"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <TeamMark slug={t.slug} color={t.colorPrimary} />
                  <span className="truncate">{t.shortName}</span>
                  <span className="shrink-0 text-xs tabular text-muted">{record(t)}</span>
                </span>
                <span className="shrink-0 text-xs tabular text-muted">
                  talent {t.talentRank} · HX {t.hxRank} ·{" "}
                  <Gap gap={t.gap} className="font-medium" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Small summary on the default roster board. */
export function TalentResultsTeaser({ summary }: { summary: TalentResultsSummary }) {
  return (
    <Panel className="mb-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl tracking-wide">Talent vs results</h2>
        <Link
          to="/talent"
          search={{ board: "results" }}
          className="text-sm text-fg underline decoration-border underline-offset-4"
        >
          All {summary.n} teams →
        </Link>
      </div>
      <p className="mt-2 text-sm text-muted">
        Roster talent and HX rank line up at ρ = {fmtRho(summary.rhoHx)} across FBS (Spearman; 1 =
        same order). Gap = 247 talent rank − HX rank.
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <MiniList title="Most above their talent" rows={summary.above.slice(0, 3)} empty="None." />
        <MiniList title="Most below their talent" rows={summary.below.slice(0, 3)} empty="None." />
      </div>
    </Panel>
  );
}

type SortKey = "talentRank" | "hxRank" | "gap" | "winPct";

export function ResultsBoard({
  rows,
  summary,
  conf,
}: {
  rows: TalentResultsRow[];
  summary: TalentResultsSummary;
  conf: ConfFilter;
}) {
  const local = useMemo(() => summarizeTalentResults(rows), [rows]);
  const [sort, setSort] = useState<SortKey>("gap");
  const sorted = useMemo(() => {
    const out = [...rows];
    if (sort === "gap") out.sort((a, b) => b.gap - a.gap || a.hxRank - b.hxRank);
    else if (sort === "winPct")
      out.sort((a, b) => (b.winPct ?? -1) - (a.winPct ?? -1) || a.hxRank - b.hxRank);
    else out.sort((a, b) => a[sort] - b[sort]);
    return out;
  }, [rows, sort]);
  const points = rows.map((t) => ({
    x: t.talentRank,
    y: t.hxRank,
    name: t.shortName,
    gap: t.gap,
    rec: record(t),
  }));
  const maxRank = Math.max(138, ...rows.map((t) => Math.max(t.talentRank, t.hxRank)));

  return (
    <>
      <div className="mb-6 grid grid-cols-3 gap-2">
        <Stat label="Talent vs HX" value={fmtRho(summary.rhoHx)} sub="Spearman ρ, all FBS" />
        <Stat label="Talent vs win %" value={fmtRho(summary.rhoWin)} sub="Spearman ρ, all FBS" />
        <Stat label="Teams" value={String(summary.n)} sub="every FBS team" />
      </div>

      <ConfPills
        value={conf}
        to="/talent"
        searchFor={(c) => ({ board: "results", ...(c === "All" ? {} : { conf: c }) })}
      />

      <Panel className="mb-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <MiniList
            title={conf === "All" ? "Playing above their talent" : `Above their talent · ${conf}`}
            rows={local.above}
            empty="No team in this group has HX ahead of its talent rank."
          />
          <MiniList
            title={conf === "All" ? "Playing below their talent" : `Below their talent · ${conf}`}
            rows={local.below}
            empty="No team in this group has HX behind its talent rank."
          />
        </div>
      </Panel>

      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">Talent rank vs HX rank</h2>
        <p className="mt-1 text-sm text-muted">
          Each dot is a team. On the line, HX ranks a team exactly where its roster talent does;
          above the line, HX has it higher than its talent.
        </p>
        <div
          className="mt-4 h-80 sm:h-96"
          role="img"
          aria-label="Scatter of 247 talent rank against HX rank"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 8, right: 12, bottom: 24, left: 0 }}>
              <CartesianGrid stroke="var(--color-line)" />
              <XAxis
                type="number"
                dataKey="x"
                name="Talent rank"
                domain={[1, maxRank]}
                ticks={[1, 25, 50, 75, 100, 125]}
                tick={{ fill: "var(--color-faint)", fontSize: 11 }}
                label={{
                  value: "247 talent rank",
                  position: "insideBottom",
                  offset: -12,
                  fill: "var(--color-muted)",
                  fontSize: 11,
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="HX rank"
                reversed
                domain={[1, maxRank]}
                ticks={[1, 25, 50, 75, 100, 125]}
                width={36}
                tick={{ fill: "var(--color-faint)", fontSize: 11 }}
              />
              <ReferenceLine
                segment={[
                  { x: 1, y: 1 },
                  { x: maxRank, y: maxRank },
                ]}
                stroke="var(--color-border)"
                strokeDasharray="4 4"
              />
              <Tooltip
                cursor={false}
                content={({ payload }) => {
                  const d = payload?.[0]?.payload as (typeof points)[number] | undefined;
                  if (!d) return null;
                  return (
                    <div className="rounded-lg bg-surface px-3 py-2 text-xs shadow-[var(--shadow-border)]">
                      <div className="font-medium text-fg">
                        {d.name} · {d.rec}
                      </div>
                      <div className="tabular text-muted">
                        talent {d.x} · HX {d.y} · gap {d.gap > 0 ? `+${d.gap}` : d.gap}
                      </div>
                    </div>
                  );
                }}
              />
              <Scatter
                data={points.filter((p) => p.gap >= 0)}
                fill="var(--color-accent)"
                fillOpacity={0.85}
              />
              <Scatter
                data={points.filter((p) => p.gap < 0)}
                fill="var(--color-muted)"
                fillOpacity={0.7}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1 text-xs text-faint">
          Y axis: HX rank, No. 1 at the top. Light dots: at or above talent; gray: below.
        </p>
      </Panel>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Sort">
        {(
          [
            ["gap", "Gap"],
            ["talentRank", "Talent"],
            ["hxRank", "HX"],
            ["winPct", "Win %"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setSort(k)}
            aria-pressed={sort === k}
            className={cn(
              "h-11 shrink-0 rounded-full px-4 text-sm transition-colors duration-150",
              sort === k ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            Sort: {label}
          </button>
        ))}
      </div>

      <div className="mb-6 sm:hidden">
        <ShowMore
          items={sorted}
          noun="teams"
          resetKey={`${sort}-${conf}`}
          className="space-y-2"
          render={(t) => (
            <Link
              key={t.slug}
              to="/teams/$slug"
              params={{ slug: t.slug }}
              className="block rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2.5">
                  <TeamMark slug={t.slug} color={t.colorPrimary} />
                  <span className="truncate font-medium">{t.name}</span>
                  <span className="shrink-0 text-xs tabular text-muted">{record(t)}</span>
                </span>
                <Gap gap={t.gap} className="shrink-0 font-display text-lg" />
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1 text-center text-xs tabular">
                <Cell label="Talent rk" value={String(t.talentRank)} />
                <Cell label="HX rk" value={String(t.hxRank)} />
                <Cell label="247 pts" value={fmtNum(t.talent, 1)} />
              </div>
            </Link>
          )}
        />
      </div>

      <Panel className="mb-6 hidden overflow-hidden p-0 sm:block sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="px-4 py-3 font-medium">Team</th>
                <th className="px-3 py-3 font-medium">247 talent</th>
                <th className="px-3 py-3 font-medium">Talent rk</th>
                <th className="px-3 py-3 font-medium" title="2025 247 team talent rank">
                  2025 rk
                </th>
                <th className="px-3 py-3 font-medium">HX rk</th>
                <th className="px-3 py-3 font-medium">Record</th>
                <th className="px-3 py-3 font-medium" title="Talent rank − HX rank">
                  Gap
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t) => (
                <tr key={t.slug} className="border-b border-line last:border-0 hover:bg-raised/60">
                  <td className="px-4 py-2">
                    <Link
                      to="/teams/$slug"
                      params={{ slug: t.slug }}
                      className="flex min-h-11 items-center gap-2.5"
                    >
                      <TeamMark slug={t.slug} color={t.colorPrimary} logoSize={20} />
                      <span>
                        <span className="block font-medium">{t.name}</span>
                        <span className="block text-xs text-muted">{t.conference}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-2 tabular">{fmtNum(t.talent, 1)}</td>
                  <td className="px-3 py-2 tabular">{t.talentRank}</td>
                  <td className="px-3 py-2 tabular text-muted">{t.prevTalentRank ?? "—"}</td>
                  <td className="px-3 py-2 tabular">{t.hxRank}</td>
                  <td className="px-3 py-2 tabular">{record(t)}</td>
                  <td className="px-3 py-2">
                    <Gap gap={t.gap} className="font-medium" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel className="mb-6">
        <h2 className="font-display text-2xl tracking-wide">How to read this</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>
            <span className="text-fg">247 talent</span> is the{" "}
            <a
              href={TALENT_247_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fg"
            >
              {TALENT_247_SOURCE.label}
            </a>{" "}
            for 2026: the whole roster's 247 Composite ratings, transfers included (
            {TALENT_247_SOURCE.via}). Rank is among HASHMARK's FBS teams. It is not the two-deep
            composite on the roster board.
          </li>
          <li>
            <span className="text-fg">HX rank</span> is the live board, refit weekly on stamped
            FINALs. Record is the stamped season W-L.
          </li>
          <li>
            <span className="text-fg">Gap</span> = talent rank − HX rank. +20 means HX has the team
            20 spots higher than its roster talent. It is a difference of two ranks, not a rating,
            and it does not feed HX.
          </li>
          <li>
            <span className="text-fg">ρ</span> is the Spearman rank correlation: 1 means the two
            lists are in the same order, 0 means no relationship.
          </li>
        </ul>
      </Panel>
    </>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-surface px-3 py-3 shadow-[var(--shadow-border)] sm:px-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:text-[11px]">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl tabular sm:text-3xl">{value}</div>
      <div className="mt-0.5 text-xs text-muted">{sub}</div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded bg-raised px-1 py-1">
      <span className="block text-[10px] text-faint">{label}</span>
      {value}
    </span>
  );
}
