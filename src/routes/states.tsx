import { createFileRoute, redirect } from "@tanstack/react-router";
import { parseStateCode } from "@/components/states-tab";

/** /states merged into /recruiting as the "By state" tab. */
export const Route = createFileRoute("/states")({
  beforeLoad: ({ search }) => {
    // TX is the tab default; leave it off so the target URL is canonical (no second 307).
    const parsed = parseStateCode((search as Record<string, unknown>).code);
    const code = parsed === "TX" ? undefined : parsed;
    throw redirect({ to: "/recruiting", search: { tab: "states", code }, statusCode: 301 });
  },
});
