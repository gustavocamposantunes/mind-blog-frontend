import type { PostModel } from "../models";

export type RegisterPostParams = {
  title: string;
  content: string;
  author_id: number;
}

export interface RegisterPostUseCase {
  register(registerPostParams: RegisterPostParams, token?: string): Promise<{
    statusCode: number;
    data?: PostModel;
    error?: string;
  }>
}