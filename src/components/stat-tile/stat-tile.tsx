import type { ReactNode } from "react"
import { cn } from "../../lib/class-names"

type StatTileProps = {
    label: string
    value: number
    /** A quiet line under the number, like "3 signed in now". */
    caption?: ReactNode
    /** Turns the number red once it's above zero. */
    tone?: "critical"
    /** Makes the tile a toggle, e.g. a filter. */
    onClick?: () => void
    active?: boolean
}

/** One number with its label, optionally a toggle. */
export function StatTile({
    label,
    value,
    caption,
    tone,
    onClick,
    active = false,
}: StatTileProps) {
    const body = (
        <>
            <span className="text-xs text-muted-foreground">
                {label}
            </span>
            <span
                className={cn(
                    "text-lg font-semibold tabular-nums tracking-tight",
                    tone === "critical" &&
                        value > 0 &&
                        "text-destructive"
                )}
            >
                {value.toLocaleString("en-US")}
            </span>
            {caption && (
                <span className="text-xs text-muted-foreground">
                    {caption}
                </span>
            )}
        </>
    )
    const className =
        "flex min-w-0 flex-col gap-1 rounded-2xl border border-border/35 bg-card p-4 text-left shadow-xs"

    if (!onClick)
        return <div className={className}>{body}</div>
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onClick}
            className={cn(
                className,
                "ring-1 ring-transparent transition-colors hover:bg-muted/60",
                active && "bg-muted/70 ring-foreground/15"
            )}
        >
            {body}
        </button>
    )
}
