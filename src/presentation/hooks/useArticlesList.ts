import { useQuery } from '@tanstack/react-query'

import type { ListArticleParams, ListArticlesUseCase } from '@/domain/usecases'

export const useArticlesList = (
  loadArticlesList: ListArticlesUseCase,
  pagination: ListArticleParams,
) => {
  return useQuery({
    queryKey: ['articles', pagination],
    queryFn: async () => {
      const { data } = await loadArticlesList.listAll(pagination)
      return data
    },
  })
}
