import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { getStory } from "@/lib/cfb/stories";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return story;
  },
  component: StoryPage,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.headline} · HASHMARK` : "Story · HASHMARK" }],
  }),
});

function StoryPage() {
  const story = Route.useLoaderData();

  return (
    <div>
      <PageHead kicker={story.kicker} title={story.headline} lede={story.dek} />

      <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        HASHMARK desk · {story.date}
      </p>

      <article className="max-w-2xl">
        <div className="space-y-4 text-base leading-relaxed text-fg">
          {story.body.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>

        <Panel className="mt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Why it matters</p>
          <p className="mt-3 text-base leading-relaxed">{story.whyItMatters}</p>
        </Panel>

        <div className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Sources</p>
          <ul className="mt-3 space-y-2">
            {story.sources.map((src) => (
              <li key={src.href}>
                <a
                  href={src.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center text-sm text-fg underline decoration-border underline-offset-4 hover:text-accent"
                >
                  {src.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
