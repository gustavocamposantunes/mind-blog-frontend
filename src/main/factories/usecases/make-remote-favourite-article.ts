import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { FavouriteArticleUseCase } from '@/domain/usecases'

import { RemoteFavouriteArticle } from '@/data/usecases'

export const makeRemoteFavouriteArticle = (): FavouriteArticleUseCase =>
  new RemoteFavouriteArticle(
    makeApiUrl('/articles/favorite'),
    makeAxiosHttpClient(),
  )
