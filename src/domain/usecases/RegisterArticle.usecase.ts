import type { ArticleModel } from "../models";
import type { HttpRemoteResponse } from "@/data/protocols";

export type RegisterArticleParams = {
  title: string;
  content: string;
  image?: string;
  author_id: number;
}

export interface RegisterArticleUseCase {
  register(registerPostParams: RegisterArticleParams, token?: string): Promise<HttpRemoteResponse<ArticleModel>>
}