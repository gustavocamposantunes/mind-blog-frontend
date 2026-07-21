import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleModel } from '@/domain/models'
import type { GetArticleByIdUseCase } from '@/domain/usecases'

import { mockArticle } from '@/domain/test'

export class GetArticleByIdSpy implements GetArticleByIdUseCase {
  id: string = '0'
  userId?: number
  data: ArticleModel
  constructor(favourited: boolean = false, author_id?: number) {
    this.data = mockArticle(true, favourited, author_id)
  }
  async getById(
    id: string,
    userId?: number,
  ): Promise<HttpRemoteResponse<ArticleModel>> {
    this.id = id
    this.userId = userId
    return Promise.resolve({
      statusCode: 200,
      data: this.data,
    })
  }
}
