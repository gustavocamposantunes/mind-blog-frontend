import { useQuery } from '@tanstack/react-query'

import type { GetArticleByIdUseCase } from '@/domain/usecases'

export const useGetArticleById = (
  getArticle: GetArticleByIdUseCase,
  id: string,
) => {
  return useQuery({
    queryKey: ['article'],
    queryFn: async () => {
      const result = await getArticle.getById(id)
      return result.data
    },
  })
}
