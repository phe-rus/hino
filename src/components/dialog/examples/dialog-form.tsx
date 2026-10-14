import { toast } from "@phe-rus/hino"
import { Button } from "@phe-rus/hino/button"
import { Dialog } from "@phe-rus/hino/dialog"
import { TextField } from "@phe-rus/hino/text-field"
import { useState } from "react"

export function DialogForm() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("Pass console")

    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                Rename project
            </Button>
            <Dialog
                open={open}
                onOpenChange={setOpen}
                title="Rename project"
                onSubmit={(event) => {
                    event.preventDefault()
                    setOpen(false)
                    toast.success(`Renamed to ${name}`)
                }}
                footer={
                    <Dialog.Actions
                        submitLabel="Rename"
                        cancelLabel="Cancel"
                        disabled={!name.trim()}
                    />
                }
            >
                <TextField
                    label="Name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />
            </Dialog>
        </>
    )
}
