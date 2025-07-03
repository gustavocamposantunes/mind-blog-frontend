import { faker } from '@faker-js/faker'

import type { New, NewsModel } from '../models'

export const mockNew = (): New => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  url: faker.internet.url(),
})

export const mockNews = (): NewsModel => ({
  articles: [
    mockNew(),
    mockNew(),
    mockNew(),
    mockNew(),
    mockNew(),
    mockNew(),
    mockNew(),
  ],
})
