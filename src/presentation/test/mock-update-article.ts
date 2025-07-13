import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleModel } from '@/domain/models'
import type {
  UpdateArticleParams,
  UpdateArticleUseCase,
} from '@/domain/usecases'

import { mockArticle, mockUpdateArticleParams } from '@/domain/test'

export class UpdateArticleSpy implements UpdateArticleUseCase {
  token?: string
  article = mockArticle()
  params = mockUpdateArticleParams()
  async update(
    token: string,
    params: UpdateArticleParams,
  ): Promise<HttpRemoteResponse<ArticleModel>> {
    this.token = token
    this.params = params

    return Promise.resolve({
      statusCode: 200,
      data: this.article,
    })
  }
}
