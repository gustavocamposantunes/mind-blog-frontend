import type { ArticleModel } from '@/domain/models'
import type { UnfavouriteArticleUseCase } from '@/domain/usecases/article/unfavorite-article.usecase'

import { HttpStatusCode, type HttpDeleteClient } from '@/data/protocols'
import {
  InternalServerError,
  InvalidCredentialsError,
  UnexpectedError,
} from '@/domain/errors'

export class RemoteUnfavouriteArticle implements UnfavouriteArticleUseCase {
  private readonly url: string
  private readonly httpClient: HttpDeleteClient

  constructor(url: string, httpClient: HttpDeleteClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async unfavourite(id: number, token: string) {
    const { status, data } = await this.httpClient.delete({
      url: this.url,
      body: {
        id,
      },
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
