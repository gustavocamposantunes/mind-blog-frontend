import { type HttpResponse } from './HttpResponse'

export type HttpPostParams = {
  url: string
  body?: object
  headers?: Record<string, string>
}

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>
}
