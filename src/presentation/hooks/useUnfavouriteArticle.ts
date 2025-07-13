import { useMutation } from '@tanstack/react-query'

import type { UnfavouriteArticleUseCase } from '@/domain/usecases'

export const useUnfavouriteArticle = (
  favouriteArticle: UnfavouriteArticleUseCase,
) => {
  return useMutation({
    mutationFn: async ({ id, token }: { id: number; token: string }) => {
      const result = await favouriteArticle.unfavourite(id, token)

      return result.data
    },
  })
}
