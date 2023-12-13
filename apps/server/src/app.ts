import express from "express"
import { Server } from "http"
import router from "./router"
import cors from "cors"
import morgan from "morgan"
import * as cron from "node-cron"
import startRoulette from "./utils/scheduler"

const app = express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

//initializes the roulette scheduler to run at 12:29pm
startRoulette()

export function startServer(): Server {
  const PORT = 8080
  const server = app.listen(PORT, () => {
    console.log(`🚀Server running and listening on http://localhost:${PORT}`)
  })
  process.on("SIGTERM", () => {
    server.close()
  })
  return server
}

export default app
