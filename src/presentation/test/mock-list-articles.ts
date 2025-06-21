import type { HttpRemoteResponse } from "@/data/protocols";
import type { ArticleListModel } from "@/domain/models";
import { mockArticlesList } from "@/domain/test"
import type { ListArticlesUseCase } from "@/domain/usecases"

export class listArticlesSpy implements ListArticlesUseCase {
  articlesList = mockArticlesList();
  async listAll(): Promise<HttpRemoteResponse<ArticleListModel>> {
    return Promise.resolve({
      statusCode: 200,
      data: this.articlesList
    })
  }
}