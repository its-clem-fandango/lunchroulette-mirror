import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { apiUrl } from "@/lib/constants"
import { auth } from "../../firebase/firebaseConfig"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

interface UserData {
  id: string
  firstName: string
  lastName: string
  avatar: string
  isAvailableToday: boolean
  getToken: (forceRefresh?: boolean | undefined) => Promise<string>
}

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
    console.log("Response form Google Sign IN: ", response)

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
    console.log("responseCreateUser", responseCreateUser.status)
    console.log("response", responseCreateUser)

    if (!responseCreateUser.ok) {
      const responseUsers = await fetch(`${apiUrl}/users`)
      if (!responseUsers.ok) throw new Error("oops")

      const users = await responseUsers.json()
      newUser = users.find((u: any) => u.email === email)
    } else {
      newUser = await responseCreateUser.json()
    }
    /**  */
    console.log("newUser", newUser)

    onSignIn({
      ...newUser,
      getToken: response.user.getIdToken,
    })
  }

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
