import { toast } from "@phe-rus/hino"
import { Button } from "@phe-rus/hino/button"

export function ButtonUsage() {
    return (
        <Button
            onClick={() => toast.success("Changes saved")}
        >
            Save changes
        </Button>
    )
}
