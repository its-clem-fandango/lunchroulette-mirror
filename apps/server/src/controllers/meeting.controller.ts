import { Request, Response } from "express"
import db from "../db/firebase"
import UserModel from "../models/Users"
import moment from "moment"

// Hardcoded placeholders
const LOCATION = "Honest Greens"
const TIME = "1:00 PM"

enum MATCH_STATUS {
  NOT_IN_POOL = "NOT_IN_POOL",
  PENDING_FOR_MATCH = "PENDING_FOR_MATCH",
  MATCHED = "MATCHED",
  NOT_MATCHED = "NOT_MATCHED",
}

function nextEventTime() {
  const today = moment()

  if (today.hour() < 13) {
    return today.hour(13).minute(0).second(0)
  }

  return today.add(1, "day").hour(13).minute(0).second(0)
}

const MeetingController = {
  async createMeeting(req: Request, res: Response) {
    const { users, time } = req.body

    if (!Array.isArray(users) || typeof time !== "string")
      return res.status(400)
  },

  async getMeeting(req: Request, res: Response) {
    /**
     * Always respond:
     * {
     *   status: "NOT_IN_POOL" | "PENDING_FOR_MATCH" | "MATCHED" | "NOT_MATCHED"
     *   match: User | null
     *   nextEventTime: Date
     * }
     */

    const userId = req.params.id

    const user = await UserModel.findById(userId)

    if (!user.isAvailableToday) {
      return res.json({
        status: MATCH_STATUS.NOT_IN_POOL,
        match: null,
        nextEventTime: nextEventTime().toDate(),
      })
    }

    // From here on, user is available today
    const lastMatched = moment(user.lastMatched)
    const today = moment()
    const isLastMatchedToday = lastMatched.isSame(today, "day")

    console.log({ isLastMatchedToday, user })
    if (user.lastMatched === null || !isLastMatchedToday) {
      return res.json({
        status: MATCH_STATUS.PENDING_FOR_MATCH,
        match: null,
        nextEventTime: nextEventTime().toDate(),
      })
    }

    if (user.matchId) {
      const match = await UserModel.findById(user.matchId)
      if (!match) throw new Error("Something went wrong")

      return res.json({
        status: MATCH_STATUS.MATCHED,
        match: match,
        nextEventTime: nextEventTime().toDate(),
      })
    }
    return res.json({
      status: MATCH_STATUS.NOT_MATCHED,
      match: null,
      nextEventTime: nextEventTime().toDate(),
    })
  },
}

export default MeetingController
