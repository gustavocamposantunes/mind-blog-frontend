import type { HttpRemoteResponse } from '@/data/protocols'
import type { NewsModel } from '@/domain/models'
import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

import { mockNews } from '@/domain/test'

export class GetNewsSpy implements GetNewsUseCase {
  news = mockNews()
  promise = undefined

  getNews(): Promise<HttpRemoteResponse<NewsModel>> {
    return Promise[this.promise ?? 'resolve']({
      statusCode: 200,
      data: this.news,
    })
  }
}
