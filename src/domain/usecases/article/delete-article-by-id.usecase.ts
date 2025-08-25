import type { HttpRemoteResponse } from '@/data/protocols'

export interface DeleteArticleById {
  deleteById(id: string): Promise<HttpRemoteResponse<{ message: string }>>
}
