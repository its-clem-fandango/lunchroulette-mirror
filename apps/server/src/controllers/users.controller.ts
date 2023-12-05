import { Request, Response, NextFunction } from "express"
import { collection, getDocs, addDoc, updateDoc, writeBatch } from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore"
import db from "../db/firebase"
import { v4 as uuid } from "uuid"
import createMatches from "../matchingAlgorithm"
import User from "../models/Users"

const firstName: string = "Jane"
const lastName: string = "Doe"

const UsersController = {
  async getAllUsers (_: Request, res: Response, next: NextFunction) {
    const usersRef = collection(db, "users")
    const querySnapshot = await getDocs(usersRef)

    const users = querySnapshot.docs.map((doc) => doc.data())
    res.status(201).json(users)
  },

  async createUser (_: Request, res: Response, next: NextFunction) {
    const newUser = await addDoc(collection(db, "users"), {
      firstName,
      lastName,
    })
    res.status(201).json(newUser)
  },

  async getUser (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id
    const userRef = doc(db, "users", userId)
    const docSnapshot = await getDoc(userRef)

    if (docSnapshot.exists()) {
      const user = docSnapshot.data()
      res.status(201).json(user)
    } else {
      throw new Error("User not found")
    }
  },

  async editUserProfile (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id

    // Testing with Postman x-www-form-urlencoded
    const updatedData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }

    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, updatedData)

    const updatedUserSnapshot = await getDoc(userRef)

    if (updatedUserSnapshot.exists()) {
      const updatedUser = updatedUserSnapshot.data()
      res.status(200).json(updatedUser)
    } else {
      throw new Error("User not found.")
    }
  },

  async toggleIsAvailableToday (req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id
    const userRef = doc(db, "users", userId)
    const docSnapshot = await getDoc(userRef)

    if (docSnapshot.exists()) {
      const user = docSnapshot.data()

      if (user.isAvailableToday === true) {
        user.isAvailableToday = false
      } else {
        user.isAvailableToday = true
      }

      const updatedData = {
        isAvailableToday: user.isAvailableToday
      }

      await updateDoc(userRef, updatedData)

      res.status(201).json(user)

    } else {
      res.status(404).json({ message: 'User not found.' })
    }
  },

  async createMultipleUsers (usersData: any) {
    const batch = writeBatch(db)

    // Can also use this usersRef.path to achieve the same
    // const usersRef = collection(db, 'users')
    // const docRef = doc(db, usersRef.path)

    usersData.forEach((userData: any) => {
      const docRef = doc(db, "users", uuid())
      console.log(docRef.id)
      batch.set(docRef, userData)
    })
    await batch.commit()
  },

  async getMatches (req: Request, res: Response, next: NextFunction) {
    const usersRef = collection(db, "users")
    const querySnapshot = await getDocs(usersRef)

    const users = querySnapshot.docs.map((doc) => {
      const user = {
        ...doc.data(),
        id: doc.id
      }
      return user as User
    })

    const matchedUsers = createMatches(users)

    res.status(200).json(matchedUsers)
  }
}

export default UsersController