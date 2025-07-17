import {
  HttpStatusCode,
  type HttpGetClient,
  type HttpRemoteResponse,
} from '../../protocols'

import type { UserModel } from '@/domain/models'
import type { GetProfileUseCase } from '@/domain/usecases'

import { InternalServerError, UnexpectedError } from '@/domain/errors'

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

    switch (status) {
      case HttpStatusCode.ok:
        return Promise.resolve({
          statusCode: status,
          data: data as UserModel,
        })
      case HttpStatusCode.serverError:
        throw new InternalServerError()
      default:
        throw new UnexpectedError()
    }
  }
}
