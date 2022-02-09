import { DateUI, getDate, getFormattedTime, getTime } from "./date.js"
import { updateTheme, getThemeSetting } from "./theme.js"
import { endLoop, loop } from "./utils/updateLoop.js"

let themeSetting = updateTheme(getThemeSetting())

const clock = new DateUI(
  document.querySelector('[data-date-str]')!,
  document.querySelector('[data-hours-str]')!,
  document.querySelector('[data-minutes-str]')!,
  document.querySelector('[data-time-suffix]')!,
  document.querySelector('#hands')!
)

clock.start()