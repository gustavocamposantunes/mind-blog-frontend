import { type HttpResponse } from "./HttpResponse";

export type HttpGetParams = {
  url: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
}

export interface HttpGetClient {
  get(params: HttpGetParams): Promise<HttpResponse>;
}
