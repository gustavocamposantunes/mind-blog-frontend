import { HttpStatusCode, type HttpPostClient, type HttpPostParams, type HttpResponse } from "../protocols";

export class HttpPostClientMock implements HttpPostClient {
  url?: string;
  body?: object;
  headers?: Record<string, string>;
  response: HttpResponse = {
    status: HttpStatusCode.created
  }

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    this.headers = params.headers;

    return this.response;
  }
}