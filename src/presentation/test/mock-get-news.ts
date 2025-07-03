import type { HttpRemoteResponse } from '@/data/protocols'
import type { NewsModel } from '@/domain/models'
import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

import { mockNews } from '@/domain/test'

export class GetNewsSpy implements GetNewsUseCase {
  private readonly timeout: number
  news = mockNews()
  promise = undefined

  constructor(timeout = 0) {
    this.timeout = timeout
  }

  getNews(): Promise<HttpRemoteResponse<NewsModel>> {
    setTimeout(() => {}, this.timeout)
    return Promise[this.promise ?? 'resolve']({
      statusCode: 200,
      data: this.news,
    })
  }
}
