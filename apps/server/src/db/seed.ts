import { faker } from '@faker-js/faker'
import UsersController from '../controllers/users.controller'

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

  UsersController.createMultipleUsers(users)
}
