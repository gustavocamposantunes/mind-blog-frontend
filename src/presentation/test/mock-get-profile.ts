import type { HttpRemoteResponse } from "@/data/protocols";
import type { UserModel } from "@/domain/models";
import type { GetProfileUseCase } from "@/domain/usecases";

import { mockUser } from "@/domain/test";

export class GetProfileSpy implements GetProfileUseCase {
  token?: string;
  user = mockUser();
  getProfile(token: string): Promise<HttpRemoteResponse<UserModel>> {
      this.token = token;
      return Promise.resolve({
        statusCode: 200,
        data: this.user
      })
  }
}