import type { ArticleModel } from "../models/ArticleModel";

export interface ListArticlesUseCase {
  listAll(): Promise<{
    posts: ArticleModel[];
    total: number;
    limit: number;
    page: number;
  }>;
}