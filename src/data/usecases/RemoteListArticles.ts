import { type HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { NotFoundError } from "@/domain/errors";

import type { ArticleModel } from "@/domain/models";
import type { ListArticlesUseCase } from "@/domain/usecases";

export class RemoteListArticles implements ListArticlesUseCase {
  private readonly url: string;
  private readonly httpClient: HttpGetClient;

  constructor(
    url: string,
    httpClient: HttpGetClient
  ) {
    this.url = url;
    this.httpClient = httpClient;
  }
  async listAll(): Promise<{
    posts: ArticleModel[];
    total: number;
    limit: number;
    page: number;
  }> {
    const httpResponse = await this.httpClient.get({ url: this.url })

    switch(httpResponse.status) {
      case HttpStatusCode.notFound: throw new NotFoundError();
      default: return httpResponse.data as Promise<{
        posts: ArticleModel[];
        total: number;
        limit: number;
        page: number;
      }>
    }
  }
}