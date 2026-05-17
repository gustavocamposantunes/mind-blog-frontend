import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { FavouriteArticleUseCase } from '@/domain/usecases'

export const useFavouriteArticle = (
  favouriteArticle: FavouriteArticleUseCase,
  accessToken: string,
) => {
  const { mutateAsync } = useMutation({
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

  const favoriteById = async (articleId: number, favourite: () => boolean) => {
    try {
      await mutateAsync({
        articleId,
        token: accessToken,
      })

      const isFavourited = favourite()
      toast.info(
        `Artigo ${isFavourited ? 'removido dos' : 'adicionado aos'} favoritos`,
      )
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro inesperado')
    }
  }

  return { mutateAsync, favoriteById }
}
