import { cn } from "@phe-rus/hino/cn"

type HinoMarkProps = {
    className?: string
    /** Lets the sun rise into place once, on first paint. */
    animated?: boolean
}

/**
 * The Hino mark: the sun, 日 ("hi"), in Blush. The brand colour stays
 * fixed whatever accent the page wears; dark mode uses the soft Blush.
 */
export function HinoMark({
    className,
    animated,
}: HinoMarkProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className={cn("size-7 shrink-0", className)}
        >
            <circle
                cx="16"
                cy="16"
                r="15"
                className={cn(
                    "fill-[#d16988] [@media(prefers-color-scheme:dark)]:fill-[#e8b4bb]",
                    animated &&
                        "animate-[sunrise_1.4s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
                )}
            />
        </svg>
    )
}
