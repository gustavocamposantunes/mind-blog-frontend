import { faker } from "@faker-js/faker";

const url = faker.internet.url();

export const mockGetRequest = () => ({
  url,
  queryParams: { categoryId: faker.string.uuid(), productId: faker.string.uuid() }
});

export const mockPostRequest = () => ({
  url,
  body: { name: faker.commerce.productName(), price: faker.commerce.price() },
  headers: { "Content-Type": "application/json" }
})