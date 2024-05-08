import { UserColor } from "./types"

function createColor(name: string, bg: string, border: string) {
    return { name, bg, border };
}

export const colors = [
    createColor("red", "#ef4444", "#991b1b"),
    createColor("orange", "#f97316", "#9a3412"),
    createColor("yellow", "#fbbf24", "#b45309"),
    createColor("lime", "#84cc16", "#3f6212"),
    createColor("green", "#15803d", "#14532d"),
    createColor("teal", "#2dd4bf", "#0f766e"),
    createColor("brown", "#713f12", "#451a03"),
    createColor("blue", "#3b82f6", "#1e40af"),
    createColor("purple", "#a855f7", "#6b21a8"),
    createColor("pink", "#ec4899", "#9d174d"),
];

// Function that, given a UserColor, returns the corresponding primary and secondary hex color codes
export function colorToHex(userColor: UserColor) {
    switch (userColor) {
        case UserColor.red:
            return { primary: colors[0].border, secondary: colors[0].bg };
        case UserColor.orange:
            return { primary: colors[1].border, secondary: colors[1].bg };
        case UserColor.yellow:
            return { primary: colors[2].border, secondary: colors[2].bg };
        case UserColor.lime:
            return { primary: colors[3].border, secondary: colors[3].bg };
        case UserColor.green:
            return { primary: colors[4].border, secondary: colors[4].bg };
        case UserColor.teal:
            return { primary: colors[5].border, secondary: colors[5].bg };
        case UserColor.brown:
            return { primary: colors[6].border, secondary: colors[6].bg };
        case UserColor.blue:
            return { primary: colors[7].border, secondary: colors[7].bg };
        case UserColor.purple:
            return { primary: colors[8].border, secondary: colors[8].bg };
        case UserColor.pink:
            return { primary: colors[9].border, secondary: colors[9].bg };
        default:
            return { primary: "unknown", secondary: "unknown" };
    }
}

// Function that does the opposite of the "colorToHex" function
export function hexToColor(hex: string): UserColor {
    switch (hex) {
        case "#ef4444" || "#991b1b":
            return UserColor.red;
        case "#f97316" || "#9a3412":
            return UserColor.orange;
        case "#fbbf24" || "#b45309":
            return UserColor.yellow;
        case "#84cc16" || "#3f6212":
            return UserColor.lime;
        case "#15803d" || "#14532d":
            return UserColor.green;
        case "#2dd4bf" || "#0f766e":
            return UserColor.teal;
        case "#713f12" || "#451a03":
            return UserColor.brown;
        case "#3b82f6" || "#1e40af":
            return UserColor.blue;
        case "#a855f7" || "#6b21a8":
            return UserColor.purple;
        case "#ec4899" || "#9d174d":
            return UserColor.pink;
        default: 
            return UserColor.red;
    }
}
