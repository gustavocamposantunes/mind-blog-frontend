import type { HttpPutClient } from '@/data/protocols'
import type { UserModel } from '@/domain/models'
import type { UpdateProfileUseCase } from '@/domain/usecases/user/UpdateProfile.usecase'

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
  ): Promise<UserModel> {
    await this.httpClient.put({
      url: this.url,
      body: updateProfileParams,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    return Promise.resolve({} as UserModel)
  }
}
