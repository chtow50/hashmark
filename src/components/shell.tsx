import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CONFS, type ConfFilter } from "@/lib/cfb/conferences";
import { MODEL } from "@/lib/cfb/model";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Board" },
  { to: "/schedule", label: "Schedule" },
  { to: "/stories", label: "Stories" },
  { to: "/rankings", label: "Rankings" },
  { to: "/matchup", label: "Matchup" },
  { to: "/recruiting", label: "Recruiting" },
  { to: "/talent", label: "Talent" },
  { to: "/states", label: "States" },
  { to: "/model", label: "The Model" },
] as const;

export function HashLogo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 text-fg", className)}
      aria-label="HASHMARK home"
    >
      <span className="flex h-7 items-end gap-[3px]" aria-hidden>
        <span className="h-5 w-[3px] rounded-full bg-accent" />
        <span className="h-7 w-[3px] rounded-full bg-accent" />
      </span>
      <span className="font-display text-xl tracking-[0.18em]">HASHMARK</span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
          <HashLogo />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative flex h-11 items-center px-3 text-sm tracking-wide transition-colors duration-150",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-accent" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-faint sm:inline">
              {MODEL.weekLabel}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-line px-4 py-3 lg:hidden">
            <div className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center border-b border-line text-base text-fg last:border-0"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="font-display tracking-[0.16em] text-faint">
            HASHMARK · HX {MODEL.version}
          </span>
          <span>Power ratings, composite recruiting, roster science.</span>
        </div>
      </footer>
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-8 max-w-2xl enter">
      {kicker ? (
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {kicker}
        </p>
      ) : null}
      <h1 className="font-display text-4xl tracking-wide text-fg sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-3 text-base leading-relaxed text-muted">{lede}</p> : null}
    </header>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

type TeamOption = {
  slug: string;
  name: string;
  hxRank: number;
  shortName?: string;
  conference?: string;
  mascot?: string;
};

const NICK_TO_SLUG: Record<string, string> = {
  tamu: "texas-am",
  "a m": "texas-am",
  "texas am": "texas-am",
  bama: "alabama",
  tide: "alabama",
  nd: "notre-dame",
  irish: "notre-dame",
  osu: "ohio-state",
  bucks: "ohio-state",
  buckeyes: "ohio-state",
  psu: "penn-state",
  nittany: "penn-state",
  olemiss: "ole-miss",
  "ole miss": "ole-miss",
  fsu: "florida-state",
  noles: "florida-state",
  uf: "florida",
  gators: "florida",
  canes: "miami",
  hurricanes: "miami",
  dawgs: "georgia",
  uga: "georgia",
  ducks: "oregon",
  hoosiers: "indiana",
  mizzou: "missouri",
  vols: "tennessee",
  vol: "tennessee",
  wazzu: "washington-state",
  pitt: "pittsburgh",
  gtech: "georgia-tech",
  gt: "georgia-tech",
  jmu: "james-madison",
  sdsu: "san-diego-state",
  wvu: "west-virginia",
  vt: "virginia-tech",
  uk: "kentucky",
  ou: "oklahoma",
  sooners: "oklahoma",
  ttu: "texas-tech",
  unc: "north-carolina",
  uw: "washington",
  cal: "california",
  uconn: "uconn",
  umass: "massachusetts",
  utsa: "utsa",
  byu: "byu",
  lsu: "lsu",
  usc: "usc",
  ucla: "ucla",
  tcu: "tcu",
};

function normQuery(s: string) {
  return s.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
}

function teamHaystack(t: TeamOption) {
  return normQuery(
    [t.name, t.shortName, t.slug.replaceAll("-", " "), t.conference, t.mascot]
      .filter(Boolean)
      .join(" "),
  );
}

function teamMatches(t: TeamOption, q: string) {
  const raw = normQuery(q);
  if (!raw) return true;
  if (NICK_TO_SLUG[raw] === t.slug) return true;
  const hay = teamHaystack(t);
  const compact = hay.replace(/ /g, "");
  const compactQ = raw.replace(/ /g, "");
  if (hay.includes(raw) || (compactQ.length >= 3 && compact.includes(compactQ))) return true;
  return raw.split(" ").filter(Boolean).every((p) => hay.includes(p) || compact.includes(p));
}

export function TeamSelect({
  id,
  label,
  value,
  teams,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  teams: TeamOption[];
  onChange: (slug: string) => void;
}) {
  const listId = `${id}-names`;
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => (query.trim() ? teams.filter((t) => teamMatches(t, query)) : teams),
    [teams, query],
  );
  const options =
    query.trim() && !filtered.some((t) => t.slug === value)
      ? [...filtered, ...teams.filter((t) => t.slug === value)]
      : filtered;

  function pick(slug: string) {
    onChange(slug);
    setQuery("");
  }

  function applyQuery(next: string) {
    setQuery(next);
    const q = normQuery(next);
    if (!q) return;
    const nick = NICK_TO_SLUG[q];
    if (nick && teams.some((t) => t.slug === nick)) {
      pick(nick);
      return;
    }
    const exact = teams.find(
      (t) => normQuery(t.name) === q || normQuery(t.shortName ?? "") === q,
    );
    if (exact) {
      pick(exact.slug);
      return;
    }
    const hits = teams.filter((t) => teamMatches(t, next));
    if (hits.length === 1) pick(hits[0].slug);
  }

  return (
    <div className="block min-w-0">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint">{label}</span>
      <div className="space-y-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
          <input
            id={`${id}-search`}
            type="search"
            list={listId}
            autoComplete="off"
            spellCheck={false}
            placeholder="Type a team, mascot, or nickname"
            aria-label={`Search ${label} team`}
            value={query}
            onChange={(e) => applyQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (filtered[0]) pick(filtered[0].slug);
              }
              if (e.key === "Escape") setQuery("");
            }}
            className="h-12 w-full rounded-lg bg-raised py-0 pr-10 pl-10 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-faint focus:shadow-[var(--shadow-border-hover)]"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-faint hover:text-fg"
              onClick={() => setQuery("")}
            >
              <X className="size-4" />
            </button>
          ) : null}
          <datalist id={listId}>
            {teams.map((t) => (
              <option key={t.slug} value={t.name} />
            ))}
          </datalist>
        </div>
        <select
          id={id}
          value={value}
          aria-label={`${label} team`}
          onChange={(e) => pick(e.target.value)}
          className="h-12 w-full rounded-lg bg-raised px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
        >
          {options.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.hxRank}. {t.name}
              {t.conference ? ` · ${t.conference}` : ""}
            </option>
          ))}
          {options.length === 0 ? <option value={value}>No match</option> : null}
        </select>
      </div>
    </div>
  );
}

/** Conference filter chips. Uses real links so the board filters on navigation, not only client state. */
export function ConfPills({
  value,
  to,
  searchFor,
}: {
  value: ConfFilter;
  to: "/rankings" | "/recruiting" | "/talent";
  searchFor: (conf: ConfFilter) => Record<string, unknown>;
}) {
  return (
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Conference">
      {CONFS.map((c) => (
        <Link
          key={c}
          to={to}
          search={searchFor(c) as never}
          role="tab"
          aria-selected={value === c}
          className={cn(
            "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150",
            value === c ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
          )}
        >
          {c}
        </Link>
      ))}
    </div>
  );
}
