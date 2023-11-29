import { collection, doc, getDocs, addDoc, updateDoc } from "firebase/firestore"
import db from "./firebase"

const firstName: string = 'Jane'
const lastName: string = 'Doe'

export async function getAllUsers () {
  const usersRef = collection(db, "users")
  const querySnapshot = await getDocs(usersRef)

  const users = querySnapshot.docs.map((doc) => doc.data())
  return users
}

export async function createUser (id: number, firstName: string, lastName: string) {
  const newUser = await addDoc(collection(db, "users"), {
    id,
    firstName,
    lastName
  })
  return newUser
}

export async function updateUser (id: number, firstName: string, lastName: string) {
  const userIdAsString = String(id)

  const userRef = doc(db, "users", userIdAsString)

  await updateDoc(userRef, {
    firstName: firstName,
    lastName: lastName
  })
}
