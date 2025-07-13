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
        return {
          statusCode: status,
          error: new InternalServerError().message,
        }
      case HttpStatusCode.forbidden:
        return {
          statusCode: status,
          error: new InvalidCredentialsError().message,
        }
      default:
        return {
          statusCode: status,
          error: new UnexpectedError().message,
        }
    }
  }
}
