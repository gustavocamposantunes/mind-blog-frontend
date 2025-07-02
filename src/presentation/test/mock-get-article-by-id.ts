import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleModel } from '@/domain/models'
import type { GetArticleByIdUseCase } from '@/domain/usecases'

import { mockArticle } from '@/domain/test'

export class GetArticleByIdSpy implements GetArticleByIdUseCase {
  id: string = '0'
  data = mockArticle(true)
  async getById(id: string): Promise<HttpRemoteResponse<ArticleModel>> {
    this.id = id
    return Promise.resolve({
      statusCode: 200,
      data: this.data,
    })
  }
}
