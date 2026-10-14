# Hino official website

`www/` is the official Hino docs website in `phe-rus/hino`, deployed as a Cloudflare Worker at `hino.pherus.org` (dev port 3004). Its words are written for people outside Pherus.

TanStack Start, React compiler, Tailwind through one import (`styles/site.css` imports `@phe-rus/hino-tanstack/styles.css` and adds `@source "../"`). No auth, no data, no bindings.

## Layout

- `domains/catalog`: one entry per component (`get-catalog.ts`: group, sidebar icon, docs, words), the words in `content/<slug>.ts`, and the page views (component page, overview grid, docs sidebar).
- `domains/playground`: the iframe host, controls panel, snippet generator (`get-snippet.ts`) and code view (Shiki and Prettier, both lazy loaded).
- `domains/preview`: the page inside the iframe (`/preview/$slug`), its message channel and size reporter. It mounts `Toaster`, `ContextMenuHost`, `DialogHost` and `TooltipHost` so overlays work inside it.
- `domains/settings`: the URL search schemas (theme, accent, platform, viewport, props), each key falling back on its own.
- `domains/guides`: the getting-started pages under `/docs/$slug` (Introduction, Installation, Theming, Typeset, Skills) and the `/components` entry in their list.
- `domains/ai-context`: `/llms.txt`, `/skills/hino/SKILL.md` and Copy for AI, all generated from the registry and the catalog's words. It imports catalog files directly, not `@/domains/catalog`, to avoid an import cycle.
- `domains/landing`, `domains/shell`: the home page and the site frame (header with a phone menu, footer).

Component docs code (controls, examples) lives in `../packages/ui`; see [UI guidance](../packages/ui/AGENTS.md).

The website, catalog prose, tests and reusable packages share this public repository. Pherus consumes the repository as a submodule. Tests stay under `test/`, outside `src/`.

## Conventions

- Route files hold only `Route` and `RouteComponent`, as everywhere in the repo.
- The page scrolls inside `<main>` (ComposeViewport fixes `<body>`), so the router resets it with `scrollToTopSelectors: ["main"]`. Keep `resetScroll: false` on navigations that only change search params.
- Pages that render per slug pass `key={slug}`, so folds and local state start over on each page.
- A playground snippet must compile when pasted: required props carry `required: true`, demo-only controls go in `omit`, and text goes through `jsxAttribute`/`jsxText`.
- Phones: the docs sidebar is hidden below `md` and opens in a Sheet from the bar naming the current page.

## Checks

`bun run test` (snippet generator and search fallbacks), `bun run typecheck`, `bun run build`. `../packages/ui`'s `bun test` covers the registry rules and example file names.
