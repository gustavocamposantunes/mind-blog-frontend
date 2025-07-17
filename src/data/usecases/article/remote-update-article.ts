import type { ArticleModel } from '@/domain/models'
import type {
  UpdateArticleParams,
  UpdateArticleUseCase,
} from '@/domain/usecases'

import {
  HttpStatusCode,
  type HttpPutClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import {
  InternalServerError,
  InvalidCredentialsError,
  UnexpectedError,
} from '@/domain/errors'

export class RemoteUpdateArticle implements UpdateArticleUseCase {
  private readonly url: string
  private readonly httpClient: HttpPutClient

  constructor(url: string, httpClient: HttpPutClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async update(
    token: string,
    params: UpdateArticleParams,
  ): Promise<HttpRemoteResponse<ArticleModel>> {
    const { status, data } = await this.httpClient.put({
      url: this.url,
      body: params,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as ArticleModel,
        }
      case HttpStatusCode.serverError:
        throw new InternalServerError()
      case HttpStatusCode.forbidden:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
