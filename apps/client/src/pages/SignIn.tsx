import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../firebase/firebaseConfig"
import { Button } from "@/components/ui/button"

const handleGoogle = async (e: any) => {
  const provider = await new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

function SignIn() {
  return (
    <>
      <Button onClick={handleGoogle}>Sign In With Google</Button>
    </>
  )
}

export default SignIn
