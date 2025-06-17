import { faker } from "@faker-js/faker";

export const mockHttpResponse = () => ({
  data: faker.helpers.objectValue,
  status: faker.number.int()
});