import rouletteimage from "../assets/roulette-logo.svg"
import roulettewheel from "../assets/roulette-wheel.svg"
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext, useUserContext } from "@/lib/UserContext"

export default function Homepage() {
  const [loading, setLoading] = useState(false)
  const [lunchTime, setLunchTime] = useState(new Date().setHours(13, 0, 0, 0))

  const [userState, setUserState] = useUserContext()
  console.log(`user: ${userState}`)

  const navigate = useNavigate()

  function handleSpin() {
    setLoading(true)
    setTimeout(async () => {
      try {
        if (userState) {
          axios.patch(`/users/availableToday/${userState.id}`, {
            isAvailableToday: true,
          })
        }
      } catch (error) {
        console.log(error)
      }
      navigate("/viewmeeting")
    }, 1000)
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
              <CountdownTimer countdownTimestampMs={lunchTime} />
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
