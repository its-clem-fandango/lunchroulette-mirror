import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// This object should never be edited directly.
// It should be copied from the project settings.
const firebaseConfig = {
  apiKey: "AIzaSyBwg4sRMq0DAzfoU2zRaHBJDZvb4o9I-nY",
  authDomain: "lunch-roulette-aroldev.firebaseapp.com",
  projectId: "lunch-roulette-aroldev",
  storageBucket: "lunch-roulette-aroldev.appspot.com",
  messagingSenderId: "779453467612",
  appId: "1:779453467612:web:48399c174cb9e5e0b51d19",
  measurementId: "G-GBHZKX6RL7",
} as const

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
