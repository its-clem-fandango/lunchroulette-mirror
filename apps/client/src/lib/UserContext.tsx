import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "firebase/firebaseConfig"
import { User } from "firebase/auth"

interface UserProfile { 
  id: string
  firstName: string
  lastName: string
  email: string
  lastMatched?: string | null
  isAvailableToday?: boolean
  matchId?: string | null
  avatar?: string | null
}

export interface IUserContextType {
  user: User | null
  userProfile: UserProfile | null
  triggerUserProfileRefresh: () => Promise<void>
}

export const UserContext = createContext<IUserContextType>({
  user: null,
  userProfile: null,
  triggerUserProfileRefresh: () => {throw new Error('UserContext not provided')}
})

export const useUserContext = () => {
  return useContext(UserContext)
}

const fetchUserProfile = async (user: User | null): Promise<UserProfile | null> => { 
  //implement this
  return null
}

export const UserContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => { 
  const [user, setUser] = useState<User | null>(auth.currentUser)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      if (user) {

        const userToken = user.getIdToken()
        //do what you need with the token here

        fetchUserProfile(user)
          .then((profile) => {
            setUserProfile(profile)
          })
      }

    })

    return () => unsubscribe()
  }, [])
  
  const triggerUserProfileRefresh = async () => { 
    if (user) { 
      const profile = await fetchUserProfile(user)
      setUserProfile(profile)
    }
  }
  
  return (
    <UserContext.Provider value={{userProfile, triggerUserProfileRefresh, user }}>
      {children}
    </UserContext.Provider>
  )
}