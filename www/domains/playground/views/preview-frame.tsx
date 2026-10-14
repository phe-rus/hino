import { useRouter } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import type { RegisteredDocs } from "@phe-rus/hino/docs"
import {
    getChangedProps,
    type PropValues,
} from "@/domains/catalog"
import {
    type ParentMessage,
    type StateMessage,
    frameMessageSchema,
} from "@/domains/preview"
import type { PreviewSettings } from "@/domains/settings"

type PreviewFrameProps = {
    docs: RegisteredDocs
    settings: PreviewSettings
    props: PropValues
}

const minimumHeight = 160

/** Asks the preview to say it is listening (answered with hino:ready). */
function ping(frame: HTMLIFrameElement | null) {
    const message: ParentMessage = { type: "hino:ping" }
    frame?.contentWindow?.postMessage(
        message,
        window.location.origin
    )
}

/**
 * Hosts the iframe preview. Its address is fixed when it mounts (keyed by
 * slug by the caller), so later changes travel as messages and the frame
 * never reloads (contract item 14).
 */
export function PreviewFrame({
    docs,
    settings,
    props,
}: PreviewFrameProps) {
    const router = useRouter()
    const frame = useRef<HTMLIFrameElement>(null)
    const [ready, setReady] = useState(false)
    // overlay components ask for room to open into
    const leastHeight = docs.previewHeight ?? minimumHeight
    const [height, setHeight] = useState(leastHeight)
    const [src] = useState(
        () =>
            router.buildLocation({
                to: "/preview/$slug",
                params: { slug: docs.slug },
                search: {
                    ...settings,
                    props: getChangedProps(docs, props),
                },
            }).href
    )

    useEffect(() => {
        function onMessage(event: MessageEvent) {
            if (event.origin !== window.location.origin)
                return
            if (event.source !== frame.current?.contentWindow)
                return
            const parsed = frameMessageSchema.safeParse(
                event.data
            )
            if (!parsed.success) return
            if (parsed.data.type === "hino:ready")
                setReady(true)
            else
                setHeight(
                    Math.max(leastHeight, parsed.data.height)
                )
        }
        window.addEventListener("message", onMessage)
        // the preview may have said hello before we listened: ask again
        ping(frame.current)
        return () =>
            window.removeEventListener("message", onMessage)
    }, [leastHeight])

    useEffect(() => {
        if (!ready) return
        const message: StateMessage = {
            type: "hino:state",
            settings,
            props,
        }
        frame.current?.contentWindow?.postMessage(
            message,
            window.location.origin
        )
    }, [ready, settings, props])

    return (
        <iframe
            ref={frame}
            src={src}
            title="Component preview"
            onLoad={() => ping(frame.current)}
            style={{ height }}
            className="block w-full border-0 bg-transparent transition-[height] duration-300"
        />
    )
}
