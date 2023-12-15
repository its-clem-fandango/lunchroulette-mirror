import { UserData, useUserContext } from "@/lib/UserContext"
import rouletteimage from "../assets/roulette-logo.svg"
import SignIn from "@/components/SignIn"
import { useNavigate } from "react-router-dom"

// Refactor so we don't repeat (this goes in the context?)

export default function LandingPage() {
  const [_, setUser] = useUserContext()
  const navigate = useNavigate()

  function handleSignIn(newUser: UserData) {
    // Store in the context
    setUser(newUser)
    // Navigate  (programatically)
    navigate("/profile")
  }

  return (
    <div className="items-stretch flex flex-col py-12">
      <img
        src={rouletteimage}
        className="aspect-[2.08] object-contain object-center w-[249px] overflow-hidden self-center max-w-full mt-36"
      />
      <header className="text-black text-xl font-semibold leading-7 tracking-normal self-center whitespace-wrap mt-20">
        Welcome! We built Lunch Roulette so Norrsken members can get to know
        each other.
      </header>
      <div className="items-center flex w-full flex-col justify-center mt-16 mb-40 px-16">
        <SignIn onSignIn={handleSignIn} />
      </div>
    </div>
  )
}
