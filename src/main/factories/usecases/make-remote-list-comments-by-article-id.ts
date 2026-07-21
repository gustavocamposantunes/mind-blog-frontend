import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { ListCommentsByArticleIdUseCase } from '@/domain/usecases'

import { RemoteListCommentsByArticleId } from '@/data/usecases'

export const makeRemoteListCommentsByArticleId =
  (): ListCommentsByArticleIdUseCase =>
    new RemoteListCommentsByArticleId(
      makeApiUrl('/comments'),
      makeAxiosHttpClient(),
    )
