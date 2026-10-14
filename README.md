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

Install instructions arrive with the npm release. Once installed, import
the styles once and each control from its own entry point:

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

## Principles

- Ask what Apple would do, then add our own touch.
- Name things as SwiftUI does: `Toggle`, `Picker`, `Sheet`, `footnote`.
- Use named tokens, never one-off colors, sizes or shadows.
- Every string comes from the app, so every app can translate.
- Respect the system: light and dark, text size, Reduce Motion and each
  platform's look.

## License

[MIT](./LICENSE)
