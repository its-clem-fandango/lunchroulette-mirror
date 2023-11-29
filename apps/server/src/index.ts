import express, { Request, Response } from "express"
import { createUser, getAllUsers } from "./db/db-api"

const app = express()
const PORT = 8080

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the Lunch Roulette API' })
})

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.post("/users", async (req: Request, res: Response) => {
  try {
    const newUser = await createUser()
    res.status(201).json(newUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.listen(PORT, () => {
  console.log(`🥗 Server is running at http://localhost:${PORT}`)
})
