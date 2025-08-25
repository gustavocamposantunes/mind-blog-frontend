import { HttpStatusCode, type HttpDeleteClient } from '@/data/protocols'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

export class RemoteDeleteArticleById {
  private readonly url: string
  private readonly httpDeleteClient: HttpDeleteClient

  constructor(url: string, httpDeleteClient: HttpDeleteClient) {
    this.url = url
    this.httpDeleteClient = httpDeleteClient
  }

  async deleteById(articleId: string) {
    const { status } = await this.httpDeleteClient.delete({
      url: `${this.url}/${articleId}`,
    })

    switch (status) {
      case HttpStatusCode.ok:
        return {}
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
