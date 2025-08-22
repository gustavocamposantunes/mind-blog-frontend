import { useMutation } from '@tanstack/react-query'

import type { FavouriteArticleUseCase } from '@/domain/usecases'

export const useFavouriteArticle = (
  favouriteArticle: FavouriteArticleUseCase,
) => {
  return useMutation({
    mutationFn: async ({
      articleId,
      token,
    }: {
      articleId: number
      token: string
    }) => {
      const result = await favouriteArticle.favorite(articleId, token)

      return result.data
    },
  })
}
