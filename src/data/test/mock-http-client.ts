import {
  HttpStatusCode,
  type HttpDeleteClient,
  type HttpDeleteParams,
  type HttpGetClient,
  type HttpGetParams,
  type HttpPostClient,
  type HttpPostParams,
  type HttpPutClient,
  type HttpPutParams,
  type HttpResponse,
} from '../protocols'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  headers?: Record<string, string>
  response: HttpResponse = {
    status: HttpStatusCode.created,
  }

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    this.headers = params.headers

    return this.response
  }
}

export class HttpPutClientSpy implements HttpPutClient {
  url?: string
  body?: object
  headers?: Record<string, string>
  response: HttpResponse = {
    status: HttpStatusCode.ok,
  }

  async put(params: HttpPutParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    this.headers = params.headers

    return this.response
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url?: string
  queryParams?: Record<string, string | number | boolean | undefined>
  headers?: Record<string, string>
  response: HttpResponse = {
    status: HttpStatusCode.ok,
    data: {},
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.url = params.url
    this.queryParams = params.queryParams
    this.headers = params.headers

    return this.response
  }
}

export class HttpDeleteClientSpy implements HttpDeleteClient {
  url?: string
  body?: object
  headers?: Record<string, string>
  response: HttpResponse = {
    status: HttpStatusCode.ok,
  }

  async delete(params: HttpDeleteParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    this.headers = params.headers

    return this.response
  }
}
