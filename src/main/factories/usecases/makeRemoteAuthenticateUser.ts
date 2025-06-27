import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { AuthenticateUserUseCase } from '@/domain/usecases/auth/AuthenticateUser.usecase'

import { RemoteAuthenticateUser } from '@/data/usecases/auth/RemoteAuthenticateUser'

export const makeRemoteAuthenticateUser = (): AuthenticateUserUseCase =>
  new RemoteAuthenticateUser(makeApiUrl('/auth/login'), makeAxiosHttpClient())
