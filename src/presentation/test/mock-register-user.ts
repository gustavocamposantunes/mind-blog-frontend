import type { HttpRemoteResponse } from "@/data/protocols";
import type { AuthenticateUserModel } from "@/domain/models";
import { mockAuthenticateUserModel } from "@/domain/test";
import type { RegisterUserParams, RegisterUserUseCase } from "@/domain/usecases";

export class RegisterUserSpy implements RegisterUserUseCase {
  regusterUserParams?: object
  register(registerUserParams: RegisterUserParams): Promise<HttpRemoteResponse<AuthenticateUserModel>> {
    this.regusterUserParams = registerUserParams
      return Promise.resolve({
        statusCode: 201,
        data: mockAuthenticateUserModel()
      })
  }
}

