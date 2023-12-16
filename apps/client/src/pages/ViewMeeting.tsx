import { apiUrl } from "@/lib/constants"
import TodaysLunch from "@/components/TodaysLunch"
import { Match } from "@/lib/types"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const TIME = "12:00 PM"
const LOCATION = "Honest Greens"
const loggedInUserID = "095dcd2d-61b9-4538-afdc-01513dc2df5a"

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
              id: data.match.id,
              name: `${data.match.firstName} ${data.match.lastName}`,
              avatar: data.match.avatar,
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

  const navigate = useNavigate()

  return (
    <motion.div
      className="fixed h-full w-full bg-white py-14 px-10 box-border"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1 }}
    >
      {noMatch ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sorry, we couldn't find a match for you today</CardTitle>
          </CardHeader>
          <Button className="m-3" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Card>
      ) : (
        <TodaysLunch matches={matches} time={TIME} location={LOCATION} />
      )}
    </motion.div>
  )
}

// function NoLunchToday({}) {
//   return <div>Sorry, you have no matches today!</div>
//
