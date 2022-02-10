import { DateUI } from "./date.js"
import { updateTheme, getThemeSetting } from "./theme.js"
import { generateRandomColors, getRandomHue, Palette } from "./utils/color.js"

let themeSetting = updateTheme(getThemeSetting())

const secondHandSvg = document.querySelector('#second') as SVGRectElement
const minuteHandSvg = document.querySelector('#minute') as SVGRectElement
const hourHandSvg = document.querySelector('#hour') as SVGRectElement

let colors = generateRandomColors(getRandomHue())

//! Fix later after refactor
secondHandSvg.style.fill = colors[0]
secondHandSvg.style.stroke = colors[3]
minuteHandSvg.style.fill = colors[1]
hourHandSvg.style.fill = colors[2]


const clock = new DateUI(
  document.querySelector('[data-date-str]')!,
  document.querySelector('[data-hours-str]')!,
  document.querySelector('[data-minutes-str]')!,
  document.querySelector('[data-time-suffix]')!,
  document.querySelector('#hands')!
)

clock.start()