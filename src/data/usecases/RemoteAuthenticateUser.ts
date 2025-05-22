import type { AuthenticateUserModel } from "@/domain/models";
import type { AuthenticateUserUseCase, AuthParams } from "@/domain/usecases/AuthenticateUserUseCase";
import { HttpStatusCode, type HttpPostClient } from "../protocols";

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

    if (status === HttpStatusCode.unauthorized) {
      return {
        statusCode: status,
        error: "Credenciais inválidas"
      };
    }

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
