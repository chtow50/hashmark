import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type TalentNavKey = "classes" | "states" | "roster" | "results" | "size";

const ITEMS: {
  key: TalentNavKey;
  label: string;
  to: "/recruiting" | "/talent";
  search: Record<string, string>;
}[] = [
  { key: "classes", label: "Classes", to: "/recruiting", search: {} },
  { key: "states", label: "By state", to: "/recruiting", search: { tab: "states" } },
  { key: "roster", label: "Roster talent", to: "/talent", search: {} },
  { key: "results", label: "Talent vs results", to: "/talent", search: { board: "results" } },
  { key: "size", label: "Size", to: "/talent", search: { board: "size" } },
];

/** One nav for the recruiting + talent pages (incoming classes → roster → results). */
export function TalentNav({ active }: { active: TalentNavKey }) {
  return (
    <nav
      aria-label="Recruiting and talent"
      className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {ITEMS.map((it) => (
        <Link
          key={it.key}
          to={it.to}
          search={it.search as never}
          aria-current={active === it.key ? "page" : undefined}
          className={cn(
            "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150 sm:h-10",
            active === it.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
          )}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
