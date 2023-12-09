import { Match } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import UserMiniCard from "./MiniUserCard"
import { cn } from "@/lib/utils"

type TodaysLunchProps = {
  matches: Match[]
  time: string
  location: string
  className?: string
}

function TodaysLunch({ matches, time, location, className }: TodaysLunchProps) {
  // who, when, where
  console.log(matches)

  return (
    <Card className={cn("w-[350px] mx-10 mb-5 shadow-green-600", className)}>
      <CardHeader>
        <CardTitle className="text-xl text-green-700 text-center">
          Today's Lunch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-3">
          {location} @ {time}
        </p>
        {matches.map(({ name, avatar }, id) => (
          <UserMiniCard key={id} name={name} avatar={avatar} />
        ))}
      </CardContent>
    </Card>
  )
}

export default TodaysLunch
