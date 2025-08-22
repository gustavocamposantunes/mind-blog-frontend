import axios from 'axios'

import type {
  HttpDeleteClient,
  HttpDeleteParams,
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpPutClient,
  HttpPutParams,
  HttpResponse,
} from '@/data/protocols'

// prettier-ignore
export class AxiosHttpClient
  implements HttpGetClient, HttpPostClient, HttpPutClient, HttpDeleteClient {
  async get(params: HttpGetParams): Promise<HttpResponse> {
    try {
      const response = await axios.get(params.url, {
        params: params.queryParams,
        headers: params.headers
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
    }
    catch (error) {
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

  async put(params: HttpPutParams): Promise<HttpResponse> {
    try {
      const response = await axios.put(params.url, params.body, {
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

  async delete(params: HttpDeleteParams): Promise<HttpResponse> {
    try {
      
      const response = await axios.delete(params.url, {
        data: params.body,
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
}
