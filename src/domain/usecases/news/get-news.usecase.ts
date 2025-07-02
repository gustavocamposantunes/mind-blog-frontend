import type { HttpRemoteResponse } from '@/data/protocols'
import type { NewsModel } from '@/domain/models'

export interface GetNewsUseCase {
  getNews(): Promise<HttpRemoteResponse<NewsModel>>
}
