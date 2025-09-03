import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { DeleteArticleByIdUseCase } from '@/domain/usecases'

import { RemoteDeleteArticleById } from '@/data/usecases/article/remote-delete-article-by-id'

export const makeRemoteDeleteArticle = (): DeleteArticleByIdUseCase =>
  new RemoteDeleteArticleById(makeApiUrl('/articles'), makeAxiosHttpClient())
