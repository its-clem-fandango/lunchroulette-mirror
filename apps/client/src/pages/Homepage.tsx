import ConfirmLunchButton from "@/components/ConfirmLunchButton"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { Mail } from "lucide-react"
import rouletteimage from "../assets/roulette-logo.svg"

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
        Welcome! We built lunch roulette so Norrsken members can get to know
        each other
      </header>
      <form className="items-center flex w-full flex-col justify-center mt-16 mb-40 px-16">
        <div className="flex w-[179px] max-w-full flex-col items-stretch">
          <div className="justify-between items-center bg-emerald-200 flex gap-2 px-4 py-2 rounded-md">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/455da387a251cac5f5bf7f74bac4d30e904968161c9cc8305d6284984c3b4fdb?apiKey=95443f4a0fe046b482fa7cd6f78bb27a&"
              className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full my-auto"
              alt=""
            />
            <div className="text-teal-900 text-sm font-medium leading-6 self-stretch grow whitespace-nowrap">
              <button
                onClick={handleSignUp}
                className="text-teal-900 text-sm font-medium leading-6 self-stretch grow whitespace-nowrap"
              >
                Sign up with Google
              </button>
            </div>
          </div>
          <div className="justify-between items-center bg-teal-900 flex gap-2 mt-6 pl-4 pr-11 py-2 rounded-md">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d7b3e40080c39437095f92352aa8486043685585b7d6fc6770d5913fa4b59df?apiKey=95443f4a0fe046b482fa7cd6f78bb27a&"
              className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full my-auto"
              alt=""
            />
            <div className="text-white text-sm font-medium leading-6 self-stretch grow whitespace-nowrap">
              <button
                onClick={handleLogin}
                className="text-white text-sm font-medium leading-6 self-stretch grow whitespace-nowrap"
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
