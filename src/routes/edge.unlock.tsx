import { createFileRoute } from "@tanstack/react-router";
import { EdgeUnlockPage } from "@/components/edge-unlock";
import { unlockEdgePack } from "@/lib/edge-unlock-fn";

type Search = { session_id?: string };

export const Route = createFileRoute("/edge/unlock")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s.session_id === "string" && s.session_id
      ? { session_id: s.session_id }
      : {}),
  }),
  loaderDeps: ({ search }) => ({ session_id: search.session_id }),
  loader: async ({ deps }) => {
    return unlockEdgePack({
      data: { sessionId: deps.session_id ?? "" },
    });
  },
  component: UnlockRoute,
  head: () => ({
    meta: [
      { title: "Unlock · HX Edge Pack · HASHMARK" },
      {
        name: "description",
        content: "Paid HX Edge Pack unlock. Verify Stripe checkout, then read the CLEARed week pack.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function UnlockRoute() {
  const result = Route.useLoaderData();
  return <EdgeUnlockPage result={result} />;
}
