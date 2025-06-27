import type { AuthenticateUserModel } from '../../models'
import type { HttpRemoteResponse } from '@/data/protocols'

export type RegisterUserParams = {
  name: string
  email: string
  password: string
}

export interface RegisterUserUseCase {
  register(
    registerUserParams: RegisterUserParams,
  ): Promise<HttpRemoteResponse<AuthenticateUserModel>>
}
