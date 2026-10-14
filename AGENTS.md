# Hino repository

This public Bun workspace repository owns Hino's framework independent
UI, its optional TanStack integration and its CLI. Pherus mounts it as
a submodule. The official website lives in `www/` here; Pherus apps
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

Use Bun for installation, typecheck, tests and packing. Root scripts
run the matching task across Hino packages. CI and public npm release
workflows live in this repository, not private Pherus.

`publish.yml` uses GitHub environment `npm-publish` and job scoped
`id-token: write`. npm publishes Bun packed tarballs using OIDC;
no npm token secret is needed. Each package needs its own npm trusted
publisher matching `phe-rus/hino`, `publish.yml` and `npm-publish`.
Publish the UI before dependent integration releases. npm versions
cannot be overwritten. Credentials stay outside tracked files.
