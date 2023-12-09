import ConfirmLunchButton from "@/components/ConfirmLunchButton"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

export default function Homepage() {
  const loggedInUserID = "6f9f750b-fc01-488b-aaae-a67efaadc6b6"

  return (
    <>
      <h1 className="text-2xl text-teal-800 text-center">Homepage</h1>
      <div className="text-center">
        <Link to="/profile">
          <Button className="p-5 text-center m-3">⚙️ Edit Profile</Button>
        </Link>
      </div>
      <hr />
      <div className="text-center">
        <h1 className="text-2xl text-teal-800 m-5">Join us for Lunch Today</h1>
        <ConfirmLunchButton currentUserId={loggedInUserID} />
      </div>
      <hr />
      <div className="text-center">
        <h1 className="text-2xl text-teal-800 m-5">Here's your next Meeting</h1>
        <Link to="/viewmeeting">
          <Button className="p-5 m-3">📅 View your meeting info</Button>
        </Link>
      </div>
    </>
  )
}
