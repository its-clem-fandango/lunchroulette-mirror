import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import usersApi from "@/lib/usersApi"

type ConfirmLunchButtonProps = {
  currentUserId: string
}

const ConfirmLunchButton: React.FC<ConfirmLunchButtonProps> = ({
  currentUserId,
}) => {
  const [signedUpForLunch, setSignedUpForLunch] = useState(false)

  useEffect(() => {
    async function getLunchStatus() {
      const userProfile = await usersApi.getUserById(currentUserId)

      if (userProfile.isAvailableToday) {
        setSignedUpForLunch(true)
      }
    }
    getLunchStatus()
  }, [currentUserId])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const updatedUser = await usersApi.toggleIsAvailableToday(currentUserId)

    setSignedUpForLunch(updatedUser.isAvailableToday || false)
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
