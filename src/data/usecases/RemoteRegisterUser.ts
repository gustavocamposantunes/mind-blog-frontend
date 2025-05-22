import type { AuthenticateUserModel } from "@/domain/models";
import type { AuthParams } from "@/domain/usecases/AuthenticateUserUseCase";
import { HttpStatusCode, type HttpPostClient } from "../protocols";
import type { RegisterUserUseCase } from "@/domain/usecases/RegisterUser.usecase";

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
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: authenticationParams
    });

    const { status, data } = httpResponse;

    if (status === HttpStatusCode.notFound) {
      return {
        statusCode: status,
        error: "Recurso não encontrado"
      };
    }

    if (status >= 400) {
      return {
        statusCode: status,
        error: "Erro inesperado"
      };
    }

    return {
      statusCode: status,
      data: data as AuthenticateUserModel
    };
  }
}
