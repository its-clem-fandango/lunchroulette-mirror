import { BrowserRouter as Router } from "react-router-dom"
import { UserContextProvider } from "./lib/UserContext"
import { useDidSeeWalkthrough } from "./lib/hooks/useFirstTime"
import Walkthrough from "./components/Walkthrough"
import AnimatedRoutes from "./components/AnimatedRoutes"

function App() {

  const [didSeeWalkthrough, setSeeWalkthrough] = useDidSeeWalkthrough()

  return (
    <UserContextProvider>
      {!didSeeWalkthrough && (
        <Walkthrough setSeeWalkthrough={setSeeWalkthrough} />
      )}
      <Router>
        {/* ROUTES */}
        <AnimatedRoutes />
      </Router>
    </UserContextProvider>
  )
}

export default App
