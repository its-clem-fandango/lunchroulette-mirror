import { useState, useEffect } from "react"
import { getRemainingTimeUntilMsTimestamp } from "./utils/CountdownTimerUtils"

const defaultRemainingTime = {
  hours: "00",
  minutes: "00",
  seconds: "00",
}

interface CountdownTimerProps {
  countdownTimestampMs: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ countdownTimestampMs }) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [countdownTimestampMs])

  function updateRemainingTime(countdown: number) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown))
  }

  return (
    <span>
      {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
    </span>
  )
}

export default CountdownTimer
