import type { HttpRemoteResponse } from '@/data/protocols'
import type { DeleteArticleByIdUseCase } from '@/domain/usecases/article/delete-article-by-id.usecase'

export class DeleteArticleSpy implements DeleteArticleByIdUseCase {
  deleteById(
    id: number,
    token: string,
  ): Promise<HttpRemoteResponse<{ message: string }>> {
    console.info(`DeleteArticleSpy chamado com id: ${id} e token: ${token}`)
    return Promise.resolve({
      statusCode: 200,
      data: {
        message: 'Artigo deletado com sucesso',
      },
    })
  }
}
