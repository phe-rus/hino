import { toast } from "@phe-rus/hino"
import { Button } from "@phe-rus/hino/button"
import { TextField } from "@phe-rus/hino/text-field"
import { ViewController } from "@phe-rus/hino/view-controller"
import { useState } from "react"

export function ViewControllerShowcase() {
    const [email, setEmail] = useState("")

    return (
        <div className="w-full max-w-sm rounded-4xl bg-elevated px-6 shadow-sm ring-1 ring-separator/60">
            <ViewController
                className="gap-6 py-8"
                heading={
                    <ViewController.Heading
                        size="compact"
                        title="Sign in"
                        description="Use your Pass account."
                    />
                }
            >
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(event) => {
                        event.preventDefault()
                        toast.success("Check your email")
                    }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />
                    <Button type="submit" variant="accent">
                        Continue
                    </Button>
                </form>
            </ViewController>
        </div>
    )
}
