import type { PostModel } from "../models/PostModel";

export interface ListPostsUseCase {
  listAll(): Promise<{
    posts: PostModel[];
    total: number;
    limit: number;
    page: number;
  }>;
}