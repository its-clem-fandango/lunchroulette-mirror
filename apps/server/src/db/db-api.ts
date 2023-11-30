import { collection, doc, getDocs, addDoc, writeBatch } from "firebase/firestore"
import db from "./firebase"
import { v4 as uuid } from 'uuid'

export async function getAllUsers () {
  const usersRef = collection(db, "users")
  const querySnapshot = await getDocs(usersRef)

  const users = querySnapshot.docs.map((doc) => doc.data())
  return users
}

export async function createUser (firstName: string, lastName: string, companyName: string) {
  const newUser = await addDoc(collection(db, "users"), {
    firstName,
    lastName,
    companyName
  })
  return newUser
}

export async function createMultipleUsers (usersData: any) {
  const batch = writeBatch(db)

  // Can also use this usersRef.path to achieve the same
  // const usersRef = collection(db, 'users')
  // const docRef = doc(db, usersRef.path)

  usersData.forEach((userData: any) => {
    const docRef = doc(db, 'users', uuid())
    console.log(docRef.id)
    batch.set(docRef, userData)
  })
  await batch.commit()
}
