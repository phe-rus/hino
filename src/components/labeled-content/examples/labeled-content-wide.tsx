import {
    LabeledContent,
    Section,
    SegmentedControl,
} from "@phe-rus/hino"
import { TextField } from "@phe-rus/hino/text-field"
import { useState } from "react"

export function LabeledContentWide() {
    const [theme, setTheme] = useState("system")
    const [nickname, setNickname] = useState("Aiko")

    return (
        <div className="w-full max-w-md">
            <Section title="Profile">
                <LabeledContent label="Appearance" wide>
                    <SegmentedControl
                        label="Appearance"
                        value={theme}
                        onChange={setTheme}
                        options={[
                            {
                                value: "system",
                                label: "System",
                            },
                            {
                                value: "light",
                                label: "Light",
                            },
                            { value: "dark", label: "Dark" },
                        ]}
                    />
                </LabeledContent>
                <LabeledContent label="Nickname" stacked>
                    <TextField
                        label="Nickname"
                        value={nickname}
                        onChange={(event) =>
                            setNickname(event.target.value)
                        }
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
