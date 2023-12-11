import * as cron from "node-cron"
import axios from "axios"

export default function startRoulette() {
  cron.schedule("29 12 * * *", async () => {
    console.log("scheduled task executed at 12:29")

    try {
      const response = await axios.get("http://localhost:8080/matches")
      console.log("Matches retrieved:", response.data)
    } catch (error) {
      console.error("Error in scheduler:", error)
    }
  })
}

//gets database matches every minute (app.ts), doesn't update database
//localhost/matches updates and creates new matches on every refresh
