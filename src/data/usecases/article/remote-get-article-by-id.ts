import type { ArticleModel } from '@/domain/models'
import type { GetArticleByIdUseCase } from '@/domain/usecases'

import {
  type HttpGetClient,
  type HttpRemoteResponse,
  HttpStatusCode,
} from '@/data/protocols'
import {
  InternalServerError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

export class RemoteGetArticleById implements GetArticleByIdUseCase {
  private readonly url: string
  private readonly httpClient: HttpGetClient

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url
    this.httpClient = httpClient
  }
  async getById(id: string): Promise<HttpRemoteResponse<ArticleModel>> {
    const { status, data } = await this.httpClient.get({
      url: `${this.url}/${id}`,
    })

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as ArticleModel,
        }
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      case HttpStatusCode.serverError:
        throw new InternalServerError()
      default:
        throw new UnexpectedError()
    }
  }
}
