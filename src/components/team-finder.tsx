import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { listTeams } from "@/lib/cfb/queries";
import { cn } from "@/lib/utils";

type Hit = { slug: string; name: string; shortName: string; conference: string; hxRank: number };

const NICK: Record<string, string> = {
  bama: "alabama",
  tide: "alabama",
  nd: "notre-dame",
  osu: "ohio-state",
  bucks: "ohio-state",
  psu: "penn-state",
  olemiss: "ole-miss",
  fsu: "florida-state",
  uf: "florida",
  uga: "georgia",
  dawgs: "georgia",
  canes: "miami",
  mizzou: "missouri",
  vols: "tennessee",
  ou: "oklahoma",
  tamu: "texas-am",
  ttu: "texas-tech",
  gt: "georgia-tech",
  unc: "north-carolina",
  uw: "washington",
  pitt: "pittsburgh",
};

function norm(s: string) {
  return s.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
}

function matches(t: Hit, q: string) {
  const raw = norm(q);
  if (!raw) return false;
  if (NICK[raw] === t.slug) return true;
  const hay = norm(`${t.name} ${t.shortName} ${t.slug.replaceAll("-", " ")} ${t.conference}`);
  if (hay.includes(raw)) return true;
  return raw.split(" ").every((p) => hay.includes(p));
}

export function TeamFinder() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [teams, setTeams] = useState<Hit[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    if (!teams) {
      listTeams().then((rows) =>
        setTeams(
          rows.map((r) => ({
            slug: r.slug,
            name: r.name,
            shortName: r.shortName,
            conference: r.conference,
            hxRank: r.hxRank,
          })),
        ),
      );
    }
    return () => window.clearTimeout(t);
  }, [open, teams]);

  const hits = useMemo(() => {
    if (!teams) return [];
    if (!q.trim()) return teams.slice(0, 8);
    return teams.filter((t) => matches(t, q)).slice(0, 12);
  }, [teams, q]);

  function go(slug: string) {
    setOpen(false);
    navigate({ to: "/teams/$slug", params: { slug } });
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted hover:text-fg"
        aria-label="Search teams"
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" />
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            aria-label="Close search"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search teams"
            className="absolute inset-x-0 top-[12vh] mx-auto w-[min(560px,calc(100%-1.5rem))] overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border-hover)]"
          >
            <div className="relative border-b border-line">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint" />
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((i) => Math.min(hits.length - 1, i + 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((i) => Math.max(0, i - 1));
                  }
                  if (e.key === "Enter" && hits[active]) {
                    e.preventDefault();
                    go(hits[active].slug);
                  }
                }}
                placeholder="Team, nickname, or conference"
                className="h-14 w-full bg-transparent pr-12 pl-11 text-base text-fg outline-none placeholder:text-faint"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-fg"
                aria-label="Close search"
                onClick={() => setOpen(false)}
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto py-1">
              {!teams ? (
                <li className="px-4 py-3 text-sm text-muted">Loading the 136…</li>
              ) : hits.length === 0 ? (
                <li className="px-4 py-3 text-sm text-muted">No team matches.</li>
              ) : (
                hits.map((t, i) => (
                  <li key={t.slug}>
                    <Link
                      to="/teams/$slug"
                      params={{ slug: t.slug }}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between gap-3 px-4 py-2.5 text-sm",
                        i === active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
                      )}
                    >
                      <span>
                        <span className="font-medium text-fg">{t.name}</span>
                        <span className="ml-2 text-faint">{t.conference}</span>
                      </span>
                      <span className="font-mono text-[11px] tabular text-faint">HX {t.hxRank}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <p className="border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              ⌘K · Enter opens the team page
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
