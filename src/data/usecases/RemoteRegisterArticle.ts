import type { ArticleModel } from "@/domain/models";
import { HttpStatusCode, type HttpPostClient } from "../protocols";
import type { RegisterArticleParams, RegisterArticleUseCase } from "@/domain/usecases";

export class RemoteRegisterPost implements RegisterArticleUseCase {
  private readonly url: string;
  private readonly httpClient: HttpPostClient;

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async register(registerArticleParams: RegisterArticleParams, token?: string): Promise<{
    statusCode: number;
    data?: ArticleModel;
    error?: string;
  }> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: registerArticleParams,
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
      data: data as ArticleModel
    };
  }
}
