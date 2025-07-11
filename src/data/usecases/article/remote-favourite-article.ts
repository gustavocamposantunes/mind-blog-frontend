import type { HttpPostClient } from "@/data/protocols";
import type { FavouriteModel } from "@/domain/models";
import type { FavouriteArticleUseCase } from "@/domain/usecases";

export class RemoteFavouriteArticle implements FavouriteArticleUseCase {
  private readonly url: string
  private readonly httpClient: HttpPostClient

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async favorite(id: number, token: string): Promise<FavouriteModel> {
    this.httpClient.post({
      url: this.url,
      body: {
        id
      },
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    return Promise.resolve({}) as unknown as FavouriteModel
  }
}