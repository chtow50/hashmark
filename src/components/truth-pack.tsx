import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import { TeamLink } from "@/components/marks";
import {
  odTermLabel,
  type BoardGapRow,
  type HxMover,
  type Week2BoardFlag,
  type Week2SeasonTape,
  type Week2Tape,
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
  season,
  flags,
  movers,
}: {
  tape: Week2Tape;
  season: Week2SeasonTape;
  flags: Week2BoardFlag[];
  movers?: HxMover[];
}) {
  return (
    <Panel>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-display text-2xl tracking-wide">Week 2 tape</h2>
          <p className="mt-1 text-sm text-muted">
            SU and closer vs the close. FLAG under 45%. HX not retuned.
          </p>
        </div>
        <Link to="/stories/$slug" params={{ slug: "week-2-tape" }} className="text-sm text-muted hover:text-fg">
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
        <div className="rounded-md border border-warn/40 bg-raised/40 px-4 py-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-warn">Closer · FLAG</div>
          <div className="mt-1 font-display text-2xl tabular leading-none text-fg sm:text-3xl">
            {tape.hx_closer}
          </div>
          <div className="mt-1.5 text-xs tabular text-muted">{fmtNum(tape.hx_closer_pct, 1)}%</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">
        Season {season.label}: SU {fmtNum(season.su_pct, 1)}% · closer {fmtNum(season.hx_closer_pct, 1)}%
      </p>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        Board flags · pre-Δ · HX 2026.3
      </p>
      <ul className="mt-2">
        {flags.map((flag) => (
          <li key={flag.id} className="flex items-start justify-between gap-3 py-1.5">
            <div className="min-w-0">
              <div className="text-sm text-fg">{flag.label}</div>
              <div className="mt-0.5 text-xs tabular text-muted">
                {flag.hx} vs {flag.vegas} · {flag.final}
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 pt-0.5 text-[11px] uppercase tracking-[0.12em]",
                flag.result === "HIT" ? "text-up" : "text-down",
              )}
            >
              {flag.result}
            </span>
          </li>
        ))}
      </ul>
      {movers && movers.length > 0 ? (
        <>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Week 1 HX movers · term = O/D
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
        </>
      ) : null}
    </Panel>
  );
}
