import { faker } from "@faker-js/faker";

import type { HttpGetClient } from "../protocols";
import type { UserModel } from "@/domain/models";
import type { GetProfileUseCase } from "@/domain/usecases";

export class RemoteGetProfile implements GetProfileUseCase {
  private readonly url: string;
  private readonly httpClient: HttpGetClient;

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url;
    this.httpClient = httpClient;
  }
  
  getProfile(token: string): Promise<UserModel> {
      this.httpClient.get({
        url: this.url,
        headers: {
        ...(token && { Authorization: `Bearer ${token}` })
        }
      })
      return Promise.resolve({
        id: faker.number.int(),
        name: faker.person.firstName(),
        email: faker.internet.email(),
        image: faker.image.urlLoremFlickr(),
        createdAt: faker.date.anytime().toISOString(),
        updatedAt: faker.date.anytime().toISOString(),
      })
  }
}