import CreateProfile from "@/pages/CreateProfile"
import Homepage from "@/pages/Homepage"
import LandingPage from "@/pages/LandingPage"
import ViewMeeting from "@/pages/ViewMeeting"
import AdminPanel from "@/tools/AdminPanel"
import { AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"
import { Routes, Route } from "react-router-dom"

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/profile" element={<CreateProfile />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>\{" "}
        <Route path="/viewmeeting" element={<ViewMeeting />}></Route>
        <Route path="/devcontrolpanel" element={<AdminPanel />}></Route>
      </Routes>
    </AnimatePresence>
  )
}
