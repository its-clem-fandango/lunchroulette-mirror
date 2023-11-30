import CreateProfile from "./pages/CreateProfile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"

function App() {
  return (
    <Router>
      <>
        <div className="min-h-sc">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<h1>homepage</h1>}></Route>
          <Route path="/profile" element={<CreateProfile />}></Route>
        </Routes>
      </>
    </Router>
  )
}

export default App
