import { useQuery } from '@tanstack/react-query'

import type { GetArticleByIdUseCase } from '@/domain/usecases'

export const useGetArticleById = (
  getArticle: GetArticleByIdUseCase,
  id: string,
  userId?: number,
) => {
  return useQuery({
    queryKey: ['article', id, userId],
    queryFn: async () => {
      const result = await getArticle.getById(id, userId)
      return result.data
    },
  })
}
