import { Request, Response } from 'express'
import { createUser, getAllUsers, updateUser } from '../db/db-api'

const express = require('express')
const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.post("/", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    const newUser = await createUser(users.length + 1, req.body.firstName, req.body.lastName)
    return res.status(201).json(newUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    const user = users.find((user) => user.id === +req.params.id)

    if (!user) {
      return res.status(404).json({ error: 'Resource not found' })
    }

    if (req.body.firstName === '') {
      return res.status(200).json(user)
    } else if (req.body.lastName === '') {
      return res.status(200).json(user)
    }

    const updatedUser = await updateUser(+user.id, req.body.firstName, req.body.lastName)

    return res.status(200).json(user)

  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

module.exports = router