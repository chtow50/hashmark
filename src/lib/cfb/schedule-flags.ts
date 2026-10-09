import { isNotableSpreadGap } from "./featured.ts";
import type { GameStatus, Prediction } from "./types.ts";

/** HX and Vegas pick opposite favorites (both off PK). */
export function isWinnerFlip(pred: Prediction, vegasSpread: number | null): boolean {
  if (vegasSpread == null) return false;
  if (Math.abs(pred.spread) < 0.05 || Math.abs(vegasSpread) < 0.05) return false;
  return pred.spread > 0 !== vegasSpread > 0;
}

export type MatchupChipKind = "neutral" | "final" | "winner_flip" | "spread_gap";

export type MatchupChip = {
  kind: MatchupChipKind;
  label: string;
  tone: "muted" | "accent" | "warn";
};

/** Slate flags for matchup / schedule rows — no invented lines. */
export function matchupChips(
  pred: Prediction,
  opts: { neutral: boolean; vegasSpread: number | null; status: GameStatus },
): MatchupChip[] {
  const chips: MatchupChip[] = [];
  if (opts.neutral) {
    chips.push({ kind: "neutral", label: "Neutral", tone: "muted" });
  }
  if (opts.status === "final") {
    chips.push({ kind: "final", label: "Final", tone: "accent" });
  }
  if (isWinnerFlip(pred, opts.vegasSpread)) {
    chips.push({ kind: "winner_flip", label: "Winner flip", tone: "warn" });
  } else if (opts.vegasSpread != null && isNotableSpreadGap(pred.spread, opts.vegasSpread)) {
    chips.push({ kind: "spread_gap", label: "Spread gap", tone: "warn" });
  }
  return chips;
}

/**
 * /schedule rows render matchupChips() and then their own Final chip for rows
 * without an HX prediction (FCS Vegas-only). Only add it when matchupChips()
 * did not already, so a FINAL row shows exactly one Final chip.
 */
export function needsRowFinalChip(chips: MatchupChip[], status: GameStatus): boolean {
  return status === "final" && !chips.some((c) => c.kind === "final");
}

