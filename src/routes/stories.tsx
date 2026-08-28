import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { listStories, WEEK0_SLATE, type SlateHx } from "@/lib/cfb/stories";

export const Route = createFileRoute("/stories")({
  loader: () => listStories(),
  component: StoriesPage,
  head: () => ({ meta: [{ title: "Stories · HASHMARK" }] }),
});

function hxLabel(side: SlateHx) {
  return side.rank == null ? "—" : String(side.rank);
}

function SideName({ side }: { side: SlateHx }) {
  if ("slug" in side) {
    return (
      <Link
        to="/teams/$slug"
        params={{ slug: side.slug }}
        className="text-fg hover:text-accent"
      >
        {side.name}
      </Link>
    );
  }
  return <span className="text-fg">{side.name}</span>;
}

function StoriesPage() {
  const stories = Route.useLoaderData();
  const lead = stories[0];
  const rest = stories.slice(1);

  return (
    <div>
      <PageHead
        kicker="Week 0 · 2026"
        title="The desk is open."
        lede="HASHMARK is covering the first FBS Saturday (Aug. 29) with HX in the copy."
      />

      {lead ? (
        <Link
          to="/stories/$slug"
          params={{ slug: lead.slug }}
          className="mb-6 block rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)] sm:p-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {lead.kicker} · {lead.date}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-wide text-fg sm:text-4xl">
            {lead.headline}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{lead.dek}</p>
        </Link>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((story) => (
          <Link
            key={story.slug}
            to="/stories/$slug"
            params={{ slug: story.slug }}
            className="flex min-h-44 flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              {story.kicker} · {story.date}
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-wide text-fg">{story.headline}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{story.dek}</p>
          </Link>
        ))}
      </div>

      <Panel className="mt-8 overflow-hidden p-0 sm:p-0">
        <div className="border-b border-line px-4 py-4 sm:px-5">
          <h2 className="font-display text-2xl tracking-wide">Week 0 slate</h2>
          <p className="mt-1 text-sm text-muted">Saturday, Aug. 29 · times CT · HX where HASHMARK has the team</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="px-4 py-3 font-medium">Kick</th>
                <th className="px-3 py-3 font-medium">Matchup</th>
                <th className="px-3 py-3 font-medium">TV</th>
                <th className="px-4 py-3 font-medium">HX</th>
              </tr>
            </thead>
            <tbody>
              {WEEK0_SLATE.map((g) => (
                <tr key={`${g.time}-${g.tv}-${g.away.name}`} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 tabular text-muted">{g.time}</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex min-h-11 flex-wrap items-center gap-x-1.5">
                      <SideName side={g.away} />
                      <span className="text-faint">{g.neutral ? "vs" : "at"}</span>
                      <SideName side={g.home} />
                      {g.note ? <span className="text-faint">· {g.note}</span> : null}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted">{g.tv}</td>
                  <td className="px-4 py-3 font-display tabular">
                    {hxLabel(g.away)} / {hxLabel(g.home)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
