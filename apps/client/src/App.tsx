import { BrowserRouter as Router } from "react-router-dom"
import { UserContext, UserData } from "./lib/UserContext"
import { useState, SetStateAction } from "react"
import { useDidSeeWalkthrough } from "./lib/hooks/useFirstTime"
import Walkthrough from "./components/Walkthrough"
import AnimatedRoutes from "./components/AnimatedRoutes"

function App() {
  const data = localStorage.getItem("LRUser")
  let defaultUserState = null
  if (data !== null) {
    defaultUserState = JSON.parse(data)
  }
  const [user, setUser] = useState<UserData | null>(defaultUserState)

  function setUserWithLocalStorage(userData: SetStateAction<UserData | null>) {
    localStorage.setItem("LRUser", JSON.stringify(userData))
    setUser(userData)
  }

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
