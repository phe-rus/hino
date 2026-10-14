const origin = "https://hino.pherus.org"

export function getPageHead(
    path: string,
    title: string,
    description: string
) {
    const url = `${origin}${path.split(/[?#]/)[0]}`
    const image = `${origin}/favicon.png`
    return {
        meta: [
            { title },
            { name: "description", content: description },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "Hino" },
            { property: "og:title", content: title },
            {
                property: "og:description",
                content: description,
            },
            { property: "og:url", content: url },
            { property: "og:image", content: image },
            {
                property: "og:image:alt",
                content: "Hino logo",
            },
            { name: "twitter:card", content: "summary" },
            { name: "twitter:title", content: title },
            {
                name: "twitter:description",
                content: description,
            },
            { name: "twitter:image", content: image },
            {
                name: "twitter:image:alt",
                content: "Hino logo",
            },
        ],
        links: [{ rel: "canonical", href: url }],
    }
}
