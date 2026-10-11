import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../../lib/class-names"
import { usePendingIndicator } from "./use-pending-indicator"
import {
    buttonVariants,
    iconButtonSizes,
    type ButtonVariant,
    type IconButtonSize,
} from "./button-styles"

export type { IconButtonSize }

export interface IconButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Required: icon-only buttons need an accessible name. */
    label: string
    variant?: ButtonVariant
    size?: IconButtonSize
    isPending?: boolean
}

export const IconButton = forwardRef<
    HTMLButtonElement,
    IconButtonProps
>(function IconButton(
    {
        label,
        variant = "default",
        size = "icon",
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
            aria-label={label}
            data-tooltip={label}
            className={cn(
                "relative",
                "group inline-flex shrink-0 items-center justify-center rounded-full transition-[background-color,filter,transform,box-shadow] duration-fast ease-standard active:scale-[0.92] disabled:pointer-events-none disabled:opacity-40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                iconButtonSizes[size],
                buttonVariants[variant],
                className
            )}
            {...props}
            disabled={disabled || isPending}
            aria-busy={isPending || props["aria-busy"]}
        >
            {showPendingIndicator && (
                <span
                    aria-hidden="true"
                    className="absolute inset-0 m-auto size-3 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
                />
            )}
            {children}
        </button>
    )
})
