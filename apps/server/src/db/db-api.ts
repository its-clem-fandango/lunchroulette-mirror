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

export async function createUser (firstName: string, lastName: string, companyName: string) {
  const newUser = await addDoc(collection(db, "users"), {
    firstName,
    lastName,
    companyName
  })
  return newUser
}

// export async function updateUser (updatedUser) {

//   const ref = doc(db, 'users', updatedUser.id)

//   await updateDoc(ref, {
//     firstName,
//     lastName
//   })
//   return ref
// }
