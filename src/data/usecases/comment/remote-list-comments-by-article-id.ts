import type { CommentModel } from '@/domain/models'
import type { ListCommentsByArticleIdUseCase } from '@/domain/usecases'

import {
  type HttpGetClient,
  type HttpRemoteResponse,
  HttpStatusCode,
} from '@/data/protocols'
import { buildRemoteResponse, throwMappedHttpError } from '@/data/usecases/http'

export class RemoteListCommentsByArticleId implements ListCommentsByArticleIdUseCase {
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

    if (status === HttpStatusCode.ok) {
      return buildRemoteResponse(status, data as CommentModel[])
    }

    return throwMappedHttpError(status, { notFound: true })
  }
}
