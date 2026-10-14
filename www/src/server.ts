import handler from "@tanstack/react-start/server-entry"

// The docs site holds no data: every request is a page render.
export default {
    async fetch(request: Request) {
        return handler.fetch(request)
    },
}
