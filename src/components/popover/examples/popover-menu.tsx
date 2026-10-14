import { Button } from "@phe-rus/hino/button"
import { Popover } from "@phe-rus/hino/popover"
import { useDismiss } from "@phe-rus/hino/use-dismiss"
import { toast } from "@phe-rus/hino"
import { useRef, useState } from "react"

const actions = [
    "Duplicate",
    "Move to folder",
    "Export as PDF",
]

export function PopoverMenu() {
    const [open, setOpen] = useState(false)
    const anchor = useRef<HTMLDivElement>(null)
    useDismiss(anchor, open, () => setOpen(false))

    return (
        <div ref={anchor} className="relative">
            <Button
                variant="secondary"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                More
            </Button>
            <Popover
                open={open}
                origin="top-right"
                role="menu"
                className="top-full right-0 mt-2 flex w-56 flex-col p-1.5"
            >
                {actions.map((action) => (
                    <button
                        key={action}
                        type="button"
                        role="menuitem"
                        className="rounded-3xl px-3 py-2 text-start text-subheadline text-label hover:bg-fill"
                        onClick={() => {
                            setOpen(false)
                            toast(action)
                        }}
                    >
                        {action}
                    </button>
                ))}
            </Popover>
        </div>
    )
}
