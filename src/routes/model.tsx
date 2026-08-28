import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { MODEL } from "@/lib/cfb/model";

export const Route = createFileRoute("/model")({
  component: ModelPage,
  head: () => ({ meta: [{ title: "The Model · HASHMARK" }] }),
});

const WEIGHTS = [
  {
    key: "Recruiting talent",
    w: MODEL.weights.talent,
    note: "CFBD team talent composite (247 recruiting strength of the current roster). Real signal — ablation +0.052.",
  },
  {
    key: "Prior-year rating",
    w: MODEL.weights.prior,
    note: "Blend of last season’s SP+, Elo, and SRS, each z-scored first. Real signal — ablation +0.037.",
  },
  {
    key: "Recent win-trend",
    w: MODEL.weights.trend,
    note: "Weighted win% over the previous four seasons (0.4 / 0.3 / 0.2 / 0.1). Inside the noise band; kept at modest weight.",
  },
  {
    key: "Roster retention",
    w: MODEL.weights.retention,
    note: "CFBD returning production (percent PPA + usage). Inside noise. Not the two-deep talent composite.",
  },
  {
    key: "Portal net",
    w: MODEL.weights.portal,
    note: "Incoming transfer ratings minus outgoing, this offseason. Inside noise. Roster talent already counts who is actually on the two-deep.",
  },
] as const;

function ModelPage() {
  const wsum = Object.values(MODEL.weights).reduce((a, b) => a + b, 0);
  return (
    <div>
      <PageHead
        kicker={`HX ${MODEL.version}`}
        title="How the rating is built"
        lede="HX is a preseason composite: each feature is z-scored across FBS, then weighted. Georgia opened 2026 at +7.89. A replacement-level Group of Five team sits near 0. Head-to-head uses Elo seeded from that composite."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Weights</h2>
          <p className="mt-2 text-sm text-muted">
            Walk-forward Top 25 balanced ≈ 0.646. Only talent and prior rating beat season-to-season noise.
            QB continuity, coach tenure, and SOS were tested and zeroed — they made the score worse.
            A separate Connelly-residual term moved ten new-HC ratings on this board. Tenure stays zeroed.
          </p>
          <ul className="mt-4 space-y-4">
            {WEIGHTS.map((row) => (
              <li key={row.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{row.key}</span>
                  <span className="tabular text-muted">{row.w.toFixed(1)}</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-raised">
                  <div className="h-full bg-accent" style={{ width: `${(row.w / wsum) * 100}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-muted">{row.note}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Matchup engine</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Each team starts at {MODEL.eloBase} + {MODEL.eloScale} × HX. Home-field is {MODEL.homeFieldElo} Elo
            points, dropped on a neutral floor. Win probability is the standard Elo logistic;
            spread is a quadratic on that same gap. Calibrated on 2019–2025 FBS
            games at 70.8% straight-up.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-inset p-4 font-mono text-xs leading-relaxed text-accent">
{`Elo = ${MODEL.eloBase} + ${MODEL.eloScale} × HX
P(home) = 1 / (1 + 10^{−(EloΔ + HFA) / ${MODEL.eloDenom}})
d       = EloΔ + HFA
spread  = ${MODEL.spreadA} d + ${MODEL.spreadB.toExponential()} d |d|
prev    = d × ${MODEL.pointsPerElo}`}
          </pre>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The old linear map compressed blowouts; this curve was fit on 2019–2023 FBS actual MOV
            (holdout 2024–2025), not on this week’s Vegas.
          </p>
          <p className="mt-4 text-sm text-muted">
            Run any pair on the{" "}
            <Link to="/matchup" className="text-fg underline decoration-border underline-offset-4">
              matchup board
            </Link>
            .
          </p>
        </Panel>
      </div>

      <Panel className="mt-6">
        <h2 className="font-display text-2xl tracking-wide">2026 notes</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
          <p>
            The board is the full 136-team FBS set from the HASHMARK database — recruiting, portal,
            returning production, SP+/Elo/SRS, and 2026 rosters. Two-deeps are the listed TWO·DEEP
            charts for 89 programs and a rating-sorted projection for the rest (CFBD publishes no
            depth chart). Projected two-deeps are labelled as estimates.
          </p>
          <p>
            Indiana is sixth on the preseason AP ballot after a national title. HX has the Hoosiers
            eleventh. Talent composite is league-average; the model withholds credit when the
            roster does not match the résumé.
          </p>
          <p>
            Georgia and Ohio State are 1–2 here. The AP has Ohio State first and Oregon second;
            HX flips Oregon and Georgia because Georgia’s talent z-score is the strongest in the
            pool. Texas Tech’s résumé (prior +1.99) outruns its talent (+0.66), so the Red
            Raiders sit eighth in HX — above their AP tie at 12th, short of a playoff lock on
            last year alone.
          </p>
          <p>
            Offensive-line mass is on the talent Size board as a measurable. It is not a term in
            HX. The talent composite is the depth-weighted 247 of the two-deep, transfers included.
          </p>
          <p>
            Ten 2026 coach changes carry a Connelly residual on the rankings board
            (κ = −0.25, 15% OC bump). Ole Miss drops to 8th; Florida climbs to 24th;
            Virginia Tech to 49th. Week 0 matchup win% is frozen at the pre-move HX,
            including Hawaiʻi at Stanford (Hawaiʻi 53.8%, HAW −1.4).
          </p>
        </div>
      </Panel>
    </div>
  );
}
