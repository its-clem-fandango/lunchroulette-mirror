import { BrowserRouter as Router } from "react-router-dom"
import { UserContext, UserData } from "./lib/UserContext"
import { useState, SetStateAction, useEffect, useCallback } from "react"
import { useDidSeeWalkthrough } from "./lib/hooks/useFirstTime"
import Walkthrough from "./components/Walkthrough"
import AnimatedRoutes from "./components/AnimatedRoutes"
import usersApi from "./lib/usersApi"

function App() {
  const data = localStorage.getItem("LRUser")
  if (data === "undefined") localStorage.removeItem("LRUser")
  let defaultUserState = null
  if (data !== null) {
    defaultUserState = JSON.parse(data)
  }
  const [user, setUser] = useState<UserData | null>(defaultUserState)

  const setUserWithLocalStorage = useCallback(
    function (userData: SetStateAction<UserData | null>) {
      const newUserData =
        userData instanceof Function ? userData(user) : userData
      localStorage.setItem("LRUser", JSON.stringify(newUserData))
      setUser(userData)
    },
    [user]
  )

  useEffect(() => {
    (async () => {
      if (!user) return
      const userProfile = await usersApi.getUserById(user.id)
      setUserWithLocalStorage(userProfile)
    })()
  }, [user, setUserWithLocalStorage])

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
