import { type HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { NotFoundError } from "@/domain/errors";

import type { PostModel } from "@/domain/models";
import type { ListPostsUseCase } from "@/domain/usecases";

export class RemoteListPosts implements ListPostsUseCase {
  private readonly url: string;
  private readonly httpClient: HttpGetClient;

  constructor(
    url: string,
    httpClient: HttpGetClient
  ) {
    this.url = url;
    this.httpClient = httpClient;
  }
  async listAll(): Promise<PostModel[]> {
    const httpResponse = await this.httpClient.get({ url: this.url })

    switch(httpResponse.status) {
      case HttpStatusCode.notFound: throw new NotFoundError();
      default: return httpResponse.data as PostModel[]
    }
  }
}