export enum Palette {
  'MONOCHROMATIC', 
  'ANALOGOUS', 
  'COMPLEMENTRY',
  'TRIAD'
}

export function randomWithinRange(a: number, b?: number): number {
  if(b === null || b === undefined) return Math.round(Math.random() * a)
  else return Math.round(Math.random() * Math.abs(b - a) + Math.min(a, b))
}

export function getRandomHue(): number {
  return Math.random() * 360
}

export function generateRandomColors(hue: number, option?: Palette): string[] {
  //Since Pallette ranges from 0 to 3 it will give us a random pallette
  if(option === null || option === undefined) option = randomWithinRange(3)

  if(option === Palette.MONOCHROMATIC) return [
    `hsl(${hue}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(100, 80)}%)`,
    `hsl(${hue}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(75, 50)}%)`,
    `hsl(${hue}, ${randomWithinRange(100, 30)}%, ${randomWithinRange(20, 30)}%)`,
    `hsl(${hue}, ${randomWithinRange(75, 25)}%, ${randomWithinRange(20)}%)`
  ]

  if(option === Palette.COMPLEMENTRY) return [
    `hsl(${hue}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(100, 50)}%)`,
    `hsl(${(hue + 180) % 360}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(75, 50)}%)`,
    `hsl(${hue}, ${randomWithinRange(100, 30)}%, ${randomWithinRange(20, 30)}%)`,
    `hsl(${(hue + 180) % 360}, ${randomWithinRange(75, 25)}%, ${randomWithinRange(20, 50)}%)`
  ]

  if(option === Palette.TRIAD) return [
    `hsl(${hue}, ${randomWithinRange(100, 75)}%, ${randomWithinRange(100, 50)}%)`,
    `hsl(${(hue + 120) % 360}, ${randomWithinRange(100, 75)}%, ${randomWithinRange(75, 50)}%)`,
    `hsl(${(hue + 240) % 360}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(20, 30)}%)`,
    `hsl(${hue}, ${randomWithinRange(75, 45)}%, ${randomWithinRange(20, 50)}%)`
  ]

  if(option === Palette.ANALOGOUS) return [
    `hsl(${hue}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(100, 80)}%)`,
    `hsl(${(hue + 30) % 360}, ${randomWithinRange(100, 50)}%, ${randomWithinRange(75, 50)}%)`,
    `hsl(${(hue + 60) % 360}, ${randomWithinRange(100, 30)}%, ${randomWithinRange(20, 30)}%)`,
    `hsl(${(hue + 90) % 360}, ${randomWithinRange(75, 25)}%, ${randomWithinRange(30)}%)`
  ]

  return []
}