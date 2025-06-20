import { type HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { NotFoundError } from "@/domain/errors";

import type { ArticleModel } from "@/domain/models";
import type { GetArticleByIdUseCase } from "@/domain/usecases";

export class RemoteGetArticleById implements GetArticleByIdUseCase {
  private readonly url: string;
  private readonly httpClient: HttpGetClient;

  constructor(
    url: string,
    httpClient: HttpGetClient
  ) {
    this.url = url;
    this.httpClient = httpClient;
  }
  async getById(id: string): Promise<ArticleModel> {
    const httpResponse = await this.httpClient.get({ url: `${this.url}/${id}` })

    switch(httpResponse.status) {
      case HttpStatusCode.notFound: throw new NotFoundError();
      default: return httpResponse.data as ArticleModel
    }
  }
}