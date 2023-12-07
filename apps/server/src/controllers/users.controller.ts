import { Request, Response } from "express"
import createMatches from "../lib/matchingAlgorithm"
import UserModel, { User } from "../models/Users"

const UsersController = {
  async getAllUsers (_: Request, res: Response) {
    try {
      const users = await UserModel.findAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async createUser (req: Request, res: Response) {
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

  async getUser (req: Request, res: Response) {
    try {
      const userId = req.params.id
      // Fix
      const user = await UserModel.findById(userId)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async editUserProfile (req: Request, res: Response) {
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

  async toggleIsAvailableToday (req: Request, res: Response) {
    try {
      console.log('triggered toggle method')
      const userId = req.params.id
      const user = await UserModel.findById(userId)

      console.log("found user", user)
      if (!user) throw new Error("No such user exists")

      const data = { isAvailableToday: false }
      if (!user.isAvailableToday) data.isAvailableToday = true

      const updatedUser = await UserModel.update(userId, data)
      console.log("updated user", updatedUser)
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async getMatches (_: Request, res: Response) {
    const users = await UserModel.findAll()
    const matchedUsers = createMatches(users as User[])
    const matchedUsersData = await matchedUsers
    res.status(200).json(matchedUsersData)
  },
}

export default UsersController
