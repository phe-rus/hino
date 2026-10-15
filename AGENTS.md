# Hino repository

This public Bun workspace repository owns Hino's framework independent
UI, its optional TanStack integration and its CLI. Develop it as its own checkout, conventionally `~/pherus/hino`.
Pherus consumes published npm releases, not a submodule or sibling files. The official website lives in `www/` here; Pherus apps
remain outside this repo.

## Packages

* `packages/ui`, `@phe-rus/hino`: native React controls, tokens,
  appearance, typed docs and examples. See `packages/ui/AGENTS.md`.
* `packages/tanstack`, `@phe-rus/hino-tanstack`: optional form, table,
  router and query integrations. See `packages/tanstack/AGENTS.md`.
* `packages/cli`, `@phe-rus/hino-cli`: project setup tooling. See
  `packages/cli/AGENTS.md` for file safety and starter conventions.

Dependency direction is CLI setup tooling and optional integrations
toward the UI. The UI itself remains independent of TanStack and CLI.
Use package specifiers across package boundaries. Keep dependency
versions explicit so this repo works without Pherus's catalogs.

Tests, helpers and fixtures live in each package's `test/` directory,
outside `src/`. UI tokens retain `tokens/test/` beside `tokens/src/`.

## Checks and publishing

Use Bun for installation, typecheck and packing; tests run on Vitest
through Vite+ (`vp test`, importing from `vite-plus/test`), and
`bun run check` runs Oxfmt and Oxlint from the root `vite.config.ts`.
The CLI's test script builds `dist/hino.js` first and tests the
published bin. Root scripts
run the matching task across Hino packages. CI and public npm release
workflows live in this repository, not private Pherus.

`publish.yml` uses GitHub environment `npm-publish` and job scoped
`id-token: write`. npm publishes Bun packed tarballs using OIDC;
no npm token secret is needed. Each package needs its own npm trusted
publisher matching `phe-rus/hino`, `publish.yml` and `npm-publish`.
Publish the UI before dependent integration releases. npm versions
cannot be overwritten. Credentials stay outside tracked files.

Route files contain only imports, `export const Route` and an optional
`function RouteComponent()`. Helpers and data belong in domains.

For setup, architecture, testing, npm releases and website deployment,
read [the contributor guide](CONTRIBUTING.md). For changes to public
URLs or metadata, read [the SEO guide](docs/seo.md).

Use ChromeOS Chrome for browser checks. In Crostini, open links through
`/usr/bin/garcon-url-handler`. Do not launch a Linux or embedded browser.
