import express from "express"
import { Server } from "http"
import router from "./router"
import cors from "cors"

const app = express()
app.use(cors())
app.use(router)
app.use(express.json())

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
