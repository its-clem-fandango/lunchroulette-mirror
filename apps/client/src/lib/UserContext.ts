import { createContext, useContext } from "react"

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
>([null, () => {}])

export const useUserContext = () => {
  return useContext(UserContext)
}
