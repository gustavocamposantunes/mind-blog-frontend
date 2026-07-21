import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleModel } from '@/domain/models'

export interface GetArticleByIdUseCase {
  getById(id: string, userId?: number): Promise<HttpRemoteResponse<ArticleModel>>
}
