import { createFileRoute, Link } from "@tanstack/react-router";
import { ConfPills, PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { ShowMore } from "@/components/show-more";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import { listTeams } from "@/lib/cfb/queries";
import { getSorBoard } from "@/lib/cfb/sor-queries";
import type { SorRow } from "@/lib/cfb/sor";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type SortKey = "sor" | "played" | "remaining";
type Search = { conf?: ConfFilter; sort?: SortKey };
const SORTS: { key: SortKey; label: string }[] = [
  { key: "sor", label: "Strength of record" },
  { key: "played", label: "Schedule played" },
  { key: "remaining", label: "Schedule left" },
];

export const Route = createFileRoute("/strength")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const conf = parseConf(s.conf);
    const sort = SORTS.some((x) => x.key === s.sort) && s.sort !== "sor" ? (s.sort as SortKey) : undefined;
    return { ...(conf !== "All" ? { conf } : {}), ...(sort ? { sort } : {}) };
  },
  loader: async () => {
    const [teams, sor] = await Promise.all([listTeams(), getSorBoard()]);
    return { teams, sor };
  },
  component: StrengthPage,
  head: () =>
    seo({
      path: "/strength",
      title: "Strength of record and schedule · every FBS team · HASHMARK",
      description:
        "Strength of record (wins above what a No. 25 HX team would get on the same schedule) and strength of schedule played and remaining, from current HX ratings and the real 2026 slate.",
    }),
});

const signed = (x: number) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x).toFixed(2)}`;

function StrengthPage() {
  const { teams, sor } = Route.useLoaderData();
  const search = Route.useSearch();
  const conf = search.conf ?? "All";
  const sort = search.sort ?? "sor";
  const bySlug = new Map(teams.map((t) => [t.slug, t]));
  const bench = bySlug.get(sor.benchSlug);
  const rows = sor.rows
    .filter((r) => bySlug.has(r.slug) && inConf(bySlug.get(r.slug)!.conference, conf))
    .sort((a, b) => {
      if (sort === "played") return (a.sosPlayedRank ?? 999) - (b.sosPlayedRank ?? 999) || a.sorRank - b.sorRank;
      if (sort === "remaining") return (a.sosRemainingRank ?? 999) - (b.sosRemainingRank ?? 999) || a.sorRank - b.sorRank;
      return a.sorRank - b.sorRank;
    });

  return (
    <div>
      <PageHead
        kicker="Current HX · real 2026 schedule"
        title="Strength of record & schedule"
        lede={`Strength of record asks how much better your record is than a typical top-25 team's would be against the same opponents, at the same sites. The benchmark is the current No. 25 on the HX board${bench ? ` (${bench.name}, HX ${sor.benchHx.toFixed(2)})` : ""}. Schedule strength is the average current HX of FBS opponents, played and still to come.`}
      />

      <ConfPills value={conf} to="/strength" searchFor={(c) => ({ ...(c === "All" ? {} : { conf: c }), ...(sort !== "sor" ? { sort } : {}) })} />

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Sort">
        {SORTS.map((s) => (
          <Link
            key={s.key}
            to="/strength"
            search={{ ...(conf !== "All" ? { conf } : {}), ...(s.key !== "sor" ? { sort: s.key } : {}) }}
            role="tab"
            aria-selected={sort === s.key}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-lg border px-3 text-sm transition-colors",
              sort === s.key ? "border-fg bg-fg text-bg" : "border-border text-muted hover:text-fg",
            )}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* Phones: cards. */}
      <div className="sm:hidden">
        <ShowMore
          items={rows}
          noun="teams"
          resetKey={`${conf}|${sort}`}
          className="space-y-3"
          render={(r) => {
            const t = bySlug.get(r.slug)!;
            return (
              <Link key={r.slug} to="/teams/$slug" params={{ slug: r.slug }} className="block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="w-7 shrink-0 font-display text-xl tabular text-muted">{rankFor(r, sort) ?? "—"}</span>
                    <TeamMark slug={t.slug} color={t.colorPrimary} logoSize={20} />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{t.name}</span>
                      <span className="block text-xs text-muted">
                        {r.w}–{r.l} · HX No. {t.hxRank}
                      </span>
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl tabular">{signed(r.sor)}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted">SOR No. {r.sorRank}</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <Mini label="Top-25 team" value={`${r.benchW.toFixed(1)}–${(r.w + r.l - r.benchW).toFixed(1)}`} />
                  <Mini label="Played" value={sosText(r.sosPlayed, r.sosPlayedRank)} />
                  <Mini label="Left" value={sosText(r.sosRemaining, r.sosRemainingRank)} />
                </div>
              </Link>
            );
          }}
        />
      </div>

      {/* Tablet and up: table. */}
      <Panel className="hidden p-0 sm:block sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.08em] text-muted">
                <th className="border-b border-border px-3 py-3 text-right font-medium">#</th>
                <th className="border-b border-border px-3 py-3 text-left font-medium">Team</th>
                <th className="border-b border-border px-3 py-3 text-right font-medium">Record</th>
                <th className="border-b border-border px-3 py-3 text-right font-medium" title="What the No. 25 HX team would expect on these games">Top-25 team</th>
                <th className="border-b border-border px-3 py-3 text-right font-medium" title="Actual wins minus the benchmark's expected wins">SOR</th>
                <th className="border-b border-border px-3 py-3 text-right font-medium" title="Average current HX of FBS opponents played (rank)">Schedule played</th>
                <th className="border-b border-border px-3 py-3 text-right font-medium" title="Average current HX of FBS opponents left (rank)">Schedule left</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const t = bySlug.get(r.slug)!;
                return (
                  <tr key={r.slug} className="hover:[&>td]:bg-raised">
                    <td className="w-10 border-b border-line px-3 py-2 text-right tabular text-faint">{rankFor(r, sort) ?? "—"}</td>
                    <td className="border-b border-line px-3 py-2">
                      <Link to="/teams/$slug" params={{ slug: t.slug }} className="flex min-h-10 items-center gap-2">
                        <TeamMark slug={t.slug} color={t.colorPrimary} />
                        <span>
                          <span className="block font-medium">{t.name}</span>
                          <span className="block text-xs text-muted">
                            {t.conference} · HX No. {t.hxRank}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="border-b border-line px-3 py-2 text-right tabular">
                      {r.w}–{r.l}
                      {r.fcsPlayed ? <span className="block text-[11px] text-muted">{r.fcsPlayed} vs FCS</span> : null}
                    </td>
                    <td className="border-b border-line px-3 py-2 text-right tabular text-muted">
                      {r.benchW.toFixed(1)}–{(r.w + r.l - r.benchW).toFixed(1)}
                    </td>
                    <td className={cn("border-b border-line px-3 py-2 text-right font-semibold tabular", r.sor > 0 ? "text-up" : r.sor < 0 ? "text-down" : "")}>
                      {signed(r.sor)}
                      <span className="block text-[11px] font-normal text-muted">No. {r.sorRank}</span>
                    </td>
                    <td className="border-b border-line px-3 py-2 text-right tabular">
                      {sosText(r.sosPlayed, r.sosPlayedRank)}
                      <span className="block text-[11px] text-muted">{r.fbsPlayed} FBS</span>
                    </td>
                    <td className="border-b border-line px-3 py-2 text-right tabular">
                      {sosText(r.sosRemaining, r.sosRemainingRank)}
                      <span className="block text-[11px] text-muted">
                        {r.fbsRemaining} FBS{r.fcsRemaining ? ` + ${r.fcsRemaining} FCS` : ""}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel className="mt-6">
        <h2 className="font-display text-lg">Method</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
          <li>Benchmark: the current No. 25 team on the HX board. For each game already played, its win chance uses the HX matchup engine (Elo = 1500 + 55 × HX, 60 points home field, none at neutral sites). Against an FCS opponent it uses the season sim&apos;s fixed rule: 92% home, 88% away.</li>
          <li>SOR = actual wins − the benchmark&apos;s expected wins on those games. +1.00 means one more win than a typical top-25 team would have.</li>
          <li>Schedule played / left = average current HX of FBS opponents, ranked 1–138 (No. 1 = hardest). FCS opponents have no HX, so they are counted but left out of the average.</li>
          <li>Everything uses current HX, so a win over a team that has since risen counts for more. Only real FINALs and the real remaining slate are used. More on <Link to="/model" hash="sor" className="underline underline-offset-4 hover:text-fg">The Model</Link>.</li>
        </ul>
      </Panel>
    </div>
  );
}

function rankFor(r: SorRow, sort: SortKey): number | null {
  return sort === "played" ? r.sosPlayedRank : sort === "remaining" ? r.sosRemainingRank : r.sorRank;
}

function sosText(v: number | null, rank: number | null): string {
  return v == null ? "n/a" : `${v.toFixed(2)} · No. ${rank}`;
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg bg-raised px-2 py-1.5">
      <div className="truncate text-[10px] uppercase tracking-wide text-muted">{label}</div>
      <div className="truncate tabular text-fg/90">{value}</div>
    </div>
  );
}
