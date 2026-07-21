import type { ArticleModel } from '@/domain/models'
import type {
  RegisterArticleParams,
  RegisterArticleUseCase,
} from '@/domain/usecases'

import {
  HttpStatusCode,
  type HttpPostClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import { buildRemoteResponse, throwMappedHttpError } from '@/data/usecases/http'

export class RemoteRegisterArticle implements RegisterArticleUseCase {
  private readonly url: string
  private readonly httpClient: HttpPostClient

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async register(
    registerArticleParams: RegisterArticleParams,
    token?: string,
  ): Promise<HttpRemoteResponse<ArticleModel>> {
    const { status, data } = await this.httpClient.post({
      url: this.url,
      body: registerArticleParams,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    if (status === HttpStatusCode.created) {
      return buildRemoteResponse(status, data as ArticleModel)
    }

    return throwMappedHttpError(status)
  }
}
