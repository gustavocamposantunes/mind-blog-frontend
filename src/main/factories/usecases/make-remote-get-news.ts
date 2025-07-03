import { makeApiUrlWithParams, makeAxiosHttpClient } from '../http'

import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

import { RemoteGetNews } from '@/data/usecases/news'

export const makeRemoteGetNews = (): GetNewsUseCase => {
  const url = makeApiUrlWithParams(
    '/top-headlines',
    {
      category: 'technology',
      pageSize: '5',
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
    },
    'news',
  )

  return new RemoteGetNews(url, makeAxiosHttpClient())
}
