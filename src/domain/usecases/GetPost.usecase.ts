import type { PostModel } from "../models/PostModel";

export interface GetPostUseCase {
  fetch(id: string): Promise<PostModel>
}