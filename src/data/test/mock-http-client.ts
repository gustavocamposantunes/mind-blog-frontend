import { HttpStatusCode, type HttpGetClient, type HttpGetParams, type HttpPostClient, type HttpPostParams, type HttpResponse } from "../protocols";

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

export class HttpGetClientSpy implements HttpGetClient {
  url?: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  response: HttpResponse = {
    status: HttpStatusCode.ok,
    data: {}
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.url = params.url;
    this.queryParams = params.queryParams;

    return this.response;
  }
}