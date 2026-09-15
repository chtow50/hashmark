import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHead, Panel } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { EDGE, EDGE_SUPPORT_EMAIL } from "@/lib/edge";
import { packDownloadHref } from "@/lib/edge-unlock";
import { verifyEdgeUnlock } from "@/lib/edge-unlock-fn";

type Search = { session_id?: string };

export const Route = createFileRoute("/edge/unlock")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s.session_id === "string" && s.session_id ? { session_id: s.session_id } : {}),
  }),
  loaderDeps: ({ search }) => ({ session_id: search.session_id }),
  loader: async ({ deps }) =>
    verifyEdgeUnlock({
      data: { ...(deps.session_id ? { sessionId: deps.session_id } : {}) },
    }),
  component: UnlockPage,
  head: () => ({
    meta: [
      { title: `Unlock · ${EDGE.name} · HASHMARK` },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content: "Post-purchase HX Edge Pack unlock. Paid checkout required.",
      },
    ],
  }),
});

function SupportLine() {
  return (
    <p className="mt-4 text-sm text-muted">
      Support:{" "}
      <a href={`mailto:${EDGE_SUPPORT_EMAIL}`} className="text-fg underline-offset-4 hover:underline">
        {EDGE_SUPPORT_EMAIL}
      </a>
    </p>
  );
}

function UnlockPage() {
  const result = Route.useLoaderData();
  const { session_id: sessionId } = Route.useSearch();

  if (result.ok && sessionId) {
    return (
      <div className="space-y-8">
        <PageHead
          kicker={`${EDGE.name} · Week ${result.pack.week}`}
          title="Thanks. Your pack is ready."
          lede={`${result.pack.product}. Download the markdown brief and the JSON. This page does not keep a login — keep the files.`}
        />
        <Panel>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Downloads</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button asChild variant="primary" className="w-full">
              <a href={packDownloadHref(sessionId, "md")} rel="noreferrer">
                <Download className="size-4" />
                Download markdown
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href={packDownloadHref(sessionId, "json")} rel="noreferrer">
                <Download className="size-4" />
                Download JSON
              </a>
            </Button>
          </div>
          <SupportLine />
        </Panel>
        <p className="text-sm">
          <Link to="/edge" className="text-fg underline-offset-4 hover:underline">
            Back to Edge Pack
          </Link>
        </p>
      </div>
    );
  }

  const missing = !result.ok && result.reason === "missing_session";

  return (
    <div className="space-y-8">
      <PageHead
        kicker={EDGE.name}
        title={missing ? "This unlock link needs a checkout." : "We could not unlock this pack."}
        lede={
          missing
            ? "Stripe sends you here after a paid checkout. If you opened this page directly, start from Edge Pack."
            : "Payment could not be confirmed. If you were charged, email support with the time of purchase — do not forward card details."
        }
      />
      <Panel>
        <p className="text-sm leading-relaxed text-muted">
          The pack is not on the public Edge Pack page. Unlock only follows a paid Checkout Session.
        </p>
        <SupportLine />
        <p className="mt-6">
          <Button asChild variant="primary">
            <Link to="/edge">Open Edge Pack</Link>
          </Button>
        </p>
      </Panel>
    </div>
  );
}
