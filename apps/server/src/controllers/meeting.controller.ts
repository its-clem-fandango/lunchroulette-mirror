//create controller for all actions within meeting
import { Request, Response } from "express"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore"
import db from "../db/firebase"
import { v4 as uuid } from "uuid"

const COLLECTION_NAME = "meeting"

// Hardcoded placeholders
const LOCATION = "Honest Greens"
const TIME = "1:00 PM"

//add method to router and add new request to postman
const meetingController = {
  async createMeeting(req: Request, res: Response) {
    const { users, time } = req.body

    if (!Array.isArray(users) || typeof time !== "string")
      return res.status(400)
  },
  async getMeeting(req: Request, res: Response) {
    const userId = req.params.id

    /* ************ MODEL ************** */

    const userRef = doc(db, "users", userId)
    const docSnapshot = await getDoc(userRef)

    if (!docSnapshot.exists()) {
      throw new Error("User not found")
    }

    const user = docSnapshot.data()

    //TODO RENAME IN DATABASE: matchId instead of matchID
    if (!user.matchId) {
      return res.status(404).send("No match found for today.")
    }

    const matchRef = doc(db, "users", user.matchId)
    const matchSnapshot = await getDoc(matchRef)
    const matchData = matchSnapshot.data()
    if (!matchData) throw new Error("Something went wrong")
    matchData["id"] = matchSnapshot.id
    // const user = get the user with ID: MatchID
    // add the matching user to the body ⬇️
    const body = {
      location: LOCATION,
      time: TIME,
      match: matchData,
    }
    // send all this back in the response
    res.json(body)
  },
}

//time and array of meeting of two users

export default meetingController
