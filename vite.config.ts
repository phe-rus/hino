import { defineConfig } from "vite-plus"

// Formatting and linting for every Hino package. Same style Pherus
// uses for its consumers: 4 spaces, width 62, double
// quotes, no semicolons, imports and package.json never sorted.
export default defineConfig({
    fmt: {
        printWidth: 62,
        tabWidth: 4,
        useTabs: false,
        semi: false,
        singleQuote: false,
        trailingComma: "es5",
        endOfLine: "lf",
        sortPackageJson: false,
        // JSON and JSONC never take trailing commas (wrangler.jsonc included)
        overrides: [
            {
                files: ["**/*.json", "**/*.jsonc"],
                options: { trailingComma: "none" },
            },
        ],
        // only TS, JS and JSON are formatted; generated files stay as written
        ignorePatterns: [
            "**/*.md",
            "**/*.mdx",
            "**/*.css",
            "**/*.html",
            "**/*.yml",
            "**/*.yaml",
            "**/*.toml",
            "**/routeTree.gen.ts",
            "**/worker-configuration.d.ts",
        ],
    },
    lint: {
        jsPlugins: [
            {
                name: "vite-plus",
                specifier: "vite-plus/oxlint-plugin",
            },
        ],
        plugins: [
            "typescript",
            "react",
            "react-hooks",
            "jsx-a11y",
            "unicorn",
            "oxc",
        ],
        ignorePatterns: [
            "**/routeTree.gen.ts",
            "**/worker-configuration.d.ts",
        ],
        rules: {
            "vite-plus/prefer-vite-plus-imports": "error",
            "react-hooks/exhaustive-deps": "warn",
            // deliberate patterns, not bugs: TanStack Form's children
            // prop, click-only interactive elements, decorative icons
            "react/no-children-prop": "off",
            "jsx-a11y/click-events-have-key-events": "off",
            "jsx-a11y/no-static-element-interactions": "off",
            "react/no-array-index-key": "off",
            "typescript/no-non-null-assertion": "off",
        },
        // tsc 7 stays the type checker (`vp run -r typecheck`)
        options: { typeAware: false, typeCheck: false },
    },
})
