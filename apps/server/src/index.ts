import express, { Request, Response } from "express"

const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the Lunch Roulette API' })
})

const usersRouter = require('./routes/users')

app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`🥗 Server is running at http://localhost:${PORT}`)
})

