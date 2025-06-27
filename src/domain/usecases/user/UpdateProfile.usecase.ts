import type { HttpRemoteResponse } from '@/data/protocols'
import type { UserModel } from '@/domain/models'

type UpdateProfileParams = {
  name?: string
  image?: string
}

export interface UpdateProfileUseCase {
  update(
    token: string,
    updateProfileParams: UpdateProfileParams,
  ): Promise<HttpRemoteResponse<UserModel>>
}
