import { useQuery } from '@tanstack/react-query'

import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

export const useGetNews = (getNews: GetNewsUseCase) => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      return await getNews.getNews()
    },
  })
}
