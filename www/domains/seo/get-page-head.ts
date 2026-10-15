import { pageUrl, siteOrigin } from "./site"

export function getPageHead(
    path: string,
    title: string,
    description: string
) {
    const url = pageUrl(path)
    const image = `${siteOrigin}/favicon.png`
    const pathname = new URL(url).pathname
    const section = pathname.startsWith("/components/")
        ? { name: "Components", path: "/components" }
        : null
    const crumbs = [
        { name: "Hino", path: "/" },
        ...(section && section.path !== pathname
            ? [section]
            : []),
        ...(pathname !== "/"
            ? [
                  {
                      name: title.replace(/ · Hino$/, ""),
                      path: pathname,
                  },
              ]
            : []),
    ]
    return {
        meta: [
            { title },
            { name: "description", content: description },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "Hino" },
            { property: "og:locale", content: "en_US" },
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
        scripts: [
            {
                type: "application/ld+json",
                children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "WebSite",
                            "@id": `${siteOrigin}/#website`,
                            name: "Hino",
                            url: `${siteOrigin}/`,
                            inLanguage: "en",
                        },
                        {
                            "@type": "WebPage",
                            "@id": url,
                            url,
                            name: title,
                            description,
                            inLanguage: "en",
                            isPartOf: {
                                "@id": `${siteOrigin}/#website`,
                            },
                        },
                        {
                            "@type": "BreadcrumbList",
                            itemListElement: crumbs.map(
                                (crumb, index) => ({
                                    "@type": "ListItem",
                                    position: index + 1,
                                    name: crumb.name,
                                    item: pageUrl(crumb.path),
                                })
                            ),
                        },
                        ...(pathname === "/"
                            ? [
                                  {
                                      "@type":
                                          "SoftwareSourceCode",
                                      name: "Hino",
                                      description,
                                      url,
                                      codeRepository:
                                          "https://github.com/phe-rus/hino",
                                      programmingLanguage:
                                          "TypeScript",
                                      license:
                                          "https://github.com/phe-rus/hino/blob/main/LICENSE",
                                  },
                              ]
                            : []),
                    ],
                }).replace(/</g, "\\u003c"),
            },
        ],
    }
}
