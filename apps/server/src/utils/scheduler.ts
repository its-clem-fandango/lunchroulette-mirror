import * as cron from "node-cron"
import axios from "axios"
import UserModel from "../models/Users"

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
  cron.schedule("1 0 * * *", async () => {
    const users = await UserModel.findAll()

    try {
      for (const user of users) {
        if (user.isAvailableToday) {
          user.isAvailableToday = false

          console.log("Processing user with ID:", user.id)

          const patchReq = await axios.patch(
            `http://localhost:8080/users/availableToday/${user.id}`,
            {
              isAvailableToday: false,
            },
          )
          console.log("patch request: ", patchReq.data)

          console.log("availability has been reset")
        }
      }
    } catch (error) {
      console.error("Error in reset scheduler", error)
    }
  })
}
