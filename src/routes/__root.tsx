import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/shell";
import appCss from "../styles.css?url";

const APP_NAME = "HASHMARK";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "HASHMARK is a college football intelligence desk: HX power rankings, composite recruiting, roster talent, and head-to-head matchup modeling.",
      },
      { name: "theme-color", content: "#09090b" },
      { property: "og:site_name", content: APP_NAME },
      { property: "og:title", content: APP_NAME },
      {
        property: "og:description",
        content:
          "College football ratings desk. One number: HX. Full 136 FBS.",
      },
      { property: "og:image", content: "https://hashmarkcfb.com/og.jpg" },
      { property: "og:url", content: "https://hashmarkcfb.com" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://hashmarkcfb.com/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: Root,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="py-16">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">404</p>
      <h1 className="mt-2 font-display text-4xl tracking-wide">Off the board</h1>
      <p className="mt-3 max-w-md text-muted">That page is not in the HASHMARK set.</p>
      <Link
        to="/"
        className="mt-6 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
      >
        Back to the board
      </Link>
    </div>
  );
}

function Root() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <AppShell>
            <Outlet />
          </AppShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
