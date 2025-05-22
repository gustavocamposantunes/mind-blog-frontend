import type { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols";
import axios from "axios";

export class AxiosHttpClient implements HttpGetClient, HttpPostClient {
  async get(params: HttpGetParams): Promise<HttpResponse> {
    try {
      const response = await axios.get(params.url, { params: params.queryParams });
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: error.response.status,
          data: error.response.data,
        };
      }

      return {
        status: 500,
        data: { message: "An unknown error occurred" },
      };
    }
  }

  async post(params: HttpPostParams): Promise<HttpResponse> {
    try {
      console.log(params.headers)
      const response = await axios.post(params.url, params.body, {
        headers: params.headers
      });
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: error.response.status,
          data: error.response.data,
        };
      }

      return {
        status: 500,
        data: { message: "An unknown error occurred" },
      };
    }
  }
}
