import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import {
  EDGE_BOARD_CONTRACT_VERSION,
  EDGE_BOARD_PRODUCT,
  EDGE_BOARD_SCHEMA_ID,
  classifyEdgeSize,
  exampleCards,
  isNotableGap,
  loadEdgeConfidenceSchema,
} from "./edge-board.ts";
import { EDGE } from "./edge.ts";

const here = dirname(fileURLToPath(import.meta.url));

test("Edge Board schema is hx_edge_card_confidence 2026.09.14 with A–D and FLAGS", () => {
  const schema = loadEdgeConfidenceSchema();
  assert.equal(schema.product, EDGE_BOARD_PRODUCT);
  assert.equal(schema.product, "hx_edge_card_confidence");
  assert.equal(schema.contract_version, EDGE_BOARD_CONTRACT_VERSION);
  assert.equal(schema.schema_id, EDGE_BOARD_SCHEMA_ID);
  assert.equal(schema.never_lock_badge, true);
  assert.equal(schema.calibration_thresholds.top25_soft_below, 50);
  assert.equal(schema.calibration_thresholds.full_slate_soft_below, 45);
  assert.ok(schema.confidence_tier_rules.A.lead);
  assert.equal(schema.confidence_tier_rules.D.lead, false);
  assert.match(schema.confidence_tier_rules.A.rule, /Never a lock/i);
  assert.deepEqual(schema.bands.edge_size_pts, {
    small: [0, 3],
    medium: [3, 7],
    large: [7, 99],
  });
  assert.equal(schema.bands.edge_size.large.min_abs_gap_pts, 7);
  assert.match(schema.bands.edge_size.small.rule, /< 3/);
  assert.match(schema.bands.edge_size.medium.rule, /3 ≤ \|Δ\| < 7/);
  assert.match(schema.bands.edge_size.large.rule, /≥ 7/);
  assert.doesNotMatch(schema.bands.edge_size.large.rule, /≥ 4/);
  assert.equal(schema.bands.notable_gap.min_abs_gap_pts, 4);
  assert.match(schema.bands.notable_gap.rule, /notable-gap filter/);
  assert.deepEqual(schema.confidence_tier_rules.A.edge_size_bands, ["medium", "large"]);
  assert.match(schema.confidence_tier_rules.A.rule, /medium or large/);
  assert.match(schema.confidence_tier_rules.A.rule, /large ≥ 7/);
  assert.doesNotMatch(schema.confidence_tier_rules.A.rule, /≥ 4 pts/);
  assert.equal(schema.confidence_tier_rules.B.edge_size_band, "small");
  assert.match(schema.confidence_tier_rules.B.rule, /< 3 pts/);
  assert.doesNotMatch(schema.confidence_tier_rules.B.rule, /< 4 pts/);
  assert.match(schema.free_vs_paid.free.includes, /HX vs Vegas/);
  assert.match(schema.free_vs_paid.paid.includes, /Ranked confidence cards/);
  for (const banned of ["lock", "locks", "guaranteed", "sure thing", "can't miss", "print money", "ROI promise"]) {
    assert.ok(schema.copy_ban_list.includes(banned), banned);
  }
  const cards = exampleCards(schema);
  assert.equal(cards.length, 2);
  for (const card of cards) {
    assert.match(card.demo_label, /EXAMPLE \/ schema demo/);
    assert.doesNotMatch(card.demo_label, /\block badge\b/i);
    assert.equal(classifyEdgeSize(card.abs_gap_pts, schema), card.edge_size_band);
  }
  assert.equal(cards[0]?.confidence_tier, "A");
  assert.equal(cards[0]?.edge_size_band, "large");
  assert.equal(cards[1]?.confidence_tier, "D");
  assert.equal(cards[1]?.calibration_flag, "soft");
  assert.equal(cards[1]?.edge_size_band, "large");
});

test("AMD edge size bands: small <3, medium 3–7, large ≥7; notable ≥4 is not large", () => {
  const schema = loadEdgeConfidenceSchema();
  assert.equal(classifyEdgeSize(0, schema), "small");
  assert.equal(classifyEdgeSize(2.99, schema), "small");
  assert.equal(classifyEdgeSize(3, schema), "medium");
  assert.equal(classifyEdgeSize(4, schema), "medium");
  assert.equal(classifyEdgeSize(6.99, schema), "medium");
  assert.equal(classifyEdgeSize(7, schema), "large");
  assert.equal(classifyEdgeSize(10.5, schema), "large");
  assert.equal(classifyEdgeSize(23.7, schema), "large");
  assert.equal(isNotableGap(3.99, schema), false);
  assert.equal(isNotableGap(4, schema), true);
  assert.equal(isNotableGap(6.5, schema), true);
  assert.equal(classifyEdgeSize(4, schema) === "large", false);
  assert.equal(classifyEdgeSize(6.99, schema) === "large", false);
});

test("Edge Board UI documents schema and does not dump the paid pack or lock badges", () => {
  const board = readFileSync(join(here, "../components/edge-board.tsx"), "utf8");
  const route = readFileSync(join(here, "../routes/edge.board.tsx"), "utf8");
  const lib = readFileSync(join(here, "./edge-board.ts"), "utf8");
  const edge = readFileSync(join(here, "../routes/edge.tsx"), "utf8");
  const home = readFileSync(join(here, "../routes/index.tsx"), "utf8");
  assert.match(board, /card\.demo_label/);
  assert.match(board, /schema demo/);
  assert.match(board, /FLAG — calibration soft/);
  assert.match(board, /Copy ban list/);
  assert.match(board, /Free vs paid/);
  assert.match(board, /Never a lock/);
  assert.match(board, /EDGE_SIZE_BANDS/);
  assert.match(board, /notable_gap/);
  assert.match(route, /large ≥ 7/);
  assert.match(lib, /small" \| "medium" \| "large"/);
  assert.doesNotMatch(board, /LOCKS|guaranteed ROI|sure thing|print money/i);
  assert.doesNotMatch(board, /SAMPLE_5|pack_body_paste/);
  assert.match(route, /createFileRoute\("\/edge\/board"\)/);
  assert.match(board, /to="\/edge\/board"/);
  assert.match(edge, /EdgeBoardPanel/);
  assert.doesNotMatch(home, /hx_edge_pack_week3_sample_thickened|SAMPLE_5|EdgeBoardView/);
  assert.equal(EDGE.weekPrice, "$5");
  assert.equal(EDGE.monthPrice, "$15/mo");
});
