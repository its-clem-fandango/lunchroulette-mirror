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

export default function adminPanel() {
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
        <Button className="mb-3" onClick={handleClick}>
          Randomize Matches
        </Button>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}
