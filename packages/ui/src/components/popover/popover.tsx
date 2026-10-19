import {
    AnimatePresence,
    type HTMLMotionProps,
    motion,
    useReducedMotion,
} from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"
import { cn } from "../../lib/class-names"
import { screenEdges } from "../../lib/screen-edges"
import { popoverMotion } from "../../motion/transitions"

export type PopoverOrigin = "top-left" | "top-right"

export interface PopoverProps extends HTMLMotionProps<"div"> {
    open: boolean
    /** Which corner the popover grows from. */
    origin?: PopoverOrigin
}

interface PopoverFit {
    shift: number
    maxWidth?: number
    maxHeight?: number
}

/**
 * A glass surface that springs open from its anchor. Position it with
 * `className` (it is absolutely positioned within a relative parent); it
 * moves itself back inside the screen if that would cross an edge, and
 * keeps checking while the viewport resizes or anything scrolls.
 */
export function Popover({ open, ...props }: PopoverProps) {
    return (
        <AnimatePresence>
            {open && <OpenPopover {...props} />}
        </AnimatePresence>
    )
}

function OpenPopover({
    origin = "top-left",
    className,
    style,
    children,
    ...props
}: Omit<PopoverProps, "open">) {
    const ref = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const [fit, setFit] = useState<PopoverFit>({ shift: 0 })

    useLayoutEffect(() => {
        const refit = () => {
            const element = ref.current
            if (!element) return
            // Where it sits once open: measured without the opening scale, before paint.
            const transform = element.style.transform
            element.style.transform = "none"
            const rect = element.getBoundingClientRect()
            element.style.transform = transform
            const edges = screenEdges()
            const right = window.innerWidth - edges.right
            let shift = 0
            if (rect.right > right) shift = right - rect.right
            if (rect.left + shift < edges.left)
                shift = edges.left - rect.left
            const room =
                window.innerHeight - edges.bottom - rect.top
            setFit({
                shift,
                maxWidth:
                    window.innerWidth -
                    edges.left -
                    edges.right,
                maxHeight:
                    rect.height > room
                        ? Math.max(room, 0)
                        : undefined,
            })
        }
        refit()
        const viewport = window.visualViewport
        viewport?.addEventListener("resize", refit)
        viewport?.addEventListener("scroll", refit)
        window.addEventListener("resize", refit)
        window.addEventListener("scroll", refit, true)
        return () => {
            viewport?.removeEventListener("resize", refit)
            viewport?.removeEventListener("scroll", refit)
            window.removeEventListener("resize", refit)
            window.removeEventListener("scroll", refit, true)
        }
    }, [])

    return (
        <motion.div
            ref={ref}
            {...popoverMotion}
            initial={
                reducedMotion
                    ? { opacity: 0 }
                    : popoverMotion.initial
            }
            animate={
                reducedMotion
                    ? { opacity: 1 }
                    : popoverMotion.animate
            }
            exit={
                reducedMotion
                    ? { opacity: 0 }
                    : popoverMotion.exit
            }
            transition={
                reducedMotion
                    ? { duration: 0 }
                    : popoverMotion.transition
            }
            style={{
                transformOrigin:
                    origin === "top-left"
                        ? "0% 0%"
                        : "100% 0%",
                x: fit.shift,
                maxWidth: fit.maxWidth,
                maxHeight: fit.maxHeight,
                overflowY: fit.maxHeight ? "auto" : undefined,
                ...style,
            }}
            className={cn(
                "glass-menu absolute z-40 rounded-5xl",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}
