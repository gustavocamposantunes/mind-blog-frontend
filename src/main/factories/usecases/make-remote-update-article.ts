import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { UpdateArticleUseCase } from '@/domain/usecases'

import { RemoteUpdateArticle } from '@/data/usecases'

export const makeRemoteUpdateArticle = (): UpdateArticleUseCase =>
  new RemoteUpdateArticle(makeApiUrl('/articles'), makeAxiosHttpClient())
