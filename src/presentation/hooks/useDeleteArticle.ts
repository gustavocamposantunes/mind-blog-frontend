import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { DeleteArticleByIdUseCase } from '@/domain/usecases'

export const useDeleteArticle = (
  deleteArticle: DeleteArticleByIdUseCase,
  accessToken: string,
  options?: {
    onSuccess: () => void
  },
) => {
  const { mutateAsync } = useMutation({
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

  const deleteById = async (articleId: number) => {
    try {
      await mutateAsync({
        articleId,
        token: accessToken,
      })

      if (options?.onSuccess) {
        options.onSuccess()
      }
      toast.success('Artigo deletado com sucesso')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro inesperado')
    }
  }

  return { mutateAsync, deleteById }
}
