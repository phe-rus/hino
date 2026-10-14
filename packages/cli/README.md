# Hino CLI

Set up Hino in an existing React project:

```bash
bunx @phe-rus/hino-cli init
```

Create a project with Hino already wired:

```bash
bunx @phe-rus/hino-cli create my-app
bunx @phe-rus/hino-cli create my-app --template tanstack
```

With npm, use `npx @phe-rus/hino-cli`; with pnpm, use `pnpm dlx @phe-rus/hino-cli`. The executable runs on Node 22.12 or newer and Bun.

## Existing projects

Run init in the React app workspace, or pass `--dir apps/my-app`. It adds Hino, Tailwind 4 and the appropriate Tailwind plugin to package.json. Existing versions and scripts are preserved. React 18 and Tailwind 3 need an explicit upgrade first.

The CLI creates `hino/styles.css`, `hino/providers.tsx` and `hino/README.md`. Follow that README to import the stylesheet, wrap app content with the provider and configure your Tailwind pipeline. It includes Next.js source transpilation guidance. The CLI does not rewrite your app root, routes or bundler configuration.

Add `--integration tanstack` when you want the optional form, table, routing and query integration. Hino itself works without TanStack.

## Options

| Option | Effect |
|---|---|
| `--template vite` | Vite React starter, the default for create |
| `--template tanstack` | TanStack Start starter with the optional integration |
| `--pm bun\|npm\|pnpm\|yarn` | Override package manager detection |
| `--no-install` | Write files without running install |
| `--dry-run` | Show the plan without changing files or installing |
| `--help` | Show usage |

Package manager detection uses packageManager, then lockfiles, then Bun. Create accepts only an empty directory. Init can be repeated and refuses conflicting setup files or symlinks. If installation fails, generated files remain ready for a manual retry.

TanStack Start generates route types during dev or build; build once before running its typecheck. Starters target React 19 and Tailwind 4. They include a Hino Button, theme and platform providers, and overlay hosts.

## Development

```bash
bun run build
bun run typecheck
bun run test
bun run publish:check
```

Source lives in `src/`; tests and fixtures live in `test/`. Bun bundles a standalone Node executable for npm. The public repository's `publish.yml` workflow accepts `package=cli` and uses environment `npm-publish`.

[Official docs](https://hino.pherus.org/docs/installation). MIT licensed.
