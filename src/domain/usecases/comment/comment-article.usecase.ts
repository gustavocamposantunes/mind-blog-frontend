import type { HttpRemoteResponse } from '@/data/protocols'

export type CommentArticleParams = {
  article_id: number
  content: string
}

export interface CommentArticleUseCase {
  comment(
    params: CommentArticleParams,
    token: string,
  ): Promise<HttpRemoteResponse<void>>
}
