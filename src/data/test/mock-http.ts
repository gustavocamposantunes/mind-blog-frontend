import { faker } from "@faker-js/faker";

export const mockGetRequest = () => ({
  url: faker.internet.url(),
  queryParams: { categoryId: faker.string.uuid(), productId: faker.string.uuid() }
});