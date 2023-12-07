import { apiUrl } from "@/lib/constants"
import TodaysLunch from "@/components/TodaysLunch"
import { Match } from "@/lib/types"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const TIME = "12:00 PM"
const LOCATION = "Honest Greens"
const loggedInUserID = "2633686d-492c-4eec-a79c-0ba5ce4b30fd"

export default function ViewMeeting() {
  /* I guess the controller should check whether or not 
  the forever-alone state is seen. It asks the model for
  the match ID and if their isn't one then 
  it shows them they have no notifications today */

  const [matches, setMatches] = useState<Match[]>([])
  const [noMatch, setNoMatch] = useState(false)

  useEffect(() => {
    async function getMatch() {
      const options = { headers: { "Content-Type": "application/json" } }

      try {
        const res = await fetch(`${apiUrl}/getMatch/${loggedInUserID}`, options)

        if (!res.ok) {
          // Handle 404 error
          if (res.status === 404) {
            setNoMatch(true)
            console.log("no match is true")
            return
          }
          throw new Error(`HTTP error! Status: ${res.status}`)
        }

        const data = await res.json()
        console.log(data)

        if (!data.match) {
          setNoMatch(true)
          console.log("no match is true")
        } else {
          setMatches([
            {
              name: `${data.match.firstName} ${data.match.lastName}`,
              picUrl: "https://via.placeholder.com/40",
            },
          ])
          // use data to set some state, which conditionally renders TodaysLunch
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        // Handle the error in a way that makes sense for your application
      }
    }

    getMatch()
  }, [])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {noMatch ? (
        <Card className="w-[350px] shadow-green-600">
          <CardHeader>
            <CardTitle>Sorry, we couldn't find a match for you today</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <TodaysLunch matches={matches} time={TIME} location={LOCATION} />
      )}
    </div>
  )
}

// function NoLunchToday({}) {
//   return <div>Sorry, you have no matches today!</div>
//
