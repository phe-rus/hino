# Hino

Hino is Pherus's design system: native React controls, design tokens and
themes, with names drawn from SwiftUI. What Liquid Glass is to Apple and
Material 3 is to Google, built for any React app.

**Docs, live playgrounds and examples: [hino.pherus.org](https://hino.pherus.org)**

## What's inside

- **Controls**: buttons, fields, pickers, toggles, sheets, dialogs,
  popovers, toasts, menus, tables and more, written as plain React you
  can read.
- **Design tokens**: color roles for light and dark, seven accents, text
  styles named as SwiftUI names them, corners and springs.
- **Appearance**: theme and platform providers, so every control follows
  the system it runs on, with `ios:`, `android:`, `macos:`, `windows:`
  and `linux:` variants.
- **Typeset**: calm styles for long-form writing.

## Using it

Install the public npm package in a React 19 app with Tailwind CSS 4:

```bash
bun add @phe-rus/hino
```

Import the styles once and each control from its own entry point:

```css
@import "@phe-rus/hino/styles.css";
```

```tsx
import { Button } from "@phe-rus/hino/button"

export function SaveButton() {
    return <Button variant="accent">Save</Button>
}
```

See [Installation](https://hino.pherus.org/docs/installation) for the
root setup, and [Skills](https://hino.pherus.org/docs/skills) to give AI
agents Hino's rules.

Hino works independently of TanStack. If your app uses TanStack Form,
Table or Router, the optional `@phe-rus/hino-tanstack` package connects them to
Hino's controls.

## Development and publishing

```bash
bun install
bun run typecheck
bun test
bun run publish:check
```

The package exports TypeScript and TSX source. Your app's bundler must
process those files and its stylesheet through Tailwind CSS 4.

Login to npm with an account that can publish under `@phe-rus`, then run
`bun publish`. The package configuration selects the public npm registry
and public access. Keep credentials in your user npm configuration.

## Principles

- Ask what Apple would do, then add our own touch.
- Name things as SwiftUI does: `Toggle`, `Picker`, `Sheet`, `footnote`.
- Use named tokens, never one-off colors, sizes or shadows.
- Every string comes from the app, so every app can translate.
- Respect the system: light and dark, text size, Reduce Motion and each
  platform's look.

## License

[MIT](./LICENSE)
