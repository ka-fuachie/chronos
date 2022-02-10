export var Palette;
(function (Palette) {
    Palette[Palette["MONOCHROMATIC"] = 0] = "MONOCHROMATIC";
    Palette[Palette["ANALOGOUS"] = 1] = "ANALOGOUS";
    Palette[Palette["COMPLEMENTRY"] = 2] = "COMPLEMENTRY";
    Palette[Palette["TRIAD"] = 3] = "TRIAD";
})(Palette || (Palette = {}));
export function randomWithinRange(a, b) {
    if (b === null || b === undefined)
        return Math.round(Math.random() * a);
    else
        return Math.round(Math.random() * Math.abs(b - a) + Math.min(a, b));
}
export function getRandomHue() {
    return Math.random() * 360;
}
export function generateRandomColors(hue, option) {
    if (option === null || option === undefined)
        option = randomWithinRange(3);
    if (option === Palette.MONOCHROMATIC)
        return [
            `hsl(${hue}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(100, 80)}%)`,
            `hsl(${hue}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(75, 50)}%)`,
            `hsl(${hue}, ${randomWithinRange(100, 30)}%, ${randomWithinRange(20, 30)}%)`,
            `hsl(${hue}, ${randomWithinRange(75, 25)}%, ${randomWithinRange(20)}%)`
        ];
    if (option === Palette.COMPLEMENTRY)
        return [
            `hsl(${hue}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(100, 50)}%)`,
            `hsl(${(hue + 180) % 360}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(75, 50)}%)`,
            `hsl(${hue}, ${randomWithinRange(100, 30)}%, ${randomWithinRange(20, 30)}%)`,
            `hsl(${(hue + 180) % 360}, ${randomWithinRange(75, 25)}%, ${randomWithinRange(20, 50)}%)`
        ];
    if (option === Palette.TRIAD)
        return [
            `hsl(${hue}, ${randomWithinRange(100, 75)}%, ${randomWithinRange(100, 50)}%)`,
            `hsl(${(hue + 120) % 360}, ${randomWithinRange(100, 75)}%, ${randomWithinRange(75, 50)}%)`,
            `hsl(${(hue + 240) % 360}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(20, 30)}%)`,
            `hsl(${hue}, ${randomWithinRange(75, 45)}%, ${randomWithinRange(20, 50)}%)`
        ];
    if (option === Palette.ANALOGOUS)
        return [
            `hsl(${hue}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(100, 80)}%)`,
            `hsl(${(hue + 30) % 360}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(75, 50)}%)`,
            `hsl(${(hue + 60) % 360}, ${randomWithinRange(100, 30)}%, ${randomWithinRange(20, 30)}%)`,
            `hsl(${(hue + 90) % 360}, ${randomWithinRange(75, 25)}%, ${randomWithinRange(30)}%)`
        ];
    return [];
}
