import {
    ComponentNotFound,
    ComponentPage,
    getEntry,
} from "@/domains/catalog"
import { componentSearchSchema } from "@/domains/settings"
import {
    createFileRoute,
    notFound,
    stripSearchParams,
} from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/components/$slug"
)({
    validateSearch: componentSearchSchema,
    search: {
        middlewares: [stripSearchParams({ props: {} })],
    },
    loader: ({ params }) => {
        if (!getEntry(params.slug)) throw notFound()
    },
    head: ({ params }) => ({
        meta: [
            {
                title: `${getEntry(params.slug)?.docs.name ?? "Not found"} · Hino`,
            },
            {
                name: "description",
                content:
                    getEntry(params.slug)?.content.summary ??
                    "",
            },
        ],
    }),
    notFoundComponent: ComponentNotFound,
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    const { props, ...settings } = Route.useSearch()
    return (
        // a fresh page per component: folds and local state start over
        <ComponentPage
            key={slug}
            slug={slug}
            settings={settings}
            rawProps={props}
        />
    )
}
