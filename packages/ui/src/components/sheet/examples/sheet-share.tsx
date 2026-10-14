import { toast } from "@phe-rus/hino"
import { Button } from "@phe-rus/hino/button"
import { Sheet } from "@phe-rus/hino/sheet"
import { Toggle } from "@phe-rus/hino/toggle"
import { useState } from "react"

export function SheetShare() {
    const [open, setOpen] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Share
            </Button>
            <Sheet
                open={open}
                onClose={() => setOpen(false)}
                label="Share note"
            >
                <div className="flex flex-col gap-5 p-6">
                    <h2 className="text-title3 font-semibold text-label">
                        Share note
                    </h2>
                    <Toggle
                        label="People with the link can edit"
                        checked={canEdit}
                        onChange={setCanEdit}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="accent"
                            onClick={() => {
                                setOpen(false)
                                toast.success("Link copied")
                            }}
                        >
                            Copy link
                        </Button>
                    </div>
                </div>
            </Sheet>
        </>
    )
}
