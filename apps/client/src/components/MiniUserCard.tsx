import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type UserMiniCardProps = { name: string; avatar: string; className?: string }

function UserMiniCard({ name, avatar, className }: UserMiniCardProps) {
  console.log(avatar)

  return (
    <div
      className={cn(
        "shadow-lg outline outline-1 outline-slate-200 rounded-md p-5 flex gap-5 items-center",
        className,
      )}
    >
      <img src={avatar} width={40} height={40} />
      <p>{name}</p>
      <Link to="/:id/profile/">
        <Button>Profile</Button>
      </Link>
    </div>
  )
}

export default UserMiniCard
