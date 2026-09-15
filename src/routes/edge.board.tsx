import { createFileRoute, Link } from "@tanstack/react-router";
import { EdgeBoardView } from "@/components/edge-board";
import { PageHead } from "@/components/shell";
import { EDGE } from "@/lib/edge";
import { MODEL } from "@/lib/cfb/model";
import { EDGE_BOARD_SCHEMA_ID } from "@/lib/edge-board";

export const Route = createFileRoute("/edge/board")({
  component: EdgeBoardPage,
  head: () => ({
    meta: [
      { title: `Edge Board · ${EDGE.name} · HASHMARK` },
      {
        name: "description",
        content:
          "HX Edge Board v1 — confidence schema: tiers A–D, calibration FLAGS, small/medium/large edge bands (large ≥ 7 pts), copy bans. Free board is HX vs Vegas. Paid pack is ranked cards.",
      },
    ],
  }),
});

function EdgeBoardPage() {
  return (
    <div className="space-y-8">
      <PageHead
        kicker={`${EDGE.name} · HX ${MODEL.version}`}
        title="Edge Board"
        lede="Confidence schema surface. Tiers A–D, calibration FLAGS, small / medium / large edge bands (large ≥ 7 pts) and lean bands. Free is public schedule HX vs Vegas. Paid is ranked cards. Example cards are a schema demo — not a dump of the paid pack."
      />

      <EdgeBoardView />

      <p className="max-w-2xl text-xs leading-relaxed text-faint">
        Schema `{EDGE_BOARD_SCHEMA_ID}`. Scenario Sim desk fixture is preview /
        offline — not this week’s paid pack.
      </p>
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
