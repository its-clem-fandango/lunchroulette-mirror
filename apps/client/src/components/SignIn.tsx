import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

import { auth } from "../../firebase/firebaseConfig"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

const handleGoogle = async (e: any) => {
  const provider = await new GoogleAuthProvider()
  const response = await signInWithPopup(auth, provider)
  console.log("Login Object: ", response)
}

function SignIn() {
  return (
    <>
      <Button onClick={handleGoogle} className="bg-teal-900">
        <Mail className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </>
  )
}

export default SignIn
