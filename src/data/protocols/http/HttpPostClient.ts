import { type HttpResponse } from "./HttpReponse";

export type HttpPostParams = {
  url: string;
  body?: object;
  headers?: Record<string, string>;
}

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>;
}
