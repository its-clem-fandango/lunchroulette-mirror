import { apiUrl } from "@/lib/constants"
import TodaysLunch from "@/components/TodaysLunch"
import { Match } from "@/lib/types"
import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { log } from "console"

const TIME = "12:00 PM"
const LOCATION = "Honest Greens"
const loggedInUserID = "08f1f380-88b4-4a1b-8d8a-77e4b2751698"

export default function ViewMeeting() {
  /*  const lunchPartner: RequestInit = {
    method: "GET",
  }

  //const response = await fetch(`${apiUrl}/`, lunchPartner) // Changed 'getrequest' to 'lunchPartner'

  if (response.ok) {
    const responseData = await response.json()
    const partnersName = responseData.name
  } else {
    console.error("Request failed with a status:", response.status) // Removed the extra '(404)'
  } */

  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    async function getMatch() {
      const options = { headers: { "Content-Type": "application/json" } }
      const res = await fetch(`${apiUrl}/getMatch/${loggedInUserID}`, options)
      const data = await res.json()
      console.log(data)
      console.log(data.match.firstName)

      setMatches([
        {
          name: `${data.match.firstName} ${data.match.lastName}`,
          picUrl: "https://via.placeholder.com/40",
        },
      ])
      //use data to set some state, which conditionally renders TodaysLunch
    }

    getMatch()
  }, [])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <TodaysLunch matches={matches} time={TIME} location={LOCATION} />
    </div>
  )
}

// function NoLunchToday({}) {
//   return <div>Sorry, you have no matches today!</div>
// }
