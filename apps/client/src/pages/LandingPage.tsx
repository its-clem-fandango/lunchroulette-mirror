import { UserData, useUserContext } from "@/lib/UserContext"
import rouletteimage from "../assets/typelogo.svg"
import ruletto from "../assets/ruletto.png"
import SignIn from "@/components/SignIn"
import { useNavigate } from "react-router-dom"
import { Frame } from "@/components/ui/frame"

export default function LandingPage() {
  const [_, setUser] = useUserContext()
  const navigate = useNavigate()

  function handleSignIn(newUser: UserData) {
    setUser(newUser)
    navigate("/profile")
  }

  return (
    <Frame>
      <div className="items-stretch flex flex-col py-12">
        <div className="mx-auto relative">
          <img
            src={ruletto}
            className="ruletto absolute w-[94px] bottom-[50px] left-[24px]"
          />
          <div className="bg-white relative">
            <img
              src={rouletteimage}
              className="object-contain object-center w-[249px] overflow-hidden self-center max-w-full mt-36"
            />
          </div>
        </div>
        <header className="leading-7 tracking-normal self-center whitespace-wrap mt-20 text-center">
          <p>
            We built Lunch Roulette so Norrsken members can get to know each
            other.
          </p>
        </header>
        <div className="items-center flex w-full flex-col justify-center mt-16 mb-40 px-16">
          <SignIn onSignIn={handleSignIn} />
        </div>
      </div>
    </Frame>
  )
}
