import { createFileRoute, redirect } from "@tanstack/react-router";

/** Edge is gone. /edge and every /edge/* URL permanently redirects to the board. */
export const Route = createFileRoute("/edge")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
