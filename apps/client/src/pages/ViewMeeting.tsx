import { apiUrl } from "@/lib/constants"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { UserData, useUserContext } from "@/lib/UserContext"
import { Frame } from "@/components/ui/frame"
import { Header } from "@/components/Header"
import NoMatchImage from "@/assets/no-match.svg"
import AvatarPlaceholderImage from "@/assets/avatar-placeholder.svg"
import { cn } from "@/lib/utils"
import moment from "moment"

enum MATCH_STATUS {
  NOT_IN_POOL = "NOT_IN_POOL",
  PENDING_FOR_MATCH = "PENDING_FOR_MATCH",
  MATCHED = "MATCHED",
  NOT_MATCHED = "NOT_MATCHED",
}

type Match = {
  status: MATCH_STATUS
  match: UserData
  nextEventTime: Date
}

export default function ViewMeeting() {
  const [user] = useUserContext()

  const [match, setMatch] = useState<Match>()

  useEffect(() => {
    async function getMatch() {
      const response = await fetch(`${apiUrl}/matches/${user?.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch match")
      }

      const responseData = await response.json()
      setMatch({
        status: responseData.status,
        match: responseData.match,
        nextEventTime: new Date(responseData.nextEventTime),
      })
    }

    getMatch()
  }, [])

  return (
    <motion.div
      className="fixed h-full w-full"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.45, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="bg-sherpa-800 text-white">
        <Frame className="flex flex-col min-h-screen">
          <Header showLogo={false} />
          <div className="flex-1 text-center flex flex-col mt-16">
            {renderStatus(user!, match)}
          </div>
        </Frame>
      </div>
    </motion.div>
  )
}

function renderStatus(user: UserData, match?: Match) {
  switch (match?.status) {
    case MATCH_STATUS.NOT_IN_POOL:
      return <NotInPool />
    case MATCH_STATUS.PENDING_FOR_MATCH:
      return <PendingForMatch user={user} match={match} />
    case MATCH_STATUS.MATCHED:
      return <Matched user={user} match={match} />
    case MATCH_STATUS.NOT_MATCHED:
      return <NotMatched user={user} />
    default:
      return null
  }
}

type MatchInfoProps = {
  match?: Match
  user: UserData
}

function NotInPool() {
  const navigate = useNavigate()
  navigate("/homepage")
  return null
}

function PendingForMatch({ user, match }: MatchInfoProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col justify-end">
        <h2 className="text-3xl font-semibold mb-10">
          You're in the pool! <br />
          🤿
        </h2>
        <p>
          At <strong>12pm</strong>, we'll match you with a random person to have
          lunch with today.
        </p>
      </div>
      <div className="py-10">
        <AvatarPair
          ownImage={user.avatar}
          matchImage={AvatarPlaceholderImage}
          pulseOnSecond={true}
        />
      </div>
      <div className="flex flex-col justify-start">
        <p className="py-4">
          Next match <strong>{moment(match?.nextEventTime).fromNow()}</strong>
        </p>
        <p className="py-4">
          We'll send you a notification with the details of your match then. ✉️
        </p>
      </div>
    </div>
  )
}

function Matched({ match, user }: MatchInfoProps) {
  if (!match) return null

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col justify-end">
        <h2 className="text-3xl font-semibold mb-10">You've been matched!</h2>
        <p>
          Feel free to reach out in <strong>Slack</strong> or{" "}
          <strong>meet at the lobby</strong> directly.
        </p>
      </div>
      <div className="py-10">
        <AvatarPair ownImage={user.avatar} matchImage={match.match.avatar} />
      </div>
      <div className="flex flex-col justify-start">
        <p className="py-4 text-2xl font-semibold">
          {match.match.firstName} {match.match.lastName}
        </p>
        <p className="py-4">
          Your lunch is at <strong>1pm</strong>.
        </p>
      </div>
    </div>
  )
}

function NotMatched({ user }: MatchInfoProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col justify-end">
        <h2 className="text-3xl font-semibold mb-10">Oh no!</h2>
        <p>
          Unfortunately, we were unable to find a match for you to have lunch
          with today.
        </p>
      </div>
      <div className="py-10">
        <AvatarPair
          ownImage={user.avatar}
          matchImage={NoMatchImage}
          borderOnSecond={false}
        />
      </div>
      <div className="flex flex-col justify-start">
        <p className="py-4">
          <strong>But don’t give up! </strong>
          <br />
          Come back tomorrow for another chance to make an exciting connection.{" "}
        </p>
      </div>
    </div>
  )
}

type BigAvatarProps = {
  imgSource: string
  className?: string
  border?: boolean
  pulse?: boolean
}
function BigAvatar({
  imgSource,
  className,
  border = true,
  pulse = false,
}: BigAvatarProps) {
  return (
    <div className={cn("shadow-xl rounded-full relative", className)}>
      {pulse && (
        <div className="absolute top-0 w-36 h-36 rounded-full overflow-clip bg-white opacity-50 animate-ping" />
      )}
      <div
        className={cn(
          "w-36 h-36 rounded-full overflow-clip border-white relative",
          border ? "border-2" : "border-none"
        )}
      >
        <img src={imgSource} className="h-full w-full" />
      </div>
    </div>
  )
}

function AvatarPair({
  ownImage,
  matchImage,
  borderOnSecond = true,
  pulseOnSecond = false,
}: {
  ownImage: string
  matchImage: string
  borderOnSecond?: boolean
  pulseOnSecond?: boolean
}) {
  return (
    <div className="flex justify-center">
      <div>
        <BigAvatar className="inline-block mx-[-5%]" imgSource={ownImage} />
        <BigAvatar
          border={borderOnSecond}
          className="inline-block mx-[-5%]"
          imgSource={matchImage}
          pulse={pulseOnSecond}
        />
      </div>
    </div>
  )
}
