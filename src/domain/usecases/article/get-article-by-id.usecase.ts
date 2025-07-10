import type { ArticleModel } from '@/domain/models'
import type { HttpRemoteResponse } from '@/data/protocols'

export interface GetArticleByIdUseCase {
  getById(id: string): Promise<HttpRemoteResponse<ArticleModel>>
}
