import type { HttpRemoteResponse } from "@/data/protocols";
import type { FavouriteModel } from "@/domain/models";
import type { FavouriteArticleUseCase } from "@/domain/usecases";

export class FavouriteArticleSpy implements FavouriteArticleUseCase {
  favouriteCount = 10
  async favorite(): Promise<HttpRemoteResponse<FavouriteModel>> {
      return Promise.resolve({
        statusCode: 201,
        data: {
          favouriteCount: this.favouriteCount,
          favourited: true
        }
      })
  }
}