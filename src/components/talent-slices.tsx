import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { hasHsSlice, hasPortalMix, hasPortalSlice } from "@/lib/cfb/talent-slices";
import type { TeamSummary } from "@/lib/cfb/types";
import { fmtNum, fmtPct } from "@/lib/utils";
import { MixBar } from "./marks";

export function TalentSliceStats({
  team,
  className,
}: {
  team: TeamSummary;
  className?: string;
}) {
  const hs = hasHsSlice(team);
  const portal = hasPortalSlice(team);
  const mix = hasPortalMix(team);

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-[11px] uppercase tracking-[0.12em] text-faint">HS two-deep</div>
          <div className="mt-1 font-display text-2xl tabular leading-none">
            {hs ? fmtNum(team.hsTalent, 1) : "—"}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.12em] text-faint">Portal two-deep</div>
          <div className="mt-1 font-display text-2xl tabular leading-none">
            {portal ? fmtNum(team.portalTalent, 1) : "—"}
          </div>
          {portal ? (
            <div className="mt-1 text-xs text-muted">{team.transferCount} transfers</div>
          ) : null}
        </div>
      </div>
      {mix ? (
        <div className="mt-4">
          <MixBar leftPct={100 - team.portalShare} leftLabel="HS weight" rightLabel="Portal weight" />
        </div>
      ) : hs ? (
        <p className="mt-4 text-xs text-muted">No portal players on the listed two-deep.</p>
      ) : null}
    </div>
  );
}

export function TalentSliceMixCell({ team }: { team: TeamSummary }) {
  if (!hasPortalMix(team)) {
    return <span className="text-xs text-faint">HS only</span>;
  }
  return (
    <div className="min-w-24">
      <MixBar leftPct={100 - team.portalShare} leftLabel="HS" rightLabel="Portal" />
    </div>
  );
}

type SliceChartRow = {
  name: string;
  hs: number | null;
  portal: number | null;
};

export function TalentSliceChart({ teams }: { teams: TeamSummary[] }) {
  const chart: SliceChartRow[] = teams.slice(0, 10).map((t) => ({
    name: t.shortName,
    hs: hasHsSlice(t) ? Number(t.hsTalent.toFixed(1)) : null,
    portal: hasPortalSlice(t) ? Number(t.portalTalent.toFixed(1)) : null,
  }));
  const values = chart.flatMap((c) => [c.hs, c.portal]).filter((v): v is number => v != null);
  if (values.length === 0) return null;

  const ymin = Math.max(70, Math.floor(Math.min(...values) - 2));
  const ymax = Math.min(100, Math.ceil(Math.max(...values) + 1));

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--color-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fill: "var(--color-faint)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[ymin, ymax]}
          />
          <Tooltip
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              color: "var(--color-fg)",
            }}
            formatter={(v, name) => [v == null ? "—" : `${v}`, name === "hs" ? "HS" : "Portal"]}
          />
          <Legend
            verticalAlign="top"
            height={28}
            formatter={(value) => (value === "hs" ? "HS two-deep" : "Portal two-deep")}
            wrapperStyle={{ fontSize: 11, color: "var(--color-faint)", textTransform: "uppercase", letterSpacing: "0.12em" }}
          />
          <Bar dataKey="hs" name="hs" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="portal" name="portal" fill="var(--color-faint)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TalentSliceLeaders({ teams }: { teams: TeamSummary[] }) {
  const hsLeader = [...teams].filter(hasHsSlice).sort((a, b) => b.hsTalent - a.hsTalent)[0];
  const portalLeader = [...teams].filter(hasPortalSlice).sort((a, b) => b.portalTalent - a.portalTalent)[0];
  const mixLeader = [...teams].filter(hasPortalMix).sort((a, b) => b.portalShare - a.portalShare)[0];

  if (!hsLeader && !portalLeader) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {hsLeader ? (
        <div className="rounded-lg bg-raised/60 p-4">
          <div className="text-[11px] uppercase tracking-[0.12em] text-faint">Top HS two-deep</div>
          <div className="mt-2 font-medium">{hsLeader.name}</div>
          <div className="mt-1 font-display text-3xl tabular">{fmtNum(hsLeader.hsTalent, 1)}</div>
        </div>
      ) : null}
      {portalLeader ? (
        <div className="rounded-lg bg-raised/60 p-4">
          <div className="text-[11px] uppercase tracking-[0.12em] text-faint">Top portal two-deep</div>
          <div className="mt-2 font-medium">{portalLeader.name}</div>
          <div className="mt-1 font-display text-3xl tabular">{fmtNum(portalLeader.portalTalent, 1)}</div>
          <div className="mt-1 text-xs text-muted">{portalLeader.transferCount} transfers</div>
        </div>
      ) : null}
      {mixLeader ? (
        <div className="rounded-lg bg-raised/60 p-4">
          <div className="text-[11px] uppercase tracking-[0.12em] text-faint">Heaviest portal mix</div>
          <div className="mt-2 font-medium">{mixLeader.name}</div>
          <div className="mt-1 font-display text-3xl tabular">{fmtPct(mixLeader.portalShare, 0)}</div>
          <div className="mt-1 text-xs text-muted">portal weight on two-deep</div>
        </div>
      ) : null}
    </div>
  );
}
