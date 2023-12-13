import rouletteimage from "../assets/roulette-logo.svg"
import { Button } from "@/components/ui/button"

export default function Homepage() {
  function handleTime() {
    return "2:45"
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
          You're not in the pool.
        </header>

        <main className="flex flex-col mt-20 px-8">
          <header className="text-myColor font-semibold text-3xl text-center tracking-tight">
            Spin the Wheel to enter the pool
          </header>
          <div className="text-myColor text-center">
            <span> Next lunch in </span>
            <span className="font-semibold">{handleTime()}</span>
          </div>
        </main>
        <Button
          className=" bg-myColor text-white mt-7 px-10 h-10"
          type="submit"
        >
          Spin!
        </Button>
      </div>
    </>
  )
}
