import CreateProfile from "./pages/CreateProfile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LunchConfirmation from "./pages/LunchTodayConfirmation"
import ViewMeeting from "./pages/ViewMeeting"
import AdminPanel from "./tools/AdminPanel"
import { UserContext, UserData } from "./lib/UserContext"
import { useState } from "react"
import Homepage from "./pages/Homepage"

function App() {
  const userState = useState<UserData | null>(null)

  return (
    <UserContext.Provider value={userState}>
      <Router>
        {/* NAVIGATION */}
        {/*     <nav>
        <ul className="flex">
          <li className="p-8">
            <Link className="text-2xl" to="/">
              Home
            </Link>
          </li>
          <li className="p-8">
            <Link className="text-2xl" to="/profile">
              Profile
            </Link>
          </li>
          <li className="p-8">
            <Link className="text-2xl" to="/viewmeeting">
              View Meeting
            </Link>
          </li>
        </ul>
      </nav> */}

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/profile" element={<CreateProfile />}></Route>
          <Route path="/lunch" element={<LunchConfirmation />}></Route>
          <Route path="/viewmeeting" element={<ViewMeeting />}></Route>
          <Route path="/devcontrolpanel" element={<AdminPanel />}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
