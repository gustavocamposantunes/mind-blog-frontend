import type { NewsModel } from '@/domain/models'
import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

import {
  HttpStatusCode,
  type HttpGetClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import { buildRemoteResponse, throwMappedHttpError } from '@/data/usecases/http'

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

    if (status === HttpStatusCode.ok) {
      return buildRemoteResponse(status, data as NewsModel)
    }

    return throwMappedHttpError(status)
  }
}
