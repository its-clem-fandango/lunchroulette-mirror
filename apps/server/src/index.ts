import express, { Request, Response } from "express"
import { createUser, getAllUsers } from "./db/db-api"

const app = express()
const PORT = 8080

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
})

app.get("/users", async (req: Request, res: Response) => {
  const users = await getAllUsers()
  res.json(users)
})

app.post("/users", async (req: Request, res: Response) => {
  const newUsers = await createUser()
  res.json(newUsers)
})

app.listen(PORT, () => {
  console.log(`🥗 Server is running at http://localhost:${PORT}`)
})
