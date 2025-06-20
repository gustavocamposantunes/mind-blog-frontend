import { faker } from "@faker-js/faker";
import type { AuthParams } from "../usecases";
import type { AuthenticateUserModel } from "../models";

export const mockAuthenticationParams = (): AuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAuthenticateUserModel = (): AuthenticateUserModel => ({
  accessToken: faker.string.uuid(),
  user: {
    email: faker.internet.email(),
    id: faker.number.int(),
    name: faker.person.fullName()
  }
})