import type { HttpRemoteResponse } from '@/data/protocols'
import type { FavouriteModel } from '@/domain/models'

export interface FavouriteArticleUseCase {
  favorite(
    articleId: number,
    token: string,
  ): Promise<HttpRemoteResponse<FavouriteModel>>
}
