import { faker } from "@faker-js/faker"
import UserModel from "../models/Users"

console.log("Seeding: ")
seed(6)

const EMAIL1 = ""
const EMAIL2 = ""

export async function seed(n: number) {
  const usersTemplate = new Array(n).fill("")

  const users = usersTemplate.map(() => ({
    email: "albert.genisset@gmail.com",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    isAvailableToday: true,
    avatar: faker.image.avatar(),
  }))

  UserModel.createBatch(users)
}
