import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { DeskChip } from "@/components/marks";
import { Panel } from "@/components/shell";
import {
  EDGE_BOARD_PRODUCT,
  EDGE_BOARD_SCHEMA_ID,
  EDGE_BOARD_TIERS,
  EDGE_SIZE_BANDS,
  exampleCards,
  loadEdgeConfidenceSchema,
  type EdgeExampleCard,
} from "@/lib/edge-board";
import { EDGE } from "@/lib/edge";
import { cn } from "@/lib/utils";

export function EdgeBoardPanel({ className }: { className?: string }) {
  const schema = loadEdgeConfidenceSchema();
  return (
    <Panel className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        Edge Board v1 · {schema.contract_version}
      </p>
      <h2 className="mt-2 font-display text-2xl tracking-wide">Confidence schema</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Tiers A–D, calibration FLAGS, small / medium / large edge bands (large
        ≥ 7 pts) and lean bands. Free board is public schedule HX vs Vegas. Paid
        pack is ranked confidence cards. Schema demo — not the full paid pack.
      </p>
      <Link
        to="/edge/board"
        className="mt-5 inline-flex h-11 items-center gap-1 text-sm text-fg underline-offset-4 hover:underline"
      >
        Open Edge Board
        <ArrowRight className="size-4" />
      </Link>
    </Panel>
  );
}

export function EdgeBoardView() {
  const schema = loadEdgeConfidenceSchema();
  const cards = exampleCards(schema);
  const tiers = EDGE_BOARD_TIERS.map((tier) => schema.confidence_tier_rules[tier]);

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-center gap-2">
          <DeskChip>schema demo</DeskChip>
          <DeskChip>{schema.hx_stamp}</DeskChip>
        </div>
        <h2 className="mt-3 font-display text-2xl tracking-wide">
          {EDGE.name} · confidence
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Product `{EDGE_BOARD_PRODUCT}` · `{EDGE_BOARD_SCHEMA_ID}`. Never a lock
          badge. Same HX as the public board — ranked, not a second rating.
        </p>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Free vs paid</h2>
          <dl className="mt-4 space-y-4 text-sm leading-relaxed">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Free · {schema.free_vs_paid.free.surface}
              </dt>
              <dd className="mt-1 text-muted">{schema.free_vs_paid.free.includes}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Paid · {schema.free_vs_paid.paid.surface}
              </dt>
              <dd className="mt-1 text-muted">{schema.free_vs_paid.paid.includes}</dd>
            </div>
          </dl>
        </Panel>
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Calibration FLAGS</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <li>
              Top 25 closer soft below{" "}
              <span className="tabular text-fg">
                {schema.calibration_thresholds.top25_soft_below}%
              </span>
              . {schema.calibration_flags.ok}
            </li>
            <li>
              Full-slate closer soft below{" "}
              <span className="tabular text-fg">
                {schema.calibration_thresholds.full_slate_soft_below}%
              </span>
              . {schema.calibration_flags.soft}
            </li>
          </ul>
        </Panel>
      </div>

      <Panel>
        <h2 className="font-display text-2xl tracking-wide">Tiers A–D</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.tier}
              className="rounded-md bg-raised/60 p-4 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-2xl tracking-wide">Tier {tier.tier}</p>
                <DeskChip tone={tier.lead ? "accent" : "muted"}>{tier.lead ? "can lead" : "do not lead"}</DeskChip>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{tier.rule}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Edge / lean bands</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {EDGE_SIZE_BANDS.map((band) => (
              <li key={band}>
                {schema.bands.edge_size[band].rule} → {band}
              </li>
            ))}
            <li>{schema.bands.lean.strong.rule} → strong</li>
            <li>{schema.bands.lean.lean.rule} → lean</li>
            <li>{schema.bands.lean.coin.rule} → coin</li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {schema.bands.notable_gap.rule}.
          </p>
        </Panel>
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Copy ban list</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {schema.copy_ban_list.map((word) => (
              <li key={word}>
                <span className="inline-flex h-8 items-center rounded-md bg-raised px-2.5 font-mono text-xs text-muted">
                  {word}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Informational model product. Not gambling advice. HASHMARK does not
            take wagers.
          </p>
        </Panel>
      </div>

      <div className="space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Example cards · schema demo
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <ExampleCard key={card.game} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExampleCard({ card }: { card: EdgeExampleCard }) {
  const flagSoft = card.calibration_flag === "soft";
  return (
    <Panel>
      <div className="flex flex-wrap items-center gap-2">
        <DeskChip tone="warn">{card.demo_label}</DeskChip>
        <DeskChip>{`Tier ${card.confidence_tier}`}</DeskChip>
        {flagSoft ? <DeskChip tone="warn">FLAG — calibration soft</DeskChip> : (
          <DeskChip>cal ok</DeskChip>
        )}
      </div>
      <h3 className="mt-3 font-display text-2xl tracking-wide">{card.game}</h3>
      <p className="mt-1 text-sm text-muted">{card.kick_ct}</p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">HX</dt>
          <dd className="mt-1 text-fg">{card.hx_line}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Vegas</dt>
          <dd className="mt-1 text-fg">{card.vegas_line}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">|Δ|</dt>
          <dd className="mt-1 tabular text-fg">
            {card.abs_gap_pts} pts · {card.edge_size_band}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Lean</dt>
          <dd className="mt-1 text-fg">
            {card.lean_band}
            {card.winner_flip ? " · winner flip" : ""}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-muted">{card.pack_blurb}</p>
      <p className={cn("mt-3 text-xs leading-relaxed text-faint")}>{card.source}</p>
    </Panel>
  );
}
