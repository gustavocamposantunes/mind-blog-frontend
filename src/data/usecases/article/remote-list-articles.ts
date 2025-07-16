import type { ArticleListModel } from '@/domain/models'
import type { ListArticleParams, ListArticlesUseCase } from '@/domain/usecases'

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
  async listAll(
    params: ListArticleParams,
  ): Promise<HttpRemoteResponse<ArticleListModel>> {
    const { status, data } = await this.httpClient.get({
      url: this.url,
      queryParams: params,
    })

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as ArticleListModel,
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
