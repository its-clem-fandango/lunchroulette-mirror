import { Match } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import UserMiniCard from "./MiniUserCard"

type MyMatchProps = { matches: Match[]; time: string; location: string }

function TodaysLunch({ matches, time, location }: MyMatchProps) {
  // who, when, where

  return (
    <Card className="mx-10 mb-5 shadow-green-600">
      <CardHeader>
        <CardTitle className="text-xl text-green-700 text-center">
          Today's Lunch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-3">
          {location} @ {time}
        </p>
        {matches.map(({ name, picUrl }) => (
          <UserMiniCard name={name} picUrl={picUrl} />
        ))}
      </CardContent>
    </Card>
  )
}

export default TodaysLunch
