# Hino TanStack integrations

Optional TanStack Form, Table and Router integrations for Hino's native
React controls. Hino itself works without this package.

## Install

```bash
bun add @phe-rus/hino @phe-rus/hino-tanstack @tanstack/react-query
```

Use React 19 and Tailwind CSS 4. Import this stylesheet once; it includes
Hino's styles:

```css
@import "@phe-rus/hino-tanstack/styles.css";
```

Import an integration from its own entry point:

```tsx
import { useAppForm } from "@phe-rus/hino-tanstack/forms"
import { useAppMutation } from "@phe-rus/hino-tanstack/mutation"
import { ComposeViewport } from "@phe-rus/hino-tanstack/document"
```

The package exports TypeScript and TSX source. Your app's bundler must
process those files and its stylesheet through Tailwind CSS 4. Query
integrations use your app's QueryClientProvider.

## Publishing

From the Pherus checkout:

```bash
bun run typecheck
bun test
bun run publish:check
bun publish
```

Publish the matching Hino version first. Bun resolves the local
`workspace:^` dependency to a public version range when packing. Login
with an npm account that can publish under `@phe-rus`. Credentials stay in
your user npm configuration.

The Hino repository's `publish.yml` GitHub Actions workflow uses
the `npm-publish` environment and npm OIDC authentication. Its trusted
publisher must reference `phe-rus/hino`.

## License

MIT.
