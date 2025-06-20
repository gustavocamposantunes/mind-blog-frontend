import type { AuthenticateUserModel } from "@/domain/models";
import type { AuthenticateUserUseCase, AuthParams } from "@/domain/usecases/AuthenticateUserUseCase";
import { HttpStatusCode, type HttpPostClient } from "../protocols";
import { InvalidCredentialsError, NotFoundError, UnexpectedError } from "@/domain/errors";

export class RemoteAuthenticateUser implements AuthenticateUserUseCase {
  private readonly url: string;
  private readonly httpClient: HttpPostClient;

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async auth(authenticationParams: AuthParams): Promise<{
    statusCode: number;
    data?: AuthenticateUserModel;
    error?: string;
  }> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: authenticationParams
    });

    const { status, data } = httpResponse;

    switch (status) {
      case HttpStatusCode.created:
        return {
          statusCode: status,
          data: data as AuthenticateUserModel
        };
      case HttpStatusCode.unauthorized:
        return {
          statusCode: status,
          error: new InvalidCredentialsError().message
        };
      case HttpStatusCode.notFound:
        return {
          statusCode: status,
          error: new NotFoundError().message
        };
      default:
        return {
          statusCode: status,
          error: new UnexpectedError().message
        };
    }
  }
}
