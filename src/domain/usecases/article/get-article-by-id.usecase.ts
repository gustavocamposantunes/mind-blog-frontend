import type { ArticleModel } from '../models/ArticleModel'
import type { HttpRemoteResponse } from '@/data/protocols'

export interface GetArticleByIdUseCase {
  getById(id: string): Promise<HttpRemoteResponse<ArticleModel>>
}
