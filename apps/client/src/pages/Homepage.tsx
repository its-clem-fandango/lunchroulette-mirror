import { Button } from "../components/ui/button";

export default function Homepage() {
    return (
        <>
            <h1 className="si">Homepage</h1>
            <Button className="">Establish Preferences</Button>
            <Button className="p-5">Edit Profile</Button>
            <p>------------------------------</p>
            <hr />
            {/* Why no horizontal rule? */}
            <Button className="p-5">Go have lunch today</Button>
            <Button className="p-10">View your match</Button>
        </>
    )
  }

