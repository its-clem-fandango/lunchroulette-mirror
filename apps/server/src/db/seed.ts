import { faker } from '@faker-js/faker'

export async function seed () {
  const userKey = 'users'

  const usersTemplate = new Array(21).fill('')

  const users = usersTemplate.map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    companyName: faker.company.name()
  }))
}