import type { InstallStep } from "../types"

/** The same for every component: add the package, then its styles. */
export const installSteps: InstallStep[] = [
    {
        title: "Add Hino from public npm.",
        code: "bun add @phe-rus/hino",
        lang: "shellscript",
    },
    {
        title: "Import its styles once, in your root stylesheet.",
        code: `@import "@phe-rus/hino/styles.css";`,
        lang: "css",
    },
    {
        title: "Import components from their own entry point.",
        code: `import { Button } from "@phe-rus/hino/button"`,
    },
]
