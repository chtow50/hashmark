import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import { TeamLink } from "@/components/marks";
import {
  odTermLabel,
  type BoardGapRow,
  type HxMover,
  type Week1Tape,
} from "@/lib/cfb/truth-pack";
import { cn, fmtNum } from "@/lib/utils";

export function DisagreementCard({ rows }: { rows: BoardGapRow[] }) {
  return (
    <Panel>
      <h2 className="font-display text-2xl tracking-wide">Where HX disagrees</h2>
      <p className="mt-1 mb-4 text-sm text-muted">Largest gaps versus Week 1 AP — not the preseason ballot.</p>
      <ul>
        {rows.map((row) => (
          <li
            key={row.name}
            className={cn(
              "flex items-center justify-between gap-3 py-2",
              row.highlight && "-mx-2 rounded-md border-l-2 border-warn bg-raised/40 px-2",
            )}
          >
            <div className="flex min-w-0 items-center gap-2">
              <TeamLink slug={row.slug} name={row.shortName} color={row.colorPrimary} />
            </div>
            <div className="shrink-0 text-right">
              <div
                className={cn(
                  "text-sm tabular",
                  row.delta > 0 ? "text-up" : row.delta < 0 ? "text-down" : "text-muted",
                )}
              >
                {row.delta > 0 ? `HX +${row.delta}` : `HX ${row.delta}`}
              </div>
              <div className="text-[11px] tabular text-faint">
                AP {row.ap} · HX {row.hx}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function AccountabilityCard({
  tape,
  movers,
}: {
  tape: Week1Tape;
  movers: HxMover[];
}) {
  return (
    <Panel>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-display text-2xl tracking-wide">Week 1 tape</h2>
          <p className="mt-1 text-sm text-muted">SU and closer vs the close. HX not retuned.</p>
        </div>
        <Link to="/stories/$slug" params={{ slug: "week-1-tape" }} className="text-sm text-muted hover:text-fg">
          Desk note
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-line bg-raised/40 px-4 py-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-faint">SU</div>
          <div className="mt-1 font-display text-2xl tabular leading-none text-fg sm:text-3xl">
            {tape.su}
          </div>
          <div className="mt-1.5 text-xs tabular text-muted">{fmtNum(tape.su_pct, 1)}%</div>
        </div>
        <div className="rounded-md border border-line bg-raised/40 px-4 py-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-faint">Closer</div>
          <div className="mt-1 font-display text-2xl tabular leading-none text-fg sm:text-3xl">
            {tape.hx_closer}
          </div>
          <div className="mt-1.5 text-xs tabular text-muted">{fmtNum(tape.hx_closer_pct, 1)}%</div>
        </div>
      </div>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        HX movers · term = O/D
      </p>
      <ul className="mt-2">
        {movers.map((m) => (
          <li key={m.slug} className="flex items-center justify-between gap-3 py-1.5">
            <Link
              to="/teams/$slug"
              params={{ slug: m.slug }}
              className="min-h-11 inline-flex items-center text-sm text-fg hover:text-accent"
            >
              {m.name}
            </Link>
            <span className="shrink-0 text-right text-xs tabular text-muted">
              {m.delta_hx > 0 ? "+" : ""}
              {fmtNum(m.delta_hx, 3)} · {odTermLabel(m.term)}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
