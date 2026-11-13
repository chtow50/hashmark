import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { TeamLogo } from "@/components/team-logo";
import { usePinnedTeam } from "@/lib/pin";
import { cn } from "@/lib/utils";

/** Pin / unpin toggle for a team hub. Saved in this browser only. */
export function PinButton({ slug, name }: { slug: string; name: string }) {
  const [pinned, setPinned] = usePinnedTeam();
  const on = pinned === slug;
  return (
    <button
      type="button"
      onClick={() => setPinned(on ? null : slug)}
      aria-pressed={on}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm transition-colors",
        on ? "border-accent/60 bg-accent/10 text-fg" : "border-line text-muted hover:text-fg",
      )}
    >
      <Star className={cn("size-4", on ? "fill-accent text-accent" : "")} aria-hidden />
      {on ? `${name} is your team` : "Pin as my team"}
    </button>
  );
}

/** Header shortcut to the pinned team. Renders nothing until a team is pinned. */
export function PinnedChip() {
  const [pinned] = usePinnedTeam();
  if (!pinned) return null;
  return (
    <Link
      to="/teams/$slug"
      params={{ slug: pinned }}
      aria-label="Your pinned team"
      title="Your pinned team"
      className="flex size-10 items-center justify-center rounded-md hover:bg-surface"
    >
      <TeamLogo slug={pinned} size={22} />
    </Link>
  );
}
