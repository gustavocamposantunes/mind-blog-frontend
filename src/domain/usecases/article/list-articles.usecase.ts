import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleListModel, Filters } from '@/domain/models'

export type ListArticleParams = {
  page: number
  limit: number
  filters?: Array<Filters>
}

export interface ListArticlesUseCase {
  listAll(
    params: ListArticleParams,
  ): Promise<HttpRemoteResponse<ArticleListModel>>
}
