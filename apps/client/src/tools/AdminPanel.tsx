import { apiUrl } from "../lib/constants"
import { useState } from "react"
import { columns } from "./columns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "../components/ui/button"

export default function AdminPanel() {
  const [data, setData] = useState([]) // Add state to store the fetched data

  async function getUsers() {
    const options = { headers: { "Content-Type": "application/json" } }

    try {
      const res = await fetch(`${apiUrl}/matches`, options)

      if (res.ok) {
        const responseData = await res.json()
        setData(responseData) // Set the fetched data to the state
      } else {
        console.error("Failed to fetch data")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  async function handleAllFalse() {
    try {
      const usersResponse = await fetch(`${apiUrl}/users`)
      const usersData = await usersResponse.json()

      if (usersResponse.ok) {
        for (const user of usersData) {
          if (user.isAvailableToday) {
            user.isAvailableToday = false

            console.log("User ID: ", user.id)

            const patchResponse = await fetch(
              `${apiUrl}/users/availableToday/${user.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  isAvailableToday: false,
                }),
              }
            )

            if (patchResponse.ok) {
              const patchData = await patchResponse.json()
              console.log("Patch DATA: ", patchData)
              console.log("Availability Reset")
            }
          } else {
            console.error("Failed to Reset Availability")
          }
        }
      }
    } catch (error) {
      console.error("Error in reset scheduler", error)
    }
  }

  async function handleAllTrue() {
    try {
      const usersResponse = await fetch(`${apiUrl}/users`)
      const usersData = await usersResponse.json()

      if (usersResponse.ok) {
        for (const user of usersData) {
          if (!user.isAvailableToday) {
            user.isAvailableToday = true

            console.log("User ID: ", user.id)

            const patchResponse = await fetch(
              `${apiUrl}/users/availableToday/${user.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  isAvailableToday: true,
                }),
              }
            )

            if (patchResponse.ok) {
              const patchData = await patchResponse.json()
              console.log("Patch DATA: ", patchData)
              console.log("Availability Reset")
            }
          } else {
            console.error("Failed to Reset Availability")
          }
        }
      }
    } catch (error) {
      console.error("Error in reset scheduler", error)
    }
  }

  function handleClick() {
    console.log("click")
    getUsers()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
        <CardDescription>You're on the admin panel</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="mb-3 bg-purple-400" onClick={handleClick}>
          Randomize Matches
        </Button>
        <Button className="mb-3 ml-3 bg-green-400" onClick={handleAllTrue}>
          Set Availability: True
        </Button>
        <Button className="mb-3 ml-3 bg-red-500" onClick={handleAllFalse}>
          Set Availability: False
        </Button>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}
