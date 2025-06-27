import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleListModel } from '@/domain/models'
import type { ListArticlesUseCase } from '@/domain/usecases'

import { mockArticlesList } from '@/domain/test'

export class ListArticlesSpy implements ListArticlesUseCase {
  articlesList = mockArticlesList()
  async listAll(): Promise<HttpRemoteResponse<ArticleListModel>> {
    return Promise.resolve({
      statusCode: 200,
      data: this.articlesList,
    })
  }
}
