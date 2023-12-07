import { faker } from "@faker-js/faker"
import UserModel from "../models/Users"

console.log("Seeding: ")
seed(18)

export async function seed (n: number) {
  const usersTemplate = new Array(n).fill("")

  const users = usersTemplate.map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    isAvailableToday: true,
  }))

  UserModel.createBatch(users)
}
