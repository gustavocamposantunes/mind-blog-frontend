import { faker } from '@faker-js/faker'

import type { AuthenticateUserModel } from '../models'
import type { AuthParams } from '../usecases'

export const mockAuthenticationParams = (): AuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAuthenticateUserModel = (): AuthenticateUserModel => ({
  accessToken: faker.string.uuid(),
  user: {
    id: 5,
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    image: faker.image.avatar(),
  },
})
