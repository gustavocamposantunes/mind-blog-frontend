import type { PostModel } from "../models/PostModel";

export interface ListPostsUseCase {
  listAll(): Promise<PostModel[]>
}