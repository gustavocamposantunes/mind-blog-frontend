import type { AuthenticateUserModel } from "@/domain/models";
import type { AuthParams } from "@/domain/usecases/AuthenticateUserUseCase";
import { HttpStatusCode, type HttpPostClient } from "../protocols";
import type { RegisterUserUseCase } from "@/domain/usecases/RegisterUser.usecase";
import { InternalServerError, UnexpectedError } from "@/domain/errors";

export class RemoteRegisterUser implements RegisterUserUseCase {
  private readonly url: string;
  private readonly httpClient: HttpPostClient;

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async register(authenticationParams: AuthParams): Promise<{
    statusCode: number;
    data?: AuthenticateUserModel;
    error?: string;
  }> {
    const { status, data } = await this.httpClient.post({
      url: this.url,
      body: authenticationParams
    });

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as AuthenticateUserModel
        };
      case HttpStatusCode.serverError:
        return {
          statusCode: status,
          error: new InternalServerError().message
        };
      default:
        return {
          statusCode: status,
          error: new UnexpectedError().message
        };
    }
  }
}
