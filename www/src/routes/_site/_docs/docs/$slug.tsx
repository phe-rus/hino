import { ComponentNotFound } from "@/domains/catalog"
import { GuidePage, getGuide } from "@/domains/guides"
import {
    createFileRoute,
    notFound,
} from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/docs/$slug"
)({
    loader: ({ params }) => {
        if (!getGuide(params.slug)) throw notFound()
    },
    head: ({ params }) => ({
        meta: [
            {
                title: `${getGuide(params.slug)?.title ?? "Not found"} · Hino`,
            },
            {
                name: "description",
                content: getGuide(params.slug)?.summary ?? "",
            },
        ],
    }),
    notFoundComponent: ComponentNotFound,
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    // a fresh page per guide: folds and local state start over
    return <GuidePage key={slug} slug={slug} />
}
