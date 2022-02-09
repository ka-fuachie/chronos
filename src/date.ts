type TextElement = HTMLParagraphElement | HTMLSpanElement

const DaysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

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
]

export function getDate(date: Date): number[] {
  return [date.getDay(), date.getDate(), date.getMonth(), date.getFullYear()]
}

export function getTime(date: Date): number[] {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
}

export function getFormattedDate(dateArr: number[]): string {
  const [dayOfWeek, day, month, year] = dateArr

  const dayOfWeekStr = DaysOfTheWeek[dayOfWeek - 1]
  const dayStr = (function(){
    let suffix: string

    switch (day % 10) {
      case 1:
        suffix = 'st'
        break;
      case 2:
        suffix = 'nd'
        break;
      case 3:
        suffix = 'rd'
        break;
    
      default:
        suffix = 'th'
        break;
    }

    return `${day}${suffix}`
  })()
  const monthStr = Months[month - 1]

  return `${dayOfWeekStr} ${dayStr} ${monthStr}, ${year}`
}

export function getFormattedTime(timeArr: number[]): string {
  const [hours, minutes, seconds] = timeArr

  if(hours > 12){
    return `${hours - 12} ${minutes} ${'pm'}`
  }
  else if(hours > 0){
    return `${hours} ${minutes} ${'am'}`
  }
  else{
    return `12 ${minutes} ${'am'}`
  }
}

class DateUI {
  private milliseconds: number
  constructor(
    public date: TextElement,
    public hours: TextElement,
    public minutes: TextElement,
    public suffix: TextElement,
    public hands: SVGGElement
  ){
    this.milliseconds = 0
  }

  start(){}
  stop() {}
  updateDate() {}
  updateTime() {}
}