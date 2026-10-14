import { Landing } from "@/domains/landing"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_site/")({
    component: RouteComponent,
})

function RouteComponent() {
    return <Landing />
}
