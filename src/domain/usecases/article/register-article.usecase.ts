import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleModel } from '@/domain/models'

export type RegisterArticleParams = {
  title: string
  content: string
  image?: string
  category: string
  tags: string[]
  author_id: number
}

export interface RegisterArticleUseCase {
  register(
    registerPostParams: RegisterArticleParams,
    token?: string,
  ): Promise<HttpRemoteResponse<ArticleModel>>
}
