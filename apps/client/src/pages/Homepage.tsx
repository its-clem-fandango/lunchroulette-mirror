import rouletteimage from "../assets/roulette-logo.svg"
import roulettewheel from "../assets/roulette-wheel.svg"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Homepage() {
  const [loading, setLoading] = useState(false)

  const [countdownDate, setCountdownDate] = useState(
    new Date().setHours(11, 0, 0, 0)
  )
  const [timeNow, setTimeNow] = useState(new Date().getTime())
  const [distance, setDistance] = useState(countdownDate - timeNow)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  setInterval(() => {
    setTimeNow(new Date().getTime())
    if (countdownDate - timeNow < 0) {
      setCountdownDate(new Date().setHours(11, 0, 0, 0) + 86400000)
    }
    setDistance(countdownDate - new Date().getTime())
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000))
  }, 1000)

  const navigate = useNavigate()

  function handleSpin() {
    setLoading(true)
    const randomNumber = Math.floor(Math.random() * 5 * 6000)
    console.log(randomNumber)
    //TODO: fetch post join the pool
    setTimeout(async () => {
      //do fetch here
      setLoading(false)
      navigate("/viewmeeting")
    }, randomNumber)
  }

  return (
    <>
      <div className="flex flex-col items-center max-w-[480px] w-full mx-auto pt-12">
        <img
          src={rouletteimage}
          className="w-[81px] mt-2.5"
          alt="Lunch Roulette Logo"
        />

        <header className="text-myColor font-semibold text-center text-xl mt-20 ">
          {loading ? `You're in the pool!` : `You're not in the pool`}
        </header>

        <main className="flex flex-col mt-20 px-8">
          <header className="text-myColor font-semibold text-3xl text-center tracking-tight">
            Spin the Wheel to enter the pool
          </header>
          <div className="text-myColor text-center">
            <span>Next lunch in </span>
            <span className="font-semibold">
              {hours.toString().padStart(2, "0")}:
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </main>

        <Button
          type="submit"
          className=" bg-myColor text-white mt-7 px-10 h-10"
          onClick={handleSpin}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Spinning!" : "Spin!"}
        </Button>
        <img
          src={roulettewheel}
          alt="Lunch roulette wheel"
          className={`mt-20 ${loading && "animate-spin"}`}
        />
      </div>
    </>
  )
}
