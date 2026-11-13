import { createFileRoute, redirect } from "@tanstack/react-router";

/** /desk merged into /model (What this is / is not + glossary live at /model#desk). */
export const Route = createFileRoute("/desk")({
  beforeLoad: () => {
    throw redirect({ to: "/model", hash: "desk", statusCode: 301 });
  },
});
