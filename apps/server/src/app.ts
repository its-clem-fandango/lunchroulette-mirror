import express from "express"
import { Server } from "http"

const app = express()

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
