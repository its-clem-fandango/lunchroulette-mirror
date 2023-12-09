import * as cron from "node-cron"
import axios from "axios"

export default function startRoulette() {
  cron.schedule("* * * * *", async () => {
    console.log("scheduled task executed at 12:29")

    try {
      const response = await axios.get("http://localhost:8080/matches")
      console.log("Matches retrieved:", response.data)
    } catch (error) {
      console.error("Error in scheduler:", error)
    }
  })
}
