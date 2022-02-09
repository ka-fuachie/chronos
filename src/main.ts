import { getDate, getFormattedTime, getTime } from "./date.js"
import { updateTheme, getThemeSetting } from "./theme.js"
import { endLoop, loop } from "./utils/updateLoop.js"

let themeSetting = updateTheme(getThemeSetting())


let currDate = new Date()
console.log(getDate(currDate))
console.log(getTime(currDate))

let milliSeconds = 0
loop(({ elapsedTime, dt }) => {
  milliSeconds += dt

  if (milliSeconds >= 1000) {
    currDate = new Date()
    // console.log(getDate(currDate))
    console.log(getFormattedTime(getTime(currDate)))

    milliSeconds -= 1000
  }

  if (elapsedTime >= 10 * 1000) {
    endLoop()
    console.log(milliSeconds);
  }
})


