import type { HttpRemoteResponse } from "@/data/protocols";
import type { ArticleModel } from "../models/ArticleModel";

export interface GetArticleByIdUseCase {
  getById(id: string): Promise<HttpRemoteResponse<ArticleModel>>
}