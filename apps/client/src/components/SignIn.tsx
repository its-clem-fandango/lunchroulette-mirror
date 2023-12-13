import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { apiUrl } from "@/lib/constants"

import { auth } from "../../firebase/firebaseConfig"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

const handleGoogle = async (e: any) => {
  const provider = await new GoogleAuthProvider()
  const response = await signInWithPopup(auth, provider)
  console.log("Login Object: ", response)

  const uid = response.user.uid
  const email = response.user.email
  const displayName = response.user.displayName
  const photoURL = response.user.photoURL

  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, email, displayName, photoURL }),
  }
  fetch(`${apiUrl}/users`, requestOptions)
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
