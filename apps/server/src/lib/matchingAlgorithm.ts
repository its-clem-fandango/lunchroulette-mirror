import { User } from "../models/Users"
import { sendEmail } from "./emailService"
import { MATCH_TEMPLATE } from "./templates"

type Pair = [User, User | null]

function filterAvailableUsers(users: User[]): User[] {
  return users.filter((user) => user.isAvailableToday)
}

function shuffleUsers(users: User[]): User[] {
  let shuffled = [...users]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function createRandomUserPairs(users: User[]): Pair[] {
  let availableUsers = filterAvailableUsers(users)
  let shuffledUsers = shuffleUsers(availableUsers)
  let userPairs: Pair[] = []

  for (let i = 0; i < shuffledUsers.length; i += 2) {
    const secondUser =
      i + 1 < shuffledUsers.length ? shuffledUsers[i + 1] : null
    userPairs.push([shuffledUsers[i], secondUser])
  }

  return userPairs
}

function updateUsersWithPairInfo(pairs: Pair[]): Pair[] {
  // users: [w, x, y, z]
  // pairs: [[x, y], [w, z]]
  let currentDate = new Date().toISOString()
  // let updatedUsers = [...users]

  return pairs.map((pair) => {
    const [user1, user2] = pair
    const newUser1: User = {
      ...user1,
      matchId: user2?.id,
      lastMatched: currentDate,
    }

    let newUser2: User | null = null
    if (user2 !== null) {
      newUser2 = {
        ...user2,
        matchId: user1.id,
        lastMatched: currentDate,
      }
    }
    return [newUser1, newUser2]
  })
}

export default async function createMatches(users: User[]): Promise<User[]> {
  const arrayOfPairs = createRandomUserPairs(users)
  const pairs = updateUsersWithPairInfo(arrayOfPairs)
    .flat()
    .filter((a) => a !== null) as User[]

  // TODO update users in db

  await Promise.all(
    pairs.map(async (user) => {
      return await sendEmail(user.firstName, MATCH_TEMPLATE)
    }),
  )

  return users
}
