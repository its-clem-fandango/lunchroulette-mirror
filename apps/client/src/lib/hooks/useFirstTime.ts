import { useState } from "react"

const DID_SEE_WALKTHROUGH_KEY = "LRDidSeeWalkthrough"

export function useDidSeeWalkthrough(): [boolean, (newValue: boolean) => void] {
  const didSeeWalkthroughStorage =
    localStorage.getItem(DID_SEE_WALKTHROUGH_KEY) === "1"
  const [didSeeWalkthrough, setDidSeeWalkthrough] = useState<boolean>(
    didSeeWalkthroughStorage
  )

  function setDidSeeWalkthroughWithLocalStorage(newValue: boolean) {
    localStorage.setItem(DID_SEE_WALKTHROUGH_KEY, newValue ? "1" : "0")
    setDidSeeWalkthrough(newValue)
  }

  return [didSeeWalkthrough, setDidSeeWalkthroughWithLocalStorage]
}
