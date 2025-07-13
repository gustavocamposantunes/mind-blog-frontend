import type { HttpDeleteClient } from '@/data/protocols'

export class RemoteUnfavouriteArticle {
  private readonly url: string
  private readonly httpClient: HttpDeleteClient

  constructor(url: string, httpClient: HttpDeleteClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async unfavourite(id: number, token: string) {
    await this.httpClient.delete({
      url: this.url,
      body: {
        id,
      },
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
  }
}
