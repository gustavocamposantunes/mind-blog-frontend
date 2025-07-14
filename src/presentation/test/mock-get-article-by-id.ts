import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleModel } from '@/domain/models'
import type { GetArticleByIdUseCase } from '@/domain/usecases'

import { mockArticle } from '@/domain/test'

export class GetArticleByIdSpy implements GetArticleByIdUseCase {
  id: string = '0'
  data: ArticleModel
  constructor(favourited: boolean = false, author_id?: number) {
    this.data = mockArticle(true, favourited, author_id)
  }
  async getById(id: string): Promise<HttpRemoteResponse<ArticleModel>> {
    this.id = id
    return Promise.resolve({
      statusCode: 200,
      data: this.data,
    })
  }
}
