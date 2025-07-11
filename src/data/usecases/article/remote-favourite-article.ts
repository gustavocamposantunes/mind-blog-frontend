import type { FavouriteModel } from '@/domain/models'
import type { FavouriteArticleUseCase } from '@/domain/usecases'

import {
  HttpStatusCode,
  type HttpPostClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import { InternalServerError, UnexpectedError } from '@/domain/errors'

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
    const { status } = await this.httpClient.post({
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
        return Promise.resolve(
          {},
        ) as unknown as HttpRemoteResponse<FavouriteModel>
      case HttpStatusCode.serverError:
        return {
          statusCode: status,
          error: new InternalServerError().message,
        }
      default:
        return {
          statusCode: status,
          error: new UnexpectedError().message,
        }
    }
  }
}
