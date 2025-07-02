import { faker } from '@faker-js/faker'

import type { NewsModel } from '../models'

export const mockNews = (): NewsModel => ({
  articles: [
    {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(4),
      url: faker.internet.url(),
    },
  ],
})
