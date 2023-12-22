import { useCallback, useState } from "react"
import rouletteimage from "../assets/typelogo.svg"
import roulettewheel from "../assets/roulette-wheel.svg"
import avatar1 from "../assets/avatar1.png"
import avatar1and2 from "../assets/avatar1and2.png"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { Frame } from "./ui/frame"

const transition = { duration: 0.45, ease: [0.43, 0.13, 0.23, 0.96] }

interface WalkthroughProps {
  setSeeWalkthrough: (value: boolean) => void
}

interface WalkthroughStepProps {
  onSkip: () => void
}

type WalkthroughStep = (props: WalkthroughStepProps) => JSX.Element

const steps: Array<WalkthroughStep> = [
  WalkthroughStep1,
  WalkthroughStep2,
  WalkthroughStep3,
  WalkthroughStep4,
]

// appear with a modal up animation
function Walkthrough({ setSeeWalkthrough }: WalkthroughProps) {
  const handleSkip = useCallback(() => {
    setSeeWalkthrough(true)
  }, [setSeeWalkthrough])

  const [currentStep, setCurrentStep] = useState(0)

  const CurrentContent = steps[currentStep]

  const incrementStep = useCallback(() => {
    if (currentStep === steps.length - 1) {
      setSeeWalkthrough(true)
      return
    }
    setCurrentStep(currentStep + 1)
  }, [currentStep, setSeeWalkthrough])

  return (
    <motion.div
      className="fixed h-full w-full bg-white box-border"
      style={{ zIndex: 1000 }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={transition}
    >
      <Frame>
        <div className="flex justify-between">
          <a
            href="#"
            className="text-sherpa-900 font-semibold"
            onClick={handleSkip}
          >
            Skip
          </a>
          <a
            href="#"
            className="text-sherpa-900 font-semibold"
            onClick={incrementStep}
          >
            Next
          </a>
        </div>
        <div className="text-center mt-8 text-sherpa-900">
          <CurrentContent onSkip={handleSkip} />
        </div>
      </Frame>
      <img
        src={roulettewheel}
        alt="Lunch roulette wheel"
        className="fixed bottom-[-23%]"
      />
    </motion.div>
  )
}

export default Walkthrough

function WalkthroughStep1() {
  return (
    <>
      <h2 className="text-sherpa-500 font-bold  text-xl m-4">Welcome to</h2>
      <img className="mx-auto" src={rouletteimage} alt="Lunch Roulette" />
      <p className="my-10">
        Join us <strong>daily at 1pm</strong> for an exciting lunch rendezvous!{" "}
        <strong>Get paired with a new colleague for each meal.</strong>
      </p>
      <p className="my-10">
        It's a delightful opportunity to connect, expand your professional
        circle, and fortify the bonds within our community.
      </p>
    </>
  )
}

function WalkthroughStep2() {
  return (
    <motion.div
      style={{ zIndex: 1000 }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={transition}
    >
      <h2 className="text-sherpa-500 font-bold  text-xl m-4">
        1. Join the Pool 🤿
      </h2>
      <p className="my-10">
        Simply <strong>link your Google account</strong> and{" "}
        <strong>personalize your profile</strong> for easy recognition.
      </p>
      <p className="my-10">
        Then, whenever you're in the mood to mingle,{" "}
        <strong>hop into our daily matching pool</strong> and{" "}
        <strong>we'll pair you up</strong> for an engaging lunch date!
      </p>
      <img
        src={avatar1}
        alt="An example of an avatar"
        className="my-8 mx-auto h-48"
      />
    </motion.div>
  )
}

function WalkthroughStep3() {
  return (
    <motion.div
      style={{ zIndex: 1000 }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={transition}
    >
      <h2 className="text-sherpa-500 font-bold  text-xl m-4">
        2. Get Matched 🤖
      </h2>
      <p className="my-10">
        <strong>Right before 1pm</strong>, <br /> keep an eye on your inbox!
      </p>
      <p className="my-10">
        <strong>
          We'll send you an email revealing your lunch partner for the day
        </strong>
        , making it effortless to connect and enjoy your mealtime encounter
      </p>
      <img
        src={avatar1and2}
        alt="An example of an avatar"
        className="my-8 mx-auto h-48"
      />
    </motion.div>
  )
}

function WalkthroughStep4({ onSkip }: { onSkip: () => void }) {
  return (
    <motion.div
      style={{ zIndex: 1000 }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={transition}
    >
      <h2 className="text-sherpa-500 font-bold text-xl m-4">
        3. Grow your network 🕺
      </h2>
      <p className="my-10">You're all set!</p>
      <p className="my-10">
        <strong>Meet your lunch buddy in the lobby</strong> and decide
        together: Will it be Honest Greens today, or are you feeling
        adventurous?
      </p>
      <p className="my-10">
        <strong>Explore and enjoy</strong> various cool eateries around us,
        adding a dash of excitement to your lunchtime!
      </p>
      <p className="my-10 text-5xl">😋</p>
      <Button onClick={onSkip} className="bg-sherpa-900">
        Sounds Lit! <span className="ml-2">🔥</span>
      </Button>
    </motion.div>
  )
}
