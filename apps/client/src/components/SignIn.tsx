import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../firebase/firebaseConfig"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

const handleGoogle = async (e: any) => {
  const provider = await new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

function SignIn() {
  return (
    <>
      <Button onClick={handleGoogle} className="bg-teal-900">
        <Mail className="mr-2 h-4 w-4" />
        Sign In With Google
      </Button>
    </>
  )
}

export default SignIn
