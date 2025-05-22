import { type HttpResponse } from "./HttpReponse";

export type HttpGetParams = {
  url: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
}

export interface HttpGetClient {
  get(params: HttpGetParams): Promise<HttpResponse>;
}
