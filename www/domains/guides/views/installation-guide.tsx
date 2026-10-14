import { DocSection, type TocItem } from "@/domains/catalog"
import { Code, CodeBlock, Prose, Steps } from "./guide-parts"

export const installationSections: TocItem[] = [
    { id: "install", title: "Install" },
    { id: "styles", title: "Styles" },
    { id: "root", title: "Root setup" },
    { id: "first-component", title: "Your first component" },
]

export function InstallationGuide() {
    return (
        <>
            <DocSection
                id="install"
                title="Install"
                description="Install Hino from public npm in a React 19 app with Tailwind CSS 4."
            >
                <Prose>
                    For guided setup, run the Hino CLI in your
                    React app. It generates a stylesheet,
                    providers and instructions for your
                    framework.
                </Prose>
                <CodeBlock
                    lang="shellscript"
                    code={`bunx @phe-rus/hino-cli init

# Create a new project
bunx @phe-rus/hino-cli create my-app
bunx @phe-rus/hino-cli create my-app --template tanstack`}
                />
                <Prose>
                    Existing projects get hino/styles.css,
                    hino/providers.tsx and hino/README.md.
                    Follow that README to wire your app root
                    and Tailwind pipeline; init preserves your
                    routes and bundler configuration. Add
                    --integration tanstack for the optional
                    integration, --no-install to skip
                    installing, or --dry-run to inspect the
                    plan first.
                </Prose>
                <CodeBlock
                    lang="shellscript"
                    code={`# Other package managers
npx @phe-rus/hino-cli init
pnpm dlx @phe-rus/hino-cli init

# Optional TanStack integration
bunx @phe-rus/hino-cli init --integration tanstack`}
                />
                <Prose>
                    Prefer manual setup? Install the packages
                    below, configure Tailwind CSS 4 and follow
                    the styles and root setup sections.
                </Prose>
                <Steps
                    steps={[
                        {
                            title: "Add Hino.",
                            body: (
                                <Prose>
                                    Use Hino with any React
                                    framework. Its controls,
                                    themes and styles work
                                    independently of TanStack.
                                </Prose>
                            ),
                            lang: "shellscript",
                            code: "bun add @phe-rus/hino",
                        },
                        {
                            title: "Using TanStack Start or Router? Add the integrations too.",
                            body: (
                                <Prose>
                                    Forms, tables, route
                                    boundaries and the
                                    document shell, built on
                                    Hino's controls.
                                </Prose>
                            ),
                            lang: "shellscript",
                            code: "bun add @phe-rus/hino-tanstack @tanstack/react-query",
                        },
                    ]}
                />
                <Prose>
                    Both packages export TypeScript and TSX
                    source. Your framework's bundler must
                    process those files, and your app needs
                    Tailwind CSS 4 configured for its
                    stylesheet.
                </Prose>
            </DocSection>

            <DocSection
                id="styles"
                title="Styles"
                description="One import brings in Tailwind, the theme and everything Hino's controls need."
            >
                <Prose>
                    Add it to your root stylesheet. Tailwind
                    finds your own files by itself, and the
                    stylesheet registers Hino's, so there are
                    no paths to keep up to date.
                </Prose>
                <CodeBlock
                    label="app.css"
                    lang="css"
                    code={`@import "@phe-rus/hino/styles.css";`}
                />
                <Prose>
                    With <Code>@phe-rus/hino-tanstack</Code>,
                    import its stylesheet instead. It includes
                    Hino's.
                </Prose>
                <CodeBlock
                    label="app.css"
                    lang="css"
                    code={`@import "@phe-rus/hino-tanstack/styles.css";`}
                />
            </DocSection>

            <DocSection
                id="root"
                title="Root setup"
                description="Set the platform before the first paint, follow the system theme, and mount the hosts once."
            >
                <Prose>
                    <Code>PlatformScript</Code> sets{" "}
                    <Code>data-os</Code> before anything
                    paints, so there's no flash of another
                    platform's look. The hosts draw toasts,
                    menus, confirmations and tooltips for the
                    whole app.
                </Prose>
                <CodeBlock
                    label="src/routes/__root.tsx"
                    code={`import {
    ContextMenuHost,
    DialogHost,
    TooltipHost,
} from "@phe-rus/hino"
import {
    PlatformProvider,
    PlatformScript,
    ThemeProvider,
} from "@phe-rus/hino/appearance"
import { Toaster } from "@phe-rus/hino/toaster"

export function Root({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <PlatformScript />
            </head>
            <body>
                <PlatformProvider>
                    <ThemeProvider
                        attribute={["class", "data-theme"]}
                        defaultTheme="system"
                        enableColorScheme
                        enableSystem
                    >
                        {children}
                        <Toaster />
                        <ContextMenuHost />
                        <DialogHost />
                        <TooltipHost />
                    </ThemeProvider>
                </PlatformProvider>
            </body>
        </html>
    )
}`}
                />
                <Prose>
                    With TanStack Start, use{" "}
                    <Code>ComposeViewport</Code> from{" "}
                    <Code>
                        @phe-rus/hino-tanstack/document
                    </Code>{" "}
                    as the document shell.
                </Prose>
            </DocSection>

            <DocSection
                id="first-component"
                title="Your first component"
                description="Import each control from its own entry point."
            >
                <CodeBlock
                    code={`import { Button } from "@phe-rus/hino/button"
import { toast } from "@phe-rus/hino/toast"

export function SaveButton() {
    return (
        <Button
            variant="accent"
            onClick={() => toast.success("Changes saved")}
        >
            Save
        </Button>
    )
}`}
                />
            </DocSection>
        </>
    )
}
