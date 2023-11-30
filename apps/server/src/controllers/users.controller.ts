import { Request, Response, NextFunction } from "express"
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore"
import db from "../db/firebase"

const firstName: string = "Jane"
const lastName: string = "Doe"

const UsersController = {
  async getAllUsers(_: Request, res: Response, next: NextFunction) {
    const usersRef = collection(db, "users")
    const querySnapshot = await getDocs(usersRef)

    const users = querySnapshot.docs.map((doc) => doc.data())
    res.status(201).json(users)
  },

  async createUser(_: Request, res: Response, next: NextFunction) {
    const newUser = await addDoc(collection(db, "users"), {
      firstName,
      lastName,
    })
    res.status(201).json(newUser)
  },

  async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id
    const userRef = doc(db, userId)
    const docSnapshot = await getDoc(userRef)

    if (docSnapshot.exists()) {
      const user = docSnapshot.data()
      res.status(201).json(user)
    } else {
      throw new Error("User not found")
    }
  },

  async editUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id
      const updatedData = req.body

      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, updatedData)

      const updatedUserSnapshot = await getDoc(userRef)

      if (updatedUserSnapshot.exists()) {
        const updatedUser = updatedUserSnapshot.data()
        res.status(200).json(updatedUser)
      } else {
        throw new Error("User not found.")
      }
    } catch (e) {
      next(e)
    }
  },
}
export default UsersController
