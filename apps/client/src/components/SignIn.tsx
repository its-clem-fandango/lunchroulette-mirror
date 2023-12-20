import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { apiUrl } from "@/lib/constants"
import { auth } from "../../firebase/firebaseConfig"
import { SignInGoogle } from "./SignInGoogle"
import { UserData } from "@/lib/UserContext"

interface SignInProps {
  onSignIn: (userData: UserData) => void
}

function SignIn({ onSignIn }: SignInProps) {
  const handleGoogle = async () => {
    /**
     * Can be extracted
     */
    const provider = await new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)

    const { uid, email, displayName, photoURL } = response.user

    // Should this call be authenticated?
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await response.user.getIdToken()}`,
      },
      body: JSON.stringify({
        uid,
        email,
        displayName,
        avatar: photoURL,
      }),
    }

    const responseCreateUser = await fetch(`${apiUrl}/users`, requestOptions)

    let newUser

    if (!responseCreateUser.ok) {
      const responseUsers = await fetch(`${apiUrl}/users`)
      if (!responseUsers.ok) throw new Error("oops")
      const users = await responseUsers.json()
      newUser = users.find((u: any) => u.id === uid)
    } else {
      newUser = await responseCreateUser.json()
    }
    /**  */

    onSignIn({
      ...newUser,
      getToken: response.user.getIdToken,
    })
  }

  return <SignInGoogle onClick={handleGoogle} />
}

export default SignIn
