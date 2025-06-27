import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleModel } from '@/domain/models'
import type {
  RegisterArticleParams,
  RegisterArticleUseCase,
} from '@/domain/usecases'

import { mockArticle, mockRegisterArticleParams } from '@/domain/test'

export class RegisterArticleSpy implements RegisterArticleUseCase {
  registerPostParams = mockRegisterArticleParams()
  token: string | undefined
  async register(
    registerPostParams: RegisterArticleParams,
    token?: string,
  ): Promise<HttpRemoteResponse<ArticleModel>> {
    this.registerPostParams = registerPostParams
    this.token = token
    return Promise.resolve({
      statusCode: 201,
      data: mockArticle(),
    })
  }
}
