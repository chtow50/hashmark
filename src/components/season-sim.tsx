import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import { DeskChip, TeamMark } from "@/components/marks";
import { formatKickCt } from "@/lib/cfb/chicago";
import { favoriteLine, formatVegas } from "@/lib/cfb/featured";
import { predictMatchup } from "@/lib/cfb/model";
import { isWinnerFlip, matchupChips } from "@/lib/cfb/schedule-flags";
import {
  make12FieldLabel,
  make12PanelLede,
  make12TitleLabel,
  type Make12Odds,
  type TeamScheduleRow,
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

function StatBlock({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</div>
      <div className="mt-1 font-display text-xl tabular leading-none text-fg sm:text-2xl">{value}</div>
    </div>
  );
}

function TeamHubScheduleRow({ row }: { row: TeamScheduleRow }) {
  const g = row.game;
  const vegasOnly = row.isFcs;
  const pred =
    g && !vegasOnly
      ? predictMatchup(
          { hxRating: g.homeHx, offenseRating: g.homeOff, defenseRating: g.homeDef },
          { hxRating: g.awayHx, offenseRating: g.awayOff, defenseRating: g.awayDef },
          { neutral: g.neutral },
        )
      : null;
  const hxLine =
    g && pred ? favoriteLine(g.homeShort, g.awayShort, pred.spread) : null;
  const hxWin = pred ? (pred.spread >= 0 ? pred.homeWinPct : pred.awayWinPct) : null;
  const vegasHomeShort = g?.homeShort ?? row.homeShort ?? null;
  const vegasAwayShort = g?.awayShort ?? row.awayShort ?? null;
  const vegasSpread = g?.vegasSpread ?? row.vegasSpread ?? null;
  const vegasLine =
    vegasSpread == null || vegasHomeShort == null || vegasAwayShort == null
      ? null
      : favoriteLine(vegasHomeShort, vegasAwayShort, vegasSpread);
  const flip = g && pred ? isWinnerFlip(pred, g.vegasSpread) : false;
  const chips =
    g && pred
      ? matchupChips(pred, { neutral: g.neutral, vegasSpread: g.vegasSpread, status: g.status })
      : [];
  const isFinal =
    row.status === "final" && row.homeScore != null && row.awayScore != null && g != null;
  const finalScore = isFinal
    ? `${g.awayShort} ${g.awayScore}–${g.homeScore} ${g.homeShort}`
    : null;

  const inner = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-[11px] uppercase tracking-[0.14em] text-faint">
              Week {row.week} · {row.kickoffDate}
              {row.neutral ? " · Neutral" : null}
              {row.location ? ` · ${row.location}` : null}
            </div>
            {chips.map((chip) => (
              <DeskChip key={chip.kind} tone={chip.tone}>{chip.label}</DeskChip>
            ))}
            {row.isFcs ? (
              <span className="rounded bg-raised px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-faint">
                {row.hxSpreadPolicy === "vegas_only_fcs_unrated" ? "Vegas-only" : "FCS stub"}
              </span>
            ) : null}
            {row.live ? (
              <DeskChip tone="accent">In progress</DeskChip>
            ) : null}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {row.opponentSlug && row.opponentColor ? (
              <TeamMark slug={row.opponentSlug} color={row.opponentColor} logoSize={20} />
            ) : null}
            <span className="font-medium">
              {row.home ? "vs" : "@"} {row.opponentLabel}
            </span>
          </div>
          {row.kickoffAt || row.tv ? (
            <p className="mt-1 text-sm text-muted">
              {row.kickoffAt ? formatKickCt(row.kickoffAt) : null}
              {row.kickoffAt && row.tv ? " · " : null}
              {row.tv}
            </p>
          ) : null}
          {isFinal && finalScore ? (
            <p className="mt-1 text-sm text-muted">{finalScore}</p>
          ) : null}
          {flip && hxLine && g ? (
            <p className="mt-1 text-sm text-warn">
              HASHMARK takes {hxLine} · Vegas has {vegasLine ?? "the other side"}
            </p>
          ) : null}
        </div>
      </div>

      {g && pred && hxLine && hxWin != null ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatBlock label="HASHMARK" value={`${hxLine} · ${fmtPct(hxWin * 100, 1)}`} />
          <StatBlock label="Vegas" value={formatVegas(vegasLine, g.vegasTotal)} />
          {isFinal && finalScore ? (
            <StatBlock label="FINAL" value={finalScore} />
          ) : null}
        </div>
      ) : vegasOnly ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatBlock label="HASHMARK" value="—" />
          <StatBlock label="Vegas" value={formatVegas(vegasLine, null)} />
        </div>
      ) : null}
    </>
  );

  if (g) {
    return (
      <li className="py-3.5">
        <Link
          to="/matchup"
          search={{
            home: g.homeSlug,
            away: g.awaySlug,
            ...(g.neutral ? { neutral: true } : {}),
          }}
          className="-mx-1 block rounded-md px-1 transition-colors duration-150 hover:bg-raised"
        >
          {inner}
        </Link>
        {row.opponentSlug ? (
          <Link
            to="/teams/$slug"
            params={{ slug: row.opponentSlug }}
            className="mt-1 inline-block text-xs text-muted hover:text-accent"
          >
            Opponent page
          </Link>
        ) : null}
      </li>
    );
  }

  return <li className="py-3.5">{inner}</li>;
}

/** Make 12 panel — make-field and win-title are separate cells (never title-only). */
export function Make12Panel({ odds, className }: { odds: Make12Odds; className?: string }) {
  const makeFieldPending = odds.makeField == null;
  const winTitlePending = odds.winTitle == null;

  return (
    <div className={className}>
      <div className="mb-3">
        <h2 className="font-display text-2xl tracking-wide">Make 12</h2>
        <p className="mt-1 text-sm text-muted">{make12PanelLede(odds.makeFieldSource)}</p>
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
}: {
  rows: TeamScheduleRow[];
  teamShortName: string;
}) {
  return (
    <Panel className="mb-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-display text-2xl tracking-wide">Remaining schedule</h2>
          <p className="mt-1 text-sm text-muted">
            Unplayed FBS slate plus FCS stubs. HASHMARK spread and win% from HX; FCS is Vegas-only (no invented HASHMARK spread).
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
            <TeamHubScheduleRow key={row.key} row={row} />
          ))}
        </ul>
      )}
    </Panel>
  );
}

export function SeasonScheduleSection({
  rows,
}: {
  rows: TeamScheduleRow[];
}) {
  if (rows.length === 0) return null;

  return (
    <Panel className="mb-6">
      <div className="mb-4">
        <h2 className="font-display text-2xl tracking-wide">Season schedule</h2>
        <p className="mt-1 text-sm text-muted">
          Full FBS slate — HASHMARK line and Vegas close when stamped; FINAL when locked.
        </p>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((row) => (
          <TeamHubScheduleRow key={row.key} row={row} />
        ))}
      </ul>
    </Panel>
  );
}
