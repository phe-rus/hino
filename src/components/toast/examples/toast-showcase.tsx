import { LabeledContent, Section } from "@phe-rus/hino"
import { toast } from "@phe-rus/hino/toast"
import { Toggle } from "@phe-rus/hino/toggle"
import { useState } from "react"

export function ToastShowcase() {
    const [backups, setBackups] = useState(true)
    const [alerts, setAlerts] = useState(false)

    return (
        <div className="w-full max-w-sm">
            <Section
                title="Account"
                footer="Each change saves at once and confirms with a toast."
            >
                <LabeledContent label="Daily backups">
                    <Toggle
                        label="Daily backups"
                        labelHidden
                        checked={backups}
                        onChange={(checked) => {
                            setBackups(checked)
                            toast.success(
                                checked
                                    ? "Backups turned on"
                                    : "Backups turned off"
                            )
                        }}
                    />
                </LabeledContent>
                <LabeledContent label="Sign-in alerts">
                    <Toggle
                        label="Sign-in alerts"
                        labelHidden
                        checked={alerts}
                        onChange={(checked) => {
                            setAlerts(checked)
                            toast(
                                checked
                                    ? "We'll email you about new sign-ins"
                                    : "Sign-in alerts turned off"
                            )
                        }}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
