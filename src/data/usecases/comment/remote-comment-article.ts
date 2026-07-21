import type {
  CommentArticleParams,
  CommentArticleUseCase,
} from '@/domain/usecases'

import {
  type HttpPostClient,
  type HttpRemoteResponse,
  HttpStatusCode,
} from '@/data/protocols'
import { buildRemoteResponse, throwMappedHttpError } from '@/data/usecases/http'

export class RemoteCommentArticle implements CommentArticleUseCase {
  private readonly url: string
  private readonly httpClient: HttpPostClient

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async comment(
    params: CommentArticleParams,
    token: string,
  ): Promise<HttpRemoteResponse<void>> {
    const { status } = await this.httpClient.post({
      url: this.url,
      body: params,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    if (status === HttpStatusCode.created) {
      return buildRemoteResponse(status, undefined)
    }

    return throwMappedHttpError(status, { credentials: true })
  }
}
