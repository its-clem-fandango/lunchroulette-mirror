import { faker } from "@faker-js/faker"
import UsersController from "../controllers/users.controller"

console.log("Seeding: ")
seed(18)

export async function seed(n: number) {
  const userKey = "users"

  const usersTemplate = new Array(n).fill("")

  const users = usersTemplate.map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    isAvailableToday: false,
    matchId: "c1d2e3f4-g5h6-i7j8-k9l0-m1n2o3p4q5r6",
    lastMatched: "2019-01-01T00:00:00.000Z",
  }))

  UsersController.createMultipleUsers(users)
}
