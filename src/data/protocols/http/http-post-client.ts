import { type HttpResponse } from './http-response'

export type HttpPostParams = {
  url: string
  body?: object
  headers?: Record<string, string>
}

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>
}
