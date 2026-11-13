/** Collision-aware label placement for SVG charts (pure; unit-tested). */
export type Box = { x: number; y: number; w: number; h: number };
/** Rough text width for 11–12px UI sans (good enough to keep labels apart). */
export const textW = (t: string, size = 12) => t.length * size * 0.58;
const hits = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

/**
 * Greedy label placement for the labeled (compared) points: try right, left, above, below the
 * point, then step further out vertically, keeping each label inside the plot and off every
 * other label, the fixed chart text, and the other ringed points. Moved labels get a leader line.
 */
export function placeLabels(
  pts: { id: string; text: string; cx: number; cy: number }[],
  reserved: Box[],
  plot: { x0: number; x1: number; y0: number; y1: number },
) {
  const taken: Box[] = [...reserved, ...pts.map((p) => ({ x: p.cx - 13, y: p.cy - 13, w: 26, h: 26 }))];
  const out: { id: string; text: string; cx: number; cy: number; x: number; y: number; anchor: "start" | "end"; moved: boolean }[] = [];
  for (const p of pts) {
    const w = textW(p.text), h = 14;
    const cands: { x: number; y: number; anchor: "start" | "end"; moved: boolean }[] = [];
    for (const dy of [0, -18, 18, -32, 32, -46, 46, -60, 60]) {
      const moved = dy !== 0;
      cands.push({ x: p.cx + 16, y: p.cy + 4 + dy, anchor: "start", moved });
      cands.push({ x: p.cx - 16, y: p.cy + 4 + dy, anchor: "end", moved });
    }
    const box = (c: (typeof cands)[number]): Box => ({ x: c.anchor === "start" ? c.x : c.x - w, y: c.y - 11, w, h });
    const inside = (b: Box) => b.x >= plot.x0 - 40 && b.x + b.w <= plot.x1 + 8 && b.y >= plot.y0 - 4 && b.y + b.h <= plot.y1 + 4;
    const own = (b: Box) => taken.filter((t) => !(t.w === 26 && t.x === p.cx - 13 && t.y === p.cy - 13)).some((t) => hits(b, t));
    const pick = cands.find((c) => inside(box(c)) && !own(box(c))) ?? cands.find((c) => inside(box(c))) ?? cands[0];
    taken.push(box(pick));
    out.push({ ...p, ...pick });
  }
  return out;
}

