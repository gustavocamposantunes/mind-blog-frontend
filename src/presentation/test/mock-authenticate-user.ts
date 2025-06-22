import type { HttpRemoteResponse } from "@/data/protocols";
import type { AuthenticateUserModel } from "@/domain/models";
import type { AuthenticateUserUseCase, AuthParams } from "@/domain/usecases";

import { mockAuthenticateUserModel } from "@/domain/test";

export class AuthenticateUserSpy implements AuthenticateUserUseCase {
  authenticationParams: AuthParams | undefined;
  async auth(authenticationParams: AuthParams): Promise<HttpRemoteResponse<AuthenticateUserModel>> {
    this.authenticationParams = authenticationParams

    return Promise.resolve({
      statusCode: 200,
      data: mockAuthenticateUserModel()
    })
  }
}