import type { CommentModel } from '@/domain/models'
import type { ListCommentsByArticleIdUseCase } from '@/domain/usecases'

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

export class RemoteListCommentsByArticleId
  implements ListCommentsByArticleIdUseCase
{
  private readonly url: string
  private readonly httpClient: HttpGetClient

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async listByArticleId(
    articleId: number,
  ): Promise<HttpRemoteResponse<CommentModel[]>> {
    const { status, data } = await this.httpClient.get({
      url: `${this.url}/${articleId}/comments`,
    })

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as CommentModel[],
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
