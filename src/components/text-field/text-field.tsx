import {
    type ComponentProps,
    type ReactNode,
    useId,
    useState,
} from "react"
import { Button } from "../button/button"
import { cn } from "../../lib/class-names"

export const textControlClasses = cn(
    "w-full min-w-0 rounded-xl border border-separator bg-elevated",
    "px-3 py-2 text-body text-label placeholder:text-label-tertiary",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
    "disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-danger"
)

export type TextFieldProps = ComponentProps<"input"> & {
    label: string
    description?: ReactNode
    errors?: string[]
    icon?: ReactNode
    action?: ReactNode
    revealLabels?: { show: string; hide: string }
}

export function TextField({
    label,
    description,
    errors = [],
    icon,
    action,
    revealLabels,
    type = "text",
    id: suppliedId,
    className,
    ...props
}: TextFieldProps) {
    const generatedId = useId()
    const id = suppliedId ?? generatedId
    const [revealed, setRevealed] = useState(false)
    const messages = Array.from(new Set(errors))
    const reveal = type === "password" && revealLabels
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="text-subheadline font-semibold"
            >
                {label}
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-separator bg-elevated px-3 focus-within:outline-2 focus-within:outline-accent-text">
                {icon}
                <input
                    {...props}
                    id={id}
                    type={reveal && revealed ? "text" : type}
                    aria-invalid={messages.length > 0}
                    aria-describedby={
                        messages.length || description
                            ? `${id}-description`
                            : undefined
                    }
                    className={cn(
                        "h-11 w-full min-w-0 bg-transparent text-body text-label outline-none",
                        "placeholder:text-label-tertiary disabled:opacity-40",
                        className
                    )}
                />
                {reveal && (
                    <Button
                        variant="ghost"
                        className="shrink-0 whitespace-nowrap"
                        aria-controls={id}
                        aria-label={
                            revealed
                                ? revealLabels.hide
                                : revealLabels.show
                        }
                        aria-pressed={revealed}
                        onClick={() => setRevealed(!revealed)}
                    >
                        {revealed
                            ? revealLabels.hide
                            : revealLabels.show}
                    </Button>
                )}
                {action}
            </div>
            {(messages.length > 0 || description) && (
                <div
                    id={`${id}-description`}
                    role={
                        messages.length ? "alert" : undefined
                    }
                    className={cn(
                        "text-footnote",
                        messages.length
                            ? "text-danger"
                            : "text-label-secondary"
                    )}
                >
                    {messages.length
                        ? messages.join(". ")
                        : description}
                </div>
            )}
        </div>
    )
}
