import { Link } from "react-router-dom"
import { Button } from "./ui/button"

type UserMiniCardProps = { name: string; picUrl: string }

function UserMiniCard({ name, picUrl }: UserMiniCardProps) {
  return (
    <div className="shadow-lg outline outline-1 outline-slate-200 rounded-md p-5 flex gap-5 items-center">
      <img src={picUrl} width={40} height={40} />
      <p>{name}</p>
      <Link to="/:id/profile/">
        <Button>Profile</Button>
      </Link>
    </div>
  )
}

export default UserMiniCard
