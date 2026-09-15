/**
 * HX Edge Board v1 — public confidence-schema surface.
 * Uses hx_edge_confidence_schema_2026. Does not dump the paid pack.
 */
import schemaRaw from "../../data/hx_edge_confidence_schema_2026.json" with { type: "json" };

export const EDGE_BOARD_CONTRACT_VERSION = "2026.09.14";
export const EDGE_BOARD_PRODUCT = "hx_edge_card_confidence";
export const EDGE_BOARD_SCHEMA_ID = "hx_edge_confidence_schema_2026";

export type EdgeCalibrationFlag = "ok" | "soft";
export type EdgeConfidenceTier = "A" | "B" | "C" | "D";
export type EdgeSizeBand = "small" | "medium" | "large";
export type EdgeLeanBand = "strong" | "lean" | "coin";
export type EdgeSizeInterval = [number, number];

export type EdgeSizeBandRule = {
  min_abs_gap_pts: number;
  max_abs_gap_pts?: number;
  exclusive_max?: boolean;
  rule: string;
};

export type EdgeTierRule = {
  tier: EdgeConfidenceTier;
  lead: boolean;
  calibration_slice: string;
  calibration_flag: EdgeCalibrationFlag;
  edge_size_band?: EdgeSizeBand;
  edge_size_bands?: EdgeSizeBand[];
  lean_band?: EdgeLeanBand;
  rule: string;
};

export type EdgeExampleCard = {
  demo_label: string;
  source: string;
  game: string;
  kick_ct: string;
  hx_line: string;
  vegas_line: string;
  abs_gap_pts: number;
  winner_flip: boolean;
  lean_strength: number;
  edge_size_band: EdgeSizeBand;
  lean_band: EdgeLeanBand;
  confidence_tier: EdgeConfidenceTier;
  calibration_slice: string;
  calibration_flag: EdgeCalibrationFlag;
  pack_blurb: string;
};

export type EdgeConfidenceSchema = {
  product: typeof EDGE_BOARD_PRODUCT;
  contract_version: typeof EDGE_BOARD_CONTRACT_VERSION;
  schema_id: typeof EDGE_BOARD_SCHEMA_ID;
  hx_stamp: string;
  never_lock_badge: boolean;
  sort: string[];
  calibration_thresholds: {
    top25_soft_below: number;
    full_slate_soft_below: number;
  };
  calibration_flags: {
    ok: string;
    soft: string;
  };
  bands: {
    edge_size_pts: Record<EdgeSizeBand, EdgeSizeInterval>;
    edge_size: Record<EdgeSizeBand, EdgeSizeBandRule>;
    notable_gap: { min_abs_gap_pts: number; rule: string };
    lean: {
      strong: { min_pp_from_50: number; rule: string };
      lean: {
        min_pp_from_50: number;
        max_pp_from_50: number;
        exclusive_max?: boolean;
        rule: string;
      };
      coin: {
        max_pp_from_50: number;
        exclusive_max?: boolean;
        wp_window: number[];
        rule: string;
      };
    };
  };
  confidence_tier_rules: Record<EdgeConfidenceTier, EdgeTierRule>;
  copy_ban_list: string[];
  free_vs_paid: {
    free: { surface: string; includes: string };
    paid: { surface: string; includes: string };
  };
  example_cards: EdgeExampleCard[];
};

export function loadEdgeConfidenceSchema(): EdgeConfidenceSchema {
  return schemaRaw as EdgeConfidenceSchema;
}

export const EDGE_BOARD_TIERS: EdgeConfidenceTier[] = ["A", "B", "C", "D"];
export const EDGE_SIZE_BANDS: EdgeSizeBand[] = ["small", "medium", "large"];

/**
 * AMD edge_size_pts: small [0, 3), medium [3, 7), large [7, 99].
 * Intervals are [inclusive, exclusive) except large's 99 sentinel.
 */
export function classifyEdgeSize(
  absGapPts: number,
  schema: EdgeConfidenceSchema = loadEdgeConfidenceSchema(),
): EdgeSizeBand {
  const abs = Math.abs(absGapPts);
  const { small, medium } = schema.bands.edge_size_pts;
  if (abs < small[1]) return "small";
  if (abs < medium[1]) return "medium";
  return "large";
}

/** Week 3 pack notable-gap filter only — not the definition of large. */
export function isNotableGap(
  absGapPts: number,
  schema: EdgeConfidenceSchema = loadEdgeConfidenceSchema(),
): boolean {
  return Math.abs(absGapPts) >= schema.bands.notable_gap.min_abs_gap_pts;
}

export function exampleCards(schema: EdgeConfidenceSchema = loadEdgeConfidenceSchema()): EdgeExampleCard[] {
  return schema.example_cards.slice(0, 2);
}
