import type { ReactNode } from "react"

type DocSectionProps = {
    id: string
    title: string
    description?: string
    /** Example headings sit one step below the page's sections. */
    level?: 2 | 3
    children: ReactNode
}

/** A titled part of a component page, reachable from On this page. */
export function DocSection({
    id,
    title,
    description,
    level = 2,
    children,
}: DocSectionProps) {
    const Heading = level === 2 ? "h2" : "h3"
    return (
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className="flex scroll-mt-24 flex-col gap-4"
        >
            <div className="flex flex-col gap-1.5">
                <Heading
                    id={`${id}-title`}
                    className={
                        level === 2
                            ? "font-brand text-title2 font-extrabold tracking-tight text-label"
                            : "text-title3 font-semibold tracking-tight text-label"
                    }
                >
                    <a
                        href={`#${id}`}
                        className="text-inherit no-underline hover:underline"
                    >
                        {title}
                    </a>
                </Heading>
                {description && (
                    <p className="max-w-2xl text-callout text-label-secondary">
                        {description}
                    </p>
                )}
            </div>
            {children}
        </section>
    )
}
