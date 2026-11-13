import { createFileRoute, redirect } from "@tanstack/react-router";
import { parseStateCode } from "@/components/states-tab";

/** /states merged into /recruiting as the "By state" tab. */
export const Route = createFileRoute("/states")({
  beforeLoad: ({ search }) => {
    const code = parseStateCode((search as Record<string, unknown>).code);
    throw redirect({ to: "/recruiting", search: { tab: "states", code }, statusCode: 301 });
  },
});
