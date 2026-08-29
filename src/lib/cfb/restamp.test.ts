import assert from "node:assert/strict";
import test from "node:test";
import { restamp } from "./restamp.ts";

test("Q1 even score keeps remaining mean", () => {
  const r = restamp(10, 0, 0, "Q1");
  assert.equal(r.restampedSpread, 7.5);
  assert.ok(Math.abs(r.pHome - 0.6875969157320835) < 1e-4);
});

test("half with lead", () => {
  const r = restamp(10, 14, 7, "half");
  assert.equal(r.restampedSpread, 12);
  assert.ok(Math.abs(r.pHome - 0.8528418794389687) < 1e-4);
});

test("FINAL is the score, not the prior", () => {
  const r = restamp(7.5, 21, 21, "FINAL");
  assert.equal(r.pHome, 0.5);
  assert.equal(r.sigma, 0);
});
