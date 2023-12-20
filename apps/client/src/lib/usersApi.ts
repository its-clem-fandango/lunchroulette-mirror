import { UserData } from "./UserContext";
import { apiUrl } from "./constants";

const PATH = `${apiUrl}/users`;

type Method = 'POST' | 'PUT' | 'PATCH'

const makeRequestOptions = (method: Method, payload?: string, auth?: string) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": auth || ""
    },
    body: payload
  }
}

const getUserById = async (id: string): Promise<UserData> => {
  const response = await fetch(`${PATH}/${id}`);
  if (!response.ok) throw new Error("Error fetching user by id")
  return await response.json();
}

const toggleIsAvailableToday = async (id: string): Promise<UserData> => {
  const requestOptions = makeRequestOptions('POST')
  const response = await fetch(`${PATH}/${id}/availableToday`, requestOptions)
  if (!response.ok) {
    throw new Error(`Error toggling user available on user ${id}`)
  }
  return await response.json()
}

const createUserProfile = async (authToken: string, uid: string, email: string | null, displayName: string | null, avatar: string | null): Promise<UserData> => {
  const payload = JSON.stringify({
    email,
    displayName,
    avatar,
    uid
  })
  const headerToken = `Bearer ${authToken}`
  const requestOptions = makeRequestOptions('POST', payload, headerToken)

  const response = await fetch(PATH, requestOptions)
  if (!response.ok) {
    throw new Error(`Error creating user profile available on user ${uid}`)
  }
  return await response.json()
}

const updateUserProfile = async (id: string, firstName?: string, lastName?: string, avatar?: string): Promise<UserData> => {
  const body = avatar ? {
    firstName,
    lastName,
    avatar
  } : {
    firstName,
    lastName
  }
  const payload = JSON.stringify(body)
  const requestOptions = makeRequestOptions('PUT', payload)
  const response = await fetch(`${PATH}/${id}`, requestOptions)
  if (!response.ok) {
    throw new Error(`Error updating user profile available on user ${id}`)
  }
  return await response.json()
}

export default {
  getUserById,
  toggleIsAvailableToday,
  createUserProfile,
  updateUserProfile
}