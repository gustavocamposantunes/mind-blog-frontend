import type { NewsModel } from '@/domain/models'
import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

import {
  HttpStatusCode,
  type HttpGetClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'

export class RemoteGetNews implements GetNewsUseCase {
  private readonly url: string
  private readonly httpClient: HttpGetClient

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async getNews(): Promise<HttpRemoteResponse<NewsModel>> {
    const { status, data } = await this.httpClient.get({
      url: this.url,
    })

    switch (status) {
      case HttpStatusCode.ok:
        return {
          statusCode: status,
          data: data as NewsModel,
        }
      default:
        return {
          statusCode: status,
          error: new UnexpectedError().message,
        }
    }
  }
}
