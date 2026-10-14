import { Button } from "@phe-rus/hino/button"
import { toast } from "@phe-rus/hino/toast"

export function ToastUsage() {
    // render one <Toaster /> near the root of your app
    return (
        <Button
            onClick={() => toast.success("Changes saved")}
        >
            Save
        </Button>
    )
}
