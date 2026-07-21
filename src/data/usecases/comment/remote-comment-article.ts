import type {
  CommentArticleParams,
  CommentArticleUseCase,
} from '@/domain/usecases'

import {
  type HttpPostClient,
  type HttpRemoteResponse,
  HttpStatusCode,
} from '@/data/protocols'
import {
  InternalServerError,
  InvalidCredentialsError,
  UnexpectedError,
} from '@/domain/errors'

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

    switch (status) {
      case HttpStatusCode.created:
        return {
          statusCode: status,
          data: undefined,
        }
      case HttpStatusCode.serverError:
        throw new InternalServerError()
      case HttpStatusCode.forbidden:
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
