import { createFileRoute, redirect } from "@tanstack/react-router";

/** There is no /games index: each game lives at /games/<date>-<away>-at-<home>. The bare path goes to the schedule. */
export const Route = createFileRoute("/games/")({
  beforeLoad: () => {
    throw redirect({ to: "/schedule", statusCode: 301 });
  },
});
