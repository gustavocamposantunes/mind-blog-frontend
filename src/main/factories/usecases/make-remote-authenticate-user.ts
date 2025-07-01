import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { AuthenticateUserUseCase } from '@/domain/usecases/auth/authenticate-user.usecase'

import { RemoteAuthenticateUser } from '@/data/usecases/auth/remote-authenticate-user'

export const makeRemoteAuthenticateUser = (): AuthenticateUserUseCase =>
  new RemoteAuthenticateUser(makeApiUrl('/auth/login'), makeAxiosHttpClient())
