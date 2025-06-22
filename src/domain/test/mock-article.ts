import { faker } from "@faker-js/faker";

import type { ArticleListModel, ArticleModel } from "../models";
import type { RegisterArticleParams } from "@/domain/usecases";

export const mockRegisterArticleParams = (): RegisterArticleParams =>  ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
  image: faker.image.urlLoremFlickr({ category: "nature" }),
  author_id: faker.number.int(),
})

export const mockArticle = (): ArticleModel => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(1),
  image: faker.image.urlLoremFlickr({ category: "nature" }),
  author_id: faker.number.int(),
  publishedAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString()
})

export const mockArticlesList = (): ArticleListModel => ({
  articles: [mockArticle()],
  limit: 10,
  page: 1,
  total: 1
})