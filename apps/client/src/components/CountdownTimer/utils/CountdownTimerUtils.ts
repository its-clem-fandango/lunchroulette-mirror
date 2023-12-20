import dayjs from 'dayjs'

export function getRemainingTimeUntilMsTimestamp(timestampMs: number) {

  let timestampDayjs = dayjs(timestampMs)
  const nowDayjs = dayjs()

  if (timestampDayjs.isBefore(nowDayjs)) {
    timestampDayjs = dayjs(timestampMs + 86400000)
  }

  return {
    hours: getRemainingHours(nowDayjs, timestampDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs)
  }
}

function getRemainingHours(nowDayjs: dayjs.Dayjs, timestampDayjs: dayjs.Dayjs) {
  const hours = timestampDayjs.diff(nowDayjs, 'hours')
  return padWithZeros(hours, 2)
}

function getRemainingMinutes(nowDayjs: dayjs.Dayjs, timestampDayjs: dayjs.Dayjs) {
  const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60
  return padWithZeros(minutes, 2)
}

function getRemainingSeconds(nowDayjs: dayjs.Dayjs, timestampDayjs: dayjs.Dayjs) {
  const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60
  return padWithZeros(seconds, 2)
}

function padWithZeros(number: number, minLength: number) {
  const numberString = number.toString()
  if (numberString.length >= minLength) {
    return numberString
  } else {
    return '0'.repeat(minLength - numberString.length) + numberString
  }
}