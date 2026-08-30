import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHead, Panel } from "@/components/shell";
import { TeamSwatch } from "@/components/marks";
import { Button } from "@/components/ui/button";
import { formatChicagoTitle, formatKickCt, todayChicago } from "@/lib/cfb/chicago";
import { predictMatchup } from "@/lib/cfb/model";
import { HASHMARK_MAX_WEEK, listScheduleWeek } from "@/lib/cfb/queries";
import type { Prediction, ScheduleGame } from "@/lib/cfb/types";
import { cn, fmtNum, fmtPct } from "@/lib/utils";

type Search = { w?: number };

function parseWeek(v: unknown): number | undefined {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isInteger(n) || n < 0 || n > HASHMARK_MAX_WEEK) return undefined;
  return n;
}

function defaultWeek(ymd: string): number {
  if (ymd <= "2026-08-30") return 0;
  if (ymd <= "2026-09-07") return 1;
  return Math.min(HASHMARK_MAX_WEEK, 2);
}

export const Route = createFileRoute("/schedule")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const w = parseWeek(s.w);
    return w !== undefined ? { w } : {};
  },
  loaderDeps: ({ search }) => ({ w: search.w }),
  loader: async ({ deps }) => {
    const week = deps.w ?? defaultWeek(todayChicago());
    const games = await listScheduleWeek({ data: { week } });
    return { week, games };
  },
  component: SchedulePage,
  head: () => ({ meta: [{ title: "Schedule · HASHMARK" }] }),
});

function SchedulePage() {
  const { week, games } = Route.useLoaderData();
  const prev = week > 0 ? week - 1 : null;
  const next = week < HASHMARK_MAX_WEEK ? week + 1 : null;

  return (
    <div>
      <PageHead
        kicker={`Week ${week} · The slate`}
        title={`Week ${week} slate`}
        lede="HASHMARK spread and win% from HX. Vegas is the Research CFB consensus. FINAL is locked on the tape. Sorted by kick, America/Chicago."
      />

      <div className="mb-5 flex items-center justify-between gap-3">
        {prev !== null ? (
          <Button asChild variant="outline" size="sm">
            <Link to="/schedule" search={{ w: prev }} aria-label={`Week ${prev}`}>
              <ChevronLeft className="size-4" />
              Week {prev}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="size-4" />
            Week 0
          </Button>
        )}
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          {games.length === 1 ? "1 game" : `${games.length} games`} · CT
        </p>
        {next !== null ? (
          <Button asChild variant="outline" size="sm">
            <Link to="/schedule" search={{ w: next }} aria-label={`Week ${next}`}>
              Week {next}
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>

      {games.length === 0 ? (
        <Panel>
          <p className="font-display text-2xl tracking-wide">No FBS games on the 136.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This day has no HASHMARK matchup. The board only covers the 136 — not every team that
            happens to play FBS this weekend.
          </p>
        </Panel>
      ) : (
        <Panel className="overflow-hidden p-0 sm:p-0">
          <ul className="divide-y divide-line">
            {games.map((g) => (
              <ScheduleRow key={g.id} game={g} />
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

function ScheduleRow({ game: g }: { game: ScheduleGame }) {
  const pred = predictMatchup(
    { hxRating: g.homeHx, offenseRating: g.homeOff, defenseRating: g.homeDef },
    { hxRating: g.awayHx, offenseRating: g.awayOff, defenseRating: g.awayDef },
    { neutral: g.neutral },
  );
  const hxLine = favoriteLine(g.homeShort, g.awayShort, pred.spread);
  const hxWin = pred.spread >= 0 ? pred.homeWinPct : pred.awayWinPct;
  const vegasLine = g.vegasSpread == null ? null : favoriteLine(g.homeShort, g.awayShort, g.vegasSpread);
  const flip = isWinnerFlip(pred, g.vegasSpread);

  return (
    <li>
      <Link
        to="/matchup"
        search={{
          home: g.homeSlug,
          away: g.awaySlug,
          ...(g.neutral ? { neutral: true } : {}),
        }}
        className="block px-4 py-4 transition-colors duration-150 hover:bg-raised sm:px-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {g.neutral ? (
                <Chip>Neutral</Chip>
              ) : null}
              {g.status === "final" ? <Chip tone="accent">Final</Chip> : null}
              {flip ? <Chip tone="warn">Winner flip</Chip> : null}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex items-center gap-2">
                <TeamSwatch color={g.awayColor} />
                <span className="font-medium">{g.awayName}</span>
              </span>
              <span className="text-faint">{g.neutral ? "vs" : "@"}</span>
              <span className="inline-flex items-center gap-2">
                <TeamSwatch color={g.homeColor} />
                <span className="font-medium">{g.homeName}</span>
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {g.neutral ? "Neutral site" : null}
              {g.neutral && g.location ? " · " : null}
              {g.location}
              {g.status === "final" && g.homeScore != null && g.awayScore != null
                ? ` · ${g.awayShort} ${g.awayScore}–${g.homeScore} ${g.homeShort}`
                : null}
            </p>
            {flip ? (
              <p className="mt-1 text-sm text-warn">
                HASHMARK takes {hxLine} · Vegas has {vegasLine ?? "the other side"}
              </p>
            ) : null}
          </div>
          <p className="shrink-0 text-right font-mono text-sm tabular text-muted">
            {formatChicagoTitle(g.kickoffDate)}
            <br />
            {formatKickCt(g.kickoffAt)}
            {g.tv ? ` · ${g.tv}` : ""}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatBlock
            label="HASHMARK"
            value={`${hxLine} · ${fmtPct(hxWin * 100, 1)}`}
          />
          <StatBlock
            label="Vegas"
            value={formatVegas(vegasLine, g.vegasTotal)}
          />
          {g.status === "final" && g.homeScore != null && g.awayScore != null ? (
            <StatBlock
              label="FINAL"
              value={`${g.awayShort} ${g.awayScore}–${g.homeScore} ${g.homeShort}`}
            />
          ) : (
            <StatBlock
              label="Kick"
              value={g.tv ? `${formatKickCt(g.kickoffAt)} · ${g.tv}` : formatKickCt(g.kickoffAt)}
              className="hidden sm:block"
            />
          )}
        </div>
      </Link>
    </li>
  );
}

function favoriteLine(homeShort: string, awayShort: string, spread: number): string {
  if (Math.abs(spread) < 0.05) return "PK";
  return spread > 0
    ? `${homeShort} −${fmtNum(spread, 1)}`
    : `${awayShort} −${fmtNum(-spread, 1)}`;
}

function isWinnerFlip(pred: Prediction, vegasSpread: number | null): boolean {
  if (vegasSpread == null) return false;
  if (Math.abs(pred.spread) < 0.05 || Math.abs(vegasSpread) < 0.05) return false;
  return pred.spread > 0 !== vegasSpread > 0;
}

function formatVegas(line: string | null, total: number | null): string {
  if (line == null && total == null) return "—";
  if (line == null) return `O/U ${fmtNum(total as number, 1)}`;
  if (total == null) return line;
  return `${line} · O/U ${fmtNum(total, 1)}`;
}

function Chip({
  children,
  tone = "muted",
}: {
  children: string;
  tone?: "muted" | "accent" | "warn";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2 text-[11px] uppercase tracking-[0.12em]",
        tone === "accent" && "bg-accent text-accent-fg",
        tone === "warn" && "bg-raised text-warn",
        tone === "muted" && "bg-raised text-muted",
      )}
    >
      {children}
    </span>
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
