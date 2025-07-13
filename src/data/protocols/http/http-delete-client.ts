import { type HttpResponse } from './http-response'

export type HttpDeleteParams = {
  url: string
  body?: object
  headers?: Record<string, string>
}

export interface HttpDeleteClient {
  delete(params: HttpDeleteParams): Promise<HttpResponse>
}
