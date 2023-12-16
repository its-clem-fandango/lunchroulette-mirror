import { BrowserRouter as Router } from "react-router-dom"
import { UserContext, UserData } from "./lib/UserContext"
import { useState, SetStateAction, useEffect, useCallback } from "react"
import { useDidSeeWalkthrough } from "./lib/hooks/useFirstTime"
import Walkthrough from "./components/Walkthrough"
import { apiUrl } from "./lib/constants"
import AnimatedRoutes from "./components/AnimatedRoutes"

function App() {
  const data = localStorage.getItem("LRUser")
  let defaultUserState = null
  if (data !== null) {
    defaultUserState = JSON.parse(data)
  }
  const [user, setUser] = useState<UserData | null>(defaultUserState)

  const setUserWithLocalStorage = useCallback(function (
    userData: SetStateAction<UserData | null>
  ) {
    localStorage.setItem("LRUser", JSON.stringify(userData))
    setUser(userData)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!user) return
      const response = await fetch(`${apiUrl}/users/${user?.id}`)
      const data = await response.json()
      setUserWithLocalStorage(data)
    })()
  }, [])

  const [didSeeWalkthrough, setSeeWalkthrough] = useDidSeeWalkthrough()

  return (
    <UserContext.Provider value={[user, setUserWithLocalStorage]}>
      {!didSeeWalkthrough && (
        <Walkthrough setSeeWalkthrough={setSeeWalkthrough} />
      )}
      <Router>
        {/* ROUTES */}
        <AnimatedRoutes />
      </Router>
    </UserContext.Provider>
  )
}

export default App
