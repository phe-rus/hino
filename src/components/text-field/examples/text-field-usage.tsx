import { TextField } from "@phe-rus/hino/text-field"
import { useState } from "react"

export function TextFieldUsage() {
    const [name, setName] = useState("")
    return (
        <div className="w-full max-w-xs">
            <TextField
                label="Name"
                placeholder="Aiko Kamado"
                value={name}
                onChange={(event) =>
                    setName(event.target.value)
                }
            />
        </div>
    )
}
