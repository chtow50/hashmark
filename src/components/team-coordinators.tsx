import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import {
  fmtCol,
  higherIsBetter,
  LABEL_TEXT,
  UNIT_SHORT,
  whoLine,
  type HistoryRow,
  type SeasonStats,
  type TeamCoachCard,
  type TeamUnitCard,
} from "@/lib/cfb/coordinators";
import { cn } from "@/lib/utils";

type Block = { cards: TeamUnitCard[]; names: Record<string, string>; built: string; asOf: string };

const SIDE: Record<TeamUnitCard["unit"], string> = { off: "Offense", def: "Defense" };
const pct = (v: number | null | undefined) => (v == null ? "—" : `${(v > 1 ? v : v * 100).toFixed(1)}%`);

/**
 * Team page: each side's 2026 unit numbers next to the track record (2024–26, official staff pages) of the
 * coordinator the school lists. Same data as /coordinators. Context, not a forecast or a coach rating.
 */
export function TeamCoordinatorsPanel({ data, teamSlug, teamName }: { data: Block; teamSlug: string; teamName: string }) {
  const tn = (slug: string) => data.names[slug] ?? slug;
  const incoming = data.cards.flatMap((c) => (c.u?.incoming ?? []).map((i) => ({ ...i, unit: c.unit })));
  return (
    <Panel className="mb-6">
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl tracking-wide">Coordinators</h2>
        <Link to="/coordinators" className="text-sm text-accent hover:underline">
          All FBS coordinators →
        </Link>
      </div>
      <p className="mb-4 text-sm text-muted">
        Who runs each side of the ball for {teamName}, this season&apos;s unit numbers, and the units each coordinator ran in 2024–26. Track record of the units, not a coach rating or a forecast.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {data.cards.map((c) => (
          <UnitCard key={c.unit} c={c} tn={tn} teamSlug={teamSlug} asOf={data.asOf} />
        ))}
      </div>
      {incoming.length ? (
        <div className="mt-4 rounded-lg border border-border/70 px-3 py-2 text-sm" data-testid="coord-incoming">
          <p className="font-medium">Announced for next season</p>
          <ul className="mt-1 space-y-1 text-muted">
            {incoming.map((i) => (
              <li key={`${i.unit}${i.name}`}>
                <span className="text-fg">{i.name}</span> · {i.title} (announced {i.announced}){" "}
                <a href={i.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
                  source
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <details className="mt-4 text-xs text-muted">
        <summary className="cursor-pointer text-faint">How to read this</summary>
        <ul className="mt-2 space-y-1.5 leading-relaxed">
          <li>
            Unit numbers are opponent-adjusted from the HASHMARK ridge model on CollegeFootballData play-by-play (FBS-vs-FBS games), the same values as /stats and /coordinators. FBS rank is on adj EPA/play; #1 is best (fewest allowed for a defense). Points per game are raw, all games.
          </li>
          <li>
            The coordinator is whoever the school&apos;s official 2026 staff page lists. A past season is <span className="text-fg">credited</span> when that year&apos;s official staff page lists him with the full coordinator title on that side, the school had one head coach, and the head coach is not documented calling that side. Other seasons are shown greyed with the reason.
          </li>
          <li>
            The 3-year rank is his place on the /coordinators 2024–26 board (2 credited seasons needed). A staff page is a snapshot: a mid-season change can hide behind it, and a title says who holds the job, not always who calls every play.
          </li>
          <li>
            Incoming coordinators are added here only once the school announces the hire, with the announcement linked.{incoming.length ? "" : " None is on file yet."} Coordinator data built {data.built}; 2026 numbers through {data.asOf}. These are stats, not HX: HX stays the only team rating.
          </li>
        </ul>
      </details>
    </Panel>
  );
}

function UnitCard({ c, tn, teamSlug, asOf }: { c: TeamUnitCard; tn: (s: string) => string; teamSlug: string; asOf: string }) {
  const u = c.u;
  const l = c.live;
  const tracked = new Set(c.coaches.map((k) => k.coach.name));
  const untracked = (u?.coaches ?? []).map((p) => p.name).filter((n) => !tracked.has(n));
  const better = c.delta == null ? null : higherIsBetter(c.unit, "epa") ? c.delta > 0 : c.delta < 0;
  return (
    <div className="min-w-0 rounded-lg border border-border/70 p-3" data-testid={`coord-card-${c.unit}`}>
      <p className="text-xs uppercase tracking-wide text-faint">
        {SIDE[c.unit]} · {UNIT_SHORT[c.unit]}
      </p>
      <p className="mt-0.5 font-medium leading-snug">
        {u && u.coaches.length ? whoLine(u) : <span className="text-muted">{u?.label === "hc-calls" ? LABEL_TEXT["hc-calls"] : "No coordinator listed"}</span>}
        {u?.since === 2026 ? <span className="ml-1.5 align-middle text-[10px] uppercase tracking-wide text-accent">1st year</span> : null}
      </p>
      {u ? (
        <p className="mt-0.5 text-xs leading-relaxed text-muted">
          {u.coaches.length === 1 ? u.coaches[0].title : u.coaches.map((p) => `${p.name}: ${p.title}`).join(" · ")}
          {u.coaches.length ? ". " : ""}
          {u.note ? `${u.note} ` : u.label !== "sole" ? `${LABEL_TEXT[u.label]}. ` : ""}
          {u.since != null && u.since !== 2026 ? (u.since <= 2024 ? "In the role here since 2024 or earlier. " : `In the role here since ${u.since}. `) : ""}
          {u.hcSource ? (
            <>
              &ldquo;{u.hcSource.quote}&rdquo;{" "}
              <a href={u.hcSource.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
                source
              </a>{" "}
            </>
          ) : null}
          {u.staffUrl ? (
            <a href={u.staffUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
              2026 staff page
            </a>
          ) : null}
        </p>
      ) : null}

      <div className="mt-3 border-t border-line pt-3">
        <p className="text-xs text-muted">2026 unit, through {asOf}</p>
        {l && l.epa != null ? (
          <>
            <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-3xl tabular">{fmtCol("epa", l.epa)}</span>
              <span className="text-xs text-muted">adj EPA/play {c.unit === "def" ? "allowed" : ""}</span>
              <span className={cn("text-xs tabular", l.rank != null && l.rank <= Math.ceil(l.n / 4) ? "text-accent" : "text-faint")}>
                FBS #{l.rank ?? "—"} of {l.n}
              </span>
            </p>
            <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
              <KV k="Success %" v={pct(l.sr)} />
              <KV k="Explosiveness" v={fmtCol("xpl", l.xpl)} />
              <KV k={c.unit === "off" ? "Pts/game" : "Pts allowed"} v={fmtCol("ppg", l.ppg)} />
              <KV k="vs 2025" v={fmtCol("delta", c.delta)} hint={better == null ? undefined : better ? "better" : "worse"} />
            </dl>
          </>
        ) : (
          <p className="mt-1 text-sm text-muted">No adjusted numbers yet.</p>
        )}
      </div>

      {c.coaches.length || untracked.length ? (
        <div className="mt-3 space-y-3 border-t border-line pt-3">
          {c.coaches.map((k) => (
            <CoachTrack key={k.coach.name} k={k} unit={c.unit} tn={tn} teamSlug={teamSlug} />
          ))}
          {untracked.length ? (
            <p className="text-xs text-muted" data-testid="coord-untracked">
              No coordinator track record on file for {untracked.join(" & ")}
              {u?.label === "hc-title" ? " (the head coach holds the title; /coordinators tracks coordinators only)." : "."}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function CoachTrack({ k, unit, tn, teamSlug }: { k: TeamCoachCard; unit: TeamUnitCard["unit"]; tn: (s: string) => string; teamSlug: string }) {
  const rows = [...k.coach.history].sort((a, b) => b.season - a.season);
  const credited = rows.filter((h) => h.status === "credited" && h.stats?.epa != null && h.season >= 2024).length;
  return (
    <div data-testid="coord-track">
      <p className="text-sm">
        <span className="font-medium">{k.coach.name}</span> <span className="text-muted">· track record 2024–26</span>
      </p>
      <p className="mt-0.5 text-xs leading-relaxed text-muted">
        {k.board3y ? (
          <>
            3-year board: <span className="tabular text-fg">No. {k.board3y.rank}</span> of {k.board3y.n} {UNIT_SHORT[unit]}s · {fmtCol("epa", k.board3y.v.epa)} adj EPA/play · avg FBS rank{" "}
            {fmtCol("rank", k.board3y.v.rank)} · {k.board3y.v.n} credited seasons.{" "}
            <Link to="/coordinators" search={{ view: "3y", unit: unit === "off" ? undefined : unit }} className="underline underline-offset-2 hover:text-fg">
              Board
            </Link>
          </>
        ) : (
          <>Not on the 3-year board: {credited} credited season{credited === 1 ? "" : "s"} with numbers (2 needed).</>
        )}
      </p>
      <ol className="mt-1.5 divide-y divide-border/50 rounded-lg border border-border/70">
        {rows.map((h) => (
          <SeasonLine key={`${h.team}${h.season}`} h={h} tn={tn} teamSlug={teamSlug} />
        ))}
      </ol>
    </div>
  );
}

function SeasonLine({ h, tn, teamSlug }: { h: HistoryRow; tn: (s: string) => string; teamSlug: string }) {
  const ok = h.status === "credited";
  const s: SeasonStats | null = h.stats;
  return (
    <li className={cn("px-2.5 py-1.5 text-xs", ok ? "" : "text-faint")} data-status={h.status}>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className={cn("w-9 tabular font-medium", ok ? "text-fg" : "")}>{h.season}</span>
        <span className={cn("min-w-0", ok ? "text-fg" : "")}>
          {h.team === teamSlug ? (
            tn(h.team)
          ) : (
            <Link to="/teams/$slug" params={{ slug: h.team }} hash="coordinators" className="underline underline-offset-2 hover:text-fg">
              {tn(h.team)}
            </Link>
          )}
        </span>
        <span className="tabular">{s && s.epa != null ? `${fmtCol("epa", s.epa)} · FBS #${s.rank ?? "—"} of ${s.nFbs}` : "no FBS unit numbers"}</span>
        <span className={cn("ml-auto rounded px-1.5 py-px text-[10px] uppercase tracking-wide", ok ? "bg-raised text-fg/80" : "bg-raised/50")}>{ok ? "credited" : "not credited"}</span>
      </div>
      {(!ok && h.reasons?.length) || h.staffUrl ? (
        <p className="mt-0.5 leading-relaxed sm:pl-11">
          {!ok && h.reasons?.length ? <>{h.reasons.join("; ")}. </> : null}
          {h.staffUrl ? (
            <a href={h.staffUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
              {h.season} staff page
            </a>
          ) : null}
        </p>
      ) : null}
    </li>
  );
}

function KV({ k, v, hint }: { k: string; v: string; hint?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{k}</dt>
      <dd className="tabular">
        {v}
        {hint ? <span className="ml-1 text-xs text-faint">{hint}</span> : null}
      </dd>
    </div>
  );
}
