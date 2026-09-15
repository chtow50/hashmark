import { createFileRoute, Link } from "@tanstack/react-router";
import { ScenarioSimGate, ScenarioSimPanel } from "@/components/scenario-sim";
import { PageHead } from "@/components/shell";
import { listTeams } from "@/lib/cfb/queries";
import { MODEL } from "@/lib/cfb/model";
import { EDGE } from "@/lib/edge";
import {
  isScenarioSimUnlocked,
  parseScenarioUnlockSearch,
} from "@/lib/scenario-sim";

type Search = { edge?: string; unlock?: string };

export const Route = createFileRoute("/edge/sim")({
  validateSearch: (s: Record<string, unknown>): Search => parseScenarioUnlockSearch(s),
  loader: async () => {
    const teams = await listTeams();
    return {
      teams: teams.map((t) => ({
        slug: t.slug,
        name: t.name,
        hxRank: t.hxRank,
        shortName: t.shortName,
        conference: t.conference,
      })),
    };
  },
  component: EdgeSimPage,
  head: () => ({
    meta: [
      { title: `Scenario Sim (preview) · ${EDGE.name}` },
      {
        name: "description",
        content:
          "HX Edge Pack Scenario Sim preview. CLI-backed 10k re-run coming online. Desk fixture until the AMD engine is wired.",
      },
    ],
  }),
});

function EdgeSimPage() {
  const { teams } = Route.useLoaderData();
  const search = Route.useSearch();
  const unlocked = isScenarioSimUnlocked(search);

  return (
    <div className="space-y-8">
      <PageHead
        kicker={`${EDGE.name} · HX ${MODEL.version}`}
        title="Scenario Sim (preview)"
        lede="Coming online. Pin a winner or an HX bump, then read baseline vs scenario vs Δ. This page is a desk fixture until the AMD CLI is wired — Monte Carlo noise, not a lock."
      />

      {unlocked ? <ScenarioSimPanel teams={teams} /> : <ScenarioSimGate />}

      <p className="text-sm text-muted">
        <Link to="/edge" className="text-fg underline-offset-4 hover:underline">
          Back to Edge Pack
        </Link>
        <span className="text-faint"> · </span>
        <Link to="/" className="text-fg underline-offset-4 hover:underline">
          The board
        </Link>
      </p>
    </div>
  );
}
