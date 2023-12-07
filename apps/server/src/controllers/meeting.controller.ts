import { Request, Response } from "express"

import db from "../db/firebase"
import { sendEmail } from "../lib/email"

import UserModel from "../models/Users"


// Hardcoded placeholders
const LOCATION = "Honest Greens"
const TIME = "1:00 PM"

const MeetingController = {
  async createMeeting(req: Request, res: Response) {
    const { users, time } = req.body

    if (!Array.isArray(users) || typeof time !== "string")
      return res.status(400)
  },

  async getMeeting(req: Request, res: Response) {
    const userId = req.params.id

    const user = await UserModel.findById(userId)

    if (!user.matchId) {
      return res.status(404).send("No match found for today.")
    }

    const match = await UserModel.findById(user.matchId)
    if (!match) throw new Error("Something went wrong")

    const body = {
      location: LOCATION,
      time: TIME,
      match: match,
    }

    res.json(body)
  },
}

export default MeetingController
