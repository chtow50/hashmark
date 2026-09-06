import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import {
  make12FieldLabel,
  make12TitleLabel,
  type Make12Odds,
  type RemainingScheduleRow,
} from "@/lib/cfb/season-sim";
import { cn, fmtPct } from "@/lib/utils";

function OddsCell({
  label,
  value,
  sourceNote,
  pending,
}: {
  label: string;
  value: string;
  sourceNote?: string;
  pending?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-line bg-raised/40 px-4 py-3",
        pending && "border-dashed",
      )}
    >
      <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</div>
      <div
        className={cn(
          "mt-1 font-display text-2xl tabular leading-none sm:text-3xl",
          pending ? "text-muted" : "text-fg",
        )}
      >
        {value}
      </div>
      {sourceNote ? <div className="mt-1.5 text-xs text-muted">{sourceNote}</div> : null}
    </div>
  );
}

/** Make 12 panel — make-field and win-title are separate cells (never title-only). */
export function Make12Panel({ odds, className }: { odds: Make12Odds; className?: string }) {
  const makeFieldPending = odds.makeField == null;
  const winTitlePending = odds.winTitle == null;

  return (
    <div className={className}>
      <div className="mb-3">
        <h2 className="font-display text-2xl tracking-wide">Make 12</h2>
        <p className="mt-1 text-sm text-muted">
          12-team CFP field odds — make-field and national-title paths are separate draws.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <OddsCell
          label="Make field"
          value={makeFieldPending ? "—" : fmtPct(odds.makeField!, 1)}
          sourceNote={make12FieldLabel(odds.makeFieldSource)}
          pending={makeFieldPending}
        />
        <OddsCell
          label="Win title"
          value={winTitlePending ? "—" : fmtPct(odds.winTitle!, 1)}
          sourceNote={make12TitleLabel(odds.winTitleSource)}
          pending={winTitlePending}
        />
      </div>
    </div>
  );
}

export function RemainingScheduleSection({
  rows,
  teamShortName,
}: {
  rows: RemainingScheduleRow[];
  teamShortName: string;
}) {
  return (
    <Panel className="mb-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-display text-2xl tracking-wide">Remaining schedule</h2>
          <p className="mt-1 text-sm text-muted">
            Unplayed FBS slate plus FCS stubs off the 136-team board. Season-sim draws pending.
          </p>
        </div>
        <span className="text-xs tabular text-faint">
          {rows.length === 0 ? "Season complete" : `${rows.length} left`}
        </span>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">No remaining games on the board.</p>
      ) : (
        <ul className="divide-y divide-line">
          {rows.map((row) => (
            <li key={row.key} className="py-3.5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-faint">
                    Week {row.week} · {row.kickoffDate}
                    {row.neutral ? " · Neutral" : null}
                    {row.location ? ` · ${row.location}` : null}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="font-medium">
                      {row.home ? "vs" : "@"}{" "}
                      {row.opponentSlug ? (
                        <Link to="/teams/$slug" params={{ slug: row.opponentSlug }} className="hover:text-accent">
                          {row.opponentLabel}
                        </Link>
                      ) : (
                        row.opponentLabel
                      )}
                    </span>
                    {row.isFcs ? (
                      <span className="rounded bg-raised px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-faint">
                        FCS stub
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="text-right text-xs text-muted">
                  <div className="uppercase tracking-[0.12em] text-faint">{teamShortName}</div>
                  <div className="mt-0.5 tabular">{row.home ? "Home" : "Away"}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
