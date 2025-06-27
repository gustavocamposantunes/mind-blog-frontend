import axios from 'axios'

import type {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpPutClient,
  HttpPutParams,
  HttpResponse,
} from '@/data/protocols'

export class AxiosHttpClient
  implements HttpGetClient, HttpPostClient, HttpPutClient {
  async get(params: HttpGetParams): Promise<HttpResponse> {
    try {
      const response = await axios.get(params.url, {
        params: params.queryParams,
      })
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: error.response.status,
          data: error.response.data,
        }
      }

      return {
        status: 500,
        data: { message: 'An unknown error occurred' },
      }
    }
  }

  async post(params: HttpPostParams): Promise<HttpResponse> {
    try {
      const response = await axios.post(params.url, params.body, {
        headers: params.headers,
      })
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: error.response.status,
          data: error.response.data,
        }
      }

      return {
        status: 500,
        data: { message: 'An unknown error occurred' },
      }
    }
  }

  put(params: HttpPutParams): Promise<HttpResponse> {
    return axios.put(params.url, params.body, {
      headers: params.headers,
    })
  }
}
