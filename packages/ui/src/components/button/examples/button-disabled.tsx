import { Toggle } from "@phe-rus/hino"
import { Button } from "@phe-rus/hino/button"
import { useState } from "react"

export function ButtonDisabled() {
    const [agreed, setAgreed] = useState(false)

    return (
        <div className="flex w-full max-w-xs flex-col gap-4">
            <Toggle
                style="checkbox"
                label="I agree to the terms"
                checked={agreed}
                onChange={setAgreed}
            />
            <Button disabled={!agreed}>Create account</Button>
        </div>
    )
}
