import type { HttpRemoteResponse } from '@/data/protocols'
import type { CommentModel } from '@/domain/models'

export interface ListCommentsByArticleIdUseCase {
  listByArticleId(articleId: number): Promise<HttpRemoteResponse<CommentModel[]>>
}
