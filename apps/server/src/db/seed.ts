import { faker } from '@faker-js/faker'
import { createMultipleUsers } from './db-api'

console.log('Seeding: ')
seed(18)

export async function seed (n: number) {
  const userKey = 'users'

  const usersTemplate = new Array(n).fill('')

  const users = usersTemplate.map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    companyName: faker.company.name()
  }))

  createMultipleUsers(users)
}
