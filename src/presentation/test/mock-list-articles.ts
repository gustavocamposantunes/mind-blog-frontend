import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleListModel } from '@/domain/models'
import type { ListArticleParams, ListArticlesUseCase } from '@/domain/usecases'

import { mockArticlesList } from '@/domain/test'

export class ListArticlesSpy implements ListArticlesUseCase {
  articlesList: ArticleListModel
  page = 1
  limit = 10
  userId?: number
  constructor(articleList?: ArticleListModel) {
    this.articlesList = articleList ?? mockArticlesList()
  }

  async listAll(
    params: ListArticleParams,
  ): Promise<HttpRemoteResponse<ArticleListModel>> {
    this.page = params.page
    this.limit = params.limit
    this.userId = params.userId

    const articles = params.userId
      ? this.articlesList.articles.filter(
          (article) => article.author.id === params.userId,
        )
      : this.articlesList.articles

    return Promise.resolve({
      statusCode: 200,
      data: {
        ...this.articlesList,
        articles,
        total: params.userId ? articles.length : this.articlesList.total,
      },
    })
  }
}
