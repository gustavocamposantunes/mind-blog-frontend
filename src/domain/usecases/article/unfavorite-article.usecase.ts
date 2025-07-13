import type { HttpRemoteResponse } from '@/data/protocols'
import type { FavouriteModel } from '@/domain/models'

export interface UnfavouriteArticleUseCase {
  unfavourite(
    id: number,
    token: string,
  ): Promise<HttpRemoteResponse<FavouriteModel>>
}
