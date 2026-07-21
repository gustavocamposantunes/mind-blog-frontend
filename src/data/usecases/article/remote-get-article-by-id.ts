import type { ArticleModel } from '@/domain/models'
import type { GetArticleByIdUseCase } from '@/domain/usecases'

import { normalizeArticle } from './normalize-article'

import {
  type HttpGetClient,
  type HttpRemoteResponse,
  HttpStatusCode,
} from '@/data/protocols'
import { buildRemoteResponse, throwMappedHttpError } from '@/data/usecases/http'

export class RemoteGetArticleById implements GetArticleByIdUseCase {
  private readonly url: string
  private readonly httpClient: HttpGetClient

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url
    this.httpClient = httpClient
  }
  async getById(
    id: string,
    userId?: number,
  ): Promise<HttpRemoteResponse<ArticleModel>> {
    const { status, data } = await this.httpClient.get({
      url: `${this.url}/${id}`,
      queryParams: {
        userId,
      },
    })

    if (status === HttpStatusCode.ok) {
      return buildRemoteResponse(status, normalizeArticle(data as ArticleModel))
    }

    return throwMappedHttpError(status, { notFound: true })
  }
}
