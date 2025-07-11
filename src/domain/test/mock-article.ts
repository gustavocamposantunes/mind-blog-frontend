import { faker } from '@faker-js/faker'

import type { ArticleListModel, ArticleModel, FavouriteModel } from '../models'
import type { RegisterArticleParams } from '@/domain/usecases'

export const mockRegisterArticleParams = (): RegisterArticleParams => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
  image: faker.image.urlLoremFlickr({ category: 'nature' }),
  author_id: faker.number.int(),
})

export const mockArticle = (withContent = false): ArticleModel => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(withContent ? 50 : 1),
  image: faker.image.urlLoremFlickr({
    category: 'nature',
    width: 1400,
    height: 700,
  }),
  author: {
    id: faker.number.int(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  favouriteCount: faker.number.int(),
  favourited: false,
  publishedAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
})

export const mockArticleLoggedUser = (): ArticleModel => ({
  ...mockArticle(),
  author: {
    ...mockArticle().author,
    id: 5,
  },
})

export const mockArticleFavourited = (): ArticleModel => ({
  ...mockArticle(),
  favourited: true,
})

export const mockArticlesList = (): ArticleListModel => ({
  articles: [mockArticle(), mockArticleLoggedUser(), mockArticleFavourited()],
  limit: 10,
  page: 1,
  total: 1,
})

export const mockFavouriteArticle = (): FavouriteModel => ({
  favouriteCount: faker.number.int(),
  favourited: true,
})