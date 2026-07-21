import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { CommentArticleUseCase } from '@/domain/usecases'

import { RemoteCommentArticle } from '@/data/usecases'

export const makeRemoteCommentArticle = (): CommentArticleUseCase =>
  new RemoteCommentArticle(makeApiUrl('/comments'), makeAxiosHttpClient())
