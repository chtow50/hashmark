import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { ConfPills, PageHead, Panel } from "@/components/shell";
import { DeskChip, TeamMark } from "@/components/marks";
import { Button } from "@/components/ui/button";
import { formatKickCt, formatKickDayTitle, todayChicago } from "@/lib/cfb/chicago";
import { type ConfFilter, parseConf } from "@/lib/cfb/conferences";
import { favoriteLine, formatVegas } from "@/lib/cfb/featured";
import { predictMatchup } from "@/lib/cfb/model";
import { HASHMARK_MAX_WEEK, listScheduleWeek, listTeams } from "@/lib/cfb/queries";
import {
  filterScheduleGames,
  parseScheduleView,
  type ScheduleView,
} from "@/lib/cfb/schedule-filter";
import { isWinnerFlip, matchupChips } from "@/lib/cfb/schedule-flags";
import type { ScheduleGame } from "@/lib/cfb/types";
import { cn, fmtPct } from "@/lib/utils";

type Search = { w?: number; view?: ScheduleView; conf?: ConfFilter };

const VIEW_OPTIONS: { key: ScheduleView; label: string }[] = [
  { key: "top25", label: "Top 25" },
  { key: "conf", label: "Conference" },
  { key: "all", label: "All FBS" },
];

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

function searchForView(view: ScheduleView, conf: ConfFilter, week: number) {
  const base: Search = { w: week === defaultWeek(todayChicago()) ? undefined : week };
  if (view !== "top25") base.view = view;
  if (view === "conf" && conf !== "All") base.conf = conf;
  return base;
}

export const Route = createFileRoute("/schedule")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const w = parseWeek(s.w);
    const view = parseScheduleView(s.view);
    const conf = parseConf(s.conf);
    return {
      ...(w !== undefined ? { w } : {}),
      ...(view !== "top25" ? { view } : {}),
      ...(view === "conf" && conf !== "All" ? { conf } : {}),
    };
  },
  loaderDeps: ({ search }) => ({ w: search.w, view: search.view, conf: search.conf }),
  loader: async ({ deps }) => {
    const week = deps.w ?? defaultWeek(todayChicago());
    const view = parseScheduleView(deps.view);
    const conf = parseConf(deps.conf);
    const [games, teams] = await Promise.all([
      listScheduleWeek({ data: { week } }),
      listTeams(),
    ]);
    const filtered = filterScheduleGames(games, teams, view, conf);
    return { week, games, filtered, teams, view, conf };
  },
  component: SchedulePage,
  head: () => ({ meta: [{ title: "Schedule · HASHMARK" }] }),
});

function SchedulePage() {
  const { week, games, filtered, view, conf } = Route.useLoaderData();
  const prev = week > 0 ? week - 1 : null;
  const next = week < HASHMARK_MAX_WEEK ? week + 1 : null;

  const emptyCopy = useMemo(() => {
    if (view === "top25") {
      return {
        title: "No Top 25 games this week",
        body: "Nothing on the slate matches a team in the HX or Week 1 AP Top 25. Try All FBS or pick another week.",
      };
    }
    if (view === "conf" && conf !== "All") {
      return {
        title: `No ${conf} games this week`,
        body: `Week ${week} has no matchups with a ${conf} team. Try another conference or switch to All FBS.`,
      };
    }
    if (view === "conf") {
      return {
        title: "Pick a conference",
        body: "Choose a conference below to filter the slate.",
      };
    }
    return {
      title: "No FBS games on the 136",
      body: "This week has no HASHMARK matchup on the board.",
    };
  }, [view, conf, week]);

  return (
    <div>
      <PageHead
        kicker={`Week ${week} · The slate`}
        title={`Week ${week} slate`}
        lede="HASHMARK spread and win% from HX. Vegas is the Research CFB consensus. FINAL is locked on the tape. Sorted by kick, America/Chicago."
      />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Schedule filter">
        {VIEW_OPTIONS.map((opt) => (
          <Link
            key={opt.key}
            to="/schedule"
            search={searchForView(opt.key, conf, week) as never}
            role="tab"
            aria-selected={view === opt.key}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150",
              view === opt.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {view === "conf" ? (
        <ConfPills
          value={conf}
          to="/schedule"
          searchFor={(c) => ({
            view: "conf",
            ...(week !== defaultWeek(todayChicago()) ? { w: week } : {}),
            ...(c === "All" ? {} : { conf: c }),
          })}
        />
      ) : null}

      <p className="mb-4 text-xs tabular text-faint">
        {filtered.length} of {games.length} games
        {view === "top25" ? " · Top 25" : null}
        {view === "conf" && conf !== "All" ? ` · ${conf}` : null}
        {view === "all" ? " · All FBS" : null}
      </p>

      <div className="mb-5 flex items-center justify-between gap-3">
        {prev !== null ? (
          <Button asChild variant="outline" size="sm">
            <Link to="/schedule" search={searchForView(view, conf, prev) as never} aria-label={`Week ${prev}`}>
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
          Week {week} · CT
        </p>
        {next !== null ? (
          <Button asChild variant="outline" size="sm">
            <Link to="/schedule" search={searchForView(view, conf, next) as never} aria-label={`Week ${next}`}>
              Week {next}
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>

      {filtered.length === 0 ? (
        <Panel>
          <p className="font-display text-2xl tracking-wide">{emptyCopy.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{emptyCopy.body}</p>
        </Panel>
      ) : (
        <Panel className="overflow-hidden p-0 sm:p-0">
          <ul className="divide-y divide-line">
            {filtered.map((g) => (
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
  const chips = matchupChips(pred, { neutral: g.neutral, vegasSpread: g.vegasSpread, status: g.status });

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
              {chips.map((chip) => (
                <DeskChip key={chip.kind} tone={chip.tone}>{chip.label}</DeskChip>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex items-center gap-2">
                <TeamMark slug={g.awaySlug} color={g.awayColor} />
                <span className="font-medium">{g.awayName}</span>
              </span>
              <span className="text-faint">{g.neutral ? "vs" : "@"}</span>
              <span className="inline-flex items-center gap-2">
                <TeamMark slug={g.homeSlug} color={g.homeColor} />
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
            {formatKickDayTitle(g.kickoffAt, g.kickoffDate)}
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
