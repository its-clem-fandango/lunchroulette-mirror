import { Request, Response } from "express"
import createMatches from "../lib/matchingAlgorithm"
import UserModel, { User } from "../models/Users"
import { sendMatchEmail } from "../lib/emailService"
import { fa } from "@faker-js/faker"

const UsersController = {
  async getAllUsers(_: Request, res: Response) {
    try {
      const users = await UserModel.findAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async createUser(req: Request, res: Response) {

    try {
      const displayName = req.body.displayName

      const [firstName, lastName] = displayName.split(" ")

      const data = {
        firstName,
        lastName,
        email: req.body.email,
        avatar: req.body.avatar,
        isAvailableToday: false,
      }
      const uid = req.body.uid

      const user = await UserModel.create(uid, data)

      res.status(201).json(user)
    } catch (error) {
      console.log("error", error)
      res.status(400).json(error)
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      // Fix
      const user = await UserModel.findById(userId)
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
      // @ts-ignore
      if (req.body.avatar) data.avatar = req.body.avatar
      const user = await UserModel.update(userId, data, true)
      res.status(200).json(user)
    } catch (error) {
      console.error(error)
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
    const users = await UserModel.findAll()
    const matchedUsers = await createMatches(users as User[])
    await Promise.all(
      matchedUsers.map(async (user) => {
        if (!user.matchId) {
          return
        }
        const match = await UserModel.findById(user.matchId)
        return await sendMatchEmail(
          user.email,
          user.firstName,
          match.firstName,
          match.lastName
        )
      })
    )

    const usersToUpdate = matchedUsers

    await UserModel.updateBatch(usersToUpdate)

    res.status(200).json(matchedUsers)
  },

  async resetMatches(_: Request, res: Response) {
    const users = await UserModel.findAll()
    const usersToUpdate = users.map((user) => ({
      ...user,
      matchId: null,
      lastMatched: null,
    }))
    await UserModel.updateBatch(usersToUpdate)
    res.status(200).json(usersToUpdate)
  },
}

export default UsersController
