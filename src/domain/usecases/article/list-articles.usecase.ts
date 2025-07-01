import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleListModel } from '@/domain/models'

export interface ListArticlesUseCase {
  listAll(): Promise<HttpRemoteResponse<ArticleListModel>>
}
