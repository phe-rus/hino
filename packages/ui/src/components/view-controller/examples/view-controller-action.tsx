import { Button } from "@phe-rus/hino/button"
import { ViewController } from "@phe-rus/hino/view-controller"

export function ViewControllerAction() {
    return (
        <ViewController
            className="py-6"
            heading={
                <ViewController.Heading
                    title="Applications"
                    description="Apps that sign people in with Pass."
                    action={
                        <Button
                            variant="accent"
                            size="sm"
                            className="ms-auto"
                        >
                            New application
                        </Button>
                    }
                />
            }
        >
            <div className="h-24 rounded-3xl bg-fill/60" />
        </ViewController>
    )
}
