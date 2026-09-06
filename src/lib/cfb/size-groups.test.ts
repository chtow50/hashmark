import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SIZE_GROUPS, sizeGroupLabels, sizeLensFor } from "./size-groups.ts";

describe("size-groups", () => {
  it("defines all six position groups with plain labels", () => {
    assert.deepEqual(sizeGroupLabels(), ["QB", "Skill", "OL", "DL", "LB", "DB"]);
    assert.equal(SIZE_GROUPS.length, 6);
  });

  it("maps group + metric to the correct sort key", () => {
    assert.equal(sizeLensFor("QB", "weight"), "qbAvgWeightLbs");
    assert.equal(sizeLensFor("QB", "height"), "qbAvgHeightIn");
    assert.equal(sizeLensFor("DL", "weight"), "dlAvgWeightLbs");
    assert.equal(sizeLensFor("LB", "height"), "lbAvgHeightIn");
  });
});
