import { Button } from "@phe-rus/hino/button"
import { Popover } from "@phe-rus/hino/popover"
import { useDismiss } from "@phe-rus/hino/use-dismiss"
import { useRef, useState } from "react"

export function PopoverUsage() {
    const [open, setOpen] = useState(false)
    const anchor = useRef<HTMLDivElement>(null)
    useDismiss(anchor, open, () => setOpen(false))

    return (
        <div ref={anchor} className="relative">
            <Button
                variant="secondary"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                What's this?
            </Button>
            <Popover
                open={open}
                className="top-full left-0 mt-2 w-64 p-4"
            >
                <p className="text-callout text-label">
                    A passkey signs you in with your face,
                    fingerprint or screen lock.
                </p>
            </Popover>
        </div>
    )
}
