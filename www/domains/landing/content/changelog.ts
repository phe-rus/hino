import type { ChangelogEntry } from "../types"

// Real milestones from the repository history, newest first.
export const changelog: ChangelogEntry[] = [
    {
        date: "2026-10-14",
        title: "Hino gets a home of its own",
        summary:
            "A public site where every component runs live, with its props, theme, accent and platform one click away.",
    },
    {
        date: "2026-10-11",
        title: "Stronger design system contracts",
        summary:
            "Typed choices for every variant and size, plus tests that check token contrast and core controls.",
    },
    {
        date: "2026-10-11",
        title: "One package for controls and tokens",
        summary:
            "Native controls and design tokens now ship together as @phe-rus/hino, with TanStack integrations beside them.",
    },
]
