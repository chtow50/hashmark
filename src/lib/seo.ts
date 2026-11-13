/**
 * Per-route head tags: title, description, canonical, Open Graph and Twitter.
 * The root route sets site-wide defaults only (no canonical, no og:url); every page
 * route spreads seo(...) into its head() so each URL gets its own canonical and card.
 * TanStack dedupes title and meta by name/property with the deepest route winning;
 * links are not deduped, so canonical must live only here.
 */
export const SITE_URL = "https://hashmarkcfb.com";
export const SITE_NAME = "HASHMARK";
export const OG_IMAGE = `${SITE_URL}/og.jpg`;

export type SeoInput = {
  /** Path with leading slash, no query (canonical drops query params). */
  path: string;
  title: string;
  description: string;
  /** Set for pages that should not be indexed. */
  noindex?: boolean;
  /** Per-page share card (path under public/, e.g. /og/teams/ohio-state.jpg). Falls back to /og.jpg. */
  image?: string;
};

export function canonicalUrl(path: string): string {
  const clean = path.split(/[?#]/)[0] || "/";
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}

export function seo({ path, title, description, noindex, image }: SeoInput) {
  const url = canonicalUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex,follow" }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(image
        ? [
            { property: "og:image", content: `${SITE_URL}${image}` },
            { name: "twitter:image", content: `${SITE_URL}${image}` },
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
