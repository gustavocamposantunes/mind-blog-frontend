import type { DeleteArticleById } from '@/domain/usecases/article/delete-article-by-id.usecase'

import {
  HttpStatusCode,
  type HttpDeleteClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

export class RemoteDeleteArticleById implements DeleteArticleById {
  private readonly url: string
  private readonly httpDeleteClient: HttpDeleteClient

  constructor(url: string, httpDeleteClient: HttpDeleteClient) {
    this.url = url
    this.httpDeleteClient = httpDeleteClient
  }

  async deleteById(
    articleId: string,
  ): Promise<HttpRemoteResponse<{ message: string }>> {
    const { status, data } = await this.httpDeleteClient.delete({
      url: `${this.url}/${articleId}`,
    })

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as { message: string },
        }
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
