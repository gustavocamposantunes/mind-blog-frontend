import type { ArticleListModel } from '../models'
import type { HttpRemoteResponse } from '@/data/protocols'

export interface ListArticlesUseCase {
  listAll(): Promise<HttpRemoteResponse<ArticleListModel>>
}
