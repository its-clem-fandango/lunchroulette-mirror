import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { apiUrl } from "@/lib/constants"

type ConfirmLunchButtonProps = {
  currentUserId: string
}

const ConfirmLunchButton: React.FC<ConfirmLunchButtonProps> = ({
  currentUserId,
}) => {
  const [signedUpForLunch, setSignedUpForLunch] = useState(false)

  useEffect(() => {
    async function getLunchStatus() {
      const response = await fetch(`${apiUrl}/users/${currentUserId}`)
      const user = await response.json()

      if (user.isAvailableToday) {
        setSignedUpForLunch(true)
      }
    }
    getLunchStatus()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const response = await fetch(
      `${apiUrl}/users/availableToday/${currentUserId}`,
      { method: "PATCH" },
    )
    const updatedUser = await response.json()

    setSignedUpForLunch(updatedUser.isAvailableToday)
  }

  return (
    <form onSubmit={handleSubmit}>
      {signedUpForLunch ? <CancelButton /> : <SignUpButton />}
    </form>
  )
}

const SignUpButton: React.FC = () => {
  return <Button type="submit">🥙 Confirm Lunch for Today</Button>
}

const CancelButton: React.FC = () => {
  return (
    <Button className="bg-red-600 hover:bg-red-700" type="submit">
      ❌ Cancel Lunch for Today
    </Button>
  )
}

export default ConfirmLunchButton
