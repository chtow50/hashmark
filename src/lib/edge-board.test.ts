import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import {
  EDGE_BOARD_CONTRACT_VERSION,
  EDGE_BOARD_PRODUCT,
  EDGE_BOARD_SCHEMA_ID,
  exampleCards,
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
  assert.match(schema.bands.edge_size.large.rule, /4/);
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
  }
  assert.equal(cards[0]?.confidence_tier, "A");
  assert.equal(cards[1]?.confidence_tier, "D");
  assert.equal(cards[1]?.calibration_flag, "soft");
});

test("Edge Board UI documents schema and does not dump the paid pack or lock badges", () => {
  const board = readFileSync(join(here, "../components/edge-board.tsx"), "utf8");
  const route = readFileSync(join(here, "../routes/edge.board.tsx"), "utf8");
  const edge = readFileSync(join(here, "../routes/edge.tsx"), "utf8");
  const home = readFileSync(join(here, "../routes/index.tsx"), "utf8");
  assert.match(board, /card\.demo_label/);
  assert.match(board, /schema demo/);
  assert.match(board, /FLAG — calibration soft/);
  assert.match(board, /Copy ban list/);
  assert.match(board, /Free vs paid/);
  assert.match(board, /Never a lock/);
  assert.doesNotMatch(board, /LOCKS|guaranteed ROI|sure thing|print money/i);
  assert.doesNotMatch(board, /SAMPLE_5|pack_body_paste/);
  assert.match(route, /createFileRoute\("\/edge\/board"\)/);
  assert.match(board, /to="\/edge\/board"/);
  assert.match(edge, /EdgeBoardPanel/);
  assert.doesNotMatch(home, /hx_edge_pack_week3_sample_thickened|SAMPLE_5|EdgeBoardView/);
  assert.equal(EDGE.weekPrice, "$5");
  assert.equal(EDGE.monthPrice, "$15/mo");
});
