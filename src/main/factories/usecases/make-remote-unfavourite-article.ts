import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { UnfavouriteArticleUseCase } from '@/domain/usecases'

import { RemoteUnfavouriteArticle } from '@/data/usecases'

export const makeRemoteUnfavouriteArticle = (): UnfavouriteArticleUseCase =>
  new RemoteUnfavouriteArticle(makeApiUrl('/favourite'), makeAxiosHttpClient())
