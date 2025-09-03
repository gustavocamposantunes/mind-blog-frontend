import type { HttpRemoteResponse } from '@/data/protocols'

export interface DeleteArticleByIdUseCase {
  deleteById(
    id: number,
    token: string,
  ): Promise<HttpRemoteResponse<{ message: string }>>
}
