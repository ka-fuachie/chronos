import { 
  getFormattedDate, 
  getDate, 
  getFormattedTime, 
  getTime 
} from "./utils/date.js"
import { 
  updateTheme, 
  getThemeSetting, 
  Theme ,
  setDarkTheme,
  setLightTheme
} from "./theme.js"
import { 
  generateRandomHslValues, 
  getRandomHue
} from "./utils/color.js"
import { loop } from "./utils/updateLoop.js"

//* THEME
const darkModeBtn = document.querySelector('.dark-mode') as HTMLButtonElement

let themeSetting = updateTheme(getThemeSetting())

darkModeBtn.setAttribute('aria-pressed', `${!isLightTheme()}`)

darkModeBtn.addEventListener('click', () => {
  themeSetting = updateTheme()
  const isDark = themeSetting === Theme.DARK
  
  darkModeBtn.setAttribute('aria-pressed', `${!isLightTheme()}`)
})

//* CLOCK HAND COLORS

let hslValues = generateRandomHslValues(getRandomHue())

const root= document.documentElement

root.style.setProperty('--clr-gen-400', hslValues[0])
root.style.setProperty('--clr-gen-300', hslValues[1])
root.style.setProperty('--clr-gen-200', hslValues[2])
root.style.setProperty('--clr-gen-100', hslValues[3])
// clockHands.second.style.fill = isLightTheme() ? colors[3]: colors[0]
// clockHands.minute.style.fill = colors[1]
// clockHands.hour.style.fill = colors[2]


matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if(themeSetting === Theme.SYSTEM){
    if(e.matches) setLightTheme()
    else setDarkTheme()
  } 
})

//* CLOCK AND DATE
const clockHands = {
  second: document.querySelector('#second') as SVGRectElement,
  minute: document.querySelector('#minute') as SVGRectElement,
  hour: document.querySelector('#hour') as SVGRectElement,
}
const dateField = document.querySelector('[data-date-str]')!
const timeField = {
  hours: document.querySelector('[data-hours-str]')!,
  minutes: document.querySelector('[data-minutes-str]')!,
  suffix: document.querySelector('[data-time-suffix]')!
}

const tickAudio = new Audio('./assets/sounds/clock-tick.mp3')

let canplayAudio = false

const muteClockBtn = document.querySelector('.mute') as HTMLButtonElement
muteClockBtn.setAttribute('aria-pressed', `${!canplayAudio}`)

muteClockBtn.addEventListener('click', () => {
  canplayAudio = !canplayAudio
  muteClockBtn.setAttribute('aria-pressed', `${!canplayAudio}`)
})


let currDate = new Date(0)

let revs = {
  seconds: 0,
  minutes: 0,
  hours: 0,
}

let dateStr: string
let timeArr: number[]
let timeStrArr: string[]

updateTimeAndDate()
updateClockHandRotations()
updateTimeField()
updateDateField()

let timer = 0
loop(({dt}) => {
  timer += dt

  if (timer >= 1000) {
    currDate = new Date()

    playTickAudio()
    updateTimeAndDate()
    updateClockHandRotations()
    updateTimeField()
    updateDateField()

    timer -= 1000
  }

})

//* HELPER FUNCTIONS
function isLightTheme():boolean {
  if(themeSetting === Theme.SYSTEM){
    return matchMedia('(prefers-color-scheme: light)').matches
  }
  else return themeSetting === Theme.LIGHT
}

function playTickAudio():void {
  if(canplayAudio) tickAudio.play().catch(() => {})
}

function updateTimeAndDate() {
  dateStr = getFormattedDate(getDate(currDate))
  timeArr = getTime(currDate)
  timeStrArr = getFormattedTime(timeArr).split(' ')
}

function updateDateField() {
  dateField.textContent = dateStr
}

function updateTimeField() {
  timeField.hours.textContent = timeStrArr[0]
  timeField.minutes.textContent = timeStrArr[1]
  timeField.suffix.textContent = timeStrArr[2].toUpperCase()
}

function updateClockHandRotations() {
  const [hours, minutes, seconds] = timeArr

  if (seconds === 0) {
    revs.seconds++

    if (minutes === 0) {
      revs.minutes++

      if (hours === 0) {
        revs.hours += 2
      }
    }
  }

  clockHands.second.style.transform =
  `rotateZ(${(seconds * 6) + (revs.seconds * 360)}deg)`
  clockHands.minute.style.transform =
  `rotateZ(${(minutes * 6) + (seconds * 0.1) + (revs.minutes * 360)}deg)`
  clockHands.hour.style.transform =
  `rotateZ(${(hours * 30) + (minutes * 0.5) + (revs.hours * 360)}deg)`
}
