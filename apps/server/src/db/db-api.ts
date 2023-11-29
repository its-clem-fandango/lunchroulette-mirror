import { collection, getDocs, addDoc } from "firebase/firestore"
import db from "./firebase"

const firstName: string = 'Jane'
const lastName: string = 'Doe'

export async function getAllUsers () {
  const usersRef = collection(db, "users")
  const querySnapshot = await getDocs(usersRef)

  const users = querySnapshot.docs.map((doc) => doc.data())
  return users
}

export async function createUser () {
  const newUser = await addDoc(collection(db, "users"), {
    firstName,
    lastName
  })
  return newUser
}
