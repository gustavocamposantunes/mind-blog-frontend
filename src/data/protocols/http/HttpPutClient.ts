import { type HttpResponse } from './HttpResponse'

export type HttpPutParams = {
  url: string
  body?: object
  headers?: Record<string, string>
}

export interface HttpPutClient {
  put(params: HttpPutParams): Promise<HttpResponse>
}
