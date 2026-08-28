import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHead, Panel } from "@/components/shell";
import { StateMosaic } from "@/components/state-mosaic";
import { TeamSwatch } from "@/components/marks";
import { getStateDetail, listStates } from "@/lib/cfb/queries";
import { fmtNum } from "@/lib/utils";
import type { StateCommit } from "@/lib/cfb/types";

type Search = { code?: string };

export const Route = createFileRoute("/states")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    code: typeof s.code === "string" ? s.code.toUpperCase() : "TX",
  }),
  loader: () => listStates(),
  component: StatesPage,
  head: () => ({ meta: [{ title: "States · HASHMARK" }] }),
});

function StatesPage() {
  const states = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const code = search.code ?? "TX";
  const [detail, setDetail] = useState<{
    state: (typeof states)[number] | null;
    teams: { slug: string; name: string; conference: string; city: string; color_primary: string; hx_rank: number; mascot: string }[];
    commits: StateCommit[];
  } | null>(null);

  useEffect(() => {
    let live = true;
    getStateDetail({ data: { code } }).then((d) => {
      if (live) setDetail(d);
    });
    return () => {
      live = false;
    };
  }, [code]);

  function select(next: string) {
    navigate({ search: { code: next } });
  }

  return (
    <div>
      <PageHead
        kicker="Pipelines"
        title="The states"
        lede="Where the 2026 class comes from, which FBS programs live there, and who is harvesting the state."
      />

      <Panel className="mb-6">
        <StateMosaic states={states} selected={code} onSelect={select} />
        <p className="mt-3 text-xs text-faint">Heat is talent index — volume, five-stars, and average composite rating of HASHMARK-tracked recruits.</p>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">
            {detail?.state?.name ?? code}
          </h2>
          {detail?.state ? (
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">Recruits</dt>
                <dd className="mt-1 font-display text-2xl tabular">{detail.state.recruits}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">Five-stars</dt>
                <dd className="mt-1 font-display text-2xl tabular">{detail.state.fiveStars}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">Avg rating</dt>
                <dd className="mt-1 font-display text-2xl tabular">{fmtNum(detail.state.avgRating, 1)}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">FBS teams</dt>
                <dd className="mt-1 font-display text-2xl tabular">{detail.state.teamCount}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm text-muted">Loading pipeline…</p>
          )}

          {detail && detail.teams.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-[11px] uppercase tracking-[0.14em] text-faint">Programs in state</h3>
              <ul className="mt-2">
                {detail.teams.map((t) => (
                  <li key={t.slug}>
                    <Link
                      to="/teams/$slug"
                      params={{ slug: t.slug }}
                      className="flex min-h-11 items-center gap-2.5"
                    >
                      <TeamSwatch color={t.color_primary} />
                      <span className="font-medium">{t.name}</span>
                      <span className="text-xs text-muted">
                        HX #{t.hx_rank} · {t.city}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Panel>

        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Who signed them</h2>
          <p className="mt-1 mb-4 text-sm text-muted">Tracked starters whose hometown is {code}.</p>
          <ul>
            {(detail?.commits ?? []).map((c) => (
              <li key={c.teamSlug} className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-0">
                <Link
                  to="/teams/$slug"
                  params={{ slug: c.teamSlug }}
                  className="flex min-h-11 items-center gap-2.5"
                >
                  <TeamSwatch color={c.colorPrimary} />
                  <span>
                    <span className="block font-medium">{c.teamName}</span>
                    <span className="block text-xs text-muted">{c.conference}</span>
                  </span>
                </Link>
                <span className="tabular text-sm">{c.commits}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel className="mt-6 overflow-hidden p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-3 py-3 font-medium">Region</th>
                <th className="px-3 py-3 font-medium">Recruits</th>
                <th className="px-3 py-3 font-medium">5-st</th>
                <th className="px-3 py-3 font-medium">Avg</th>
                <th className="px-3 py-3 font-medium">Index</th>
              </tr>
            </thead>
            <tbody>
              {states.map((s) => (
                <tr
                  key={s.code}
                  className="cursor-pointer border-b border-line last:border-0 hover:bg-raised/60"
                  onClick={() => select(s.code)}
                >
                  <td className="px-4 py-3">
                    <button type="button" className="min-h-11 text-left font-medium">
                      {s.name} <span className="text-faint">{s.code}</span>
                    </button>
                  </td>
                  <td className="px-3 py-3 text-muted">{s.region}</td>
                  <td className="px-3 py-3 tabular">{s.recruits}</td>
                  <td className="px-3 py-3 tabular">{s.fiveStars}</td>
                  <td className="px-3 py-3 tabular">{fmtNum(s.avgRating, 1)}</td>
                  <td className="px-3 py-3 tabular">{fmtNum(s.talentIndex, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
