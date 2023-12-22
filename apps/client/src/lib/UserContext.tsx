import { SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react"
import usersApi from "./usersApi"

export interface UserData {
  id: string
  firstName: string
  lastName: string
  avatar: string
  isAvailableToday?: boolean
  getToken?: (forceRefresh?: boolean | undefined) => Promise<string>
  lastMatched?: string | null
}

export const UserContext = createContext<
  [UserData | null, React.Dispatch<React.SetStateAction<UserData | null>>]
>([null, () => { throw new Error("context not provided") }])

export const useUserContext = () => {
  return useContext(UserContext)
}

interface Props {
  children: React.ReactNode
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const data = localStorage.getItem("LRUser")
  if (data === "undefined") localStorage.removeItem("LRUser")
  let defaultUserState = null
  if (data !== null) {
    defaultUserState = JSON.parse(data)
  }
  const [user, setUser] = useState<UserData | null>(defaultUserState)

  const setUserWithLocalStorage = useCallback(
    function (userData: SetStateAction<UserData | null>) {
      const newUserData =
        userData instanceof Function ? userData(user) : userData
      localStorage.setItem("LRUser", JSON.stringify(newUserData))
      setUser(userData)
    },
    [user]
  )

  useEffect(() => {
    (async () => {
      if (!user) return
      const userProfile = await usersApi.getUserById(user.id)
      setUserWithLocalStorage(userProfile)
    })()
  }, [user, setUserWithLocalStorage])

  return (
    <UserContext.Provider value={[user, setUserWithLocalStorage]}>
      {children}
    </UserContext.Provider>
  )
}