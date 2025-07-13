import { useMutation } from '@tanstack/react-query'

import type {
  UpdateArticleParams,
  UpdateArticleUseCase,
} from '@/domain/usecases'

export const useUpdateArticle = (
  token: string,
  updateArticle: UpdateArticleUseCase,
) => {
  return useMutation({
    mutationFn: async (params: UpdateArticleParams) => {
      const result = await updateArticle.update(token, params)

      return result.data
    },
  })
}
