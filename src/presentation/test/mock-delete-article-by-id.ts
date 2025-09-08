/* eslint-disable @typescript-eslint/no-unused-vars */
import type { HttpRemoteResponse } from '@/data/protocols'
import type { DeleteArticleByIdUseCase } from '@/domain/usecases/article/delete-article-by-id.usecase'

export class DeleteArticleSpy implements DeleteArticleByIdUseCase {
  deleteById(
    _id: number,
    _token: string,
  ): Promise<HttpRemoteResponse<{ message: string }>> {
    return Promise.resolve({
      statusCode: 200,
      data: {
        message: 'Artigo deletado com sucesso',
      },
    })
  }
}
