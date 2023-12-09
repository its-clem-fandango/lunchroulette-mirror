import CreateProfile from "./pages/CreateProfile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import Homepage from "./pages/Homepage"
import LunchConfirmation from "./pages/LunchTodayConfirmation"
import ViewMeeting from "./pages/ViewMeeting"
import AdminPanel from "/Users/juneau/Documents/arol.dev/repos/Projects/lunch-roulette/apps/client/src/tools/AdminPanel.tsx"

function App() {
  return (
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
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/profile" element={<CreateProfile />}></Route>
        <Route path="/lunch" element={<LunchConfirmation />}></Route>
        <Route path="/viewmeeting" element={<ViewMeeting />}></Route>
        <Route path="/controlpanel" element={<AdminPanel />}></Route>
      </Routes>
    </Router>
  )
}

export default App
