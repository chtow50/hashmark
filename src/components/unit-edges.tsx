import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { EDGE_EVEN, edgeCall, fmtStat, metricOf, type UnitEdge } from "@/lib/cfb/stats";
import { cn } from "@/lib/utils";

type Side = { slug: string; short: string; color: string };

/** Unit-vs-unit edges: each offense stat against the other team's matching defense stat. */
export function UnitEdges({
  home,
  away,
  homeOff,
  awayOff,
  asOf,
}: {
  home: Side;
  away: Side;
  homeOff: UnitEdge[];
  awayOff: UnitEdge[];
  asOf: string;
}) {
  return (
    <Panel>
      <h2 className="mb-1 font-display text-2xl tracking-wide">Unit vs unit</h2>
      <p className="mb-5 text-sm text-muted">
        Each offense stat against the other side&apos;s matching defense stat, both as FBS percentiles (100 = best). A gap of {EDGE_EVEN}+ points is an edge. 2026 stats through {asOf}; EPA, success rate, explosiveness, and line yards are opponent-adjusted (CFBD). Stats only: the HX line above is the prediction.
      </p>
      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <EdgeBlock off={home} def={away} rows={homeOff} />
        <EdgeBlock off={away} def={home} rows={awayOff} />
      </div>
      <p className="mt-4 text-xs text-muted">
        Definitions on{" "}
        <Link to="/stats" className="underline underline-offset-4 hover:text-fg">
          /stats
        </Link>
        .
      </p>
    </Panel>
  );
}

function EdgeBlock({ off, def, rows }: { off: Side; def: Side; rows: UnitEdge[] }) {
  const calls = rows.map(edgeCall);
  const o = calls.filter((c) => c === "offense").length;
  const d = calls.filter((c) => c === "defense").length;
  return (
    <section aria-label={`${off.short} offense vs ${def.short} defense`} className="min-w-0">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line pb-2">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <TeamMark slug={off.slug} color={off.color} logoSize={16} />
          <span className="font-medium">{off.short} O</span>
          <span className="text-faint">vs</span>
          <TeamMark slug={def.slug} color={def.color} logoSize={16} />
          <span className="font-medium">{def.short} D</span>
        </div>
        <span className="shrink-0 text-xs tabular text-muted">
          Edges: O {o} · D {d}
        </span>
      </div>
      <div className="mb-2 grid grid-cols-2 gap-2 text-[10px] uppercase tracking-[0.12em] text-faint">
        <span>{off.short} offense</span>
        <span>{def.short} defense</span>
      </div>
      <ul className="space-y-3">
        {rows.map((r, i) => {
          const call = calls[i];
          const om = metricOf("teams", r.offK)!;
          const dm = metricOf("teams", r.defK)!;
          return (
            <li key={r.key}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                <span className="min-w-0 truncate text-muted">{r.label}</span>
                <span className={cn("inline-flex shrink-0 items-center gap-1.5 font-medium", call === "even" || call == null ? "text-muted" : "text-fg")}>
                  {call === "offense" || call === "defense" ? (
                    <span className="h-2 w-2 rounded-full" style={{ background: call === "offense" ? off.color : def.color }} aria-hidden />
                  ) : null}
                  {call === "offense" ? `Edge: ${off.short} O` : call === "defense" ? `Edge: ${def.short} D` : call === "even" ? "Even" : "n/a"}
                </span>
              </div>
              <div className="grid min-w-0 grid-cols-2 gap-2">
                <Bar p={r.offP} color={off.color} text={`${fmtStat(om, r.offVal)} · P${r.offP == null ? "—" : Math.round(r.offP)}`} />
                <Bar p={r.defP} color={def.color} text={`${fmtStat(dm, r.defVal)} · P${r.defP == null ? "—" : Math.round(r.defP)}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Bar({ p, color, text }: { p: number | null; color: string; text: string }) {
  return (
    <div>
      <div className="h-2 rounded-full bg-raised">
        <div className="h-2 rounded-full" style={{ width: `${p == null ? 0 : Math.max(2, p)}%`, background: color }} />
      </div>
      <div className="mt-0.5 text-[11px] tabular text-muted">{text}</div>
    </div>
  );
}
