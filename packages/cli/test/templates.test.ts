import { expect, test } from "bun:test"
import { posix } from "node:path"
import { starterFiles } from "../src/templates"

test.each(["vite", "tanstack"] as const)(
    "%s starter source parses and every relative module resolves",
    (template) => {
        const files = starterFiles("demo", template)
        for (const [path, source] of Object.entries(files)) {
            if (
                !path.endsWith(".tsx") &&
                !path.endsWith(".ts")
            )
                continue
            const parser = new Bun.Transpiler({
                loader: path.endsWith(".tsx") ? "tsx" : "ts",
            })
            expect(() =>
                parser.transformSync(source)
            ).not.toThrow()
            const { imports } = parser.scan(source)
            for (const module of imports) {
                if (!module.path.startsWith(".")) continue
                const target = posix.normalize(
                    posix.join(
                        posix.dirname(path),
                        module.path.replace(/\?url$/, "")
                    )
                )
                if (target.endsWith("routeTree.gen")) continue
                expect(
                    files[target] ??
                        files[`${target}.ts`] ??
                        files[`${target}.tsx`]
                ).toBeDefined()
            }
        }
        if (template === "vite") {
            expect(
                JSON.parse(files["package.json"])
                    .dependencies["@phe-rus/hino-tanstack"]
            ).toBeUndefined()
        }
    }
)
