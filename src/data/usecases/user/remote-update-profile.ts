import type { UserModel } from '@/domain/models'
import type { UpdateProfileUseCase } from '@/domain/usecases/user/update-profile.usecase'

import {
  HttpStatusCode,
  type HttpPutClient,
  type HttpRemoteResponse,
} from '@/data/protocols'
import { buildRemoteResponse, throwMappedHttpError } from '@/data/usecases/http'

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

    if (status === HttpStatusCode.ok) {
      return buildRemoteResponse(status, data as UserModel)
    }

    return throwMappedHttpError(status)
  }
}
