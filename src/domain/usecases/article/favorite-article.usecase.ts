import type { HttpRemoteResponse } from '@/data/protocols'
import type { FavouriteModel } from '@/domain/models'

export interface FavouriteArticleUseCase {
  favorite(
    id: number,
    token: string,
  ): Promise<HttpRemoteResponse<FavouriteModel>>
}
