import { endLoop, loop } from "./utils/updateLoop.js";
const DaysOfTheWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];
const Months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
export function getDate(date) {
    return [date.getDay(), date.getDate(), date.getMonth(), date.getFullYear()];
}
export function getTime(date) {
    return [date.getHours(), date.getMinutes(), date.getSeconds()];
}
export function getFormattedDate(dateArr) {
    const [dayOfWeek, day, month, year] = dateArr;
    const dayOfWeekStr = DaysOfTheWeek[dayOfWeek - 1];
    const dayStr = (function () {
        let suffix;
        switch (day % 10) {
            case 1:
                suffix = 'st';
                break;
            case 2:
                suffix = 'nd';
                break;
            case 3:
                suffix = 'rd';
                break;
            default:
                suffix = 'th';
                break;
        }
        return `${day}${suffix}`;
    })();
    const monthStr = Months[month];
    return `${dayOfWeekStr}, ${dayStr} ${monthStr}, ${year}`;
}
export function getFormattedTime(timeArr) {
    const [hours, minutes, seconds] = timeArr;
    let minuteStr;
    if (minutes < 10) {
        minuteStr = `0${minutes}`;
    }
    else {
        minuteStr = `${minutes}`;
    }
    if (hours > 12) {
        return `${hours - 12} ${minuteStr} ${'pm'}`;
    }
    else if (hours > 0) {
        return `${hours} ${minuteStr} ${'am'}`;
    }
    else {
        return `12 ${minuteStr} ${'am'}`;
    }
}
export class DateUI {
    constructor(date, hours, minutes, suffix, hands) {
        this.date = date;
        this.hours = hours;
        this.minutes = minutes;
        this.suffix = suffix;
        this.milliseconds = 0;
        this.currDate = new Date();
        this.hourHand = hands.querySelector('#hour');
        this.minuteHand = hands.querySelector('#minute');
        this.secondHand = hands.querySelector('#second');
    }
    start() {
        this.currDate = new Date();
        this.updateDate();
        this.updateTime();
        loop(({ dt }) => {
            this.milliseconds += dt;
            if (this.milliseconds >= 1000) {
                this.currDate = new Date();
                this.updateTime();
                this.updateDate();
                this.milliseconds -= 1000;
            }
        });
    }
    stop() {
        endLoop();
    }
    animateHands(timeArr) {
        const [hours, minutes, seconds] = timeArr;
        this.secondHand.style.transform = `rotateZ(${seconds * 6}deg)`;
        this.minuteHand.style.transform = `rotateZ(${minutes * 6}deg)`;
        this.hourHand.style.transform = `rotateZ(${hours * 30}deg)`;
    }
    updateDate() {
        this.date.textContent = getFormattedDate(getDate(this.currDate));
    }
    updateTime() {
        const timeArr = getTime(this.currDate);
        this.animateHands(timeArr);
        const [h, m, s] = getFormattedTime(timeArr).split(' ');
        this.hours.textContent = h;
        this.minutes.textContent = m;
        this.suffix.textContent = s;
    }
}
