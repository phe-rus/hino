# Hino source checkpoint

Current owner: `https://github.com/phe-rus/hino.git`. Pherus mounts this
repository as a submodule. The snapshot and adapters below record its
Notables lineage; they do not define a second editable source copy.

Source: Pherus Notables, packages/hino.
Revision: 512f730, 2026-10-10.

This is a versioned source snapshot for `@phe-rus/hino`, formerly `@ultrapeach/ui`. It does not depend on another local checkout at runtime or build time. The recorded revision identifies the starting source; local deltas below must be reconciled before refreshing it.

UI source and design tokens now share the `packages/hino/` workspace. TanStack integrations live independently in `packages/tanstack/`.

To update, review a new Notables commit, export only the Hino UI source, compare the diff, and reapply the destination adapters below. Record the new revision here. Do not overwrite local adapters or generated files blindly. Shared component fixes belong upstream first.

Destination adapters: standalone package tsconfigs, Pherus React/TypeScript catalog versions, @types/bun version, explicit upstream motion version, focused button/toggle/cn exports, root workspace registration, and Pherus Biome formatting. App styling lives outside this snapshot. Never copy the Notables root catalog or downgrade Pherus dependencies.

Pass, Accounts and www now import native Hino controls directly. TanStack form/table/router integration lives separately in `../tanstack/`, not in a second UI library. www retains its existing presentation. The initial isolated Pass sign-in stage is superseded.

Local shared-component deltas include reduced-motion handling in Sheet, Picker and Popover, the smoother Picker spring and Popover transform-origin alignment. Reconcile these with Notables before advancing the recorded source revision; they are not included in revision 512f730. Further local deltas: native DatePicker, TextField/TextEditor/SecureField, ProfileImage, Table, SearchList, TabView, Button styling, mixed-state Toggle, shared presentation components, persisted appearance and conflict-aware cn. `packages/ui` and its compatibility controls are removed. Website styling remains in www/styles/website.css. These local changes are not represented by the recorded Notables revision.

## Current repository layout

The public `phe-rus/hino` repository owns this UI workspace under `packages/ui`, optional integration under `packages/tanstack`, and the official website under `www`. Pherus mounts the repository at `packages/hino` as a Git submodule; the older paths above record migration history.
