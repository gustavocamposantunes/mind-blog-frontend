import type { UserModel } from '@/domain/models'
import type { UpdateProfileUseCase } from '@/domain/usecases/user/UpdateProfile.usecase'

import {
  HttpStatusCode,
  type HttpPutClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import { InternalServerError, UnexpectedError } from '@/domain/errors'

export class RemoteUpdateProfile implements UpdateProfileUseCase {
  private readonly url: string
  private readonly httpClient: HttpPutClient

  constructor(url: string, httpClient: HttpPutClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async update(
    token: string,
    updateProfileParams: { name?: string; image?: string },
  ): Promise<HttpRemoteResponse<UserModel>> {
    const { status, data } = await this.httpClient.put({
      url: this.url,
      body: updateProfileParams,
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
        return {
          statusCode: status,
          error: new InternalServerError().message,
        }
      default:
        return {
          statusCode: status,
          error: new UnexpectedError().message,
        }
    }
  }
}
