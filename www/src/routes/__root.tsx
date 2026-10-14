import { usePreviewDocumentAttributes } from "@/domains/preview"
import { ComposeViewport } from "@phe-rus/hino-tanstack/document"
import tailwind from "@/styles/site.css?url"
import {
    PlatformProvider,
    PlatformScript,
} from "@phe-rus/hino/appearance"
import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRoute,
} from "@tanstack/react-router"

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content:
                    "width=device-width, initial-scale=1",
            },
            { title: "Hino" },
            { name: "theme-color", content: "#d16988" },
            {
                name: "description",
                content:
                    "Hino, the Pherus design system: native React controls and design tokens, live.",
            },
        ],
        links: [
            { rel: "stylesheet", href: tailwind },
            {
                rel: "preconnect",
                href: "https://fonts.googleapis.com",
            },
            {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossOrigin: "anonymous",
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&display=swap",
            },
            {
                rel: "icon",
                type: "image/svg+xml",
                href: "/favicon.svg",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "192x192",
                href: "/favicon.png",
            },
            {
                rel: "icon",
                sizes: "any",
                href: "/favicon.ico",
            },
            {
                rel: "apple-touch-icon",
                href: "/apple-touch-icon.png",
            },
        ],
    }),
    shellComponent: RouteComponent,
})

function RouteComponent() {
    const documentAttributes = usePreviewDocumentAttributes()
    return (
        <ComposeViewport {...documentAttributes}>
            <head>
                <PlatformScript />
                <HeadContent />
            </head>
            <ComposeViewport.Window after={<Scripts />}>
                <PlatformProvider>
                    <Outlet />
                </PlatformProvider>
            </ComposeViewport.Window>
        </ComposeViewport>
    )
}
