# 0001. Hino project setup CLI

**Date**: 2026-10-14
**Status**: In Progress

## Summary

The public Hino repository owns `@phe-rus/hino-cli`. It sets up Hino in an existing React project or creates a project with Hino already wired. Initial starters are Vite React and TanStack Start, the choice confirmed by the user in the conversation.

## Requirements

- **AC-1**: `hino init` detects React projects, adds dependencies and generates styles, providers and framework specific instructions without rewriting app code.
- **AC-2**: `hino create <directory> --template vite|tanstack` creates a complete starter only in an absent or empty directory.
- **AC-3**: Repeating setup preserves existing files. Conflicting generated files and symlinks fail before any file is written. Existing dependency versions are preserved; incompatible React or Tailwind major versions require an explicit user upgrade.
- **AC-4**: Bun, npm, pnpm and Yarn work through argument arrays, without a shell. `--no-install` writes files without running a package manager. Installation failure reports that files remain ready for retry.
- **AC-5**: `--dry-run` reports planned files without writes or installation. Help and invalid arguments have predictable exit codes.
- **AC-6**: The published executable runs on Node 22.12 or newer and Bun without requiring TypeScript tooling. Tests and fixtures stay in `test/`. Public Hino CI builds and validates the CLI archive.

## Decision

Use Node standard library APIs and bundle the TypeScript CLI to an executable ES module with Bun. No runtime dependencies are required. Existing projects get additive setup and instructions instead of automatic root rewrites. New starters are static templates maintained here, following the installed Hino APIs and official framework setup.

## Feature design

`init` takes `--dir`, `--integration none|tanstack`, `--pm bun|npm|pnpm|yarn`, `--no-install` and `--dry-run`. `create` takes a directory plus the same package manager flags and `--template vite|tanstack`. Defaults are the current directory for init, Vite for create, no integration for init, and package manager detection from packageManager or lockfiles, falling back to Bun.

Generated values come from explicit template strings and package versions in the CLI source. Project metadata comes from package.json; framework detection comes from dependency names. Output directories come from command arguments and are resolved against the working directory. Each prospective file is checked before mutation. Init writes `hino/styles.css`, `hino/providers.tsx`, `hino/README.md` and updated package.json. Create includes root wiring, Vite configuration and a Hino Button example.

No network or credentials are used except the selected package manager installation. No app code is overwritten. Source distribution requires Tailwind 4 processing. Next.js instructions include transpilePackages and a client provider; generic React instructions describe the Tailwind pipeline. Templates add only the optional integration for TanStack Start.

## Build plan

1. [x] Build project inspection, planning and guarded writes, satisfies AC-1, AC-3, AC-4, AC-5.
2. [x] Add both starters and command parser, satisfies AC-2, AC-5.
3. [x] Add executable build, tests, docs and public CI/release wiring, satisfies AC-6.

## Consequences

Existing apps need to follow the generated root wiring instructions. This avoids unreliable transformations of arbitrary application source. The earlier user decision to omit a separate clean React app verification still applies; CLI file operation and process tests use temporary directories in its test suite.

Validation: CLI typecheck and 15 tests passed, including generated template parsing and relative import resolution. All existing Hino and website tests and typechecks passed, and the website built successfully. The packed archive contains four files, no runtime dependencies, and its executable ran under Node. Public release and CI validation are the remaining delivery steps.

Public Hino CI passed all checks at https://github.com/phe-rus/hino/actions/runs/38558894585. Initial npm publication is awaiting browser authentication.
