import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/edge/pack")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { handleEdgePackDownload } = await import("@/lib/edge-pack-files.server");
        return handleEdgePackDownload(request);
      },
    },
  },
});
