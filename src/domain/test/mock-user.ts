import { faker } from '@faker-js/faker'

import type { UserModel } from '../models'
import type { RegisterUserParams } from '../usecases'

export const mockUser = (): UserModel => ({
  id: faker.number.int(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  image: faker.image.urlLoremFlickr(),
  createdAt: faker.date.anytime().toISOString(),
  updatedAt: faker.date.anytime().toISOString(),
})

export const mockRegisterUser = (): RegisterUserParams => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})
