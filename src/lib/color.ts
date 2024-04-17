import type { Color } from "$lib/stores/stateStore"

function createColor(name: string, bg: string, border: string) {
    return {name: name, bg: bg, border: border}
}

export let colors = [
    createColor("red", "#ef4444", "#991b1b"),
    createColor("orange","#f97316", "#9a3412"),
    createColor("yellow", "#fbbf24", "#b45309"),
    createColor("lime", "#84cc16", "#3f6212"),
    createColor("green", "#22c55e", "#166534"),
    createColor("teal", "#2dd4bf", "#0f766e"),
    createColor("brown", "#713f12", "#451a03"),
    createColor("blue", "#3b82f6", "#1e40af"),
    createColor("purple", "#a855f7", "#6b21a8"),
    createColor("pink", "#ec4899", "#9d174d"),
/*
    createColor("red","mainRed","borderRed"),
    createColor("","","borderOrange"),
    createColor("","","borderYellow"),
    createColor("","","borderLime"),
    createColor("","","borderGreen"),
    createColor("","","borderTeal"),
    createColor("","","borderBrown"),
    createColor("","","borderBlue"),
    createColor("","","borderPurple"),
    createColor("","","borderPink"),
*/
]
