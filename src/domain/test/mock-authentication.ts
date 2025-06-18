import { faker } from "@faker-js/faker";
import type { AuthParams } from "../usecases";

export const mockAuthenticationParams = (): AuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});