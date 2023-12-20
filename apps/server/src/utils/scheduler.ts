import * as cron from "node-cron"
import axios from "axios"
import UserModel from "../models/Users"

export default function startRoulette() {
  cron.schedule("29 12 * * *", async () => {

    try {
      const response = await axios.get("http://localhost:8080/matches")
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

          const patchReq = await axios.patch(
            `http://localhost:8080/users/availableToday/${user.id}`,
            {
              isAvailableToday: false,
            },
          )
        }
      }
    } catch (error) {
      console.error("Error in reset scheduler", error)
    }
  })
}
