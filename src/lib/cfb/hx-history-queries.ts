import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { teamHxHistory, type HxHistory } from "./hx-history";

/** HX by week for one team (refit history; newcomers start the week they joined the board). */
export const getHxHistory = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(80) }))
  .handler(async ({ data }): Promise<HxHistory | null> => {
    const refit = (await import("../../../data/hx_refit_2026.json", { with: { type: "json" } })).default as {
      meta: { first_live_week: number };
      board: { slug: string; hx: number; rank: number }[];
      history: { weeks: number[]; hx: Record<string, number[]> };
    };
    const newcomers = (await import("../../../data/fbs_newcomers_2026.json", { with: { type: "json" } })).default as {
      teams: { slug: string }[];
    };
    const late = Object.fromEntries(newcomers.teams.map((t) => [t.slug, refit.meta.first_live_week]));
    const live = Object.fromEntries(refit.board.map((b) => [b.slug, { hx: b.hx, rank: b.rank }]));
    return teamHxHistory(refit.history, data.slug, late, live);
  });
