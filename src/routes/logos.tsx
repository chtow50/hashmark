import { createFileRoute, redirect } from "@tanstack/react-router";

/** /logos was an internal asset grid; deleted. Old links go to the board. */
export const Route = createFileRoute("/logos")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
