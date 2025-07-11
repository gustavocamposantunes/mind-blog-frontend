import type { HttpRemoteResponse } from "@/data/protocols";
import type { FavouriteModel } from "@/domain/models";
import { mockFavouriteArticle } from "@/domain/test";
import type { FavouriteArticleUseCase } from "@/domain/usecases";

export class FavouriteArticleSpy implements FavouriteArticleUseCase {
  async favorite(): Promise<HttpRemoteResponse<FavouriteModel>> {
      return Promise.resolve({
        statusCode: 201,
        data: mockFavouriteArticle()
      })
  }
}