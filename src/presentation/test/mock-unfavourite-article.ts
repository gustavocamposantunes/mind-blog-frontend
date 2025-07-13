import type { HttpRemoteResponse } from '@/data/protocols'
import type { FavouriteModel } from '@/domain/models'
import type { UnfavouriteArticleUseCase } from '@/domain/usecases/article/unfavorite-article.usecase'

import { mockFavouriteArticle } from '@/domain/test'

export class UnfavouriteArticleSpy implements UnfavouriteArticleUseCase {
  async unfavourite(): Promise<HttpRemoteResponse<FavouriteModel>> {
    return Promise.resolve({
      statusCode: 200,
      data: mockFavouriteArticle(),
    })
  }
}
