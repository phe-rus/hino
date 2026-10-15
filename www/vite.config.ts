import { defineConfig, lazyPlugins } from "vite-plus"
import { cloudflare } from "@cloudflare/vite-plugin"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import babel from "@rolldown/plugin-babel"
import viteReact, {
    reactCompilerPreset,
} from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

// no TanStack devtools plugin: its event bus port would clash with the
// other apps' dev servers, and a docs site has nothing to inspect there
const config = defineConfig({
    server: {
        cors: false,
    },
    resolve: {
        tsconfigPaths: true,
        alias: {
            "@": path.resolve(import.meta.dirname, "."),
        },
    },
    build: {
        target: "esnext",
        cssCodeSplit: true,
    },
    // unit tests need only the @ alias; the Cloudflare plugin would move
    // them into a Workers runtime
    plugins: lazyPlugins(() =>
        process.env.VITEST
            ? []
            : [
                  cloudflare({
                      viteEnvironment: {
                          name: "ssr",
                      },
                      persistState: true,
                  }),
                  tailwindcss(),
                  tanstackStart(),
                  babel({
                      presets: [reactCompilerPreset()],
                  }),
                  viteReact(),
              ]
    ),
})

export default config
