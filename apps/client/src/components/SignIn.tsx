import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../firebase/firebaseConfig"
import { SignInGoogle } from "./SignInGoogle"
import { UserData } from "@/lib/UserContext"
import usersApi from "@/lib/usersApi"

interface SignInProps {
  onSignIn: (userData: UserData) => void
}

function SignIn({ onSignIn }: SignInProps) {
  const handleGoogle = async () => {

    const provider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)

    const { uid, email, displayName, photoURL } = response.user

    const token = await response.user.getIdToken()
    let userProfile: UserData
    try {
      userProfile = await usersApi.createUserProfile(token, uid, email, displayName, photoURL)
    } catch (err) {
      userProfile = await usersApi.getUserById(uid)
    }

    onSignIn({
      ...userProfile,
      getToken: response.user.getIdToken,
    })
  }

  return <SignInGoogle onClick={handleGoogle} />
}

export default SignIn
