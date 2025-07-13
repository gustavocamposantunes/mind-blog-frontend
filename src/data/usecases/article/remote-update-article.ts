import type { HttpPutClient } from '@/data/protocols'

export class RemoteUpdateArticle {
  private readonly url: string
  private readonly httpClient: HttpPutClient

  constructor(url: string, httpClient: HttpPutClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async update(
    token: string,
    updateArticleParams: { title?: string; content?: string; image?: string },
  ) {
    await this.httpClient.put({
      url: this.url,
      body: updateArticleParams,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
  }
}
