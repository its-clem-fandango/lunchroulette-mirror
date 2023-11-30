import CreateProfile from "./pages/CreateProfile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import Homepage from "./pages/Homepage"
import TimePreferences from "./pages/Timepreferences"
import LunchConfirmation from "./pages/LunchTodayConfirmation"

function App() {
  return (
    <Router>
      {/* NAVIGATION */}
      <nav>
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
            <Link className="text-2xl" to="/preferences">
              Time Preferences
            </Link>
          </li>
        </ul>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/profile" element={<CreateProfile />}></Route>
        <Route path="/preferences" element={<TimePreferences />}></Route>
        <Route path="/lunch" element={<LunchConfirmation />}></Route>
      </Routes>
    </Router>
  )
}

export default App
