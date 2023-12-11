import db from "../db/firebase"
import { v4 as uuid } from "uuid"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  lastMatched?: string | null
  isAvailableToday?: boolean
  matchId?: string | null
}

const usersRef = db.collection("users")

const UserModel = {
  async findAll(includeIds = true) {
    const snapshot = await usersRef.get()

    const users = snapshot.docs.map((doc) => {
      const data = { ...doc.data() }
      if (includeIds) data.id = doc.id
      return data
    })

    return users
  },

  async findById(id: string, includeId = true) {
    const userRef = usersRef.doc(id)
    const snapshot = await userRef.get()
    const user = { ...snapshot.data() }

    if (includeId) user.id = snapshot.id

    return user
  },

  //* This accepts _any_ properties! We may want to create a
  //* 'UserInput' type to help standardize the input
  async create(data: any) {
    const id = uuid()
    await usersRef.doc(id).create(data)
    const newUser = await this.findById(id)
    return newUser
  },

  async update(id: string, data: any, returnUpdatedUser = true, withId = true) {
    const userRef = usersRef.doc(id)
    await userRef.update(data)

    if (!returnUpdatedUser) return

    const user = await this.findById(id, withId)
    return user
  },

  async updateBatch(usersData: any[]) {
    const batch = db.batch()

    usersData.forEach((userData: any) => {
      const docRef = usersRef.doc(userData.id)
      batch.update(docRef, userData)
    })

    await batch.commit()
  },

  //* ✋ ===== Only for Seeding ===== 🛑
  async createBatch(usersData: any[]) {
    const batch = db.batch()

    usersData.forEach((userData) => {
      const id = uuid()
      const docRef = usersRef.doc(id)
      batch.set(docRef, userData)
    })
    await batch.commit()
  },
}

export default UserModel
