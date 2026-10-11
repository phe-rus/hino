import { Sheet } from "@hino/ui/sheet"
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react"
import { createPortal } from "react-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { Button } from "@hino/ui/button"
import { cn } from "@hino/ui/cn"
import {
    createContext,
    useContext,
    useId,
    type FormEvent,
    type ReactNode,
} from "react"

const CloseContext = createContext<() => void>(() => {})
type DialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: ReactNode
    description?: ReactNode
    children?: ReactNode
    footer?: ReactNode
    swipeDirection?: "left" | "right" | "up" | "down"
    presentation?: "drawer" | "center" | "inline"
    className?: string
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}
type ActionsProps = {
    submitLabel: ReactNode
    cancelLabel: ReactNode
    pending?: boolean
    disabled?: boolean
    tone?: "default" | "destructive"
    onConfirm?: () => void
}

export function Dialog({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    presentation = "drawer",
    className,
    onSubmit,
}: DialogProps) {
    const titleId = useId()
    const reducedMotion = useReducedMotion()
    const close = () => onOpenChange(false)
    const content = (
        <>
            {presentation !== "inline" && (
                <h2
                    id={titleId}
                    className="text-title-3 font-semibold"
                >
                    {title}
                </h2>
            )}
            {description && (
                <p className="text-footnote text-label-secondary">
                    {description}
                </p>
            )}
            {children && (
                <div className="flex flex-col gap-4">
                    {children}
                </div>
            )}
            {footer && (
                <div className="flex flex-wrap justify-end gap-2 pt-3">
                    {footer}
                </div>
            )}
        </>
    )
    const body = (
        <CloseContext value={close}>
            {onSubmit ? (
                <form
                    onSubmit={onSubmit}
                    className={cn(
                        "flex min-h-0 flex-col gap-4 overflow-y-auto p-5",
                        className
                    )}
                >
                    {content}
                </form>
            ) : (
                <div
                    className={cn(
                        "flex min-h-0 flex-col gap-4 overflow-y-auto p-5",
                        className
                    )}
                >
                    {content}
                </div>
            )}
        </CloseContext>
    )
    if (presentation === "inline")
        return (
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key={titleId}
                        initial={{
                            height: reducedMotion
                                ? "auto"
                                : 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
                        exit={{
                            height: reducedMotion
                                ? "auto"
                                : 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: reducedMotion
                                ? 0
                                : 0.28,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                    >
                        {body}
                    </motion.div>
                )}
            </AnimatePresence>
        )
    if (typeof document === "undefined") return null
    return createPortal(
        <Sheet
            open={open}
            onClose={close}
            label=""
            labelledBy={titleId}
        >
            {body}
        </Sheet>,
        document.body
    )
}

/** The standard footer: a primary action and a cancel that closes the dialog. */
function Actions({
    submitLabel,
    cancelLabel,
    pending = false,
    disabled = false,
    tone = "default",
    onConfirm,
}: ActionsProps) {
    const close = useContext(CloseContext)
    return (
        <>
            <Button
                type={onConfirm ? "button" : "submit"}
                variant={
                    tone === "destructive"
                        ? "ghost"
                        : "primary"
                }
                className={
                    tone === "destructive"
                        ? "bg-danger/10 text-danger"
                        : undefined
                }
                disabled={pending || disabled}
                onClick={onConfirm}
            >
                {pending && (
                    <HugeiconsIcon
                        icon={Loading03Icon}
                        className="animate-spin"
                    />
                )}
                {submitLabel}
            </Button>
            <Button
                type="button"
                variant="secondary"
                onClick={close}
            >
                {cancelLabel}
            </Button>
        </>
    )
}

Dialog.Actions = Actions
