import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { AuthenticateUserUseCase } from '@/domain/usecases/AuthenticateUserUseCase'

import { RemoteAuthenticateUser } from '@/data/usecases/RemoteAuthenticateUser'

export const makeRemoteAuthenticateUser = (): AuthenticateUserUseCase =>
  new RemoteAuthenticateUser(makeApiUrl('/auth/login'), makeAxiosHttpClient())
