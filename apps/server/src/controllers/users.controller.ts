import { Request, Response } from "express"
import db from "../db/firebase"
import { v4 as uuid } from "uuid"
import createMatches from "../matchingAlgorithm"
import UserModel, { User } from "../models/Users"

const UsersController = {
  async getAllUsers(_: Request, res: Response) {
    try {
      const users = await UserModel.findAll()
      res.status(201).json(users)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }
      const user = await UserModel.create(data)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const user = UserModel.findById(userId)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async editUserProfile(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const data = {
        // Testing with Postman x-www-form-urlencoded
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }
      const user = await UserModel.update(userId, data, true)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async toggleIsAvailableToday(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const user = await UserModel.findById(userId)

      if (!user) throw new Error("No such user exists")

      const data = { isAvailableToday: false }
      if (!user.isAvailableToday) data.isAvailableToday = true

      const updatedUser = await UserModel.update(userId, data)
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(400).json(error)
    }
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
