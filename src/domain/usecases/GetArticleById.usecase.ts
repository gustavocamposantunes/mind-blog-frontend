import type { ArticleModel } from "../models/ArticleModel";

export interface GetArticleByIdUseCase {
  getById(id: string): Promise<ArticleModel>
}