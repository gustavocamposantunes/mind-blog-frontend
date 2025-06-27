import type { ArticleListModel } from '@/domain/models'
import type { ListArticlesUseCase } from '@/domain/usecases'

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

export class RemoteListArticles implements ListArticlesUseCase {
  private readonly url: string
  private readonly httpClient: HttpGetClient

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url
    this.httpClient = httpClient
  }
  async listAll(): Promise<HttpRemoteResponse<ArticleListModel>> {
    const { status, data } = await this.httpClient.get({ url: this.url })

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as ArticleListModel,
        }
      case HttpStatusCode.notFound:
        return {
          statusCode: status,
          error: new NotFoundError('Artigo não encontrado').message,
        }
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
