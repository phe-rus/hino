# Hino

Native React controls, design tokens and setup tooling, built for any
React framework.

Docs and live playgrounds: [hino.pherus.org](https://hino.pherus.org).

| Package | Directory | Purpose |
|---|---|---|
| `@phe-rus/hino` | `packages/ui` | UI controls, tokens and appearance |
| `@phe-rus/hino-tanstack` | `packages/tanstack` | Optional TanStack integrations |
| `@phe-rus/hino-cli` | `packages/cli` | Project setup tooling |

Hino's UI works without the other packages. The official website lives
in `www/` and consumes these packages. Run `bun run --cwd www dev`
for local development, or `bun run build:website` for its Worker build.

```bash
bunx @phe-rus/hino-cli init
bunx @phe-rus/hino-cli create my-app --template tanstack
```

Repository development:

```bash
bun install
bun run typecheck
bun run test
```

CI and publishing run here. Each public npm package uses a trusted
publisher for this repository's `publish.yml` workflow and the
`npm-publish` environment.

See [UI installation](packages/ui/README.md) and
[TanStack integration](packages/tanstack/README.md).

MIT licensed.

This repository works independently of Pherus. Consumers install the
published npm packages; no submodule or sibling checkout is required.
See [Contributing](CONTRIBUTING.md) for standalone setup, architecture,
validation, releases and website deployment, and [SEO](docs/seo.md) for
the sitemap and metadata contract.
