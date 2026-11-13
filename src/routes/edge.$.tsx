import { createFileRoute, redirect } from "@tanstack/react-router";

/** Old Edge URLs (/edge/board, /edge/unlock, /edge/sim, …) permanently redirect to the board. */
export const Route = createFileRoute("/edge/$")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
