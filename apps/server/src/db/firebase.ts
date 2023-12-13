import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"
import admin from "firebase-admin"
import dotenv from "dotenv"

dotenv.config()

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
)

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })

const db = getFirestore(app)
export const storage = getStorage(app)

export default db
