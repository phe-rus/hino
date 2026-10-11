import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../../lib/class-names"
import { usePendingIndicator } from "./use-pending-indicator"
import {
    buttonSizes,
    buttonVariants,
    type ButtonSize,
    type ButtonVariant,
} from "./button-styles"

export type { ButtonSize, ButtonVariant }

/**
 * Each variant has a little depth: a fine highlight along the top edge and
 * a soft, layered shadow, like a well-made physical key.
 */
export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    isPending?: boolean
}

/** Shares native button appearance with semantic links without nesting a button. */
export function buttonStyle({
    variant = "default",
    size = "default",
    className,
}: Pick<ButtonProps, "variant" | "size" | "className"> = {}) {
    return cn(
        "group relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.005em]",
        "transition-[background-color,filter,transform,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]",
        "motion-reduce:transform-none motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        buttonSizes[size],
        buttonVariants[variant],
        className
    )
}

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(function Button(
    {
        variant = "default",
        size = "default",
        isPending = false,
        disabled,
        children,
        className,
        type = "button",
        ...props
    },
    ref
) {
    const showPendingIndicator =
        usePendingIndicator(isPending)

    return (
        <button
            ref={ref}
            type={type}
            className={buttonStyle({
                variant,
                size,
                className,
            })}
            {...props}
            disabled={disabled || isPending}
            aria-busy={isPending || props["aria-busy"]}
        >
            {children}
            {showPendingIndicator && (
                <span
                    aria-hidden="true"
                    className="absolute right-2 top-1/2 size-3 -translate-y-1/2 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
                />
            )}
        </button>
    )
})
