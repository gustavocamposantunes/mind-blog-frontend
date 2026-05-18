import { faker } from '@faker-js/faker'

import type { UserModel } from '../models'
import type { RegisterUserParams } from '../usecases'

export const mockUser = (): UserModel => ({
  id: faker.number.int(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  image: faker.image.url(),
  createdAt: faker.date.anytime().toISOString(),
  updatedAt: faker.date.anytime().toISOString(),
})

export const mockRegisterUser = (): RegisterUserParams => ({
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})
