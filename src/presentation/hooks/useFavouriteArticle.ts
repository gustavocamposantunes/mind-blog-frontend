import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { FavouriteArticleUseCase } from '@/domain/usecases'

export const useFavouriteArticle = (
  favouriteArticle: FavouriteArticleUseCase,
  accessToken: string,
) => {
  const { mutate } = useMutation({
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

  const favoriteById = (articleId: number, favourite: () => boolean) => {
    mutate(
      {
        articleId,
        token: accessToken,
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
          const isFavourited = favourite()
          toast.info(
            `Artigo ${isFavourited ? 'removido dos' : 'adicionado aos'} favoritos`,
          )
        },
      },
    )
  }

  return { mutate, favoriteById }
}
