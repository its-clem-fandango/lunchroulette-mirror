import Header1 from "@/components/Header1"
import { Button } from "@/components/ui/button"
import CreateProfile from "./pages/CreateProfile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react"
import { Link } from "react-router-dom"

function App() {
  return (
    <Router>
      <>
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

        <Routes>
          <Route path="/" element={<h1>homepage</h1>}></Route>
          <Route path="/profile" element={<CreateProfile />}></Route>
        </Routes>
      </>
    </Router>
  )
}

export default App
