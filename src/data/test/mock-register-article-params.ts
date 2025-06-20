import type { RegisterArticleParams } from "@/domain/usecases";
import { faker } from "@faker-js/faker";

export const mockRegisterArticleParams = (): RegisterArticleParams =>  ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
  author_id: faker.number.int(),
})
