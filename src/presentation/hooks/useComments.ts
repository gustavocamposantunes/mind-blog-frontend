import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type {
  CommentArticleParams,
  CommentArticleUseCase,
  ListCommentsByArticleIdUseCase,
} from '@/domain/usecases'

export const useComments = (
  listCommentsByArticleId: ListCommentsByArticleIdUseCase,
  commentArticle: CommentArticleUseCase,
  articleId?: number,
  accessToken?: string,
) => {
  const queryClient = useQueryClient()
  const queryKey = ['comments', articleId]

  const commentsQuery = useQuery({
    queryKey,
    enabled: Boolean(articleId),
    queryFn: async () => {
      const result = await listCommentsByArticleId.listByArticleId(
        articleId as number,
      )
      return result.data ?? []
    },
  })

  const commentMutation = useMutation({
    mutationFn: async (params: CommentArticleParams) => {
      await commentArticle.comment(params, accessToken ?? '')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey })
      toast.info('Comentário publicado')
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Erro inesperado')
    },
  })

  return {
    commentsQuery,
    commentMutation,
  }
}
