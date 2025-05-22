import type { PostModel } from "@/domain/models";
import { HttpStatusCode, type HttpPostClient } from "../protocols";
import type { RegisterPostParams, RegisterPostUseCase } from "@/domain/usecases";

export class RemoteRegisterPost implements RegisterPostUseCase {
  private readonly url: string;
  private readonly httpClient: HttpPostClient;

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async register(registerPostParams: RegisterPostParams, token?: string): Promise<{
    statusCode: number;
    data?: PostModel;
    error?: string;
  }> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: registerPostParams,
      headers: {
      ...(token && { Authorization: `Bearer ${token}` })
      }
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
      data: data as PostModel
    };
  }
}
