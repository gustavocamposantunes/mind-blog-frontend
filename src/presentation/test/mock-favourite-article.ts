import type { HttpRemoteResponse } from '@/data/protocols'
import type { FavouriteModel } from '@/domain/models'
import type { FavouriteArticleUseCase } from '@/domain/usecases'

import { mockFavouriteArticle } from '@/domain/test'

export class FavouriteArticleSpy implements FavouriteArticleUseCase {
  async favorite(): Promise<HttpRemoteResponse<FavouriteModel>> {
    return Promise.resolve({
      statusCode: 201,
      data: mockFavouriteArticle(),
    })
  }
}
