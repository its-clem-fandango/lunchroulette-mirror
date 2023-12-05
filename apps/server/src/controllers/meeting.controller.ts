//create controller for all actions within meeting
import { Request, Response } from "express"
import db from "../db/firebase"

// Hardcoded placeholders
const LOCATION = "Honest Greens"
const TIME = "1:00 PM"

const meetingController = {
  async createMeeting(req: Request, res: Response) {
    const { users, time } = req.body

    if (!Array.isArray(users) || typeof time !== "string")
      return res.status(400)
  },
  async getMeeting(req: Request, res: Response) {
    const userId = req.params.id

    const userRef = db.collection("users").doc(userId)
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
      throw new Error("User not found")
    }

    const user = snapshot.data()!

    //TODO RENAME IN DATABASE: matchId instead of matchID
    if (!user.matchId) {
      return res.status(404).send("No match found for today.")
    }

    const matchRef = db.collection("users").doc(user.matchId)
    const matchSnapshot = await matchRef.get()
    const matchData = matchSnapshot.data()
    if (!matchData) throw new Error("Something went wrong")
    matchData["id"] = matchSnapshot.id

    const body = {
      location: LOCATION,
      time: TIME,
      match: matchData,
    }

    res.json(body)
  },
}

export default meetingController
