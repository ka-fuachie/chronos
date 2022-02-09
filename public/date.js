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
    const monthStr = Months[month - 1];
    return `${dayOfWeekStr} ${dayStr} ${monthStr}, ${year}`;
}
export function getFormattedTime(timeArr) {
    const [hours, minutes, seconds] = timeArr;
    if (hours > 12) {
        return `${hours - 12} ${minutes} ${'pm'}`;
    }
    else if (hours > 0) {
        return `${hours} ${minutes} ${'am'}`;
    }
    else {
        return `12 ${minutes} ${'am'}`;
    }
}
class DateUI {
    constructor(date, hours, minutes, suffix, hands) {
        this.date = date;
        this.hours = hours;
        this.minutes = minutes;
        this.suffix = suffix;
        this.hands = hands;
        this.milliseconds = 0;
    }
    start() { }
    stop() { }
    updateDate() { }
    updateTime() { }
}
