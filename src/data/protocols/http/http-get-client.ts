import { type HttpResponse } from './http-response'

export type HttpGetParams = {
  url: string
  queryParams?: Record<string, string | number | boolean | undefined>
  headers?: Record<string, string>
}

export interface HttpGetClient {
  get(params: HttpGetParams): Promise<HttpResponse>
}
