import { useMutation } from '@tanstack/react-query'

import type { FavouriteArticleUseCase } from '@/domain/usecases'

export const useFavouriteArticle = (
  favouriteArticle: FavouriteArticleUseCase,
) => {
  return useMutation({
    mutationFn: async ({ id, token }: { id: number; token: string }) => {
      const result = await favouriteArticle.favorite(id, token)

      return result.data
    },
  })
}
