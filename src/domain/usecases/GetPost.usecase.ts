import type { PostModel } from "../models/PostModel";

export interface GetPostByIdUseCase {
  getById(id: string): Promise<PostModel>
}