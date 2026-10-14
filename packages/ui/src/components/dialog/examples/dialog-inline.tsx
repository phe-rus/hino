import { Button } from "@phe-rus/hino/button"
import { Dialog } from "@phe-rus/hino/dialog"
import { TextField } from "@phe-rus/hino/text-field"
import { useState } from "react"

export function DialogInline() {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")

    return (
        <div className="flex w-full max-w-sm flex-col gap-2 rounded-4xl bg-elevated p-2 ring-1 ring-separator/60">
            <Button
                variant="ghost"
                className="self-start"
                onClick={() => setOpen(!open)}
            >
                {open ? "Cancel" : "Add a recovery email"}
            </Button>
            <Dialog
                open={open}
                onOpenChange={setOpen}
                presentation="inline"
                title="Recovery email"
                description="We only use it if you lose access."
                onSubmit={(event) => {
                    event.preventDefault()
                    setOpen(false)
                }}
                footer={
                    <Dialog.Actions
                        submitLabel="Add"
                        cancelLabel="Cancel"
                        disabled={!email}
                    />
                }
            >
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                />
            </Dialog>
        </div>
    )
}
