import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { DeleteArticleByIdUseCase } from '@/domain/usecases'

export const useDeleteArticle = (
  deleteArticle: DeleteArticleByIdUseCase,
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
      const result = await deleteArticle.deleteById(articleId, token)

      return result.data
    },
  })

  const deleteById = (articleId: number) => {
    mutate(
      {
        articleId,
        token: accessToken,
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: () => toast.success('Artigo deletado com sucesso'),
      },
    )
  }

  return { mutate, deleteById }
}
