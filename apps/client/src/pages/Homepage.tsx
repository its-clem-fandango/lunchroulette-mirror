import rouletteimage from "../assets/roulette-logo.svg"
import roulettewheel from "../assets/roulette-wheel.svg"
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/lib/UserContext"
import { apiUrl } from "@/lib/constants"
import { motion } from "framer-motion"
import { Frame } from "@/components/ui/frame"
import { Header } from "@/components/Header"
import { cn } from "@/lib/utils"

export default function Homepage() {
  const [loading, setLoading] = useState(false)
  const [lunchTime, setLunchTime] = useState(new Date().setHours(13, 0, 0, 0))
  const [userState, setUserState] = useUserContext()

  const navigate = useNavigate()

  function handleSpin() {
    setLoading(true)
    setTimeout(async () => {
      try {
        if (userState) {
          const response = await fetch(
            `${apiUrl}/users/availableToday/${userState.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isAvailableToday: true,
              }),
            }
          )

          if (!response.ok) {
            throw new Error(`Request failed, Status: ${response.status}`)
          }
        }
      } catch (error) {
        console.log(error)
      }
      navigate("/viewmeeting")
    }, 1000)
  }

  useEffect(() => {
    console.log({ userState })
    if (userState?.isAvailableToday) {
      navigate("/viewmeeting")
    }
  }, [userState, navigate])

  return (
    <>
      <Frame>
        <Header />
        <div className="flex flex-col items-center max-w-[480px] w-full mx-auto pt-12 text-center">
          <header className="text-half-baked-300 font-semibold text-2xl mt-20 ">
            You're in the pool!
          </header>

          <main className="flex flex-col mt-10 px-8">
            <p className="py-4">
              <strong>Join the pool</strong>
            </p>
            <p className="py-4 w-56">
              so you can get matched with a random person to have lunch today at
              1pm
            </p>
            <div className="text-myColor text-center py-4">
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
            {loading ? "Listing you up…" : "Join the pool"}
          </Button>
        </div>
      </Frame>
      <img
        src={roulettewheel}
        alt="Lunch roulette wheel"
        className={cn("fixed bottom-[-23%]", loading && "animate-spin")}
      />
    </>
  )
}
