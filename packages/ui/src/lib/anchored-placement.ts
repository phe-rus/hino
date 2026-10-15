import { screenEdges } from "./screen-edges"

export interface AnchoredPlacement {
    left: number
    width: number
    top?: number
    bottom?: number
    /** Opens upward, so motion should grow from the bottom edge. */
    above: boolean
}

/**
 * Places a panel of `width` under its anchor, or above it when there's
 * less than `needed` height below and more room above, kept inside the
 * screen's safe edges.
 */
export function placeAnchored(
    anchor: HTMLElement,
    width: number,
    needed: number,
    gap = 6
): AnchoredPlacement {
    const rect = anchor.getBoundingClientRect()
    const viewport = window.visualViewport
    const height = viewport?.height ?? window.innerHeight
    const screenWidth = viewport?.width ?? window.innerWidth
    const edges = screenEdges()
    const fitted = Math.min(
        width,
        screenWidth - edges.left - edges.right
    )
    const left = Math.min(
        Math.max(edges.left, rect.left),
        screenWidth - fitted - edges.right
    )
    const below = height - rect.bottom - gap - edges.bottom
    const above =
        below < needed && rect.top - gap - edges.top > below
    return above
        ? {
              left,
              width: fitted,
              bottom: height - rect.top + gap,
              above,
          }
        : {
              left,
              width: fitted,
              top: rect.bottom + gap,
              above,
          }
}
