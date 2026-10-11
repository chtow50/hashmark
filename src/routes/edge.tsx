import { createFileRoute, Link, Outlet, useChildMatches } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { BOARD_WEEK } from "@/lib/cfb/featured";
import { MODEL } from "@/lib/cfb/model";
import { EDGE } from "@/lib/edge";

export const Route = createFileRoute("/edge")({
  component: EdgeLayout,
  head: () => ({
    meta: [
      { title: `${EDGE.name} · Paused · HASHMARK` },
      {
        name: "description",
        content:
          "HX Edge Pack is paused. The HX board, slate, matchup engine, and weekly tape stay free on hashmarkcfb.com.",
      },
    ],
  }),
});

function EdgeLayout() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <EdgePausedPage />;
}

function EdgePausedPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHead
        kicker={`${EDGE.name} · Paused`}
        title="Edge is paused."
        lede="Nothing is for sale. The desk runs one rating — HX — and all of it is on the free board."
      />

      <Panel>
        <ul className="space-y-2 text-sm leading-relaxed text-muted">
          <li>Week {BOARD_WEEK} board · HX {MODEL.version} · full 136 FBS.</li>
          <li>Every slate game: HX spread and win% next to the Vegas close when one is sourced.</li>
          <li>The weekly tape: SU and closer, scored in public against ESPN FINALs.</li>
        </ul>
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link to="/" className="text-fg underline underline-offset-4 hover:text-accent">
            Open the board
          </Link>
          <Link
            to="/schedule"
            search={{ w: BOARD_WEEK }}
            className="text-fg underline underline-offset-4 hover:text-accent"
          >
            Week {BOARD_WEEK} slate
          </Link>
          <Link to="/model" className="text-fg underline underline-offset-4 hover:text-accent">
            How HX is built
          </Link>
        </p>
      </Panel>

      <p className="text-xs leading-relaxed text-faint">
        Questions: {EDGE.supportEmail}. Not betting advice.
      </p>
    </div>
  );
}
