import { createFileRoute } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { TeamLogo } from "@/components/team-logo";
import { TEAM_LOGO_ESPN_IDS } from "@/lib/cfb/team-logos";
import { listTeams } from "@/lib/cfb/queries";
import type { TeamSummary } from "@/lib/cfb/types";

export const Route = createFileRoute("/logos")({
  loader: async (): Promise<TeamSummary[]> => listTeams(),
  component: LogosPage,
  head: () => ({ meta: [{ title: "Team logos · HASHMARK" }] }),
});

function LogosPage() {
  const teams = Route.useLoaderData();
  const bySlug = new Map(teams.map((t) => [t.slug, t]));
  const slugs = Object.keys(TEAM_LOGO_ESPN_IDS).sort((a, b) => {
    const an = bySlug.get(a)?.name ?? a;
    const bn = bySlug.get(b)?.name ?? b;
    return an.localeCompare(bn);
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <PageHead
        title="Team logos"
        lede={`${slugs.length} FBS slugs in registry — vendored PNGs under /logos/{slug}.png`}
      />
      <Panel>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {slugs.map((slug) => {
            const team = bySlug.get(slug);
            return (
              <li
                key={slug}
                className="flex flex-col items-center gap-2 rounded-lg border border-line bg-surface-2 p-3 text-center"
              >
                <TeamLogo slug={slug} size={20} />
                <span className="text-xs font-medium leading-tight text-ink">
                  {team?.shortName ?? slug}
                </span>
                <span className="font-mono text-[10px] text-muted">{slug}</span>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
