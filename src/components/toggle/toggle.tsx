import { motion } from "motion/react"
import { useEffect, useRef } from "react"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
import { spring } from "../../motion/transitions"

export function Toggle({
    checked,
    onChange,
    label,
    disabled,
    style = "switch",
    mixed = false,
    labelHidden = false,
}: {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    /** Shown but not yet usable, as iOS dims a switch it can't change. */
    disabled?: boolean
    style?: "switch" | "checkbox"
    mixed?: boolean
    labelHidden?: boolean
}) {
    const input = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (input.current) input.current.indeterminate = mixed
    }, [mixed])
    if (style === "checkbox") {
        return (
            <label className="flex cursor-pointer items-center gap-3 text-subheadline">
                <input
                    ref={input}
                    type="checkbox"
                    aria-checked={mixed ? "mixed" : checked}
                    checked={checked}
                    disabled={disabled}
                    onChange={(event) =>
                        onChange(event.target.checked)
                    }
                    className={cn(
                        "size-5 accent-accent",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text disabled:opacity-40"
                    )}
                />
                <span
                    className={
                        labelHidden ? "sr-only" : undefined
                    }
                >
                    {label}
                </span>
            </label>
        )
    }
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={() => {
                haptic("selection")
                onChange(!checked)
            }}
            className={cn(
                "group/switch flex h-[30px] w-[50px] shrink-0 items-center rounded-full p-[2px] transition-colors duration-normal",
                "shadow-[inset_0_1px_2px_rgb(0_0_0/0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-45",
                checked
                    ? "justify-end bg-accent ring-1 ring-accent-text"
                    : "justify-start bg-separator/80"
            )}
        >
            {/* The thumb stretches while pressed, as on iOS. */}
            <motion.span
                layout
                transition={spring.snappy}
                className="h-[26px] w-[26px] rounded-full bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.04),0_2px_4px_rgb(0_0_0/0.16),0_3px_8px_rgb(0_0_0/0.10)] transition-[width] duration-fast group-active/switch:w-[32px]"
            />
        </button>
    )
}
