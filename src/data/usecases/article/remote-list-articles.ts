import type { ArticleListModel } from '@/domain/models'
import type { ListArticleParams, ListArticlesUseCase } from '@/domain/usecases'

import { normalizeArticleList } from './normalize-article'

import {
  type HttpGetClient,
  type HttpRemoteResponse,
  HttpStatusCode,
} from '@/data/protocols'
import { buildRemoteResponse, throwMappedHttpError } from '@/data/usecases/http'

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

    if (status === HttpStatusCode.ok) {
      return buildRemoteResponse(
        status,
        normalizeArticleList(data as ArticleListModel),
      )
    }

    return throwMappedHttpError(status, { notFound: true })
  }
}
