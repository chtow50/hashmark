import { createFileRoute, redirect } from "@tanstack/react-router";

/** Edge is paused. This old Edge URL permanently redirects to the paused /edge page. */
export const Route = createFileRoute("/edge/board")({
  beforeLoad: () => {
    throw redirect({ to: "/edge", statusCode: 301 });
  },
});
