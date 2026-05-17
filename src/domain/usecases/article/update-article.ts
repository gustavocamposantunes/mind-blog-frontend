import type { HttpRemoteResponse } from '@/data/protocols'
import type { ArticleModel } from '@/domain/models'

export type UpdateArticleParams = {
  id: number
  title?: string
  resume?: string
  content?: string
  image?: string
  category?: string
  tags?: string[]
}

export interface UpdateArticleUseCase {
  update(
    token: string,
    params: UpdateArticleParams,
  ): Promise<HttpRemoteResponse<ArticleModel>>
}
