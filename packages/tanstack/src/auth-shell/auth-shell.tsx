import { Outlet, useLocation } from "@tanstack/react-router"
import type { ReactNode } from "react"

/**
 * The frame for every page reached before or outside an app (sign in, create
 * account, recovery, consent): no card, a soft light behind the page, the
 * brand on top, content sliding in as you move through the flow. CSS
 * animations only, so the page is never hidden waiting on JavaScript.
 */
export function AuthShell({ brand }: { brand: ReactNode }) {
    const { pathname } = useLocation()

    return (
        <section className="relative isolate flex min-h-dvh flex-col items-center justify-center px-4 py-12">
            <div className="flex w-full max-w-[26rem] flex-col items-start gap-6">
                {brand}
                <div
                    key={pathname}
                    className="w-full motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-4 motion-safe:duration-500 motion-safe:ease-out"
                >
                    <Outlet />
                </div>
            </div>
        </section>
    )
}
