import type { HttpRemoteResponse } from '@/data/protocols'
import type { UserModel } from '@/domain/models'
import type {
  UpdateProfileParams,
  UpdateProfileUseCase,
} from '@/domain/usecases/user/update-profile.usecase'

import { mockUser } from '@/domain/test'

export class PutProfileSpy implements UpdateProfileUseCase {
  token?: string
  user = mockUser()
  updateProfile?: UpdateProfileParams
  async update(
    token: string,
    updateProfileParams: UpdateProfileParams,
  ): Promise<HttpRemoteResponse<UserModel>> {
    this.token = token
    this.updateProfile = updateProfileParams

    return Promise.resolve({
      statusCode: 200,
      data: this.user,
    })
  }
}
