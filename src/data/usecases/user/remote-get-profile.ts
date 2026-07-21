import {
  HttpStatusCode,
  type HttpGetClient,
  type HttpRemoteResponse,
} from '../../protocols'

import type { UserModel } from '@/domain/models'
import type { GetProfileUseCase } from '@/domain/usecases'

import { buildRemoteResponse, throwMappedHttpError } from '@/data/usecases/http'

export class RemoteGetProfile implements GetProfileUseCase {
  private readonly url: string
  private readonly httpClient: HttpGetClient

  constructor(url: string, httpClient: HttpGetClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async getProfile(token: string): Promise<HttpRemoteResponse<UserModel>> {
    const { status, data } = await this.httpClient.get({
      url: this.url,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    if (status === HttpStatusCode.ok) {
      return buildRemoteResponse(status, data as UserModel)
    }

    return throwMappedHttpError(status)
  }
}
