import type { ArticleModel } from "../models";

export type RegisterArticleParams = {
  title: string;
  content: string;
  author_id: number;
}

export interface RegisterArticleUseCase {
  register(registerPostParams: RegisterArticleParams, token?: string): Promise<{
    statusCode: number;
    data?: ArticleModel;
    error?: string;
  }>
}