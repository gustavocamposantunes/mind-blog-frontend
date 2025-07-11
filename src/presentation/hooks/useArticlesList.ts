import { useQuery } from '@tanstack/react-query'

import type { ListArticlesUseCase } from '@/domain/usecases'

export const useArticlesList = (loadArticlesList: ListArticlesUseCase) => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data } = await loadArticlesList.listAll()
      return data
    },
  })
}
