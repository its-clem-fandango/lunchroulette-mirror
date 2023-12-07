import ConfirmLunchButton from "@/components/ConfirmLunchButton"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

export default function Homepage() {
  //for logged in user: if isAvailableForToday is falsy, then I can see a button inviting me to join
  //so I have to fetch my ID

  const loggedInUserID = "08f1f380-88b4-4a1b-8d8a-77e4b2751698"

  return (
    <>
      <h1 className="text-2xl text-teal-800 text-center">Homepage</h1>

      {/* EDIT PROFILE  */}
      <div className="text-center">
        <Link to="/profile">
          <Button className="p-5 text-center m-3">⚙️ Edit Profile</Button>
        </Link>
      </div>

      {/* REGISTER FOR LUNCH MEETING  */}
      <hr />
      <div className="text-center">
        <h1 className="text-2xl text-teal-800 m-5">Join us for Lunch Today</h1>
        {/* <Link to="/lunch">
                            <Button className="p-5 m-3">🥙 Go have lunch today</Button>
                        </Link> */}
        <ConfirmLunchButton />
      </div>

      {/* RECURRING PREFERENCES  */}
      <div className="text-center">
        <h1 className="text-2xl text-teal-800 m-5">
          Or Establish Recurring Preferences
        </h1>
        <Link to="/preferences">
          <Button className="text-center m-3">
            🕰️ Define Time Preferences
          </Button>
        </Link>
      </div>

      {/* NEXT MEETING INFO  */}
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
