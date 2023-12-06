import { Request, Response } from "express"
import db from "../db/firebase"
import { v4 as uuid } from "uuid"
import createMatches from "../matchingAlgorithm"
import User from "../models/Users"

const UsersController = {
  async getAllUsers(_: Request, res: Response) {
    try {
      const usersRef = db.collection("users")
      const snapshot = await usersRef.get()
      const users = snapshot.docs.map((doc) => doc.data())
      res.status(201).json(users)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const userId = uuid()
      await db.collection("users").doc(userId).set({
        // Testing with Postman x-www-form-urlencoded
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAvailableToday: req.body.isAvailableToday,
      })

      const userRef = db.collection("users").doc(userId)
      const snapshot = await userRef.get()
      const user = snapshot.data()
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const userRef = db.collection("users").doc(userId)
      const snapshot = await userRef.get()
      const user = snapshot.data()
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async editUserProfile(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const userRef = db.collection("users").doc(userId)
      await userRef.update({
        // Testing with Postman x-www-form-urlencoded
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })

      const snapshot = await userRef.get()
      const user = snapshot.data()
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async toggleIsAvailableToday(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const userRef = db.collection("users").doc(userId)
      const snapshot = await userRef.get()
      const user = snapshot.data()

      if (user) {
        if (user.isAvailableToday === false) {
          await userRef.update({
            isAvailableToday: true,
          })
        } else {
          await userRef.update({
            isAvailableToday: false,
          })
        }
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async createMultipleUsers(usersData: any) {
    const batch = db.batch()

    usersData.forEach((userData: any) => {
      const userId = uuid()
      const docRef = db.collection("users").doc(userId)
      batch.set(docRef, userData)
    })
    await batch.commit()
  },

  async getMatches(_: Request, res: Response) {
    const usersRef = db.collection("users")
    const snapshot = await usersRef.get()

    const users = snapshot.docs.map((doc) => {
      const user = {
        ...doc.data(),
        id: doc.id,
      }
      return user as User
    })

    const matchedUsers = createMatches(users)

    res.status(200).json(matchedUsers)
  },
}

export default UsersController
