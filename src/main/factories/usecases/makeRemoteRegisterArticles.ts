import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { RegisterArticleUseCase } from '@/domain/usecases'

import { RemoteRegisterArticle } from '@/data/usecases/RemoteRegisterArticle'

export const makeRemoteRegisterArticle = (): RegisterArticleUseCase =>
  new RemoteRegisterArticle(makeApiUrl('/articles'), makeAxiosHttpClient())
