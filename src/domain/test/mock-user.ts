import { faker } from '@faker-js/faker'

import type { UserModel } from '../models'

export const mockUser = (): UserModel => ({
  id: faker.number.int(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  image: faker.image.urlLoremFlickr(),
  createdAt: faker.date.anytime().toISOString(),
  updatedAt: faker.date.anytime().toISOString(),
})
