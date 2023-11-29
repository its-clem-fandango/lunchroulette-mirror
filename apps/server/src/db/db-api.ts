import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";

export async function getAllUsers() {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  const users = querySnapshot.docs.map((doc) => doc.data());
  return users;
}
