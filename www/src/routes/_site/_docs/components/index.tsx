import { ComponentsOverview } from "@/domains/catalog"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/components/"
)({
    head: () => ({
        meta: [
            { title: "Components · Hino" },
            {
                name: "description",
                content:
                    "Every Hino control, grouped by what it does, each with a live playground.",
            },
        ],
    }),
    component: RouteComponent,
})

function RouteComponent() {
    return <ComponentsOverview />
}
