import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../../lib/class-names"

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "ghost"
    | "accent"
export type ButtonSize = "sm" | "md"

/**
 * Each variant has a little depth: a fine highlight along the top edge and
 * a soft, layered shadow, like a well-made physical key.
 */
const variants: Record<ButtonVariant, string> = {
    primary:
        "bg-inverse text-on-inverse shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18),0_6px_16px_-6px_rgb(0_0_0/0.35)] hover:brightness-[1.12]",
    secondary:
        "bg-elevated text-label shadow-[inset_0_0_0_1px_var(--color-separator),0_1px_2px_rgb(40_30_0/0.06)] hover:bg-fill/60",
    ghost: "bg-transparent text-label hover:bg-fill/80",
    accent: "bg-accent text-on-accent ring-1 ring-accent-text shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_2px_rgb(60_40_0/0.16),0_6px_16px_-6px_color-mix(in_srgb,var(--color-accent)_70%,transparent)] hover:brightness-[1.04]",
}

const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-subheadline rounded-full",
    md: "h-11 px-5 text-subheadline rounded-full",
}

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
}

/** Shares native button appearance with semantic links without nesting a button. */
export function buttonStyle({
    variant = "secondary",
    size = "sm",
    className,
}: Pick<ButtonProps, "variant" | "size" | "className"> = {}) {
    return cn(
        "group inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.005em]",
        "transition-[background-color,filter,transform,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]",
        "motion-reduce:transform-none motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variants[variant],
        sizes[size],
        className
    )
}

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(function Button(
    {
        variant = "secondary",
        size = "sm",
        className,
        type = "button",
        ...props
    },
    ref
) {
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
        />
    )
})
