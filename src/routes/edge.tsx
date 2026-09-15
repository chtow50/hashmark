import { createFileRoute, Link, Outlet, useChildMatches } from "@tanstack/react-router";
import { EdgeBoardPanel } from "@/components/edge-board";
import { EdgeBuyButton, EdgeCheckoutNote } from "@/components/edge-pack";
import { PageHead, Panel } from "@/components/shell";
import { EDGE } from "@/lib/edge";
import { MODEL } from "@/lib/cfb/model";

export const Route = createFileRoute("/edge")({
  component: EdgeLayout,
  head: () => ({
    meta: [
      { title: `${EDGE.name} · HASHMARK` },
      {
        name: "description",
        content:
          "HX Edge Pack is the weekly depth product. The $5 week sample is the full pack — confidence cards, unit O/D pulse, tape write-up — not the free-board teaser. The public board stays free.",
      },
    ],
  }),
});

const INCLUDED = [
  "Confidence cards for the week — A–D tiers on the slate. Never a lock.",
  "Unit O/D pulse — who moved on offense and defense after the tape.",
  "Tape write-up — SU / closer for the week just played. Full depth, not the free-board teaser.",
  "HX vs AP disagreements — where the last stamped ballot and the rating split.",
  "HX vs market disagreements — spread gap versus the book, same favorite called out.",
] as const;

const NOT_INCLUDED = [
  "No locks. The pack does not pick ‘plays’ or guarantee a side.",
  "No guaranteed ROI. Tape is scored; it is not a promise the next week pays.",
  "No second rating. Edge Pack is the same HX, written out.",
  "No login wall on the public board, slate, or matchup engine.",
] as const;

function EdgeLayout() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <EdgePage />;
}

function EdgePage() {
  return (
    <div className="space-y-8">
      <PageHead
        kicker={`Weekly pack · HX ${MODEL.version}`}
        title={EDGE.name}
        lede="Weekly paid pack. The $5 week sample is the full depth pack — confidence cards, unit O/D pulse, tape write-up — not the free-board teaser. Same HX as the public board. The free board stays public."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Panel>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Week sample · paid depth
          </p>
          <p className="mt-2 font-display text-4xl tabular tracking-wide">{EDGE.weekPrice}</p>
          <p className="mt-2 text-sm text-muted">
            One paid week of the full pack: confidence cards, unit O/D pulse, tape write-up.
            Not the free-board teaser. Same contents as the month, once.
          </p>
          <EdgeBuyButton kind="week" label={`Buy · ${EDGE.weekLabel}`} className="mt-5" />
        </Panel>
        <Panel>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Monthly
          </p>
          <p className="mt-2 font-display text-4xl tabular tracking-wide">{EDGE.monthPrice}</p>
          <p className="mt-2 text-sm text-muted">Weekly pack through the season.</p>
          <EdgeBuyButton kind="month" label={`Buy · ${EDGE.monthLabel}`} className="mt-5" />
        </Panel>
      </div>
      <EdgeCheckoutNote />

      <EdgeBoardPanel />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">What is in it</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {INCLUDED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">What is not</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {NOT_INCLUDED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <h2 className="font-display text-2xl tracking-wide">The board stays free</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Rankings, slate, matchup engine, recruiting, and talent stay on the public desk.
          Edge Pack does not replace that — it writes the week’s disagreements and the tape
          so you do not have to reconstruct them from the board alone.
        </p>
        <p className="mt-4 text-sm">
          <Link to="/" className="text-fg underline-offset-4 hover:underline">
            Back to the board
          </Link>
          <span className="text-faint"> · </span>
          <Link to="/model" className="text-fg underline-offset-4 hover:underline">
            How the rating is built
          </Link>
          <span className="text-faint"> · </span>
          <Link to="/desk" className="text-fg underline-offset-4 hover:underline">
            The desk
          </Link>
        </p>
      </Panel>

      <p className="max-w-2xl text-xs leading-relaxed text-faint">
        HX Edge Pack is an informational model product. It is not gambling advice.
        HASHMARK does not take wagers or list a street line. The model is scored in
        public on the board — Edge Pack is the write-up, not a promise the tape will pay.
      </p>
    </div>
  );
}
