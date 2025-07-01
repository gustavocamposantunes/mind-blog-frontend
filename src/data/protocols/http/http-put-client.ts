import { type HttpResponse } from './http-response'

export type HttpPutParams = {
  url: string
  body?: object
  headers?: Record<string, string>
}

export interface HttpPutClient {
  put(params: HttpPutParams): Promise<HttpResponse>
}
