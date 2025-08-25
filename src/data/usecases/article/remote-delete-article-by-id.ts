import type { HttpDeleteClient } from '@/data/protocols'

export class RemoteDeleteArticleById {
  private readonly url: string
  private readonly httpDeleteClient: HttpDeleteClient

  constructor(url: string, httpDeleteClient: HttpDeleteClient) {
    this.url = url
    this.httpDeleteClient = httpDeleteClient
  }

  async deleteById(articleId: string) {
    await this.httpDeleteClient.delete({
      url: `${this.url}/${articleId}`,
    })
  }
}
