import { UserData } from "./UserContext"
import { apiUrl } from "./constants"

export enum MATCH_STATUS {
  NOT_IN_POOL = "NOT_IN_POOL",
  PENDING_FOR_MATCH = "PENDING_FOR_MATCH",
  MATCHED = "MATCHED",
  NOT_MATCHED = "NOT_MATCHED",
}

export type Match = {
  status: MATCH_STATUS
  match: UserData
  nextEventTime: Date
}

const getUserMatch = async (userID: string): Promise<Match> => {
  const response = await fetch(`${apiUrl}/matches/${userID}`)
  if (!response.ok) {
    throw new Error("Failed to fetch match")
  }

  return await response.json()
}

export default {
  getUserMatch
}