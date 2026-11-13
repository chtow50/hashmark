import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { MODEL } from "@/lib/cfb/model";
import backtest from "../../data/hx_2026_8_backtest_2026.json" with { type: "json" };
import refit from "../../data/hx_refit_2026.json" with { type: "json" };

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
        lede="HX starts from a preseason composite and is refit every week from stamped FINALs, so teams that are better or worse than expected move as the season goes. A replacement-level Group of Five team sits near 0. Head-to-head uses Elo built from HX."
      />

      <InSeasonPanel />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Preseason prior · weights</h2>
          <p className="mt-2 text-sm text-muted">
            Each feature is z-scored across FBS, then weighted. Georgia opened 2026 at +7.89.
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
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-inset p-4 font-mono text-xs leading-relaxed text-accent">
{`Elo     = ${MODEL.eloBase} + ${MODEL.eloScale} × HX
P(home) = 1 / (1 + 10^(−(EloΔ + HFA) / ${MODEL.eloDenom}))
d       = EloΔ + HFA
spread  = 0.050835 × d
        + 4.5795×10⁻⁵ × d × |d|`}
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
            charts for all 136 programs (thetwodeep.com, refreshed 2026-09-07).
          </p>
          <p>
            Offensive-line mass is on the talent Size board as a measurable. It is not a term in
            HX. The talent composite is the depth-weighted 247 of the two-deep, transfers included.
          </p>
          <p>
            Ten 2026 coach changes carry a Connelly residual in the preseason prior
            (κ = −0.25, 15% OC bump). The in-season refit starts from that prior.
          </p>
        </div>
      </Panel>
    </div>
  );
}

type Grade = { n: number; su: number; mae: number | null; brier: number | null };
const pct = (g: Grade) => (g.n ? `${((100 * g.su) / g.n).toFixed(1)}%` : "—");
const fmt = (x: number | null, d = 2) => (x == null ? "—" : x.toFixed(d));

function InSeasonPanel() {
  const t = backtest.totals_w2_11;
  const live = refit.grades.filter((g) => g.live);
  const m = refit.meta;
  return (
    <Panel className="mb-6">
      <h2 className="font-display text-2xl tracking-wide">In season · weekly refit</h2>
      <div className="mt-3 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Every Sunday, after the week’s FINALs are stamped, HX is refit from the preseason prior and
            every FBS–FBS result so far. Each margin is turned into an Elo gap with the same spread
            curve the board uses (capped at ±{m.margin_cap} points so blowouts don’t run the table),
            adjusted for opponent and home field. The preseason prior counts as {m.lambda} games, so
            its weight fades as a team plays: roughly half after two games, roughly a fifth after eight.
          </p>
          <p>
            One rating, same scale: Elo = {MODEL.eloBase} + {MODEL.eloScale} × HX. Only the HX values
            move. FCS opponents are unrated and stay out of the fit. Current board: {m.n_finals} FINALs
            through Week {m.through_week}.
          </p>
          <p>
            Why: through Week 10 the board leaned on preseason expectations. Preseason spread gaps were
            worth {backtest.calibration_slope.preseason_w1_5} of a point per point in Weeks 1–5 and{" "}
            {backtest.calibration_slope.preseason_w6_11} in Weeks 6–11. Refit week by week using only earlier
            results, the same games come in at {backtest.calibration_slope.hx_2026_8_w2_11}.
          </p>
          <p>
            Soft-cal FLAG stays. On Vegas-lined games in Weeks 2–11 the close still beats both boards
            (MAE {fmt(backtest.vegas_lined_w2_11.mae_vegas)} vs {fmt(backtest.vegas_lined_w2_11.mae_hx_2026_8_walkforward)} refit
            and {fmt(backtest.vegas_lined_w2_11.mae_shipped)} as shipped, n = {backtest.vegas_lined_w2_11.n}).
          </p>
        </div>
        <div>
          <table className="w-full text-sm tabular">
            <caption className="mb-2 text-left text-xs text-muted">
              Accountability · stamped FBS–FBS FINALs. “As shipped” is the board that was live each week; “Refit” uses
              only results from earlier weeks.
            </caption>
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="py-1 pr-2 font-normal">Week</th>
                <th className="py-1 pr-2 font-normal">Games</th>
                <th className="py-1 pr-2 font-normal">SU as shipped</th>
                <th className="py-1 pr-2 font-normal">SU refit</th>
                <th className="py-1 pr-2 font-normal">MAE as shipped</th>
                <th className="py-1 font-normal">MAE refit</th>
              </tr>
            </thead>
            <tbody>
              {backtest.weeks.map((w) => (
                <tr key={w.week} className="border-t border-border/60">
                  <td className="py-1 pr-2">{w.week}</td>
                  <td className="py-1 pr-2">{w.shipped.n}</td>
                  <td className="py-1 pr-2">{w.shipped.su}</td>
                  <td className="py-1 pr-2">{w.week === 1 ? "—" : w.hx_2026_8_walkforward.su}</td>
                  <td className="py-1 pr-2">{fmt(w.shipped.mae)}</td>
                  <td className="py-1">{w.week === 1 ? "—" : fmt(w.hx_2026_8_walkforward.mae)}</td>
                </tr>
              ))}
              <tr className="border-t border-border font-medium text-fg">
                <td className="py-1 pr-2">2–11</td>
                <td className="py-1 pr-2">{t.n}</td>
                <td className="py-1 pr-2">{t.shipped.su} · {pct(t.shipped)}</td>
                <td className="py-1 pr-2">{t.hx_2026_8_walkforward.su} · {pct(t.hx_2026_8_walkforward)}</td>
                <td className="py-1 pr-2">{fmt(t.shipped.mae)}</td>
                <td className="py-1">{fmt(t.hx_2026_8_walkforward.mae)}</td>
              </tr>
              {live.map((g) => (
                <tr key={`live-${g.week}`} className="border-t border-border/60">
                  <td className="py-1 pr-2">{g.week} · live</td>
                  <td className="py-1 pr-2">{g.n}</td>
                  <td className="py-1 pr-2">—</td>
                  <td className="py-1 pr-2">{g.su}</td>
                  <td className="py-1 pr-2">—</td>
                  <td className="py-1">{fmt(g.mae)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-muted">
            Week 1 is the preseason board for both. Weeks 2–11 total includes the {t.n - backtest.weeks.filter((w) => w.week >= 2).reduce((a, w) => a + w.shipped.n, 0)} Week 11
            FINALs stamped before the switch (Nov 12). Refit was closer to the final margin in{" "}
            {backtest.paired_w2_11.games_better} of {backtest.paired_w2_11.n} games. From Week 12 the refit rows are the live board.
          </p>
        </div>
      </div>
    </Panel>
  );
}
