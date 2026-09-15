import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { EdgeUnlockResult } from "./edge-unlock";

export const unlockEdgePack = createServerFn({ method: "POST" })
  .validator(z.object({ sessionId: z.string().optional() }))
  .handler(async ({ data }): Promise<EdgeUnlockResult> => {
    const { fulfillEdgeUnlock } = await import("./edge-unlock.server");
    return fulfillEdgeUnlock(data.sessionId ?? "");
  });
