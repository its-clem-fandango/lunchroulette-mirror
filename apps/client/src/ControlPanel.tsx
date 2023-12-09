import React from "react"
import { apiUrl } from "./lib/constants"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./components/ui/button"

export default function ControlPanel() {
  async function getUsers() {
    const options = { headers: { "Content-Type": "application/json" } }

    try {
      const res = await fetch(`${apiUrl}/matches`, options)

      if (res.ok) {
        const data = await res.json()
        console.log(data) // Do something with the response data
      } else {
        console.error("Failed to fetch data")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  function handleClick() {
    console.log("click")
    getUsers() // Call the fetch function when the button is clicked
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
        <CardDescription>You're on the admin panel</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClick}>Randomize Matches</Button>
      </CardContent>
    </Card>
  )
}
