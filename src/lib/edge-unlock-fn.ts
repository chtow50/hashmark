import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { verifyEdgeUnlockResult, type UnlockReason } from "./edge-unlock";

export type EdgeUnlockView =
  | {
      ok: true;
      pack: { product: string; week: number; season: number };
    }
  | { ok: false; reason: UnlockReason };

function stripeSecret(): string | undefined {
  return typeof process !== "undefined" ? process.env.STRIPE_SECRET_KEY : undefined;
}

export const verifyEdgeUnlock = createServerFn({ method: "GET" })
  .validator(z.object({ sessionId: z.string().optional() }))
  .handler(async ({ data }): Promise<EdgeUnlockView> => {
    const verified = await verifyEdgeUnlockResult({
      sessionId: data.sessionId,
      secretKey: stripeSecret(),
      fetchFn: fetch,
    });
    if (!verified.ok) return verified;

    const { currentPackManifest } = await import("./edge-pack-files.server");
    const manifest = currentPackManifest();
    if (!manifest) return { ok: false, reason: "unavailable" };
    return {
      ok: true,
      pack: {
        product: manifest.product,
        week: manifest.week,
        season: manifest.season,
      },
    };
  });
