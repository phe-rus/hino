import { buttonStyle } from "@phe-rus/hino/button"

export function ButtonLink() {
    return (
        <a
            href="#guide"
            className={buttonStyle({ variant: "secondary" })}
        >
            Read the guide
        </a>
    )
}
