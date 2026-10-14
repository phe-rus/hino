import { Toggle } from "@phe-rus/hino/toggle"
import { useState } from "react"

export function ToggleUsage() {
    const [enabled, setEnabled] = useState(true)
    return (
        <Toggle
            label="Wi-Fi"
            checked={enabled}
            onChange={setEnabled}
        />
    )
}
