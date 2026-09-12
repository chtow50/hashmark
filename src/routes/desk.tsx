import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { MODEL } from "@/lib/cfb/model";

export const Route = createFileRoute("/desk")({
  component: DeskPage,
  head: () => ({
    meta: [
      { title: "The desk · HASHMARK" },
      {
        name: "description",
        content:
          "What HASHMARK is, how HX is built, and the glossary for the college football ratings desk.",
      },
    ],
  }),
});

const GLOSSARY = [
  {
    term: "HX",
    def: "The HASHMARK Index. One number for every FBS team, built from recruiting talent, last year’s SP+/Elo/SRS, four-year win trend, returning production, and portal net. Georgia opened 2026 near +7.9. A replacement-level Group of Five team sits near 0.",
  },
  {
    term: "Make 12",
    def: "Chance a team makes the 12-team College Football Playoff field, from 10,000 season simulations seeded by HX. Not a national-title odds number.",
  },
  {
    term: "Closer / SU",
    def: "Straight-up (SU) is who HX picked to win. Closer is whether the HASHMARK spread was nearer the final margin than the market close. Week 1 tape: 36/43 SU, 20/43 closer.",
  },
  {
    term: "Vegas-only",
    def: "An FCS opponent is outside the 136-team HX board. HASHMARK will not invent a spread. The row shows the market number only.",
  },
  {
    term: "Talent vs size",
    def: "Roster talent is a two-deep composite (high-school plus portal). OL mass is a separate size board. Size is not talent and is not an HX term.",
  },
] as const;

function DeskPage() {
  return (
    <div className="space-y-8">
      <PageHead
        kicker={`HX ${MODEL.version}`}
        title="The desk"
        lede="HASHMARK is a public college football ratings desk. One rating. Full 136 FBS. Not a sportsbook, not a tip sheet, not the AP ballot."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">What this is</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The board, slate, matchup engine, recruiting classes, and roster talent live on this
            site every week of the season. HX is the rating. The rest of the desk exists so you
            can see why a number moved — or why it did not.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Week 1 held 36 of 43 straight-up. The closer column was a coin. That split stays on
            the homepage because the model should be scored in public.
          </p>
          <p className="mt-4 text-sm">
            <Link to="/model" className="text-fg underline-offset-4 hover:underline">
              How the rating is built
            </Link>
            <span className="text-faint"> · </span>
            <Link to="/matchup" className="text-fg underline-offset-4 hover:underline">
              Run a matchup
            </Link>
          </p>
        </Panel>

        <Panel>
          <h2 className="font-display text-2xl tracking-wide">What this is not</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            <li>Not a sportsbook. HASHMARK never takes a wager and does not list a street line.</li>
            <li>Not a live in-game feed. The restamp tool on a matchup page is manual.</li>
            <li>Not an FCS rating. Those games are Vegas-only until a program is on the 136.</li>
            <li>Not the AP poll. Gaps versus AP are a feature of the board, not a bug.</li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            Questions or corrections:{" "}
            <a href="mailto:hello@hashmarkcfb.com" className="text-fg hover:underline">
              hello@hashmarkcfb.com
            </a>
          </p>
        </Panel>
      </div>

      <Panel>
        <h2 className="font-display text-2xl tracking-wide">Glossary</h2>
        <dl className="mt-4 divide-y divide-line">
          {GLOSSARY.map((row) => (
            <div key={row.term} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-faint">{row.term}</dt>
              <dd className="text-sm leading-relaxed text-muted">{row.def}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
