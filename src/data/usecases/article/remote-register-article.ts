import type { ArticleModel } from '@/domain/models'
import type {
  RegisterArticleParams,
  RegisterArticleUseCase,
} from '@/domain/usecases'

import {
  HttpStatusCode,
  type HttpPostClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import { InternalServerError, UnexpectedError } from '@/domain/errors'

export class RemoteRegisterArticle implements RegisterArticleUseCase {
  private readonly url: string
  private readonly httpClient: HttpPostClient

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async register(
    registerArticleParams: RegisterArticleParams,
    token?: string,
  ): Promise<HttpRemoteResponse<ArticleModel>> {
    const { status, data } = await this.httpClient.post({
      url: this.url,
      body: registerArticleParams,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    switch (status) {
      case HttpStatusCode.created:
        return {
          statusCode: status,
          data: data as ArticleModel,
        }
      case HttpStatusCode.serverError: throw  new InternalServerError()
      default: throw new UnexpectedError()
    }
  }
}
