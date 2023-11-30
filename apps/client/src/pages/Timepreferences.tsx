import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function TimePreferences() {
    return (
        <>
            <h1 className="text-3xl text-amber-900 text-center">Time Preferences </h1>
            <form className="text-center" action="" method="post">
                <select name="" id="">
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                </select>

                <div className="text-center">
                    <Link to="/lunch" >  {/* set API for receiing this */}
                        <Button className="p-5 m-3">Save Preferences</Button>
                    </Link>
                 </div>
            </form>
           
        </>
    )}

