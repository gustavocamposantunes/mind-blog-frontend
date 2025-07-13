import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleListModel } from '@/domain/models'

export type ListArticleParams = {
  page: number
  limit: number
}

export interface ListArticlesUseCase {
  listAll(
    params: ListArticleParams,
  ): Promise<HttpRemoteResponse<ArticleListModel>>
}
