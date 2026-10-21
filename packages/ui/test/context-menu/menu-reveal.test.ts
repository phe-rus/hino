import { expect, test } from "vite-plus/test"
import { menuReveal } from "../../src/components/context-menu/menu-reveal"

test("a menu flipped above the bottom action starts at that action's rectangle", () => {
    const reveal = menuReveal(
        { left: 280, top: 620, width: 32, height: 32 },
        { left: 120, top: 300, width: 200, height: 300 }
    )
    expect(reveal.x).toBe(76)
    expect(reveal.y).toBe(186)
    expect(200 * reveal.scaleX).toBe(32)
    expect(300 * reveal.scaleY).toBeCloseTo(32)
    expect(reveal.opacity).toBe(1)
})

test("point menus and detached empty anchors do not produce invalid transforms", () => {
    const target = {
        left: 10,
        top: 10,
        width: 200,
        height: 300,
    }
    expect(menuReveal(undefined, target).opacity).toBe(0)
    expect(
        menuReveal(
            { left: 0, top: 0, width: 0, height: 0 },
            target
        ).scaleX
    ).toBe(0.96)
})
