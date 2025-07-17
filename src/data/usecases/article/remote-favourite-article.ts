import type { FavouriteModel } from '@/domain/models'
import type { FavouriteArticleUseCase } from '@/domain/usecases'

import {
  HttpStatusCode,
  type HttpPostClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import {
  InternalServerError,
  InvalidCredentialsError,
  UnexpectedError,
} from '@/domain/errors'

export class RemoteFavouriteArticle implements FavouriteArticleUseCase {
  private readonly url: string
  private readonly httpClient: HttpPostClient

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async favorite(
    id: number,
    token: string,
  ): Promise<HttpRemoteResponse<FavouriteModel>> {
    const { status, data } = await this.httpClient.post({
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
          data: data as FavouriteModel,
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
