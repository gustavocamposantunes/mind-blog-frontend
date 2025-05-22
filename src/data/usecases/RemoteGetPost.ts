import { type HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { NotFoundError } from "@/domain/errors";

import type { PostModel } from "@/domain/models";
import type { GetPostUseCase } from "@/domain/usecases";

export class RemoteGetPost implements GetPostUseCase, GetPostUseCase {
  private readonly url: string;
  private readonly httpClient: HttpGetClient;

  constructor(
    url: string,
    httpClient: HttpGetClient
  ) {
    this.url = url;
    this.httpClient = httpClient;
  }
  async fetch(id: string): Promise<PostModel> {
    const httpResponse = await this.httpClient.get({ url: `${this.url}/${id}` })

    switch(httpResponse.status) {
      case HttpStatusCode.notFound: throw new NotFoundError();
      default: return httpResponse.data as PostModel
    }
  }
}