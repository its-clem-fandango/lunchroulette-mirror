import { Button } from "../components/ui/button";
import { Link } from "react-router-dom"

export default function Homepage() {
    return (
        <>
                <h1 className="text-2xl text-teal-800 text-center">Homepage</h1>
                <div className="text-center">
                    <Link to="/profile">
                        <Button className="p-5 text-center m-3">⚙️ Edit Profile</Button>
                    </Link>
                </div>
                <div className="text-center">
                    <Link to="/preferences">
                        <Button className="text-center m-3">🕰️ Establish Time Preferences</Button>
                    </Link>
                </div>
                <div className="text-center">
                    <Link to="/lunch">
                        <Button className="p-5 m-3">🥙 Go have lunch today</Button>
                    </Link>
                <div>
                    <Link to="/meeting">
                        <Button className="p-5 m-3">📅 View your meeting info</Button>
                    </Link>
                </div>
            </div>


        </>
    )
  }

