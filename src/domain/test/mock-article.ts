import { faker } from '@faker-js/faker'

import type { ArticleListModel, ArticleModel, FavouriteModel } from '../models'
import type {
  ListArticleParams,
  RegisterArticleParams,
  UpdateArticleParams,
} from '@/domain/usecases'

export const mockArticlesPaginationQueryParams = (
  page = 1,
  limit = 10,
): ListArticleParams => ({
  page,
  limit,
})

export const mockRegisterArticleParams = (): RegisterArticleParams => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
  image: faker.image.urlLoremFlickr({ category: 'nature' }),
  author_id: faker.number.int(),
})

export const mockUpdateArticleParams = (): UpdateArticleParams => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(10),
})

export const mockArticle = (
  withContent = false,
  favourited = false,
  author_id = faker.number.int(),
): ArticleModel => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(withContent ? 50 : 1),
  image: faker.image.urlLoremFlickr({
    category: 'nature',
    width: 1400,
    height: 700,
  }),
  author: {
    id: author_id,
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  favouriteCount: faker.number.int(),
  favourited,
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

export const mockArticlesList = (total = 20): ArticleListModel => ({
  articles: [
    mockArticle(),
    mockArticleLoggedUser(),
    mockArticleFavourited(),
    mockArticle(),
    mockArticle(),
    mockArticle(),
    mockArticle(),
    mockArticle(),
    mockArticle(),
    mockArticle(),
  ],
  limit: 10,
  page: 1,
  total,
})

export const mockFavouriteArticle = (): FavouriteModel => ({
  favouriteCount: faker.number.int(),
  favourited: true,
})
