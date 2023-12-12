import ConfirmLunchButton from "@/components/ConfirmLunchButton"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { Mail } from "lucide-react"
import rouletteimage from "../assets/roulette-logo.svg"
import SignIn from "@/components/SignIn"

export default function Homepage() {
  const handleSignUp = (e: Event) => {
    e.preventDefault()
    console.log("clicked sign-up")

    // handle sign up logic here
  }

  const handleLogin = (e: Event) => {
    e.preventDefault()
    console.log("clicked sign-in")

    // handle login logic here
  }

  return (
    <div className="items-stretch flex flex-col py-12">
      <img
        src={rouletteimage}
        className="aspect-[2.08] object-contain object-center w-[249px] overflow-hidden self-center max-w-full mt-36"
      />
      <header className="text-black text-xl font-semibold leading-7 tracking-normal self-center whitespace-wrap mt-20">
        Welcome! We built Lunch Roulette so Norrsken members can get to know
        each other
      </header>
      <div className="items-center flex w-full flex-col justify-center mt-16 mb-40 px-16">
        <SignIn />
      </div>
    </div>
  )
}
