import { getFormattedDate, getDate, getFormattedTime, getTime } from "./utils/date.js";
import { updateTheme, getThemeSetting } from "./theme.js";
import { generateRandomColors, getRandomHue } from "./utils/color.js";
import { loop } from "./utils/updateLoop.js";
let themeSetting = updateTheme(getThemeSetting());
const clockHands = {
    second: document.querySelector('#second'),
    minute: document.querySelector('#minute'),
    hour: document.querySelector('#hour'),
};
let colors = generateRandomColors(getRandomHue());
clockHands.second.style.fill = colors[0];
clockHands.second.style.stroke = colors[3];
clockHands.minute.style.fill = colors[1];
clockHands.hour.style.fill = colors[2];
const dateField = document.querySelector('[data-date-str]');
const timeField = {
    hours: document.querySelector('[data-hours-str]'),
    minutes: document.querySelector('[data-minutes-str]'),
    suffix: document.querySelector('[data-time-suffix]')
};
let currDate = new Date(0);
let revs = {
    seconds: 0,
    minutes: 0,
    hours: 0,
};
let dateStr;
let timeArr;
let timeStrArr;
updateTimeAndDate();
updateClockHandRotations();
updateTimeField();
updateDateField();
let timer = 0;
loop(({ dt }) => {
    timer += dt;
    if (timer >= 1000) {
        currDate = new Date();
        updateTimeAndDate();
        updateClockHandRotations();
        updateTimeField();
        updateDateField();
        timer -= 1000;
    }
});
function updateTimeAndDate() {
    dateStr = getFormattedDate(getDate(currDate));
    timeArr = getTime(currDate);
    timeStrArr = getFormattedTime(timeArr).split(' ');
}
function updateDateField() {
    dateField.textContent = dateStr;
}
function updateTimeField() {
    timeField.hours.textContent = timeStrArr[0];
    timeField.minutes.textContent = timeStrArr[1];
    timeField.suffix.textContent = timeStrArr[2].toUpperCase();
}
function updateClockHandRotations() {
    const [hours, minutes, seconds] = timeArr;
    if (seconds === 0) {
        revs.seconds++;
        if (minutes === 0) {
            revs.minutes++;
            if (hours === 0) {
                revs.hours += 2;
            }
        }
    }
    clockHands.second.style.transform =
        `rotateZ(${(seconds * 6) + (revs.seconds * 360)}deg)`;
    clockHands.minute.style.transform =
        `rotateZ(${(minutes * 6) + (seconds * 0.1) + (revs.minutes * 360)}deg)`;
    clockHands.hour.style.transform =
        `rotateZ(${(hours * 30) + (minutes * 0.5) + (revs.hours * 360)}deg)`;
}
